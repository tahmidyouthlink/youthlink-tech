import Image from 'next/image';
import React from 'react';
import abstractImage from "/public/abstract-photo/t4.png"
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoIosCall } from 'react-icons/io';
import Form from '@/components/ContactForm/Form';

const ContactUs = () => {
  return (
    <div className='w-full h-full'>
      <div style={{ backgroundImage: 'url("https://i.ibb.co/ZdTsQL1/Our-Work-3-3-gradient-bg-abstract.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} className='bg-fixed' >
        <div className='max-w-[1200px] mx-auto pb-12 px-5 md:px-8 2xl:px-0'>
          <h6 className='text-[#EAB308] font-semibold text-xs md:text-sm pt-28 md:pt-44'>CONTACT</h6>
          <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-5xl pt-4 w-3/4 lg:w-1/2'>Seamless Communication, Global Impact.</h1>
        </div>
        <div className='max-w-[1200px] mx-auto px-5 md:px-8 2xl:px-0'>
          <div className='pb-12 lg:pb-24 lg:mt-24 flex flex-col-reverse lg:flex-row gap-16 text-black'>
            <div className='flex-1 p-4 md:p-12 rounded-lg space-y-4 lg:space-y-6 md:bg-gradient-to-r from-white/5 to-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30'>
              <h1 className='text-2xl md:text-3xl font-bold text-white'>Send us a message</h1>
              <p className='font-inter text-sm md:text-base text-white'>For more information about YouthLink, fill out the form below.</p>
              <Form />
            </div>
            <div className='flex-1 md:mt-0 lg:mt-12 text-white'>
              <div className='flex items-center gap-4 p-4 lg:p-6 rounded-lg mt-6 bg-gradient-to-r from-white/5 to-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30'>
                <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                  <FaLocationDot size={26} />
                </div>
                <div>
                  <h1 className='font-bold text-xl'>Head Office</h1>
                  <p className='font-inter text-white'>House - 763, Road - 10, Avenue - 6, Mirpur DOHS</p>
                  <p className='font-inter text-white'>Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className='flex items-center gap-4 p-4 lg:p-6 rounded-lg mt-6 bg-gradient-to-r from-white/5 to-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30'>
                <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                  <MdEmail size={26} />
                </div>
                <div>
                  <h1 className='font-bold text-xl'>Email Support</h1>
                  <p className='font-inter text-white'>info@youthlink.tech</p>
                  <p className='font-inter text-white'>a.sharia@youthlink.tech</p>
                </div>
              </div>
              <div className='flex items-center gap-4 p-4 lg:p-6 rounded-lg mt-6 bg-gradient-to-r from-white/5 to-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30'>
                <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                  <IoIosCall size={26} />
                </div>
                <div>
                  <h1 className='font-bold text-xl'>Let's Talk</h1>
                  <p className='font-inter text-white'>Phone : +6221.2002.2012</p>
                  <p className='font-inter text-white'>Fax : +6221.2002.2012</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;