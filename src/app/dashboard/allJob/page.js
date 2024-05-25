"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { FaEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Image from 'next/image';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAdmin from '@/hooks/useAdmin';
import useJobs from '@/hooks/useJobs';
const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AllJob = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [allJob, isJob, refetch] = useJobs();
    const [details, setDetails] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [isAdmin, pending] = useAdmin();

    function open(id) {
        setOpenModal(true);
        const singleData = allJob?.find(job => job?._id === id);
        setDetails(singleData);
    }

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
        const photo = data.photo[0];
        let status;
        if (isAdmin) {
            status = "checked";
        }
        else {
            status = "pending";
        }
        const photoObj = { image: photo }
        const uploadImage = await axiosPublic.post(apiURL, photoObj, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        const imageURL = uploadImage?.data?.data?.display_url;
        const jobInfo = { title, locationType, keyword, category, overview, aboutTheRole, skillsRequired, recruiter, recruiterRole, recruiterEmail, imageURL, status };
        const res = await axiosPublic.post("/addJobCircular", jobInfo);
        if (res?.data?.insertedId) {
            reset();
            refetch();
            setOpenModal2(false);
            toast.success("Your job successfully published")
        }
    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EAB308",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/deleteJobCircular/${id}`);
                if (res?.data?.deletedCount) {
                    refetch();
                    toast.success("Your Job Circular has been deleted.")
                }
            }
        });
    }

    const handleChecked = (id) => {
        if (isAdmin) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#EAB308",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, checked!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (isAdmin) {
                        const res = await axiosPublic.patch(`/checkedJobCircular/${id}`);
                        if (res?.data?.modifiedCount) {
                            refetch();
                            toast.success("Checked!");
                        }
                    }
                    else {
                        toast.error("You cannot checked this job circular!")
                    }
                }
            });
        }
    }

    if (isJob || pending) {
        return <Loading />
    }

    return (
        <PrivateRoute>
            <div>
                <div onClick={() => setOpenModal2(true)} className='flex justify-center mt-8'><button className='flex items-center font-medium bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white px-3 hover:scale-105 transition duration-300 py-1 rounded-md'>
                    <FiPlus />
                    <h1>Add Job Circular</h1>
                </button></div>
                <div onClick={() => setOpenModal2(false)} className={`fixed z-[100] flex items-center justify-center ${openModal2 ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-h-[95vh] overflow-y-auto md:w-[600px] lg:w-[800px] rounded-lg bg-white mx-4 p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal2 ? 'opacity-1 translate-y-0 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
                        <div className='flex gap-2'>
                            <svg onClick={() => setOpenModal2(false)} className="mx-auto mr-0 w-8 cursor-pointer absolute right-2 top-2 fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className='w-full'>
                                <form className='flex flex-col gap-4 mx-auto mt-6 px-6' onSubmit={handleSubmit(onSubmit)}>
                                    <h1 className='font-semibold text-2xl mb-2 mt-4 md:mt-8'>Enter Job details</h1>
                                    <label htmlFor='title' className='flex justify-start font-medium text-[#EA580C]'>Title *</label>
                                    <input id='title' {...register("title", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                                    {errors.title?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Title is required</p>
                                    )}
                                    <label htmlFor='locationType' className='flex justify-start font-medium text-[#EA580C]'>Location & Job Type *</label>
                                    <input id='locationType' {...register("locationType", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                                    {errors.locationType?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Location & Job Type is required</p>
                                    )}
                                    <label htmlFor='keyword' className='flex justify-start font-medium text-[#EA580C]'>Keywords *</label>
                                    <input id='keyword' {...register("keyword", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                                    {errors.keyword?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Keyword is required</p>
                                    )}
                                    <label htmlFor='category' className='flex justify-start font-medium text-[#EA580C]'>Select Category *</label>
                                    <select id='category' {...register("category")} className="select select-bordered w-full flex-1 mb-3">
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
                                    <label htmlFor='recruiter' className='flex justify-start font-medium text-[#EA580C]'>Recruiter Name *</label>
                                    <input id='recruiter' {...register("recruiter", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                                    {errors.recruiter?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Recruiter Name is required</p>
                                    )}
                                    <label htmlFor='recruiterRole' className='flex justify-start font-medium text-[#EA580C]'>Recruiter Role *</label>
                                    <input id='recruiterRole' {...register("recruiterRole", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="text" />
                                    {errors.recruiterRole?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Recruiter Role is required</p>
                                    )}
                                    <label htmlFor='recruiterEmail' className='flex justify-start font-medium text-[#EA580C]'>Recruiter Email *</label>
                                    <input id='recruiterEmail' {...register("recruiterEmail", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" type="email" />
                                    {errors.recruiterEmail?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Recruiter Email is required</p>
                                    )}
                                    <label htmlFor='photo' className='flex justify-start font-medium text-[#EA580C]'>Upload Recruiter Photo *</label>
                                    <input {...register("photo", { required: true })} className="file-input file-input-bordered w-full mt-1 mb-3" type="file" id='photo' />
                                    {errors.photo?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Photo is required</p>
                                    )}
                                    <label htmlFor='overview' className='flex justify-start font-medium text-[#EA580C]'>Opportunity Overview *</label>
                                    <textarea id='overview' {...register("overview", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} />
                                    {errors.overview?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Overview is required</ p>
                                    )}
                                    <label htmlFor='aboutTheRole' className='flex justify-start font-medium text-[#EA580C]'>About The Role *</label>
                                    <textarea id='aboutTheRole' {...register("aboutTheRole", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} />
                                    {errors.aboutTheRole?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">About The Role is required</ p>
                                    )}
                                    <label htmlFor='skillsRequired' className='flex justify-start font-medium text-[#EA580C]'>Skills Required *</label>
                                    <textarea id='skillsRequired' {...register("skillsRequired", { required: true })} className="w-full p-3 mb-4 border rounded-md bg-gradient-to-r from-white to-gray-50" rows={4} />
                                    {errors.skillsRequired?.type === "required" && (
                                        <p className="text-red-600 text-left pt-1">Skills is required</ p>
                                    )}
                                    <input type='submit' className='block w-full font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-4 mx-auto mt-5 rounded-3xl shadow-lg shadow-[#EA580C]/80 border-0 transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#EA580C]/80 active:scale-95 active:shadow-md active:shadow-[#EA580C]/80' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='text-center text-2xl font-bold mt-6 md:mt-12'>All Jobs</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 mt-4 mb-12'>
                    {allJob?.map((job, index) => <div key={index}>
                        <div className="block bg-gradient-to-r from-gray-100 via-white to-gray-400 rounded-lg shadow-sm shadow-indigo-100">
                            <div className="mt-2 p-4">
                                <dl>
                                    <div>
                                        <dt className="sr-only">Title</dt>

                                        <dd className="text-sm font-bold text-neutral-800">{job?.title}</dd>
                                    </div>

                                    <div>
                                        <dt className="sr-only">Location & Type</dt>
                                        <dd className="">{job?.locationType}</dd>
                                    </div>
                                </dl>
                                <div className='flex items-left pt-4'>
                                    <p className="text-xs px-2 py-1 rounded-lg bg-gray-800 font-medium text-white md:text-sm">{job?.category}</p>
                                </div>

                                <div className="mt-6 flex items-center gap-8">
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-base mt-1.5 sm:mt-0">
                                        <button onClick={() => open(job?._id)} className="hover:text-[#EA580C]"><FaEye /></button>
                                        <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                                            <div className={`absolute max-w-screen-md max-h-[95vh] overflow-y-auto rounded-lg bg-white mx-4 md:mx-0 p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                                                <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                                                <div>
                                                    <h1 className='font-medium'>{details?.locationType}</h1>
                                                </div>
                                                <div className="text-base px-8 font-black text-center mt-6">
                                                    {details?.title}
                                                </div>
                                                <p className="mt-4 px-8 text-sm text-center font-bold">
                                                    Keywords :  {details?.keyword}
                                                </p>
                                                <div className='flex justify-center py-3'><p className="text-xs px-2 py-1 rounded-lg bg-gray-300 font-medium text-white md:text-sm">{details?.category}</p></div>
                                                <div className='flex justify-center items-center mt-6'>
                                                    <Image src={details?.imageURL} alt='image' width={40} height={40} className='rounded-full' />
                                                </div>
                                                <p className="mt-4 px-8 text-sm text-center font-medium">
                                                    <h1><span className='font-bold'>{details?.recruiter}</span></h1>
                                                </p>
                                                <p className="mt-4 px-8 text-sm text-center font-medium">
                                                    <h1><span className='font-bold'>{details?.recruiterRole}</span></h1>
                                                </p>
                                                <p className="mt-4 px-8 text-sm text-center font-medium">
                                                    <h1><span className='font-bold'>{details?.recruiterEmail}</span></h1>
                                                </p>
                                                <p className="mt-4 text-sm text-center">
                                                    <h1 className='gradient-text font-bold py-1'>Overview About this job</h1>
                                                    <p className='text-neutral-400 px-8'>{details?.overview}</p>
                                                </p>
                                                <p className="mt-4 text-sm text-center">
                                                    <h1 className='gradient-text font-bold py-1'>About This Role</h1>
                                                    <p className='text-neutral-400 px-8'>{details?.aboutTheRole}</p>
                                                </p>
                                                <p className="mt-4 text-sm text-center">
                                                    <h1 className='gradient-text font-bold py-1'>Skills Required</h1>
                                                    <p className='text-neutral-400 px-8'>{details?.skillsRequired}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-xl">
                                        <div className="mt-1.5 sm:mt-0">
                                            <button className='hover:text-red-800' onClick={() => handleDelete(job?._id)}> <MdOutlineDelete /></button>
                                        </div>
                                    </div>
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-xl">
                                        <div className="mt-1.5 sm:mt-0">
                                            <Link href={`/dashboard/updateJob/${job?._id}`}><button className="hover:text-[#EA580C]"><FaRegEdit /></button></Link>
                                        </div>
                                    </div>
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-base">
                                        <div className="mt-1.5 sm:mt-0">
                                            {job?.status === "checked" ? <p className='text-blue-700 font-bold'>Checked</p> : <button onClick={() => handleChecked(job?._id)} className={`${isAdmin ? "text-red-700 border border-red-700 px-3 text-sm hover:text-white hover:bg-red-700 py-0.5 rounded" : "text-red-700"}`}>Pending</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </PrivateRoute>
    );
};

export default AllJob;