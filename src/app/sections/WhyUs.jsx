"use client";
import React, { useState } from "react";
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

const CircleImage = ({ index, defaultImage, hoverImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 480"
      className="w-full h-full transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <clipPath id={`circleClip-${index}`}>
          <circle cx="240" cy="240" r="240" />
        </clipPath>
      </defs>
      <circle cx="240" cy="240" r="240" fill="#CAFA90" />
      <image
        href={isHovered ? hoverImage : defaultImage}
        width="480"
        height="480"
        x="0"
        y="30"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#circleClip-${index})`}
      />
    </svg>
  );
};

const WhyUs = () => {
  const expertTypes = [
    {
      id: 1,
      title: "Individual Therapy",
      slug: "individual-therapy",
      defaultImage: "/indvtherapy.png",
      hoverImage: "/indvtherapyhover.png",
    },
    {
      id: 2,
      title: "Couples / Marriage Counseling",
      slug: "couples-marriage-counseling",
      defaultImage: "/coupletherapy.png",
      hoverImage: "/coupletherapyhover.png",
    },
    {
      id: 3,
      title: "Child & Teen Therapy",
      slug: "child-teen-therapy",
      defaultImage: "/child.png",
      hoverImage: "/childhover.jpg",
    },
    {
      id: 4,
      title: "Family Therapy",
      slug: "family-therapy",
      defaultImage: "/familytherapy.png",
      hoverImage: "/familytherapyhover.jpg",
    },
    {
      id: 5,
      title: "Psychiatry & Medication",
      slug: "psychiatry-medication",
      defaultImage: "/medication.png",
      hoverImage: "/medicationhover.jpg",
    },
  ];

  const underlineColors = [
    "#CAFA90",
    "#FF844C",
    "#CAFA90",
    "#FAD77B",
    "#CAFA90",
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="w-full mx-auto px-4">
        <div className="text-center relative">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#956144] text-sm font-semibold">
            PEACEFUL BEGINNING
          </span>
          <div className="flex gap-2 justify-center">
            <h1 className="text-4xl md:text-5xl font-semibold mt-6 mb-10">
              Our{" "}
              <span className="relative text-[#FDD56A]">
                Experts
                <TitleUnderline stroke="orange" />
              </span>
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {expertTypes.map((expert, index) => (
            <Link href={`/all-experts?userType=${expert.slug}`} key={index}>
              <div className="text-center flex flex-col items-center">
                <div className="w-36 h-36 mb-6 object-contain">
                  <CircleImage
                    index={index}
                    defaultImage={expert.defaultImage}
                    hoverImage={expert.hoverImage}
                  />
                </div>
                <div className="relative inline-block pb-4 mb-2">
                  <h3 className="text-lg font-semibold">{expert.title}</h3>
                  {/* <TitleUnderline stroke={underlineColors[index]} /> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <Link
            href={"/all-experts"}
            className="relative flex items-center justify-center w-full sm:w-auto gap-2 px-6 md:px-8 lg:mr-8 py-3 md:py-3 bg-blue-400 text-white rounded-full transition-all duration-300 hover:bg-blue-600 overflow-hidden"
          >
            View all <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
