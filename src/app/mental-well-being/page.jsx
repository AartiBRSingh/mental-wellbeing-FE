"use client";
import React, { useState } from "react";
import Link from "next/link";
import OrganizationModal from "../components/SignupForm";

const Page = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-800 leading-tight">
                Transform Your
                <span className="block mt-2 text-[#956144] relative">
                  Mental Wellbeing
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#956144] to-transparent opacity-30"></div>
                </span>
              </h1>
              <p className="mt-6 md:mt-8 text-lg sm:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
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
              </p>
              <div className="mt-8 md:mt-10">
                <button
                  onClick={() => setOpen(true)}
                  className="transform hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
                >
                  Enroll Your Organization
                </button>
                <OrganizationModal
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-8 md:py-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Employee Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-green-600 transition-colors">
                  Employee Well-Being
                  <div className="mt-2 text-base sm:text-lg font-normal text-green-600 opacity-75">
                    Enhancing Productivity & Harmony
                  </div>
                </h2>
                <div className="space-y-4 sm:space-y-6">
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
                    <div
                      key={index}
                      className="transform hover:-translate-y-1 transition-transform duration-300"
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
                    </div>
                  ))}
                </div>
                <Link
                  href="/campus"
                  className="inline-block w-full text-center mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                >
                  Explore Employee Programs →
                </Link>
              </div>
            </div>

            {/* Student Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-yellow-600 transition-colors">
                  Student Well-Being
                  <div className="mt-2 text-base sm:text-lg font-normal text-yellow-600 opacity-75">
                    Building Academic Resilience
                  </div>
                </h2>
                <div className="space-y-4 sm:space-y-6">
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
                    <div
                      key={index}
                      className="transform hover:-translate-y-1 transition-transform duration-300"
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
                    </div>
                  ))}
                </div>
                <Link
                  href="/student"
                  className="inline-block w-full text-center mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                >
                  Discover Student Support →
                </Link>
              </div>
            </div>

            {/* Self Understanding Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-blue-600 transition-colors">
                  Self-Understanding
                  <div className="mt-2 text-base sm:text-lg font-normal text-blue-600 opacity-75">
                    Your Journey to Growth
                  </div>
                </h2>
                <div className="space-y-4 sm:space-y-6">
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
                    <div
                      key={index}
                      className="transform hover:-translate-y-1 transition-transform duration-300"
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
                    </div>
                  ))}
                </div>
                <Link
                  href="/self-understanding"
                  className="inline-block w-full text-center mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base"
                >
                  Begin Your Journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
        </div>
      </section>
    </main>
  );
};

export default Page;
