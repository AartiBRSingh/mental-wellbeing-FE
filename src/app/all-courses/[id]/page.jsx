"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Users,
  BookOpen,
  Globe,
} from "lucide-react";

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample reviews and success stories since they're empty in the data
  const sampleReviews = [
    {
      id: 1,
      rating: 5,
      comment:
        "This course transformed my understanding of mental wellbeing. The practical exercises were particularly helpful.",
      date: "2024-12-15",
      studentName: "John Doe",
    },
    {
      id: 2,
      rating: 4,
      comment:
        "Very comprehensive content. Would recommend to anyone starting their mental health journey.",
      date: "2024-12-20",
      studentName: "Jane Smith",
    },
  ];

  const sampleSuccessStories = [
    {
      studentName: "Sarah Johnson",
      story:
        "This course helped me develop better coping mechanisms and improve my daily mental wellness routine.",
      date: "2024-12-25",
    },
    {
      studentName: "Michael Chen",
      story:
        "The practical tools I learned have made a significant difference in how I handle stress and anxiety.",
      date: "2025-01-10",
    },
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const id = "679c9768dd906e1b51331add"; // Replace with actual ID from router/params
        const response = await axios.get(
          `https://starfish-app-fko8w.ondigitalocean.app/get-courses/${id}`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;

  if (!course) return null;

  const toggleSection = (index) => {
    setIsExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-2">4.8 (128 reviews)</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="ml-2">{course.enrollmentCount} students</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="ml-2">{course.language}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span className="ml-2">{course.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl font-bold">
              ₹{course.discountedPrice}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ₹{course.price}
            </span>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
        {course.curriculum.map((item, index) => (
          <div
            key={index}
            className="mb-4 bg-white rounded-lg shadow-sm border"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection(index)}
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Clock className="w-4 h-4" />
                  <span className="ml-2">
                    {Math.floor(item.duration / 60)}h {item.duration % 60}m
                  </span>
                </div>
              </div>
              {isExpanded[index] ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
            {isExpanded[index] && (
              <div className="p-4 border-t">
                <p className="text-gray-600">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Reviews Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sampleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{review.studentName}</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sampleSuccessStories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h3 className="font-bold mb-2">{story.studentName}</h3>
              <p className="text-gray-600 mb-4">{story.story}</p>
              <p className="text-sm text-gray-500">
                {new Date(story.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseDetailPage;
