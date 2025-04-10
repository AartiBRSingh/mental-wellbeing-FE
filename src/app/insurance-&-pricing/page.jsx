"use client";
import React, { useState } from "react";
import { Shield, CreditCard, HelpCircle, ChevronDown } from "lucide-react";

const InsuranceAndPricing = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleFaqs, setVisibleFaqs] = useState(2);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleViewMore = () => {
    setVisibleFaqs(visibleFaqs === 2 ? faqList.length : 2);
  };

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

  const faqList = [
    {
      question:
        "Does ShareYrHeart accept insurance for mental health services?",
      answer:
        "Yes, ShareYrHeart supports mental health insurance coverage as per India's Mental Healthcare Act of 2017. We recommend checking with your insurance provider for specific coverage details.",
    },
    {
      question: "How do I know if my insurance covers my therapy or treatment?",
      answer:
        "You can check with your insurance provider or contact our support team for assistance in understanding whether your policy covers consultations, therapy sessions, or psychiatric treatments.",
    },
    {
      question: "Do I need pre-approval from my insurance provider?",
      answer:
        "Some insurance providers may require pre-approval for mental health services. We recommend reaching out to your insurer to confirm their process.",
    },
    {
      question: "What if my insurance does not cover mental health treatments?",
      answer:
        "If your insurance does not cover mental health treatments, you can opt for our self-pay option, which allows you to pay directly for services with flexible payment plans.",
    },
    {
      question: "What is self-pay at ShareYrHeart, and how does it work?",
      answer:
        "Self-pay at ShareYrHeart means you pay directly for your mental health services without involving an insurance provider. This allows you to access treatment immediately, maintain privacy, and choose services without insurance limitations.",
    },
    {
      question: "What payment methods does ShareYrHeart accept?",
      answer:
        "We accept various payment methods, including credit/debit cards, UPI, net banking, and digital wallets for self-pay users.",
    },
    {
      question: "Are there any hidden charges in self-pay at ShareYrHeart?",
      answer:
        "No, we maintain complete transparency in pricing. The cost of each session or service at ShareYrHeart will be clearly mentioned before you proceed with payment.",
    },
    {
      question: "What is the cancellation policy at ShareYrHeart?",
      answer:
        "If your insurance does not cover mental health treatments, you can opt for our self-pay option, which allows you to pay directly for services with flexible payment plans.",
    },
    {
      question: "Can I reschedule my appointment instead of canceling?",
      answer:
        "Yes, appointments can be rescheduled up to 24 hours before the session without any additional charges.",
    },
    {
      question: "Will I get a refund if I cancel my appointment?",
      answer:
        "Refund policies depend on the type of service booked. If eligible, refunds will be processed as per our terms and conditions.",
    },
  ];

  return (
    <div className="min-h-scree p-4 md:p-8">
      <div className="max-w-7xl mx-auto mt-8 md:mt-16">
        <div className="flex justify-center ">
          <span className="relative text-4xl md:text-4xl xl:text-5xl font-serif text-stone-800 max-w-full md:max-w-[1000px] block">
            Insurance &
            <span className="relative text-[#956144] ml-3">
              Pricing
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

        <div className="bg-white p-8 rounded-3xl mt-8">
          <p className="text-black text-lg md:text-lg  max-w-full md:max-w-full">
            In India, the Mental Healthcare Act of 2017 mandates that health
            insurance providers cover mental health treatments on par with
            physical ailments. This legislation ensures that mental health
            services, including consultations, therapy sessions,
            hospitalization, and medications, are included in standard health
            insurance policies.
          </p>
          <p className="text-base md:text-lg    mt-6 md:mt-10 rounded-r-xl">
            At ShareYrHeart, we are committed to providing comprehensive mental
            health support to our users. Our services encompass a range of
            treatments and therapies designed to address various mental health
            concerns.
          </p>
        </div>

        <p className="text-base md:text-xl font-semibold py-6 mt-4  rounded-l-xl mx-4 md:mx-6">
          To assist our users in navigating their insurance coverage, we offer
          the following support:
        </p>

        <div className="flex gap-8 mt-6 justify-center">
          <div className="bg-white p-8 rounded-lg shadow-sm w-full">
            <div className="flex justify-center mb-3">
              <img
                src="/insurance-broker.png"
                alt="Benefits Icon"
                className="w-24 h-24"
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <h3 className="text-lg font-medium text-gray-800">
                Insurance Guidance
              </h3>
            </div>
            <div className="flex justify-center items-center gap-3">
              <p className="text-gray-600 leading-relaxed text-sm mt-2">
                We help users understand their insurance policies and the extent
                of coverage for mental health treatments.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm w-full">
            <div className="flex justify-center mb-3">
              <img
                src="/collaboration.png"
                alt="Benefits Icon"
                className="w-24 h-24"
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <h3 className="text-lg font-medium text-gray-800">
                Collaboration
              </h3>
            </div>
            <div className="flex justify-center items-center gap-3">
              <p className="text-gray-600 leading-relaxed text-sm mt-2">
                We work closely with insurance providers to ensure that our
                services are recognized and covered under standard health
                insurance plans.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm w-full">
            <div className="flex justify-center mb-3">
              <img src="/bill.png" alt="Benefits Icon" className="w-24 h-24" />
            </div>
            <div className="flex justify-center items-center gap-3">
              <h3 className="text-lg font-medium text-gray-800">
                Transparent Billing
              </h3>
            </div>
            <div className="flex justify-center items-center gap-3">
              <p className="text-gray-600 leading-relaxed text-sm mt-3">
                Our billing process is transparent, providing detailed invoices
                that can be submitted to insurance companies for reimbursement.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm w-full">
            <div className="flex justify-center mb-3">
              <img
                src="/funding.png"
                alt="Benefits Icon"
                className="w-24 h-24"
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <h3 className="text-lg font-medium text-gray-800">
                Affordable Services
              </h3>
            </div>
            <div className="flex justify-center items-center gap-3">
              <p className="text-gray-600 leading-relaxed text-sm mt-5">
                For users without insurance coverage, we offer services at
                competitive rates to ensure accessibility.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-16 max-w-full mx-auto text-center px-4 md:px-0">
          <p className="text-base md:text-lg text-gray-600 py-6  rounded-l-xl mx-4 md:mx-6">
            By aligning our offerings with India mental health insurance
            policies, ShareYrHeart ensures that users receive the necessary
            support without financial constraints, promoting overall well-being
            and mental health.
          </p>
        </div>

        {/* Self-Pay Message */}
        <div className="mt-12 md:mt-16 max-w-full mx-auto text-center px-4 md:px-0">
          <p className="text-xl md:text-xl font-semibold">
            Many users may opt for insurance coverage, we also offer a self-pay
            option for those who prefer to pay directly for their services.
          </p>
        </div>

        {/* Self-Pay Section */}
        <div className="p-4 md:p-6 mb-8 mt-8 md:mt-16 bg-white rounded-3xl shadow-md">
          <div className="flex justify-center ">
            <span className="relative text-4xl md:text-4xl xl:text-3xl font-serif text-black max-w-full md:max-w-[1000px] block">
              Self-Pay
              <span className="relative text-[#956144] ml-3">
                Benefits
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
          <div className=" gap-8">
            <div>
              <ul className="space-y-6 mt-5">
                {[
                  {
                    title: "Immediate Access",
                    description:
                      "No need to go through insurance approvals—get the help you need right away.",
                  },
                  {
                    title: "Complete Privacy",
                    description:
                      "Your mental health records remain confidential, with no reports sent to insurance providers.",
                  },
                  {
                    title: "Flexible Payment Options",
                    description:
                      "Pay per session or choose from our affordable therapy packages.",
                  },
                  {
                    title: "No Hidden Costs",
                    description:
                      "Transparent pricing with no additional or unexpected fees.",
                  },
                  {
                    title: "Customized Care",
                    description:
                      "Choose the expert and service that best fits your needs without insurance restrictions.",
                  },
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 shrink-0 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-700">
                        <img
                          src="/check-mark.png"
                          alt="Benefits Icon"
                          className="w-6 h-6 mr-2 mt-1"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-stone-800 font-medium">
                        {benefit.title}
                      </span>
                      <span className="text-stone-600 text-sm mt-1 ml-4">
                        {benefit.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <p className=" font-medium text-black mt-12 text-center">
                  Self-pay ensures greater flexibility and control over your
                  mental health journey, allowing you to prioritize well-being
                  on your own terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="m-2 flex justify-center">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
            Get Started
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-20 px-4 md:px-0">
          <div className="flex justify-center">
            <span className="relative text-2xl md:text-3xl xl:text-3xl font-semibold text-stone-800 max-w-full   block">
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
          </div>
          <div className="bg-white/80 rounded-lg divide-y divide-stone-200 mt-8 md:mt-16">
            {faqList.slice(0, visibleFaqs).map((faq, index) => (
              <div key={index} className="p-4 md:p-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left text-stone-800 hover:text-stone-900"
                >
                  <span className="font-semibold text-sm md:text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      openFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-4 text-xs text-stone-600 transition-all duration-200 ${
                    openFaq === index ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          {faqList.length > 2 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={toggleViewMore}
                className="px-6 py-2 text-blue-600 flex items-center text-base space-x-2 opacity-100 hover:opacity-100"
              >
                <span>{visibleFaqs === 2 ? "View More" : "View Less"}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    visibleFaqs > 2 ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Support Section */}
      <div className="mt-12 text-center px-4 md:px-0 ">
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
  );
};

export default InsuranceAndPricing;
