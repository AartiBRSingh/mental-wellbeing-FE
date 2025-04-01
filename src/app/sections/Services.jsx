"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const DecorativeShapes = () => (
  <div>
    <svg
      className="absolute top-10 left-4 sm:left-10 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 transform"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M50 90C50 90 85 65 85 40C85 20 70 10 50 10C30 10 15 20 15 40C15 65 50 90 50 90Z"
        fill="#FF844B"
        opacity="0.2"
      />
    </svg>
    <Image
      src="/sunflower21.png"
      alt="Decorative image"
      width={200}
      height={200}
      className="absolute top-[590px] rotate-12 right-6 sm:top-[160px] sm:right-20 z-0 opacity-100 w-[130px] sm:w-[200px] h-auto"
    />
  </div>
);

const Services = () => {
  // Hardcoded courses data
  const hardcodedCourses = [
    {
      _id: "course1",
      title: "Clinical Psychology",
      category: "Jadavpur University",
      categoryIcon: "/JUBG.png",
      language: "English",
      thumbnailUrl: "/Course.jpg",
      rating: 4.8,
      price: 2999,
      discountedPrice: 1499,
      level: "Advanced",
      duration: "6 Months",
      reviews: 285,
      details:
        "Career path include roles in hospital, mental health clinics, and private practice.",
    },
    {
      _id: "course2",
      title: "Counseling Psychology",
      category: "Jadavpur University",
      categoryIcon: "/JUBG.png",
      language: "English",
      thumbnailUrl: "/Course.jpg",
      rating: 4.6,
      price: 3499,
      discountedPrice: 1999,
      level: "Advanced",
      duration: "6 Months",
      reviews: 320,
      details:
        "Career path include roles in educational institutions, corporate wellness program, and community support services.",
    },
    {
      _id: "course3",
      title: "Industrial/Organisational Psychology",
      category: "Jadavpur University",
      categoryIcon: "/JUBG.png",
      language: "English",
      thumbnailUrl: "/Course.jpg",
      rating: 4.9,
      price: 2799,
      discountedPrice: 1299,
      level: "Advanced",
      duration: "6 Months",
      reviews: 175,
      details:
        "Career path include roles in HR department, corporate training, and organisational consulting.",
    },
  ];

  const [courses] = useState(hardcodedCourses);
  const [currentCourse, setCurrentCourse] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentCourse((prev) => (prev + 1) % courses.length);
    }, 5000);

    // Cleanup timeout on component unmount or when courses change
    return () => clearTimeout(timer);
  }, [currentCourse, courses.length]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 sm:h-4 w-3 sm:w-4 ${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs sm:text-sm text-[#6B584C]">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div
      className="w-full flex justify-center bg-[#003B29] relative px-4 sm:px-6 py-8 sm:py-12 md:py-0 xl:mt-0 mt-4"
      id="services"
    >
      <DecorativeShapes />
      <main className="flex flex-col md:flex-row md:h-[500px] justify-center items-center w-full max-w-7xl gap-6 sm:gap-8 md:gap-0">
        <section className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-8 text-center md:text-left">
          <div className="inline-block">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-700 text-white text-lg font-semibold">
              Professional Courses
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white">
            <span>We help you to </span>
            <br />
            <span className="text-[#FDD56A] relative">
              g
              <span className="relative">
                row confidence
                <svg
                  className="absolute w-full h-[10px] sm:h-[10px] sm:bottom-0 -bottom-2 left-0"
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
            </span>
            <br />
            <span> at any age</span>
          </h1>

          <p className="text-white max-w-60 text-xs mb-6 sm:text-sm md:text-xl xl:max-w-md mx-auto md:mx-0 px-4 sm:px-0">
            Enhance skills, boost career opportunities, and get
            industry-specific knowledge.
          </p>

          {/* Desktop/tablet button - identical to original position and styling */}
          <div className="hidden sm:flex justify-center md:justify-start z-20">
            <Link href="/all-courses">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
                All Courses
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
          </div>
        </section>

        <section className="flex justify-center md:justify-end z-10 relative w-full md:w-auto sm:mt-8 md:mt-0">
          {courses.length > 0 && (
            <div className="w-full max-w-md h-[450px] sm:h-[450px] flex justify-center gap-3 sm:gap-4">
              <div className="flex flex-col justify-between my-2">
                {courses.map((_, index) => (
                  <div
                    className={`w-1.5 sm:w-1.5 h-24 sm:h-20 md:h-28 rounded-md cursor-pointer transition-colors duration-300 ${
                      index === currentCourse ? "bg-white" : "bg-[#336661]"
                    }`}
                    key={index}
                    onClick={() => setCurrentCourse(index)}
                  />
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden border border-gray-200 flex flex-col">
                <div className="relative">
                  <img
                    src={courses[currentCourse]?.thumbnailUrl}
                    alt={courses[currentCourse]?.title}
                    className="w-full h-60 object-cover"
                  />
                </div>

                <div className="px-4 py-3 flex-grow flex flex-col">
                  <div className="flex items-center">
                    <Image
                      src={courses[currentCourse]?.categoryIcon}
                      alt="category icon"
                      width={30}
                      height={30}
                      className="object-contain mr-2"
                    />
                    <span className="text-gray-700">
                      {courses[currentCourse]?.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {courses[currentCourse]?.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {courses[currentCourse]?.details}
                  </p>

                  <div className="mb-2">
                    {renderStars(courses[currentCourse]?.rating || 5)}
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="mr-2">
                      {courses[currentCourse]?.level}
                    </span>

                    <span className="mr-2">
                      <span className="mx-2">•</span>Professional Certificate
                      <span className="mx-2">•</span>
                    </span>

                    <span>{courses[currentCourse]?.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* Mobile-only button at the bottom of the component */}
        <div className="sm:hidden flex justify-center w-full mt-6 z-20">
          <Link href="/all-courses">
            <button className="px-4 py-2 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm">
              All Courses
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Services;
