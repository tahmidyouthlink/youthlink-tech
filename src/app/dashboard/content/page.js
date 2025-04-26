"use client";
import Loading from '@/components/shared/Loading/Loading';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useMarketingContent from '@/hooks/useMarketingContent';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RxCheck, RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa6';
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md';

const MarketingContent = () => {

  const axiosPublic = useAxiosPublic();
  const [marketingContentList, isMarketingContentPending, refetchContent] = useMarketingContent();
  const [isColumnModalOpen, setColumnModalOpen] = useState(false);
  const [details, setDetails] = useState({});

  function open(id) {
    const singleData = marketingContentList?.find(content => content?._id === id);
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
        const res = await axiosPublic.delete(`/deleteMarketingContent/${id}`);
        if (res?.data?.deletedCount) {
          refetchContent();
          toast.custom((t) => (
            <div
              className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center ring-1 ring-black ring-opacity-5`}
            >
              <div className="pl-6">
                <RxCheck className="h-6 w-6 bg-green-500 text-white rounded-full" />
              </div>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="text-base font-bold text-gray-900">
                      Marketing content successfully deleted!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your marketing content has been deleted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center font-medium text-red-500 hover:text-text-700 focus:outline-none text-2xl"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
          ), {
            position: "bottom-right",
            duration: 5000
          })
        }
      }
    });
  }

  if (isMarketingContentPending) {
    return <Loading />
  }

  return (
    <PrivateRoute>
      <div className='relative'>
        <div className='fixed bottom-4 right-12 z-50'>
          <Link href={`/dashboard/content/add-content`}>
            <button className='flex items-center gap-2 text-white w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]'>
              <FiPlus size={20} />
              <h1>Add Content</h1>
            </button>
          </Link>
        </div>

        {marketingContentList?.length > 0 ? <><h1 className="px-6 mt-6 lg:px-12 text-2xl md:text-4xl font-semibold">All contents</h1>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 px-6 lg:px-12 mt-4 mb-12'>
            {marketingContentList?.map((content, index) => <div key={index}>
              <div className="bg-white rounded-2xl drop-shadow relative">
                <Image
                  alt="content images"
                  src={content?.imageUrl} height={2240} width={2000}
                  className="h-56 w-full rounded-t-3xl object-cover"
                />
                <div className="mt-2 p-5">
                  <p className="font-semibold text-neutral-800">{content?.title}</p>

                  <div className="mt-6 flex items-center flex-wrap gap-8">
                    <div className='group relative'>
                      <Button isIconOnly color='secondary' variant="ghost" onClick={() => { setColumnModalOpen(true); open(content?._id) }}><FaEye size={20} /></Button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">View</span>
                    </div>
                    <div className='group relative'>
                      <Button isIconOnly color="danger" onClick={() => handleDelete(content?._id)}> <MdOutlineDelete size={20} /></Button>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Delete</span>
                    </div>
                    <div className='group relative'>
                      <Link href={`/dashboard/content/${content?._id}`}><Button isIconOnly color="primary" variant="ghost"><MdOutlineModeEditOutline size={20} /></Button></Link>
                      <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Edit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div></> : <div className='text-2xl font-medium flex justify-center min-h-[80vh] items-center lg:text-3xl'><h1>There is no content posted</h1></div>}

      </div>

      <Modal size='2xl' isOpen={isColumnModalOpen} onClose={() => setColumnModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col bg-gray-200 gap-1">Content details</ModalHeader>
              <ModalBody className="modal-body-scroll">
                <div className='px-7'>
                  <div className='flex flex-col justify-center items-center mt-6'>
                    <Image src={details?.imageUrl} alt='image' width={1200} height={700} />
                    <div className="text-base px-8 font-black text-center mt-6">
                      {details?.title}
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center mt-6'>
                    <Image src={details?.imageUrl2} alt='image' width={1200} height={700} />
                    <div className="text-base px-8 font-black text-center mt-6">
                      {details?.title2}
                    </div>
                  </div>
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

    </PrivateRoute>
  );
};

export default MarketingContent;