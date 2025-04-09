"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";

const DemoRequestModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    location: {
      city: "",
      country: "",
    },
    companyName: "",
    industryType: "Corporate",
    numberOfParticipants: 1,
    preferredDateTimeSlots: [{ date: "", time: "" }],
    timeZone: "",
    mentalHealthChallenges: [],
    programGoals: [],
    specialRequirements: {
      accessibility: "",
      languagePreference: "English",
      confidentialityConcerns: "",
      other: "",
    },
    demoDuration: "30min",
    communicationMode: [],
    attendees: [{ role: "HR Representative", count: 1 }],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const industryOptions = [
    "Corporate",
    "Educational",
    "NGO",
    "Healthcare",
    "Technology",
    "Other",
  ];

  const challengeOptions = [
    "Stress",
    "Anxiety",
    "Burnout",
    "Lack of Engagement",
    "Depression",
    "Work-Life Balance",
    "Other",
  ];

  const goalOptions = [
    "Emotional Resilience",
    "Team Productivity",
    "Mental Well-being",
    "Stress Management",
    "Leadership Development",
    "Other",
  ];

  const communicationOptions = [
    "Live Chat",
    "Video Call",
    "Email",
    "Phone Call",
    "In Person",
  ];

  const durationOptions = ["15min", "30min", "45min", "60min", "Custom"];

  const attendeeRoleOptions = [
    "HR Representative",
    "Executive",
    "Student",
    "Individual",
    "Team Leader",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          [field]: [...prev[field], value],
        };
      } else {
        return {
          ...prev,
          [field]: prev[field].filter((item) => item !== value),
        };
      }
    });
  };

  const addDateTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      preferredDateTimeSlots: [
        ...prev.preferredDateTimeSlots,
        { date: "", time: "" },
      ],
    }));
  };

  const removeDateTimeSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      preferredDateTimeSlots: prev.preferredDateTimeSlots.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleDateTimeChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSlots = [...prev.preferredDateTimeSlots];
      updatedSlots[index] = {
        ...updatedSlots[index],
        [field]: value,
      };
      return {
        ...prev,
        preferredDateTimeSlots: updatedSlots,
      };
    });
  };

  const handleAttendeeChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedAttendees = [...prev.attendees];
      updatedAttendees[index] = {
        ...updatedAttendees[index],
        [field]: field === "count" ? parseInt(value) : value,
      };
      return {
        ...prev,
        attendees: updatedAttendees,
      };
    });
  };

  const addAttendee = () => {
    setFormData((prev) => ({
      ...prev,
      attendees: [...prev.attendees, { role: "HR Representative", count: 1 }],
    }));
  };

  const removeAttendee = (index) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${baseURL}/demo-requests`, formData);
      setSuccess(true);
      setFormData(initialFormData);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[800px] overflow-y-auto">
        <div className="sticky top-0 bg-[#F9F5F2] flex justify-center items-center p-6 border-b">
          <div className="flex justify-center">
            <span className="relative text-2xl md:text-3xl xl:text-3xl font-semibold text-stone-800 max-w-full block">
              Book a
              <span className="relative text-[#956144] ml-2">
                Demo
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
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 absolute top-4 right-4"
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
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {success && (
            <div className="mb-6 bg-green-100 p-4 rounded-md text-green-700">
              Your demo request has been submitted successfully!
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-100 p-4 rounded-md text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Institution Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry Type *
                  </label>
                  <select
                    name="industryType"
                    value={formData.industryType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {industryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Participants *
                  </label>
                  <input
                    type="number"
                    name="numberOfParticipants"
                    value={formData.numberOfParticipants}
                    onChange={handleInputChange}
                    min="1"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone *
                  </label>
                  <input
                    type="text"
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleInputChange}
                    placeholder="e.g., GMT+1, EST, UTC+8"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">
                Preferred Date & Time Slots
              </h3>
              {formData.preferredDateTimeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) =>
                        handleDateTimeChange(index, "date", e.target.value)
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) =>
                        handleDateTimeChange(index, "time", e.target.value)
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeDateTimeSlot(index)}
                      className="mt-6 p-2 text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDateTimeSlot}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Another Time Slot
              </button>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">Challenges & Goals</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mental Health Challenges Being Faced
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {challengeOptions.map((challenge) => (
                    <div key={challenge} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`challenge-${challenge}`}
                        value={challenge}
                        checked={formData.mentalHealthChallenges.includes(
                          challenge
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, "mentalHealthChallenges")
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`challenge-${challenge}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {challenge}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Goals for the Program
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {goalOptions.map((goal) => (
                    <div key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`goal-${goal}`}
                        value={goal}
                        checked={formData.programGoals.includes(goal)}
                        onChange={(e) =>
                          handleCheckboxChange(e, "programGoals")
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`goal-${goal}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">Demo Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Demo Duration *
                  </label>
                  <select
                    name="demoDuration"
                    value={formData.demoDuration}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {durationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode of Communication *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {communicationOptions.map((mode) => (
                    <div key={mode} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`mode-${mode}`}
                        value={mode}
                        checked={formData.communicationMode.includes(mode)}
                        onChange={(e) =>
                          handleCheckboxChange(e, "communicationMode")
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`mode-${mode}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {mode}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">
                Who Will Attend the Demo?
              </h3>

              {formData.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <select
                      value={attendee.role}
                      onChange={(e) =>
                        handleAttendeeChange(index, "role", e.target.value)
                      }
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {attendeeRoleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Count *
                    </label>
                    <input
                      type="number"
                      value={attendee.count}
                      onChange={(e) =>
                        handleAttendeeChange(index, "count", e.target.value)
                      }
                      min="1"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div> */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAttendee(index)}
                      className="mt-6 p-2 text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {/* <button
                type="button"
                onClick={addAttendee}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Another Attendee Type
              </button> */}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Special Requirements</h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accessibility Needs
                  </label>
                  <input
                    type="text"
                    name="specialRequirements.accessibility"
                    value={formData.specialRequirements.accessibility}
                    onChange={handleInputChange}
                    placeholder="Any accessibility accommodations needed"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language Preference
                  </label>
                  <input
                    type="text"
                    name="specialRequirements.languagePreference"
                    value={formData.specialRequirements.languagePreference}
                    onChange={handleInputChange}
                    placeholder="Preferred language for the demo"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confidentiality Concerns
                  </label>
                  <textarea
                    name="specialRequirements.confidentialityConcerns"
                    value={formData.specialRequirements.confidentialityConcerns}
                    onChange={handleInputChange}
                    placeholder="Any confidentiality requirements or concerns"
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Requirements
                  </label>
                  <textarea
                    name="specialRequirements.other"
                    value={formData.specialRequirements.other}
                    onChange={handleInputChange}
                    placeholder="Any other special requirements or notes"
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-white text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemoRequestModal;
