"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MultiStepForm = () => {
  const [userId, setUserId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
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

  // Define all questions in sequence
  const questions = [
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
    {
      section: "expertSupport",
      field: "budgetPerSession",
      question: "What is your budget per session (in INR)?",
      type: "number",
      placeholder: "Enter amount",
    },
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
      options: ["Self-paced", "Group sessions", "One-on-one session", "Hybrid"],
    },
    {
      section: "mentalWellBeing",
      field: "accessToLiveSessions",
      question: "Would you like access to live sessions?",
      type: "checkbox",
    },
    {
      section: "professionalCourse",
      field: "goalForEnrollment",
      question:
        "What is your primary goal for enrolling in a professional course?",
      type: "select",
      options: ["Career Change", "Professional Development", "Personal Growth"],
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
    {
      section: "professionalCourse",
      field: "learningFormat",
      question: "What learning format do you prefer?",
      type: "select",
      options: ["Online", "Hybrid", "In-person"],
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currentQuestion = questions[currentStep];

    setFormData((prevData) => ({
      ...prevData,
      [currentQuestion.section]: {
        ...prevData[currentQuestion.section],
        [currentQuestion.field]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your submit logic here
    console.log(formData);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const getCurrentValue = () => {
    const question = questions[currentStep];
    return formData[question.section][question.field];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Update Your Information
          </h1>

          <h2 className="mb-3">
            Help us get you the most relevant and effective solutions for your
            Mental Health and Personal Growth journey. What are you looking for
            --
          </h2>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / (questions.length - 1)) * 100}%`,
                }}
              />
            </div>
            <div className="text-sm text-gray-500 mt-2 text-center">
              Question {currentStep + 1} of {questions.length}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="space-y-4"
              >
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                  {questions[currentStep].question}
                </h2>

                {questions[currentStep].type === "select" && (
                  <select
                    value={getCurrentValue()}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an option</option>
                    {questions[currentStep].options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {questions[currentStep].type === "text" && (
                  <input
                    type="text"
                    value={getCurrentValue()}
                    onChange={handleChange}
                    placeholder={questions[currentStep].placeholder}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {questions[currentStep].type === "number" && (
                  <input
                    type="number"
                    value={getCurrentValue()}
                    onChange={handleChange}
                    placeholder={questions[currentStep].placeholder}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {questions[currentStep].type === "checkbox" && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={getCurrentValue()}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Yes</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handlePrevious}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 
                  ${currentStep === 0 ? "invisible" : ""}`}
              >
                Previous
              </button>

              {currentStep < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
