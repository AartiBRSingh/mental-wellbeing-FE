"use client";
import React, { useState, useEffect } from "react";
import { baseURL } from "../baseURL";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUserPage = () => {
  const [userId, setUserId] = useState(null);
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

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === "checkbox";

    setFormData((prevData) => {
      if (
        name.includes("expertSupport") ||
        name.includes("mentalWellBeing") ||
        name.includes("professionalCourse")
      ) {
        const [section, field] = name.split(".");
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: isCheckbox ? checked : value,
          },
        };
      }
      return prevData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${baseURL}/update-user/${userId}`,
        formData
      );

      if (response.ok) {
        const updatedUser = await response.json();
        toast.success("User updated successfully");
        console.log(updatedUser);
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      <div className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-4xl font-serif text-[#4A3B24] mb-8 text-center">
          Update Your Information
        </h1>
        {userId ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-[#DED5C6]">
              <h2 className="text-2xl font-serif text-[#4A3B24] mb-6 pb-2 border-b border-[#DED5C6]">
                Expert Booking
              </h2>
              <div className="grid gap-6">
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Support Type
                  </span>
                  <select
                    name="expertSupport.supportType"
                    value={formData.expertSupport.supportType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Anxiety or Stress Management">
                      Anxiety or Stress Management
                    </option>
                    <option value="Depression">Depression</option>
                    <option value="Relationship Issues">
                      Relationship Issues
                    </option>
                    <option value="Personal Growth and Well-Being">
                      Personal Growth and Well-Being
                    </option>
                    <option value="Career Counseling">Career Counseling</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Therapist Specialization
                  </span>
                  <input
                    type="text"
                    name="expertSupport.therapistSpecialization"
                    value={formData.expertSupport.therapistSpecialization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  />
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Session Format
                  </span>
                  <select
                    name="expertSupport.sessionFormat"
                    value={formData.expertSupport.sessionFormat}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="In-person">In-person</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Both">Both</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Preferred Days (Weekdays)
                  </span>
                  <input
                    type="text"
                    name="expertSupport.preferredDays.weekdays"
                    value={formData.expertSupport.preferredDays.weekdays}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                    placeholder="e.g. Morning, Afternoon"
                  />
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Preferred Days (Weekends)
                  </span>
                  <input
                    type="text"
                    name="expertSupport.preferredDays.weekends"
                    value={formData.expertSupport.preferredDays.weekends}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                    placeholder="e.g. Morning, Afternoon"
                  />
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Budget per Session (INR)
                  </span>
                  <input
                    type="number"
                    name="expertSupport.budgetPerSession"
                    value={formData.expertSupport.budgetPerSession}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  />
                </label>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border border-[#DED5C6]">
              <h2 className="text-2xl font-serif text-[#4A3B24] mb-6 pb-2 border-b border-[#DED5C6]">
                Mental Well-Being Program
              </h2>
              <div className="grid gap-6">
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Current Goal
                  </span>
                  <select
                    name="mentalWellBeing.currentGoal"
                    value={formData.mentalWellBeing.currentGoal}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Reducing Stress">Reducing Stress</option>
                    <option value="Improving Focus and Mental Clarity">
                      Improving Focus
                    </option>
                    <option value="Building Emotional Resilience">
                      Building Emotional Resilience
                    </option>
                    <option value="Overcoming Anxiety">
                      Overcoming Anxiety
                    </option>
                    <option value="General Well-Being">
                      General Well-Being
                    </option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Familiarity Level
                  </span>
                  <select
                    name="mentalWellBeing.familiarityLevel"
                    value={formData.mentalWellBeing.familiarityLevel}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Program Type
                  </span>
                  <select
                    name="mentalWellBeing.programType"
                    value={formData.mentalWellBeing.programType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Self-paced">Self-paced</option>
                    <option value="Group sessions">Group sessions</option>
                    <option value="One-on-one session">
                      One-on-one session
                    </option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="mentalWellBeing.accessToLiveSessions"
                    checked={formData.mentalWellBeing.accessToLiveSessions}
                    onChange={handleChange}
                    className="rounded border-[#DED5C6] text-[#749F82] focus:ring-[#749F82]"
                  />
                  <span className="text-[#6B573B] font-medium">
                    Access to Live Sessions
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border border-[#DED5C6]">
              <h2 className="text-2xl font-serif text-[#4A3B24] mb-6 pb-2 border-b border-[#DED5C6]">
                Professional Course
              </h2>
              <div className="grid gap-6">
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Primary Goal for Enrolling
                  </span>
                  <select
                    name="professionalCourse.goalForEnrollment"
                    value={formData.professionalCourse.goalForEnrollment}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Career Change">Career Change</option>
                    <option value="Professional Development">
                      Professional Development
                    </option>
                    <option value="Personal Growth">Personal Growth</option>
                  </select>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="professionalCourse.useForCareer"
                    checked={formData.professionalCourse.useForCareer}
                    onChange={handleChange}
                    className="rounded border-[#DED5C6] text-[#749F82] focus:ring-[#749F82]"
                  />
                  <span className="text-[#6B573B] font-medium">
                    Planning to use certification professionally?
                  </span>
                </div>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Area of Interest
                  </span>
                  <select
                    name="professionalCourse.courseAreaOfInterest"
                    value={formData.professionalCourse.courseAreaOfInterest}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Clinical Psychology">
                      Clinical Psychology
                    </option>
                    <option value="Counseling and Therapy">
                      Counseling and Therapy
                    </option>
                    <option value="Mental Health Research">
                      Mental Health Research
                    </option>
                    <option value="Child Psychology">Child Psychology</option>
                    <option value="Organizational Psychology">
                      Organizational Psychology
                    </option>
                    <option value="General Mental Health Awareness">
                      General Mental Health Awareness
                    </option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    Learning Format
                  </span>
                  <select
                    name="professionalCourse.learningFormat"
                    value={formData.professionalCourse.learningFormat}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="In-person">In-person</option>
                  </select>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="professionalCourse.includesPracticalExperience"
                    checked={
                      formData.professionalCourse.includesPracticalExperience
                    }
                    onChange={handleChange}
                    className="rounded border-[#DED5C6] text-[#749F82] focus:ring-[#749F82]"
                  />
                  <span className="text-[#6B573B] font-medium">
                    Includes Practical Experience
                  </span>
                </div>
                <label className="block">
                  <span className="text-[#6B573B] font-medium">
                    When would you like to start the course?
                  </span>
                  <select
                    name="professionalCourse.courseStartTime"
                    value={formData.professionalCourse.courseStartTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-[#DED5C6] shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20"
                  >
                    <option value="Immediately">Immediately</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 3 months">Within 3 months</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-[#749F82] text-white py-3 px-6 rounded-md hover:bg-[#638B70] transition-colors duration-200 shadow-md font-medium"
              >
                Update Information
              </button>
            </div>
          </form>
        ) : (
          <p className="text-[#4A3B24] text-center">Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateUserPage;
