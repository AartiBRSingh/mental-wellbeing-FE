"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const TitleUnderline = ({ stroke }) => (
  <svg
    className="absolute w-full h-[10px] bottom-0 left-0"
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
  >
    <path
      d="M0 5 Q 50 -5, 100 5"
      stroke={stroke}
      strokeWidth="4"
      fill="transparent"
    />
  </svg>
);

const getShapeSVG = (shape) => {
  switch (shape) {
    case "square":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="squareClip">
              <rect width="480" height="480" x="0" y="0" rx="80" ry="80" />
            </clipPath>
          </defs>
          <rect
            width="480"
            height="480"
            x="0"
            y="0"
            rx="80"
            ry="80"
            fill="#78E1FE"
          />
          <image
            href="/man.png"
            width="480"
            height="480"
            x="0"
            y="30"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#squareClip)"
          />
        </svg>
      );
    case "oval":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="ovalClip">
              <path d="M447.9 240c20.4-24.6 32.1-53.1 32.1-80 0-84.9-107.5-153.7-240-153.7S0 99.1 0 184c0 26.9 11.7 55.4 32.1 80C11.7 275.5 0 304 0 328c0 84.9 107.5 153.7 240 153.7s240-68.8 240-153.7c0-24-11.7-52.5-32.1-80Z" />
            </clipPath>
          </defs>
          <path
            d="M447.9 240c20.4-24.6 32.1-53.1 32.1-80 0-84.9-107.5-153.7-240-153.7S0 99.1 0 184c0 26.9 11.7 55.4 32.1 80C11.7 275.5 0 304 0 328c0 84.9 107.5 153.7 240 153.7s240-68.8 240-153.7c0-24-11.7-52.5-32.1-80Z"
            fill="#FF844C"
          />
          <image
            href="/woman.png"
            width="480"
            height="480"
            x="0"
            y="30"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#ovalClip)"
          />
        </svg>
      );
    case "circle":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="circleClip">
              <circle cx="240" cy="240" r="240" />
            </clipPath>
          </defs>
          <circle cx="240" cy="240" r="240" fill="#CAFA90" />
          <image
            href="/man.png"
            width="480"
            height="480"
            x="0"
            y="30"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#circleClip)"
          />
        </svg>
      );
    case "flower":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 59 55"
        >
          <defs>
            <clipPath id="flowerClip">
              <path d="M29.4 54.8c-2.3 0-4.1-4.7-6.3-5.2-2.3-.5-5.9 2.8-7.9 1.7-2-1.1-1.4-6-3.1-7.5-1.7-1.5-6.5-.4-7.8-2.3-1.2-1.9 1.8-5.8 1.1-8-.6-2.1-5.3-3.8-5.3-6.1s4.7-4 5.3-6.1c.7-2.2-2.4-6.1-1.1-8 1.2-1.9 6.1-.8 7.8-2.3 1.7-1.5 1-6.4 3.1-7.5 2-1 5.7 2.3 7.9 1.7C25.3 4.7 27 0 29.3 0c2.3 0 4.1 4.7 6.3 5.2 2.3.5 5.9-2.8 7.9-1.7 2 1.1 1.4 6 3.1 7.5 1.7 1.5 6.5.4 7.8 2.3 1.2 1.9-1.8 5.8-1.1 8 .6 2.1 5.3 3.8 5.3 6.1s-4.7 4-5.3 6.1c-.7 2.2 2.4 6.1 1.2 8-1.2 1.9-6.1.8-7.8 2.3-1.7 1.5-1 6.4-3.1 7.5-2 1-5.7-2.3-7.9-1.7-2.3.5-4 5.2-6.3 5.2Z" />
            </clipPath>

            <linearGradient
              id="blobGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF6347" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#blobGradient)"
            d="M29.4 54.8c-2.3 0-4.1-4.7-6.3-5.2-2.3-.5-5.9 2.8-7.9 1.7-2-1.1-1.4-6-3.1-7.5-1.7-1.5-6.5-.4-7.8-2.3-1.2-1.9 1.8-5.8 1.1-8-.6-2.1-5.3-3.8-5.3-6.1s4.7-4 5.3-6.1c.7-2.2-2.4-6.1-1.1-8 1.2-1.9 6.1-.8 7.8-2.3 1.7-1.5 1-6.4 3.1-7.5 2-1 5.7 2.3 7.9 1.7C25.3 4.7 27 0 29.3 0c2.3 0 4.1 4.7 6.3 5.2 2.3.5 5.9-2.8 7.9-1.7 2 1.1 1.4 6 3.1 7.5 1.7 1.5 6.5.4 7.8 2.3 1.2 1.9-1.8 5.8-1.1 8 .6 2.1 5.3 3.8 5.3 6.1s-4.7 4-5.3 6.1c-.7 2.2 2.4 6.1 1.2 8-1.2 1.9-6.1.8-7.8 2.3-1.7 1.5-1 6.4-3.1 7.5-2 1-5.7-2.3-7.9-1.7-2.3.5-4 5.2-6.3 5.2Z"
          />
          <image
            href="/man.png"
            width="56"
            height="52"
            x="2"
            y="2"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#flowerClip)"
          />
        </svg>
      );
    default:
      return null;
  }
};

const shapes = ["square", "oval", "circle", "flower"];
const underlineColors = ["#CAFA90", "#FF844C", "#CAFA90", "#FAD77B"];

const WhyUs = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-experts`);
        setExperts(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experts:", error);
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          Loading experts...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center relative">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#956144] text-sm font-semibold">
            PEACEFUL BEGINNING
          </span>
          <div className="flex gap-2 justify-center">
            <h1 className="text-4xl md:text-5xl font-semibold mt-10 mb-16">
              Our{" "}
              <span className="relative text-[#FDD56A]">
                Experts
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
            </h1>
            <Link
              href={"#"}
              className="font-semibold flex gap-2 underline items-center cursor-pointer"
            >
              View all <FaArrowRightLong />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <div
              key={expert._id}
              className="text-center flex flex-col items-center"
            >
              <div className="w-48 h-48 mb-6">
                {getShapeSVG(shapes[index % shapes.length])}
              </div>
              <div className="relative inline-block pb-4 mb-2">
                <h3 className="text-2xl font-semibold">{expert.name}</h3>
                <TitleUnderline
                  stroke={underlineColors[index % underlineColors.length]}
                />
              </div>
              <p className="text-gray-600 text-base px-4">{expert.userType}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
