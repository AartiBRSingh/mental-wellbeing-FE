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
      <div className="max-w-7xl mx-auto  overflow-hidden">
        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Introduction */}
          <section className="mx-auto max-w-7xl">
            <div className="flex justify-center ">
              <span className="relative text-4xl md:text-4xl xl:text-5xl font-semibold text-stone-800 max-w-full md:max-w-[1000px] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
                Privacy
                <span className="relative text-[#956144] ml-3">
                  Policy
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
            <div className="flex justify-center mt-10">
              <p className="text-black text-xl font-semibold">
                Effective Date: 7th December , 2024 <br />
                Last Updated: 6th February, 2021
              </p>
            </div>

            <div className="max-w-7xl mx-auto bg-white p-4 text-center mt-8">
              <p className="text-gray-700 text-lg leading-relaxed ">
                ShareYrHeart (we, us, our) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                store, and safeguard the personal information of our users,
                including both patients and mental health professionals
                (collectively referred to as you or users), when you visit our
                website{" "}
                <a
                  className="text-blue-500 underline"
                  href="https://shareyrheart.com/"
                >
                  ShareYrHeart
                </a>{" "}
                use our services, or interact with our platform.
                <spam className="mt-4">
                  By using ShareYrHeart, you agree to the terms of this Privacy
                  Policy. Please read it carefully to understand our views and
                  practices regarding your personal data and how we will treat
                  it.
                </spam>
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <div className=" p-6 rounded-2xl cursor-pointer ">
              <div className="flex justify-center items-center mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Information We{" "}
                  <span className="relative text-[#956144] ">
                    Collect
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
                </h2>
              </div>
              <div className="mt-6 space-y-6">
                <div className="mt-6 p-6 ">
                  <p className="text-xl font-semibold p-2 pb-4">
                    We collect both personal and financial information from
                    users in different contexts, including when you sign up, use
                    our services, or make payments.
                  </p>
                </div>
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
                    <ul className="space-y-2 text-gray-600 list-disc pl-5">
                      <li>
                        Full name, professional title, qualifications,
                        certifications, experience, and other professional
                        details
                      </li>
                      <li>Contact information (e.g., email, phone number)</li>
                      <li>
                        Payment details (e.g., bank account or payment processor
                        information) for compensation
                      </li>
                      <li>
                        Profile pictures, practice information, and availability
                        schedule
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-xl pt-3">
                  <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                    Payment information
                  </p>
                  <p className="pl-6 p-4 text-gray-700">
                    When making payments for services, both patients and
                    professionals are required to provide payment details (e.g.,
                    debit/credit card information). We do not store this payment
                    information directly. Instead, we use a secure, third-party
                    payment processor to handle and protect your financial data.
                  </p>
                </div>
                <div className=" rounded-xl pt-3">
                  <p className="text-black font-semibold text-xl max-w-60 ml-4 ">
                    Technical Data
                  </p>
                  <p className="pl-6 ">
                    <spam className="space-y-2 pl-5">
                      <li>
                        <b>Usage Data:</b> We collect information about how you
                        use our website, including your IP address, browser
                        type, operating system, pages visited, and actions
                        taken.
                      </li>
                      <li>
                        <b>Cookies and Tracking Technologies:</b> We use cookies
                        to track and improve your experience on the platform.
                        These cookies may collect information such as session
                        data, preferences, and user behavior.
                      </li>
                    </spam>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className=" p-6 rounded-2xl cursor-pointer ">
              <div className="flex justify-center items-center">
                <h2 className="text-3xl font-semibold text-gray-800">
                  How We Use Your{" "}
                  <span className="relative text-[#956144] ">
                    Information
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
                </h2>
              </div>

              <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                <p className="text-xl font-semibold p-2 pb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="space-y-3 text-gray-600 list-disc pl-6">
                  <li>
                    <b>Providing Services :</b> To connect patients with mental
                    health professionals, manage appointments, and facilitate
                    communications between users.
                  </li>
                  <li>
                    <b>Account Management :</b> To create and manage your
                    account, verify your identity, and provide support as
                    needed.
                  </li>
                  <li>
                    <b>Processing Payments :</b> To process payments for
                    services, including fees for consultations or any other paid
                    services.
                  </li>
                  <li>
                    <b>Improving Services :</b> To enhance and personalize your
                    experience on the platform, analyze usage trends, and
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
            </div>
          </section>

          <section>
            <div className="p-6 rounded-2xl cursor-pointer">
              <div className="flex justify-center items-center">
                <h2 className="text-3xl font-semibold text-gray-800">
                  How We Protect Your{" "}
                  <span className="relative text-[#956144] ">
                    Information
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
                </h2>
              </div>

              <p className="text-xl  p-2 pb-4 mt-8">
                We take the security of your personal and financial information
                seriously. To protect your data, we employ industry-standard
                security measures, including:
              </p>

              <div className="flex gap-8 justify-center mt-6">
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/encryption.png"
                      alt="Benefits Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Encryption
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-2">
                      Sensitive data, such as payment information, is
                      transmitted via secure channels using SSL (Secure Socket
                      Layer) encryption.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/access-control.png"
                      alt="Benefits Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Access Control
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-3">
                      We restrict access to your personal data to authorized
                      personnel only who need to process your information in
                      connection with the services provided
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/payment.png"
                      alt="Benefits Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Payment Processing
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-5">
                      For payment-related information, we use trusted
                      third-party processors that comply with industry
                      standards, such as PCI-DSS (Payment Card Industry Data
                      Security Standard), to securely handle your payment
                      details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-7xl p-4 text-center mt-8">
              <p className="text-xl p-2 pb-4 mt-8">
                However, no method of data transmission over the internet or
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your personal
                information, we cannot guarantee its absolute security.
              </p>
            </div>
          </section>

          <section>
            <div className=" p-6 rounded-2xl cursor-pointer ">
              <div className="flex justify-center items-center">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Sharing Your{" "}
                  <span className="relative text-[#956144] ">
                    Information
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
                </h2>
              </div>

              <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                <p className="text-xl font-semibold p-2 pb-4">
                  We do not sell or rent your personal information to third
                  parties. However, we may share your information in the
                  following circumstances:
                </p>
                <ul className="space-y-3 text-gray-600 list-disc pl-6">
                  <li>
                    <b>With Service Providers :</b> We may share your personal
                    and payment information with trusted third-party vendors and
                    service providers who assist in delivering our platform
                    services (e.g., payment processors, IT support, etc.).
                  </li>
                  <li>
                    <b>With Professionals :</b> Your information, including your
                    health-related data, may be shared with the mental health
                    professionals you select for consultation. This is essential
                    for providing you with the services you request.
                  </li>
                  <li>
                    <b>For Legal Compliance :</b> We may disclose your personal
                    information if required by law, court order, or legal
                    process to protect our rights, comply with a legal
                    obligation, or protect the safety of others.
                  </li>
                  <li>
                    <b>With Your Consent :</b> We may share your information
                    with third parties if you provide explicit consent for such
                    sharing.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className=" p-6 rounded-2xl cursor-pointer ">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-center items-center mb-4">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Your Rights and{" "}
                    <span className="relative text-[#956144] ">
                      Choices
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
                  </h2>
                </div>

                <ul className="space-y-6">
                  <li className="flex items-start space-x-3">
                    <div className="flex justify-center ">
                      <img
                        src="/check-mark.png"
                        alt="Benefits Icon"
                        className="w-6 h-6 mr-2 mt-1"
                      />
                      <div>
                        <span className="font-medium  text-gray-800">
                          Access
                        </span>
                        <p className="text-sm text-gray-600 ml-5">
                          You have the right to request access to the personal
                          information we hold about you.
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
                          Correction
                        </span>
                        <p className="text-sm text-gray-600 ml-5">
                          If your personal information is inaccurate or
                          incomplete, you have the right to request corrections.
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
                          Deletion
                        </span>
                        <p className="text-sm text-gray-600 ml-5">
                          You may request that we delete your personal data,
                          subject to any legal obligations we may have to retain
                          it.
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
                          Opt-Out
                        </span>
                        <p className="text-sm text-gray-600 ml-5">
                          You can opt out of receiving marketing communications
                          from us at any time by following the unsubscribe link
                          in our emails or contacting us directly.
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
                          Data Portability
                        </span>
                        <p className="text-sm text-gray-600 ml-5">
                          In certain circumstances, you may request a copy of
                          your personal data in a structured, commonly used
                          format.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className=" rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
              Retention of Data
            </p>
            <p className="pl-6 p-4 ">
              We retain your personal information for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. Once your data is no longer
              needed for these purposes, we will securely delete or anonymize
              it.
            </p>
          </div>

          <div className=" rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-96 ml-4 p-2">
              International Data Transfers
            </p>
            <p className="pl-6 p-4 ">
              ShareYrHeart may operate internationally, and your personal
              information may be transferred and processed outside your country
              of residence, including countries that may not have the same level
              of data protection laws as your country. By using our services,
              you consent to the transfer of your information to these
              countries.
            </p>
          </div>

          <div className=" rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
              Children’s Privacy
            </p>
            <p className="pl-6 p-4 ">
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal information from children. If we
              become aware that we have inadvertently collected information from
              a child under 13, we will take steps to delete that information.
            </p>
          </div>

          <div className=" rounded-xl pt-3">
            <p className="text-black font-semibold text-xl max-w-96 ml-4 p-2">
              Changes to This Privacy Policy
            </p>
            <p className="pl-6 p-4 ">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, legal requirements, or the features of
              our platform. When we make changes, we will update the Effective
              Date at the top of this page. We encourage you to review this
              Privacy Policy periodically to stay informed about how we are
              protecting your information.
            </p>
          </div>

          <section className="py-16 px-4 ">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-gray-700 text-lg leading-relaxed">
                By using the ShareYrHeart platform, you acknowledge that you
                have read, understood, and agree to these Terms and Conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
