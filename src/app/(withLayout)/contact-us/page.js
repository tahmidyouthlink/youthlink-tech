import Image from 'next/image';
import React from 'react';
import abstractImage from "/public/abstract-photo/t4.png"
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoIosCall } from 'react-icons/io';
import Form from '@/components/ContactForm/Form';

const ContactUs = () => {
  return (
    <div style={{ backgroundImage: 'url("https://i.ibb.co/ZdTsQL1/Our-Work-3-3-gradient-bg-abstract.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} className='bg-fixed w-full h-full px-5 sm:px-8 border'>
      <div className='h-[80px] w-[80px] lg:w-[200px] lg:h-[350px] bg-[#124b36] blur-[90px] absolute hidden 2xl:block'></div>
      <div className='w-[100px] h-[100px] lg:w-[350px] lg:h-[350px] bg-[#124b36] blur-[90px] absolute left-[55%] top-24'></div>
      <div className='w-[100px] h-[100px] md:w-[200px] md:h-[250px] bg-[#124b36] blur-[90px] absolute xl:left-[75%] top-[90%]'></div>
      <div className='w-[100px] h-[100px] md:w-[200px] md:h-[250px] bg-[#124b36] blur-[90px] absolute left-[3%] top-[90%]'></div>
      <div className='w-[100px] h-[100px] lg:w-[200px] lg:h-[250px] bg-[#111111] blur-[90px] absolute left-[3%] top-[90%]'></div>
      <div className='xl:max-w-[1200px] mx-auto'>
        <h6 className='text-[#EAB308] font-semibold text-xs md:text-sm pt-28 md:pt-44'>CONTACT</h6>
        <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-5xl pt-4 w-3/4 lg:w-1/2'>Seamless Communication, Global Impact.</h1>
        <div className='absolute top-0 right-0'>
          <Image src={abstractImage} alt='abstract-image' className='pt-20 md:pt-12 w-[800px] md:h-[800px]' height={800} width={800} />
        </div>
        <div className='pb-24 my-12 md:my-24 flex flex-col-reverse lg:flex-row gap-8 lg:gap-16'>
          <div className='border border-white/20 bg-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30 flex-1 p-8 md:py-16 md:px-12 rounded-lg space-y-6'>
            <h1 className='text-3xl font-bold text-white'>Send us a message</h1>
            <p className='font-inter text-sm md:text-base text-white'>For more information about YouthLink, fill out the form below.</p>
            <Form />
          </div>
          <div className='flex-1'>
            <div className='flex items-center gap-4 border border-white/20 bg-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30 p-4 md:p-6 rounded-lg mt-6 shadow-2xl'>
              <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                <FaLocationDot size={26} />
              </div>
              <div>
                <h1 className='text-white font-bold text-xl'>Head Office</h1>
                <p className='font-inter text-white'>House - 763, Road - 10, Avenue - 6, Mirpur DOHS</p>
                <p className='font-inter text-white'>Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className='flex items-center gap-4 border border-white/20 bg-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30 p-4 md:p-6 rounded-lg mt-6 shadow-2xl'>
              <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                <MdEmail size={26} />
              </div>
              <div>
                <h1 className='text-white font-bold text-xl'>Email Support</h1>
                <p className='font-inter text-white'>info@youthlink.tech</p>
                <p className='font-inter text-white'>a.sharia@youthlink.tech</p>
              </div>
            </div>
            <div className='flex items-center gap-4 border border-white/20 bg-white/10 z-10 backdrop-filter backdrop-blur-md bg-opacity-30 p-4 md:p-6 rounded-lg mt-6  shadow-2xl'>
              <div className='p-3 bg-[#EAB3084D] text-[#EAB308] rounded-full'>
                <IoIosCall size={26} />
              </div>
              <div>
                <h1 className='text-white font-bold text-xl'>Let's Talk</h1>
                <p className='font-inter text-white'>Phone : +6221.2002.2012</p>
                <p className='font-inter text-white'>Fax : +6221.2002.2012</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;