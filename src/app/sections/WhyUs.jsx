"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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

const CircleImage = ({ imageUrl }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 480"
      className="w-full h-full transition-all duration-300 hover:scale-105"
    >
      <defs>
        <clipPath id="circleClip">
          <circle cx="240" cy="240" r="240" />
        </clipPath>
      </defs>
      <circle cx="240" cy="240" r="240" fill="#CAFA90" />
      <image
        href={imageUrl}
        width="480"
        height="480"
        x="0"
        y="30"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#circleClip)"
      />
    </svg>
  );
};

const WhyUs = () => {
  const expertTypes = [
    {
      id: 1,
      title: "Individual Therapy",
      slug: "Individual+Therapy",
      imageUrl:
        "https://img.freepik.com/free-vector/psychologist-concept-illustration_114360-2141.jpg?t=st=1740113485~exp=1740117085~hmac=ce63dc367188a3ba0d748db26e8beaa9b4fe9e07bb449701a2dc735d44e4b4a3&w=740",
    },
    {
      id: 2,
      title: "Couples / Marriage Counseling",
      slug: "Couples+%2F+Marriage+Counseling",
      imageUrl:
        "https://img.freepik.com/free-vector/marriage-counseling-concept-illustration_114360-3095.jpg?t=st=1740113562~exp=1740117162~hmac=94defde0854fc5e98443a587d384d3388a5692407505cc5e155123f37a83b036&w=740",
    },
    {
      id: 3,
      title: "Child & Teen Therapy",
      slug: "Child+%26+Teen+Therapy",
      imageUrl:
        "https://img.freepik.com/free-vector/child-therapy-concept-illustration_114360-20002.jpg?t=st=1740113593~exp=1740117193~hmac=376bb5fa33214756a7e7a912c4e8a0054046b2a4151242d52d4cde955b06c941&w=740",
    },
    {
      id: 4,
      title: "Family Therapy",
      slug: "Family+Therapy",
      imageUrl:
        "https://img.freepik.com/free-vector/family-therapy-concept-illustration_114360-20005.jpg?t=st=1740113625~exp=1740117225~hmac=6a5634dd1da93dc57534c156a696667587c38031e34393e2915cc0950ee255c3&w=740",
    },
    {
      id: 5,
      title: "Psychiatry & Medication",
      slug: "Psychiatry+%26+Medication",
      imageUrl:
        "https://img.freepik.com/free-vector/coffee-break-concept-illustration_114360-3884.jpg?t=st=1740113686~exp=1740117286~hmac=d798c51dc7750419800db800128171aad673ec21ddd757f04af73612a271e41f&w=740",
    },
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
              <span className="relative text-[#956144]">
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
                <div className="w-44 h-44 mb-6 object-cover">
                  <CircleImage imageUrl={expert.imageUrl} />
                </div>
                <div className="relative inline-block pb-4 mb-2">
                  <h3 className="text-lg font-semibold">{expert.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <Link
            href={"/all-experts"}
            className="relative flex items-center justify-center "
          >
            <button className="px-6 py-3 mt-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
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
