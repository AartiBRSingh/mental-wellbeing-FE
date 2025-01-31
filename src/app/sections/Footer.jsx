"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HealPoint = () => {
  const [email, setEmail] = useState("");
  const navLinks = [
    { label: "Insurance & Pricing", redirectTo: "" },
    { label: "Career", redirectTo: "" },
    { label: "FAQ", redirectTo: "" },
  ];
  const dropdownOptions = [
    { label: "Disorder", href: "/disorder" },
    { label: "Therapy", href: "/therapy" },
    { label: "Dictionary", href: "/dictionary" },
  ];
  const pathname = usePathname();

  if (pathname.includes("signup") || pathname.includes("login")) {
    {
      return null;
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-[430px] w-full" id="footer">
      <div className="flex items-center justify-center">
        <div className="flex flex-col lg:flex-row w-[95vw] lg:w-[90vw] xl:w-[80vw] justify-between items-start min-h-[350px]">
          {/* Left Section */}
          <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-gray-700">
            {/* Navigation Header */}
            <header className="flex flex-col sm:flex-row justify-between items-center border-l rounded-l-3xl border-b border-gray-700 min-h-[80px] px-4 sm:px-8 md:px-12 lg:px-20">
              <section className="w-full sm:w-auto py-4 sm:py-0">
                <ul className="flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-6 md:gap-10">
                  {navLinks.map((item, index) => (
                    <li
                      key={index}
                      className="relative font-semibold text-white cursor-pointer text-md group whitespace-nowrap"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out" />
                    </li>
                  ))}
                </ul>
              </section>

              {/* Hamburger Menu */}
              <section className="flex justify-center sm:justify-between items-center">
                <div className="relative group">
                  <button className="relative w-8 h-8 cursor-pointer">
                    <div className="relative flex flex-col justify-center w-full h-full">
                      <div
                        className="w-full h-[2px] bg-white transition-all duration-300 ease-in-out 
                        group-hover:rotate-45 group-hover:translate-y-[6px]"
                      />
                      <div
                        className="w-full h-[2px] bg-white mt-[10px] transition-all duration-300 ease-in-out 
                        group-hover:-rotate-45 group-hover:-translate-y-[6px]"
                      />
                    </div>
                  </button>
                  <div
                    className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 
                    group-hover:visible transition-all duration-300 ease-in-out z-50"
                  >
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                      {dropdownOptions.map((option, index) => (
                        <a
                          key={index}
                          href={option.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                          transition duration-150 ease-in-out first:rounded-t-lg last:rounded-b-lg"
                        >
                          {option.label}
                        </a>
                      ))}
                    </div>
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
                  </div>
                </div>
              </section>
            </header>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-8 md:space-x-16 items-center px-4 sm:px-8 md:px-12 lg:px-20 py-8 min-h-[270px]">
              <div className="mb-8 sm:mb-0 text-center sm:text-left">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  48<span className="text-2xl md:text-3xl">k</span>
                </div>
                <div className="mt-2 text-gray-400">
                  People enrolled program
                </div>
                <div className="w-32 h-1 bg-blue-400 mt-2 mx-auto sm:mx-0"></div>
              </div>

              <div className="text-center sm:text-left">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  93<span className="text-2xl md:text-3xl">%</span>
                </div>
                <div className="mt-2 text-gray-400">People get benefitted</div>
                <div className="w-32 h-1 bg-purple-400 mt-2 mx-auto sm:mx-0"></div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-center w-full lg:w-1/3 flex flex-col items-center justify-center py-8 lg:py-0">
            <div className="flex flex-col space-y-6 items-center px-4">
              <div className="flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold mt-4">
                  ShareYrHeart
                </span>
              </div>

              <div>
                <span className="px-4 py-2 rounded-full border border-[#956144] text-xs font-semibold">
                  MENTAL HEALTH AT 30&apos;S
                </span>
              </div>

              <div className="flex justify-center w-full my-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 20"
                  className="w-32"
                >
                  <defs>
                    <linearGradient id="fadeEffect" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(75,75,75,0)" />
                      <stop offset="20%" stopColor="rgba(75,75,75,1)" />
                      <stop offset="80%" stopColor="rgba(75,75,75,1)" />
                      <stop offset="100%" stopColor="rgba(75,75,75,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,10 C 40,15 60,5 100,10 C 140,15 160,5 200,10"
                    fill="none"
                    stroke="url(#fadeEffect)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="text-base sm:text-lg">
                Subscribe to our newsletter !
              </div>
              <div className="relative flex items-center w-full max-w-[300px]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-gray-800 text-white rounded-full px-4 py-2 pr-12 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="cursor-pointer absolute right-0.5 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition-colors"
                  aria-label="Send email"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex justify-center mt-8 lg:mt-0">
        <footer className="min-h-[80px] rounded-t-3xl shadow-sm flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-10 py-4 w-[95vw] lg:w-[90vw] xl:w-[80vw] border-t border-r border-l border-gray-700 gap-4 sm:gap-0">
          <div className="flex space-x-4 items-center">
            <span className="cursor-pointer hover:scale-125 delay-75 duration-300">
              <FaXTwitter />
            </span>
            <span className="cursor-pointer hover:scale-125 delay-75 duration-300">
              <FaFacebookF />
            </span>
            <span className="cursor-pointer hover:scale-125 delay-75 duration-300">
              <AiFillInstagram size={20} />
            </span>
            <span className="cursor-pointer hover:scale-125 delay-75 duration-300">
              <FaLinkedinIn size={20} />
            </span>
          </div>

          <div className="text-gray-400 text-center text-sm sm:text-base">
            <span className="font-semibold text-white">
              © 2021 Shareyrheart{" "}
            </span>
            | All Rights Reserved
          </div>

          <div className="flex space-x-4">
            <Link href={"/about"}>
              <span className="cursor-pointer">About</span>
            </Link>
            <Link href={"/terms"}>
              <span className="cursor-pointer">Terms</span>
            </Link>
            <Link href={"/privacy"}>
              <span className="cursor-pointer">Privacy</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HealPoint;
