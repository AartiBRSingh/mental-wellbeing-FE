"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { baseURL } from "../baseURL";
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
              className="text-black hover:text-gray-600 font-medium transition-colors underline
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
              className="text-black hover:text-gray-600 font-medium transition-colors underline
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
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

const CaseStudyPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(null);

  const searchParams = useSearchParams();
  const expectedUserType = searchParams.get("userType");
  const router = useRouter();
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);

    if (storedUserType !== expectedUserType) {
      setShowModal(true);
    }
  }, [expectedUserType]);

  useEffect(() => {
    if (userType !== expectedUserType) {
      setShowModal(true);
    }
  }, [expectedUserType, userType]);

  const handleModalClose = () => {
    router.push(`/questionnaires?userType=${localStorage.getItem("userType")}`);
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/get-questions?userType=${userType}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [userType]);
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };
  const handleSubmit = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );
      const response = await axios.post(
        `${baseURL}/save-answers`,
        { answers: formattedAnswers },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Submission successful:", response.data);
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers. Please try again.");
    }
  };

  return (
    <>
      {showModal && (
        <UserTypeModal
          expectedUserType={expectedUserType}
          onClose={handleModalClose}
          userType={userType}
        />
      )}
      {/* <div className="p-8 bg-transparent min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Questionnaire</h1>
        {questions.length > 0 ? (
          <form className="space-y-6">
            {questions.map((question) => (
              <div key={question._id} className="bg-white p-4 rounded-lg shadow">
                <p className="text-lg font-medium">{question.question}</p>
                <div className="mt-3 flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={question._id}
                      value="yes"
                      className="mr-2"
                      checked={answers[question._id] === 'yes'}
                      onChange={() => handleAnswerChange(question._id, 'yes')}
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={question._id}
                      value="no"
                      className="mr-2"
                      checked={answers[question._id] === 'no'}
                      onChange={() => handleAnswerChange(question._id, 'no')}
                    />
                    No
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>Loading questions...</p>
        )}
      </div> */}
      <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Case Study Questionnaire
            </h1>
            <div className="h-1 w-96 bg-blue-500 mx-auto rounded-full" />
          </div>

          {questions.length > 0 ? (
            <form className="space-y-8">
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      (Object.keys(answers).length / questions.length) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        (Object.keys(answers).length / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {questions.map((question, index) => (
                <div
                  key={question._id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-100"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Question {index + 1} of {questions.length}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  answers[question._id]
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                    >
                      {answers[question._id] ? "Answered" : "Pending"}
                    </span>
                  </div>
                  <div className="px-8 py-6">
                    <p className="text-xl text-gray-900 font-medium mb-8 leading-relaxed">
                      {question.question}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`relative group/option flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${
                      answers[question._id] === "yes"
                        ? "border-green-500 bg-green-50/50"
                        : "border-gray-200 hover:border-gray-300 group-hover:bg-gray-50"
                    }`}
                      >
                        <div
                          className={`mb-3 w-12 h-12 rounded-full flex items-center justify-center
                    ${
                      answers[question._id] === "yes"
                        ? "bg-green-500"
                        : "bg-gray-100 group-hover/option:bg-gray-200"
                    }`}
                        >
                          <svg
                            className={`w-6 h-6 transition-colors duration-200
                        ${
                          answers[question._id] === "yes"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>

                        <input
                          type="radio"
                          name={question._id}
                          value="yes"
                          checked={answers[question._id] === "yes"}
                          onChange={() =>
                            handleAnswerChange(question._id, "yes")
                          }
                          className="sr-only"
                        />

                        <span
                          className={`text-lg font-medium transition-colors duration-200
                    ${
                      answers[question._id] === "yes"
                        ? "text-green-700"
                        : "text-gray-700 group-hover/option:text-gray-900"
                    }`}
                        >
                          Yes
                        </span>
                      </label>
                      <label
                        className={`relative group/option flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${
                      answers[question._id] === "no"
                        ? "border-red-500 bg-red-50/50"
                        : "border-gray-200 hover:border-gray-300 group-hover:bg-gray-50"
                    }`}
                      >
                        <div
                          className={`mb-3 w-12 h-12 rounded-full flex items-center justify-center
                    ${
                      answers[question._id] === "no"
                        ? "bg-red-500"
                        : "bg-gray-100 group-hover/option:bg-gray-200"
                    }`}
                        >
                          <svg
                            className={`w-6 h-6 transition-colors duration-200
                        ${
                          answers[question._id] === "no"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>

                        <input
                          type="radio"
                          name={question._id}
                          value="no"
                          checked={answers[question._id] === "no"}
                          onChange={() =>
                            handleAnswerChange(question._id, "no")
                          }
                          className="sr-only"
                        />

                        <span
                          className={`text-lg font-medium transition-colors duration-200
                    ${
                      answers[question._id] === "no"
                        ? "text-red-700"
                        : "text-gray-700 group-hover/option:text-gray-900"
                    }`}
                        >
                          No
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-200
              ${
                Object.keys(answers).length === questions.length
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
                >
                  {Object.keys(answers).length === questions.length
                    ? "Submit Answers"
                    : `${Object.keys(answers).length}/${
                        questions.length
                      } Answered`}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500" />
              <p className="mt-4 text-gray-600">Loading questions...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CaseStudyPage />
    </Suspense>
  );
};

export default page;
