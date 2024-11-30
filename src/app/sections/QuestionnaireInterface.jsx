"use client";
import React, { useState, useEffect, Suspense } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserTypeModal = ({ expectedUserType, userType }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Access Restricted!</h2>
        </div>
        <p className="mb-4 text-gray-700">
          You do not have the required access for this questionnaire. Please
          contact support or try alternative{" "}
          <span>
            <button
              type="button"
              onClick={() => router.push(`/login?userType=${expectedUserType}`)}
              className="text-black hover:text-gray-600 font-medium transition-colors underline cursor-pointer
              "
            >
              login methods.
            </button>
          </span>
        </p>
        <p className="mb-4 text-gray-700">
          Or go to the the{" "}
          <span>
            <button
              type="button"
              onClick={() =>
                router.push(`/questionnaires?userType=${userType}`)
              }
              className="text-black hover:text-gray-600 font-medium transition-colors underline cursor-pointer
              "
            >
              eligible questionnaire.
            </button>
          </span>
        </p>
        <div className="bg-yellow-50 p-3 rounded-lg mb-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Need Help?</h3>
          <p className="text-yellow-700 text-sm">
            Contact Support: support@company.com
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Link
            href={"/"}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

const questions = [
  "I often feel overwhelmed by work-related stress.",
  "I find it easy to collaborate with my colleagues.",
  "I am confident in my ability to solve complex problems.",
  "I feel my work is meaningful and contributes to the company's goals.",
  "I often take initiative in team projects.",
];

const QuestionnaireInterface = ({ onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const expectedUserType = searchParams.get("userType");
  console.log(expectedUserType, "raju");

  const router = useRouter();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (userType !== expectedUserType) {
      setShowModal(true);
    }
  }, [expectedUserType, userType]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const handleModalClose = () => {
    router.push(`/questionnaires?userType=${localStorage.getItem("userType")}`);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {showModal && (
        <UserTypeModal
          expectedUserType={expectedUserType}
          onClose={handleModalClose}
          userType={userType}
        />
      )}

      <div className="flex flex-col min-h-screen">
        <div className="bg-transparent flex-grow flex justify-center items-center">
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <div className="mb-6">
                <div className="h-2 bg-[#FFD1D1] rounded-full">
                  <div
                    className="h-2 bg-[#EE1C25] rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>

              <h2 className="text-xl font-semibold mb-4">
                {questions[currentQuestion]}
              </h2>

              <div className="space-y-3">
                {[
                  { value: 1, label: "Strongly Disagree" },
                  { value: 2, label: "Disagree" },
                  { value: 3, label: "Neutral" },
                  { value: 4, label: "Agree" },
                  { value: 5, label: "Strongly Agree" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    className={`cursor-pointer w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      answers[currentQuestion] === value
                        ? "bg-[#EE1C25] text-white"
                        : "bg-[#FFE5E5] text-gray-800 hover:bg-[#FFB8B8]"
                    }`}
                    onClick={() => handleAnswer(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`cursor-pointer flex items-center px-4 py-2 rounded-full ${
                    currentQuestion === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#EE1C25] text-white hover:bg-[#FF4D4D]"
                  }`}
                >
                  <ChevronLeft className="mr-2" size={20} />
                  Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    disabled={answers[currentQuestion] === null}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-full ${
                      answers[currentQuestion] === null
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#EE1C25] text-white hover:bg-[#FF4D4D]"
                    }`}
                  >
                    Next
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={answers[currentQuestion] === null}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-full ${
                      answers[currentQuestion] === null
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    Submit
                    <Check className="ml-2" size={20} />
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default QuestionnaireInterface;
