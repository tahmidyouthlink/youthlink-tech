import Image from 'next/image';
import React from 'react';
import abstractImage from "/public/abstract-photo/t4.png"
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoIosCall } from 'react-icons/io';
import Form from '@/components/ContactForm/Form';

const ContactUs = () => {
  return (
    <div className='w-full h-full bg-[#FFFFFF]'>
      <div style={{ backgroundImage: 'url("https://i.ibb.co/ZdTsQL1/Our-Work-3-3-gradient-bg-abstract.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} className='bg-fixed' >
        <div className='max-w-[1200px] mx-auto pb-12 px-5 md:px-8 2xl:px-0'>
          <h6 className='text-[#EAB308] font-semibold text-xs md:text-sm pt-28 md:pt-44'>CONTACT</h6>
          <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-5xl pt-4 w-3/4 lg:w-1/2'>Seamless Communication, Global Impact.</h1>
        </div>
      </div>
      <div className='max-w-[1200px] mx-auto px-5 md:px-8 2xl:px-0'>
        <div className='pb-12 lg:pb-24 lg:mt-24 flex flex-col-reverse lg:flex-row gap-4 lg:gap-16 text-black'>
          <div className='flex-1 p-4 lg:p-0 rounded-lg space-y-4 lg:space-y-6'>
            <h1 className='text-3xl font-bold'>Send us a message</h1>
            <p className='font-inter text-sm md:text-base'>For more information about YouthLink, fill out the form below.</p>
            <Form />
          </div>
          <div className='flex-1 md:mt-0 lg:mt-16'>
            <div className='flex items-center gap-4 p-4 lg:p-6 rounded-lg mt-6'>
              <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                <FaLocationDot size={26} />
              </div>
              <div>
                <h1 className='font-bold text-xl'>Head Office</h1>
                <p className='font-inter'>House - 763, Road - 10, Avenue - 6, Mirpur DOHS</p>
                <p className='font-inter'>Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className='flex items-center gap-4 p-4 lg:p-6 rounded-lg mt-6'>
              <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                <MdEmail size={26} />
              </div>
              <div>
                <h1 className='font-bold text-xl'>Email Support</h1>
                <p className='font-inter'>info@youthlink.tech</p>
                <p className='font-inter'>a.sharia@youthlink.tech</p>
              </div>
            </div>
            <div className='flex items-center gap-4 p-4 lg:p-6 rounded-lg mt-6'>
              <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                <IoIosCall size={26} />
              </div>
              <div>
                <h1 className='font-bold text-xl'>Let's Talk</h1>
                <p className='font-inter'>Phone : +6221.2002.2012</p>
                <p className='font-inter'>Fax : +6221.2002.2012</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;