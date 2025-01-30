"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useRouter } from "next/navigation";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  Upload,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const CompleteProfile = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    coverPhoto: "shareyrheart_template.jpg",
    about: "",
    clinicAddress: "",
    education: [],
    registeredNumber: "",
    experience: [],
    internships: [],
    careerBreak: [],
    specialization: [],
    services: [],
    therapies: [],
    licensesAndCertificates: [],
    journals: [],
    courses: [],
    fellowship: [],
    recommendations: [],
    volunteerExperience: [],
    mediaAndPublications: [],
    honorsAndAwards: [],
    languages: [],
  });
  const [isRecomendedOpen, setIsRecomendedOpen] = useState(false);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const [selectedLanguages, setSelectedLanguages] = useState(
    formData.languages || []
  );

  const [selectedSpecialization, setSelectedSpecialization] = useState(
    formData.specialization || []
  );
  const [selectedServices, setSelectedServices] = useState(
    formData.services || []
  );
  const [selectedTherapy, setSelectedTherapy] = useState(
    formData.therapies || []
  );

  const handleLanguageChange = (selected) => {
    setSelectedLanguages(selected);
    setFormData((prev) => ({
      ...prev,
      languages: selected,
    }));
  };

  const handleSpecializationChange = (selected) => {
    if (selected.length <= 6) {
      setSelectedSpecialization(selected);
      setFormData((prev) => ({
        ...prev,
        specialization: selected,
      }));
    }
  };

  const handleTherapyChange = (selected) => {
    if (selected.length <= 6) {
      setSelectedTherapy(selected);
      setFormData((prev) => ({
        ...prev,
        therapies: selected,
      }));
    }
  };

  const handleServicesChange = (selected) => {
    if (selected.length <= 6) {
      setSelectedServices(selected);
      setFormData((prev) => ({
        ...prev,
        services: selected,
      }));
    }
  };

  const languagesList = [
    "Hindi",
    "English",
    "Bengali",
    "Marathi",
    "Tamil",
    "Telugu",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
    "Chinese",
    "French",
    "Russian",
    "Spanish",
    "German",
  ];

  const specializationFields = [
    "General Psychiatry",
    "Child and Adolescent Psychiatry",
    "Geriatric Psychiatry",
    "Addiction Psychiatry",
    "Forensic Psychiatry",
    "Neuropsychiatry",
    "Consultation-Liaison Psychiatry",
    "Emergency Psychiatry",
    "Clinical Psychology",
    "Counseling Psychology",
    "Neuropsychology",
    "Developmental Psychology",
    "Educational Psychology",
    "Health Psychology",
    "Industrial-Organizational Psychology",
    "Social Psychology",
  ];

  const serviceFields = [
    "Emotional and Psychological Disorders",
    "Stress and Coping",
    "Interpersonal and Relationship Issues",
    "Addiction and Behavioral Issues",
    "Child and Adolescent Challenges",
    "Trauma and Abuse",
    "Severe Mental Health Conditions",
    "Life Transitions and Challenges",
    "Self-Understanding and Personal Growth",
    "Workplace and Academic Pressures",
  ];

  const therapyFields = [
    "Cognitive Behavioral Therapy (CBT)",
    "Dialectical Behavior Therapy (DBT)",
    "Trauma-Focused Therapy",
    "Family Therapy",
    "Couples Therapy",
    "Psychoanalysis",
    "Humanistic Therapy",
    "Art and Creative Therapy",
    "Gestalt Therapy",
    "Hypnotherapy",
  ];

  const handleArrayFieldAdd = (fieldName, template) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], template],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put(
        `${baseURL}/complete-expert/${userId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      router.push("/expert/complete-profile");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data?.error || "An error occurred.");
    }
  };
  const calculateSectionCompletion = (section) => {
    if (!formData[section]) return 0;
    const totalFields = formData[section].length;
    if (totalFields === 0) return 0;
    return Math.round(
      (formData[section].filter((item) =>
        Object.values(item).some((val) => val)
      ).length /
        totalFields) *
        100
    );
  };

  // Component for section headers with completion badge
  const SectionHeader = ({ title }) => (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">
        {calculateSectionCompletion(title.toLowerCase())}% Complete
      </span>
    </div>
  );

  // Add button component
  const AddButton = ({ onClick, text }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
    >
      <span className="text-lg">+</span> {text}
    </button>
  );
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      {/* <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
          <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {calculateSectionCompletion("total")}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${calculateSectionCompletion("total")}%` }}
          />
        </div>
      </div> */}
      {/* <h2 className="text-3xl font-bold text-black mb-8 text-center">
        Complete Your Profile
      </h2> */}

      {/* Core Section */}
      <section className="space-y-8">
        <div className="bg-[#003B29] rounded-3xl p-7 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Complete Your{" "}
            <span className="text-[#FDD56A] relative inline-block">
              Profile
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
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="inline-block mb-8">
            <span className="px-4 py-3  border rounded-xl border-green-700 text-Black font-semibold text-[20px]">
              Core
            </span>
          </div>

          <span className="flex text-black text-[17px] border rounded-xl border-orange-500 p-4 w-full italic">
            Fill these sections to be discovered by clients and people who are
            searching for such services.
          </span>

          <div className="space-y-6 ">
            <div className="max-w-2xl p-4 pt-8">
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Cover *</span>
              </div>

              <div className="relative group border border-gray-200 h-64 transition-all">
                <input
                  onChange={(e) => handleFileChange(e, "coverPhoto")}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:bg-gray-50 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md">
                  <Upload className="w-8 h-8 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400">Drop your image here</p>
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400">PNG, JPG · Max 10MB</p>
            </div>

            {/* {about} */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                About
                <span className="text-[#EF4444] ml-1">*</span>
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003B29] focus:border-transparent outline-none transition-all duration-200 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                rows={4}
                minLength={50}
                maxLength={500}
                placeholder="Tell something about yourself (50-500 words)"
              />
            </div>

            {/* Contact Information */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Clinic Address
                <span className="text-[#EF4444] ml-1">*</span>
              </label>
              <textarea
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003B29] focus:border-transparent outline-none transition-all duration-200 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                rows={1}
              />
            </div>

            {/* Registration */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Registration Number
                <span className="text-[#EF4444] ml-1">*</span>
              </label>
              <input
                type="text"
                name="registeredNumber"
                value={formData.registeredNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003B29] focus:border-transparent outline-none transition-all duration-200 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
              />
            </div>

            {/* {Education} */}
            <div>
              <div className="flex justify-between items-center mb-2 ">
                <label className="font-medium text-[23px]">Education</label>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("education", {
                      school: "",
                      degree: "",
                      fieldOfStudy: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Education
                </button>
              </div>
              {formData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.education.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({ ...prev, education: updated }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].school = e.target.value;
                      setFormData((prev) => ({ ...prev, education: updated }));
                    }}
                    className="block w-full border rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].degree = e.target.value;
                      setFormData((prev) => ({ ...prev, education: updated }));
                    }}
                    className="block w-full border rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].fieldOfStudy = e.target.value;
                      setFormData((prev) => ({ ...prev, education: updated }));
                    }}
                    className="block w-full border rounded p-2"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={edu.startDate}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[idx].startDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          education: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={edu.endDate}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[idx].endDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          education: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* {Work Experience} */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-[23px]">
                  Work Experience
                </label>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("experience", {
                      title: "",
                      company: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Experience
                </button>
              </div>
              {formData.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.experience.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({ ...prev, experience: updated }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx].title = e.target.value;
                      setFormData((prev) => ({ ...prev, experience: updated }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx].company = e.target.value;
                      setFormData((prev) => ({ ...prev, experience: updated }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx].location = e.target.value;
                      setFormData((prev) => ({ ...prev, experience: updated }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[idx].startDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          experience: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[idx].endDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          experience: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({ ...prev, experience: updated }));
                    }}
                    className="block w-full border rounded p-2 col-span-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* {Internship} */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-[23px]">Internships</label>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("internships", {
                      title: "",
                      organization: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Internship
                </button>
              </div>
              {formData.internships.map((internship, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.internships.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        internships: updated,
                      }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Title"
                    value={internship.title}
                    onChange={(e) => {
                      const updated = [...formData.internships];
                      updated[idx].title = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        internships: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    value={internship.organization}
                    onChange={(e) => {
                      const updated = [...formData.internships];
                      updated[idx].organization = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        internships: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={internship.startDate}
                      onChange={(e) => {
                        const updated = [...formData.internships];
                        updated[idx].startDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          internships: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={internship.endDate}
                      onChange={(e) => {
                        const updated = [...formData.internships];
                        updated[idx].endDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          internships: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={internship.description}
                    onChange={(e) => {
                      const updated = [...formData.internships];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        internships: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 col-span-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* {career} */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-semibold text-[23px]">
                  Career Breaks
                </label>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("careerBreak", {
                      type: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Career Break
                </button>
              </div>

              {formData.careerBreak.map((break_, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.careerBreak.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        careerBreak: updated,
                      }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Type"
                    value={break_.type}
                    onChange={(e) => {
                      const updated = [...formData.careerBreak];
                      updated[idx].type = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        careerBreak: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={break_.location}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    onChange={(e) => {
                      const updated = [...formData.careerBreak];
                      updated[idx].location = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        careerBreak: updated,
                      }));
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={break_.startDate}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                      onChange={(e) => {
                        const updated = [...formData.careerBreak];
                        updated[idx].startDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          careerBreak: updated,
                        }));
                      }}
                    />
                    <input
                      type="date"
                      value={break_.endDate}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                      onChange={(e) => {
                        const updated = [...formData.careerBreak];
                        updated[idx].endDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          careerBreak: updated,
                        }));
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={break_.description}
                    className="block w-full border rounded p-2 col-span-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    onChange={(e) => {
                      const updated = [...formData.careerBreak];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        careerBreak: updated,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Specialization */}
            <div>
              <label className="font-semibold text-[23px]">
                Specialization
              </label>
              <Listbox
                value={selectedSpecialization}
                onChange={handleSpecializationChange}
                multiple
              >
                <div className="relative mt-1 pt-4">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedSpecialization.length > 0
                        ? selectedSpecialization.join(", ")
                        : "Select specialization"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {specializationFields.map((specialization) => (
                      <ListboxOption
                        key={specialization}
                        value={specialization}
                        className={({ active, selected }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-green-700 text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {specialization}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Services */}
            <div>
              <label className="font-semibold text-[23px]">Services</label>
              <Listbox
                value={selectedServices}
                onChange={handleServicesChange}
                multiple
              >
                <div className="relative mt-1 pt-4">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedServices.length > 0
                        ? selectedServices.join(", ")
                        : "Select services"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {serviceFields.map((services) => (
                      <ListboxOption
                        key={services}
                        value={services}
                        className={({ active, selected }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-green-700 text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {services}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Therapies */}
            <div>
              <label className="font-semibold text-[23px]">Therapy</label>
              <Listbox
                value={selectedTherapy}
                onChange={handleTherapyChange}
                multiple
              >
                <div className="relative mt-1 pt-4">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedTherapy.length > 0
                        ? selectedTherapy.join(", ")
                        : "Select therapies"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {therapyFields.map((therapies) => (
                      <ListboxOption
                        key={therapies}
                        value={therapies}
                        className={({ active, selected }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-green-700 text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {therapies}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="bg-white rounded-2xl shadow-lg p-8 space-y-8 mt-8">
        <div
          className="cursor-pointer flex justify-between items-center"
          onClick={() => setIsRecomendedOpen(!isRecomendedOpen)}
        >
          <label className="text-xl font-semibold px-4 py-3 rounded-full border border-green-700 text-Black">
            Recommended
          </label>
          <ChevronDownIcon
            className={`w-6 h-6 transition-transform duration-200 ${
              isRecomendedOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {isRecomendedOpen && (
          <>
            {/* Journals Section (New) */}
            <span className="flex text-black text-[17px] border rounded-xl border-orange-500 p-4 w-full italic">
              {" "}
              Completing these sections will increase your visibility and give
              you access to more clients.
            </span>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[23px]">Featured Journals</h3>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("journals", {
                      caseName: "",
                      journalImage: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Journal
                </button>
              </div>

              {formData.journals.map((journal, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.journals.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({ ...prev, journals: updated }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Case Name"
                    value={journal.caseName}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.journals];
                      updated[idx].caseName = e.target.value;
                      setFormData((prev) => ({ ...prev, journals: updated }));
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.journals];
                      updated[idx].clientImage = e.target.files[0];
                      setFormData((prev) => ({ ...prev, journals: updated }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={journal.location}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.journals];
                      updated[idx].location = e.target.value;
                      setFormData((prev) => ({ ...prev, journals: updated }));
                    }}
                  />
                  <textarea
                    placeholder="Description (max 3000 characters)"
                    value={journal.description}
                    maxLength={3000}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300 col-span-2"
                    onChange={(e) => {
                      const updated = [...formData.journals];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({ ...prev, journals: updated }));
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Licenses and Certificates */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-[23px]">
                  Licenses & Certificates
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("licensesAndCertificates", {
                      name: "",
                      issuingOrganization: "",
                      issueDate: "",
                      expiryDate: "",
                      credentialId: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add License/Certificate
                </button>
              </div>
              {formData.licensesAndCertificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.licensesAndCertificates.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        licensesAndCertificates: updated,
                      }));
                    }}
                    className="absolute top-1 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Certificate Name"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = [...formData.licensesAndCertificates];
                      updated[idx].name = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        licensesAndCertificates: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={cert.issuingOrganization}
                    onChange={(e) => {
                      const updated = [...formData.licensesAndCertificates];
                      updated[idx].issuingOrganization = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        licensesAndCertificates: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="text"
                    placeholder="Credential ID"
                    value={cert.credentialId}
                    onChange={(e) => {
                      const updated = [...formData.licensesAndCertificates];
                      updated[idx].credentialId = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        licensesAndCertificates: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Issue Date"
                      value={cert.issueDate}
                      onChange={(e) => {
                        const updated = [...formData.licensesAndCertificates];
                        updated[idx].issueDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          licensesAndCertificates: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    />
                    <input
                      type="date"
                      placeholder="Expiry Date"
                      value={cert.expiryDate}
                      onChange={(e) => {
                        const updated = [...formData.licensesAndCertificates];
                        updated[idx].expiryDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          licensesAndCertificates: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Courses Section (New) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[23px]">Courses</h3>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("courses", {
                      courseName: "",
                      fieldOfCourse: "",
                      courseDuration: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Course
                </button>
              </div>

              {formData.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.courses.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({ ...prev, courses: updated }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Course Name"
                    value={course.courseName}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.courses];
                      updated[idx].courseName = e.target.value;
                      setFormData((prev) => ({ ...prev, courses: updated }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Field of Course"
                    value={course.fieldOfCourse}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.courses];
                      updated[idx].fieldOfCourse = e.target.value;
                      setFormData((prev) => ({ ...prev, courses: updated }));
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={course.startDate}
                      onChange={(e) => {
                        const updated = [...formData.courses];
                        updated[idx].startDate = e.target.value;
                        setFormData((prev) => ({ ...prev, courses: updated }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={course.endDate}
                      onChange={(e) => {
                        const updated = [...formData.courses];
                        updated[idx].endDate = e.target.value;
                        setFormData((prev) => ({ ...prev, courses: updated }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Fellowship Section (New) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[23px]">Fellowship</h3>

                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("fellowship", {
                      fieldOfFellowship: "",
                      yearOfAttaining: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Fellowship
                </button>
              </div>

              {formData.fellowship.map((fellow, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.fellowship.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({ ...prev, fellowship: updated }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Field of Fellowship"
                    value={fellow.fieldOfFellowship}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.fellowship];
                      updated[idx].fieldOfFellowship = e.target.value;
                      setFormData((prev) => ({ ...prev, fellowship: updated }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Year of Attaining"
                    value={fellow.yearOfAttaining}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.fellowship];
                      updated[idx].yearOfAttaining = e.target.value;
                      setFormData((prev) => ({ ...prev, fellowship: updated }));
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Recommendations Section (New) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[23px]">Recommendations</h3>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("recommendations", {
                      content: "",
                      recommendationsImage: "",
                      link: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Recommendation
                </button>
              </div>

              {formData.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.recommendations.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        recommendations: updated,
                      }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <textarea
                    placeholder="Content (max 200 characters)"
                    value={rec.content}
                    maxLength={200}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300 col-span-2"
                    onChange={(e) => {
                      const updated = [...formData.recommendations];
                      updated[idx].content = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        recommendations: updated,
                      }));
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.recommendations];
                      updated[idx].image = e.target.files[0];
                      setFormData((prev) => ({
                        ...prev,
                        recommendations: updated,
                      }));
                    }}
                  />
                  <input
                    type="url"
                    placeholder="Link"
                    value={rec.link}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                    onChange={(e) => {
                      const updated = [...formData.recommendations];
                      updated[idx].link = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        recommendations: updated,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* {Additional Section} */}

      <section className="bg-white rounded-2xl shadow-lg p-8 space-y-8 mt-8">
        <div
          className="cursor-pointer flex justify-between items-center"
          onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
        >
          <label className="text-xl font-semibold px-4 py-3 rounded-full border border-green-700 text-Black">
            Additional
          </label>
          <ChevronDownIcon
            className={`w-6 h-6 transition-transform duration-200 ${
              isAdditionalOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {isAdditionalOpen && (
          <>
            <span className="flex text-black text-[17px] border rounded-xl border-orange-500 p-4 w-full italic">
              Add even more personality to your profile. These sections will
              help you grow your visibility and build more impressions on the
              client.
            </span>

            {/* {volunteerExperience} */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[23px]">
                  Volunteer Experience
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("volunteerExperience", {
                      type: "",
                      companyOrOrganization: "",
                      isSelf: false,
                      startDate: "",
                      endDate: "",
                      location: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Volunteer Experience
                </button>
              </div>

              {formData.volunteerExperience.map((exp, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.volunteerExperience.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        volunteerExperience: updated,
                      }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Type"
                    value={exp.type}
                    onChange={(e) => {
                      const updated = [...formData.volunteerExperience];
                      updated[idx].type = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        volunteerExperience: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <input
                    type="text"
                    placeholder="Company/Organization"
                    value={exp.companyOrOrganization}
                    onChange={(e) => {
                      const updated = [...formData.volunteerExperience];
                      updated[idx].companyOrOrganization = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        volunteerExperience: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.isSelf}
                      onChange={(e) => {
                        const updated = [...formData.volunteerExperience];
                        updated[idx].isSelf = e.target.checked;
                        setFormData((prev) => ({
                          ...prev,
                          volunteerExperience: updated,
                        }));
                      }}
                      className="rounded border-gray-300"
                    />
                    <label>Self-employed</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    value={exp.location}
                    onChange={(e) => {
                      const updated = [...formData.volunteerExperience];
                      updated[idx].location = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        volunteerExperience: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = [...formData.volunteerExperience];
                        updated[idx].startDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          volunteerExperience: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const updated = [...formData.volunteerExperience];
                        updated[idx].endDate = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          volunteerExperience: updated,
                        }));
                      }}
                      className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const updated = [...formData.volunteerExperience];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        volunteerExperience: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 col-span-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* Publications and Media */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-[23px]">
                  Publications & Media
                </label>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("mediaAndPublications", {
                      title: "",
                      publisher: "",
                      date: "",
                      url: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Publication
                </button>
              </div>
              {formData.mediaAndPublications.map((pub, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.mediaAndPublications.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        mediaAndPublications: updated,
                      }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Title"
                    value={pub.title}
                    onChange={(e) => {
                      const updated = [...formData.mediaAndPublications];
                      updated[idx].title = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        mediaAndPublications: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="text"
                    placeholder="Publisher"
                    value={pub.publisher}
                    onChange={(e) => {
                      const updated = [...formData.mediaAndPublications];
                      updated[idx].publisher = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        mediaAndPublications: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="date"
                    value={pub.date}
                    onChange={(e) => {
                      const updated = [...formData.mediaAndPublications];
                      updated[idx].date = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        mediaAndPublications: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={pub.url}
                    onChange={(e) => {
                      const updated = [...formData.mediaAndPublications];
                      updated[idx].url = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        mediaAndPublications: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <textarea
                    placeholder="Description"
                    value={pub.description}
                    onChange={(e) => {
                      const updated = [...formData.mediaAndPublications];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        mediaAndPublications: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300 col-span-2"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* Honors and Awards Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[23px]">Honors & Awards</h3>
                <button
                  type="button"
                  onClick={() =>
                    handleArrayFieldAdd("honorsAndAwards", {
                      title: "",
                      issuer: "",
                      issueDate: "",
                      description: "",
                    })
                  }
                  className="text-white font-bold px-4 p-2 bg-green-600 rounded-3xl hover:bg-green-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Add Honor/Award
                </button>
              </div>

              {formData.honorsAndAwards.map((award, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-7 border rounded relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.honorsAndAwards.filter(
                        (_, index) => index !== idx
                      );
                      setFormData((prev) => ({
                        ...prev,
                        honorsAndAwards: updated,
                      }));
                    }}
                    className="absolute top-0 right-2 text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    placeholder="Title"
                    value={award.title}
                    onChange={(e) => {
                      const updated = [...formData.honorsAndAwards];
                      updated[idx].title = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        honorsAndAwards: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={award.issuer}
                    onChange={(e) => {
                      const updated = [...formData.honorsAndAwards];
                      updated[idx].issuer = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        honorsAndAwards: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <input
                    type="date"
                    placeholder="Issue Date"
                    value={award.issueDate}
                    onChange={(e) => {
                      const updated = [...formData.honorsAndAwards];
                      updated[idx].issueDate = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        honorsAndAwards: updated,
                      }));
                    }}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  />
                  <textarea
                    placeholder="Description (max 900 characters)"
                    value={award.description}
                    onChange={(e) => {
                      const updated = [...formData.honorsAndAwards];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        honorsAndAwards: updated,
                      }));
                    }}
                    maxLength={900}
                    className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300 col-span-2"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <label className="font-semibold text-[23px]">Languages</label>
              <Listbox
                value={selectedLanguages}
                onChange={handleLanguageChange}
                multiple
              >
                <div className="relative mt-1 pt-4">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedLanguages.length > 0
                        ? selectedLanguages.join(", ")
                        : "Select languages"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {languagesList.map((language) => (
                      <ListboxOption
                        key={language}
                        value={language}
                        className={({ active, selected }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-green-700 text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {language}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </>
        )}
      </section>

      {/* Submit Button */}
      <div className="py-6 text-center">
        <button
          type="submit"
          className="w-48 bg-black text-xl text-white px-4 py-2 rounded-2xl hover:bg-blue-900 shadow-md hover:shadow-xl transition-all cursor-pointer"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default CompleteProfile;
