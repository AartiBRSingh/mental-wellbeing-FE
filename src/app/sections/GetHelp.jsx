"use client";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const GetHelp = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true });
  const textInView = useInView(textRef, { once: true });

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 my-10 lg:my-20">
      <main className="flex md:flex-row flex-col-reverse justify-center md:gap-12 lg:gap-24 items-center w-full max-w-7xl">
        <motion.section
          ref={imageRef}
          className="w-full md:w-1/2 bg-transparent z-10 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: imageInView ? 1 : 0,
            x: imageInView ? 0 : -50,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="/dummyimg.png"
            alt="Help illustration"
            className="max-md:w-full max-md:h-auto object-cover"
          />
        </motion.section>

        <motion.section
          ref={textRef}
          className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 max-md:text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: textInView ? 1 : 0,
            y: textInView ? 0 : 50,
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: textInView ? 1 : 0,
              y: textInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span>How </span>
            <span className="">can the </span>
            <br className="hidden sm:block" />
            <span className="text-[#956144]">Forum </span>
            <span className="text-red-500 text-4xl">♥</span>
            <br className="hidden sm:block" />
            <span>help you?</span>
          </motion.h1>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: textInView ? 1 : 0,
              y: textInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-800 text-sm sm:text-base">
              We work with world-class experts to create wellbeing human
              centered tools and courses unite sustainable growth.
            </p>

            <p className="text-gray-800 text-sm sm:text-base">
              We take data-driven decisions around your wellbeing strategy.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center max-md:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: textInView ? 1 : 0,
              y: textInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href={"/community"}
              className="cursor-pointer flex items-center gap-2 w-fit px-6 sm:px-8 bg-black text-white font-bold py-2.5 sm:py-3 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner text-sm sm:text-base"
            >
              Forum
              <MdChevronRight className="text-[#FF7F4B]" size={24} />
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default GetHelp;
