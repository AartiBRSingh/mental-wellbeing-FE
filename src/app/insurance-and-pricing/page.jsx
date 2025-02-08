"use client";
import React, { useState } from "react";
import { Shield, CreditCard, HelpCircle, ChevronDown } from "lucide-react";

const InsuranceAndPricing = () => {
  const [activeTab, setActiveTab] = useState("insurance");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-stone-800 mb-4">
            Insurance & Pricing
          </h1>
          <p className="text-stone-600 text-lg">
            Comprehensive mental health support tailored to your needs
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="grid grid-cols-2 bg-amber-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("insurance")}
              className={`py-3 px-4 rounded-md flex items-center justify-center transition-all ${
                activeTab === "insurance"
                  ? "bg-green-700 text-white"
                  : "text-stone-600 hover:text-stone-800"
              }`}
            >
              <Shield className="mr-2 h-4 w-4" />
              Insurance Coverage
            </button>
            <button
              onClick={() => setActiveTab("self-pay")}
              className={`py-3 px-4 rounded-md flex items-center justify-center transition-all ${
                activeTab === "self-pay"
                  ? "bg-green-700 text-white"
                  : "text-stone-600 hover:text-stone-800"
              }`}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Self-Pay Options
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "insurance" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-serif text-stone-800 mb-6">
                Insurance Coverage at ShareYrHeart
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-stone-700 mb-4">
                    Our Commitment
                  </h3>
                  <p className="text-stone-600 mb-4">
                    In accordance with India&apos;s Mental Healthcare Act of
                    2017, we ensure comprehensive coverage for mental health
                    treatments, including consultations, therapy sessions, and
                    medications.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Insurance Guidance",
                      "Collaboration with Insurers",
                      "Transparent Billing",
                      "Affordable Services",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                          <span className="text-green-700">✓</span>
                        </div>
                        <span className="text-stone-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl text-stone-700 mb-4">
                    Understanding Your Coverage
                  </h3>
                  <p className="text-stone-600 mb-4">
                    Our team helps you navigate insurance policies to maximize
                    your benefits and ensure seamless access to mental health
                    services.
                  </p>
                  <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors">
                    Verify Coverage
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "self-pay" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-serif text-stone-800 mb-6">
                Self-Pay Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4">
                    {[
                      "Immediate Access",
                      "Complete Privacy",
                      "Flexible Payment Options",
                      "No Hidden Costs",
                      "Customized Care",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                          <span className="text-green-700">✓</span>
                        </div>
                        <span className="text-stone-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl text-stone-700 mb-4">
                    Payment Methods
                  </h3>
                  <p className="text-stone-600 mb-4">
                    We accept various payment methods including credit/debit
                    cards, UPI, net banking, and digital wallets.
                  </p>
                  <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors">
                    View Pricing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif text-stone-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="bg-white/80 rounded-lg divide-y divide-stone-200">
            {[
              {
                question:
                  "Does ShareYrHeart accept insurance for mental health services?",
                answer:
                  "Yes, ShareYrHeart supports mental health insurance coverage as per India's Mental Healthcare Act of 2017. We recommend checking with your insurance provider for specific coverage details.",
              },
              {
                question:
                  "What if my insurance does not cover mental health treatments?",
                answer:
                  "If your insurance does not cover mental health treatments, you can opt for our self-pay option, which allows you to pay directly for services with flexible payment plans.",
              },
              {
                question: "What is the cancellation policy at ShareYrHeart?",
                answer:
                  "Cancellations must be made at least 24 hours in advance to avoid penalties. For therapy sessions or programs, specific terms apply and are provided at the time of booking.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left text-stone-800 hover:text-stone-900"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-2 text-stone-600 transition-all duration-200 ${
                    openFaq === index ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <p className="text-stone-600">Need help? Contact our support team</p>
          <button className="mt-4 inline-flex items-center text-green-700 hover:text-green-800">
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceAndPricing;
