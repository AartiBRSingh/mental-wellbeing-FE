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
    <div
      className="min-h-screen bg-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/getstartedbg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto p-8 max-w-5xl">
        <h1 className="text-5xl text-[#4A3B24] mb-12 text-center font-semibold tracking-wide">
          Update Your
          <span className="text-[#FDD56A] relative ml-2">
            I
            <span className="relative">
              nformation
              <svg
                className="absolute w-full h-[10px] bottom-0 left-0"
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
        </h1>

        {userId ? (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Expert Booking Section */}
            <div className="bg-blue-100 rounded-xl p-8 shadow-lg border ">
              <h2 className="text-2xl text-[#4A3B24] mb-8 pb-3 border-b-2 border-black tracking-wide">
                Expert Booking
              </h2>
              <div className="grid gap-8">
                <label className="block">
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Support Type
                  </span>
                  <select
                    name="expertSupport.supportType"
                    value={formData.expertSupport.supportType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
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
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Therapist Specialization
                  </span>
                  <input
                    type="text"
                    name="expertSupport.therapistSpecialization"
                    value={formData.expertSupport.therapistSpecialization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                  />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                      Session Format
                    </span>
                    <select
                      name="expertSupport.sessionFormat"
                      value={formData.expertSupport.sessionFormat}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                    >
                      <option value="In-person">In-person</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Both">Both</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                      Budget per Session (INR)
                    </span>
                    <input
                      type="number"
                      name="expertSupport.budgetPerSession"
                      value={formData.expertSupport.budgetPerSession}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                      Preferred Days (Weekdays)
                    </span>
                    <input
                      type="text"
                      name="expertSupport.preferredDays.weekdays"
                      value={formData.expertSupport.preferredDays.weekdays}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                      placeholder="e.g. Morning, Afternoon"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                      Preferred Days (Weekends)
                    </span>
                    <input
                      type="text"
                      name="expertSupport.preferredDays.weekends"
                      value={formData.expertSupport.preferredDays.weekends}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                      placeholder="e.g. Morning, Afternoon"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Mental Well-Being Section */}
            <div className="bg-purple-100 rounded-xl p-8 shadow-lg border">
              <h2 className="text-2xl font-serif text-[#4A3B24] mb-8 pb-3 border-b-2 border-black tracking-wide">
                Mental Well-Being Program
              </h2>
              <div className="grid gap-8">
                <label className="block">
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Current Goal
                  </span>
                  <select
                    name="mentalWellBeing.currentGoal"
                    value={formData.mentalWellBeing.currentGoal}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
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
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Familiarity Level
                  </span>
                  <select
                    name="mentalWellBeing.familiarityLevel"
                    value={formData.mentalWellBeing.familiarityLevel}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Program Type
                  </span>
                  <select
                    name="mentalWellBeing.programType"
                    value={formData.mentalWellBeing.programType}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                  >
                    <option value="Self-paced">Self-paced</option>
                    <option value="Group sessions">Group sessions</option>
                    <option value="One-on-one session">
                      One-on-one session
                    </option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="mentalWellBeing.accessToLiveSessions"
                    checked={formData.mentalWellBeing.accessToLiveSessions}
                    onChange={handleChange}
                    className="rounded-lg border-black text-[#749F82] focus:ring-[#749F82] h-5 w-5"
                  />
                  <span className="text-[#6B573B] font-medium text-lg">
                    Access to Live Sessions
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Course Section */}
            <div className="bg-yellow-100 rounded-xl p-8 shadow-lg border ">
              <h2 className="text-2xl font-serif text-[#4A3B24] mb-8 pb-3 border-b-2 border-black tracking-wide">
                Professional Course
              </h2>
              <div className="grid gap-8">
                <label className="block">
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Primary Goal for Enrolling
                  </span>
                  <select
                    name="professionalCourse.goalForEnrollment"
                    value={formData.professionalCourse.goalForEnrollment}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                  >
                    <option value="Career Change">Career Change</option>
                    <option value="Professional Development">
                      Professional Development
                    </option>
                    <option value="Personal Growth">Personal Growth</option>
                  </select>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="professionalCourse.useForCareer"
                    checked={formData.professionalCourse.useForCareer}
                    onChange={handleChange}
                    className="rounded-lg border-black text-[#749F82] focus:ring-[#749F82] h-5 w-5"
                  />
                  <span className="text-[#6B573B] font-medium text-lg">
                    Planning to use certification professionally?
                  </span>
                </div>
                <label className="block">
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Area of Interest
                  </span>
                  <select
                    name="professionalCourse.courseAreaOfInterest"
                    value={formData.professionalCourse.courseAreaOfInterest}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
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
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    Learning Format
                  </span>
                  <select
                    name="professionalCourse.learningFormat"
                    value={formData.professionalCourse.learningFormat}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                  >
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="In-person">In-person</option>
                  </select>
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="professionalCourse.includesPracticalExperience"
                    checked={
                      formData.professionalCourse.includesPracticalExperience
                    }
                    onChange={handleChange}
                    className="rounded-lg border-black text-[#749F82] focus:ring-[#749F82] h-5 w-5"
                  />
                  <span className="text-[#6B573B] font-medium text-lg">
                    Includes Practical Experience
                  </span>
                </div>
                <label className="block">
                  <span className="text-[#6B573B] font-medium text-lg mb-2 block">
                    When would you like to start the course?
                  </span>
                  <select
                    name="professionalCourse.courseStartTime"
                    value={formData.professionalCourse.courseStartTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-black shadow-sm focus:border-[#749F82] focus:ring focus:ring-[#749F82] focus:ring-opacity-20 bg-white py-3 text-[#4A3B24]"
                  >
                    <option value="Immediately">Immediately</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 3 months">Within 3 months</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-12">
              <button
                type="submit"
                className="bg-[#749F82] text-white py-4 px-8 rounded-lg hover:bg-[#638B70] transition-colors duration-300 shadow-lg font-medium text-lg tracking-wide"
              >
                Update Information
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-[#749F82] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#4A3B24] text-lg mt-4 font-medium">
              Loading user details...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUserPage;
