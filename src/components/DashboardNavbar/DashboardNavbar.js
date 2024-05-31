"use client";
import { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import { HiMenuAlt1 } from "react-icons/hi";
import { ImCross } from "react-icons/im";

const DashboardNavbar = () => {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <div>
            {/* Sidebar */}
            <button className="md:hidden duration-300" onClick={() => setIsToggle(!isToggle)}>
                {isToggle ? <ImCross /> : <HiMenuAlt1 />}
            </button>
            <div
                className={`absolute transition-all duration-500 ${isToggle ? "block" : "hidden"} flex-col w-[60%] min-w-[280px] h-full md:hidden`}>
                <SideNavbar />
            </div>
        </div>
    );
};

export default DashboardNavbar;