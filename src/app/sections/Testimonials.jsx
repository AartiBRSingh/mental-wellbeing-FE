"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { ChevronLeft, ChevronRight, Dot, Star } from "lucide-react";

const TestimonialsSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-testimonials`);
        if (response?.data && response?.data?.length > 0) {
          setTestimonials([
            ...response.data,
            ...response.data,
            ...response.data,
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleScroll = useCallback(
    (direction) => {
      const scrollAmount = 250;
      if (direction === "left") {
        setScrollPosition((prev) => {
          const newPosition = prev - scrollAmount;
          // If at start, jump to end
        });
      } else {
        setScrollPosition((prev) => {
          const newPosition = prev + scrollAmount;
          // If at end, jump to start
          if (newPosition >= (testimonials.length * scrollAmount) / 2) {
            return 0;
          }
          return newPosition;
        });
      }
    },
    [testimonials.length]
  );

  // Auto scroll effect
  useEffect(() => {
    let intervalId;
    if (!isHovered) {
      intervalId = setInterval(() => {
        handleScroll("right");
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, handleScroll]);

  if (testimonials.length === 0) return null;

  return (
    <div className="bg-white py-4 overflow-hidden relative my-4">
      <h1 className="text-[#956144] relative text-center mb-5 text-4xl">
        T
        <span className="relative text-black">
          estimonials
          <svg
            className="absolute w-full h-[10px] -bottom-1 left-0"
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
        <button
          onClick={() => handleScroll("left")}
          className=" p-2 rounded-full bg-white shadow-lg hover:bg-slate-300 transition-colors ml-4"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className=" p-2 ml-2 rounded-full bg-white shadow-lg hover:bg-slate-300 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </h1>

      <div className="max-w-[1700px] mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out gap-2"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-[350px] px-2 flex-shrink-0 p-3">
                <div
                  className=" rounded-lg shadow-md p-4 h-full transition-transform hover:scale-105
                "
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/testimonialbg.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex">
                      <div className="w-14 h-14 rounded-full overflow-hidden ml-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="text-lg p-2 mt-3">
                        <span className="font-semibold text-gray-900">
                          {testimonial.name}
                        </span>

                        <span className="text-gray-500 ml-1">
                          {testimonial.productType}
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <h3 className="text-md font-medium text-black line-clamp-2 mb-2 ml-0 flex">
                        <Dot />
                        {testimonial.title}
                      </h3>
                      <p className="text-gray-600 text-xs italic line-clamp-4 max-w-64">
                        &quot;{testimonial.review}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
