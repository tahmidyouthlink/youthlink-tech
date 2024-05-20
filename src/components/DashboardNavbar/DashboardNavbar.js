"use client";
import { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import { Menu, X } from "lucide-react";

const DashboardNavbar = () => {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <div>
            {/* Sidebar */}
            <button className="md:hidden duration-300" onClick={() => setIsToggle(!isToggle)}>
                {isToggle ? <X /> : <Menu />}
            </button>
            <div
                className={`absolute transition-all duration-500 ${isToggle ? "block" : "hidden"} flex-col w-[60%] min-w-[280px] h-full md:hidden`}>
                <SideNavbar />
            </div>
        </div>
    );
};

export default DashboardNavbar;