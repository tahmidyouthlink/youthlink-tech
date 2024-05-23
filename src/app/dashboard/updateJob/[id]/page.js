"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useJobs from '@/hooks/useJobs';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateJobPage = ({ params }) => {

    const [allJob, isJob, refetch] = useJobs();
    const [details, setDetails] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const router = useRouter();

    useEffect(() => {
        if (allJob) {
            const data = allJob.find(job => job._id == params?.id);
            setDetails(data);
        }
    }, [allJob, params]);

    useEffect(() => {
        if (details) {
            reset(details);
        }
    }, [details, reset]);

    const onSubmit = async (data) => {
        const title = data.title;
        const locationType = data.locationType;
        const keyword = data.keyword;
        const category = data.category;
        const overview = data.overview;
        const aboutTheRole = data.aboutTheRole;
        const skillsRequired = data.skillsRequired;
        const recruiter = data.recruiter;
        const recruiterRole = data.recruiterRole;
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
        const jobInfo = { title, locationType, keyword, category, overview, aboutTheRole, skillsRequired, recruiter, recruiterRole, recruiterEmail, imageURL };
        const res = await axiosPublic.put(`/allJobCircular/${details?._id}`, jobInfo);
        if (res?.data?.modifiedCount) {
            toast.success("Updated Successfully");
            refetch();
            router.push("/dashboard/allJob")
        }
        else {
            toast.error("Change something first!")
        }
    }

    if (isJob) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <form className='flex flex-col px-6 lg:px-0 gap-4 max-w-screen-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='font-semibold text-2xl mt-4 md:mt-8'>Edit Job Details</h1>
                    <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C] mt-2'>Change Title</label>
                    <input id='title' defaultValue={details?.title} {...register("title", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                    <label htmlFor='locationType' className='flex justify-start font-medium text-[#EA580C]'>Change Location & Job Type</label>
                    <input id='locationType' defaultValue={details?.locationType} {...register("locationType", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.locationType?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Location & Job Type is required</p>
                    )}
                    <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C]'>Change Keywords</label>
                    <input id='keyword' defaultValue={details?.keyword} {...register("keyword", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.keyword?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Keyword is required</p>
                    )}
                    <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C]'>Change Category</label>
                    <select id='category' defaultValue={details?.category} {...register("category")} className="select select-bordered w-full flex-1 mb-3">
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="Content Management">Content Management</option>
                        <option value="Experience Design">Experience Design</option>
                        <option value="Data Strategy">Data Strategy</option>
                        <option value="Product Information Management">Product Information Management</option>
                        <option value="Strategy and Organization">Strategy and Organization</option>
                        <option value="Experience Design">Experience Design</option>
                    </select>
                    {errors.category?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Category is required</p>
                    )}
                    <label htmlFor='recruiter' className='flex justify-start font-medium text-[#EA580C]'>Change Recruiter Name</label>
                    <input id='recruiter' defaultValue={details?.recruiter} {...register("recruiter", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.recruiter?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Recruiter Name is required</p>
                    )}
                    <label htmlFor='recruiterRole' className='flex justify-start font-medium text-[#EA580C]'>Change Recruiter Role</label>
                    <input id='recruiterRole' defaultValue={details?.recruiterRole} {...register("recruiterRole", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.recruiterRole?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Recruiter Role is required</p>
                    )}
                    <label htmlFor='recruiterEmail' className='flex justify-start font-medium text-[#EA580C]'>Change Recruiter Email</label>
                    <input id='recruiterEmail' defaultValue={details?.recruiterEmail} {...register("recruiterEmail", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="email" />
                    {errors.recruiterEmail?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Recruiter Email is required</p>
                    )}
                    {/* Display the current image */}
                    {details?.imageURL && (
                        <div className="mb-4">
                            <Image height={300} width={300} src={details?.imageURL} alt="Current" className="w-full max-w-xs mx-auto" />
                        </div>
                    )}
                    <label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Change Recruiter Photo</label>
                    {/* File input for new photo */}
                    <input id='photo' {...register("photo")} className="file-input file-input-bordered w-full" type="file" />
                    {errors.photo?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Photo is required.</p>
                    )}
                    <label htmlFor='overview' className='flex justify-start font-medium text-[#EA580C]'>Change Opportunity Overview</label>
                    <textarea id='overview' defaultValue={details?.overview} {...register("overview", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} />
                    {errors.overview?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Overview is required</ p>
                    )}
                    <label htmlFor='aboutTheRole' className='flex justify-start font-medium text-[#EA580C]'>Change Job Role</label>
                    <textarea defaultValue={details?.aboutTheRole} {...register("aboutTheRole", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} />
                    {errors.aboutTheRole?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">About The Role is required</ p>
                    )}
                    <label htmlFor='skillsRequired' className='flex justify-start font-medium text-[#EA580C]'>Change Required Skills</label>
                    <textarea id='skillsRequired' defaultValue={details?.skillsRequired} {...register("skillsRequired", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} />
                    {errors.skillsRequired?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Skills is required</ p>
                    )}
                    <input type='submit' value="Update" className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80 mb-4' />
                </form>
            </div>
        </PrivateRoute>
    );
};

export default UpdateJobPage;
