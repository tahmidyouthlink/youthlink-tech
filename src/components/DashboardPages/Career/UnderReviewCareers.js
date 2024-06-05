import React, { useState } from 'react';
import useReviewCareer from '@/hooks/useReviewCareer';
import Loading from '@/components/shared/Loading/Loading';
import PrivateRoute from '@/utils/Provider/PrivateRoute';

const UnderReviewCareers = () => {
    const [reviewJobCircular, isReviewJobCircular] = useReviewCareer();
    const [showMoreData, setShowMoreData] = useState(5);

    const toggleShowMore = () => {
        if (showMoreData === 5) {
            setShowMoreData(reviewJobCircular.length);
        } else if (showMoreData > 5) {
            setShowMoreData(5);
        }
    };

    if (isReviewJobCircular) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            {reviewJobCircular?.length > 0 ? <div>
                <h1 className='mt-8 lg:mt-16 my-4 px-10 text-center font-semibold'>Under Review Job Circulars</h1>
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Category</th>
                                    <th>Keywords</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {reviewJobCircular?.slice(0, showMoreData).map((work, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold">{work?.title}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="px-4 py-1 text-[10px] md:text-xs lg:text-base bg-gray-200 rounded-lg">{work?.category}</span>
                                        </td>
                                        <td>{work?.skillsRequired?.map((skill, index) => <p key={index} className={`text-neutral-400`}>{skill?.value}</p>)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {reviewJobCircular?.length > 5 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-medium bg-gradient-to-r from-[#EA580C] to-[#EAB308] text-white py-2 px-4 rounded-lg mx-auto hover:bg-gradient-to-t hover:from-[#EAB308] hover:to-[#EA580C]">{showMoreData > 5 ? 'Show less' : 'Show More'}</button>
                    </div>
                )}
            </div> : <div>
                <h1 className='mt-8 my-4 px-10 font-semibold text-center'>Under Review Job Circulars</h1>
                <h1 className='text-center my-8'>There is no under review job circulars</h1>
            </div>}
        </PrivateRoute>
    );
};

export default UnderReviewCareers;