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
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-screen-xl mx-auto mt-8 md:mt-16">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between p-4 md:p-10">
          <div className="mt-4 md:mt-14 md:ml-4 lg:ml-20">
            <span className="relative text-4xl md:text-4xl xl:text-6xl font-serif text-stone-800 max-w-full md:max-w-[1000px] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
              <span className="relative">
                Insurance & Pricing
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

            <p className="text-stone-600 text-lg md:text-xl mt-8 md:mt-16 max-w-full md:max-w-[1000px]">
              Comprehensive mental health support tailored to your needs
            </p>
            <p className="text-stone-600 text-lg md:text-xl mt-6 md:mt-10 max-w-full md:max-w-[800px]">
              In India, the Mental Healthcare Act of 2017 mandates that health
              insurance providers cover mental health treatments on par with
              physical ailments. This legislation ensures that mental health
              services, including consultations, therapy sessions,
              hospitalization, and medications, are included in standard health
              insurance policies.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-vector/father-shaking-hands-with-insurance-agent_74855-4412.jpg?t=st=1739079197~exp=1739082797~hmac=3ce7eecc2c59d3358dbe561e259fa608234df7471b4fdec3d81c34e525275a31&w=740"
            alt="Insurance consultation"
            className="w-full md:w-[450px] h-auto md:h-[450px] mt-8 md:mt-0"
          />
        </div>

        {/* Info Box */}
        <div className="mx-4 md:m-16">
          <p className="text-base md:text-lg font-semibold border-l-4 border-blue-700 pl-4 py-6 bg-green-100 mt-6 md:mt-10 rounded-r-xl">
            At ShareYrHeart, we are committed to providing comprehensive mental
            health support to our users. Our services encompass a range of
            treatments and therapies designed to address various mental health
            concerns. To assist our users in navigating their insurance
            coverage, we offer the following support:
          </p>
        </div>

        {/* Center Image */}
        <div className="flex justify-center px-4 md:px-0">
          {/* <img
            src="https://img.freepik.com/free-vector/insurance-concept-illustration_114360-2223.jpg?t=st=1739087384~exp=1739090984~hmac=0eee77cb450ea2b8a6d5c6d70f652160a7f3f0beaaa64100e4b3ad58b622c78c&w=740"
            alt="Insurance consultation"
            className="w-full max-w-[600px] h-auto"
          /> */}
        </div>

        {/* Right Border Info */}
        <p className="text-base md:text-lg font-semibold border-r-4 border-blue-700 pl-4 py-6 bg-green-100 mt-8 md:mt-16 rounded-l-xl mx-4 md:mx-6">
          By aligning our offerings with India mental health insurance policies,
          ShareYrHeart ensures that users receive the necessary support without
          financial constraints, promoting overall well-being and mental health.
        </p>

        {/* Insurance Section */}
        <div className="p-4 md:p-6 mb-8 mt-8">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-stone-800 mb-6 border border-blue-700 max-w-max p-4 rounded-full">
            Insurance Coverage at ShareYrHeart
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg md:text-xl text-stone-700 mb-4">
                Our Commitment
              </h3>
              <p className="text-stone-600 mb-4">
                In accordance with India&apos;s Mental Healthcare Act of 2017,
                we ensure comprehensive coverage for mental health treatments,
                including consultations, therapy sessions, and medications.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    title: "Insurance Guidance",
                    description:
                      "We help users understand their insurance policies and the extent of coverage for mental health treatments.",
                  },
                  {
                    title: "Collaboration with Insurers",
                    description:
                      "We work closely with insurance providers to ensure that our services are recognized and covered under standard health insurance plans.",
                  },
                  {
                    title: "Transparent Billing",
                    description:
                      "Our billing process is transparent, providing detailed invoices that can be submitted to insurance companies for reimbursement.",
                  },
                  {
                    title: "Affordable Services",
                    description:
                      "For users without insurance coverage, we offer services at competitive rates to ensure accessibility.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-700">✓</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-stone-800 font-medium">
                        {item.title}
                      </span>
                      <span className="text-stone-600 text-sm mt-1">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <img
              src="https://img.freepik.com/free-vector/women-walking-umbrella-using-smartphones_1262-21309.jpg?t=st=1739090877~exp=1739094477~hmac=34e076208686579e6ce76c38749fc4994906a85b1fe8f8724adb89e559455c5b&w=740"
              alt="Insurance consultation"
              className="w-full md:w-[450px] h-auto mt-8 md:mt-0 mx-auto"
            />
          </div>

          <div className="bg-green-100 p-6 md:p-8 max-w-max rounded-xl mt-10">
            <h3 className="text-lg md:text-xl font-semibold text-stone-700 mb-4">
              Understanding Your Coverage
            </h3>
            <p className="text-stone-600 mb-4">
              Our team helps you navigate insurance policies to maximize your
              benefits and ensure seamless access to mental health services.
            </p>
            <button className="bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-800 transition-colors">
              Verify Coverage
            </button>
          </div>
        </div>

        {/* Self-Pay Message */}
        <div className="mt-12 md:mt-24 max-w-4xl mx-4 md:ml-32">
          <p className="text-2xl md:text-3xl">
            While many users may opt for insurance coverage, we also offer a
            self-pay option for those who prefer to pay directly for their
            mental health services.
          </p>
        </div>

        {/* Self-Pay Section */}
        <div className="p-4 md:p-6 mb-8 mt-8 md:mt-16">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-stone-800 mb-6 border border-blue-700 max-w-max p-4 rounded-full">
            Self-Pay Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-6">
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
                    <div className="h-6 w-6 shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-700">✓</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-stone-800 font-medium">
                        {benefit.title}
                      </span>
                      <span className="text-stone-600 text-sm mt-1">
                        {benefit.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <img
              src="https://img.freepik.com/free-vector/concept-credit-card-payment-landing-page_52683-24923.jpg?t=st=1739091288~exp=1739094888~hmac=ff9349774dab8f8a44c970b6230500c8af27c7a7e13b6b9a470941334cb41285&w=740"
              alt="Insurance consultation"
              className="w-full md:w-[450px] h-auto mt-8 md:mt-0 mx-auto"
            />
          </div>

          <div className="bg-green-100 p-6 md:p-8 max-w-max rounded-xl mt-10">
            <h3 className="text-lg md:text-xl font-semibold text-stone-700 mb-4">
              Payment Methods
            </h3>
            <p className="text-stone-600 mb-4">
              We accept various payment methods including credit/debit cards,
              UPI, net banking, and digital wallets.
            </p>
            <button className="bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-800 transition-colors">
              View Pricing
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-20 px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-serif text-stone-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
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
                className="px-6 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition-colors duration-300 ease-in-out flex items-center space-x-2 opacity-70 hover:opacity-100"
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

        {/* Support Section */}
        <div className="mt-12 text-center px-4 md:px-0 pb-8">
          <p className="text-stone-600">Need help? Contact our support team</p>
          <button
            className="mt-4 inline-flex items-center text-green-700 hover:text-green-800 cursor-pointer"
            onClick={handleEmailSupport}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceAndPricing;
