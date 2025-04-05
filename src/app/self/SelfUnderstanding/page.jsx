"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const SelfUnderstanding = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUserName = Cookies.get("name");
    setUserName(storedUserName || "Self");
  }, []);

  const handleSectionClick = (section) => {
    // Navigate to specific questionnaire based on section
    router.push(`/questionnaire/${section.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const sections = [
    {
      title: "Happiness",
      description:
        "It aids an individual's perceived happiness, life satisfaction, and emotional well-being, providing insights into overall mental and emotional health.",
      icon: "/affection.png",
      color: "#77DEFF",
    },
    {
      title: "Self Awareness",
      description:
        "It assesses traits, behaviors, and psychological patterns to help individuals understand themselves better. It aids in self-awareness, career choices, and mental well-being.",
      icon: "/self-regulation.png",
      color: "#FACC15",
    },
    {
      title: "Manage Emotions",
      description:
        "It aids a person's ability to manage emotions, handle stress, and maintain stable relationships, reflecting their emotional intelligence and resilience.",
      icon: "/emotional.png",
      color: "#FF8458",
    },
    {
      title: "Problem Solving",
      description:
        "cognitive abilities, problem-solving skills, reasoning, and overall intellectual potential, helping to mental aptitude and learning capacity.",
      icon: "/problem-solving-skills.png",
      color: "#FF8458",
    },
    {
      title: "Identity Stress Triggers",
      description:
        "an individual's stress levels, coping mechanisms, and resilience, helping to identify stress triggers and manage mental well-being effectively.",
      icon: "/stress.png",
      color: "#FF8458",
    },
  ];

  // Split sections into two rows: 2 on top, 3 on bottom
  const topRow = sections.slice(0, 2);
  const bottomRow = sections.slice(2, 5);

  // Card component to ensure consistent styling and button positioning
  const SectionCard = ({ section, index }) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 flex flex-col h-full"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full"
            style={{ backgroundColor: `${section.color}20` }}
          >
            <img src={section.icon} alt={section.title} className="" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-center mb-4">
          {section.title}
        </h2>
        <div className="flex-grow">
          <p className="text-gray-600 text-sm text-center line-clamp-4">
            {section.description}
          </p>
        </div>
        <div className="flex justify-center text-3xl mt-3">₹500</div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => handleSectionClick(section.title)}
            className="px-6 py-3 bg-[#D2691E] text-white rounded-lg hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Pay Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-7xl w-full">
        <div className="p-8">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome, <span className="text-[#D2691E]">{userName}</span>!
            </h1>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              The Individual Self-Understanding Program helps individuals
              explore their thoughts, emotions, and behaviors through
              assessments, personalized sessions, and therapeutic interventions
              for better mental well-being.
            </p>
          </div>

          {/* Top row with 2 cards centered */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
              {topRow.map((section, index) => (
                <SectionCard section={section} index={index} key={index} />
              ))}
            </div>
          </div>

          {/* Bottom row with 3 cards */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 w-full max-w-7xl">
            {bottomRow.map((section, index) => (
              <SectionCard section={section} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfUnderstanding;
