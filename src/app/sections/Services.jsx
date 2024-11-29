"use client";
import React, { useState, useEffect, useCallback } from "react";

export const DecorativeShapes = () => (
  <>
    <svg
      className="absolute top-10 left-10 w-24 h-24 transform rotate-[-15deg]"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M50 90C50 90 85 65 85 40C85 20 70 10 50 10C30 10 15 20 15 40C15 65 50 90 50 90Z"
        fill="#FF844B"
        opacity="0.2"
      />
    </svg>
    <svg
      className="absolute top-0 right-20 w-20 h-20 transform rotate-45"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M20 80C20 80 50 80 80 50C95 35 95 20 80 20C50 20 20 80 20 80Z"
        fill="#9FDE6C"
        opacity="0.2"
      />
    </svg>
    <svg
      className="absolute bottom-10 left-20 w-32 h-32"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M10 50C30 30 40 60 60 40C80 20 90 50 90 30"
        stroke="#9FDE6C"
        strokeWidth="4"
        opacity="0.2"
        fill="none"
      />
    </svg>
    <svg
      className="absolute top-1/2 right-10 w-16 h-16"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M20 80C20 80 50 80 80 20C90 10 80 0 70 0C40 0 20 80 20 80Z"
        fill="#9FDE6C"
        opacity="0.15"
      />
    </svg>
    <svg
      className="absolute bottom-20 right-40 w-20 h-20"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M30 60C30 60 45 45 45 35C45 25 35 25 30 25C25 25 15 25 15 35C15 45 30 60 30 60Z"
        fill="#FF844B"
        opacity="0.15"
      />
      <path
        d="M60 40C60 40 75 25 75 15C75 5 65 5 60 5C55 5 45 5 45 15C45 25 60 40 60 40Z"
        fill="#FF844B"
        opacity="0.1"
      />
    </svg>
  </>
);

export const serviceCardData = [
  {
    redirectTo: "/questionnaires?userType=self",
    imgUrl:
      "https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Self Assessment",
    desc: "Get to know yourself better with this program",
  },
  {
    redirectTo: "/questionnaires?userType=employee",
    imgUrl:
      "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Employee Well-being",
    desc: "Curated programs for Corporate Employees",
  },
  {
    redirectTo: "/questionnaires?userType=student",
    imgUrl:
      "https://images.unsplash.com/photo-1608453162650-cba45689c284?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Student Well-being",
    desc: "Reach out to program from college to elementary school students",
  },
];

const Services = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextService = useCallback(() => {
    setCurrentService((prev) => (prev + 1) % serviceCardData.length);
  }, []);

  useEffect(() => {
    let intervalId;

    if (!isHovered) {
      intervalId = setInterval(nextService, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, nextService]);
  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      setCurrentService((prev) => (prev + 1) % serviceCardData.length);
    } else {
      setCurrentService((prev) =>
        prev === 0 ? serviceCardData.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="w-full flex justify-center bg-[#003B29] mt-10 relative">
      <DecorativeShapes />
      <main className="flex md:h-[500px] justify-center items-center w-[60vw]">
        <section className="flex-1 flex flex-col gap-8">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
              CARING IS ALWAYS FREE{" "}
            </span>
          </div>
          <h1 className="lg:text-6xl text-xl text-white">
            <span>We help you to </span>
            <br />
            <span className="text-[#FDD56A] relative">
              g
              <span className="relative">
                row confidence
                <svg
                  className="absolute w-full h-[10px] bottom-0 left-0"
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

          <p className="text-white max-w-md">
            To live your life to the fullest, we&apos;re continuing to find ways
            to prevent mental health problems.
          </p>
        </section>
        <section className="flex-1 flex justify-end z-10 relative">
          <svg
            className="absolute -top-10 -left-10 w-20 h-20 transform rotate-[-15deg]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 90C50 90 85 65 85 40C85 20 70 10 50 10C30 10 15 20 15 40C15 65 50 90 50 90Z"
              fill="rgb(159,222,108)"
              opacity="0.15"
            />
          </svg>
          <svg
            className="absolute -bottom-8 -left-8 w-24 h-24"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M10 50C30 30 40 60 60 40C80 20 90 50 90 30"
              stroke="#FDD56A"
              strokeWidth="4"
              opacity="0.2"
              fill="none"
            />
          </svg>
          <div
            className="w-[320px] h-96 flex justify-center gap-4"
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-col justify-between my-2">
              {serviceCardData.map((item, index) => (
                <div
                  className={`w-1.5 h-28 rounded-md cursor-pointer transition-colors duration-300 ${
                    index === currentService ? "bg-white" : "bg-[#336661]"
                  }`}
                  key={index}
                  onClick={() => setCurrentService(index)}
                ></div>
              ))}
            </div>
            <div className="bg-cream rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
              <div className="mb-4">
                <img
                  src={serviceCardData[currentService].imgUrl}
                  alt="Helping to Navigate"
                  className="rounded-t-lg h-60 w-full object-cover"
                />
              </div>
              <div className="px-4">
                <div className="flex justify-between items-center border-b border-t border-t-[#956144] border-b-[#956144] mb-2">
                  <h2 className="text-lg font-semibold">
                    {serviceCardData[currentService].title}
                  </h2>
                  <h2 className="text-xl font-semibold">|</h2>
                  <a
                    href={serviceCardData[currentService].redirectTo}
                    className="inline-flex items-center px-6 my-1 py-2 bg-yellow-400 text-green-900 font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300"
                  >
                    <span>→</span>
                  </a>
                </div>
                <p className="text-opacity-70 mb-4 text-sm">
                  {serviceCardData[currentService].desc}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
