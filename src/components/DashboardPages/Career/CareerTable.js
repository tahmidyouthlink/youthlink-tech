// import React, { useState } from 'react';
import Loading from '@/components/shared/Loading/Loading';
import PrivateRoute from '@/utils/Provider/PrivateRoute';
import useJobs from '@/hooks/useJobs';

const CareerTable = () => {
    const [allJob, isJob] = useJobs();
    // const [showMoreData, setShowMoreData] = useState(5);

    // const toggleShowMore = () => {
    //     if (showMoreData === 5) {
    //         setShowMoreData(allJob.length);
    //     } else if (showMoreData > 5) {
    //         setShowMoreData(5);
    //     }
    // };

    if (isJob) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            {allJob?.length > 0 ? <div>
                <h1 className='mt-8 my-4 px-10 font-semibold text-center'>Approved Job Circulars</h1>
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Category</th>
                                    <th>Keywords</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {/* {allJob?.slice(0, showMoreData).map((job, index) => ( */}
                                {allJob?.map((job, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold">{job?.title}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="px-4 py-1 text-[10px] md:text-xs lg:text-base bg-gray-200 rounded-lg">{job?.category}</span>
                                        </td>
                                        <td>{job?.skillsRequired?.map((skill, index) => <p key={index} className={`text-neutral-400`}>{skill?.value}</p>)}</td>
                                        <td>{job?.status === "checked" ? <span className='text-blue-700 font-bold'>Approved</span> : <span className='text-red-700 font-bold'>Under Review</span>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* {allJob?.length > 5 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-medium bg-gradient-to-r from-[#EA580C] to-[#EAB308] text-white py-2 px-4 rounded-lg mx-auto hover:bg-gradient-to-t hover:from-[#EAB308] hover:to-[#EA580C]">{showMoreData > 5 ? 'Show less' : 'Show More'}</button>
                    </div>
                )} */}
            </div> : <div>
                <h1 className='mt-8 my-4 px-10 font-semibold text-center'>Careers</h1>
                <h1 className='text-center my-8'>There is no careers</h1>
            </div>}
        </PrivateRoute>
    );
};

export default CareerTable;