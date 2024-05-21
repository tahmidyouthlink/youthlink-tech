"use client";
import { MdLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdViewKanban } from "react-icons/md";
import { SiPolywork } from "react-icons/si";
import { FaBlog } from "react-icons/fa";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import logo from "../../assets/YouthLink-removebg-preview (1).png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const SideNavbar = () => {
    const pathname = usePathname();
    const { user, logOut } = useAuth(); //current or logged in user
    const router = useRouter();
    // console.log(user);
    const menuList = [
        {
            name: "Dashboard",
            icon: <LuLayoutDashboard />,
            path: "/dashboard",
        },
        {
            name: "Our Work",
            icon: <SiPolywork />,
            path: "/dashboard/allWork",
        },
        {
            name: "Blogs Overview",
            icon: <FaBlog />,
            path: "/dashboard/allBlog"
        },
        {
            name: "Carriers",
            icon: <MdViewKanban />,
            path: "/dashboard/allJob"
        }
    ];

    const handleLogout = () => {
        logOut().then(() => {
            toast.success("Logout successful");
            router.push("/")
        })
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
                    {menuList.map((item, index) => (
                        <Link
                            href={item?.path}
                            key={index}
                            className={`${pathname === item.path ? "text-white bg-gradient-to-t from-[#EA580C] to-[#EAB308]" : "text-neutral-600"} mx-4 rounded-lg`}>
                            <button
                                className={`flex items-center gap-2 w-full hover:text-[#EA580C] px-4 py-2 rounded-md font-medium`}>
                                <h2 className="p-2 text-2xl rounded-xl">
                                    {item?.icon}
                                </h2>
                                <h2 className="font-medium">{item?.name}</h2>
                            </button>
                        </Link>
                    ))}
                </>
            </div>
            <hr className="my-5" />
            <div className="flex gap-2 justify-evenly items-center">
                <Link href={'/'}>
                    <button className="flex justify-between gap-1 items-center rounded-lg bg-gradient-to-t from-[#EA580C] to-[#EAB308] hover:bg-gradient-to-t hover:from-[#EAB308] hover:to-[#EA580C] text-white px-5 py-2.5"><FaHome /></button>
                </Link>
                {user &&
                    <button className="flex justify-between gap-2 items-center p-3 rounded-lg bg-red-700 hover:bg-red-800 text-white" onClick={handleLogout}><MdLogout /></button>
                }
            </div>
        </div>
    );
};

export default SideNavbar;