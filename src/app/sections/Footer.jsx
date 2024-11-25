"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";

const HealPoint = () => {
  const [email, setEmail] = useState("");
  const navLinks = [
    { label: "Home", redirectTo: "" },
    { label: "Product", redirectTo: "" },
    { label: "Testimonials", redirectTo: "" },
  ];
  const dropdownOptions = [
    { label: "Self", href: "#" },
    { label: "Student", href: "#" },
    { label: "Employee", href: "#" },
  ];
  const pathname = usePathname();

  if (pathname.includes("signup") || pathname.includes("login")) {
    {
      return null;
    }
  }

  return (
    <div className="bg-gray-900 text-white h-[430px] w-full">
      <div className=" flex items-center justify-center">
        <div className="flex w-[80vw]  justify-between items-start h-[350px]">
          <div className="w-2/3 h-full border-r border-gray-700">
            <header className="flex justify-between items-center border-l rounded-l-3xl border-b  border-gray-700 h-[80px] px-20">
              <section>
                <ul className="flex justify-between items-center gap-10">
                  {navLinks.map((item, index) => (
                    <li
                      key={index}
                      className="relative font-semibold text-white cursor-pointer text-sm group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out" />
                    </li>
                  ))}
                </ul>
              </section>
              <section className="flex justify-between items-center gap-10">
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
                    group-hover:visible transition-all duration-300 ease-in-out"
                  >
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 z-20">
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
            <div className="flex space-x-16 items-center px-20 h-[270px]">
              <div>
                <div className="text-6xl font-bold">
                  48<span className="text-3xl">k</span>
                </div>
                <div className="mt-2 text-gray-400">
                  People enrolled program
                </div>
                <div className="w-32 h-1 bg-blue-400 mt-2"></div>
              </div>

              <div>
                <div className="text-6xl font-bold">
                  93<span className="text-3xl">%</span>
                </div>
                <div className="mt-2 text-gray-400">People get benefitted</div>
                <div className="w-32 h-1 bg-purple-400 mt-2"></div>
              </div>
            </div>
          </div>
          <div className="text-center w-1/3 flex flex-col items-center justify-center min-h-full">
            <div className="flex flex-col space-y-6 items-center">
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold">ShareYrHeart</span>
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
                    d="M 0,10 
             C 40,15 60,5 100,10 
             C 140,15 160,5 200,10"
                    fill="none"
                    stroke="url(#fadeEffect)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="text-lg">Subscribe to our newsletter !</div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-64 bg-gray-800 text-white rounded-full px-4 py-2 pr-12 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="absolute right-0.5 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition-colors"
                  aria-label="Send email"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <footer className="h-[80px] rounded-t-3xl shadow-sm flex justify-between items-center px-10  w-[80vw] border-t border-r border-l border-gray-700">
          {" "}
          <div className="flex space-x-4 items-center">
            <span className="cursor-pointer  hover:scale-125 delay-75 duration-300">
              <FaXTwitter />
            </span>
            <span className="cursor-pointer  hover:scale-125 delay-75 duration-300">
              <FaFacebookF />
            </span>
            <span className="cursor-pointer  hover:scale-125 delay-75 duration-300">
              <AiFillInstagram size={20} />
            </span>
            <span className="cursor-pointer hover:scale-125 delay-75 duration-300">
              <FaLinkedinIn size={20} />
            </span>
          </div>
          <div className="text-gray-400 ">
            <span className="font-semibold text-white">
              © 2024 Shareyrheart{" "}
            </span>
            | All Rights Reserved
          </div>
          <div className="flex space-x-4">
            <span className="relative cursor-pointer">Privacy</span>
            <span className="cursor-pointer">Sitemap</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HealPoint;
