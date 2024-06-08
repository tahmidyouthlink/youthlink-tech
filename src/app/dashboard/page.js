"use client";
import { useState } from "react";
import PrivateRoute from "@/utils/Provider/PrivateRoute";
import WorkStat from "@/components/DashboardPages/Work/WorkStat";
import BlogStat from "@/components/DashboardPages/Blog/BlogStat";
import CareerStat from "@/components/DashboardPages/Career/CareerStat";
import WorkTable from "@/components/DashboardPages/Work/WorkTable";
import BlogTable from "@/components/DashboardPages/Blog/BlogTable";
import CareerTable from "@/components/DashboardPages/Career/CareerTable";

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
                        <WorkTable />
                    </div>
                    <div>
                        <WorkStat />
                    </div>
                </div>}
                {category === "Blogs" && <div>
                    <div>
                        <BlogTable />
                    </div>
                    <div>
                        <BlogStat />
                    </div>
                </div>}
                {category === "Careers" && <div>
                    <div>
                        <CareerTable />
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