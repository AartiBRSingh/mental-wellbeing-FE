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
              ShareYrHeart (we, us, our) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, store,
              and safeguard the personal information of our users, including
              both patients and mental health professionals (collectively
              referred to as you or users), when you visit our website{" "}
              <a
                className="text-blue-500 underline"
                href="https://shareyrheart.com/"
              >
                ShareYrHeart
              </a>{" "}
              use our services, or interact with our platform.
              <p className="mt-4">
                By using ShareYrHeart, you agree to the terms of this Privacy
                Policy. Please read it carefully to understand our views and
                practices regarding your personal data and how we will treat it.
              </p>
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
                        For Patients
                      </h3>
                      <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>Full name, email address, phone number</li>
                        <li>
                          Health-related information (e.g., symptoms, therapy
                          needs) as part of the service request process
                        </li>
                        <li>
                          Appointment history, feedback, and reviews for mental
                          health professionals
                        </li>
                        <li>
                          Any other details voluntarily provided during your
                          interactions with the platform
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        For Mental Health Professionals
                      </h3>
                      <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>
                          Full name, professional title, qualifications,
                          certifications, experience, and other professional
                          details
                        </li>
                        <li>Contact information (e.g., email, phone number)</li>
                        <li>
                          Payment details (e.g., bank account or payment
                          processor information) for compensation
                        </li>
                        <li>
                          Profile pictures, practice information, and
                          availability schedule
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-100 rounded-xl pt-3">
                    <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                      Payment information
                    </p>
                    <p className="pl-6 p-4 text-blue-800">
                      When making payments for services, both patients and
                      professionals are required to provide payment details
                      (e.g., debit/credit card information). We do not store
                      this payment information directly. Instead, we use a
                      secure, third-party payment processor to handle and
                      protect your financial data.
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-xl pt-3">
                    <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                      Technical Data
                    </p>
                    <p className="pl-6 p-4 text-blue-800">
                      <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>
                          <b>Usage Data:</b> We collect information about how
                          you use our website, including your IP address,
                          browser type, operating system, pages visited, and
                          actions taken.
                        </li>
                        <li>
                          <b>Cookies and Tracking Technologies:</b> We use
                          cookies to track and improve your experience on the
                          platform. These cookies may collect information such
                          as session data, preferences, and user behavior.
                        </li>
                      </ul>
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
                  <p className="text-xl font-semibold p-2 pb-4">
                    We use the information we collect for the following
                    purposes:
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc pl-6">
                    <li>
                      <b>Providing Services :</b> To connect patients with
                      mental health professionals, manage appointments, and
                      facilitate communications between users.
                    </li>
                    <li>
                      <b>Account Management :</b> To create and manage your
                      account, verify your identity, and provide support as
                      needed.
                    </li>
                    <li>
                      <b>Processing Payments :</b> To process payments for
                      services, including fees for consultations or any other
                      paid services.
                    </li>
                    <li>
                      <b>Improving Services :</b> To enhance and personalize
                      your experience on the platform, analyze usage trends, and
                      improve the quality of the services offered.
                    </li>
                    <li>
                      <b>Communications :</b> To send you relevant information
                      regarding your account, appointments, or service updates,
                      and respond to your inquiries or feedback.
                    </li>
                    <li>
                      <b>Compliance with Legal Obligations :</b> To comply with
                      applicable laws and regulations, such as for tax reporting
                      or legal disputes.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section>
            <div
              onClick={() => toggleSection("usage")}
              className="bg-teal-50/50 p-6 rounded-2xl cursor-pointer hover:bg-teal-100/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  How We Protect Your Information
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
                  <p className="text-xl font-semibold p-2 pb-4">
                    We take the security of your personal and financial
                    information seriously. To protect your data, we employ
                    industry-standard security measures, including:
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc pl-6">
                    <li>
                      <b>Encryption :</b> Sensitive data, such as payment
                      information, is transmitted via secure channels using SSL
                      (Secure Socket Layer) encryption.
                    </li>
                    <li>
                      <b>Access Control :</b> We restrict access to your
                      personal data to authorized personnel only who need to
                      process your information in connection with the services
                      provided
                    </li>
                    <li>
                      <b>Payment Processing :</b> For payment-related
                      information, we use trusted third-party processors that
                      comply with industry standards, such as PCI-DSS (Payment
                      Card Industry Data Security Standard), to securely handle
                      your payment details.
                    </li>
                  </ul>
                  <p className="mt-4">
                    However, no method of data transmission over the internet or
                    electronic storage is 100% secure. While we strive to use
                    commercially acceptable means to protect your personal
                    information, we cannot guarantee its absolute security.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section>
            <div
              onClick={() => toggleSection("usage")}
              className="bg-teal-50/50 p-6 rounded-2xl cursor-pointer hover:bg-teal-100/50 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Rights and Choices
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
                  <p className="text-xl font-semibold p-2 pb-4">
                    You have certain rights regarding your personal information.
                    These rights include:
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc pl-6">
                    <li>
                      <b>Access :</b> You have the right to request access to
                      the personal information we hold about you.
                    </li>
                    <li>
                      <b>Correction :</b> If your personal information is
                      inaccurate or incomplete, you have the right to request
                      corrections.
                    </li>
                    <li>
                      <b>Deletion :</b> You may request that we delete your
                      personal data, subject to any legal obligations we may
                      have to retain it.
                    </li>
                    <li>
                      <b>Opt-Out :</b> You can opt out of receiving marketing
                      communications from us at any time by following the
                      unsubscribe link in our emails or contacting us directly.
                    </li>
                    <li>
                      <b>Data Portability :</b> In certain circumstances, you
                      may request a copy of your personal data in a structured,
                      commonly used format.
                    </li>
                  </ul>
                  <p className="mt-4">
                    To exercise your rights, please contact us at
                    <a
                      className="ml-1 text-blue-500"
                      href="support@shareyrheart.com"
                    >
                      support@shareyrheart.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          </section>

          <div className="bg-blue-100 rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
              Retention of Data
            </p>
            <p className="pl-6 p-4 text-blue-800">
              We retain your personal information for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. Once your data is no longer
              needed for these purposes, we will securely delete or anonymize
              it.
            </p>
          </div>

          <div className="bg-green-100 rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-96 ml-4 p-2">
              International Data Transfers
            </p>
            <p className="pl-6 p-4 text-green-800">
              ShareYrHeart may operate internationally, and your personal
              information may be transferred and processed outside your country
              of residence, including countries that may not have the same level
              of data protection laws as your country. By using our services,
              you consent to the transfer of your information to these
              countries.
            </p>
          </div>

          <div className="bg-red-100 rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
              Children’s Privacy
            </p>
            <p className="pl-6 p-4 text-red-800">
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal information from children. If we
              become aware that we have inadvertently collected information from
              a child under 13, we will take steps to delete that information.
            </p>
          </div>

          <div className="bg-yellow-100 rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-96 ml-4 p-2">
              Changes to This Privacy Policy
            </p>
            <p className="pl-6 p-4 text-yellow-800">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, legal requirements, or the features of
              our platform. When we make changes, we will update the Effective
              Date at the top of this page. We encourage you to review this
              Privacy Policy periodically to stay informed about how we are
              protecting your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
