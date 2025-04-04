"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import {
  ChevronLeft,
  ChevronRight,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const TestimonialsSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [cardWidth, setCardWidth] = useState(300);
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expanded state for a testimonial
  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Keeping existing useEffects and handlers...
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
      } else {
        // Mobile view - ensure entire card is visible
        setVisibleItems(1);
        // Account for container padding, card padding and margins
        // 320px is the max-w-[320px] from the container
        const containerWidth = Math.min(width, 320);
        // Subtract padding (px-2 = 16px total) and card margins/padding
        setCardWidth(containerWidth - 24); // Adjusted to ensure full visibility
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
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isHovered, handleScroll, testimonials.length]);

  const renderProfileImage = (testimonial) => {
    if (testimonial.image) {
      return (
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.parentNode.classList.add("bg-orange-400");
            e.target.parentNode.innerHTML =
              '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>';
          }}
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full bg-orange-400 rounded-full">
          <User className="w-8 h-8 text-white" />
        </div>
      );
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="py-6 md:py-10 overflow-hidden ">
      {/* Added Happy Users heading */}
      <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-[#2D2D2D]">
          Happy
          <span className="text-[#956144] relative">
            <span className="relative ml-2">
              Users
              <svg
                className="absolute w-full h-[10px] -bottom-2 left-0"
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
        </h2>
      </div>

      {/* <button
        onClick={() => handleScroll("left")}
        className="absolute left-2 sm:left-4 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-2 sm:right-4 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button> */}

      <div className="max-w-[320px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1220px] mx-auto px-2 sm:px-4">
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
                  <div className="bg-slate-100 rounded-3xl p-4 sm:p-10 h-full relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer shadow-md">
                    <div className="flex flex-col space-y-4 sm:space-y-8">
                      <div className="flex items-center space-x-4 bg-white rounded-full">
                        <div className="w-12 h-12 bg-orange-400 rounded-full overflow-hidden">
                          {renderProfileImage(testimonial)}
                        </div>
                        <div>
                          <p className="font-semibold">
                            &quot;{testimonial.name}&quot;
                          </p>
                          <p className="text-sm text-gray-600">
                            {testimonial.productType}
                          </p>
                        </div>
                      </div>
                      <h3
                        className="text-sm sm:text-md font-semibold text-gray-800 
                          transition-all duration-300 hover:text-black mb-3 line-clamp-2"
                      >
                        {testimonial.title}
                      </h3>

                      <div className="text-gray-700 text-sm">
                        <p
                          className={expandedItems[index] ? "" : "line-clamp-4"}
                        >
                          {testimonial.review}
                        </p>
                        {testimonial.review.length > 100 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(index);
                            }}
                            className="text-orange-500 hover:text-orange-600 font-medium flex items-center mt-2 text-sm"
                          >
                            {expandedItems[index] ? (
                              <>
                                View Less <ChevronUp className="ml-1 w-4 h-4" />
                              </>
                            ) : (
                              <>
                                View More{" "}
                                <ChevronDown className="ml-1 w-4 h-4" />
                              </>
                            )}
                          </button>
                        )}
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
