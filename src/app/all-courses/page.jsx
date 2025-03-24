"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CourseCatalog = () => {
  // Hardcoded courses from Services component
  const hardcodedCourses = [
    // Commented out hardcoded courses
  ];

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://starfish-app-fko8w.ondigitalocean.app/get-courses"
        );

        // Combine hardcoded courses with fetched courses
        // Filter out any duplicates by ID if needed
        const fetchedCourses = response.data;
        const hardcodedIds = hardcodedCourses.map((course) => course._id);
        const filteredFetchedCourses = fetchedCourses.filter(
          (course) => !hardcodedIds.includes(course._id)
        );

        // Combine with hardcoded courses first
        setCourses([...hardcodedCourses, ...filteredFetchedCourses]);
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
    if (!curriculum || !Array.isArray(curriculum)) return 0;
    return curriculum.reduce((total, item) => total + item.duration, 0);
  };

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

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

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
          {courses.map((course) => {
            // Determine if this is a hardcoded course (has categoryIcon) or fetched course
            const isHardcodedCourse = Boolean(course.categoryIcon);

            return (
              <div
                key={course._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#F5DEB3]/50"
              >
                <Link
                  href={`/all-courses/${generateSlug(
                    course.title,
                    course._id
                  )}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-video">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />

                      {/* Category badge with consistent positioning */}
                      <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#228B22] text-white rounded-full text-sm font-medium shadow-md flex items-center">
                        {isHardcodedCourse && (
                          <img
                            src={course.categoryIcon}
                            alt="University logo"
                            className="h-5 w-5 mr-2 rounded-full"
                          />
                        )}
                        <span>{course.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col space-y-4 flex-grow">
                      <h2 className="text-2xl font-bold text-[#4A3427] leading-tight">
                        {course.title}
                      </h2>
                      <p className="text-[#6B584C] line-clamp-3 flex-grow">
                        {course.details || course.description || ""}
                      </p>
                      <div className="flex items-center">
                        {renderStars(course.rating || 5)}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[#F5DEB3] mt-auto">
                        <div className="flex gap-3 items-center">
                          <Calendar className="h-5 w-5 text-[#6B584C]" />
                          <span className="text-[#6B584C]">
                            {course.duration ||
                              getTotalDuration(course.curriculum)}{" "}
                            months
                          </span>
                        </div>
                        {/* Price section - consistent spacing even when commented out */}
                        <div className="flex gap-3 items-center">
                          {/* Price content commented out but spacing preserved */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
