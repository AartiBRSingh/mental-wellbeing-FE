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
  NotebookPen,
} from "lucide-react";
import { baseURL } from "@/app/baseURL";
import Link from "next/link";

import ReviewButton from "@/app/components/ReviewButton";
import ConsultQNA from "@/app/components/ConsultQNA";
import JournalsExpert from "@/app/components/JournalsExpert";

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
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl text-center">Error loading expert details</p>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl text-center">Expert not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo Section */}
      <div className="w-full h-48 sm:h-64 md:h-96 relative">
        <img
          src={expert?.coverPhoto || "/api/placeholder/1200/400"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 md:-mt-32 relative">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Image and Rating */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={expert?.image}
                  alt={expert?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center bg-white shadow-md rounded-full px-3 mt-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < expert?.rating
                        ? "text-yellow-500 fill-current"
                        : "text-yellow-500 fill-current"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Expert Info */}
            <div className="flex-1">
              <div className="text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {expert?.name}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mt-2">
                  {expert?.userType}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Experience:{" "}
                  <span className="font-semibold">
                    {new Date(expert?.experience[0]?.endDate).getFullYear() -
                      new Date(
                        expert?.experience[0]?.startDate
                      ).getFullYear()}{" "}
                    years
                  </span>
                </p>
              </div>

              {/* Verification Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                {expert?.paymentDetails.hasPaid && (
                  <>
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium space-x-2 shadow-sm">
                      <span>SYH Assured</span>
                      <Check
                        className="w-4 h-4 text-green-600"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium space-x-2 shadow-sm">
                      <span>Medical Registration Verified</span>
                      <Check
                        className="w-4 h-4 text-green-600"
                        strokeWidth={3}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6">
                {expert?.paymentDetails.hasPaid ? (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <Phone className="w-5 h-5" />
                      <span>Call</span>
                    </button>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors">
                      <NotebookPen className="w-5 h-5" />
                      <span>Book</span>
                    </button>
                    <button className="flex items-center gap-2 bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat</span>
                    </button>
                    <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                      <Video className="w-5 h-5" />
                      <span>Video</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-center lg:text-left">
                    <XCircle className="w-5 h-5" />
                    Expert not verified. Chat and video consultation
                    unavailable.
                  </div>
                )}
              </div>
            </div>

            {/* Clinic Info Card */}
            <div className="w-full lg:w-96 mt-6 lg:mt-0 bg-cream-50 rounded-2xl shadow-2xl overflow-hidden border-2 border-green-800/10">
              <div className="bg-brown-700 text-cream-100 p-4 sm:p-5 flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-semibold tracking-wide">
                  Expert&apos;s Clinic
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-green-300"
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

              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <p className="text-brown-800">{expert?.clinicAddress}</p>
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
                    Consultation Fee: ₹{expert?.fees}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="text-green-900 font-semibold mb-2">
                    Clinic Timings
                  </h4>
                  <p className="text-brown-700">Monday - Friday</p>
                  <p className="text-brown-700">9:00 AM - 5:00 PM</p>
                </div>

                <button className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold tracking-wider">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mt-6 border-b border-gray-200 overflow-x-auto">
            <div className="flex space-x-6 min-w-max pb-1">
              <Link
                href={`?tab=info`}
                className={`pb-2 cursor-pointer whitespace-nowrap ${
                  activeTab === "info"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Info
              </Link>
              <Link
                href={`?tab=reviews`}
                className={`pb-2 cursor-pointer whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Reviews
              </Link>
              <Link
                href={`?tab=consultations`}
                className={`pb-2 cursor-pointer whitespace-nowrap ${
                  activeTab === "consultations"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Consult Q/A
              </Link>
              <Link
                href={`?tab=journal`}
                className={`pb-2 cursor-pointer whitespace-nowrap ${
                  activeTab === "journal"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Journal
              </Link>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "info" && (
              <div className="space-y-8">
                {expert?.about && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                      About
                    </h2>
                    <p className="text-gray-700">{expert?.about}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Specializations */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6" />
                      Specializations
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {expert?.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6" />
                      Services
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {expert?.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Education */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6" />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {expert?.education?.map((edu, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">
                            {edu?.school}
                          </h3>
                          <p className="text-gray-600">
                            {edu?.degree} in {edu?.fieldOfStudy}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(edu?.startDate).getFullYear()} -{" "}
                            {new Date(edu?.endDate).getFullYear()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="w-6 h-6" />
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {expert?.experience.map((exp, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <p className="text-gray-600">{exp.location}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).getFullYear()} -{" "}
                            {new Date(exp.endDate).getFullYear()}
                          </p>
                          <p className="text-gray-700 mt-2">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Languages className="w-6 h-6" />
                      Languages
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {expert?.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Licenses & Certificates */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <Medal className="w-6 h-6" />
                      Licenses & Certificates
                    </h2>
                    <div className="space-y-4">
                      {expert?.licensesAndCertificates.map((cert, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">{cert.name}</h3>
                          <p className="text-gray-600">
                            {cert.issuingOrganization}
                          </p>
                          <p className="text-sm text-gray-500">
                            Issued:{" "}
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Credential ID: {cert.credentialId}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {expert?.recommendations?.length > 0 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      Recommendations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {expert?.recommendations.map((rec, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700">{rec.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center my-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
                    Reviews
                  </h2>
                  <ReviewButton expertId={id} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expert?.reviews.length > 0 ? (
                    expert?.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 sm:p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
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
                            <p className="text-gray-600 text-sm">
                              {review.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No reviews available.</p>
                  )}
                </div>
              </div>
            )}

            {/* Consultations Tab */}
            {activeTab === "consultations" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Consultations
                </h2>
                <div className="bg-white rounded-lg shadow-sm">
                  {/* <ConsultQNA /> */}
                </div>
              </div>
            )}

            {/* Journal Tab */}
            {activeTab === "journal" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Journal
                </h2>
                <div className="bg-white rounded-lg shadow-sm">
                  {/* <JournalsExpert /> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertDetailsPage;
