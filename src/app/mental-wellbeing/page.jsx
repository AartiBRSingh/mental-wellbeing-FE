"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import OrganizationModal from "../components/SignupForm";
import Image from "next/image";

const Page = () => {
  const [isOpen, setOpen] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/watercolor-international-yoga-day-background_23-2149394054.jpg?t=st=1741844447~exp=1741848047~hmac=89ef11e14e935d1d316e89adef3fe2f3166a30956ba617ef5504fda409219629&w=1060')",
          backgroundSize: "contain",
          backgroundPosition: "",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Hero Section */}
      <section className="relative py-12 ">
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="max-w-3xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.2,
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-800 leading-tight">
                Transform Your
                <motion.span
                  className="block mt-2 text-[#956144] relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Mental Wellbeing
                  <motion.svg
                    className="absolute w-full h-[14px] -bottom-3 left-0"
                    viewBox="0 0 50 10"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                  >
                    <motion.path
                      d="M0 5 Q 50 -5, 100 5"
                      stroke="orange"
                      strokeWidth="4"
                      fill="transparent"
                    />
                  </motion.svg>
                </motion.span>
              </h1>
              <motion.p
                className="mt-6 md:mt-8 text-lg sm:text-xl text-gray-600 leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Mental well-being is essential for leading a{" "}
                <span className="font-semibold text-blue-600">balanced</span>,
                <span className="font-semibold text-green-600">
                  {" "}
                  productive
                </span>
                , and
                <span className="font-semibold text-purple-600">
                  {" "}
                  fulfilling life
                </span>
                . It impacts our thoughts, emotions, and behaviors, shaping how
                we handle stress, interact with others, and make decisions.
              </motion.p>
              <motion.div
                className="mt-8 md:mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => setOpen(true)}
                  className="transform hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Your Organization
                </motion.button>
                <OrganizationModal
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Cards Section */}
      <section className="py-8 md:py-10 relative z-10">
        <motion.div
          className="max-w-[1600px] mx-auto px-4 sm:px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Employee Card */}
            <motion.div
              className="group bg-white rounded-3xl shadow-lg overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-green-600 transition-colors">
                  Employee Well-Being
                  <div className="mt-2 text-base sm:text-lg font-normal text-green-600 opacity-75">
                    Enhancing Productivity & Harmony
                  </div>
                </h2>
                <motion.div
                  className="space-y-4 sm:space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      title: "Stress Reduction",
                      description:
                        "Reduces stress, burnout, and absenteeism, leading to a more engaged workforce",
                    },
                    {
                      title: "Team Excellence",
                      description:
                        "Improves team collaboration, communication, and job satisfaction",
                    },
                    {
                      title: "Enhanced Performance",
                      description:
                        "Increases focus, creativity, and problem-solving abilities, boosting overall performance",
                    },
                    {
                      title: "Supportive Environment",
                      description:
                        "Creates a supportive work environment, improving mental resilience and motivation",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariant}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-green-50 to-white p-3 sm:p-4 rounded-xl border-l-4 border-green-400">
                        <span className="w-6 sm:w-8 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                          ✓
                        </span>
                        <div>
                          <p className="text-gray-700 font-medium text-sm sm:text-base">
                            {item.title}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/employee"
                    className="inline-block w-full text-center mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                  >
                    Explore Employee Programs →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Student Card */}
            <motion.div
              className="group bg-white rounded-3xl shadow-lg overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-yellow-600 transition-colors">
                  Student Well-Being
                  <div className="mt-2 text-base sm:text-lg font-normal text-yellow-600 opacity-75">
                    Building Academic Resilience
                  </div>
                </h2>
                <motion.div
                  className="space-y-4 sm:space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      title: "Stress Management",
                      description:
                        "Helps students manage exam anxiety, academic stress, and peer pressure",
                    },
                    {
                      title: "Academic Excellence",
                      description:
                        "Enhances concentration, memory, and learning abilities for better performance",
                    },
                    {
                      title: "Emotional Development",
                      description:
                        "Develops emotional intelligence and coping skills for handling life's challenges",
                    },
                    {
                      title: "Personal Growth",
                      description:
                        "Promotes a positive mindset and self-confidence, fostering personal growth",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariant}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-yellow-50 to-white p-3 sm:p-4 rounded-xl border-l-4 border-yellow-400">
                        <span className="w-6 sm:w-8 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                          ✓
                        </span>
                        <div>
                          <p className="text-gray-700 font-medium text-sm sm:text-base">
                            {item.title}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/student"
                    className="inline-block w-full text-center mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                  >
                    Discover Student Support →
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Self Understanding Card */}
            <motion.div
              className="group bg-white rounded-3xl shadow-lg overflow-hidden md:col-span-2 lg:col-span-1"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-blue-600 transition-colors">
                  Self-Understanding
                  <div className="mt-2 text-base sm:text-lg font-normal text-blue-600 opacity-75">
                    Your Journey to Growth
                  </div>
                </h2>
                <motion.div
                  className="space-y-4 sm:space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      title: "Self-Awareness",
                      description:
                        "Encourages self-awareness, helping individuals understand their thoughts, emotions, and behaviors",
                    },
                    {
                      title: "Better Decision Making",
                      description:
                        "Improves decision-making and problem-solving, leading to better life choices",
                    },
                    {
                      title: "Emotional Resilience",
                      description:
                        "Strengthens emotional resilience to handle setbacks and challenges effectively",
                    },
                    {
                      title: "Mental Clarity",
                      description:
                        "Promotes mental clarity, inner peace, and fulfillment in personal and professional life",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariant}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 bg-gradient-to-r from-blue-50 to-white p-3 sm:p-4 rounded-xl border-l-4 border-blue-400">
                        <span className="w-6 sm:w-8 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                          ✓
                        </span>
                        <div>
                          <p className="text-gray-700 font-medium text-sm sm:text-base">
                            {item.title}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/self"
                    className="inline-block w-full text-center mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                  >
                    Begin Your Journey →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Bottom Section */}
      <motion.section
        className="py-12 md:py-16 bg-white relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Investing in mental well-being enhances
            <span className="font-semibold text-blue-600">
              {" "}
              overall quality of life
            </span>
            ,
            <span className="font-semibold text-green-600"> career growth</span>
            , and
            <span className="font-semibold text-purple-600">
              {" "}
              personal happiness
            </span>
            . Whether in the workplace, academic life, or personal journey,
            prioritizing mental health leads to stronger individuals and
            thriving communities.
          </p>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default Page;
