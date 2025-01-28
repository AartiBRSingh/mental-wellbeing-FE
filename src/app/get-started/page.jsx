"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    expertSupport: {
      supportType: "",
      therapistSpecialization: "",
      sessionFormat: "",
      preferredDays: { weekdays: [], weekends: [] },
      genderPreference: "",
      culturalExpertise: "",
      budgetPerSession: "",
    },
    mentalWellBeing: {
      currentGoal: "",
      familiarityLevel: "",
      programType: "",
      timeCommitment: "",
      accessToLiveSessions: false,
      progressTracking: false,
    },
    professionalCourse: {
      goalForEnrollment: "",
      useForCareer: false,
      courseAreaOfInterest: "",
      learningFormat: "",
      includesPracticalExperience: false,
      courseStartTime: "",
    },
  });

  // Define sections with their respective questions
  const sections = [
    {
      name: "Expert Booking",
      image: "/images/expert-booking.png",
      questions: [
        {
          section: "expertSupport",
          field: "supportType",
          question: "What type of support are you looking for?",
          type: "select",
          options: [
            "Anxiety or Stress Management",
            "Depression",
            "Relationship Issues",
            "Personal Growth and Well-Being",
            "Career Counseling",
          ],
        },
        {
          section: "expertSupport",
          field: "therapistSpecialization",
          question: "What specialization would you prefer in a therapist?",
          type: "text",
          placeholder: "E.g., CBT, Trauma, Family Therapy",
        },
        {
          section: "expertSupport",
          field: "sessionFormat",
          question: "What session format do you prefer?",
          type: "select",
          options: ["In-person", "Virtual", "Both"],
        },
      ],
    },
    {
      name: "Mental Well-being Program",
      image: "/images/mental-wellbeing.png",
      questions: [
        {
          section: "mentalWellBeing",
          field: "currentGoal",
          question: "What is your current mental well-being goal?",
          type: "select",
          options: [
            "Reducing Stress",
            "Improving Focus and Mental Clarity",
            "Building Emotional Resilience",
            "Overcoming Anxiety",
            "General Well-Being",
          ],
        },
        {
          section: "mentalWellBeing",
          field: "familiarityLevel",
          question: "How familiar are you with mental well-being practices?",
          type: "select",
          options: ["Beginner", "Intermediate", "Advanced"],
        },
        {
          section: "mentalWellBeing",
          field: "programType",
          question: "What type of program would you prefer?",
          type: "select",
          options: [
            "Self-paced",
            "Group sessions",
            "One-on-one session",
            "Hybrid",
          ],
        },
      ],
    },
    {
      name: "Certificate Course",
      image: "/images/certificate-course.png",
      questions: [
        {
          section: "professionalCourse",
          field: "goalForEnrollment",
          question:
            "What is your primary goal for enrolling in a professional course?",
          type: "select",
          options: [
            "Career Change",
            "Professional Development",
            "Personal Growth",
          ],
        },
        {
          section: "professionalCourse",
          field: "useForCareer",
          question: "Do you plan to use this certification professionally?",
          type: "checkbox",
        },
        {
          section: "professionalCourse",
          field: "courseAreaOfInterest",
          question: "Which area of study interests you most?",
          type: "select",
          options: [
            "Clinical Psychology",
            "Counseling and Therapy",
            "Mental Health Research",
            "Child Psychology",
            "Organizational Psychology",
          ],
        },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currentSection = sections[Math.floor(currentStep / 3)];
    const currentQuestion = currentSection.questions[currentStep % 3];

    setFormData((prevData) => ({
      ...prevData,
      [currentQuestion.section]: {
        ...prevData[currentQuestion.section],
        [currentQuestion.field]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, sections.length * 3 - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const slideVariants = {
    enter: {
      opacity: 0,
      x: -100,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    },
  };

  const getCurrentValue = () => {
    const currentSection = sections[Math.floor(currentStep / 3)];
    const currentQuestion = currentSection.questions[currentStep % 3];
    return formData[currentQuestion.section][currentQuestion.field];
  };

  const currentSection = sections[Math.floor(currentStep / 3)];
  const currentQuestion = currentSection.questions[currentStep % 3];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <img
            src={currentSection.image}
            alt={`${currentSection.name} image`}
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-center mb-6">
            {currentSection.name}
          </h1>
          <div className="mb-6">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    (Math.floor(currentStep / 3) / (sections.length - 1)) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Stage {Math.floor(currentStep / 3) + 1} of {sections.length}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="enter"
                animate="center"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-700">
                    {currentQuestion.question}
                  </h2>

                  {currentQuestion.type === "select" && (
                    <select
                      name={currentQuestion.field}
                      value={getCurrentValue()}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select an option</option>
                      {currentQuestion.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {currentQuestion.type === "text" && (
                    <input
                      type="text"
                      name={currentQuestion.field}
                      value={getCurrentValue()}
                      onChange={handleChange}
                      placeholder={currentQuestion.placeholder}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  )}

                  {currentQuestion.type === "checkbox" && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name={currentQuestion.field}
                        checked={getCurrentValue()}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700">Yes</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md ${
                  currentStep === 0 ? "invisible" : ""
                }`}
              >
                Previous
              </button>
              {currentStep < sections.length * 3 - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
