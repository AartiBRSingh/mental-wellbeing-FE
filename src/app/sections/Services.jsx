"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export const DecorativeShapes = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.svg
      animate={{
        rotate: [-15, -10, -15],
        transition: { duration: 4, repeat: Infinity },
      }}
      className="absolute top-10 left-4 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 transform"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M50 90C50 90 85 65 85 40C85 20 70 10 50 10C30 10 15 20 15 40C15 65 50 90 50 90Z"
        fill="#FF844B"
        opacity="0.2"
      />
    </motion.svg>
    {/* Add your other SVGs here with similar motion.svg wrappers */}
  </motion.div>
);

const Services = () => {
  const serviceCardData = [
    {
      redirectTo: "/employee",
      imgUrl:
        "https://img.freepik.com/free-vector/good-team-concept-illustration_114360-4225.jpg?t=st=1737958269~exp=1737961869~hmac=9f55dffa1ad3cbe3003fbe6986667390cde22ce60ebf14ec70599896f3d62e8b&w=740",
      title: "Employee Well-being",
      desc: "Curated programs for Corporate Employees",
    },
    {
      redirectTo: "/student",
      imgUrl:
        "https://img.freepik.com/free-vector/happy-students-jumping-with-flat-design_23-2147907627.jpg?t=st=1737958353~exp=1737961953~hmac=b35ff6009000582dff7710c6c86c923f98fb82aa915ccc17fbbd564321b15760&w=740",
      title: "Student Well-being",
      desc: "Reach out to program from college to elementary school students",
    },
    {
      redirectTo: "/self",
      imgUrl:
        "https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148766834.jpg?t=st=1737958010~exp=1737961610~hmac=d9a5dae22d9564405a029e95ac231f84cde03a92482ba9557231c5ecd9498571&w=740",
      title: "Self Understanding",
      desc: "Get to know yourself better with this program",
    },
  ];

  const [currentService, setCurrentService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextService = useCallback(() => {
    setCurrentService((prev) => (prev + 1) % serviceCardData.length);
  }, [serviceCardData.length]);

  useEffect(() => {
    let intervalId;
    if (!isHovered && isLoaded) {
      intervalId = setInterval(nextService, 3000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, nextService, isLoaded]);

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      setCurrentService((prev) => (prev + 1) % serviceCardData.length);
    } else {
      setCurrentService((prev) =>
        prev === 0 ? serviceCardData.length - 1 : prev - 1
      );
    }
  };

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full flex justify-center bg-[#003B29] relative px-4 sm:px-6 py-12 md:py-0"
      id="services"
    >
      <DecorativeShapes />
      <main className="flex flex-col md:flex-row md:h-[500px] justify-center items-center w-full max-w-7xl gap-8 md:gap-0">
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
              CARING IS ALWAYS FREE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-6xl text-white"
          >
            <span>We help you to </span>
            <br />
            <span className="text-[#FDD56A] relative">
              g
              <span className="relative">
                row confidence
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute w-full h-[10px] bottom-0 left-0"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 -5, 100 5"
                    stroke="orange"
                    strokeWidth="4"
                    fill="transparent"
                  />
                </motion.svg>
              </span>
            </span>
            <br />
            <span> at any age</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-white text-sm sm:text-base max-w-md mx-auto md:mx-0"
          >
            To live your life to the fullest, we&apos;re continuing to find ways
            to prevent mental health problems.
          </motion.p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end z-10 relative w-full md:w-auto"
        >
          <div
            className="w-full sm:w-[320px] h-96 flex justify-center gap-4"
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-col justify-between my-2">
              {serviceCardData.map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-1.5 h-20 sm:h-28 rounded-md cursor-pointer transition-colors duration-300 ${
                    index === currentService ? "bg-white" : "bg-[#336661]"
                  }`}
                  key={index}
                  onClick={() => setCurrentService(index)}
                />
              ))}
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              key={currentService}
              className="bg-white rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 sm:w-xl sm:w-auto max-w-sm"
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={serviceCardData[currentService]?.imgUrl}
                  alt="Helping to Navigate"
                  className="rounded-t-lg h-60 sm:h-60 w-full object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-4"
              >
                <div className="flex justify-between items-center border-b border-t border-t-[#956144] border-b-[#956144] mb-2">
                  <h2 className="text-base sm:text-lg font-semibold">
                    {serviceCardData[currentService]?.title}
                  </h2>
                  <h2 className="text-xl font-semibold">|</h2>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={serviceCardData[currentService]?.redirectTo}
                    className="cursor-pointer inline-flex items-center px-4 sm:px-6 my-1 py-2 bg-yellow-400 text-green-900 font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300"
                  >
                    <span className="cursor-pointer">→</span>
                  </motion.a>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-opacity-70 mb-4 text-xs sm:text-sm"
                >
                  {serviceCardData[currentService]?.desc}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default Services;
