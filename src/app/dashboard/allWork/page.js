"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useWorks from '@/hooks/useWorks';
import { FaEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import useAdmin from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const AllWork = () => {

  const [allWork, isWork, refetch] = useWorks();
  const [details, setDetails] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [isAdmin, pending] = useAdmin();
  const [workInfo, setWorkInfo] = useState(allWork);
  const [category, setCategory] = useState("All");

  function open(id) {
    setOpenModal(true);
    const singleData = allWork?.find(work => work?._id === id);
    setDetails(singleData);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  useEffect(() => {
    if (category === "All") {
      setWorkInfo(allWork);
    }
    else {
      const categoryIs = allWork?.filter(work => work?.category === category);
      setWorkInfo(categoryIs)
    }
  }, [allWork, category])

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
        const res = await axiosPublic.delete(`/deleteWork/${id}`);
        if (res?.data?.deletedCount) {
          refetch();
          toast.success("Your file has been deleted.")
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
          const res = await axiosPublic.patch(`/checkedWork/${id}`);
          if (res?.data?.modifiedCount) {
            refetch();
            toast.success("Approved!");
          }
        }
      });
    }
  }

  if (isWork || pending) {
    return <Loading />
  }

  return (
    <PrivateRoute>
      <div className='relative'>
        <div className='fixed bottom-4 right-12 z-50'>
          <Link href={`/dashboard/addWork`}>
            <button className='flex items-center font-medium bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white px-4 hover:scale-105 transition duration-300 py-2 rounded-md'>
              <FiPlus size={20} />
              <h1>Add Work</h1>
            </button>
          </Link>
        </div>
        <div className='flex items-center justify-center mt-6 md:mt-12 lg:mb-8 mb-4'>
          <h1 className="px-6 lg:px-12 text-2xl md:text-4xl font-semibold">All Works</h1>
          <select className="w-2/5 mx-auto lg:w-1/5 bg-gradient-to-r from-white to-gray-200 border p-2 rounded-lg" onChange={handleCategory}>
            <option value="All">All</option>
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
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 mt-4 mb-12'>
          {workInfo?.map((work, index) => <div key={index}>
            <div className="block bg-gradient-to-r from-gray-100 via-white to-gray-400 rounded-lg shadow-sm shadow-indigo-100">
              <Image
                alt="work images"
                src={work?.imageURL} height={224} width={1000}
                className="h-56 w-full rounded-t-md object-cover"
              />

              <div className="mt-2 p-4">
                <dl>
                  <div>
                    <dt className="sr-only">Title</dt>

                    <dd className="text-sm font-bold text-neutral-800">{work?.title}</dd>
                  </div>

                  <div>
                    <dt className="sr-only">Heading</dt>

                    <dd className="">{work?.heading}</dd>
                  </div>
                </dl>
                <div className='flex justify-between items-center pt-4'>
                  <p className="text-xs px-2 py-1 rounded-lg bg-gray-800 font-medium text-white md:text-sm">{work?.category?.map((cat, index) => <p key={index} className={`text-neutral-400 px-8`}>{cat?.value}</p>)}</p>
                  <p className="text-xs font-medium md:text-sm">{work?.formattedDate}</p>
                </div>

                <div className="mt-6 flex items-center gap-8">
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-base mt-1.5 sm:mt-0">
                    <button onClick={() => open(work?._id)} className="hover:text-[#EAB308]"><FaEye /></button>
                    <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                      <div className={`absolute max-w-screen-md max-h-[95vh] overflow-y-auto rounded-lg bg-white mx-4 md:mx-0 px-10 pt-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                        <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                        <div className='flex justify-center items-center mt-6'>
                          <Image src={details?.imageURL} alt='image' width={300} height={300} />
                        </div>
                        <div className="text-base px-8 font-black text-center mt-6">
                          {details?.title}
                        </div>
                        <p className="mt-4 px-8 text-sm text-center font-medium">
                          {details?.heading}
                        </p>
                        <p className="mt-4 px-8 text-sm text-center font-bold">
                          {details?.keyword?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}>{skill?.value}</p>)}
                        </p>
                        <div className='flex justify-evenly items-center py-3'>
                          <p className="text-xs px-2 py-1 rounded-lg bg-gray-300 font-medium text-white md:text-sm">{details?.category?.map((cat, index) => <p key={index} className={`text-neutral-400 px-8`}>{cat?.value}</p>)}</p>
                          <p className="text-xs font-medium md:text-sm">{details?.formattedDate}</p>
                        </div>
                        <p className="mt-4 text-sm text-center">
                          <h1 className='gradient-text font-bold py-1'>About The Project</h1>
                          <MarkdownPreview content={details?.aboutTheProject} />
                        </p>
                        <p className="mt-4 text-sm text-center">
                          <h1 className='gradient-text font-bold py-1'>Our Solution</h1>
                          <MarkdownPreview content={details?.ourSolution} />
                        </p>
                        <p className="mt-4 text-sm text-center">
                          <h1 className='gradient-text font-bold py-1'>The Results</h1>
                          <MarkdownPreview content={details?.theResults} />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-xl">
                    <div className="mt-1.5 sm:mt-0">
                      <button className='hover:text-red-800' onClick={() => handleDelete(work?._id)}> <MdOutlineDelete /></button>
                    </div>
                  </div>
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-xl">
                    <div className="mt-1.5 sm:mt-0">
                      <Link href={`/dashboard/update/${work?._id}`}><button className="hover:text-[#EA580C]"><FaRegEdit /></button></Link>
                    </div>
                  </div>
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-base">
                    <div className="mt-1.5 sm:mt-0">
                      {work?.status === "checked" ? <p className='text-blue-700 font-bold'>Approved</p> : <button onClick={() => handleChecked(work?._id)} className={`${isAdmin ? "block text-red-700 border border-red-700 px-3 text-sm hover:text-white hover:bg-red-700 py-0.5 rounded" : "text-red-700"}`}>Under Review</button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </PrivateRoute >
  );
};

export default AllWork;