"use client";
import React, { useState } from "react";
import Link from "next/link";
import OrganizationModal from "../components/SignupForm";

const Page = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/mentalwell.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 "></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 ml-60 md:mb-0">
              <h1 className="text-6xl font-serif font-bold text-gray-800 leading-tight">
                Transform Your
                <span className="block mt-2 text-[#956144]">
                  Mental Wellbeing
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Mental well-being is essential for leading a balanced,
                productive, and fulfilling life. Start your journey towards
                better mental health today.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setOpen(true)}
                  className="cursor-pointer inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Enroll Your Organization
                </button>
                <OrganizationModal
                  isOpen={isOpen}
                  onClose={() => {
                    setOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Enhance Employee Well-Being
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Reduces stress, burnout, and absenteeism
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Improves team collaboration and communication
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Increases focus and problem-solving abilities
                  </p>
                </div>
              </div>
              <Link
                href="/employee"
                className="inline-block mt-8 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-lg transform rotate-3"></div>
                <img
                  src="https://img.freepik.com/free-vector/good-team-concept-illustration_114360-4225.jpg?t=st=1737958269~exp=1737961869~hmac=9f55dffa1ad3cbe3003fbe6986667390cde22ce60ebf14ec70599896f3d62e8b&w=740"
                  alt="Employee wellness"
                  className="relative rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Student Success & Wellbeing
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Manage exam anxiety and academic stress effectively
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Enhance concentration and learning abilities
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Develop emotional intelligence and coping skills
                  </p>
                </div>
              </div>
              <Link
                href="/student"
                className="inline-block mt-8 px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-200 rounded-lg transform -rotate-3"></div>
                <img
                  src="https://img.freepik.com/free-vector/happy-students-jumping-with-flat-design_23-2147907627.jpg?t=st=1737958353~exp=1737961953~hmac=b35ff6009000582dff7710c6c86c923f98fb82aa915ccc17fbbd564321b15760&w=740"
                  alt="Student wellness"
                  className="relative rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self Understanding Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Discover Your Inner Strength
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Develop mental clarity and emotional awareness
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Build resilience and adaptive coping strategies
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </span>
                  <p className="text-gray-700">
                    Enhance decision-making aligned with personal values
                  </p>
                </div>
              </div>
              <Link
                href="/self"
                className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Journey
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-3"></div>
                <img
                  src="https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148766834.jpg?t=st=1737958010~exp=1737961610~hmac=d9a5dae22d9564405a029e95ac231f84cde03a92482ba9557231c5ecd9498571&w=740"
                  alt="Self understanding"
                  className="relative rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
