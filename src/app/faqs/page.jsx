"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";

const handleEmailSupport = () => {
  const email = "support@shareyrheart.com";
  const subject = "Support Request";

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}`,
    "_blank"
  );
};

const Page = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${baseURL}/faq`);
        const sortedFaqs = response.data.sort((a, b) =>
          a.question.localeCompare(b.question)
        );
        setFaqs(sortedFaqs);
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

  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const sortedCategories = Object.entries(groupedFaqs).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <>
      <div className="min-h-screen mt-10">
        <div className="relative">
          <div className="w-full p-6">
            <div className="max-w-7xl mx-auto  text-center rounded-3xl">
              <div className="flex justify-center mb-8">
                <span className="relative text-4xl md:text-4xl xl:text-5xl font-serif text-stone-800 max-w-full md:max-w-[1000px] block">
                  Frequently Asked
                  <span className="relative text-[#956144] ml-3">
                    Questions
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
                <MessageCircleQuestion className="w-14 h-14 text-[#956144] xl:ml-4" />
              </div>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our services and
                solutions. Can&apos;t find what you&apos;re looking for? Our
                support team is here to help.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-6">
            <div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedCategories.map(([category, categoryFaqs]) => (
                    <div key={category} className="space-y-4">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full"
                      >
                        <h3 className="xl:text-3xl text-lg font-semibold hover:shadow-xl shadow-lg mx-auto max-w-xl text-black xl:mb-4  bg-white p-4 rounded-2xl flex items-center justify-center">
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
                            className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-2xl mx-auto"
                          >
                            <button
                              className="w-full text-left p-6 focus:outline-none"
                              onClick={() => toggleFAQ(index)}
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="text-xl font-medium text-gray-900">
                                  {faq.question}
                                </h4>
                                <span className="ml-6 flex-shrink-0">
                                  <svg
                                    className={`h-6 w-6 text-gray-500 transform transition-transform duration-200 ${
                                      activeIndex === index ? "rotate-180" : ""
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Support Section */}
        <div className="mt-12 text-center px-4 md:px-0 pb-8">
          <p className="text-stone-600">Need help? Contact our support team</p>
          <button
            className="mt-4 inline-flex items-center text-blue-700 hover:text-blue-800 cursor-pointer"
            onClick={handleEmailSupport}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Support
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
