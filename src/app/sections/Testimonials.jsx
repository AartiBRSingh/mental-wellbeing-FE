"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          if (newPosition < 0) {
            return (testimonials.length / 3) * scrollAmount;
          }
          return newPosition;
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
    <div className="bg-white py-4 overflow-hidden relative">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-9xl mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-[250px] px-2 flex-shrink-0">
                <div className="bg-slate-100 rounded-lg shadow-md p-4 h-full transition-transform hover:scale-105">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        &quot;{testimonial.title}&quot;
                      </h3>
                      <p className="text-gray-600 text-xs italic line-clamp-3 max-w-44">
                        &quot;{testimonial.review}&quot;
                      </p>
                      <div className="text-xs">
                        <span className="font-bold text-gray-900">
                          {testimonial.name}
                        </span>
                        <span className="text-gray-500 ml-1">
                          {testimonial.productType}
                        </span>
                      </div>
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
