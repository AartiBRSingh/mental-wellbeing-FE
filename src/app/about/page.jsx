"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const AboutPage = () => {
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

  return (
    <div className="bg-transparent text-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-16 my-10">
        {/* Hero Section */}
        <div className="text-center mb-16 ">
          <div className="flex justify-center mb-8">
            <span className="relative text-4xl md:text-4xl xl:text-5xl font-semibold text-stone-800 max-w-full  [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
              About
              <span className="relative text-[#956144] ml-3">
                ShareYrHeart
                <svg
                  className="absolute w-full h-[10px] -bottom-2 left-0"
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
          </div>
          <p className="text-xl text-gray-600 max-w-7xl mx-auto">
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
                className={`bg-white p-6 rounded-2xl duration-300 `}
              >
                <div className="flex justify-center items-center mb-4">
                  <h3 className="text-xl font-semibold">{offering.title}</h3>
                </div>
                <p className="text-gray-700 mt-4">{offering.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center mb-8">
          <span className="relative text-2xl md:text-3xl xl:text-3xl font-semibold text-stone-800 max-w-full  [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
            Why choose
            <span className="relative text-[#956144] ml-3">
              ShareYrHeart
              <svg
                className="absolute w-full h-[10px] -bottom-2 left-0"
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
        </div>

        <section className=" p-6 ">
          <div className="space-y-4">
            <p className="text-gray-700 ml-2">
              If you have any questions about this Privacy Policy, our data
              practices, or would like to exercise your rights, please contact
              us at:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl ">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Global Network of Professionals
                </h3>
                <p className="text-gray-700">
                  Access qualified mental health experts from India and around
                  the world, ensuring you receive the best support no matter
                  where you are located.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Comprehensive Mental Health Solutions
                </h3>
                <p className="text-gray-700">
                  From personalized therapy to well-being programs and
                  educational resources, ShareYrHeart offers a full spectrum of
                  services to support mental health at every stage of life
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl ">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Educational Hub
                </h3>
                <p className="text-gray-700">
                  Stay informed with expert content on psychological disorders,
                  psychotherapy techniques, and the latest research in the field
                  of psychology.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Convenience & Accessibility
                </h3>
                <p className="text-gray-700">
                  Access services and educational content online, giving you the
                  flexibility to seek help or improve your knowledge anytime,
                  anywhere.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl ">
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
          </div>
        </section>

        <section className="bg-cream text-black py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center">
                <Mail className="w-8 h-8 mr-4 text-red-500" />
                <span>support@shareyrheart.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-8 h-8 mr-4 text-blue-500" />
                <span>+91 9874021437</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-8 h-8 mr-4 text-green-500" />
                <span>7B Mysore Road, Kolkata-700026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <div className="text-center mt-16 ">
          <p className="text-2xl text-gray-700 max-w-7xl mx-auto">
            At <span className="font-semibold text-black">ShareYrHeart</span>,
            we are committed to empowering you with the knowledge, tools, and
            professional support you need to understand and manage your mental
            health.
          </p>
          <a
            href="all-courses"
            className="mt-8 inline-block px-8 py-3 bg-slate-400 text-white rounded-full text-lg font-semibold hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
