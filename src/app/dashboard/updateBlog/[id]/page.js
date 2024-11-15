"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import useBlogs from '@/hooks/useBlogs';
import CreatableSelect from 'react-select/creatable';
import useBlogKeywords from '@/hooks/useBlogKeywords';
import useBlogCategories from '@/hooks/useBlogCategories';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineFileUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const Editor = dynamic(() => import('@/utils/Markdown/Editor/Editor'), { ssr: false });

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateBlog = ({ params }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();
  const [, , refetch] = useBlogs();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState([]);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [titles, setTitles] = useState([]);
  const [notDouble, setNotDouble] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [allBlogKeywords, isBlogKeywordPending, refetchBlogKeywords] = useBlogKeywords();
  const [allBlogCategories, isBlogCategoryPending, refetchBlogCategories] = useBlogCategories();
  const [blogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axiosPublic.get(`/allBlog/${params?.id}`);
      const blog = res.data;
      setNotDouble(blog?.title);
      setValue('title', blog?.title);
      setValue('keyword', blog?.keyword);
      setValue('category', blog?.category);
      setValue('description', blog?.description);
      setImage(blog?.imageURL || null);
      setValue("embed", blog?.embed);
      setValue("featured", blog?.featured);
      setSelectedBlogs(blog?.keyword?.map(skill => skill));
      setSelectedCategoryBlogs(blog?.category?.map(cat => cat));
      setBlogDetails(blog);
      setLoading(false);
    };
    fetchBlog();
  }, [params, axiosPublic, setValue]);

  let temp = [];
  const handleNameChange = (inputValue) => {
    if (inputValue) {
      try {
        (async () => {
          const res = await axiosPublic.get(`/blogKeywords/${inputValue.toLowerCase()}`);
          const name = res?.data?.map(data => {
            const option = {
              label: data?.blogKeywords,
              value: data?.blogKeywords,
            }
            temp.push(option);
          });
          setOptions(temp);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }

  let temp2 = [];
  const handleNameChange2 = (inputValue) => {
    if (inputValue) {
      try {
        (async () => {
          const res = await axiosPublic.get(`/blogCategory/${inputValue.toLowerCase()}`);
          const name = res?.data?.map(data => {
            const option = {
              label: data?.blogCategory,
              value: data?.blogCategory,
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
    const fetchBlogTitle = async () => {
      try {
        if (selectedBlogs.length > 0) {
          // Serialize keywords
          const serializedKeywords = encodeURIComponent(JSON.stringify(selectedBlogs));
          const response = await axiosPublic.get(`/blogTitle/${serializedKeywords}`);
          setTitles(response?.data?.data);
        }
      } catch (err) {
        toast.error(err);
      }
    };
    fetchBlogTitle();
  }, [selectedBlogs, axiosPublic]);

  const theTitles = useMemo(() => {
    return titles?.filter(title => title !== notDouble);
  }, [titles, notDouble]);

  const handleGoBack = () => {
    router.push("/dashboard/allBlog");
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
    const keyword = data.keyword;
    const newKeywords = data.keyword.map(k => k.value);
    const category = data.category;
    const newCategories = data.category.map(c => c.value);
    const description = data.description;
    const embed = data.embed || "";
    const featured = data?.featured || "";

    if (image === null) {
      setImageError(true);
      return;
    }
    else {
      setImageError(false);
    }

    // Initialize imageUrl with the existing one
    let imageURL = blogDetails.imageURL || '';

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

    // Extract existing keywords from `allBlogKeywords`
    const existingKeywords = allBlogKeywords.map(item => item.blogKeywords);

    // Identify only new keywords that are not in the existing list
    const uniqueNewKeywords = newKeywords.filter(keyword => !existingKeywords.includes(keyword));

    // Only proceed if there are unique new keywords to add
    if (uniqueNewKeywords.length > 0) {
      try {
        // Send only the new keywords to be added to the backend
        const response = await axiosPublic.post('/publishBlogKeywords', { keywords: uniqueNewKeywords });
        if (response?.data?.result?.insertedCount > 0) {
          refetchBlogKeywords();
        }

      } catch (error) {
        console.error('Error publishing blog keywords:', error);
      }
    }
    // Extract existing keywords from `allBlogKeywords`
    const existingCategories = allBlogCategories.map(item => item.blogCategory);

    // Identify only new keywords that are not in the existing list
    const uniqueNewCategories = newCategories.filter(category => !existingCategories.includes(category));

    // Only proceed if there are unique new categories to add
    if (uniqueNewCategories.length > 0) {
      try {
        // Send only the new keywords to be added to the backend
        const response = await axiosPublic.post('/publishBlogCategories', { categories: uniqueNewCategories });
        if (response?.data?.result?.insertedCount > 0) {
          refetchBlogCategories();
        }

      } catch (error) {
        console.error('Error publishing blog keywords:', error);
      }
    }

    const updatedBlogInfo = { title, keyword, embed, featured, category, description, imageURL };
    const res = await axiosPublic.put(`/allBlog/${params?.id}`, updatedBlogInfo);
    if (res.data.modifiedCount > 0) {
      reset();
      refetch();
      toast.success("Blog updated successfully");
      router.push("/dashboard/allBlog");
    } else {
      toast.error("Change something first!");
    }
  }

  if (loading || isBlogKeywordPending || isBlogCategoryPending) {
    return <Loading />
  };

  return (
    <PrivateRoute>
      <div className='min-h-screen'>

        <div className='max-w-screen-2xl px-6 mx-auto'>

          <div className='max-w-screen-xl mx-auto pt-3 pb-1 sticky top-0 z-10 bg-white'>
            <div className='flex items-center justify-between'>
              <h3 className='w-full font-semibold text-lg md:text-xl lg:text-2xl'>Edit Blog Configuration</h3>
              <button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
            </div>
          </div>

          <form className='max-w-screen-xl mx-auto pt-1 pb-6 flex flex-col' onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submit behavior
            handleSubmit(onSubmit)(); // Explicitly call onSubmit when necessary
          }}>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6'>

              <div className='grid grid-cols-1 lg:col-span-7 gap-8 mt-3 py-3 h-fit'>
                <div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] pb-2'>Title *</label>
                    <input id='title' {...register("title", { required: true })} className="bg-gradient-to-r from-white to-gray-50 w-full p-3 border border-gray-300 outline-none focus:border-[#EA580C] transition-colors duration-1000 rounded-md" type="text" />
                    {errors.title?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='description' className='flex justify-start font-medium text-[#EA580C] pb-2'>Details About This Blog *</label>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                    />
                    {errors.description?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">This field is required</ p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-4 bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C] pb-2'>Change Categories</label>
                    <Controller
                      name="category"
                      defaultValue={selectedCategoryBlogs}
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          {...field}
                          options={options2}
                          onChange={(selected) => {
                            if (selected.length > 3) {
                              toast.error("You can select up to 3 items only.");
                            } else {
                              field.onChange(selected);
                              setSelectedCategoryBlogs(selected);
                            }
                          }}
                          onInputChange={handleNameChange2}
                        />
                      )}
                    />
                    {errors.category?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Category is required</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C] pb-2'>Change Keywords</label>
                    <Controller
                      name="keyword"
                      defaultValue={selectedBlogs}
                      control={control}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          {...field}
                          options={options}
                          onChange={(selected) => {
                            if (selected.length > 5) {
                              toast.error("You can select up to 5 items only.");
                            } else {
                              field.onChange(selected);
                              setSelectedBlogs(selected);
                            }
                          }}
                          onInputChange={handleNameChange}
                        />
                      )}
                    />
                    {errors.keyword?.type === "required" && (
                      <p className="text-red-600 text-left pt-1">Keyword is required</p>
                    )}
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:col-span-5 gap-8 mt-3 py-3 h-fit'>

                <div className='flex flex-col bg-[#ffffff] drop-shadow p-5 md:p-7 rounded-lg h-fit'>
                  <div>
                    <label htmlFor='embed' className='flex justify-start font-medium text-[#EA580C] mt-3 pb-2'>Upload embed video code</label>
                    <textarea className='w-full p-3 mb-4 border rounded-md outline-none focus:border-[#EA580C] transition-colors duration-1000' id='embed' {...register('embed')} rows={7} cols={50} />
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
                          Upload Blog Cover
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

                  {theTitles?.length > 0 ? <div>
                    <label htmlFor='featured' className='flex justify-start font-medium text-[#EA580C] pt-6 pb-2'>Select Featured Post Title *</label>
                    <select {...register("featured", { required: true })} className="select select-bordered w-full flex-1">
                      {
                        theTitles?.map((sector, index) => (
                          <option key={index} value={sector}>{sector}</option>
                        ))
                      }
                    </select>
                    {errors.featured && <p className="text-red-600">Featured title selection is required</p>}
                  </div> : <div>
                    <p className='pt-10'>No featured posts available. Please select a keyword instead!</p>
                  </div>}

                </div>
              </div>

            </div>

            <div className='flex justify-end items-center mt-3'>

              <button type='submit' className={`text-white bg-gray-800 w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>
                Update
              </button>
            </div>

          </form>
        </div>

      </div>
    </PrivateRoute>
  );
};

export default UpdateBlog;