"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";

export const serviceCardData = [
  {
    redirectTo: "/questionnaires?userType=self",
    imgUrl:
      "https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Self Assessment",
    desc: "Get to know yourself better with this program",
    productType: "self",
  },
  {
    redirectTo: "/questionnaires?userType=employee",
    imgUrl:
      "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Employee Well-being",
    desc: "Curated programs for Corporate Employees",
    productType: "employee",
  },
  {
    redirectTo: "/questionnaires?userType=student",
    imgUrl:
      "https://images.unsplash.com/photo-1608453162650-cba45689c284?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Student Well-being",
    desc: "Reach out to program from college to elementary school students",
    productType: "student",
  },
];

const Testimonials = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [matchedService, setMatchedService] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (testimonial?.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonial?.length);
    }
  }, [testimonial]);

  useEffect(() => {
    let intervalId;

    if (!isHovered && testimonial?.length > 0) {
      intervalId = setInterval(nextTestimonial, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, nextTestimonial, testimonial.length]);

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonial?.length);
    } else {
      setCurrentTestimonial((prev) =>
        prev === 0 ? testimonial?.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-testimonials`);
        if (response?.data && response?.data?.length > 0) {
          const data = response?.data?.slice(0, 3);
          setTestimonial(data);
          const service = serviceCardData.find(
            (service) =>
              service.productType === data[currentTestimonial].productType
          );
          setMatchedService(service);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [currentTestimonial]);

  return (
    <div className="bg-white flex justify-end pb-20">
      <div className="flex gap-20 items-center w-2/3 bg-cream rounded-2xl">
        <div className="bg-[#49382E] rounded-3xl shadow-lg w-[350px] p-10">
          <div className="mb-4">
            <img
              src={matchedService?.imgUrl}
              alt={matchedService?.title}
              className="rounded-t-lg h-60 w-full object-cover"
            />
          </div>
          <div className="px-4">
            <div className="flex justify-between items-center border-b border-t border-t-[#956144] border-b-[#956144] mb-2 text-white">
              <h2 className="text-lg font-semibold">{matchedService?.title}</h2>
              <h2 className="text-xl font-semibold">|</h2>
              <a
                href={matchedService?.redirectTo}
                className="inline-flex items-center px-6 my-1 py-2 bg-yellow-400 text-green-900 font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300"
              >
                <span>→</span>
              </a>
            </div>
            <p className="mb-4 text-sm text-white">{matchedService?.desc}</p>
          </div>
        </div>
        <div className="w-[600px] flex">
          <div>
            <div className="relative mb-4">
              <h2 className="text-3xl font-serif font-semibold">
                &quot; {testimonial[currentTestimonial]?.title} &quot;
              </h2>
            </div>
            <div className="w-16 h-16 bg-[#FF725E] rounded-full flex items-center justify-center mb-4">
              <img
                src={testimonial[currentTestimonial]?.image}
                alt={testimonial[currentTestimonial]?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {testimonial[currentTestimonial]?.name},
                  </span>
                  <span className="text-gray-500 text-sm">
                    {testimonial[currentTestimonial]?.productType}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 font-semibold">
                &quot; {testimonial[currentTestimonial]?.review} &quot;
              </p>
            </div>
          </div>
          <div
            className="h-72"
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-col justify-between my-2 gap-2">
              {testimonial.map((item, index) => (
                <div
                  className={`w-1.5 h-24 rounded-md cursor-pointer transition-colors duration-300 ${
                    index === currentTestimonial
                      ? "bg-[#49382E]"
                      : "bg-[#D9CFC8]"
                  }`}
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
