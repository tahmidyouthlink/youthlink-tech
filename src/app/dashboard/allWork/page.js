"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useWorks from '@/hooks/useWorks';
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
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const AllWork = () => {

  const [allWork, isWork, refetch] = useWorks();
  const [details, setDetails] = useState({});
  const axiosPublic = useAxiosPublic();
  const [isAdmin, pending] = useAdmin();
  const [isColumnModalOpen, setColumnModalOpen] = useState(false);

  function open(id) {
    const singleData = allWork?.find(work => work?._id === id);
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
        const res = await axiosPublic.delete(`/deleteWork/${id}`);
        if (res?.data?.deletedCount) {
          refetch();
          toast.success("Work has been deleted.")
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
            <button className='flex items-center gap-2 text-white w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]'>
              <FiPlus size={20} />
              <h1>Add Work</h1>
            </button>
          </Link>
        </div>
        {allWork?.length > 0 ? <><h1 className="px-6 mt-6 lg:px-12 text-2xl md:text-4xl font-semibold">All Works</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 mt-4 mb-12'>
            {allWork?.map((work, index) => <div key={index}>
              <div className="bg-white rounded-2xl drop-shadow relative">
                <p className="text-xs font-medium md:text-sm absolute right-0 px-4 py-1 rounded-3xl border border-white/20 bg-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30 shadow-2xl text-white">{work?.formattedDate}</p>
                <Image
                  alt="work images"
                  src={work?.imageURL} height={2240} width={2000}
                  className="h-56 w-full rounded-t-3xl object-cover"
                />
                <div className="mt-2 p-5">
                  <p className="font-semibold text-neutral-800">{work?.title}</p>
                  <div className='h-20'>
                    <p className='text-neutral-500 pt-2'>{work?.heading}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-8">
                    <div className='group relative'>
                      <Button isIconOnly color='secondary' variant="ghost" onClick={() => { setColumnModalOpen(true); open(work?._id) }}><FaEye size={20} /></Button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">View</span>
                    </div>
                    <div className='group relative'>
                      <Button isIconOnly color="danger" onClick={() => handleDelete(work?._id)}> <MdOutlineDelete size={20} /></Button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Delete</span>
                    </div>
                    <div className='group relative'>
                      <Link href={`/dashboard/update/${work?._id}`}><Button isIconOnly color="primary" variant="ghost"><MdOutlineModeEditOutline size={20} /></Button></Link>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Edit</span>
                    </div>
                    {work?.status === "checked" ? <p className='text-blue-700 font-bold'>Approved</p> : <div className='group relative'>
                      <button onClick={() => handleChecked(work?._id)} className={`${isAdmin ? "block text-red-700 border border-red-700 px-3 text-sm hover:text-white hover:bg-red-700 py-0.5 rounded" : "text-red-700"}`}>Under Review</button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Edit</span>
                    </div>}
                  </div>
                </div>
              </div>
            </div>)}
          </div></> : <div className='text-2xl font-medium flex justify-center min-h-[80vh] items-center lg:text-3xl'><h1>There is no work posted</h1></div>}
      </div>

      <Modal size='2xl' isOpen={isColumnModalOpen} onClose={() => setColumnModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col bg-gray-200 gap-1">Work details</ModalHeader>
              <ModalBody className="modal-body-scroll">
                <div className='px-7'>
                  <div className='flex justify-center items-center mt-6'>
                    <Image src={details?.imageURL} alt='image' width={3000} height={3000} />
                  </div>
                  <div className="text-base px-8 font-black text-center mt-6">
                    {details?.title}
                  </div>
                  <p className="mt-4 px-8 text-sm text-center font-medium">
                    {details?.heading}
                  </p>
                  <p className="mt-4 px-8 text-sm text-center font-bold">
                    {details?.keyword?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}># {skill?.value}</p>)}
                  </p>
                  <div className='flex justify-center items-center py-3'>
                    <p className="text-xs font-medium md:text-sm flex justify-center flex-wrap gap-3">{details?.category?.map((cat, index) => <p key={index} className={`text-white w-fit h-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]`}>{cat?.value}</p>)}</p>
                  </div>
                  <p className="text-xs font-medium md:text-sm text-center">Published Date : {details?.formattedDate}</p>
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
              </ModalBody>
              <ModalFooter className="border">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </PrivateRoute >
  );
};

export default AllWork;