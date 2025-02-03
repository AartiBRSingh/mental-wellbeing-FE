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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const getTotalDuration = (curriculum) => {
    return curriculum.reduce((total, item) => total + item.duration, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Certificate Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="relative h-48">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {course.category}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{getTotalDuration(course.curriculum)} mins</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.enrollmentCount} enrolled</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(course.discountedPrice)}
                  </span>
                  {course.discountedPrice < course.price && (
                    <span className="ml-2 text-gray-400 line-through">
                      {formatPrice(course.price)}
                    </span>
                  )}
                </div>
                <Link
                  href={`/all-courses/${course._id}`}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
