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
import useJobs from '@/hooks/useJobs';

const AllJob = () => {

    const [allJob, isJob, refetch] = useJobs();
    const [details, setDetails] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const axiosPublic = useAxiosPublic();

    function open(id) {
        setOpenModal(true);
        const singleData = allJob?.find(job => job?._id === id);
        setDetails(singleData);
    }

    if (isJob) {
        return <Loading />
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/deleteJobCircular/${id}`);
                if (res?.data?.deletedCount) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <PrivateRoute>
            <h1 className='text-center text-2xl font-bold mt-6 md:mt-12'>All Jobs</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 mt-4 mb-12'>
                {allJob?.map((job, index) => <div key={index}>
                    <div className="mx-auto space-y-6 rounded-xl bg-glass px-4 pb-8 pt-4 font-sans shadow-lg">
                        <div className="mx-auto w-[85%] space-y-2 text-center font-semibold">
                            <h6 className="text-sm font-bold md:text-base lg:text-lg">{job?.locationType}</h6>
                            <p className="text-xs font-medium text-gray-400 md:text-sm">{job?.title}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-sm md:text-base">
                            <button onClick={() => handleDelete(job?._id)} className="rounded bg-[#DD2955] px-2 py-1 lg:px-5 lg:py-1.5 font-medium text-white duration-300 hover:scale-105 hover:bg-red-800 text-xs lg:text-sm flex gap-2 justify-center items-center">Delete <MdOutlineDelete className='text-xl' /></button>
                            <Link href={`/dashboard/updateJob/${job?._id}`}><button className="text-[#DD2955] border lg:py-1.5 px-2 py-1 lg:px-5 rounded border-[#DD2955] text-xs lg:text-sm hover:scale-105 duration-300 font-medium flex gap-2 justify-center items-center">Update <FaRegEdit className='text-lg' /></button></Link>
                            <button onClick={() => open(job?._id)} className="hover:text-sky-500"><FaEye /></button>
                            <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                                <div className={`absolute max-w-md max-h-[80vh] overflow-y-auto rounded-lg bg-white mx-4 md:mx-0 p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                                    <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                                    <div>
                                        <h1 className='font-medium'>{details?.locationType}</h1>
                                    </div>
                                    <div className="text-base px-8 font-black text-center mt-6">
                                        {details?.title}
                                    </div>
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
                                        <h1 className='text-red-700 font-bold py-1'>Overview About this job</h1>
                                        <p className='text-neutral-400 px-8'>{details?.overview}</p>
                                    </p>
                                    <p className="mt-4 text-sm text-center">
                                        <h1 className='text-red-700 font-bold py-1'>About This Role</h1>
                                        <p className='text-neutral-400 px-8'>{details?.aboutTheRole}</p>
                                    </p>
                                    <p className="mt-4 text-sm text-center">
                                        <h1 className='text-red-700 font-bold py-1'>Skills Required</h1>
                                        <p className='text-neutral-400 px-8'>{details?.skillsRequired}</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </PrivateRoute>
    );
};

export default AllJob;