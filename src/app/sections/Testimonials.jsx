"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-testimonials`);
        if (response?.data && response?.data?.length > 0) {
          // Example of adding bgColor to testimonials
          const testimonialWithColors = response.data
            .slice(0, 5)
            .map((testimonial, index) => ({
              ...testimonial,
              bgColor:
                [
                  "bg-red-100",
                  "bg-green-100",
                  "bg-blue-100",
                  "bg-yellow-100",
                  "bg-purple-100",
                ][index % 5] || "bg-slate-50",
            }));
          setTestimonials(testimonialWithColors);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = useCallback(() => {
    setDirection("right");
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection("left");
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  useEffect(() => {
    const intervalId = setInterval(nextTestimonial, 5000);
    return () => clearInterval(intervalId);
  }, [nextTestimonial]);

  if (testimonials.length === 0) return null;

  const {
    name,
    title,
    review,
    image,
    productType,
    bgColor = "bg-slate-50",
  } = testimonials[currentTestimonial];

  return (
    <div className="bg-white py-2 sm:py-2 md:py-4 overflow-hidden">
      <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className="relative w-full h-auto sm:h-80 md:h-96 overflow-hidden rounded-2xl shadow-md">
          {/* Testimonial Slide */}
          <div
            key={currentTestimonial}
            className={`
              absolute inset-0 rounded-2xl shadow-xl 
              p-4 sm:p-6 md:p-8 lg:p-12
              transition-all duration-700 ease-in-out
              ${bgColor}
              ${
                direction === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }
            `}
          >
            <div
              className="flex flex-col sm:flex-row items-center h-full sm:space-x-4 md:space-x-8 
                            max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto"
            >
              {/* Profile Image */}
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 
             lg:w-48 lg:h-48 
             mb-4 sm:mb-0 rounded-full overflow-hidden flex-shrink-0"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-3 md:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  &quot;{title}&quot;
                </h3>
                <p className="text-gray-600 max-w-[500px] italic text-sm sm:text-base md:text-lg">
                  &quot;{review}&quot;
                </p>
                <div className="text-xs sm:text-sm md:text-base">
                  <span className="font-bold text-gray-900">{name}</span>
                  <span className="text-gray-500 ml-2">{productType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentTestimonial ? "right" : "left");
                setCurrentTestimonial(index);
              }}
              className={`
                w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 
                ${
                  index === currentTestimonial
                    ? "bg-gray-800"
                    : "bg-gray-300 hover:bg-gray-500"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
