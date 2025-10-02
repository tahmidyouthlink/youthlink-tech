"use client";
import Loading from '@/components/shared/Loading/Loading';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ImCross } from 'react-icons/im';
import { FaRegEdit } from 'react-icons/fa';
import useBlogs from '@/hooks/useBlogs';
import Iframe from '@/components/Iframe/Iframe';

const MarkdownPreview = dynamic(() => import('@/utils/Markdown/MarkdownPreview/MarkdownPreview'), { ssr: false });

const BlogDetails = ({ params }) => {

    const [allBlog, isBlog] = useBlogs();
    const blogDetails = allBlog?.find(blog => blog?._id === params?.id);

    if (isBlog) {
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
                <Link href={`/dashboard/updateBlog/${blogDetails?._id}`}><button className="flex items-center gap-2 text-white w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[background-position] duration-700 ease-in-out hover:bg-[50%_100%]">Edit <FaRegEdit size={20} /></button></Link>
            </div>
            <div className='max-w-screen-xl mx-auto px-6'>
                <div className="mt-6 items-center gap-4 flex flex-col px-6">
                    <div className='flex justify-center items-center mt-6'>
                        {blogDetails?.imageURL && <Image src={blogDetails?.imageURL} alt='image' height={100} width={200} />}
                    </div>
                    <div className="text-base px-8 font-black text-center">
                        {blogDetails?.title}
                    </div>
                    <p className="px-8 text-sm text-center font-bold">
                        {blogDetails?.keyword?.map((skill, index) => <p key={index} className={`text-neutral-400 px-8`}>{skill?.value}</p>)}
                    </p>
                    <div className='flex justify-center items-center py-3'>
                        <p className="text-xs font-medium md:text-sm flex flex-wrap gap-3">{blogDetails?.category?.map((cat, index) => <p key={index} className={`text-white bg-gray-800 rounded-lg px-3 py-1`}>{cat?.value}</p>)}</p>
                    </div>
                    <p className="text-xs font-medium md:text-sm">Published Date : {blogDetails?.formattedDate}</p>
                    <div className='flex justify-center items-center my-3'>
                        <Iframe iframeData={blogDetails?.embed} />
                    </div>
                    <p className="text-sm text-center">
                        <h1 className='gradient-text font-bold py-1'>Blog overview</h1>
                        <MarkdownPreview content={blogDetails?.overview} />
                    </p>
                    <p className="text-sm text-center">
                        <h1 className='gradient-text font-bold py-1'>About This Blog</h1>
                        <MarkdownPreview content={blogDetails?.description} />
                    </p>
                    <div className="mb-4 text-sm text-center">
                        <h1 className='gradient-text font-bold py-1'>Featured Post Title</h1>
                        <p>
                            {blogDetails?.featuredTitle ? blogDetails?.featuredTitle : "Not Selected"}
                        </p>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default BlogDetails;