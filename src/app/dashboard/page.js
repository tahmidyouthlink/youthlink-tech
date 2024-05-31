"use client";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { MdViewKanban } from "react-icons/md";
import { SiPolywork } from "react-icons/si";
import { FaBlog } from "react-icons/fa";
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
    const [activeMainTab, setActiveMainTab] = useState(0);
    const [activeWorkSubTab, setActiveWorkSubTab] = useState(0);

    const handleMainTabClick = (index) => {
        setActiveMainTab(index);
        if (index !== 0) {
            setActiveWorkSubTab(0); // Reset sub-tab if switching to a different main tab
        }
    };

    const handleWorkSubTabClick = (index) => {
        setActiveWorkSubTab(index);
    };

    return (
        <div>
            <div className="max-w-screen-xl mx-auto xl:space-y-3 py-6 lg:py-12">
                <div className="max-w-screen-xl mx-auto px-6 2xl:px-0">
                    <Tabs>
                        <TabList className="flex items-center justify-center gap-2 lg:gap-6 overflow-auto text-white">
                            <Tab
                                onClick={() => handleMainTabClick(0)}
                                className={
                                    activeMainTab === 0
                                        ? "flex items-center gap-2 border-[#EAB308] bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-xs xl:text-base rounded-lg md:py-2.5 py-2 px-4 md:px-5 font-medium"
                                        : "text-xs border xl:text-base  bg-white rounded-lg font-medium border-[#EAB308] text-[#EAB308] flex items-center gap-2 md:py-2.5 py-2 px-4 md:px-5"
                                }
                            >
                                <SiPolywork size={20} />
                                Work
                            </Tab>
                            <Tab
                                onClick={() => handleMainTabClick(1)}
                                className={
                                    activeMainTab === 1
                                        ? "flex items-center gap-2 border-[#EAB308] bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-xs xl:text-base rounded-lg md:py-2.5 py-2 px-4 md:px-5 font-medium"
                                        : "text-xs border xl:text-base  bg-white rounded-lg font-medium border-[#EAB308] text-[#EAB308] flex items-center gap-2 md:py-2.5 py-2 px-4 md:px-5"
                                }
                            >
                                <FaBlog size={20} />
                                Blog
                            </Tab>
                            <Tab
                                onClick={() => handleMainTabClick(2)}
                                className={
                                    activeMainTab === 2
                                        ? "flex items-center gap-2 border-[#EAB308] bg-gradient-to-t from-[#EA580C] to-[#EAB308] text-xs xl:text-base rounded-lg md:py-2.5 py-2 px-4 md:px-5 font-medium"
                                        : "text-xs border xl:text-base  bg-white rounded-lg font-medium border-[#EAB308] text-[#EAB308] flex items-center gap-2 md:py-2.5 py-2 px-4 md:px-5"
                                }
                            >
                                <MdViewKanban size={20} />
                                Career
                            </Tab>
                        </TabList>
                        <TabPanel>
                            {/* Work */}
                            <Tabs>
                                <TabList className="flex items-center justify-center lg:gap-6 overflow-auto mt-8 gap-4">
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(0)}
                                        className={
                                            activeWorkSubTab === 0
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Approved
                                    </Tab>
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(1)}
                                        className={
                                            activeWorkSubTab === 1
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Under Review
                                    </Tab>
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(2)}
                                        className={
                                            activeWorkSubTab === 2
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Statistics
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    {/* Approved content */}
                                    <ApprovedWorks />
                                </TabPanel>
                                <TabPanel>
                                    {/* Under Review content */}
                                    <UnderReviewWorks />
                                </TabPanel>
                                <TabPanel>
                                    {/* Statistics content */}
                                    <WorkStat />
                                </TabPanel>
                            </Tabs>
                        </TabPanel>

                        <TabPanel>
                            {/* Blog content */}
                            <Tabs>
                                <TabList className="flex items-center justify-center lg:gap-6 overflow-auto mt-8 gap-4">
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(0)}
                                        className={
                                            activeWorkSubTab === 0
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Approved
                                    </Tab>
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(1)}
                                        className={
                                            activeWorkSubTab === 1
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Under Review
                                    </Tab>
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(2)}
                                        className={
                                            activeWorkSubTab === 2
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Statistics
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    {/* Approved content */}
                                    <ApprovedBlogs />
                                </TabPanel>
                                <TabPanel>
                                    {/* REVIEW content */}
                                    <UnderReviewBlogs />
                                </TabPanel>
                                <TabPanel>
                                    {/* STATISTICS */}
                                    <BlogStat />
                                </TabPanel>
                            </ Tabs>
                        </TabPanel>
                        <TabPanel>
                            {/* Career content */}
                            <Tabs>
                                <TabList className="flex items-center justify-center lg:gap-6 overflow-auto mt-8 gap-4">
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(0)}
                                        className={
                                            activeWorkSubTab === 0
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Approved
                                    </Tab>
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(1)}
                                        className={
                                            activeWorkSubTab === 1
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Under Review
                                    </Tab>
                                    <Tab
                                        onClick={() => handleWorkSubTabClick(2)}
                                        className={
                                            activeWorkSubTab === 2
                                                ? "flex items-center text-xs xl:text-base gap-4 border-b-2 border-b-[#EAB308] font-bold"
                                                : "text-xs xl:text-base font-bold flex items-center"
                                        }
                                    >
                                        Statistics
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    {/* Approved content */}
                                    <ApprovedCareers />
                                </TabPanel>
                                <TabPanel>
                                    {/* REVIEW content */}
                                    <UnderReviewCareers />
                                </TabPanel>
                                <TabPanel>
                                    {/* STATISTICS */}
                                    <CareerStat />
                                </TabPanel>
                            </ Tabs>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;