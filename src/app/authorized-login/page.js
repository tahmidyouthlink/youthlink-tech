"use client";
import "./authorized.css";
import useAuth from '@/hooks/useAuth';
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "/public/logos/logo-white-text.png";
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { useForm } from 'react-hook-form';
import animation from "/public/lottie-animation/Animation - 1703827244779 (1).json";

const AuthorizedLogin = () => {

    const [seePassword, setSeePassword] = useState(true);
    const { signIn } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const element = document.getElementById('yourElementId');
            if (element) {
                element.style.backgroundColor = "yellow"; // Change color to yellow
            }
        }
    }, []);

    const onSubmit = data => {
        const email = data?.email;
        const password = data?.password;
        signIn(email, password)
            .then(() => {
                toast.success("Welcome back! Let's dive back into your world.")
                router.push("/dashboard");
            })
            .catch(error => {
                toast.error(error?.message);
            })
    }

    return (
        <div id="yourElementId">
            <div className="flex flex-col-reverse lg:flex-row-reverse items-center bg-gradient-to-b from-black via-black to-[#b63327] px-4 pb-8 lg:pb-0 md:px-0 min-h-screen">
                <div className="mx-auto space-y-8 rounded-lg p-5 md:p-12 xl:p-24 glass">
                    <div>
                        <p className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold flex items-center gap-4">Login to <Image className="w-[100px]" src={logo} alt="image" /></p>
                    </div>
                    <div className="pt-4 form-container w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
                            <input {...register("email", { required: true })} placeholder="Enter Your Email Address" className="input w-full" type="email" />
                            {errors.email?.type === 'required' && <p className="text-red-600">Email is required</p>}
                            <span className="relative">
                                <input {...register("password", { required: true })} placeholder="Enter Your Password" className="input w-full mt-4" type={seePassword ? "password" : "text"} />
                                <p className="absolute right-4 top-1" onClick={() => setSeePassword(!seePassword)}>{seePassword ? <FaEye /> : <FaEyeSlash />}</p>
                            </span>
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            <input className="text-white font-semibold w-full bg-[#b63327] py-1 lg:py-1.5 rounded-md uppercase hover:text-[#b63327] hover:bg-[#212121] hover:border hover:border-[#b63327]" type="submit" value="Login" />
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2 mx-auto">
                    <Lottie animationData={animation} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default AuthorizedLogin;