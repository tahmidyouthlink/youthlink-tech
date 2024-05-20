import PrivateRoute from '@/utils/Provider/PrivateRoute';
import Image from 'next/image';
import React from 'react';

const Dashboard = () => {
    return (
        <PrivateRoute>
            <section className="flex min-h-screen  w-full items-center justify-center px-8 bg-[#f4f7fa]">
                <div className="flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between">
                    <div className="max-w-md md:space-y-6 sm:space-y-5 space-y-4">
                        <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold leading-tight text-gray-900">Elevate Your Content Management</h1>
                        <p className="lg:text-lg sm:text-base text-sm text-gray-600">
                        Streamline and enhance your website operations with our intuitive dashboard, designed to simplify portfolio updates, blog management, job postings, and applicant tracking.
                        </p>
                        <p className="text-sm text-gray-500">Trusted by 5000+ Users</p>
                    </div>
                    <div className="relative">
                        <Image src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" className="relative md:h-[600px]  sm:h-[500px] h-[300px]  w-[500px] bg-gray-400 rounded-b-full object-cover" alt="hero" height={300} width={500} />
                    </div>
                </div>
            </section>

        </PrivateRoute>
    );
};

export default Dashboard;