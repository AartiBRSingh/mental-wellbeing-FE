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
  Check,
  Star,
  User,
} from "lucide-react";
import { baseURL } from "@/app/baseURL";
import Link from "next/link";

async function ExpertDetailsPage({ params, searchParams }) {
  let expert = null;
  const { id } = await params;
  const tabs = await searchParams;
  const activeTab = tabs.tab;
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center bg-white shadow-md rounded-full px-3">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < expert.rating
                          ? "text-yellow-500 fill-current"
                          : "text-yellow-500 fill-current"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{expert.name}</h1>
                </div>
                <p className="text-xl text-gray-600 mt-2">{expert.userType}</p>
                {/* <div className="flex flex-wrap gap-4 mt-4">
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
              </div> */}

                {expert.paymentDetails.hasPaid === true && (
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium space-x-2 shadow-sm">
                    <span>SYH Assured</span>
                    <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Experience:{" "}
                  <span className="font-semibold">
                    {new Date(expert.experience[0].endDate).getFullYear() -
                      new Date(
                        expert.experience[0].startDate
                      ).getFullYear()}{" "}
                    years
                  </span>
                </p>

                <div className="mt-6">
                  {expert.paymentDetails.hasPaid === true ? (
                    <div className="flex gap-4 w-full overflow-x-auto pb-2 flex-wrap">
                      <button className="cursor-pointer group flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                        <span className="whitespace-nowrap">Call</span>
                      </button>
                      <button className="cursor-pointer group flex-shrink-0 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        <Video className="w-5 h-5 group-hover:animate-pulse" />
                        <span className="whitespace-nowrap">Book</span>
                      </button>
                      <button className="cursor-pointer group flex-shrink-0 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                        <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                        <span className="whitespace-nowrap">Live Chat</span>
                      </button>
                      <button className="cursor-pointer group flex-shrink-0 flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                        <Video className="w-5 h-5 group-hover:animate-pulse" />
                        <span className="whitespace-nowrap">
                          Video Consultation
                        </span>
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
            <div className="w-96 bg-cream-50 rounded-2xl shadow-2xl overflow-hidden border-2 border-green-800/10">
              <div className="bg-brown-700 text-cream-100 p-5 flex justify-between items-center">
                <h3 className="text-xl font-semibold tracking-wide">
                  Expert&apos;s Clinic
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-700 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-brown-800">{expert.clinicAddress}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-700 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-brown-800">
                    Consultation Fee: ₹{expert.fees}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="text-green-900 font-semibold mb-2">
                    Clinic Timings
                  </h4>
                  <p className="text-brown-700">Monday - Friday</p>
                  <p className="text-brown-700">9:00 AM - 5:00 PM</p>
                </div>

                <button className="w-full bg-green-700 text-cream-50 py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold tracking-wider">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 border-b border-gray-200">
            <div className="flex space-x-6">
              <Link
                href={`?tab=info`}
                className={`pb-2 cursor-pointer ${
                  activeTab === "info"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Info
              </Link>
              <Link
                href={`?tab=reviews`}
                className={`pb-2 cursor-pointer ${
                  activeTab === "reviews"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Reviews
              </Link>
              <Link
                href={`?tab=consultations`}
                className={`pb-2 cursor-pointer ${
                  activeTab === "consultations"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Consultations
              </Link>
            </div>
          </div>
          {activeTab === "info" ? (
            <div>
              {" "}
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
                      <p className="text-gray-600">
                        {cert.issuingOrganization}
                      </p>
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
          ) : activeTab === "reviews" ? (
            <div>
              <h2 className="text-2xl font-semibold my-4">Reviews</h2>
              {expert.reviews.length > 0 ? (
                expert.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-3">
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <User className="text-blue-500" size={24} />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {review.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{review.name}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold my-4">Consultations</h2>
              <p>No consultations available!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpertDetailsPage;
