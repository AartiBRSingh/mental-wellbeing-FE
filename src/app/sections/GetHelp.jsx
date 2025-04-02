"use client";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

const GetHelp = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 my-8 lg:my-20">
      <main className="flex flex-col-reverse md:flex-row justify-center md:gap-8 lg:gap-24 items-center w-full max-w-7xl">
        {/* Content Section - Increased width */}
        <section className="w-full md:w-full flex mt-5 flex-col gap-4 md:gap-6 lg:gap-8 text-center md:text-left">
          {/* Description - with increased width */}
          <div className="my-2 md:my-3 max-w-7xl mx-auto md:mx-0">
            <p className="text-gray-800 text-base sm:text-lg lg:text-3xl">
              A mental health discussion forum fosters open conversations,
              reduces stigma, provides
            </p>
            <p className="text-gray-800 text-base sm:text-lg lg:text-3xl ml-10">
              support, and empowers individuals with shared experiences and
              expert insights.
            </p>
          </div>

          {/* Forum Button - Visible on all devices */}
          <div className="flex justify-center md:justify-center items-center mt-2 md:mt-4">
            <Link
              href={"/forum"}
              className="cursor-pointer flex shadow-md items-center gap-2 w-fit px-6 sm:px-8 bg-yellow-700 text-white font-semibold py-2 sm:py-3 rounded-xl transition duration-300 ease-in-out hover:bg-yellow-800 hover:text-white hover:shadow-inner text-base sm:text-2xl"
            >
              Forum
              <MdChevronRight className="text-[#FF7F4B]" size={20} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GetHelp;
