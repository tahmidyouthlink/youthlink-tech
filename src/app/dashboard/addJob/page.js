"use client";
import React from 'react';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { useForm } from "react-hook-form"
import useAxiosPublic from '@/hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useWorks from '@/hooks/useWorks';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AddJob = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const [, , refetch] = useWorks();

    const onSubmit = async (data) => {
        const title = data.title;
        const locationType = data.locationType;
        const overview = data.overview;
        const aboutTheRole = data.aboutTheRole;
        const skillsRequired = data.skillsRequired;
        const recruiter = data.recruiter;
        const recruiterRole = data.recruiterRole;
        const recruiterEmail = data.recruiterEmail;
        const photo = data.photo[0];
        const photoObj = { image: photo }
        const uploadImage = await axiosPublic.post(apiURL, photoObj, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        const imageURL = uploadImage?.data?.data?.display_url;
        const jobInfo = { title, locationType, overview, aboutTheRole, skillsRequired, recruiter, recruiterRole, recruiterEmail, imageURL };
        const res = await axiosPublic.post("/addJobCircular", jobInfo);
        if (res?.data?.insertedId) {
            reset();
            refetch();
            toast.success("Your job successfully published")
        }
    }

    return (
        <PrivateRoute>
            <div>
                <form className='flex flex-col gap-4 max-w-screen-md mx-auto mt-6 px-6' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='font-semibold text-2xl mb-2 mt-4 md:mt-8'>Enter Job details</h1>
                    <input {...register("title", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Job Title" />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                    <input {...register("locationType", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Location & Job Type" />
                    {errors.locationType?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Location & Job Type is required</p>
                    )}
                    <input {...register("recruiter", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Recruiter Name" />
                    {errors.recruiter?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Recruiter Name is required</p>
                    )}
                    <input {...register("recruiterRole", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Recruiter Role" />
                    {errors.recruiterRole?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Recruiter Role is required</p>
                    )}
                    <input {...register("recruiterEmail", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="email" placeholder="Recruiter Email" />
                    {errors.recruiterEmail?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Recruiter Email is required</p>
                    )}
                    <label htmlFor='photo'>Upload Recruiter Photo *</label>
                    <input {...register("photo", { required: true })} className="file-input file-input-bordered w-full my-2" type="file" id='photo' />
                    {errors.photo?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Photo is required.</p>
                    )}
                    <textarea {...register("overview", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} placeholder='Opportunity Overview' />
                    {errors.overview?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Overview is required</ p>
                    )}
                    <textarea {...register("aboutTheRole", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} placeholder='About The Role' />
                    {errors.aboutTheRole?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">About The Role is required</ p>
                    )}
                    <textarea {...register("skillsRequired", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} placeholder='Skills Required' />
                    {errors.skillsRequired?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Skills is required</ p>
                    )}
                    <input type='submit' className='block w-full font-bold bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#85BDD7E0]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#85BDD7E0]/80 active:scale-95 active:shadow-md active:shadow-[#85BDD7E0]/80' />
                </form>
            </div>
        </PrivateRoute>
    );
};

export default AddJob;