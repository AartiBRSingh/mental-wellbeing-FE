"use client";
import React, { useState, useEffect } from "react";
import CustomCursor from "./CustomCursor";

const ReviewForm = ({ expertId, isOpen, onClose }) => {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    recommendDoctor: "",
    treatmentTaken: "",
    review: "",
    duration: "",
    roomForImprovement: [],
  });

  // Get userId from cookie on mount
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const storedUserId = getCookie("userId");
    setUserId(storedUserId);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/experts/${expertId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Review submitted successfully!");
      setFormData({
        recommendDoctor: "",
        treatmentTaken: "",
        review: "",
        duration: "",
        roomForImprovement: [],
      });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

  const durations = [
    "Less than 15 min",
    "15 min to 30 min",
    "30 min to 1 hour",
    "More than 1 hour",
  ];

  const improvements = [
    "Doctor friendliness",
    "Explanation of the health issue",
    "Treatment satisfaction",
    "Value for money",
    "Wait time",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Feedback
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Share your experience with us
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recommend Doctor Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Would you recommend this doctor?
              </label>
              <select
                name="recommendDoctor"
                value={formData.recommendDoctor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select your recommendation</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Treatment Taken Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Treatment Taken
              </label>
              <input
                type="text"
                name="treatmentTaken"
                value={formData.treatmentTaken}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter the treatment you received"
              />
            </div>

            {/* Review Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Your Review
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-32 resize-y"
                placeholder="Share your experience in detail"
              />
            </div>

            {/* Duration Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Duration of Consultation
              </label>
              <div className="grid grid-cols-2 gap-4">
                {durations.map((duration) => (
                  <label
                    key={duration}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={formData.duration === duration}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{duration}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Improvements Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Areas for Improvement
              </label>
              <div className="grid grid-cols-2 gap-4">
                {improvements.map((improvement) => (
                  <label
                    key={improvement}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="roomForImprovement"
                      value={improvement}
                      checked={formData.roomForImprovement.includes(
                        improvement
                      )}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
