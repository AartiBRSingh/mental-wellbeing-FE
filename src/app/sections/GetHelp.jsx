"use client";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

const GetHelp = () => {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 my-8 lg:my-20">
      <main className="flex flex-col-reverse md:flex-row justify-center md:gap-8 lg:gap-24 items-center w-full max-w-7xl">
        {/* Image Section */}
        <section className="w-full md:w-1/2 bg-transparent z-10 mt-8 md:mt-0 order-2 md:order-none flex justify-center md:block">
          <img
            src="/children.png"
            alt="Help illustration"
            className="max-w-full h-auto w-4/5 sm:w-3/4 md:w-full object-cover rounded-xl "
          />
        </section>

        {/* Content Section */}
        <section className="w-full md:w-1/2 flex mt-5 flex-col gap-4 md:gap-6 lg:gap-8 text-center md:text-left">
          {/* Title Words */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
            <div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                Calm
              </span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl lg:text-5xl text-[#956144] relative">
                Happier
                <svg
                  className="absolute w-full h-[8px] sm:h-[10px] lg:h-[14px] -bottom-1 sm:-bottom-2 left-0"
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
            </div>

            <div>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                Positive
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="my-2 md:my-3">
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl">
              Forum, a platform for discussion, knowledge sharing, support,
              networking, and collaboration, helping individuals connect, learn,
              and exchange ideas effectively.
            </p>
          </div>

          {/* Forum Button - Visible on all devices */}
          <div className="flex justify-center md:justify-start items-center mt-2 md:mt-4">
            <Link
              href={"/forum"}
              className="cursor-pointer flex shadow-md items-center gap-2 w-fit px-6 sm:px-8 bg-yellow-700 text-white font-semibold py-2 sm:py-3 rounded-xl transition duration-300 ease-in-out hover:bg-yellow-800 hover:text-white hover:shadow-inner text-base sm:text-lg"
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
