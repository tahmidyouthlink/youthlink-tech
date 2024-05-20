"use client";
import React from 'react';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { useForm } from "react-hook-form"
import useAxiosPublic from '@/hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useWorks from '@/hooks/useWorks';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const OurWork = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const [, , refetch] = useWorks();

    const onSubmit = async (data) => {
        const title = data.title;
        const heading = data.heading;
        const aboutTheProject = data.aboutTheProject;
        const ourSolution = data.ourSolution;
        const theResults = data.theResults;
        const photo = data.photo[0];
        const photoObj = { image: photo }
        const uploadImage = await axiosPublic.post(apiURL, photoObj, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        const imageURL = uploadImage?.data?.data?.display_url;
        const workInfo = { title, heading, aboutTheProject, ourSolution, theResults, imageURL };
        const res = await axiosPublic.post("/addWork", workInfo);
        if (res?.data?.insertedId) {
            reset();
            refetch();
            toast.success("Your work successfully published")
        }
    }

    return (
        <PrivateRoute>
            <div>
                <form className='flex flex-col gap-4 max-w-screen-md mx-auto mt-6 px-6' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='font-semibold text-2xl my-2 mt-4 md:mt-8'>Work details</h1>
                    <input {...register("title", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Enter Work Title..." />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                    <input {...register("heading", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Enter Work Heading..." />
                    {errors.heading?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Heading is required</p>
                    )}
                    <textarea {...register("aboutTheProject", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} placeholder='Enter details about this project...' />
                    {errors.description?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">This field is required</ p>
                    )}
                    <textarea {...register("ourSolution", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} placeholder='Enter details about our solution...' />
                    {errors.ourSolution?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">This field is required</ p>
                    )}
                    <textarea {...register("theResults", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} placeholder='Enter details about the results...' />
                    {errors.theResults?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">This field is required</ p>
                    )}
                    <input {...register("photo", { required: true })} className="file-input file-input-bordered w-full" id='photo' type="file" />
                    {errors.photo?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Photo is required.</p>
                    )}
                    <input type='submit' className='block w-full font-bold bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#85BDD7E0]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#85BDD7E0]/80 active:scale-95 active:shadow-md active:shadow-[#85BDD7E0]/80' />
                </form>
            </div>
        </PrivateRoute>
    );
};

export default OurWork;