"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const TestimonialsSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-testimonials`);
        if (response?.data && response?.data?.length > 0) {
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

    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleItems(4);
        setCardWidth(300);
      } else if (width >= 1024) {
        setVisibleItems(3);
        setCardWidth(280);
      } else if (width >= 768) {
        setVisibleItems(2);
        setCardWidth(260);
      } else if (width >= 640) {
        setVisibleItems(1);
        setCardWidth(280);
      } else {
        setVisibleItems(1);
        setCardWidth(240);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleScroll = useCallback(
    (direction) => {
      if (isTransitioning) return;

      const scrollAmount = cardWidth;
      const maxScroll = (testimonials.length * cardWidth) / 5;

      setIsTransitioning(true);

      if (direction === "left") {
        setScrollPosition((prev) => {
          const newPosition = prev - scrollAmount;
          if (newPosition < scrollAmount) {
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
    [testimonials.length, isTransitioning, cardWidth]
  );

  useEffect(() => {
    let intervalId;
    if (!isHovered && testimonials.length > 0) {
      intervalId = setInterval(() => {
        handleScroll("right");
      }, 4000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, handleScroll, testimonials.length]);

  const renderProfileImage = (testimonial) => {
    if (testimonial.image) {
      return (
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.parentNode.classList.add("bg-gray-800");
            e.target.parentNode.innerHTML =
              '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>';
          }}
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-800">
          <User className="w-8 h-8 text-white" />
        </div>
      );
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="bg-transparent py-6 md:py-10 overflow-hidden relative">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-2 sm:left-4 lg:left-8 xl:left-16 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-2 sm:right-4 lg:right-8 xl:right-16 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <div className="max-w-[320px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[940px] mx-auto px-2 sm:px-4">
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
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <div className="mx-1 sm:mx-2 md:mx-3 p-2 h-full">
                  <div
                    className="bg-white border border-black shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 h-full 
                    transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl 
                    hover:bg-gray-50 group"
                  >
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5">
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden 
                        transition-transform duration-300 ease-in-out 
                        group-hover:scale-110 group-hover:shadow-md"
                      >
                        {renderProfileImage(testimonial)}
                      </div>

                      <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
                        <h3
                          className="text-sm sm:text-md font-semibold text-gray-800 
                          transition-all duration-300 group-hover:text-black"
                        >
                          &quot;{testimonial.title}&quot;
                        </h3>
                        <p
                          className="text-gray-600 text-xs italic line-clamp-2 max-w-full mx-auto
                          transition-all duration-300 group-hover:text-gray-700"
                        >
                          &quot;{testimonial.review}&quot;
                        </p>
                        <div className="text-xs transition-all duration-300">
                          <span className="font-bold text-gray-900 group-hover:text-black">
                            {testimonial.name}
                          </span>
                          <span className="text-gray-500 ml-1 group-hover:text-gray-600">
                            {testimonial.productType}
                          </span>
                        </div>
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
