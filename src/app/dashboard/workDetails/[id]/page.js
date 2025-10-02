"use client";
import Loading from '@/components/shared/Loading/Loading';
import useWorks from '@/hooks/useWorks';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const WorkDetails = ({ params }) => {

    const [allWork, isWork] = useWorks();
    const workDetails = allWork?.find(work => work?._id === params?.id);
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/dashboard/allWork");
    };

    if (isWork) {
        return <Loading />
    }

    return (
        <PrivateRoute>
            <div className='fixed right-6 top-6'>
                <button className='flex items-center gap-2 text-[10px] md:text-base justify-end w-full' onClick={() => handleGoBack()}> <span className='border border-black hover:scale-105 duration-300 rounded-full p-1 md:p-2'><FaArrowLeft /></span> Go Back</button>
            </div>
            <div className='fixed bottom-4 right-12 z-50'>
                <Link href={`/dashboard/update/${workDetails?._id}`}><button className="flex items-center gap-2 text-white w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]">Edit <FaRegEdit size={20} /></button></Link>
            </div>
            <div className='max-w-screen-lg mx-auto'>
                <div className="mt-6 items-center gap-4 flex flex-col px-6">
                    <div className='flex justify-center items-center w-full'>
                        <Image src={workDetails?.imageURL}
                            alt='workThumbnailImages'
                            width={3000}
                            height={3000}
                            className='h-56 w-full rounded-t-3xl object-contain'
                        />
                    </div>
                    <div className="text-base px-8 font-black text-center">
                        <MarkdownPreview content={workDetails?.title} />
                    </div>
                    <p className="px-8 text-sm text-center font-medium">
                        {workDetails?.heading}
                    </p>
                    <p className="px-8 text-sm text-center font-bold">
                        {workDetails?.keyword?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}>{skill?.value}</p>)}
                    </p>
                    <div className='flex justify-center items-center py-3'>
                        <p className="text-xs font-medium md:text-sm flex flex-wrap gap-3">{workDetails?.category?.map((cat, index) => <p key={index} className={`text-white bg-gray-800 rounded-lg px-3 py-1`}>{cat?.value}</p>)}</p>
                    </div>
                    <p className="text-xs font-medium md:text-sm">Published Date : {workDetails?.formattedDate}</p>
                    <p className="my-4 text-sm text-center">
                        <h1 className='text-3xl font-bold pb-3'>Details About This Project</h1>
                        <MarkdownPreview content={workDetails?.details} />
                    </p>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default WorkDetails;