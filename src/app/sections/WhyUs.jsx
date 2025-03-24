"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

const TitleUnderline = ({ stroke }) => (
  <svg
    className="absolute w-full h-[10px] -bottom-1 left-0"
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

const CircleImage = ({ imageUrl }) => {
  return (
    <div className="rounded-3xl overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 380 380"
        className="w-full h-full transition-all duration-300 hover:scale-105"
      >
        {/* <defs>
          <clipPath id="circleClip">
            <circle cx="240" cy="240" r="240" />
          </clipPath>
        </defs> */}
        <image
          href={imageUrl}
          width="380"
          height="380"
          x="0"
          y="0"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#circleClip)"
        />
      </svg>
    </div>
  );
};

const WhyUs = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const expertTypes = [
    {
      id: 1,
      title: "Individual Therapy",
      slug: "Individual+Therapy",
      imageUrl: "/individual.jpg",
    },
    {
      id: 2,
      title: "Couples Counseling",
      slug: "Couples+%2F+Marriage+Counseling",
      imageUrl: "couple.jpg",
    },
    {
      id: 3,
      title: "Child & Teen Therapy",
      slug: "Child+%26+Teen+Therapy",
      imageUrl: "child.jpg",
    },
    {
      id: 4,
      title: "Family Therapy",
      slug: "Family+Therapy",
      imageUrl: "family2.jpg",
    },
    {
      id: 5,
      title: "Psychiatry & Medication",
      slug: "Psychiatry+%26+Medication",
      imageUrl: "medication.jpg",
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const ExpertCard = ({ expert, isMobile }) => (
    <Link href={`/all-experts?userType=${expert.slug}`}>
      <div
        className={`text-center flex flex-col items-center ${
          isMobile ? "min-w-[240px] px-4" : ""
        }`}
      >
        <div
          className={`${
            isMobile ? "w-48 h-48" : "w-32 h-32 md:w-44 md:h-44"
          } mb-4 md:mb-6 rounded-xl overflow-hidden`}
        >
          <CircleImage imageUrl={expert.imageUrl} />
        </div>
        <div className="relative inline-block pb-4 mb-2">
          <h3
            className={`${
              isMobile ? "text-lg" : "text-sm md:text-lg"
            } font-semibold`}
          >
            {expert.title}
          </h3>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-16 relative">
      <div className="w-full mx-auto px-4">
        <div className="text-center relative">
          <span className="inline-flex items-center xl:px-4 xl:py-2 rounded-full border border-[#956144] xl:text-sm text-xs px-2 py-1 font-semibold">
            PEACEFUL BEGINNING
          </span>
          <div className="flex gap-2 justify-center">
            <h1 className="text-4xl md:text-5xl font-semibold mt-10 mb-16">
              Our{" "}
              <span className="relative text-[#956144]">
                Experts
                <TitleUnderline stroke="orange" />
              </span>
            </h1>
          </div>
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar touch-pan-x"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {expertTypes.map((expert, index) => (
              <div key={index} style={{ scrollSnapAlign: "start" }}>
                <ExpertCard expert={expert} isMobile={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-24">
          {expertTypes.map((expert, index) => (
            <ExpertCard key={index} expert={expert} isMobile={false} />
          ))}
        </div>

        <div className="flex justify-center mt-2">
          <Link
            href={"/all-experts"}
            className="relative flex items-center justify-center"
          >
            <button className="xl:px-6 xl:py-3 px-2 py-2 mt-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
              All Experts
              <ChevronRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
