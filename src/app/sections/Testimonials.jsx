"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dot } from "lucide-react";
import { baseURL } from "../baseURL";

const StyledTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-testimonials`);
        if (response?.data?.length > 0) {
          setTestimonials(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [isHovered]);

  if (testimonials.length === 0) return null;

  return (
    <div className="bg-[#2F4F4F] min-h-[400px] relative overflow-hidden mb-20">
      <div className="absolute w-full h-[100px] bottom-0 bg-[#F4D03F] transform -skew-y-3"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative">
        <h1 className="text-4xl text-center mb-10 text-white">
          Testimonials
          <div className="h-1 w-24 bg-[#F4D03F] mx-auto mt-2"></div>
        </h1>

        <div
          className="flex items-center justify-between"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-2/3">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="text-white">
                        <div className="flex items-center gap-4 mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xl font-semibold">
                              {testimonial.name}
                            </div>
                            <div className="text-[#F4D03F]">
                              {testimonial.productType}
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Dot className="w-6 h-6 text-[#F4D03F]" />
                          {testimonial.title}
                        </h3>
                        <div className="text-2xl font-light leading-relaxed">
                          {testimonial.review}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index ? "bg-[#F4D03F]" : "bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="w-1/3 flex justify-end">
            <img
              src="https://img.freepik.com/free-vector/enthusiastic-concept-illustration_114360-3478.jpg?t=st=1738038382~exp=1738041982~hmac=99e9dbc5f18ed07c445d1b78e18ec238ae1b9300f16961901f1a38b45d199041&w=740"
              alt="Help illustration"
              className="max-w-[300px] object-contain"
            />
          </div>
        </div>

        <button className="mt-8 px-8 py-3 bg-[#F4D03F] text-[#2F4F4F] rounded-full hover:bg-[#E4C03F] transition-colors font-medium">
          More Stories
        </button>
      </div>
    </div>
  );
};

export default StyledTestimonial;
