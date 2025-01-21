import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

const GetHelp = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 my-10">
      <main className="flex flex-col md:flex-row justify-center md:gap-12 lg:gap-24 items-center w-full max-w-7xl">
        <section className="w-full md:w-1/2 bg-transparent z-10 mb-8 md:mb-0">
          <img
            src="/dummyimg.png"
            alt="Help illustration"
            className="w-full h-auto object-cover"
          />
        </section>

        <section className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold">
            <span>How </span>
            <span className="text-[#956144]">can we </span>
            <br className="hidden sm:block" />
            <span>help you?</span>
          </h1>

          <div className="space-y-4">
            <p className="text-gray-800 text-sm sm:text-base">
              We work with world-class experts to create wellbeing human
              centered tools and courses unite sustainable growth.
            </p>

            <p className="text-gray-800 text-sm sm:text-base">
              We take data-driven decisions around your wellbeing strategy.
            </p>
          </div>

          <button className="cursor-pointer flex items-center gap-2 w-fit px-6 sm:px-8 bg-black text-white font-bold py-2.5 sm:py-3 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner text-sm sm:text-base">
            Get help
            <MdChevronRight className="text-[#FF7F4B]" size={24} />
          </button>
        </section>
      </main>
    </div>
  );
};

export default GetHelp;
