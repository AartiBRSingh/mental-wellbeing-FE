"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // Import the router for navigation

const MultiStepForm = () => {
  const router = useRouter(); // Initialize the router
  const [selectedSection, setSelectedSection] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    expertSupport: {
      supportType: "",
      therapistSpecialization: "",
      therapistSpecializationDetails: "",
      sessionFormat: "",
      preferredDays: { weekdays: [], weekends: [] },
      timePreference: { weekdays: "", weekends: "" },
      genderPreference: "",
      culturalExpertise: "",
      culturalExpertiseDetails: "",
      budgetPerSession: "",
    },
    mentalWellBeing: {
      currentGoal: "",
      familiarityLevel: "",
      programType: "",
      timeCommitment: "",
      accessToLiveSessions: "",
      progressTracking: "",
    },
    professionalCourse: {
      goalForEnrollment: "",
      useForCareer: "",
      courseAreaOfInterest: "",
      learningFormat: "",
      includesPracticalExperience: "",
      courseStartTime: "",
    },
  });

  const mainSections = [
    {
      id: "mentalWellBeing",
      name: "Mental Well-being ",
      redirectPage: "self",
    },
    {
      id: "professionalCourse",
      name: "Professional Course",
      redirectPage: "all-courses",
    },
    {
      id: "expertSupport",
      name: "Expert Booking",
      redirectPage: "all-experts",
    },
  ];

  const sections = {
    expertSupport: [
      {
        question: "What type of support are you seeking?",
        field: "supportType",
        options: [
          "Anxiety or Stress Management",
          "Depression",
          "Relationship Issues",
          "Personal Growth and Well-Being",
          "Career Counseling",
          "Other",
        ],
      },
      {
        question:
          "Do you have a specific preference for the therapist's specialization?",
        field: "therapistSpecialization",
        options: ["Yes", "No preference"],
        conditional: {
          showIf: "Yes",
          field: "therapistSpecializationDetails",
          type: "text",
          placeholder: "Specify the area, e.g., CBT, mindfulness",
        },
      },
      {
        question: "What format do you prefer for your sessions?",
        field: "sessionFormat",
        options: ["In-person", "Virtual (Online)", "Both"],
      },
      {
        question: "What days and times work best for you?",
        field: "preferredDays",
        multiSelect: true,
        options: {
          weekdays: ["Morning", "Afternoon", "Evening"],
          weekends: ["Morning", "Afternoon", "Evening"],
        },
      },
      {
        question: "Do you have a gender preference for your therapist?",
        field: "genderPreference",
        options: ["No preference", "Female", "Male"],
      },
      {
        question:
          "Would you like to work with a therapist with specific cultural or linguistic expertise?",
        field: "culturalExpertise",
        options: ["Yes", "No preference"],
        conditional: {
          showIf: "Yes",
          field: "culturalExpertiseDetails",
          type: "text",
          placeholder: "Specify your preferences",
        },
      },
      {
        question: "What is your budget per session?",
        field: "budgetPerSession",
        options: [
          "Upto INR 1,000",
          "Upto INR 3,000",
          "Upto INR 5,000",
          "No preference",
        ],
      },
    ],
    mentalWellBeing: [
      {
        question: "What is your current mental health goal?",
        field: "supportType",
        options: [
          "Reducing Stress",
          "Improving Focus and Mental Clarity",
          "Building Emotional Resilience",
          "Overcoming Anxiety",
          "General Well-Being",
        ],
      },
      {
        question: "How familiar are you with mental well-being practices?",
        field: "familiarityLevel",
        options: [
          "Beginner (New to mental health programs)",
          "Intermediate (Some experience with self-help or therapy)",
          "Advanced (Regularly engage in mental well-being practices)",
        ],
      },
      {
        question: "What type of program suits you best?",
        field: "programType",
        options: [
          "Self-paced (Online)",
          "One-on-one session",
          "Hybrid (Combination of self-paced and group)",
          "Group sessions",
        ],
      },
      {
        question: "How much time can you commit to this program?",
        field: "timeCommitment",
        options: ["1-2 Weeks", "1 Month", "3 Months", "6 Months or More"],
      },
      {
        question: "Would you like access to live sessions or webinars?",
        field: "accessToLiveSessions",
        options: ["Yes", "No"],
      },
      {
        question:
          "Do you prefer programs with assessments or progress tracking?",
        field: "progressTracking",
        options: ["Yes", "No"],
      },
    ],
    professionalCourse: [
      {
        question: "What is your primary goal for enrolling in this course?",
        field: "goalForEnrollment",
        options: [
          "Career Change (Interested in becoming a mental health professional)",
          "Professional Development (Enhancing existing skills)",
          "Personal Growth (Deepening knowledge about mental health)",
        ],
      },
      {
        question: "Are you planning to use this certification professionally?",
        field: "useForCareer",
        options: ["Yes, for career purposes", "No, for personal interest"],
      },
      {
        question:
          "Which area of mental health or psychology interests you most?",
        field: "courseAreaOfInterest",
        options: [
          "Clinical Psychology",
          "Counseling and Therapy",
          "Mental Health Research",
          "Child Psychology",
          "Organizational Psychology",
          "General Mental Health Awareness",
        ],
      },
      {
        question: "What type of learning format do you prefer?",
        field: "learningFormat",
        options: [
          "Online (Flexible, self-paced)",
          "Hybrid (Online and live sessions)",
          "In-person",
        ],
      },
      {
        question:
          "Would you prefer a certification that includes practical experience (e.g., internships)?",
        field: "includesPracticalExperience",
        options: ["Yes", "No"],
      },
      {
        question: "How soon are you looking to start the course?",
        field: "courseStartTime",
        options: ["Immediately", "Within 1 month", "Within 3 months"],
      },
    ],
  };

  const ProgressBar = () => {
    const totalSteps = selectedSection ? sections[selectedSection].length : 0;
    const progress = selectedSection
      ? ((currentStep + 1) / totalSteps) * 100
      : 0;

    return (
      <div className="mb-8">
        {selectedSection && (
          <>
            <div className="flex justify-center gap-8 mb-4">
              {/* Only show the selected section name */}
              <div className="text-xl font-semibold  rounded-full p-3 ">
                <div className="flex justify-center ">
                  <span className="relative text-2xl md:text-3xl xl:text-3xl font-serif text-stone-800 max-w-full md:max-w-[1000px] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
                    <span className="relative text-[#956144] ml-3">
                      {
                        mainSections.find(
                          (section) => section.id === selectedSection
                        )?.name
                      }
                      <svg
                        className="absolute w-full h-[10px] -bottom-2 left-0"
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
                </div>
              </div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-500 text-right">
              Question {currentStep + 1} of {totalSteps}
            </div>
          </>
        )}
      </div>
    );
  };

  const Option = ({ text, selected, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 border text-center rounded-xl cursor-pointer transition-all ${
        selected
          ? "bg-[#F6D038] text-black"
          : "bg-white hover:bg-[#F6D038] hover:text-black"
      }`}
    >
      {text}
    </div>
  );

  const MainSectionButton = ({ section }) => (
    <button
      onClick={() => {
        setSelectedSection(section.id);
        setCurrentStep(0);
      }}
      className="w-full p-6 text-xl font-semibold text-left bg-white border rounded-lg hover:bg-[#F6D038] transition-all hover:text-black"
    >
      {section.name}
    </button>
  );

  const handleOptionSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        [field]: value,
      },
    }));

    // Auto-advance to next question if it's not a conditional field or multiSelect
    const currentQuestion = sections[selectedSection][currentStep];
    if (
      currentQuestion.field === "therapistSpecialization" ||
      currentQuestion.field === "preferredDays" ||
      currentQuestion.field === "culturalExpertise"
    ) {
      return;
    }
    if (
      !currentQuestion.conditional &&
      !currentQuestion.multiSelect &&
      currentStep < sections[selectedSection].length - 1
    ) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300); // Small delay for better UX
    }
  };

  const handleNext = () => {
    if (currentStep < sections[selectedSection].length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      setSelectedSection(null);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log(formData[selectedSection]);

    // Find the current section to get its redirect page
    const currentSectionObj = mainSections.find(
      (section) => section.id === selectedSection
    );

    if (currentSectionObj) {
      // Redirect to the appropriate page based on the completed section
      router.push(`/${currentSectionObj.redirectPage}`);
    }

    // For development/testing purposes - log the form data
    console.log("Final submission for section:", formData[selectedSection]);
  };

  const renderInitialSelection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {mainSections.map((section) => (
          <MainSectionButton key={section.id} section={section} />
        ))}
      </div>
    </div>
  );

  const renderQuestion = () => {
    const currentQuestion = sections[selectedSection][currentStep];
    const isTherapistSpecializationQuestion =
      currentQuestion.field === "therapistSpecialization";
    const isPreferredDaysQuestion = currentQuestion.field === "preferredDays";
    const isCulturalExpertiseQuestion =
      currentQuestion.field === "culturalExpertise";

    return (
      <div className="space-y-6">
        <h3 className="text-xl ">{currentQuestion.question}</h3>
        <div className="grid gap-3">
          {currentQuestion.options instanceof Array ? (
            currentQuestion.options.map((option, idx) => (
              <Option
                key={idx}
                text={option}
                selected={
                  formData[selectedSection][currentQuestion.field] === option
                }
                onClick={() =>
                  handleOptionSelect(currentQuestion.field, option)
                }
              />
            ))
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Weekdays</h4>
                <div className="grid gap-2">
                  {currentQuestion.options.weekdays.map((time, idx) => (
                    <Option
                      key={idx}
                      text={time}
                      selected={formData[
                        selectedSection
                      ].preferredDays.weekdays.includes(time)}
                      onClick={() => {
                        const weekdays =
                          formData[selectedSection].preferredDays.weekdays;
                        const updated = weekdays.includes(time)
                          ? weekdays.filter((t) => t !== time)
                          : [...weekdays, time];
                        handleOptionSelect("preferredDays", {
                          ...formData[selectedSection].preferredDays,
                          weekdays: updated,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Weekends</h4>
                <div className="grid gap-2">
                  {currentQuestion.options.weekends.map((time, idx) => (
                    <Option
                      key={idx}
                      text={time}
                      selected={formData[
                        selectedSection
                      ].preferredDays.weekends.includes(time)}
                      onClick={() => {
                        const weekends =
                          formData[selectedSection].preferredDays.weekends;
                        const updated = weekends.includes(time)
                          ? weekends.filter((t) => t !== time)
                          : [...weekends, time];
                        handleOptionSelect("preferredDays", {
                          ...formData[selectedSection].preferredDays,
                          weekends: updated,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {currentQuestion.conditional &&
          formData[selectedSection][currentQuestion.field] ===
            currentQuestion.conditional.showIf && (
            <input
              type="text"
              placeholder={currentQuestion.conditional.placeholder}
              className="w-full p-3 border rounded-md"
              value={
                formData[selectedSection][currentQuestion.conditional.field] ||
                ""
              }
              onChange={(e) =>
                handleOptionSelect(
                  currentQuestion.conditional.field,
                  e.target.value
                )
              }
            />
          )}
        {(isTherapistSpecializationQuestion ||
          isPreferredDaysQuestion ||
          isCulturalExpertiseQuestion) && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-white text-blue-600 rounded-md"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 mt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative  mb-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Help us get you the most relevant and effective solutions for your
            Mental Health and{" "}
            <span className="relative text-[#956144] ml-3">
              Personal Growth
              <svg
                className="absolute w-full h-[10px] -bottom-2 left-0"
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
            </span>{" "}
            journey
          </h2>
        </div>
        <div className="relative bg-white rounded-lg mt-16 shadow-lg p-8">
          <div className="relative z-10">
            <ProgressBar />

            <AnimatePresence mode="wait">
              <motion.div
                key={
                  selectedSection
                    ? `${selectedSection}-${currentStep}`
                    : "initial"
                }
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {!selectedSection ? renderInitialSelection() : renderQuestion()}
              </motion.div>
            </AnimatePresence>

            {selectedSection && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-white text-blue-600 rounded-md"
                >
                  Previous
                </button>
                {currentStep === sections[selectedSection].length - 1 && (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md"
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
