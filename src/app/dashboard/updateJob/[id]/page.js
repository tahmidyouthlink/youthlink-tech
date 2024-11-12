"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImCross } from 'react-icons/im';
import dynamic from 'next/dynamic';
import CreatableSelect from 'react-select/creatable';
import 'react-quill/dist/quill.snow.css';
import useJobs from '@/hooks/useJobs';
import useJobCategories from '@/hooks/useJobCategories';
import useJobSkills from '@/hooks/useJobSkills';
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa6';

const Editor = dynamic(() => import('@/utils/Markdown/Editor/Editor'), { ssr: false });

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateCareer = ({ params }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
  const [, , refetch] = useJobs();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [allJobCategories, isJobCategoryPending, refetchJobCategories] = useJobCategories();
  const [allJobSkills, isJobSkillsPending, refetchJobSkills] = useJobSkills();

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axiosPublic.get(`/allJobCircular/${params?.id}`);
      const job = res.data;
      setDetails(job);
      setValue('title', job?.title);
      setValue('locationType', job?.locationType);
      setValue('category', job?.category);
      setValue('type', job?.type);
      setValue('jobDescription', job?.jobDescription);
      setValue('keyResponsibilities', job?.keyResponsibilities);
      setValue('requirements', job?.requirements);
      setValue('preferredQualifications', job?.preferredQualifications);
      setValue('recruiter', job?.recruiter);
      setValue('recruiterEmail', job?.recruiterEmail);
      setImage(job?.imageURL);
      setSelectedSkills(job?.skillsRequired?.map(skill => skill));
      setLoading(false);
    };
    fetchJob();
  }, [params, axiosPublic, setValue]);

  let temp = [];
  const handleNameChange = (inputValue) => {
    if (inputValue) {
      try {
        (async () => {
          const res = await axiosPublic.get(`/allSkills/${inputValue.toLowerCase()}`);
          const name = res?.data?.map(data => {
            const option = {
              label: data?.allSkills,
              value: data?.allSkills,
            }
            temp.push(option);
          });
          setOptions(temp);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  };

  let temp2 = [];
  const handleNameChange2 = (inputValue) => {
    if (inputValue) {
      try {
        (async () => {
          const res = await axiosPublic.get(`/careerCategory/${inputValue.toLowerCase()}`);
          const name = res?.data?.map(data => {
            const option = {
              label: data?.careerCategory,
              value: data?.careerCategory,
            }
            temp2.push(option);
          });
          setOptions2(temp2);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setMenuPortalTarget(document.body);
    }
  }, []);

  const handleGoBack = () => {
    router.push("/dashboard/allJob");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage({
        src: URL.createObjectURL(file),
        file,
      });
      setImageError(false); // Reset error when a file is selected
    } else {
      setImageError(true); // Set error if no file selected
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.data && data.data.url) {
        return data.data.url; // Imgbb URL of the uploaded image
      } else {
        console.error('Error uploading image:', data);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const title = data.title;
    const locationType = data.locationType;
    const type = data.type;
    const category = data.category;
    const jobDescription = data.jobDescription;
    const keyResponsibilities = data.keyResponsibilities;
    const requirements = data.requirements;
    const preferredQualifications = data.preferredQualifications;
    const skillsRequired = selectedSkills?.map(skill => skill);
    const recruiter = data.recruiter;
    const recruiterEmail = data.recruiterEmail;
    const newSkills = data.skillsRequired.map(s => s.value);
    const newCategories = data.category.map(c => c.value);

    // Initialize imageUrl with the existing one
    let imageURL = details?.imageURL || '';

    // If a new image is uploaded, upload it to Imgbb
    if (image && image.file) {
      imageURL = await uploadImageToImgbb(image.file);
      if (!imageURL) {
        toast.error('Image upload failed, cannot proceed.');
      }
    } else if (image === null) {
      // If the image is removed, explicitly set imageURL to an empty string
      imageURL = '';
    }

    if (image === null) {
      setImageError(true);
      return;
    } else {
      setImageError(false);
    }

    // Extract existing skills from `allJobSkills`
    const existingSkills = allJobSkills.map(item => item.allSkills);

    // Identify only new skills that are not in the existing list
    const uniqueNewSkills = newSkills.filter(skill => !existingSkills.includes(skill));

    // Only proceed if there are unique new skills to add
    if (uniqueNewSkills.length > 0) {
      try {
        // Send only the new skills to be added to the backend
        const response = await axiosPublic.post('/publishJobSkills', { skills: uniqueNewSkills });
        if (response?.data?.result?.insertedCount > 0) {
          refetchJobSkills();
        }

      } catch (error) {
        console.error('Error publishing job skills:', error);
      }
    }
    // Extract existing categories from `allJobCategories`
    const existingCategories = allJobCategories.map(item => item.careerCategory);

    // Identify only new categories that are not in the existing list
    const uniqueNewCategories = newCategories.filter(category => !existingCategories.includes(category));

    // Only proceed if there are unique new categories to add
    if (uniqueNewCategories.length > 0) {
      try {
        // Send only the new categories to be added to the backend
        const response = await axiosPublic.post('/publishJobCategories', { categories: uniqueNewCategories });
        if (response?.data?.result?.insertedCount > 0) {
          refetchJobCategories();
        }

      } catch (error) {
        console.error('Error publishing job categories:', error);
      }
    }

    const updatedJobInfo = {
      title, locationType, type, category, jobDescription, keyResponsibilities,
      requirements, preferredQualifications, skillsRequired, recruiter, recruiterEmail, imageURL
    };

    const res = await axiosPublic.put(`/allJobCircular/${params?.id}`, updatedJobInfo);
    if (res.data.modifiedCount > 0) {
      reset();
      refetch();
      toast.success("Job details updated successfully");
      router.push("/dashboard/allJob");
    } else {
      toast.error("Change something first!");
    }
  };

  if (loading || isJobCategoryPending || isJobSkillsPending) {
    return <Loading />;
  }

  return (
    <PrivateRoute>
      <div className='min-h-screen'>

        <div className='max-w-screen-2xl px-6 mx-auto'>

          <div className='max-w-screen-2xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white'>
            <div className='max-w-screen-xl mx-auto flex items-center justify-between'>
              <h3 className='w-full font-semibold text-lg md:text-xl lg:text-2xl'>Edit Job Configuration</h3>
              <button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
            </div>
          </div>

          <form className='max-w-screen-xl mx-auto pt-1 pb-6 flex flex-col' onSubmit={handleSubmit(onSubmit)}>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6'>

              <div className='grid grid-cols-1 lg:col-span-7 gap-8 mt-3 py-3 h-fit'>
                <div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] py-2'>Job Title *</label>
                    <input id='title' {...register("title", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
                    {errors.title?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='locationType' className='flex justify-start font-medium text-[#EA580C] py-2'>Location *</label>
                    <select id='locationType' {...register("locationType", { required: true })} className="select select-bordered w-full flex-1 mb-3">
                      <option value="Onsite">Onsite</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    {errors.locationType?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Location is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='type' className='flex justify-start font-medium text-[#EA580C] py-2'>Job Type *</label>
                    <select id='type' {...register("type", { required: true })} className="select select-bordered w-full flex-1 mb-3">
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract/Freelance">Contract/Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                    {errors.type?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Job Type is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C] py-2'>Change Categories</label>
                    <Controller
                      name="category"
                      defaultValue={selectedCategory}
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          {...field}
                          options={options2}
                          menuPortalTarget={menuPortalTarget}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          menuPlacement="auto"
                          onChange={(selected) => {
                            if (selected?.length > 3) {
                              toast.error("You can select up to 3 items only.")
                            } else {
                              field.onChange(selected);
                              setSelectedCategory(selected);
                            }
                          }}
                          onInputChange={handleNameChange2}
                        />
                      )}
                    />
                    {errors.category?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Categories is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='skillsRequired' className='flex justify-start font-medium text-[#EA580C] py-2'>Change Required Skills</label>
                    <Controller
                      name="skillsRequired"
                      defaultValue={selectedSkills}
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          {...field}
                          options={options}
                          menuPortalTarget={menuPortalTarget}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                          menuPlacement="auto"
                          onChange={(selected) => {
                            if (selected?.length > 3) {
                              toast.error("You can select up to 3 items only.")
                            } else {
                              field.onChange(selected);
                              setSelectedSkills(selected);
                            }
                          }}
                          onInputChange={handleNameChange}
                        />
                      )}
                    />
                    {errors.skillsRequired?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Skills is required</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='recruiter' className='flex justify-start font-medium text-[#EA580C] py-2'>Hiring Manager Name *</label>
                    <input id='recruiter' {...register("recruiter", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
                    {errors.recruiter?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Hiring Manager Name is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='recruiterEmail' className='flex justify-start font-medium text-[#EA580C] py-2'>Hiring Manager Email *</label>
                    <input id='recruiterEmail' {...register("recruiterEmail", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="email" />
                    {errors.recruiterEmail?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Hiring Manager Email is required</p>
                    )}
                  </div>
                  <div className='flex flex-col gap-4 mt-6'>
                    <input
                      id='imageUpload'
                      type='file'
                      className='hidden'
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor='imageUpload'
                      className='mx-auto flex flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white cursor-pointer'
                    >
                      <MdOutlineFileUpload size={60} />
                      <div className='space-y-1.5 text-center'>
                        <h5 className='whitespace-nowrap text-lg font-medium tracking-tight'>
                          Upload Thumbnail
                        </h5>
                        <p className='text-sm text-gray-500'>
                          Photo Should be in PNG, JPEG or JPG format
                        </p>
                      </div>
                    </label>
                    {imageError && <p className="text-red-600">Blog thumbnail is required</p>}

                    {image && (
                      <div className='relative'>
                        <Image
                          src={typeof image === 'string' ? image : image.src}
                          alt='Uploaded image'
                          height={3000}
                          width={3000}
                          className='w-full min-h-[200px] max-h-[200px] rounded-md object-contain'
                        />
                        <button
                          onClick={handleImageRemove}
                          className='absolute top-1 right-1 rounded-full p-1 bg-red-600 hover:bg-red-700 text-white font-bold'
                        >
                          <RxCross2 size={24} />
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:col-span-5 gap-8 mt-3 py-3 h-fit'>

                <div className='flex flex-col bg-[#ffffff] gap-4 drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='jobDescription' className='flex justify-start font-medium text-[#EA580C] py-2'>Job Description *</label>
                    <Controller
                      name="jobDescription"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                    />
                    {errors.jobDescription?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Job Description is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='keyResponsibilities' className='flex justify-start font-medium text-[#EA580C] py-2'>Key Responsibilities *</label>
                    <Controller
                      name="keyResponsibilities"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                    />
                    {errors.keyResponsibilities?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Key Responsibilities are required</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col bg-[#ffffff] gap-4 drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='requirements' className='flex justify-start font-medium text-[#EA580C] py-2'>Requirements *</label>
                    <Controller
                      name="requirements"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                    />
                    {errors.requirements?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Requirements are required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='preferredQualifications' className='flex justify-start font-medium text-[#EA580C] py-2'>Preferred Qualifications *</label>
                    <Controller
                      name="preferredQualifications"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                    />
                    {errors.preferredQualifications?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Preferred Qualifications are required</p>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <div className='flex justify-end items-center mt-3'>

              <button type='submit' className={`bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-2 px-4 text-sm md:text-base rounded-md cursor-pointer font-medium flex items-center gap-2`}>
                Update
              </button>
            </div>

          </form>
        </div>

      </div>
    </PrivateRoute>
  );
};

export default UpdateCareer;