import React from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Book,
  Languages,
  Briefcase,
  GraduationCap,
  Medal,
  FileText,
  Heart,
  MessageCircle,
  Video,
  XCircle,
} from "lucide-react";
import { baseURL } from "@/app/baseURL";

async function ExpertDetailsPage({ params }) {
  let expert = null;
  const { id } = await params;
  try {
    const response = await axios.get(`${baseURL}/get-expert/${id}`);
    expert = response.data;
  } catch (error) {
    console.error("Error fetching expert:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Error loading expert details</p>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Expert not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-96 relative">
        <img
          src={expert.coverPhoto || "/api/placeholder/1200/400"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto px-4 -mt-32 relative">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={expert.image || "/api/placeholder/160/160"}
                alt={expert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{expert.name}</h1>
                {expert.isProfileVerified && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600 mt-2">{expert.userType}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span>{expert.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span>{expert.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>{`${expert.city}, ${expert.state}`}</span>
                </div>
              </div>
              <div className="mt-6">
                {expert.isProfileVerified ? (
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      Chat with Expert
                    </button>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      <Video className="w-5 h-5" />
                      Video Consultation
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
                    <XCircle className="w-5 h-5" />
                    Expert not verified. Chat and video consultation
                    unavailable.
                  </div>
                )}
              </div>
            </div>
          </div>
          {expert.about && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">{expert.about}</p>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {expert.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {expert.services.map((service, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Education
              </h2>
              {expert.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.school}</h3>
                  <p className="text-gray-600">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).getFullYear()} -{" "}
                    {new Date(edu.endDate).getFullYear()}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                Experience
              </h2>
              {expert.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.location}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).getFullYear()} -{" "}
                    {new Date(exp.endDate).getFullYear()}
                  </p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Languages className="w-6 h-6" />
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {expert.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Medal className="w-6 h-6" />
                Licenses & Certificates
              </h2>
              {expert.licensesAndCertificates.map((cert, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuingOrganization}</p>
                  <p className="text-sm text-gray-500">
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Credential ID: {cert.credentialId}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {expert.recommendations.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Recommendations
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {expert.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{rec.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpertDetailsPage;
