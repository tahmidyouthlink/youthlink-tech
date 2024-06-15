"use client";
// import React, { useEffect, useRef } from 'react';
import { FaMessage } from 'react-icons/fa6';
// import emailjs from '@emailjs/browser';

const Form = () => {

  return (
    <div>
      <form className=''>
        <div className='space-y-4'>
          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <div className='flex flex-col flex-1 w-full'>
              <label className='font-bold' htmlFor='name'>Name</label>
              <input className='py-2 px-3 border rounded font-inter outline-none focus:border-yellow-400 transition-colors duration-1000 bg-white' id='name' required type='text' placeholder='Name'></input>
            </div>
            <div className='flex flex-col flex-1 w-full'>
              <label className='font-bold' htmlFor='company'>Company</label>
              <input className='py-2 px-3 border rounded font-inter outline-none focus:border-yellow-400 transition-colors duration-1000 bg-white' id='company' required type='text' placeholder='Company'></input>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <div className='flex flex-col flex-1 w-full'>
              <label className='font-bold' htmlFor='phone'>Phone</label>
              <input className='py-2 px-3 border rounded font-inter outline-none focus:border-yellow-400 transition-colors duration-1000 bg-white' id='phone' type='number' required placeholder='Phone'></input>
            </div>
            <div className='flex flex-col flex-1 w-full'>
              <label className='font-bold' htmlFor='email'>Email</label>
              <input className='py-2 px-3 border rounded font-inter outline-none focus:border-yellow-400 transition-colors duration-1000 bg-white' id="email" required type='email' placeholder='Email'></input>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold' htmlFor='subject'>Subject</label>
            <input className='py-2 px-3 border rounded font-inter outline-none focus:border-yellow-400 transition-colors duration-1000 bg-white' id="subject" type='text' required placeholder='Subject'></input>
          </div>
          <div>
            <label htmlFor="message" className='font-bold'>Message</label>
            <div className="overflow-hidden">
              <textarea
                id="message"
                name="message"
                className="w-full border rounded-lg p-4 sm:text-sm outline-none focus:border-yellow-400 transition-colors duration-1000 bg-white"
                rows="8"
                placeholder="Message" required
              ></textarea>
            </div>
          </div>
          <button className="border-solid bg-[#6366F1] text-blue-violet flex items-center justify-center gap-2 text-white mt-8 w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-5 py-2.5 text-sm font-medium transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%] sm:mb-12">
            <FaMessage /> SEND MESSAGE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;