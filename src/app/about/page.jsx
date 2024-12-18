"use client";
import React, { useState } from "react";

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const offerings = [
    {
      title: "Connect with Mental Health Professionals",
      description:
        "ShareYrHeart connects you to a vast network of licensed mental health professionals across India and globally. Whether you're dealing with anxiety, depression, stress, relationship issues, or any other mental health concern, you can easily book appointments with qualified therapists, psychologists, and counselors who specialize in a variety of therapeutic approaches.",
      color: "bg-pink-50",
      iconBg: "bg-pink-200",
      textColor: "text-pink-600",
    },
    {
      title: "Mental Well-Being Programs",
      description:
        "ShareYrHeart offers tailored mental well-being programs for both employees and students. These programs are designed to improve mental resilience, reduce stress, enhance emotional intelligence, and foster a healthier work-life balance. The programs offer practical tools and techniques to build mental fitness, improve productivity, and support overall well-being.",
      color: "bg-teal-50",
      iconBg: "bg-teal-200",
      textColor: "text-teal-600",
    },
    {
      title: "Self-Understanding Programs",
      description:
        "Gain deeper insights into your own mind and emotions with ShareYrHeart's self-understanding programs. These programs help you explore your psychological patterns, build emotional awareness, and improve self-growth. By understanding your emotions and behaviors, you can make more informed choices and lead a more fulfilling life.",
      color: "bg-indigo-50",
      iconBg: "bg-indigo-200",
      textColor: "text-indigo-600",
    },
    {
      title: "Certificate Courses in Psychology",
      description:
        "ShareYrHeart offers certificate courses in psychology, providing you with an opportunity to deepen your knowledge in areas such as clinical psychology, counseling techniques, mental health interventions, and psychological assessments. These courses are designed for anyone looking to pursue a career in psychology or enhance their existing skill set.",
      color: "bg-purple-50",
      iconBg: "bg-purple-200",
      textColor: "text-purple-600",
    },
  ];

  const reasons = [
    "Global Network of Professionals",
    "Comprehensive Mental Health Solutions",
    "Educational Hub",
    "Convenience & Accessibility",
    "Confidential & Secure",
  ];

  return (
    <div className="bg-transparent text-gray-900">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 transform transition-all duration-300 hover:scale-[1.01]">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            ShareYrHeart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A holistic platform dedicated to your mental health, psychological
            growth, and well-being. Empowering you with knowledge, support, and
            professional guidance.
          </p>
        </div>

        {/* Offerings Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Key Offerings
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
        <section className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-12">
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
