"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full flex justify-center my-6 md:my-10"
    >
      <main className="flex flex-col md:flex-row justify-center items-center w-[90vw] md:w-[80vw] lg:w-[60vw] gap-8 md:gap-0">
        {/* Text Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block"
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#956144] text-xs font-semibold">
              MENTAL HEALTH AT ANY AGE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-[#956144]"
            >
              Mental Health
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              is Wealth
            </motion.span>
          </motion.h1>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href={"#footer"}
                className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg transition-transform"
              >
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl"
                >
                  ↓
                </motion.span>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="text-gray-800 max-w-md text-center sm:text-left"
            >
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </motion.p>
          </motion.div> */}

          <div className="flex gap-5">
            <Link
              href={"/employee"}
              className="cursor-pointer font-semibold px-4 shadow-lg bg-[#FACC15] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Workplace
            </Link>

            <Link
              href={"/student"}
              className="cursor-pointer shadow-lg font-semibold px-4 bg-[#E9D5FF] text-black p-2 rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Campus
            </Link>
          </div>
        </motion.section>

        {/* Image Section */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex justify-center md:justify-end bg-transparent mt-8 md:mt-0"
        >
          <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[350px] md:h-96 mr-20">
            {/* Top Image */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute lg:top-4 lg:right-1/4 right-10 -top-8 transform -translate-x-1/2 scale-75 sm:scale-90 md:scale-100"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-8 left-0"
                >
                  <span className="bg-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold z-10">
                    Happier
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-36 h-36 bg-yellow-100 rounded-2xl overflow-hidden p-1 shadow-sm"
                >
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-fingers-crossed-illustration_23-2150212632.jpg?t=st=1738051346~exp=1738054946~hmac=2b5264f4fd2426e5b85b75a8389299e69dd47b481e0a90fa1e53c1a8d1033dfe&w=740"
                    alt="Profile 1"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl"
                >
                  ♦
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Middle Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute lg:top-1/4 top-2 lg:right-0 -right-16 scale-75 sm:scale-90 md:scale-100"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-8 right-14"
                >
                  <span className="bg-green-300 px-3 py-1 rounded-md text-sm font-semibold">
                    Calm
                  </span>
                </motion.div>
                <div className="w-48 h-48 bg-green-300 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://img.freepik.com/free-vector/ash-wednesday-concept-illustration_114360-4563.jpg?t=st=1738051234~exp=1738054834~hmac=8b1b551097a0db2f13c07d8ec1476ff8d95d4413a0ba5ddc2b3b89984f7c365f&w=740"
                    alt="Profile 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-8 top-1/2 rounded-lg px-2 py-1"
                >
                  <span className="text-orange-500">✓</span>
                </motion.div>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-4 bottom-0 text-green-400 text-2xl"
                >
                  ♦
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Bottom Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-0 lg:left-1/4 left-10 mr-20 scale-75 sm:scale-90 md:scale-100"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="w-56 h-56 bg-purple-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://img.freepik.com/free-vector/beautiful-woman-with-brown-hair_24908-81058.jpg?t=st=1738051683~exp=1738055283~hmac=87eebd9b79e21150a58a9d1ca2e775b0dadc6addc87f9adc1661e3ba04a7fbb8&w=740"
                    alt="Profile 3"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -left-10 top-1/2 bg-transparent rounded-lg p-1"
                >
                  <span className="text-red-500 text-4xl">♥</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -bottom-8"
                >
                  <span className="bg-purple-200 px-3 py-1 rounded-md text-sm font-semibold">
                    Positive
                  </span>
                </motion.div>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -left-4 top-0 text-purple-400 text-2xl"
                >
                  ♦
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 right-1/4 text-gray-300 text-2xl"
            >
              ～
            </motion.div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default Hero;
