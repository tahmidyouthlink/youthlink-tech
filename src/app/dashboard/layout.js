import React from "react";
import PrivateRoute from "@/utils/Provider/PrivateRoute";
import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar";
import SideNavbar from "@/components/SideNavbar/SideNavbar";

const layout = ({ children }) => {
    return (
        <PrivateRoute>
            <div>
                <div className="inset-y-0 flex-col hidden md:flex">
                    <SideNavbar />
                </div>
                <div className="relative md:ml-64">
                    <DashboardNavbar />
                    {children}
                </div>
            </div>
        </PrivateRoute>
    );
};

export default layout;