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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-testimonials`);
        if (response?.data && response?.data?.length > 0) {
          // Create a longer array for seamless looping
          setTestimonials([
            ...response.data,
            ...response.data,
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
      if (isTransitioning) return;

      const scrollAmount = 300;
      const maxScroll = (testimonials.length * scrollAmount) / 5;

      setIsTransitioning(true);

      if (direction === "left") {
        setScrollPosition((prev) => {
          const newPosition = prev - scrollAmount;
          if (newPosition < scrollAmount) {
            // When near the start, jump to the fourth set of items
            setTimeout(() => {
              setIsTransitioning(false);
              setScrollPosition(maxScroll - 2 * scrollAmount);
            }, 500);
            return 0;
          }
          setTimeout(() => setIsTransitioning(false), 500);
          return newPosition;
        });
      } else {
        setScrollPosition((prev) => {
          const newPosition = prev + scrollAmount;
          if (newPosition >= maxScroll - scrollAmount) {
            // When near the end, jump to the second set of items
            setTimeout(() => {
              setIsTransitioning(false);
              setScrollPosition(2 * scrollAmount);
            }, 500);
            return maxScroll;
          }
          setTimeout(() => setIsTransitioning(false), 500);
          return newPosition;
        });
      }
    },
    [testimonials.length, isTransitioning]
  );

  useEffect(() => {
    let intervalId;
    if (!isHovered && testimonials.length > 0) {
      intervalId = setInterval(() => {
        handleScroll("right");
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, handleScroll, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className="bg-white py-10 overflow-hidden relative">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-[350px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-[350px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-[1000px] mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : "transition-none"
            }`}
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-[250px] px-2 flex-shrink-0">
                <div className="bg-slate-50 rounded-2xl shadow-xl p-4 h-full transition-transform">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center space-y-3">
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
