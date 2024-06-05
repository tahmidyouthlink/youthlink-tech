"use client";
import { useState } from "react";
import PrivateRoute from "@/utils/Provider/PrivateRoute";
import ApprovedCareers from "@/components/DashboardPages/Career/ApprovedCareers";
import UnderReviewCareers from "@/components/DashboardPages/Career/UnderReviewCareers";
import ApprovedWorks from "@/components/DashboardPages/Work/ApprovedWorks";
import UnderReviewWorks from "@/components/DashboardPages/Work/UnderReviewWorks";
import ApprovedBlogs from "@/components/DashboardPages/Blog/ApprovedBlogs";
import UnderReviewBlogs from "@/components/DashboardPages/Blog/UnderReviewBlogs";
import WorkStat from "@/components/DashboardPages/Work/WorkStat";
import BlogStat from "@/components/DashboardPages/Blog/BlogStat";
import CareerStat from "@/components/DashboardPages/Career/CareerStat";

const Dashboard = () => {
    const [category, setCategory] = useState("Our Work");

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    return (
        <PrivateRoute>
            <div className="max-w-screen-xl mx-auto xl:space-y-3 py-6 lg:py-12">
                <select className="ml-8 w-2/5 mx-auto lg:w-1/5 bg-gradient-to-r from-white to-gray-200 border p-2 rounded-lg" onChange={handleCategory}>
                    <option value="Our Work">Our Work</option>
                    <option value="Blogs">Blogs</option>
                    <option value="Careers">Careers</option>
                </select>
                {category === "Our Work" && <div>
                    <div>
                        <ApprovedWorks />
                    </div>
                    <div>
                        <UnderReviewWorks />
                    </div>
                    <div>
                        <WorkStat />
                    </div>
                </div>}
                {category === "Blogs" && <div>
                    <div>
                        <ApprovedBlogs />
                    </div>
                    <div>
                        <UnderReviewBlogs />
                    </div>
                    <div>
                        <BlogStat />
                    </div>
                </div>}
                {category === "Careers" && <div>
                    <div>
                        <ApprovedCareers />
                    </div>
                    <div>
                        <UnderReviewCareers />
                    </div>
                    <div>
                        <CareerStat />
                    </div>
                </div>}
            </div>
        </PrivateRoute>
    );
};

export default Dashboard;