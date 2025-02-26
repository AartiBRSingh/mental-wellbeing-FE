"use client";
import React, { useEffect, useState } from "react";
import { Star, Info, ChevronDown } from "lucide-react";
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
    { id: "testimonials", label: "Testimonials" },
  ];

  console.log(userId, "raju");

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white m-10 rounded-2xl shadow-xl">
        <div className="animate-pulse">
          <div className="h-48 w-48 bg-gray-200 rounded-full mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white m-10 rounded-2xl shadow-xl">
      <div className="mb-8 pl-6">
        <div className="flex">
          <img
            src={course?.thumbnailUrl || "/childhover.jpg"}
            alt={course?.title}
            className="h-48 w-48 rounded-full mb-6 shadow-xl object-cover"
          />
          <h1 className="text-3xl font-bold p-16">{course?.title}</h1>
        </div>
        <p className="text-gray-700 mb-6 max-w-3xl">{course?.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-600">Instructor: </span>
          <a href="#" className="text-blue-600 hover:underline">
            {course?.instructor}
          </a>
        </div>
        <div className="max-w-xs">
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded font-semibold mb-2 hover:bg-blue-700">
            {course?.price
              ? `Enroll for ₹${course?.discountedPrice || course?.price}`
              : "Enroll for Free"}
          </button>
        </div>
        {course?.enrollmentCount > 0 && (
          <div className="mt-4">
            <span className="font-bold">{course?.enrollmentCount}</span>
            <span className="text-gray-600"> already enrolled</span>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-xl border border-spacing-1 border-slate-400 p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-r-2 border-x-slate-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">{course?.rating}</span>
              <Star className="w-5 h-5 text-blue-600 fill-current" />
              <span className="text-gray-600">
                ({course?.reviewsCount} reviews)
              </span>
            </div>
          </div>
          <div className="border-r-2 border-x-slate-400">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{course?.level}</h3>
              <Info className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm">Recommended experience</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">
              {course?.duration
                ? `${Math.floor(course.duration / 60)}h ${
                    course.duration % 60
                  }m`
                : course?.duration}
            </h3>
            <p className="text-gray-600 text-sm">{course?.schedulePace}</p>
          </div>
        </div>
      </div>
      <div className="sticky top-0 bg-white border-b mb-6 z-10">
        <nav className="flex gap-8">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`pb-4 px-1 flex items-center gap-1 ${
                activeSection === id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div id="about" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{course?.about?.title}</h2>
        <p className="text-gray-700 mb-4">{course?.about?.content}</p>
        {course?.about?.skills && course.about.skills.length > 0 && (
          <>
            <h3 className="font-bold mb-2">Skills you will gain:</h3>
            <div className="flex flex-wrap gap-2">
              {course.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div id="outcomes" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{course?.outcomes?.title}</h2>
        {course?.outcomes?.items && course.outcomes.items.length > 0 && (
          <ul className="space-y-3">
            {course.outcomes.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="courses" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
        <div className="space-y-4">
          {course?.curriculum && course.curriculum.length > 0 ? (
            course.curriculum.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{`${Math.floor(
                  item.duration / 60
                )}h ${item.duration % 60}m`}</p>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))
          ) : course?.courses && course.courses.length > 0 ? (
            course.courses.map((course, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.duration}</p>
                <p className="text-gray-700">{course.description}</p>
              </div>
            ))
          ) : (
            <p>No curriculum information available</p>
          )}
        </div>
      </div>
      <CourseReviews
        courseReviews={course?.reviews || []}
        onSubmitReview={handleSubmit}
        userId={userId}
        loading={loading}
      />
      {course?.testimonials && course.testimonials.length > 0 && (
        <div id="testimonials" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">What learners are saying</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">{testimonial.content}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
