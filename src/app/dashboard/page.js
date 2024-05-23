"use client";
import useCheckedWork from '@/hooks/useCheckedWork';
import useCheckedBlog from '@/hooks/useCheckedBlog';
import useCheckedJobCircular from '@/hooks/useCheckedJobCircular';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Loading from '@/components/shared/Loading/Loading';
import Image from 'next/image';
import { useState } from 'react';

const Dashboard = () => {

    const [checkedWork, isCheckedWork] = useCheckedWork();
    const [checkedBlog, isCheckedBlog] = useCheckedBlog();
    const [checkedJobCircular, isCheckedJobCircular] = useCheckedJobCircular();
    const [showMoreData, setShowMoreData] = useState(6);

    const toggleShowMore = () => {
        if (showMoreData === 6) {
            setShowMoreData(checkedWork.length);
        } else if (showMoreData > 6) {
            setShowMoreData(6);
        }
    };

    if (isCheckedBlog | isCheckedWork | isCheckedJobCircular) {
        return <Loading />
    }

    return (
        <PrivateRoute>
            <div>
                <h1 className='text-center mt-6 pb-2 font-bold px-6 text-xl'>Works Overview</h1>
                {
                    checkedWork?.length > 6 ? <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6">
                        {checkedWork?.slice(0, showMoreData).map((work, index) => (
                            <div key={index}>
                                <div className="group relative block bg-black">
                                    <Image
                                        alt="WORK IMAGE"
                                        src={work?.imageURL} height={100} width={600}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <p className="text-sm font-bold uppercase tracking-widest text-white">{work?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6" >
                        {checkedWork?.map((work, index) => (
                            <div key={index}>
                                <div className="group relative block bg-black">
                                    <Image
                                        alt="WORK IMAGE"
                                        src={work?.imageURL} height={100} width={600}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <p className="text-sm font-bold uppercase tracking-widest text-white">{work?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {checkedWork.length > 6 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-0.5 px-4 rounded-lg mx-auto">{showMoreData > 6 ? 'Show less' : 'Show More'}</button>
                    </div>
                )}
            </div>
            <div>
                <h1 className='text-center mt-6 pb-2 font-bold px-6 text-xl'>Blogs Overview</h1>
                {
                    checkedBlog?.length > 6 ? <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6">
                        {checkedBlog?.slice(0, showMoreData).map((blog, index) => (
                            <div key={index}>
                                <div className="group relative block bg-black">
                                    <Image
                                        alt="WORK IMAGE"
                                        src={blog?.imageURL} height={100} width={600}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <p className="text-sm font-bold uppercase tracking-widest text-white">{blog?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6" >
                        {checkedBlog?.map((blog, index) => (
                            <div key={index}>
                                <div className="group relative block bg-black">
                                    <Image
                                        alt="WORK IMAGE"
                                        src={blog?.imageURL} height={100} width={600}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <p className="text-sm font-bold uppercase tracking-widest text-white">{blog?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {checkedBlog.length > 6 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-0.5 px-4 rounded-lg mx-auto">{showMoreData > 6 ? 'Show less' : 'Show More'}</button>
                    </div>
                )}
            </div>
            <div>
                <h1 className='text-center mt-6 pb-2 font-bold px-6 text-xl'>Jobs Overview</h1>
                {
                    checkedJobCircular?.length > 6 ? <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6">
                        {checkedJobCircular?.slice(0, showMoreData).map((job, index) => (
                            <div key={index}>
                                <div className="group relative block bg-black">
                                    <Image
                                        alt="WORK IMAGE"
                                        src={job?.imageURL} height={100} width={600}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <p className="text-sm font-bold uppercase tracking-widest text-white">{job?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6" >
                        {checkedJobCircular?.map((job, index) => (
                            <div key={index}>
                                <div className="group relative block bg-black">
                                    <Image
                                        alt="WORK IMAGE"
                                        src={job?.imageURL} height={100} width={600}
                                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    />

                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <p className="text-sm font-bold uppercase tracking-widest text-white">{job?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {checkedJobCircular.length > 6 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-0.5 px-4 rounded-lg mx-auto">{showMoreData > 6 ? 'Show less' : 'Show More'}</button>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
};

export default Dashboard;