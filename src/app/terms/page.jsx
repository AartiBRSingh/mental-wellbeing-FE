"use client";

import React from "react";
import {
  FileText,
  Shield,
  Lock,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const TermsPage = () => {
  return (
    <div className=" container max-w-7xl mx-auto my-10 ">
      <header className="py-16  rounded-2xl">
        <div className="max-w-7xl mx-auto text-center rounded-2xl">
          <div className="flex justify-center">
            <span className="relative text-4xl md:text-4xl xl:text-5xl font-semibold text-stone-800 max-w-full  [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
              Terms &
              <span className="relative text-[#956144] ml-3">
                Conditions
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
        </div>
        <div className="flex justify-center mt-10">
          <p className="text-black text-xl font-semibold">
            Effective Date: 7th December, 2024 <br />
            Last Updated: 6th February, 2021
          </p>
        </div>
        <div className="mt-4 max-w-7xl mx-auto text-lg bg-white p-4 text-gray-700 rounded-xl">
          <p>
            Welcome to ShareYrHeart. These Terms and Conditions (Terms) govern
            your use of our website and services, including mental well-being
            programs for educational institutes, workplaces, and individuals,
            professional certification courses, and mental health expert
            consultations. By accessing or using our website and services, you
            agree to these Terms.
          </p>
        </div>
      </header>

      <section className="">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <section>
              <div className=" p-6 rounded-2xl cursor-pointer ">
                <div className="flex justify-center items-center">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    <span className="relative text-[#956144] ">
                      Eligibility
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

                <div className="mt-6 p-6 flex justify-center items-center">
                  <ul className="space-y-3 text-black text-xl list-disc pl-6">
                    <li>
                      Users must be at least 18 years of age or have legal
                      parental or guardian consent to use our services.
                    </li>
                    <li>
                      Institutions and organizations must designate an
                      authorized representative for registration and
                      communication.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="p-6 rounded-2xl cursor-pointer">
                <div className="flex justify-center items-center">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Services{" "}
                    <span className="relative text-[#956144] ">
                      Offered
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

                <div className="flex gap-8 justify-center mt-10">
                  <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                    <div className="flex justify-center mb-3">
                      <img
                        src="/mental-health.png"
                        alt="Benefits Icon"
                        className="w-24 h-24"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <h3 className="text-lg font-medium text-gray-800">
                        Mental Well-being
                      </h3>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <p className="text-gray-600 leading-relaxed text-sm mt-2">
                        Mental Well-being Programs for students, employees, and
                        individuals.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                    <div className="flex justify-center mb-3">
                      <img
                        src="/certificate.png"
                        alt="Benefits Icon"
                        className="w-24 h-24"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <h3 className="text-lg font-medium text-gray-800">
                        Professional Certificate
                      </h3>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <p className="text-gray-600 leading-relaxed text-sm mt-3">
                        Professional Certificate Courses in psychology and
                        mental health, certified by a renowned university.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                    <div className="flex justify-center mb-3">
                      <img
                        src="/doctor.png"
                        alt="Benefits Icon"
                        className="w-24 h-24"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <h3 className="text-lg font-medium text-gray-800">
                        Expert Booking
                      </h3>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <p className="text-gray-600 leading-relaxed text-sm mt-5">
                        Mental Health Expert Consultations, available online or
                        in-person at their clinics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className=" p-6 rounded-2xl cursor-pointer ">
                <div className="bg-white rounded-xl p-6 shadow-sm border ">
                  <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">
                      Booking &{" "}
                      <span className="relative text-[#956144] ">
                        Appointments
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
                            Users may book appointments with mental health
                            experts via the platform.
                          </span>
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
                            Appointments may be online or in-person depending on
                            availability.
                          </span>
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
                            Booking slots are open for a maximum of 15 days in
                            advance.
                          </span>
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
                            Rescheduling or cancellations must be done at least
                            24 hours in advance.
                          </span>
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
                            No payment is required at the time of booking unless
                            explicitly mentioned.
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className=" p-6 rounded-2xl cursor-pointer ">
                <div className="mt-2 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                      <div className="flex justify-center items-center mb-8">
                        <h2 className="text-3xl font-semibold text-gray-800">
                          Fees &{" "}
                          <span className="relative text-[#956144] ">
                            Payments
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
                      <ul className="space-y-2 text-gray-700 list-disc pl-5">
                        <li>
                          Professional courses and well-being programs require
                          full payment at the time of registration unless
                          specified.
                        </li>
                        <li>
                          All payments are non-refundable except in cases of
                          technical errors or duplicate transactions.
                        </li>
                        <li>
                          Experts receive wallet credits for services, which are
                          tracked and updated in real-time.
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                      <div className="flex justify-center items-center mb-8">
                        <h2 className="text-3xl font-semibold text-gray-800">
                          User{" "}
                          <span className="relative text-[#956144] ">
                            Responsibilities
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
                      <ul className="space-y-2 text-gray-600 list-disc pl-5">
                        <li>
                          Users must provide accurate information during
                          registration and while filling any case-taking forms
                          or assessments.
                        </li>
                        <li>
                          Users agree not to impersonate others or use fake
                          identities.
                        </li>
                        <li>
                          All communication with mental health experts must be
                          respectful and confidential.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className=" p-6 rounded-2xl cursor-pointer ">
                <div className="flex justify-center items-center">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    Privacy &{" "}
                    <span className="relative text-[#956144] ">
                      Confidentiality
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
                  <ul className="space-y-3 text-gray-600 list-disc pl-6">
                    <li>
                      All personal data is handled with strict confidentiality.
                    </li>
                    <li>
                      Case details, assessments, and chats with experts remain
                      secure and are not shared with third parties without
                      consent.
                    </li>
                    <li>
                      Users have the option to remain anonymous on forums.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <div className=" rounded-xl pt-3">
              <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                Certificate Courses
              </p>
              <ul className="pl-16 p-4 list-disc text-gray-600 space-y-3">
                <li>
                  Course content is the intellectual property of ShareYrHeart
                  and partner institutions.
                </li>
                <li>
                  Completion of assignments, attendance, and assessments are
                  mandatory for certification.
                </li>
                <li>
                  ShareYrHeart reserves the right to deny certification if
                  participation criteria are not met.
                </li>
              </ul>
            </div>

            <div className=" rounded-xl pt-3">
              <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                Forum Usage
              </p>
              <ul className="pl-16 p-4 list-disc text-gray-600 space-y-3">
                <li>
                  Forums are provided for users to share mental health concerns
                  and experiences.
                </li>
                <li>
                  No mental health expert will offer diagnosis or treatment
                  through the forum.
                </li>
                <li>
                  Moderation is done to ensure a safe and supportive
                  environment.
                </li>
              </ul>
            </div>

            <div className=" rounded-xl pt-3">
              <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                Live Chat Services
              </p>
              <ul className="pl-16 p-4 list-disc text-gray-600 space-y-3">
                <li>
                  Live chat with experts is available 24/7 based on expert
                  availability.
                </li>
                <li>
                  Messages sent are stored and visible to experts for continuity
                  in communication.
                </li>
              </ul>
            </div>

            <div className=" rounded-xl pt-3">
              <p className="text-black font-semibold text-xl max-w-60 ml-4 p-2">
                Clinics
              </p>
              <ul className="pl-16 p-4 list-disc text-gray-600 space-y-3">
                <li>
                  ShareYrHeart clinics offer in-person consultation and therapy
                  services.
                </li>
                <li>
                  Walk-ins are welcome, though appointments are encouraged for
                  better service.
                </li>
                <li>
                  Insurance facilities are available at selected clinics as per
                  eligibility.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800">
              Key{" "}
              <span className="relative text-[#956144] ">
                Highlights
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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Intellectual Property
              </h3>
              <ul className="text-gray-600 list-disc pl-6 space-y-3">
                <li>
                  All content including text, graphics, logos, and courses are
                  the property of ShareYrHeart.
                </li>
                <li>
                  Unauthorized use or reproduction is strictly prohibited.
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Liability Disclaimer
              </h3>
              <ul className="text-gray-600 list-disc pl-6 space-y-3">
                <li>
                  ShareYrHeart is not liable for any medical outcomes or adverse
                  effects resulting from use of our services.
                </li>
                <li>
                  Our programs and consultations are meant for support and
                  guidance, not emergency interventions.
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Modifications
              </h3>
              <ul className="text-gray-600 list-disc pl-6 space-y-3">
                <li className="text-gray-600 mt-6">
                  ShareYrHeart reserves the right to update these Terms at any
                  time. Continued use of the website implies acceptance of the
                  revised Terms.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 ">
        <div className="mx-auto text-center text-lg">
          <p className="text-gray-600">
            By using the ShareYrHeart platform, you acknowledge that you have
            read, understood, and agree to these Terms and Conditions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
