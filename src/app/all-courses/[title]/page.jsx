"use client";
import React, { useEffect, useState } from "react";
import { Star, Info, ChevronDown, Calendar, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { baseURL } from "@/app/baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import CourseReviews from "@/app/components/CourseReviews";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [userId, setUserId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setUserId(userId);
    } else {
      setUserId("");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/get-courses/${id}`);
        setCourse(res.data);
        setReviews(res.data.reviews || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId);
  };

  const sections = [
    { id: "about", label: "About" },
    { id: "outcomes", label: "Outcomes" },
    { id: "courses", label: "Courses" },
    { id: "reviews", label: "Reviews" },
    { id: "testimonials", label: "Testimonials" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/courses/${id}/reviews`, {
        studentId: userId,
        rating,
        comment,
      });
      setReviews([...reviews, response.data.review]);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review", error);
    }
    setLoading(false);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white m-10 rounded-2xl shadow-xl">
        <div className="animate-pulse">
          <div className="h-48 w-48 bg-gray-200 rounded-full mb-6 mx-auto md:mx-0"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white my-10 rounded-2xl shadow-xl">
      {/* Hero Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <img
            src={course?.thumbnailUrl || "/childhover.jpg"}
            alt={course?.title}
            className="h-60 w-60 rounded-full mb-6 shadow-xl object-cover border-4 border-white mx-auto md:mx-0"
          />
          <div>
            <h1 className="text-3xl font-bold mb-3 text-gray-800">
              {course?.title}
            </h1>
            <div className="relative">
              <p
                className={`text-gray-700 mb-1 max-w-3xl leading-relaxed ${
                  !showFullDescription ? "line-clamp-5" : ""
                }`}
              >
                {course?.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none transition-colors duration-200"
              >
                {showFullDescription ? "Show less" : "Read more"}
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600 font-medium">Instructor: </span>
              <a href="#" className="text-blue-600 hover:underline font-medium">
                {course?.instructor}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">
                  Start Date:{" "}
                  <span className="font-medium">{course?.startDate}</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">
                  Schedule:{" "}
                  <span className="font-medium">{course?.schedule}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {course?.language}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {course?.category}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {course?.level}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Enrollment Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="max-w-xs w-full">
            <div className="mb-3">
              {course?.discountedPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {formatPrice(course.discountedPrice)}
                  </span>
                  <span className="text-gray-500 line-through">
                    {formatPrice(course.price)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                    {Math.round(
                      ((course.price - course.discountedPrice) / course.price) *
                        100
                    )}
                    % off
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  {course?.price ? formatPrice(course.price) : "Free"}
                </span>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold mb-2 hover:bg-blue-700 transition-colors duration-200 shadow-md">
              Enroll Now
            </button>
          </div>
          {course?.enrollmentCount > 0 && (
            <div className="mt-4 flex items-center bg-blue-50 px-4 py-2 rounded-lg">
              <span className="font-bold text-blue-700">
                {course?.enrollmentCount}
              </span>
              <span className="text-blue-600"> students already enrolled</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="border-r border-gray-200 md:border-r-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-xl text-blue-600">
                {course?.rating || 0}
              </span>
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-600 font-medium">
                ({course?.reviewsCount || 0} reviews)
              </span>
            </div>
          </div>
          <div className="border-r border-gray-200 md:border-r-2">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{course?.level}</h3>
              <Info className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm">Recommended experience</p>
          </div>
          <div className="border-r border-gray-200 md:border-r-2">
            <h3 className="font-bold text-lg mb-2">
              {course?.numCourses} Courses
            </h3>
            <p className="text-gray-600 text-sm">
              {course?.paceDescription} pace
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{course?.schedulePace}</h3>
            <p className="text-gray-600 text-sm">Estimated effort</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 bg-white border-b mb-6 z-10 py-2 px-2 rounded-t-lg shadow-sm">
        <nav className="flex gap-8 overflow-x-auto">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`pb-4 px-3 flex items-center gap-1 whitespace-nowrap transition-colors duration-200 ${
                activeSection === id
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
          {course?.about?.title || "About This Course"}
        </h2>
        <div className="text-gray-700 mb-6 whitespace-pre-line leading-relaxed">
          {course?.about?.content}
        </div>
        {course?.about?.skills && course.about.skills.length > 0 && (
          <>
            <h3 className="font-bold mb-3 text-lg">Skills you will gain:</h3>
            <div className="flex flex-wrap gap-2">
              {course.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Outcomes Section */}
      <div
        id="outcomes"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-green-500 pl-3">
          {course?.outcomes?.title || "Career Outcomes"}
        </h2>
        {course?.outcomes?.items && course.outcomes.items.length > 0 && (
          <ul className="space-y-4">
            {course.outcomes.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Courses Section */}
      <div
        id="courses"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
          Course Curriculum
        </h2>
        <div className="space-y-4">
          {course?.courses && course.courses.length > 0 ? (
            course.courses.map((courseItem, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {courseItem.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {courseItem.duration}
                </p>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {courseItem.description}
                </div>
              </div>
            ))
          ) : course?.curriculum && course.curriculum.length > 0 ? (
            course.curriculum.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {item.title}
                </h3>
                {item.duration > 0 && (
                  <p className="text-sm text-gray-600 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {`${Math.floor(item.duration / 60)}h ${
                      item.duration % 60
                    }m`}
                  </p>
                )}
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 italic">
              No curriculum information available
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div
        id="reviews"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-yellow-500 pl-3">
          Student Reviews
        </h2>
        <CourseReviews
          courseReviews={reviews}
          onSubmitReview={handleSubmit}
          userId={userId}
          loading={loading}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
        />
      </div>

      {/* Testimonials Section */}
      {course?.testimonials && course.testimonials.length > 0 ? (
        <div
          id="testimonials"
          className="bg-white rounded-lg shadow-md p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-indigo-500 pl-3">
            What learners are saying
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <p className="text-gray-700 mb-4 italic leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          id="testimonials"
          className="bg-white rounded-lg shadow-md p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-indigo-500 pl-3">
            What learners are saying
          </h2>
          <p className="text-gray-600 italic">No testimonials available yet.</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
