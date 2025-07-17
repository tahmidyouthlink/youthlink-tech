import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Form from "@/components/ContactForm/Form";

const ContactUs = () => {
  return (
    <div className="bg-neutral-100 pt-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 2xl:px-0">
        <h1 className="text-xl font-bold text-neutral-700 md:text-2xl lg:text-3xl">
          Connect
        </h1>
        <div className="flex flex-col-reverse gap-10 pb-12 lg:mt-5 lg:flex-row lg:pb-16">
          <div className="flex-1 space-y-4 rounded-lg border-2 border-neutral-100/30 bg-white/60 p-5 backdrop-blur-2xl md:bg-gradient-to-r md:p-7 lg:space-y-6">
            <Form />
          </div>
          <div className="flex-1 text-neutral-500">
            <div className="z-10 flex items-center gap-4 rounded-lg border-2 border-neutral-100/30 bg-white/60 p-7 backdrop-blur-2xl lg:p-7">
              <div className="rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] p-3 text-white">
                <FaLocationDot size={26} />
              </div>
              <div>
                <p>Kha-199/3 & 199/4, Progati Saroni, Middle Badda</p>
                <p>Dhaka - 1212, Bangladesh</p>
              </div>
            </div>
            <div className="z-10 mt-6 flex items-center gap-4 rounded-lg border-2 border-neutral-100/30 bg-white/60 p-5 backdrop-blur-2xl lg:p-7">
              <div className="rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] p-3 text-white">
                <MdEmail size={26} />
              </div>
              <div>
                <p>info@youthlink.tech</p>
              </div>
            </div>
            <div className="z-10 mt-6 flex items-center gap-4 rounded-lg border-2 border-neutral-100/30 bg-white/60 p-5 backdrop-blur-2xl lg:p-7">
              <div className="rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] p-3 text-white">
                <IoIosCall size={26} />
              </div>
              <div>
                <p>Phone: +6221.2002.2012</p>
                <p>Fax: +6221.2002.2012</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
