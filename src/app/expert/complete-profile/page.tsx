"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../baseURL";
import { useRouter } from "next/navigation";

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Complete Your Profile
      </h2>
      {/* Core Section */}
      <section className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold">Core Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Cover Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "coverPhoto")}
                className="block w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                className="block w-full border rounded p-2"
                rows={4}
                minLength={50}
                maxLength={500}
                placeholder="Tell something about yourself (50-500 words)"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Clinic Address</label>
                <textarea
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleInputChange}
                  className="block w-full border rounded p-2"
                  rows={1}
                />
              </div>
            </div>

            {/* Registration */}
            <div>
              <label className="block mb-1">Registration Number</label>
              <input
                type="text"
                name="registeredNumber"
                value={formData.registeredNumber}
                onChange={handleInputChange}
                className="block w-full border rounded p-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-8 bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-2 ">
          <label className="text-xl font-semibold">Education</label>
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
            className="text-blue-500 hover:text-blue-600"
          >
            + Add Education
          </button>
        </div>
        {formData.education.map((edu, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
          >
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
                  setFormData((prev) => ({ ...prev, education: updated }));
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
                  setFormData((prev) => ({ ...prev, education: updated }));
                }}
                className="block w-full border rounded p-2"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Professional Experience Section */}
      <section className="space-y-8 bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-semibold">Professional Experience</h3>

        {/* Experience */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Work Experience</label>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Experience
            </button>
          </div>
          {formData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
              <input
                type="text"
                placeholder="Title"
                value={exp.title}
                onChange={(e) => {
                  const updated = [...formData.experience];
                  updated[idx].title = e.target.value;
                  setFormData((prev) => ({ ...prev, experience: updated }));
                }}
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => {
                    const updated = [...formData.experience];
                    updated[idx].startDate = e.target.value;
                    setFormData((prev) => ({ ...prev, experience: updated }));
                  }}
                  className="block w-full border rounded p-2"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => {
                    const updated = [...formData.experience];
                    updated[idx].endDate = e.target.value;
                    setFormData((prev) => ({ ...prev, experience: updated }));
                  }}
                  className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2 col-span-2"
                rows={3}
              />
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Internships</label>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Internship
            </button>
          </div>
          {formData.internships.map((internship, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
              <input
                type="text"
                placeholder="Title"
                value={internship.title}
                onChange={(e) => {
                  const updated = [...formData.internships];
                  updated[idx].title = e.target.value;
                  setFormData((prev) => ({ ...prev, internships: updated }));
                }}
                className="block w-full border rounded p-2"
              />
              <input
                type="text"
                placeholder="Organization"
                value={internship.organization}
                onChange={(e) => {
                  const updated = [...formData.internships];
                  updated[idx].organization = e.target.value;
                  setFormData((prev) => ({ ...prev, internships: updated }));
                }}
                className="block w-full border rounded p-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={internship.startDate}
                  onChange={(e) => {
                    const updated = [...formData.internships];
                    updated[idx].startDate = e.target.value;
                    setFormData((prev) => ({ ...prev, internships: updated }));
                  }}
                  className="block w-full border rounded p-2"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={internship.endDate}
                  onChange={(e) => {
                    const updated = [...formData.internships];
                    updated[idx].endDate = e.target.value;
                    setFormData((prev) => ({ ...prev, internships: updated }));
                  }}
                  className="block w-full border rounded p-2"
                />
              </div>
              <textarea
                placeholder="Description"
                value={internship.description}
                onChange={(e) => {
                  const updated = [...formData.internships];
                  updated[idx].description = e.target.value;
                  setFormData((prev) => ({ ...prev, internships: updated }));
                }}
                className="block w-full border rounded p-2 col-span-2"
                rows={3}
              />
            </div>
          ))}
        </div>
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Career Breaks</h3>
          <div>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Career Break
            </button>

            {formData.careerBreak.map((break_, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
                <input
                  type="text"
                  placeholder="Type"
                  value={break_.type}
                  onChange={(e) => {
                    const updated = [...formData.careerBreak];
                    updated[idx].type = e.target.value;
                    setFormData((prev) => ({ ...prev, careerBreak: updated }));
                  }}
                  className="block w-full border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={break_.location}
                  className="block w-full border rounded p-2"
                  onChange={(e) => {
                    const updated = [...formData.careerBreak];
                    updated[idx].location = e.target.value;
                    setFormData((prev) => ({ ...prev, careerBreak: updated }));
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={break_.startDate}
                    className="block w-full border rounded p-2"
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
                    className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2 col-span-2"
                  onChange={(e) => {
                    const updated = [...formData.careerBreak];
                    updated[idx].description = e.target.value;
                    setFormData((prev) => ({ ...prev, careerBreak: updated }));
                  }}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Volunteer Experience</h3>
          <div>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Volunteer Experience
            </button>

            {formData.volunteerExperience.map((exp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                    className="block w-full border rounded p-2"
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
                    className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2 col-span-2"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </section>
        {/* Specialization */}
        <div>
          <label className="block mb-1 font-medium">Specializations</label>
          <input
            type="text"
            value={formData.specialization.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                specialization: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="block w-full border rounded p-2"
            placeholder="Enter specializations separated by commas"
          />
        </div>

        {/* Services */}
        <div>
          <label className="block mb-1 font-medium">Services Offered</label>
          <input
            type="text"
            value={formData.services.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                services: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="block w-full border rounded p-2"
            placeholder="Enter services separated by commas"
          />
        </div>

        {/* Therapies */}
        <div>
          <label className="block mb-1 font-medium">Therapies</label>
          <input
            type="text"
            value={formData.therapies.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                therapies: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="block w-full border rounded p-2"
            placeholder="Enter therapies separated by commas"
          />
        </div>
      </section>

      {/* Additional Qualifications Section */}
      <section className="space-y-6 bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-semibold">Additional Qualifications</h3>

        {/* Licenses and Certificates */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Licenses & Certificates</label>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add License/Certificate
            </button>
          </div>
          {formData.licensesAndCertificates.map((cert, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Publications and Media */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Publications & Media</label>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Publication
            </button>
          </div>
          {formData.mediaAndPublications.map((pub, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
            >
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2"
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
                className="block w-full border rounded p-2 col-span-2"
                rows={3}
              />
            </div>
          ))}
        </div>

        {/* Honors and Awards Section */}
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Honors & Awards</h3>
          <div>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Honor/Award
            </button>

            {formData.honorsAndAwards.map((award, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2 col-span-2"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Journals Section (New) */}
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Journals</h3>
          <div>
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
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Journal
            </button>

            {formData.journals.map((journal, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
                <input
                  type="text"
                  placeholder="Case Name"
                  value={journal.caseName}
                  className="block w-full border rounded p-2"
                  onChange={(e) => {
                    const updated = [...formData.journals];
                    updated[idx].caseName = e.target.value;
                    setFormData((prev) => ({ ...prev, journals: updated }));
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2 col-span-2"
                  onChange={(e) => {
                    const updated = [...formData.journals];
                    updated[idx].description = e.target.value;
                    setFormData((prev) => ({ ...prev, journals: updated }));
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section (New) */}
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Courses</h3>
          <div>
            <button
              type="button"
              onClick={() =>
                handleArrayFieldAdd("courses", {
                  courseName: "",
                  fieldOfCourse: "",
                  courseDuration: "",
                })
              }
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Course
            </button>

            {formData.courses.map((course, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
                <input
                  type="text"
                  placeholder="Course Name"
                  value={course.courseName}
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
                    className="block w-full border rounded p-2"
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
                    className="block w-full border rounded p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fellowship Section (New) */}
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Fellowship</h3>
          <div>
            <button
              type="button"
              onClick={() =>
                handleArrayFieldAdd("fellowship", {
                  fieldOfFellowship: "",
                  yearOfAttaining: "",
                })
              }
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Fellowship
            </button>

            {formData.fellowship.map((fellow, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
                <input
                  type="text"
                  placeholder="Field of Fellowship"
                  value={fellow.fieldOfFellowship}
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
                  onChange={(e) => {
                    const updated = [...formData.fellowship];
                    updated[idx].yearOfAttaining = e.target.value;
                    setFormData((prev) => ({ ...prev, fellowship: updated }));
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations Section (New) */}
        <section className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Recommendations</h3>
          <div>
            <button
              type="button"
              onClick={() =>
                handleArrayFieldAdd("recommendations", {
                  content: "",
                  recommendationsImage: "",
                  link: "",
                })
              }
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Recommendation
            </button>

            {formData.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded"
              >
                <textarea
                  placeholder="Content (max 200 characters)"
                  value={rec.content}
                  maxLength={200}
                  className="block w-full border rounded p-2 col-span-2"
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
                  className="block w-full border rounded p-2"
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
                  className="block w-full border rounded p-2"
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
        </section>
        {/* Languages */}
        <div>
          <label className="block mb-1 font-medium">Languages</label>
          <select
            multiple
            value={formData.languages}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                languages: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              }))
            }
            className="block w-full border rounded p-2"
          >
            {[
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
            ].map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded transition-colors"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default CompleteProfile;
