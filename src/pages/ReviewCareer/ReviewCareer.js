"use client";
import React, { useState } from 'react';
import useReviewCareer from '@/hooks/useReviewCareer';
import Loading from '@/components/shared/Loading/Loading';
import PrivateRoute from '@/utils/Provider/PrivateRoute';

const ReviewCareer = () => {
    const [reviewJobCircular, isReviewJobCircular] = useReviewCareer();
    const [showMoreData, setShowMoreData] = useState(6);

    const toggleShowMore = () => {
        if (showMoreData === 6) {
            setShowMoreData(reviewJobCircular.length);
        } else if (showMoreData > 6) {
            setShowMoreData(6);
        }
    };

    if (isReviewJobCircular) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <div className="grid grid-cols-2 lg:grid-cols-3  2xl:grid-cols-6 gap-4 max-w-screen-xl mx-auto px-6 mt-8 md:mt-12 xl:mt-16">
                    {reviewJobCircular?.slice(0, showMoreData).map((job, index) => (
                        <div key={index}>
                            <div className="block bg-gradient-to-r from-gray-100 via-white to-gray-400 rounded-lg shadow-sm shadow-indigo-100 p-4">
                                <div className="mt-2 p-4">
                                    <dl>
                                        <div>
                                            <dt className="sr-only">Title</dt>
                                            <dd className="text-sm font-bold text-neutral-800">{job?.title}</dd>
                                        </div>
                                        <div>
                                            <dt className="sr-only">Location & Type</dt>
                                            <dd>{job?.locationType}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {reviewJobCircular?.length > 6 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-bold bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-white py-0.5 px-4 rounded-lg mx-auto">{showMoreData > 6 ? 'Show less' : 'Show More'}</button>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
};

export default ReviewCareer;