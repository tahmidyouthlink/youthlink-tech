import Link from "next/link";
import Image from "next/image";
import {
  FaEnvelope,
  FaYoutube,
  FaLinkedin,
  FaSquareFacebook,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import footerLogo from "/public/logos/logo-black-text.png";

export default function Footer() {
  return (
    <footer className="relative divide-y-2 divide-neutral-200 bg-neutral-50 px-5 sm:px-8 lg:px-12 [&>*]:mx-auto [&>*]:max-w-[1200px]">
      {/* Top footer section - logo and links */}
      <div className="grid grid-cols-2 gap-y-8 py-11 md:grid md:grid-cols-[auto_1fr_auto_auto] md:grid-rows-[auto_auto] md:gap-x-8 lg:grid-cols-[1fr_1fr_1fr_auto]">
        {/* Main links subsection */}
        <div className="md:row-span-2">
          <Image
            className="h-10 w-auto min-[420px]:h-12 lg:h-[60px]"
            src={footerLogo}
            alt="YouthLink logo with black text"
          />
          <ul>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
            <li>
              <Link href="/industries">Industries</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        {/* Services links subsection */}
        <div className="md:row-span-2">
          <h3>Services</h3>
          <ul>
            <li>
              <Link href="#">Strategy & Organization</Link>
            </li>
            <li>
              <Link href="#">Data and Intelligence</Link>
            </li>
            <li>
              <Link href="#">E-commerce</Link>
            </li>
            <li>
              <Link href="#">Digital Marketing</Link>
            </li>
            <li>
              <Link href="#">Experience Design</Link>
            </li>
            <li>
              <Link href="#">Hosting</Link>
            </li>
            <li>
              <Link href="#">Staffing</Link>
            </li>
          </ul>
        </div>
        {/* Our work link subsection */}
        <div>
          <h3>Our Work</h3>
          <ul>
            <li>
              <Link href="/our-work">View all cases</Link>
            </li>
          </ul>
        </div>
        {/* Contact links subsection */}
        <div>
          <h3>Get in Touch</h3>
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
                href="https://www.twitter.com/youthlink/"
                target="_blank"
              >
                <FaXTwitter />
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-[#cfe6ff] hover:text-[#0080ff]"
                href="https://www.facebook.com/youthlink/"
                target="_blank"
              >
                <FaSquareFacebook />
              </Link>
            </li>
            <li>
              <Link
                className="from-[#405de6] via-[#dc2743] to-[#f09433] hover:bg-gradient-to-b hover:text-white"
                href="https://www.instagram.com/youthlink/"
                target="_blank"
              >
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-[#ffcacb] hover:text-[#ff0f1c]"
                href="https://www.youtube.com/@youthlink"
                target="_blank"
              >
                <FaYoutube />
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
        {/* Newsletter subsection */}
        <div className="col-span-2 md:col-start-3 md:row-start-2">
          <h3>Newsletter</h3>
          <p>Be the first to get the latest news from us.</p>
          <form className="relative flex w-full justify-between overflow-hidden rounded-full bg-white p-1 text-neutral-400 ring-[1.5px] ring-neutral-300 transition-[box-shadow,color] duration-500 ease-in-out focus-within:text-neutral-600 focus-within:ring-[1.5px] focus-within:ring-orange-300 max-md:max-w-[500px]">
            <label
              className="flex items-center justify-center pl-3 pr-2"
              htmlFor="email"
            >
              <FaEnvelope className="size-4" />
            </label>
            <input
              className="w-full bg-transparent text-sm placeholder:text-neutral-400 focus:outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
            />
            <button className="w-fit rounded-full bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] px-3.5 py-2 text-xs font-medium text-white transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%] md:text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* Bottom footer section - copyright */}
      <p className="py-6 text-center text-[13px] sm:text-sm md:text-base">
        Copyright ©{" "}
        <Link className="font-bold" href="/">
          YouthLink Tech.
        </Link>{" "}
        - {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
}
