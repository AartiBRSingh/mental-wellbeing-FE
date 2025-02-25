"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const DecorativeShapes = () => (
  <div>
    <svg
      className="absolute top-10 left-4 sm:left-10 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 transform"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M50 90C50 90 85 65 85 40C85 20 70 10 50 10C30 10 15 20 15 40C15 65 50 90 50 90Z"
        fill="#FF844B"
        opacity="0.2"
      />
    </svg>
    {/* Add your PNG image here */}
    <Image
      src="/sunflower21.png"
      alt="Decorative image"
      width={200}
      height={200}
      className="absolute top-[590px] rotate-12 right-6 sm:top-[210px] sm:right-20 z-0 opacity-100 w-[130px] sm:w-[200px] h-auto"
    />
    {/* <Image
      src="/hearttext.png" // Replace with your image path from the public folder
      alt="Decorative image"
      width={70} // Adjust size as needed
      height={70} // Adjust size as needed
      className="absolute rotate-12 top-[135px] right-8 sm:right-[1080px] z-0 opacity-100" // Adjust positioning and opacity as needed
    /> */}
  </div>
);

const Services = () => {
  // Hardcoded courses data
  const hardcodedCourses = [
    {
      _id: "course1",
      title: "Anxiety Management for Children",
      category: "Mental Health",
      language: "English",
      thumbnailUrl:
        "https://img.freepik.com/free-vector/hand-drawn-child-custody-illustration_23-2150790640.jpg?t=st=1740114026~exp=1740117626~hmac=d08936976f033e7c6452999b0b702d121b10c8379726414233ded5bea1789ae2&w=740",
      rating: 4.8,
      price: 2999,
      discountedPrice: 1499,
    },
    {
      _id: "course2",
      title: "Building Self-Esteem in Teenagers",
      category: "Personal Growth",
      language: "Hindi",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000",
      rating: 4.6,
      price: 3499,
      discountedPrice: 1999,
    },
    {
      _id: "course3",
      title: "Mindfulness for School Success",
      category: "Education",
      language: "English",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=2000",
      rating: 4.9,
      price: 2799,
      discountedPrice: 1299,
    },
  ];

  const [courses] = useState(hardcodedCourses);
  const [currentCourse, setCurrentCourse] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentCourse((prev) => (prev + 1) % courses.length);
    }, 5000);

    // Cleanup timeout on component unmount or when courses change
    return () => clearTimeout(timer);
  }, [currentCourse, courses.length]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 sm:h-4 w-3 sm:w-4 ${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs sm:text-sm text-[#6B584C]">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div
      className="w-full flex justify-center bg-[#003B29] relative px-4 sm:px-6 py-8 sm:py-12 md:py-0 xl:mt-0 mt-4"
      id="services"
    >
      <DecorativeShapes />
      <main className="flex flex-col md:flex-row md:h-[500px] justify-center items-center w-full max-w-7xl gap-6 sm:gap-8 md:gap-0">
        <section className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-8 text-center md:text-left">
          <div className="inline-block">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-700 text-white text-lg font-semibold">
              Professional Courses
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white">
            <span>We help you to </span>
            <br />
            <span className="text-[#FDD56A] relative">
              g
              <span className="relative">
                row confidence
                <svg
                  className="absolute w-full h-[10px] sm:h-[10px] sm:bottom-0 -bottom-2 left-0"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 -5, 100 5"
                    stroke="orange"
                    strokeWidth="4"
                    fill="transparent"
                  />
                </svg>
              </span>
            </span>
            <br />
            <span> at any age</span>
          </h1>

          <p className="text-white max-w-60  text-xs mb-10 sm:text-sm md:text-base xl:max-w-md mx-auto md:mx-0 px-4 sm:px-0">
            Enhance skills, boost career opportunities, and get
            industry-specific knowledge.
          </p>
        </section>

        <section className="flex-1 flex justify-center md:justify-end z-10 relative w-full md:w-auto  sm:mt-8 md:mt-0">
          {courses.length > 0 && (
            <div className="w-full max-w-[320px] h-[360px] sm:h-96 flex justify-center gap-3 sm:gap-4">
              <div className="flex flex-col justify-between my-2">
                {courses.map((_, index) => (
                  <div
                    className={`w-1.5 sm:w-1.5 h-24 sm:h-20 md:h-28 rounded-md cursor-pointer transition-colors duration-300 ${
                      index === currentCourse ? "bg-white" : "bg-[#336661]"
                    }`}
                    key={index}
                    onClick={() => setCurrentCourse(index)}
                  />
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-lg w-full sm:w-[320px]">
                <Link href={`/all-courses/${courses[currentCourse]?._id}`}>
                  <div className="relative">
                    <img
                      src={courses[currentCourse]?.thumbnailUrl}
                      alt={courses[currentCourse]?.title}
                      className="rounded-t-lg w-full h-48 sm:h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-[#228B22] text-white rounded-full text-xs sm:text-sm font-medium">
                      {courses[currentCourse]?.language}
                    </div>
                  </div>
                  <div className="p-4 sm:p-4">
                    <div className="mb-3 sm:mb-4">
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#F0E68C] text-[#8B4513] rounded-full text-xs sm:text-sm font-semibold">
                        {courses[currentCourse]?.category}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#4A3427] mb-2 sm:mb-3 line-clamp-1 h-6 sm:h-7">
                      {courses[currentCourse]?.title}
                    </h2>
                    <div className="mb-3 sm:mb-4">
                      {renderStars(courses[currentCourse]?.rating || 5)}
                    </div>
                    <div className="flex items-center justify-between border-t border-[#F5DEB3] pt-3 sm:pt-4">
                      <span className="text-lg sm:text-xl font-bold text-[#4A3427]">
                        ₹{courses[currentCourse]?.discountedPrice}
                      </span>
                      {courses[currentCourse]?.discountedPrice <
                        courses[currentCourse]?.price && (
                        <span className="text-xs sm:text-sm text-[#6B584C] line-through opacity-70">
                          ₹{courses[currentCourse]?.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </section>
        <div className="relative flex justify-center md:justify-start md:absolute md:left-[870px] md:bottom-6">
          <Link href="/all-courses">
            <button className="px-4 sm:px-6 py-2 sm:py-3 mt-2 sm:mt-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
              All Courses
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Services;
