"use client";

import React, { useState } from "react";
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
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By using the Platform, you agree to comply with these Terms and all applicable laws and regulations. If you do not agree to these Terms, please immediately discontinue use of the Platform.

These Terms constitute a binding agreement between you and ShareYrHeart, including any of its affiliates, regarding your use of the services provided through the Platform.`,
    },
    {
      title: "2. Platform Services",
      content: `ShareYrHeart provides the following services:

Connecting Patients with Mental Health Experts:

Mental Health Professionals: ShareYrHeart connects patients with licensed and certified mental health professionals (e.g., psychologists, psychiatrists, therapists, counselors). Services may include individual therapy, family counseling, group therapy, and mental health assessments.
Expert Profiles: Professionals create profiles that include their qualifications, experience, areas of expertise, treatment approaches, and availability. Patients can browse and choose professionals based on their needs.
Consultation Methods: Professional consultations may occur through video calls, audio calls, secure messaging, or in-person sessions, depending on geographical availability and the professional's offerings.

ShareYrHeart's Own Treatment and Well-Being Programs:

Mental Well-being Programs: ShareYrHeart offers structured programs designed to support mental health and emotional well-being. These programs may include self-help resources, group therapy, stress management workshops, mindfulness courses, and other wellness-related offerings.
Program Enrollment: Patients can sign up for and participate in these programs through the Platform. The programs may be subscription-based, one-time purchases, or available in modules.
Guided Treatment: ShareYrHeart may provide its own therapeutic treatments, such as cognitive behavioral therapy (CBT), mindfulness-based stress reduction (MBSR), or other evidence-based interventions.

Psychology Certificate Courses:

Courses Offered: ShareYrHeart provides online certificate courses in psychology, which may include topics such as general psychology, clinical psychology, counseling skills, mental health interventions, and more.
Course Access: Participants can access these courses via the Platform, which may include video lessons, quizzes, reading materials, assignments, and live webinars.
Certification: Upon successful completion of a course, participants will receive a certificate from ShareYrHeart, recognizing their achievement. These certificates are intended for educational purposes and are not equivalent to formal licensure or professional credentials.`,
    },
    {
      title: "3. Registration and Account Creation",
      content: `To access services, courses, or programs on the Platform, you must create an account. When creating an account, you agree to provide accurate, complete, and up-to-date information.

For Patients: When registering as a patient, you may be asked to provide basic information (such as name, contact details, and mental health history) to help connect you with the appropriate professional or program.

For Professionals: When registering as a mental health professional, you must provide valid credentials (such as licensure, certifications, areas of expertise, and experience). You are responsible for ensuring that your information is accurate and updated.

For Course Participants: When enrolling in a psychology certificate course, you must provide necessary information for course access and certification.`,
    },
    {
      title: "4. Professional Qualifications and Responsibilities",
      content: `For Mental Health Experts:

Licensing and Credentials: All professionals offering services through the Platform must be licensed or certified by the appropriate regulatory body in their jurisdiction. By using the Platform, you confirm that the professionals you connect with hold the necessary qualifications.
Service Delivery: Professionals are responsible for providing services that meet the highest standards of ethical and professional conduct. ShareYrHeart does not directly provide medical or therapeutic services and only acts as a facilitator for connecting patients with professionals.
Patient Confidentiality: Professionals must adhere to applicable privacy and confidentiality laws (e.g., HIPAA, GDPR) in relation to patient data and therapy sessions.

For Psychology Course Instructors:

Course instructors are responsible for delivering high-quality content and ensuring the accuracy and relevancy of the material provided. Instructors must have expertise in the subject matter they are teaching.`,
    },
    {
      title: "5. Payment and Fees",
      content: `For Patients:

Payment for Services: Payments for professional consultations or mental health programs are made through the Platform via a secure third-party payment processor. The price of each service or program will be disclosed upfront.
Payment Methods: Accepted payment methods include credit and debit cards, and possibly other secure methods available on the Platform.
Refunds and Cancellations: Refund and cancellation policies may vary depending on the professional or program. You should refer to the specific terms for each service or course. ShareYrHeart will assist in resolving disputes but is not responsible for issuing refunds unless required by law.

For Professionals:

Service Fees: ShareYrHeart may charge a fee for using the platform to connect with patients or offer services. This fee will be clearly disclosed when professionals join the Platform.
Payment Processing: Professionals will be paid via the platform according to the payout schedule and the professional's preferred payment method.

For Course Participants:

Course Fees: Courses are available for a one-time fee or through a subscription model. Course fees are disclosed before purchase, and you agree to pay all applicable fees when enrolling in a course.
Payment for Courses: Course fees will be processed through the Platform's secure payment gateway.`,
    },
    {
      title: "6. Privacy and Confidentiality",
      content: `ShareYrHeart is committed to protecting your privacy. Our Privacy Policy details how we collect, use, and protect your personal information.

For Patients: Patient information is kept confidential and will only be shared with the selected professional or as required by law. Mental health data is particularly sensitive and must be handled in accordance with applicable laws (e.g., HIPAA, GDPR).

For Professionals: Professionals must adhere to confidentiality laws related to patient data. You agree to keep all information you learn about your patients during consultations confidential.

For Course Participants: Your personal information and course-related data will be stored and processed by ShareYrHeart as described in our Privacy Policy.`,
    },
    {
      title: "7. User Conduct",
      content: `You agree to use the Platform in a manner that is lawful, respectful, and appropriate. Specifically, you agree not to:

Engage in Fraud or Misrepresentation: Do not impersonate any individual, misrepresent your credentials, or provide false information.
Harass, Abuse, or Discriminate: Treat all users (patients, professionals, course participants) with respect.
Violate Legal Rights: Do not engage in illegal activities, transmit harmful malware, or infringe on intellectual property rights.

ShareYrHeart reserves the right to suspend or terminate any account that violates these Terms.`,
    },
    {
      title: "8. Disclaimers",
      content: `No Guarantee of Results: ShareYrHeart facilitates the connection between patients and mental health professionals, and provides mental health programs and educational courses. We do not guarantee any specific outcomes or results from services, programs, or courses.

No Substitute for Emergency Care: ShareYrHeart's services are not a substitute for emergency care. If you are experiencing a mental health crisis, please immediately seek help from a licensed professional or call emergency services.`,
    },
    {
      title: "9. Limitation of Liability",
      content: `To the fullest extent permitted by law, ShareYrHeart, its affiliates, and its employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform or participation in any services, programs, or courses, including any loss of data or profits.`,
    },
    {
      title: "10. Termination of Account",
      content: `We reserve the right to suspend or terminate your access to the Platform at any time, for any reason, including violations of these Terms or any unlawful behavior. Upon termination, you will no longer have access to your account, and all pending transactions or programs may be canceled.`,
    },
    {
      title: "11. Changes to the Terms",
      content: `ShareYrHeart reserves the right to modify, amend, or update these Terms at any time. We will update the "Last Updated" date at the top of this page to reflect any changes. Your continued use of the Platform after changes to the Terms signifies your acceptance of those changes.`,
    },
    {
      title: "12. Governing Law",
      content: `These Terms are governed by the laws of Calcutta High Court without regard to its conflict of law principles. Any disputes arising out of these Terms shall be resolved in the courts located in Kolkata, INDIA, and you consent to the jurisdiction of those courts.`,
    },
  ];

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="bg-white container mx-auto my-10 rounded-3xl shadow-2xl">
      <header className="bg-gradient-to-r from-blue-100 to-purple-100 py-16 px-4 rounded-2xl">
        <div className="max-w-4xl mx-auto text-center rounded-2xl">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms and Conditions for ShareYrHeart
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Effective Date: 7th December, 2024 | Last Updated: 6th February,
            2021
          </p>
        </div>
        <div className="mt-4 max-w-5xl mx-auto p-4 text-gray-700 px-12 bg-slate-100 rounded-3xl">
          <p>
            ShareYrHeart we, our, us operates a platform offering mental health
            services, including the ability to connect patients with licensed
            mental health professionals Experts, providing its own mental health
            treatment and well-being programs Programs, and offering certificate
            courses in psychology Courses. These Terms and Conditions Terms
            govern your access to and use of the ShareYrHeart platform,
            available via{" "}
            <a className="text-blue-500" href="https://shareyrheart.com/">
              https://shareyrheart.com
            </a>{" "}
            and associated mobile applications.
          </p>
          <p className="mt-4">
            By accessing or using ShareYrHeart, you agree to be bound by these
            Terms. If you do not agree with any of the provisions of these
            Terms, you must not use the Platform.
          </p>
        </div>
      </header>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div
                  className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleSection(index)}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </h2>
                  <Shield
                    className={`w-6 h-6 ${
                      expandedSection === index
                        ? "text-blue-600 rotate-180"
                        : "text-gray-400"
                    } transition-transform`}
                  />
                </div>
                {expandedSection === index && (
                  <div className="p-6 pt-4 text-gray-600 whitespace-pre-line">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto ">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Key Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100">
              <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Privacy Protection
              </h3>
              <p className="text-gray-600">
                Strict confidentiality and data protection measures
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Flexible Services
              </h3>
              <p className="text-gray-600">
                Varied consultation and program options
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-gray-100">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                User Protection
              </h3>
              <p className="text-gray-600">
                Clear guidelines and user conduct policies
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 rounded-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700">
            By using the ShareYrHeart platform, you acknowledge that you have
            read, understood, and agree to these Terms and Conditions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
