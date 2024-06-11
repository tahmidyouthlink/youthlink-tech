"use client";
import Loading from '@/components/shared/Loading/Loading';
import useWorks from '@/hooks/useWorks';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ImCross } from 'react-icons/im';
import { FaRegEdit } from 'react-icons/fa';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const WorkDetails = ({ params }) => {

    const [allWork, isWork] = useWorks();
    const workDetails = allWork?.find(work => work?._id === params?.id);

    if (isWork) {
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
                <Link href={`/dashboard/update/${workDetails?._id}`}><button className="flex items-center font-medium bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white px-4 hover:scale-105 transition duration-300 py-2 rounded-md gap-4">Edit <FaRegEdit size={20} /></button></Link>
            </div>
            <div className='max-w-screen-xl mx-auto'>
                <div className="mt-6 items-center gap-4 flex flex-col px-6">
                    <div className='flex justify-center items-center'>
                        <Image src={workDetails?.imageURL} alt='image' width={800} height={300} />
                    </div>
                    <div className="text-base px-8 font-black text-center">
                        {workDetails?.title}
                    </div>
                    <p className="px-8 text-sm text-center font-medium">
                        {workDetails?.heading}
                    </p>
                    <p className="px-8 text-sm text-center font-bold">
                        {workDetails?.keyword?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}>{skill?.value}</p>)}
                    </p>
                    <div className='flex flex-col gap-2 justify-evenly items-center'>
                        <p className="text-xs px-2 py-1 rounded-lg bg-gray-300 font-medium text-white md:text-sm">{workDetails?.category}</p>
                        <p className="text-xs font-medium md:text-sm">{workDetails?.formattedDate}</p>
                    </div>
                    <p className="mt-4 text-sm text-center">
                        <h1 className='gradient-text font-bold pb-3'>About The Project</h1>
                        <MarkdownPreview content={workDetails?.aboutTheProject} />
                    </p>
                    <p className="mt-4 text-sm text-center">
                        <h1 className='gradient-text font-bold pb-3'>Our Solution</h1>
                        <MarkdownPreview content={workDetails?.ourSolution} />
                    </p>
                    <p className="mt-4 text-sm text-center pb-3">
                        <h1 className='gradient-text font-bold pb-3'>The Results</h1>
                        <MarkdownPreview content={workDetails?.theResults} />
                    </p>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default WorkDetails;