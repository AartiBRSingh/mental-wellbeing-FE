"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Clock, Users, ChevronRight } from "lucide-react";
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
    <div className="bg-transparent  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#4A3427] mb-3 tracking-tight">
              Featured Courses
            </h1>
            <div className="h-1.5 w-24 bg-[#D2691E] rounded-full"></div>
          </div>
          <Link href="/all-courses">
            <button className="px-6 py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
              View All Courses
              <ChevronRight className="h-5 w-5" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#F5DEB3]/50"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#228B22] text-white rounded-full text-sm font-medium shadow-md">
                  {course.language}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="px-4 py-1.5 bg-[#F0E68C] text-[#8B4513] rounded-full text-sm font-semibold">
                    {course.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#4A3427] mb-3 leading-tight">
                  {course.title}
                </h2>
                <p className="text-[#6B584C] line-clamp-2 mb-4">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-[#6B584C] mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#D2691E]" />
                    <span>
                      {course.curriculum.reduce(
                        (acc, curr) => acc + curr.duration,
                        0
                      )}{" "}
                      mins
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#228B22]" />
                    <span>{course.enrollmentCount} enrolled</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F5DEB3]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#4A3427]">
                      ₹{course.discountedPrice}
                    </span>
                    {course.discountedPrice < course.price && (
                      <span className="text-sm text-[#6B584C] line-through opacity-70">
                        ₹{course.price}
                      </span>
                    )}
                  </div>
                  <button className="px-6 py-2.5 bg-[#228B22] text-white rounded-lg hover:bg-[#1E5631] transition-colors duration-300 shadow-md hover:shadow-lg">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
