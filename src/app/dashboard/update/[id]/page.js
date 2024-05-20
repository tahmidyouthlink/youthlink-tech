"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useWorks from '@/hooks/useWorks';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdatePage = ({ params }) => {

    const [allWork, isWork, refetch] = useWorks();
    const [details, setDetails] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const router = useRouter();

    useEffect(() => {
        if (allWork) {
            const data = allWork.find(work => work._id == params?.id);
            setDetails(data);
        }
    }, [allWork, params]);

    useEffect(() => {
        if (details) {
            reset(details);
        }
    }, [details, reset]);

    const onSubmit = async (data) => {
        const title = data.title;
        const heading = data.heading;
        const aboutTheProject = data.aboutTheProject;
        const ourSolution = data.ourSolution;
        const theResults = data.theResults;
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
        const workInfo = { title, heading, aboutTheProject, ourSolution, theResults, imageURL };
        const res = await axiosPublic.put(`/allWork/${details?._id}`, workInfo);
        if(res?.data?.modifiedCount){
            toast.success("Updated Successfully");
            refetch();
            router.push("/dashboard/allWork")
        }
        else{
            toast.error("Change something first!")
        }
    }

    if (isWork) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <form className='flex flex-col gap-4 max-w-screen-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='font-semibold text-2xl mt-4 md:mt-8'>Edit work details</h1>
                    <input defaultValue={details?.title} {...register("title", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Enter Work Title..." />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                    <input defaultValue={details?.heading} {...register("heading", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" placeholder="Enter Work Title..." />
                    {errors.heading?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Heading is required</p>
                    )}
                    <textarea defaultValue={details?.aboutTheProject} {...register("aboutTheProject", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={8} placeholder='Enter work details...' />
                    {errors.aboutTheProject?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">About The Project is required</p>
                    )}
                    <textarea defaultValue={details?.ourSolution} {...register("ourSolution", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={8} placeholder='Enter work details...' />
                    {errors.ourSolution?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Our Solution is required</p>
                    )}
                    <textarea defaultValue={details?.theResults} {...register("theResults", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={8} placeholder='Enter work details...' />
                    {errors.theResults?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">The Results is required</p>
                    )}
                    
                    {/* Display the current image */}
                    {details?.imageURL && (
                        <div className="mb-4">
                            <Image height={300} width={300} src={details.imageURL} alt="Current" className="w-full max-w-xs mx-auto" />
                        </div>
                    )}
                    
                    {/* File input for new photo */}
                    <input {...register("photo")} className="file-input file-input-bordered w-full" type="file" />
                    {errors.photo?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Photo is required.</p>
                    )}
                    <input type='submit' value="Update" className='block w-full font-bold bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#85BDD7E0]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#85BDD7E0]/80 active:scale-95 active:shadow-md active:shadow-[#85BDD7E0]/80' />
                </form>
            </div>
        </PrivateRoute>
    );
};

export default UpdatePage;
