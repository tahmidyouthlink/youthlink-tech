"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Form = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2oxaxtt",
        "template_fmbrm8e",
        formRef.current,
        "kM2ZZ-I4QiQPp3W81",
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
        },
        () => {
          toast.error("Failed to send message, please try again.");
        },
      );
    formRef.current.reset();
  };

  return (
    <div>
      <form ref={formRef} onSubmit={sendEmail}>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex w-full flex-1 flex-col gap-1.5">
              <label className="font-bold text-neutral-600" htmlFor="name">
                Name
              </label>
              <input
                className="rounded border-2 border-neutral-200/70 bg-white/20 p-2.5 outline-none backdrop-blur-2xl transition-colors duration-1000 focus:border-yellow-400"
                name="user_name"
                id="name"
                required
                type="text"
                placeholder="Name"
              ></input>
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5">
              <label className="font-bold text-neutral-600" htmlFor="company">
                Company
              </label>
              <input
                className="rounded border-2 border-neutral-200/70 bg-white/20 p-2.5 outline-none backdrop-blur-2xl transition-colors duration-1000 focus:border-yellow-400"
                name="company"
                id="company"
                required
                type="text"
                placeholder="Company"
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex w-full flex-1 flex-col gap-1.5">
              <label className="font-bold text-neutral-600" htmlFor="phone">
                Phone
              </label>
              <input
                className="rounded border-2 border-neutral-200/70 bg-white/20 p-2.5 outline-none backdrop-blur-2xl transition-colors duration-1000 focus:border-yellow-400"
                name="phoneNumber"
                id="phone"
                type="number"
                required
                placeholder="Phone"
              ></input>
            </div>
            <div className="flex w-full flex-1 flex-col gap-1.5">
              <label className="font-bold text-neutral-600" htmlFor="email">
                Email
              </label>
              <input
                className="rounded border-2 border-neutral-200/70 bg-white/20 p-2.5 outline-none backdrop-blur-2xl transition-colors duration-1000 focus:border-yellow-400"
                name="user_email"
                id="email"
                required
                type="email"
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <label className="font-bold text-neutral-600" htmlFor="subject">
              Subject
            </label>
            <input
              className="rounded border-2 border-neutral-200/70 bg-white/20 p-2.5 outline-none backdrop-blur-2xl transition-colors duration-1000 focus:border-yellow-400"
              name="subject"
              id="subject"
              type="text"
              required
              placeholder="Subject"
            ></input>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="message" className="font-bold text-neutral-600">
              Message
            </label>
            <div className="overflow-hidden">
              <textarea
                id="message"
                name="message"
                className="w-full rounded-lg border-2 border-neutral-200/70 bg-white/20 p-2.5 outline-none backdrop-blur-2xl transition-colors duration-1000 focus:border-yellow-400"
                rows="5"
                placeholder="Message"
                required
              ></textarea>
            </div>
          </div>
          <button className="mx-auto block w-1/3 rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.yellow.500),theme(colors.orange.600))] bg-[length:300%_300%] bg-[170%_100%] py-3.5 text-sm font-medium text-white transition-[background-position] duration-700 ease-in-out hover:bg-[235%_100%]">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
