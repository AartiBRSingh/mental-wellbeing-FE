"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { baseURL } from "@/app/baseURL";

const SelfUnderstanding = () => {
  const [userName, setUserName] = useState("");
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserName = Cookies.get("name");
    setUserName(storedUserName || "Self");

    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseURL}/assessments-card`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        const mappedSections = data.map((assessment) => ({
          title: assessment.assessmentTitle,
          description: assessment.assessmentDesc,
          price: assessment.price,
          icon: getIconByTitle(assessment.assessmentTitle),
          color: getColorByTitle(assessment.assessmentTitle),
        }));

        setSections(mappedSections);
      } catch (err) {
        console.error("Error fetching assessments:", err);
        setError("Failed to load assessments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const getIconByTitle = (title) => {
    const iconMap = {
      Happiness: "/affection.png",
      "Self Awareness": "/self-regulation.png",
      "Manage Emotions": "/emotional.png",
      "Problem Solving": "/problem-solving-skills.png",
      "Identify Stress Triggers": "/stress.png",
    };

    return iconMap[title] || "/default-icon.png";
  };

  const getColorByTitle = (title) => {
    const colorMap = {
      Happiness: "#77DEFF",
      "Self Awareness": "#FACC15",
      "Manage Emotions": "#FF8458",
      "Problem Solving": "#FF8458",
      "Identify Stress Triggers": "#FF8458",
    };

    return colorMap[title] || "#77DEFF";
  };

  const handleSectionClick = (section) => {
    router.push(`/questionnaire/${section.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const topRow = sections.slice(0, 2);
  const bottomRow = sections.slice(2, 5);

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
        <div className="flex justify-center text-3xl mt-3">
          ₹{section.price}
        </div>
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading assessments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
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

          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
              {topRow.map((section, index) => (
                <SectionCard section={section} index={index} key={index} />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 w-full max-w-7xl">
            {bottomRow.map((section, index) => (
              <SectionCard
                section={section}
                index={index + 2}
                key={index + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfUnderstanding;
