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
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] text-red-700">
        {error}
      </div>
    );

  return (
    <div className=" bg-[#F5F0E8] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#4A3427] mb-2">
              Featured Courses
            </h1>
            <div className="h-1 w-20 bg-[#4D7C0F]"></div>
          </div>
          <Link href="/all-courses">
            <button className="px-6 py-3 bg-[#8B4513] text-[#F5F0E8] rounded-lg hover:bg-[#723A0F] transition-colors duration-300 flex items-center gap-2 shadow-lg">
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#E8DFD0]"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#4D7C0F] text-white rounded-full text-sm">
                  {course.language}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <span className="px-4 py-1.5 bg-[#E8DFD0] text-[#4A3427] rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#4A3427] mb-3">
                  {course.title}
                </h2>
                <p className="text-[#6B584C] line-clamp-2 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-6 mb-6 text-[#6B584C]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>
                      {course.curriculum.reduce(
                        (acc, curr) => acc + curr.duration,
                        0
                      )}{" "}
                      mins
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.enrollmentCount} enrolled</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD0]">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#4A3427]">
                      ₹{course.discountedPrice}
                    </span>
                    {course.discountedPrice < course.price && (
                      <span className="text-sm text-[#6B584C] line-through">
                        ₹{course.price}
                      </span>
                    )}
                  </div>
                  <button className="px-6 py-2 bg-[#4D7C0F] text-white rounded-lg hover:bg-[#3F650C] transition-colors duration-300">
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
