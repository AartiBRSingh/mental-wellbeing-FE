"use client";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

const GetHelp = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 my-10 lg:my-20">
      <main className="flex flex-col-reverse xl:flex-row justify-center md:gap-12 lg:gap-24 items-center w-full max-w-7xl">
        {/* Image Section - Now on left for desktop */}
        <section className="flex-1 flex justify-center xl:justify-start bg-transparent mt-8 xl:mt-0">
          <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[30s0px] sm:h-[350px] md:h-96 xl:mt-0 mt-16">
            {/* Top Image */}
            <div className="absolute lg:-top-16 lg:left-[290px] right-12 xl:right-auto top-12 transform -translate-x-1/2 scale-75 sm:scale-90 md:scale-100">
              <div className="relative">
                <div className="absolute -top-8 -left-8">
                  <span className="bg-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold z-10">
                    Happier
                  </span>
                </div>
                <div className="w-44 h-44 bg-yellow-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="/happy3.png"
                    alt="Profile 1"
                    className="w-40 h-60 -top-16 -right-0 absolute object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>

            {/* Middle Image */}
            <div className="absolute lg:top-10 top-36 lg:left-0 xl:left-10 -right-6 xl:right-auto scale-75 sm:scale-90 md:scale-100">
              <div className="relative">
                <div className="absolute -top-8 right-36">
                  <span className="bg-green-300 px-3 py-1 rounded-md text-sm font-semibold">
                    Calm
                  </span>
                </div>
                <div className="w-48 h-48 bg-green-300 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="/happy1.png"
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
            <div className="absolute xl:-bottom-8 -bottom-32 lg:left-44 left-32 scale-75 md:scale-100">
              <div className="relative">
                <div className="w-56 h-56 bg-purple-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="/happy2.png"
                    alt="Profile 3"
                    className="absolute w-full h-72 -top-16 right-1 object-cover rounded-xl"
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
        </section>

        {/* Content Section - Now on right for desktop */}
        <section className="w-full xl:w-1/2 flex flex-col gap-6 md:gap-8 max-xl:text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl">
            <span>How </span>
            <span className="">can the </span>
            <br className="hidden sm:block" />
            <span className="text-[#956144]">Forum </span>
            <span className="text-red-500 text-4xl">♥</span>
            <br className="hidden sm:block" />
            <span>help you?</span>
          </h1>

          <div className="space-y-4">
            <p className="text-gray-800 text-sm sm:text-base">
              <strong className="text-xl font-semibold">Forum</strong>, a
              platform for discussion, knowledge sharing, support, networking,
              and collaboration, helping individuals connect, learn, and
              exchange ideas effectively.
            </p>
          </div>

          <div className="flex items-center max-xl:justify-center">
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
