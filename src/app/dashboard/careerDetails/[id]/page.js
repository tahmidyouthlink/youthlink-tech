"use client";
import Loading from '@/components/shared/Loading/Loading';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ImCross } from 'react-icons/im';
import { FaRegEdit } from 'react-icons/fa';
import Iframe from '@/components/Iframe/Iframe';
import useJobs from '@/hooks/useJobs';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const CareerDetails = ({ params }) => {

  const [allJob, isJob] = useJobs();
  const jobDetails = allJob?.find(job => job?._id === params?.id);

  if (isJob) {
    return <Loading />
  }

  return (
    <PrivateRoute>
      <div className='fixed right-2 top-2'>
        <Link href={'/dashboard'}>
          <ImCross className='hover:scale-105' size={20} />
        </Link>
      </div>
      <div className='fixed bottom-4 right-12 z-50'>
        <Link href={`/dashboard/updateJob/${jobDetails?._id}`}><button className="flex items-center font-medium bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white px-4 hover:scale-105 transition duration-300 py-2 rounded-md gap-4">Edit <FaRegEdit size={20} /></button></Link>
      </div>
      <div className='max-w-screen-xl mx-auto px-6'>
        <div className="items-center gap-4 flex flex-col px-6">
          <div className="text-base px-8 font-black text-center mt-6">
            {jobDetails?.title}
          </div>
          <div className='flex justify-center items-center'>
            <h1 className='font-medium'>{jobDetails?.locationType}</h1>
            <span className='px-2'>|</span>
            <h1 className='font-medium'>{jobDetails?.type}</h1>
          </div>
          <div className='flex justify-center items-center py-3'>
            <p className="text-xs font-medium md:text-sm flex flex-wrap gap-3">{jobDetails?.category?.map((cat, index) => <p key={index} className={`text-white bg-gray-800 rounded-lg px-3 py-1`}>{cat?.value}</p>)}</p>
          </div>
          <div className='flex justify-center items-center'>
            <Image src={jobDetails?.imageURL} alt='image' width={40} height={40} className='rounded-full' />
          </div>
          <p className="mt-4 px-8 text-sm text-center font-medium">
            <h1><span className='font-bold'>{jobDetails?.recruiter}</span></h1>
          </p>
          <p className="mt-4 px-8 text-sm text-center font-medium">
            <h1><span className='font-bold'>{jobDetails?.recruiterEmail}</span></h1>
          </p>
          <p className="mt-4 text-sm text-center">
            <h1 className='gradient-text font-bold py-1'>Job Description</h1>

            <MarkdownPreview content={jobDetails?.jobDescription} />
          </p>
          <p className="mt-4 text-sm text-center">
            <h1 className='gradient-text font-bold py-1'>Key Responsibilities</h1>

            <MarkdownPreview content={jobDetails?.keyResponsibilities} />
          </p>
          <p className="mt-4 text-sm text-center">
            <h1 className='gradient-text font-bold py-1'>Preferred Qualifications</h1>

            <MarkdownPreview content={jobDetails?.preferredQualifications} />
          </p>
          <p className="mb-4 text-sm text-center">
            <h1 className='gradient-text font-bold py-1'>Skills Required</h1>
            {jobDetails?.skillsRequired?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}>{skill?.value}</p>)}
          </p>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default CareerDetails;