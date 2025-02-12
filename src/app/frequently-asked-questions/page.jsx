"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { MessageCircleQuestion } from "lucide-react";

const Page = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${baseURL}/faq`);
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <>
      {/* Background Image */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `url('/faqBG.jpg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.1,
          zIndex: -1,
        }}
      />

      {/* Main Content Wrapper */}
      <div className="min-h-screen">
        <div className="relative">
          {/* Hero Section */}
          <div className="w-full p-6">
            <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm rounded-3xl">
              <div className="flex justify-center">
                <h1 className="text-4xl font-bold text-[#956144] mb-4">
                  Frequently Asked Questions
                </h1>
                <MessageCircleQuestion className="w-10 h-10 ml-4" />
              </div>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our services and
                solutions. Can&apos;t find what you&apos;re looking for? Our
                support team is here to help.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Dynamic FAQs Section */}
            <div>
              <div className="flex gap-2 mb-8 justify-center">
                <h2 className="text-5xl font-semibold text-gray-900">
                  Detailed
                </h2>
                <span className="text-green-500 relative text-4xl md:text-6xl lg:text-4xl block">
                  <span className="relative">
                    FAQ
                    <svg
                      className="absolute w-full h-[6px] bottom-0 left-0"
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

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="space-y-8 ml-32">
                  {Object.entries(groupedFaqs).map(
                    ([category, categoryFaqs]) => (
                      <div key={category} className="space-y-4">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full text-left"
                        >
                          <h3 className="text-2xl font-semibold hover:shadow-xl shadow-lg max-w-xl text-black mb-4 bg-white p-4 rounded-2xl flex items-center">
                            {category}
                            <svg
                              className={`h-6 w-6 ml-2 transform transition-transform duration-200 ${
                                activeCategory === category ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </h3>
                        </button>

                        <div
                          className={`space-y-4 transition-all duration-300 ${
                            activeCategory === category ? "block" : "hidden"
                          }`}
                        >
                          {categoryFaqs.map((faq, index) => (
                            <div
                              key={faq._id}
                              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                            >
                              <button
                                className="w-full text-left p-6 focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="text-lg font-medium text-gray-900">
                                    {faq.question}
                                  </h4>
                                  <span className="ml-6 flex-shrink-0">
                                    <svg
                                      className={`h-6 w-6 text-gray-500 transform transition-transform duration-200 ${
                                        activeIndex === index
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </button>
                              <div
                                className={`overflow-hidden transition-all duration-300 ${
                                  activeIndex === index ? "max-h-96" : "max-h-0"
                                }`}
                              >
                                <div className="px-6 pb-6">
                                  <p className="text-gray-600">{faq.answer}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
