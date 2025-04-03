"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center my-6 md:my-10">
      <main className="flex flex-col justify-center items-center w-[90vw] md:w-[80vw] lg:w-[60vw] gap-8">
        {/* Text Section - Now centered on all screens */}
        <section className="flex flex-col gap-6 md:gap-8 text-center w-full">
          <div className="inline-block relative mx-auto">
            {/* Removed commented code */}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl ">
            <span>Make </span>
            <span className="text-[#956144] relative">
              Happier Individuals,
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

            <br className="mb-2" />

            <span className="mt-4 inline-block">
              Build Stronger Communities.
            </span>
          </h1>

          <div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-gray-700 mt-4">
              Reshape mindset, enhance resilience, and foster emotional health &
              productive environment.
            </p>
          </div>
        </section>

        {/* Buttons - Now below text on all screen sizes */}
        <div className="flex flex-row gap-5 mx-auto justify-center mt-10">
          <Link
            href={"/employee"}
            className="cursor-pointer font-semibold px-6 sm:px-10 text-xl lg:text-2xl shadow-lg bg-[#FACC15] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
          >
            Workplaces
          </Link>

          <Link
            href={"/student"}
            className="cursor-pointer shadow-lg text-xl sm:text-2xl font-semibold px-6 sm:px-10 bg-[#E9D5FF] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
          >
            Institutes
          </Link>
        </div>

        {/* Image Section - Now at the bottom after the buttons */}
        <section className="w-full bg-transparent z-10 flex justify-center">
          <img
            src="/dummy-img3.png"
            alt="Help illustration"
            className="max-w-xl h-auto object-cover"
          />
        </section>
      </main>
    </div>
  );
};

export default Hero;
