"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Star } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "../baseURL";

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
  </div>
);

const Services = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-courses`);
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (courses.length === 0) return;

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

  if (loading) return null;
  if (error) return <div className="text-white">{error}</div>;

  return (
    <div
      className="w-full flex justify-center bg-[#003B29] relative px-4 sm:px-6 py-8 sm:py-12 md:py-0"
      id="services"
    >
      <DecorativeShapes />
      <main className="flex flex-col md:flex-row md:h-[500px] justify-center items-center w-full max-w-7xl gap-6 sm:gap-8 md:gap-0">
        <section className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-8 text-center md:text-left">
          <div className="inline-block">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
              CARING IS ALWAYS FREE
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
                  className="absolute w-full h-[8px] sm:h-[10px] bottom-0 left-0"
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

          <p className="text-white text-xs mb-10 sm:text-sm md:text-base max-w-md mx-auto md:mx-0 px-4 sm:px-0">
            To live your life to the fullest, we&apos;re continuing to find ways
            to prevent mental health problems.
          </p>

          <div className="relative w-full flex justify-center md:justify-start md:absolute md:left-[305px] md:bottom-6">
            <Link href="/all-courses">
              <button className="px-4 sm:px-6 py-2 sm:py-3 mt-2 sm:mt-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
                All Courses
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
          </div>
        </section>

        <section className="flex-1 flex justify-center md:justify-end z-10 relative w-full md:w-auto mt-6 sm:mt-8 md:mt-0">
          {courses.length > 0 && (
            <div className="w-full max-w-[320px] h-[360px] sm:h-96 flex justify-center gap-3 sm:gap-4">
              <div className="flex flex-col justify-between my-2">
                {courses.map((_, index) => (
                  <div
                    className={`w-1 sm:w-1.5 h-16 sm:h-20 md:h-28 rounded-md cursor-pointer transition-colors duration-300 ${
                      index === currentCourse ? "bg-white" : "bg-[#336661]"
                    }`}
                    key={index}
                    onClick={() => setCurrentCourse(index)}
                  />
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-lg w-full sm:w-[320px]">
                <Link href={`/all-courses/${courses[currentCourse]?._id}`}>
                  <div className="relative">
                    <img
                      src={courses[currentCourse]?.thumbnailUrl}
                      alt={courses[currentCourse]?.title}
                      className="rounded-t-lg w-full h-36 sm:h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-[#228B22] text-white rounded-full text-xs sm:text-sm font-medium">
                      {courses[currentCourse]?.language}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="mb-3 sm:mb-4">
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F0E68C] text-[#8B4513] rounded-full text-xs sm:text-sm font-semibold">
                        {courses[currentCourse]?.category}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#4A3427] mb-2 sm:mb-3 line-clamp-1 h-6 sm:h-7">
                      {courses[currentCourse]?.title}
                    </h2>
                    <div className="mb-3 sm:mb-4">
                      {renderStars(courses[currentCourse]?.rating || 5)}
                    </div>
                    <div className="flex items-center justify-between border-t border-[#F5DEB3] pt-3 sm:pt-4">
                      <span className="text-lg sm:text-xl font-bold text-[#4A3427]">
                        ₹{courses[currentCourse]?.discountedPrice}
                      </span>
                      {courses[currentCourse]?.discountedPrice <
                        courses[currentCourse]?.price && (
                        <span className="text-xs sm:text-sm text-[#6B584C] line-through opacity-70">
                          ₹{courses[currentCourse]?.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Services;
