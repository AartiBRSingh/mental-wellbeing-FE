"use client";
import { Content } from "next/font/google";
import React, { useState } from "react";

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const offerings = [
    {
      title: "Mental Health Expert Directory",
      description:
        "ShareYrHeart offers an extensive directory of certified mental health professionals across India. Whether you are seeking therapy, counseling, or expert advice, our platform connects you with specialists who can provide personalized support tailored to your unique needs.",
      color: "bg-pink-50",
      iconBg: "bg-pink-200",
      textColor: "text-pink-600",
    },
    {
      title: "Dedicated Well-Being Services",
      description:
        "Employee Well-Being: Empower your workforce with mental health programs designed to reduce stress, enhance productivity, and promote a healthier work environment // Student Well-Being: Support young minds with tools and resources to manage academic stress, build resilience, and improve focus // Self-Understanding: Gain insights into your mental health through self-assessment tools, workshops, and guided programs that foster personal growth .",
      color: "bg-teal-50",
      iconBg: "bg-teal-200",
      textColor: "text-teal-600",
    },
    {
      title: "Professional Certificate Courses",
      description:
        "Advance your career in mental health with our professional courses, certified by a renowned university. These courses combine theoretical knowledge with practical experience, making them ideal for both aspiring professionals and those seeking to enhance their skills.",
      color: "bg-indigo-50",
      iconBg: "bg-indigo-200",
      textColor: "text-indigo-600",
    },
    {
      title: "Anonymous Discussion Forum",
      description:
        "A safe space for sharing thoughts, experiences, and emotions—whether happy or sad. Our forum allows you to express yourself freely while keeping your identity confidential, fostering open and judgment-free conversations.",
      color: "bg-purple-50",
      iconBg: "bg-purple-200",
      textColor: "text-purple-600",
    },

    {
      title: "24/7 Live Chat with Experts",
      description:
        "Connect with mental health professionals anytime, anywhere, through our live chat service. Our experts are available 24/7 to provide immediate support and guidance, ensuring you're never alone in your mental health journey.",
      color: "bg-purple-50",
      iconBg: "bg-purple-200",
      textColor: "text-purple-600",
    },

    {
      title: "Clinics Across India",
      description:
        "With clinics in multiple locations across India, ShareyRHeart ensures access to in-person mental health services. Our centers provide a range of therapies and interventions to meet the needs of individuals, families, and organizations.",
      color: "bg-purple-50",
      iconBg: "bg-purple-200",
      textColor: "text-purple-600",
    },
  ];

  // const reasons = [
  //   "Global Network of Professionals: Access qualified mental health experts from India and around the world, ensuring you receive the best support no matter where you are located.",

  //   "Comprehensive Mental Health Solutions: From personalized therapy to well-being programs and educational resources, ShareYrHeart offers a full spectrum of services to support mental health at every stage of life.",

  //   "Educational Hub: Stay informed with expert content on psychological disorders, psychotherapy techniques, and the latest research in the field of psychology.",

  //   "Convenience & Accessibility: Access services and educational content online, giving you the flexibility to seek help or improve your knowledge anytime, anywhere.",

  //   "Confidential & Secure: ShareYrHeart prioritizes your privacy with secure platforms for therapy sessions, course enrollment, and payment processing, ensuring a safe and confidential experience.",
  // ];

  return (
    <div className="bg-transparent text-gray-900">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 transform transition-all duration-300 hover:scale-[1.01]">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            ShareYrHeart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ShareYrHeart is a comprehensive mental health platform designed to
            cater to diverse needs with a focus on holistic well-being, personal
            growth, and professional development.
          </p>
        </div>

        {/* Offerings Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Key Features:
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className={`${offering.color} p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl`}
                onClick={() =>
                  setActiveSection(activeSection === index ? null : index)
                }
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`${offering.iconBg} ${offering.textColor} w-12 h-12 rounded-full flex items-center justify-center mr-4`}
                  >
                    <span className="text-2xl font-bold">
                      {offering.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{offering.title}</h3>
                </div>
                {activeSection === index && (
                  <p className="text-gray-700 mt-4 transition-opacity duration-500 ease-in-out">
                    {offering.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        {/* <section className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose ShareYrHeart?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md flex items-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg
                  className="w-8 h-8 text-green-500 mr-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </section> */}

        <section className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Why Choose ShareYrHeart?
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 ml-2">
              If you have any questions about this Privacy Policy, our data
              practices, or would like to exercise your rights, please contact
              us at:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Global Network of Professionals
                </h3>
                <p className="text-gray-700">
                  {" "}
                  Access qualified mental health experts from India and around
                  the world, ensuring you receive the best support no matter
                  where you are located.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Comprehensive Mental Health Solutions
                </h3>
                <p className="text-gray-700">
                  {" "}
                  From personalized therapy to well-being programs and
                  educational resources, ShareYrHeart offers a full spectrum of
                  services to support mental health at every stage of life
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Educational Hub
                </h3>
                <p className="text-gray-700">
                  Stay informed with expert content on psychological disorders,
                  psychotherapy techniques, and the latest research in the field
                  of psychology.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Convenience & Accessibility
                </h3>
                <p className="text-gray-700">
                  Access services and educational content online, giving you the
                  flexibility to seek help or improve your knowledge anytime,
                  anywhere.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Confidential & Secure
                </h3>
                <p className="text-gray-700">
                  ShareYrHeart prioritizes your privacy with secure platforms
                  for therapy sessions, course enrollment, and payment
                  processing, ensuring a safe and confidential experience.
                </p>
              </div>
            </div>
            <p className="mt-2">
              By using ShareYrHeart, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms.
            </p>
          </div>
        </section>

        {/* Closing Statement */}
        <div className="text-center mt-16 transform transition-all duration-300 hover:scale-[1.01]">
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto">
            At <span className="font-bold text-blue-600">ShareYrHeart</span>, we
            are committed to empowering you with the knowledge, tools, and
            professional support you need to understand and manage your mental
            health.
          </p>
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
