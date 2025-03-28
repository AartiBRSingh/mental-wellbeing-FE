"use client";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

const GetHelp = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 my-10 lg:my-20">
      <main className="flex flex-col-reverse md:flex-row justify-center md:gap-12 lg:gap-24 items-center w-full max-w-7xl">
        {/* Image Section - Now on left for tablet and up */}
        <section className="flex-1 flex flex-col justify-center md:justify-start bg-transparent mt-8 md:mt-0">
          <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[350px] md:h-96 mt-16 md:mt-0 mx-auto md:mx-0">
            {/* Top Image */}
            <div className="absolute md:-top-4 lg:-top-10 md:left-[220px] lg:left-[320px] right-16 md:right-auto top-12 transform -translate-x-1/2 scale-75 sm:scale-90 md:scale-100 z-10">
              <div className="relative">
                <div className="absolute -top-8 -left-12">
                  <span className="bg-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold z-10">
                    Happier
                  </span>
                </div>
                <div className="w-44 h-44 bg-yellow-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="/happy.png"
                    alt="Profile 1"
                    className="w-40 h-60 -top-16 right-2 absolute object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>

            {/* Middle Image */}
            <div className="absolute lg:top-10 -top-10 md:left-0 lg:left-0 -right-6 md:right-auto scale-75 sm:scale-90 md:scale-100 z-20">
              <div className="relative">
                <div className="absolute -top-8 right-40">
                  <span className="bg-green-300 px-3 py-1 rounded-md text-sm font-semibold">
                    Calm
                  </span>
                </div>
                <div className="w-48 h-48 bg-green-300 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="/calm.png"
                    alt="Profile 2"
                    className="w-full absolute h-64 -top-16 object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -right-8 top-1/2 rounded-lg px-2 py-1">
                  <span className="text-orange-500">✓</span>
                </div>
                <span className="absolute -right-4 bottom-0 text-green-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="absolute md:-bottom-10 -bottom-20 md:left-48 lg:left-60 left-32 scale-75 sm:scale-90 md:scale-100 z-0">
              <div className="relative">
                <div className="w-56 h-56 bg-purple-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="/listener.png"
                    alt="Profile 3"
                    className="absolute w-full h-64 -top-8 -right-2 object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -left-10 top-1/2 bg-transparent rounded-lg p-1">
                  <span className="text-red-500 text-4xl">♥</span>
                </div>
                <div className="absolute -bottom-8">
                  <span className="bg-purple-200 px-3 py-1 rounded-md text-sm font-semibold">
                    Positive
                  </span>
                </div>
                <span className="absolute -left-4 top-0 text-purple-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Forum Button */}
          <div className="flex md:hidden items-center justify-center mt-40 sm:mt-44">
            <Link
              href={"/forum"}
              className="cursor-pointer flex shadow-sm items-center gap-2 w-fit px-8 sm:px-8 bg-yellow-700 text-white font-semibold py-3 sm:py-3 rounded-xl transition duration-300 ease-in-out hover:bg-yellow-800 hover:text-white hover:shadow-inner text-lg sm:text-lg"
            >
              Forum
              <MdChevronRight className="text-[#FF7F4B]" size={24} />
            </Link>
          </div>
        </section>

        {/* Content Section - Now on right for tablet and up */}
        <section className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 max-md:text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl">
            <span>How </span>
            <span className="">can the </span>
            <br className="hidden sm:block" />
            <span className="text-[#956144] relative">
              Forum
              <svg
                className="absolute w-full h-[14px] -bottom-2 left-0"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 -5, 100 5"
                  stroke="orange"
                  strokeWidth="4"
                  fill="transparent"
                />
              </svg>
            </span>

            <br className="hidden sm:block" />
            <span className="ml-2 md:ml-0">help you?</span>
          </h1>

          <div className="space-y-4">
            <p className="text-gray-800 text-sm sm:text-base">
              <strong className="text-xl font-semibold">Forum</strong>, a
              platform for discussion, knowledge sharing, support, networking,
              and collaboration, helping individuals connect, learn, and
              exchange ideas effectively.
            </p>
          </div>

          {/* Tablet and Desktop Forum Button */}
          <div className="hidden md:flex items-center">
            <Link
              href={"/forum"}
              className="cursor-pointer flex shadow-sm items-center gap-2 w-fit px-8 sm:px-8 bg-yellow-700 text-white font-semibold py-3 sm:py-3 rounded-xl transition duration-300 ease-in-out hover:bg-yellow-800 hover:text-white hover:shadow-inner text-lg sm:text-lg"
            >
              Forum
              <MdChevronRight className="text-[#FF7F4B]" size={24} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GetHelp;
