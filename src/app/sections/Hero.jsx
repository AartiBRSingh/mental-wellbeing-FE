"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center my-6 md:my-10">
      <main className="flex  flex-col md:flex-row justify-center items-center w-[90vw] md:w-[80vw] lg:w-[60vw] gap-8 md:gap-0">
        {/* Text Section */}
        <section className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left">
          <div className="inline-block">
            <Image
              src="/hearttext.png" // Replace with your image path from the public folder
              alt="Decorative image"
              width={70} // Adjust size as needed
              height={70} // Adjust size as needed
              className="absolute rotate-12 top-[135px] right-8 sm:right-[1080px] z-0 opacity-100" // Adjust positioning and opacity as needed
            />
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#956144] text-xs font-semibold">
              MENTAL HEALTH AT ANY AGE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="text-[#956144]">Mental Health</span>
            <br />
            <span>is Wealth</span>
          </h1>

          <div className="flex  sm:flex-row gap-5 max-w-max p-4 rounded-xl mt-6 sm:mb-0 mb-5 ">
            <Link
              href={"/employee"}
              className="cursor-pointer font-semibold px-6 sm:px-10 text-xl lg:text-2xl shadow-lg bg-[#FACC15] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Workplace
            </Link>

            <Link
              href={"/student"}
              className="cursor-pointer shadow-lg text-xl sm:text-2xl font-semibold px-6 sm:px-10 bg-[#E9D5FF] text-black p-2 rounded-xl transition  duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Campus
            </Link>
          </div>
        </section>

        <section className="w-full md:w-1/2 bg-transparent z-10 mb-8 md:mb-0">
          <img
            src="/dummyimg.png"
            alt="Help illustration"
            className="max-md:w-full max-md:h-auto object-cover"
          />
        </section>
      </main>
    </div>
  );
};

export default Hero;
