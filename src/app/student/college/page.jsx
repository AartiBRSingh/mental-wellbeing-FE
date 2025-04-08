"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const StudentQuestionnairePage = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUserName = Cookies.get("name");
    setUserName(storedUserName || "Student");
  }, []);

  const handleSectionClick = (section) => {
    // Navigate to specific questionnaire based on section
    router.push(`/questionnaire/${section.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const sections = [
    {
      title: "Thrive & Glow",
      description:
        "Assesses overall happiness, life satisfaction, emotional health, and evaluates coping capacity. ",
      icon: "/happy-customers.png",
      color: "#77DEFF",
    },
    {
      title: "Self Insights",
      description:
        "Helps understand personality traits and behavioral patterns and is useful for career planning, self-growth, and building resilience.",
      icon: "/discovery.png",
      color: "#77DEFF",
    },
    {
      title: "Emotional Strength",
      description:
        "Measures emotional regulation, empathy, and interpersonal skills, important for peer relationships and conflict management.",
      icon: "/emotions.png",
      color: "#FACC15",
    },
    {
      title: "Pinpoint Triggers",
      description:
        " Identifies academic, social, or personal stressors and measures severity of anxiety and coping ability.",
      icon: "/overwhelmed.png",
      color: "#FF8458",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="max-w-7xl w-full">
        <div className="p-8">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome, <span className="text-[#D2691E]">{userName}</span>!
            </h1>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Choose one of the following assessments to begin your personalized
              mental wellbeing journey. Each assessment provides unique insights
              to help you thrive academically and personally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-16 h-16 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: `${section.color}20` }}
                    >
                      <img
                        src={section.icon}
                        alt={section.title}
                        className="w-32 h-16"
                      />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold text-center mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-sm text-center mb-8 flex-grow">
                    {section.description}
                  </p>
                  <div className="flex justify-center mt-auto">
                    <button
                      onClick={() => handleSectionClick(section.title)}
                      className="px-6 py-3 bg-[#D2691E] text-white rounded-lg hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      Get Started
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuestionnairePage;
