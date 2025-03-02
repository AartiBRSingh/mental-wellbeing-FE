"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Clock, Users, ChevronRight, Star, Calendar } from "lucide-react";
import { baseURL } from "../baseURL";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
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

  // New function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-[#6B584C]">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF4E6] transition-colors duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8B4513] opacity-75"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF4E6] text-red-800 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="bg-transparent py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-[480px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-2 sm:mb-0">
              Featured
            </h2>
            <span className="text-[#956144] font-semibold relative text-3xl sm:text-4xl md:text-5xl lg:text-5xl block">
              <span className="relative">
                Courses
                <svg
                  className="absolute w-full h-[8px] sm:h-[10px] md:h-[12px] -bottom-1 left-0"
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
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 flex-grow">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#F5DEB3]/50"
            >
              <Link href={`/all-courses/${course._id}`}>
                <div>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 bg-[#228B22] text-white rounded-full text-xs sm:text-sm font-medium shadow-md">
                      {course.language}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
                    <div>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F0E68C] text-[#8B4513] rounded-full text-xs sm:text-sm font-semibold">
                        {course.category}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#4A3427] mb-2 sm:mb-3 leading-tight line-clamp-1">
                      {course.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#6B584C] line-clamp-2 mb-2 sm:mb-4">
                      {course.description}
                    </p>

                    {/* Added rating display */}
                    <div className="flex items-center">
                      {renderStars(course.rating || 5)}
                    </div>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#F5DEB3]">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-xs sm:text-sm">
                          {course.curriculum.reduce(
                            (acc, curr) => acc + curr.duration,
                            0
                          )}{" "}
                          Months
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#4A3427]">
                          ₹ {course.discountedPrice}
                        </span>
                        {course.discountedPrice < course.price && (
                          <span className="text-xs sm:text-sm text-[#6B584C] line-through opacity-70 gap-1">
                            ₹{course.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* All Courses button - now in its own container that's always centered */}
        <div className="flex justify-center w-full mt-10 sm:mt-12 md:mt-16">
          <Link href="/all-courses">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-lg sm:rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
              All Courses
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
