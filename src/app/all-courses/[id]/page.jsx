"use client";
import React, { useState } from "react";
import { Star, Info, ChevronDown } from "lucide-react";

const CourseDetailPage = () => {
  const [activeSection, setActiveSection] = useState("about");

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
    courses: [
      {
        title: "Fundamentals of Child Psychology",
        duration: "2 weeks",
        description: "Understanding child development and behavior",
      },
      {
        title: "Play Therapy Techniques",
        duration: "3 weeks",
        description: "Learn effective therapeutic play methods",
      },
      {
        title: "Family Systems Approach",
        duration: "3 weeks",
        description: "Working with families in child therapy",
      },
    ],
    testimonials: [
      {
        name: "Dr. Emily Parker",
        role: "Child Psychologist",
        content:
          "This course provided invaluable practical knowledge for working with children.",
      },
      {
        name: "Mark Thompson",
        role: "Family Therapist",
        content:
          "Excellent curriculum that bridges theory and practice in child therapy.",
      },
    ],
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white m-10 rounded-2xl shadow-xl">
      {/* Header Section */}
      <div className="mb-8 pl-6">
        <div className="flex">
          <img
            src="/childhover.jpg"
            alt="Adobe"
            className="h-48 w-48 rounded-full mb-6 shadow-xl"
          />
          <h1 className="text-3xl font-bold p-16">{courseData.title}</h1>
        </div>
        <p className="text-gray-700 mb-6 max-w-3xl">{courseData.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-600">Instructor: </span>
          <a href="#" className="text-blue-600 hover:underline">
            {courseData.instructor}
          </a>
        </div>

        <div className="max-w-xs">
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded font-semibold mb-2 hover:bg-blue-700">
            Enroll for Free
          </button>
          <p className="text-sm text-center text-gray-600">
            Starts {courseData.startDate}
          </p>
        </div>

        <div className="mt-4">
          <span className="font-bold">{courseData.enrollmentCount}</span>
          <span className="text-gray-600"> already enrolled</span>
        </div>
      </div>

      {/* Course Details Card */}
      <div className="bg-white rounded-xl shadow-xl border border-spacing-1 border-slate-400 p-6 mb-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="border-r-2 border-x-slate-400">
            <h3 className="font-bold text-lg mb-2">
              {courseData.numCourses} course series
            </h3>
            <p className="text-gray-600 text-sm">
              Earn a career credential that demonstrates your expertise
            </p>
          </div>

          <div className="border-r-2 border-x-slate-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">{courseData.rating}</span>
              <Star className="w-5 h-5 text-blue-600 fill-current" />
              <span className="text-gray-600">
                ({courseData.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="border-r-2 border-x-slate-400">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{courseData.level}</h3>
              <Info className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm">Recommended experience</p>
          </div>

          <div className="border-r-2 border-x-slate-400">
            <h3 className="font-bold text-lg mb-2">{courseData.duration}</h3>
            <p className="text-gray-600 text-sm">
              {courseData.paceDescription}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">{courseData.schedule}</h3>
            <p className="text-gray-600 text-sm">{courseData.schedulePace}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Content Sections */}
      {/* About Section */}
      <div id="about" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{courseData.about.title}</h2>
        <p className="text-gray-700 mb-4">{courseData.about.content}</p>
        <h3 className="font-bold mb-2">Skills you will gain:</h3>
        <div className="flex flex-wrap gap-2">
          {courseData.about.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Outcomes Section */}
      <div id="outcomes" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{courseData.outcomes.title}</h2>
        <ul className="space-y-3">
          {courseData.outcomes.items.map((item) => (
            <li key={item} className="flex items-start">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Courses Section */}
      <div id="courses" className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Courses in this Program</h2>
        <div className="space-y-4">
          {courseData.courses.map((course, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.duration}</p>
              <p className="text-gray-700">{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">What learners are saying</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {courseData.testimonials.map((testimonial, index) => (
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
    </div>
  );
};

export default CourseDetailPage;
