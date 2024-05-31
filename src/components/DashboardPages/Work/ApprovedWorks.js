import React, { useState } from 'react';
import Loading from '@/components/shared/Loading/Loading';
import Image from 'next/image';
import useCheckedWork from '@/hooks/useCheckedWork';
import PrivateRoute from '@/utils/Provider/PrivateRoute';

const ApprovedWorks = () => {
    const [checkedWork, isCheckedWork] = useCheckedWork();
    const [showMoreData, setShowMoreData] = useState(6);

    const toggleShowMore = () => {
        if (showMoreData === 6) {
            setShowMoreData(checkedWork.length);
        } else if (showMoreData > 6) {
            setShowMoreData(6);
        }
    };

    if (isCheckedWork) {
        return <Loading />;
    }

    return (
        <PrivateRoute>
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-6 max-w-screen-xl mx-auto px-6 mt-8 md:mt-12 xl:mt-16">
                    {checkedWork?.slice(0, showMoreData).map((work, index) => (
                        <div key={index}>
                            <div className="group relative block bg-black rounded-xl h-[300px] 2xl:h-[400px]">
                                <Image
                                    alt="WORK IMAGE"
                                    src={work?.imageURL} height={100} width={1600}
                                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-xl"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-white">{work?.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {checkedWork?.length > 6 && (
                    <div onClick={toggleShowMore} className="my-6 md:my-8 px-6 flex justify-center">
                        <button className="font-medium bg-gradient-to-r from-[#EA580C] to-[#EAB308] text-white py-2 px-4 rounded-lg mx-auto hover:bg-gradient-to-t hover:from-[#EAB308] hover:to-[#EA580C]">{showMoreData > 6 ? 'Show less' : 'Show More'}</button>
                    </div>
                )}
            </div>
        </PrivateRoute>
    );
};

export default ApprovedWorks;