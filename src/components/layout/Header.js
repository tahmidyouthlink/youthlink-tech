"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";
import {
  FaEnvelope,
  FaYoutube,
  FaLinkedin,
  FaSquareFacebook,
  FaBuilding,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import {
  IoMdBriefcase,
  IoMdCall,
  IoMdConstruct,
  IoMdPeople,
} from "react-icons/io";
import logoWhiteImage from "/public/logos/logo-white-text.png";
import logoBlackImage from "/public/logos/logo-black-text.png";

export default function Header() {
  const pathname = usePathname();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false); // State for tracking nav menu open/close

  return (
    <header
      className={`absolute z-10 w-full px-5 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6 ${pathname === "/" ? "text-neutral-50" : "text-neutral-800"}`}
    >
      {/* Header wrapper */}
      <div className="mx-auto flex items-center justify-between xl:max-w-[1200px]">
        {/* Logo */}
        <Link href="/">
          <Image
            className="h-10 w-auto md:h-[44px]"
            src={pathname === "/" ? logoWhiteImage : logoBlackImage}
            alt="YouthLink logo with white text"
          />
        </Link>
        {/* Navigation button */}
        <CgMenuRight
          className="h-5 w-auto cursor-pointer sm:h-6 lg:hidden"
          onClick={() => setIsNavMenuOpen(true)}
        />
        {/* Desktop navigation bar */}
        <nav className="desktop hidden lg:block">
          {/* Navigation links */}
          <ul className="flex space-x-6 lg:space-x-8">
            <li>
              <Link
                className={
                  pathname.startsWith("/our-work") ? "active" : undefined
                }
                href="/our-work"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathname.startsWith("/services") ? "active" : undefined
                }
                href="/services"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathname.startsWith("/about-us") ? "active" : undefined
                }
                href="/about-us"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathname.startsWith("/contact-us") ? "active" : undefined
                }
                href="/contact-us"
              >
                Connect
              </Link>
            </li>
          </ul>
        </nav>
        {/* Mobile navigation menu container */}
        <div
          className={`fixed inset-0 z-[2] h-dvh w-dvw bg-neutral-700 bg-opacity-25 backdrop-blur ${isNavMenuOpen ? "" : "hidden"} lg:hidden`}
          id="nav-menu-bg"
          onClick={
            (event) =>
              event.target.id === "nav-menu-bg" && setIsNavMenuOpen(false) // If user clicks outside nav menu, close it
          }
        >
          {/* Mobile navigation menu */}
          <nav className="mobile ml-auto flex h-dvh w-3/5 flex-col justify-between rounded-l-lg bg-white p-6 text-neutral-500 min-[480px]:w-1/2 sm:w-2/5">
            {/* Top section - logo and nav links */}
            <div className="space-y-10">
              {/* Logo */}
              <Link href="/">
                <Image
                  className="h-8 w-auto sm:h-10"
                  src={logoBlackImage}
                  alt="YouthLink logo with black text"
                />
              </Link>
              {/* Navigation links */}
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link
                    className={
                      pathname.startsWith("/our-work") ? "active" : undefined
                    }
                    href="/our-work"
                  >
                    <IoMdBriefcase />
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname.startsWith("/services") ? "active" : undefined
                    }
                    href="/services"
                  >
                    <IoMdConstruct />
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname.startsWith("/about-us") ? "active" : undefined
                    }
                    href="/about-us"
                  >
                    <IoMdPeople />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      pathname.startsWith("/contact-us") ? "active" : undefined
                    }
                    href="/contact-us"
                  >
                    <IoMdCall />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* Bottom section - social links */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold">Get in Touch</h3>
              <ul className="social-icons flex gap-x-1.5">
                <li>
                  <Link
                    className="hover:bg-[#c8ecff] hover:text-[#0075b4]"
                    href="https://www.linkedin.com/company/youthlink-tech/"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:bg-black hover:text-white"
                    href="https://x.com/YouthLinkTech"
                    target="_blank"
                  >
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:bg-[#cfe6ff] hover:text-[#0080ff]"
                    href="https://www.facebook.com/ylinkbd"
                    target="_blank"
                  >
                    <FaSquareFacebook />
                  </Link>
                </li>
                <li>
                  <Link
                    className="from-[#405de6] via-[#dc2743] to-[#f09433] hover:bg-gradient-to-b hover:text-white"
                    href="https://www.instagram.com/youthlinktech"
                    target="_blank"
                  >
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:bg-neutral-800 hover:text-neutral-100"
                    href="mailto:info@youthlink.tech"
                  >
                    <FaEnvelope />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
