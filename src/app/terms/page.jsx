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
      content:
        "By using the ShareYrHeart platform, you agree to comply with these Terms and all applicable laws and regulations. These Terms constitute a binding agreement between you and ShareYrHeart, including any of its affiliates, regarding your use of the services provided through the Platform.",
    },
    {
      title: "2. Platform Services",
      content:
        "ShareYrHeart provides comprehensive mental health services including: Connecting patients with licensed mental health professionals, offering structured mental well-being programs, and providing online psychology certificate courses.",
    },
    {
      title: "3. Registration and Account Creation",
      content:
        "To access services, courses, or programs, you must create an account. You agree to provide accurate, complete, and up-to-date information. Different types of users (patients, professionals, course participants) may be required to provide specific information.",
    },
    {
      title: "4. Privacy and Confidentiality",
      content:
        "ShareYrHeart is committed to protecting your privacy. Patient information is kept confidential and will only be shared with selected professionals or as required by law. All users must adhere to confidentiality standards.",
    },
  ];

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gradient-to-r from-blue-100 to-purple-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Effective Date: 7th December, 2024 | Last Updated: 6th February,
            2021
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
                  <div className="p-6 pt-0 text-gray-600">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Key Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Privacy Protection
              </h3>
              <p className="text-gray-600">
                Strict confidentiality and data protection measures
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Flexible Services
              </h3>
              <p className="text-gray-600">
                Varied consultation and program options
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
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

      {/* Contact Information */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center">
              <Mail className="w-8 h-8 mr-4" />
              <span>support@shareyrheart.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="w-8 h-8 mr-4" />
              <span>+91 9874021437</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-8 h-8 mr-4" />
              <span>7B Mysore Road, Kolkata-700026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Full Terms Agreement */}
      <section className="py-16 px-4 bg-gray-50">
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
