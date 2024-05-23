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
        const keyword = data.keyword;
        const category = data.category;
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
        const workInfo = { title, heading, keyword, category, aboutTheProject, ourSolution, theResults, imageURL };
        const res = await axiosPublic.put(`/allWork/${details?._id}`, workInfo);
        if (res?.data?.modifiedCount) {
            toast.success("Updated Successfully");
            refetch();
            router.push("/dashboard/allWork")
        }
        else {
            toast.error("Change something first!")
        }
    }

    if (isWork) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <form className='flex flex-col px-6 lg:px-0 gap-4 max-w-screen-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='font-semibold text-2xl mt-4 md:mt-8'>Edit work details</h1>
                    <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C]'>Change Title</label>
                    <input id='title' defaultValue={details?.title} {...register("title", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.title?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Title is required</p>
                    )}
                    <label htmlFor='heading' className='flex justify-start font-medium text-[#EA580C]'>Change Heading</label>
                    <input id='heading' defaultValue={details?.heading} {...register("heading", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.heading?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Heading is required</p>
                    )}
                    <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C]'>Change Keywords</label>
                    <input id='keyword' defaultValue={details?.keyword} {...register("keyword", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                    {errors.keyword?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Keyword is required</p>
                    )}
                    <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C]'>Change Category</label>
                    <select defaultValue={details?.category} {...register("category")} className="select select-bordered w-full flex-1">
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
                    <label htmlFor='aboutTheProject' className='flex justify-start font-medium text-[#EA580C]'>Change Details</label>
                    <textarea id='aboutTheProject' defaultValue={details?.aboutTheProject} {...register("aboutTheProject", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={8} />
                    {errors.aboutTheProject?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">About This Work is required</p>
                    )}
                    <label htmlFor='ourSolution' className='flex justify-start font-medium text-[#EA580C]'>Change Solution</label>
                    <textarea id='ourSolution' defaultValue={details?.ourSolution} {...register("ourSolution", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={8} />
                    {errors.ourSolution?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Our Solution is required</p>
                    )}
                    <label htmlFor='theResults' className='flex justify-start font-medium text-[#EA580C]'>Change Results</label>
                    <textarea id='theResults' defaultValue={details?.theResults} {...register("theResults", { required: true })} className="w-full p-4 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={8} />
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
                    <label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Change Work Photo</label>
                    <input id='photo' {...register("photo")} className="file-input file-input-bordered w-full" type="file" />
                    {errors.photo?.type === "required" && (
                        <p className="text-red-600 text-left pt-1">Photo is required.</p>
                    )}
                    <input type='submit' value="Update" className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80 mb-4' />
                </form>
            </div>
        </PrivateRoute>
    );
};

export default UpdatePage;
