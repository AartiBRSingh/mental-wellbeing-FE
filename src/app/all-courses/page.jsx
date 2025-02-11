"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://starfish-app-fko8w.ondigitalocean.app/get-courses"
        );
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTotalDuration = (curriculum) => {
    return curriculum.reduce((total, item) => total + item.duration, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D2691E] opacity-75"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF4E6]">
        <div className="text-red-800 text-xl font-semibold bg-red-100 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#4A3427] mb-4">
            Professional Courses
          </h1>
          <div className="h-1.5 w-24 bg-[#D2691E] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#F5DEB3]/50"
            >
              <div className="relative aspect-video">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#228B22] text-white rounded-full text-sm font-medium shadow-md">
                  {course.category}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-[#4A3427] leading-tight">
                  {course.title}
                </h2>

                <p className="text-[#6B584C] line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-[#6B584C]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#D2691E]" />
                    <span>{getTotalDuration(course.curriculum)} months</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#228B22]" />
                    <span>{course.enrollmentCount} enrolled</span>
                  </div> */}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F5DEB3]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#4A3427]">
                      {formatPrice(course.discountedPrice)}
                    </span>
                    {course.discountedPrice < course.price && (
                      <span className="text-sm text-[#6B584C] line-through opacity-70">
                        {formatPrice(course.price)}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/all-courses/${course._id}`}
                    className="px-6 py-2.5 bg-[#D2691E] text-white rounded-lg hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Details
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
