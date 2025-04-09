"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const AboutPage = () => {
  const offerings = [
    {
      title: "Mental Well-Being",
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium">Employee Well-Being:</span> Empower
            your workforce with mental health programs designed to reduce
            stress, enhance productivity, and promote a healthier work
            environment
          </li>
          <li>
            <span className="font-medium">Student Well-Being:</span> Support
            young minds with tools and resources to manage academic stress,
            build resilience, and improve focus
          </li>
          <li>
            <span className="font-medium">Self-Understanding:</span> Gain
            insights into your mental health through self-assessment tools,
            workshops, and guided programs that foster personal growth
          </li>
        </ul>
      ),
      color: "bg-teal-50",
      iconBg: "bg-teal-200",
      textColor: "text-teal-600",
    },
    {
      title: "Clinics ",
      description:
        "With clinics in multiple locations across India, ShareyRHeart ensures access to in-person mental health services. Our centers provide a range of therapies and interventions to meet the needs of individuals, families, and organizations.",
      color: "bg-purple-50",
      iconBg: "bg-purple-200",
      textColor: "text-purple-600",
    },
    {
      title: "Courses",
      description:
        "Advance your career in mental health with our professional courses, certified by a renowned university. These courses combine theoretical knowledge with practical experience, making them ideal for both aspiring professionals and those seeking to enhance their skills.",
      color: "bg-indigo-50",
      iconBg: "bg-indigo-200",
      textColor: "text-indigo-600",
    },
    {
      title: "Directory",
      description:
        "ShareYrHeart offers an extensive directory of certified mental health professionals across India. Whether you are seeking therapy, counseling, or expert advice, our platform connects you with specialists who can provide personalized support tailored to your unique needs.",
      color: "bg-pink-50",
      iconBg: "bg-pink-200",
      textColor: "text-pink-600",
    },

    {
      title: "Forum",
      description:
        "A safe space for sharing thoughts, experiences, and emotions—whether happy or sad. Our forum allows you to express yourself freely while keeping your identity confidential, fostering open and judgment-free conversations.",
      color: "bg-purple-50",
      iconBg: "bg-purple-200",
      textColor: "text-purple-600",
    },
    {
      title: "Live Chat",
      description:
        "Connect with mental health professionals anytime, anywhere, through our live chat service. Our experts are available 24/7 to provide immediate support and guidance, ensuring you're never alone in your mental health journey.",
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
            <span className="relative text-4xl md:text-4xl xl:text-5xl font-semibold text-stone-800 max-w-full   block">
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
          <p className="text-3xl text-gray-700 max-w-7xl mx-auto">
            ShareYrHeart is a comprehensive mental health platform designed to
            cater to diverse needs with a focus on holistic well-being, personal
            growth, and professional development.
          </p>
        </div>

        {/* Offerings Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
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
          <span className="relative text-2xl md:text-3xl xl:text-3xl font-semibold text-stone-800 max-w-full  block">
            Why choose
            <span className="relative text-[#956144] ml-3">
              ShareYrHeart?
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

        <section>
          <div className=" rounded-2xl cursor-pointer min-w-7xl max-w-7xl mb-6 mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <ul className="space-y-6">
                <li className="flex items-start space-x-3">
                  <div className="flex justify-center ">
                    <img
                      src="/check-mark.png"
                      alt="Benefits Icon"
                      className="w-6 h-6 mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        Global Network of Professionals:
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Access qualified mental health experts from India and
                        around the world, ensuring you receive the best support
                        no matter where you are located.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex justify-center ">
                    <img
                      src="/check-mark.png"
                      alt="Benefits Icon"
                      className="w-6 h-6 mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium  text-gray-800">
                        Comprehensive Mental Health Solutions:
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        From personalized therapy to well-being programs and
                        educational resources, ShareYrHeart offers a full
                        spectrum of services to support mental health at every
                        stage of life.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex justify-center ">
                    <img
                      src="/check-mark.png"
                      alt="Benefits Icon"
                      className="w-6 h-6 mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        Educational Hub:
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Stay informed with expert content on psychological
                        disorders, psychotherapy techniques, and the latest
                        research in the field of psychology.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex justify-center ">
                    <img
                      src="/check-mark.png"
                      alt="Benefits Icon"
                      className="w-6 h-6 mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        Convenience & Accessibility:
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Access services and educational content online, giving
                        you the flexibility to seek help or improve your
                        knowledge anytime, anywhere.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex justify-center ">
                    <img
                      src="/check-mark.png"
                      alt="Benefits Icon"
                      className="w-6 h-6 mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium  text-gray-800">
                        Confidential & Secure
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        ShareYrHeart prioritizes your privacy with secure
                        platforms for therapy sessions, course enrollment, and
                        payment processing, ensuring a safe and confidential
                        experience
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl max-w-7xl text-black pt-7 pb-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <span className="relative text-2xl md:text-3xl xl:text-3xl font-semibold text-stone-800 max-w-full block">
                Contact
                <span className="relative text-[#956144] ml-3">
                  Us
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex text-lg items-center justify-center">
                <Mail className="w-8 h-8 mr-4 text-blue-500" />
                <span className="">support@shareyrheart.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-8 h-8 mr-4 text-green-500" />
                <span>+91 9874021437</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-8 h-8 mr-4 text-red-500" />
                <span>7B Mysore Road, Kolkata-700026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <div className="text-center mt-10  ">
          <a
            href="https://shareyrheart.com/"
            className="mt-8 inline-block px-8 py-3 bg-orange-600 text-white rounded-2xl text-lg font-semibold"
          >
            Start Your Journey
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="mb-10 text-lg text-gray-600">
          Service by Preash Health & Hygiene Pvt Ltd
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
