"use client";
import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    information: false,
    usage: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-white/80 italic">
            Effective Date: December 7th, 2024 (Last Updated)
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Introduction */}
          <section className="bg-blue-50/50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              ShareYrHeart (`&ldquo;`we`&ldquo;`, `&ldquo;`us`&ldquo;`,
              `&ldquo;`our`&ldquo;`) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, store, and
              safeguard the personal information of our users, including
              patients and mental health professionals (`&ldquo;`you`&ldquo;` or
              `&ldquo;`users`&ldquo;`), when you use our website or platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div
              onClick={() => toggleSection("information")}
              className="bg-purple-50/50 p-6 rounded-2xl cursor-pointer hover:bg-purple-100/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Information We Collect
                </h2>
                <svg
                  className={`w-6 h-6 text-purple-600 transform transition-transform duration-300 ${
                    expandedSections.information ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              {expandedSections.information && (
                <div className="mt-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Patients
                      </h3>
                      <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Full name, email address, phone number</li>
                        <li>
                          Health-related information (symptoms, therapy needs)
                        </li>
                        <li>Appointment history, feedback, reviews</li>
                        <li>Other details shared during interactions</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Mental Health Professionals
                      </h3>
                      <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Full name, title, qualifications</li>
                        <li>Contact information (email, phone)</li>
                        <li>Payment details (compensation)</li>
                        <li>
                          Profile picture, practice information, availability
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="bg-blue-100 p-4 rounded-2xl text-blue-800">
                      Payment information is handled by a secure third-party
                      processor. We do not store it directly.
                    </p>
                    <p className="bg-green-100 p-4 rounded-2xl text-green-800">
                      We also collect technical data (IP address, browser type)
                      to improve the platform. Cookies are used for tracking and
                      improving your experience.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div
              onClick={() => toggleSection("usage")}
              className="bg-teal-50/50 p-6 rounded-2xl cursor-pointer hover:bg-teal-100/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  How We Use Your Information
                </h2>
                <svg
                  className={`w-6 h-6 text-teal-600 transform transition-transform duration-300 ${
                    expandedSections.usage ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              {expandedSections.usage && (
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                  <ul className="space-y-3 text-gray-700 list-disc pl-5">
                    <li>
                      Connecting patients with professionals and managing
                      appointments
                    </li>
                    <li>Account management and support</li>
                    <li>Processing payments for services</li>
                    <li>Improving the platform and user experience</li>
                    <li>
                      Sending relevant communication & responding to inquiries
                    </li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Contact Us */}
          <section className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Contact Us
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                If you have any questions, please contact us at:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-blue-600">support@shareyrheart.com</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                  <p className="text-green-600">+91 9874021437</p>
                </div>
                <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow-md">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Mailing Address
                  </h3>
                  <p className="text-gray-700">
                    7B, Mysore Road, Rashbehari Avenue, Kolkata-700026. INDIA
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
