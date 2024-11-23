"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { FaEye } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Image from 'next/image';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import useAdmin from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';
import useJobs from '@/hooks/useJobs';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const CareerPage = () => {

  const [allJob, isJob, refetch] = useJobs();
  const [details, setDetails] = useState({});
  const axiosPublic = useAxiosPublic();
  const [isAdmin, pending] = useAdmin();
  const [isColumnModalOpen, setColumnModalOpen] = useState(false);

  function open(id) {
    const singleData = allJob?.find(job => job?._id === id);
    setDetails(singleData);
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
          toast.success("Job has been deleted.")
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
          const res = await axiosPublic.patch(`/checkedJobCircular/${id}`);
          if (res?.data?.modifiedCount) {
            refetch();
            toast.success("Approved!");
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
      <div className='relative'>
        <div className='fixed bottom-4 right-12 z-50'>
          <Link href={`/dashboard/addCareer`}>
            <button className='flex items-center font-medium bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white px-4 hover:scale-105 transition duration-300 py-2 rounded-md'>
              <FiPlus size={20} />
              <h1>Add Career</h1>
            </button>
          </Link>
        </div>
        {allJob?.length > 0 ? <>
          <h1 className='px-6 lg:px-12 text-2xl md:text-4xl font-semibold mt-6 lg:mb-8 mb-4'>All vacancies</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 mt-4 mb-12'>
            {allJob?.map((job, index) => <div key={index}>
              <div className="block bg-gradient-to-r from-gray-100 via-white to-gray-400 rounded-lg shadow-sm shadow-indigo-100">
                <div className="mt-2 p-4">
                  <dl>
                    <div>
                      <dt className="sr-only">Title</dt>

                      <dd className="text-sm font-bold text-neutral-800">{job?.title}</dd>
                    </div>

                    <div className='flex gap-2 items-center'>
                      <dd className="">{job?.locationType}</dd>|
                      <dd className="">{job?.type}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-center flex-wrap gap-8">
                    <div className='group relative'>
                      <Button isIconOnly color='secondary' variant="ghost" onClick={() => { setColumnModalOpen(true); open(job?._id) }}><FaEye size={20} /></Button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">View</span>
                    </div>
                    <div className='group relative'>
                      <Button isIconOnly color="danger" onClick={() => handleDelete(job?._id)}> <MdOutlineDelete size={20} /></Button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Delete</span>
                    </div>
                    <div className='group relative'>
                      <Link href={`/dashboard/updateJob/${job?._id}`}><Button isIconOnly color="primary" variant="ghost"><MdOutlineModeEditOutline size={20} /></Button></Link>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Edit</span>
                    </div>
                    {job?.status === "checked" ? <p className='text-blue-700 font-bold'>Approved</p> : <div className='group relative'>
                      <button onClick={() => handleChecked(job?._id)} className={`${isAdmin ? "block text-red-700 border border-red-700 px-3 text-sm hover:text-white hover:bg-red-700 py-0.5 rounded" : "text-red-700"}`}>Under Review</button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Edit</span>
                    </div>}
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </> : <div className='text-2xl font-medium flex justify-center min-h-[80vh] items-center lg:text-3xl'><h1>There is no job published</h1></div>}
      </div>

      <Modal size='2xl' isOpen={isColumnModalOpen} onClose={() => setColumnModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col bg-gray-200 gap-1">Job details</ModalHeader>
              <ModalBody className="modal-body-scroll">
                <div className='px-7'>
                  <div className="text-base px-8 font-black text-center mt-6">
                    {details?.title}
                  </div>
                  <div className='flex justify-center items-center my-4'>
                    <h1 className='font-medium'>{details?.locationType}</h1>
                    <span className='px-2'>|</span>
                    <h1 className='font-medium'>{details?.type}</h1>
                  </div>
                  <div className='flex justify-center items-center py-3'>
                    <p className="text-xs font-medium md:text-sm flex justify-center flex-wrap gap-3">{details?.category?.map((cat, index) => <p key={index} className={`text-white w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>{cat?.value}</p>)}</p>
                  </div>
                  <div className='flex justify-center items-center mt-6'>
                    <Image src={details?.imageURL} alt='image' width={40} height={40} className='rounded-full' />
                  </div>
                  <p className="mt-4 px-8 text-sm text-center font-medium">
                    <h1><span className='font-bold'>{details?.recruiter}</span></h1>
                  </p>
                  <p className="mt-4 px-8 text-sm text-center font-medium">
                    <h1><span className='font-bold'>{details?.recruiterEmail}</span></h1>
                  </p>
                  <p className="mt-4 text-sm text-center">
                    <h1 className='gradient-text font-bold py-1'>Job Description</h1>
                    <MarkdownPreview content={details?.jobDescription} />
                  </p>
                  <p className="mt-4 text-sm text-center">
                    <h1 className='gradient-text font-bold py-1'>Key Responsibilities</h1>

                    <MarkdownPreview content={details?.keyResponsibilities} />
                  </p>
                  <p className="mt-4 text-sm text-center">
                    <h1 className='gradient-text font-bold py-1'>Preferred Qualifications</h1>

                    <MarkdownPreview content={details?.preferredQualifications} />
                  </p>
                  <p className="mt-4 text-sm text-center">
                    <h1 className='gradient-text font-bold py-1'>Skills Required</h1>
                    {details?.skillsRequired?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}>{skill?.value}</p>)}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="border">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal >

    </PrivateRoute >
  );
};

export default CareerPage;