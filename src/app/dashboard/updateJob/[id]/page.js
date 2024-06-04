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
    const [options, setOptions] = useState([]);

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
            setValue('photo', job?.photo);
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
    }

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
        let imageURL = details.imageURL; // Default to current imageURL

        if (data.photo && data.photo[0]) {
            const photo = data.photo[0];
            const formData = new FormData();
            formData.append('image', photo);
            const uploadImage = await axiosPublic.post(apiURL, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            imageURL = uploadImage?.data?.data?.display_url;
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

    if (loading) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <div className='fixed right-2 top-2'>
                    <Link href={'/dashboard/allJob'}>
                        <ImCross className='hover:scale-105' size={20} />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 w-full">
                    <div className='w-full'>
                        <form className='flex flex-col px-6 lg:px-0 gap-4 max-w-screen-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
                            <h1 className='font-semibold text-2xl mt-4 md:mt-8'>Edit Job Details</h1>
                            <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] mt-2'>Change Job Title</label>
                            <input id='title' defaultValue={details?.title} {...register("title", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                            {errors.title?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Title is required</p>
                            )}
                            <label defaultValue={details?.locationType} htmlFor='locationType' className='flex justify-start font-medium text-[#EA580C]'>Location *</label>
                            <select id='locationType' {...register("locationType", { required: true })} className="select select-bordered w-full flex-1 mb-3">
                                <option value="Onsite">Onsite</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                            {errors.locationType?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Location is required</p>
                            )}
                            <label defaultValue={details?.type} htmlFor='type' className='flex justify-start font-medium text-[#EA580C]'>Job Type *</label>
                            <select id='type' {...register("type")} className="select select-bordered w-full flex-1 mb-3">
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract/Freelance">Contract/Freelance</option>
                                <option value="Internship">Internship</option>
                            </select>
                            {errors.type?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Job Type is required</p>
                            )}
                            <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C]'>Change Category</label>
                            <select id='category' defaultValue={details?.category} {...register("category")} className="select select-bordered w-full flex-1 mb-3">
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Software Development">Software Development</option>
                                <option value="Digital Transformation">Digital Transformation</option>
                                <option value="Content Management">Content Management</option>
                                <option value="Experience Design">Experience Design</option>
                                <option value="Data Strategy">Data Strategy</option>
                                <option value="Product Information Management">Product Information Management</option>
                                <option value="Strategy and Organization">Strategy and Organization</option>
                                <option value="Internet Solutions">Internet Solutions</option>
                                <option value="E-Commerce">E-Commerce</option>
                                <option value="SEO/SEM">SEO/SEM</option>
                                <option value="Social Media Management">Social Media Management</option>
                                <option value="Client Relations">Client Relations</option>
                                <option value="Project Management">Project Management</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                                <option value="UX/UI Design">UX/UI Design</option>
                                <option value="Sales and Marketing">Sales and Marketing</option>
                                <option value="Business Development">Business Development</option>
                                <option value="Innovation and R&D">Innovation and R&D</option>
                                <option value="IT Infrastructure">IT Infrastructure</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Cloud Services">Cloud Services</option>
                                <option value="Mobile App Development">Mobile App Development</option>
                                <option value="Web Development">Web Development</option>
                            </select>
                            {errors.category?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Category is required</p>
                            )}
                            <label htmlFor='skillsRequired' className='flex justify-start font-medium text-[#EA580C]'>Change Required Skills</label>
                            <Controller
                                name="skillsRequired"
                                defaultValue={selectedSkills}
                                control={control}
                                render={({ field }) => (
                                    <CreatableSelect
                                        isMulti
                                        {...field}
                                        options={options}
                                        onChange={(selected) => {
                                            field.onChange(selected);
                                            setSelectedSkills(selected);
                                        }}
                                        onInputChange={handleNameChange}
                                    />
                                )}
                            />
                            {errors.skillsRequired?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Skills is required</p>
                            )}
                            <label htmlFor='recruiter' className='flex justify-start font-medium text-[#EA580C]'>Change Hiring Manager Name</label>
                            <input id='recruiter' defaultValue={details?.recruiter} {...register("recruiter", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                            {errors.recruiter?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Hiring Manager Name is required</p>
                            )}

                            <label htmlFor='recruiterEmail' className='flex justify-start font-medium text-[#EA580C]'>Change Hiring Manager Email</label>
                            <input id='recruiterEmail' defaultValue={details?.recruiterEmail} {...register("recruiterEmail", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="email" />
                            {errors.recruiterEmail?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Hiring Manager Email is required</p>
                            )}
                            {/* Display the current image */}
                            {details?.imageURL && (
                                <div className="mb-4">
                                    <Image height={300} width={300} src={details?.imageURL} alt="Current" className="w-full max-w-xs mx-auto" />
                                </div>
                            )}
                            <label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Change Hiring Manager Photo</label>
                            {/* File input for new photo */}
                            <input id='photo' {...register("photo")} className="file-input file-input-bordered w-full" type="file" />
                            {errors.photo?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Photo is required.</p>
                            )}
                            <label htmlFor='jobDescription' className='flex justify-start font-medium text-[#EA580C]'>Change Job Description</label>
                            <Controller
                                name="jobDescription"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.jobDescription?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Job Description is required</ p>
                            )}
                            <label htmlFor='keyResponsibilities' className='flex justify-start font-medium text-[#EA580C]'>Change Key Responsibilities</label>
                            <Controller
                                name="keyResponsibilities"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.keyResponsibilities?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Key Responsibilities are required</ p>
                            )}
                            <label htmlFor='requirements' className='flex justify-start font-medium text-[#EA580C]'>Change Requirements</label>
                            <Controller
                                name="requirements"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.requirements?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Requirements are required</ p>
                            )}
                            <label htmlFor='preferredQualifications' className='flex justify-start font-medium text-[#EA580C]'>Change Preferred Qualifications</label>
                            <Controller
                                name="preferredQualifications"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.preferredQualifications?.type === "required" && (
                                <p className="text-red-600 text-left pt-1">Preferred Qualifications are required</ p>
                            )}
                            <input type='submit' value="Update" className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80 mb-4' />
                        </form>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default UpdateCareer;