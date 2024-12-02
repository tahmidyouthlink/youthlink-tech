"use client";
import { MdLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdViewKanban } from "react-icons/md";
import { SiPolywork } from "react-icons/si";
import { FaBlog } from "react-icons/fa";
import Image from "next/image";
import logo from "/public/logos/logo-black-text.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "../shared/Loading/Loading";
import useAdmin from "@/hooks/useAdmin";
import { FaUser } from "react-icons/fa";
import { BiBookContent } from "react-icons/bi";

const SideNavbar = () => {
    const pathname = usePathname();
    const { user, logOut } = useAuth();
    const [isAdmin, pending] = useAdmin();

    const userList = [
        {
            name: "Dashboard",
            icon: <LuLayoutDashboard />,
            path: "/dashboard",
        },
        {
            name: "Our Works",
            icon: <SiPolywork />,
            path: "/dashboard/allWork",
        },
        {
            name: "Blogs Overview",
            icon: <FaBlog />,
            path: "/dashboard/allBlog"
        },
        {
            name: "Content",
            icon: <BiBookContent />,
            path: "/dashboard/marketingContent"
        },
        {
            name: "Careers",
            icon: <MdViewKanban />,
            path: "/dashboard/allJob"
        }
    ];

    const adminList = [
        {
            name: "Dashboard",
            icon: <LuLayoutDashboard />,
            path: "/dashboard",
        },
        {
            name: "Our Works",
            icon: <SiPolywork />,
            path: "/dashboard/allWork",
        },
        {
            name: "Blogs Overview",
            icon: <FaBlog />,
            path: "/dashboard/allBlog"
        },
        {
            name: "Content",
            icon: <BiBookContent />,
            path: "/dashboard/content"
        },
        {
            name: "Careers",
            icon: <MdViewKanban />,
            path: "/dashboard/allJob"
        },
        {
            name: "Create User",
            icon: <FaUser />,
            path: "/dashboard/addUser"
        },
    ]

    const handleLogout = () => {
        logOut().then(() => {
            toast.success("You're all set! See you next time.");
            window.location.href = "/authorized-login";
        }).catch(error => {
            console.error("Logout failed", error);
        });
    }

    if (pending) {
        return <Loading />
    }

    return (
        <div className="h-screen w-[60%] md:w-64 fixed z-50 drop-shadow-lg bg-custom-blue-1 overflow-y-auto bg-white">
            <div className="px-10 pt-4">
                <div className="flex items-center gap-1">
                    <Image
                        src={logo}
                        alt="YouthLink Logo"
                    />
                </div>
            </div>
            <div className="flex flex-col mt-5 gap-2">
                <>
                    {isAdmin ? <>{adminList?.map((item, index) => (
                        <Link
                            href={item?.path}
                            key={index}
                            className={`${pathname === item.path ? "text-white bg-gradient-to-t from-[#EA580C] to-[#EAB308]" : "text-neutral-600"} mx-4 rounded-lg`}>
                            <button
                                className={`flex items-center gap-2 w-full hover:bg-gradient-to-t hover:from-[#ea5a0cd1] hover:to-[#eab208c3] hover:text-white px-4 py-2 rounded-md font-medium`}>
                                <h2 className="p-2 text-2xl rounded-xl">
                                    {item?.icon}
                                </h2>
                                <h2 className="font-medium">{item?.name}</h2>
                            </button>
                        </Link>
                    ))}</> : <>{userList?.map((item, index) => (
                        <Link
                            href={item?.path}
                            key={index}
                            className={`${pathname === item.path ? "text-white bg-gradient-to-t from-[#EA580C] to-[#EAB308]" : "text-neutral-600"} mx-4 rounded-lg`}>
                            <button
                                className={`flex items-center gap-2 w-full hover:bg-gradient-to-t hover:from-[#ea5a0cd1] hover:to-[#eab208c3] hover:text-white px-4 py-2 rounded-md font-medium`}>
                                <h2 className="p-2 text-2xl rounded-xl">
                                    {item?.icon}
                                </h2>
                                <h2 className="font-medium">{item?.name}</h2>
                            </button>
                        </Link>
                    ))}</>}
                </>
            </div>
            <hr className="my-5" />
            <div className="flex justify-center items-center">
                {user &&
                    <button className="p-3 rounded-lg bg-red-700 hover:bg-red-800 text-white" onClick={handleLogout}><MdLogout /></button>
                }
            </div>
        </div>
    );
};

export default SideNavbar;