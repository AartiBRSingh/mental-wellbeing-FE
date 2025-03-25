"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center my-6 md:my-10">
      <main className="flex flex-col md:flex-row justify-center items-center w-[90vw] md:w-[80vw] lg:w-[60vw] gap-8 md:gap-0">
        {/* Text Section */}
        <section className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left order-1 md:order-none">
          <div className="inline-block relative">
            <Image
              src="/hearttext.png"
              alt="Decorative image"
              width={70}
              height={70}
              className="hidden sm:block absolute rotate-12 -top-6 -right-16 sm:right-auto sm:-top-8 sm:-left-16 md:-left-20 z-0 opacity-100"
            />
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#956144] text-xs font-semibold">
              MENTAL HEALTH AT ANY AGE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="text-[#956144] relative">
              Mental Health
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

            <br />
            <span>is Wealth</span>
          </h1>

          {/* Buttons - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex sm:flex-row gap-5 max-w-max p-4 rounded-xl mt-6">
            <Link
              href={"/employee"}
              className="cursor-pointer font-semibold px-6 sm:px-10 text-xl lg:text-2xl shadow-lg bg-[#FACC15] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Workplace
            </Link>

            <Link
              href={"/student"}
              className="cursor-pointer shadow-lg text-xl sm:text-2xl font-semibold px-6 sm:px-10 bg-[#E9D5FF] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Campus
            </Link>
          </div>
        </section>

        <section className="w-full md:w-1/2 bg-transparent z-10 mb-4 md:mb-0 order-2 md:order-none flex justify-center md:block">
          <img
            src="/dummyimg2.png"
            alt="Help illustration"
            className="max-w-full h-auto md:max-w-none md:w-full md:h-auto object-cover"
          />
        </section>

        {/* Buttons - Visible on mobile only, positioned below image */}
        <div className="flex md:hidden flex-row gap-5 max-w-max p-4 rounded-xl order-3 justify-center w-full">
          <Link
            href={"/employee"}
            className="cursor-pointer font-semibold px-6 sm:px-10 text-xl lg:text-2xl shadow-lg bg-[#FACC15] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
          >
            Workplace
          </Link>

          <Link
            href={"/student"}
            className="cursor-pointer shadow-lg text-xl sm:text-2xl font-semibold px-6 sm:px-10 bg-[#E9D5FF] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
          >
            Campus
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Hero;
