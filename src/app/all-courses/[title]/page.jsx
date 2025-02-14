"use client";
import React, { useEffect, useState } from "react";
import { Star, Info, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { baseURL } from "@/app/baseURL";
import axios from "axios";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  // Hardcoded fallback data
  const courseData = {
    title: "Child Therapy",
    description:
      "Child therapy, also known as counseling for kids, helps children understand and manage challenges that affect their mental health. Child therapists are trained to work with children and teens to help them break down problems and find solutions. ",
    instructor: "Dr Sougata",
    enrollmentCount: "6,781",
    rating: 4.1,
    reviews: 228,
    duration: "3 months",
    paceDescription: "at 15 hours a week",
    level: "Beginner level",
    schedulePace: "Learn at your own pace",
    startDate: "Feb 10",
    numCourses: 8,
    schedule: "Flexible Schedule",
    about: {
      title: "About this Professional Course",
      content:
        "Learn the essential skills and techniques for effective child therapy through hands-on practice and expert guidance. This comprehensive course covers fundamental principles of child psychology and practical therapeutic approaches.",
      skills: [
        "Child Psychology",
        "Play Therapy",
        "Behavioral Assessment",
        "Family Counseling",
        "Therapeutic Techniques",
      ],
    },
    outcomes: {
      title: "What you'll learn",
      items: [
        "Understand child development and psychology",
        "Master therapeutic techniques for children",
        "Develop assessment and intervention skills",
        "Learn to work with families and caregivers",
      ],
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/get-courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Combine API data with fallback data, prioritizing API data
  const displayData = course
    ? {
        ...courseData,
        ...course,
        // Format duration from minutes to readable format
        duration: course.duration
          ? `${Math.floor(course.duration / 60)}h ${course.duration % 60}m`
          : courseData.duration,
        // Use reviewsCount from API
        reviews: course.reviewsCount,
        // Keep fallback content if API data is empty
        about: {
          ...courseData.about,
          skills:
            course.about.skills.length > 0
              ? course.about.skills
              : courseData.about.skills,
        },
        outcomes: {
          ...courseData.outcomes,
          items:
            course.outcomes.items.length > 0
              ? course.outcomes.items
              : courseData.outcomes.items,
        },
        // Use curriculum as courses if courses array is empty
        courses:
          course.courses.length > 0
            ? course.courses
            : course.curriculum.map((item) => ({
                title: item.title,
                duration: `${Math.floor(item.duration / 60)}h ${
                  item.duration % 60
                }m`,
                description: item.description,
              })),
        testimonials:
          course.testimonials.length > 0
            ? course.testimonials
            : courseData.testimonials,
      }
    : courseData;

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
            src={displayData?.thumbnailUrl || "/childhover.jpg"}
            alt={displayData?.title}
            className="h-48 w-48 rounded-full mb-6 shadow-xl object-cover"
          />
          <h1 className="text-3xl font-bold p-16">{displayData?.title}</h1>
        </div>
        <p className="text-gray-700 mb-6 max-w-3xl">
          {displayData?.description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-600">Instructor: </span>
          <a href="#" className="text-blue-600 hover:underline">
            {displayData?.instructor}
          </a>
        </div>
        <div className="max-w-xs">
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded font-semibold mb-2 hover:bg-blue-700">
            {displayData?.price
              ? `Enroll for ₹${
                  displayData?.discountedPrice || displayData?.price
                }`
              : "Enroll for Free"}
          </button>
        </div>
        {displayData?.enrollmentCount > 0 && (
          <div className="mt-4">
            <span className="font-bold">{displayData?.enrollmentCount}</span>
            <span className="text-gray-600"> already enrolled</span>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-xl border border-spacing-1 border-slate-400 p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-r-2 border-x-slate-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">{displayData?.rating}</span>
              <Star className="w-5 h-5 text-blue-600 fill-current" />
              <span className="text-gray-600">
                ({displayData?.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="border-r-2 border-x-slate-400">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{displayData?.level}</h3>
              <Info className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm">Recommended experience</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">{displayData?.duration}</h3>
            <p className="text-gray-600 text-sm">Self-paced learning</p>
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
        <h2 className="text-xl font-bold mb-4">{displayData?.about?.title}</h2>
        <p className="text-gray-700 mb-4">{displayData?.about?.content}</p>
        <h3 className="font-bold mb-2">Skills you will gain:</h3>
        <div className="flex flex-wrap gap-2">
          {displayData?.about.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div id="outcomes" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {displayData?.outcomes?.title}
        </h2>
        <ul className="space-y-3">
          {displayData?.outcomes.items.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div id="courses" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
        <div className="space-y-4">
          {displayData?.courses.map((course, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.duration}</p>
              <p className="text-gray-700">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
      {displayData?.testimonials?.length > 0 && (
        <div id="testimonials" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">What learners are saying</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {displayData?.testimonials.map((testimonial, index) => (
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
