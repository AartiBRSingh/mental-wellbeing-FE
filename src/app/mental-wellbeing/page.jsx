"use client";
import React, { useState } from "react";
import Link from "next/link";
import OrganizationModal from "../components/SignupForm";

const Page = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-6xl font-serif font-bold text-gray-800 leading-tight">
                Transform Your
                <span className="block mt-2 text-indigo-600">
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
            <div className="md:w-1/2">
              <img
                src="https://img.freepik.com/free-vector/tiny-people-beautiful-flower-garden-inside-female-head-isolated-flat-illustration_74855-11098.jpg?t=st=1739256097~exp=1739259697~hmac=debf0a2b9e9f3410764236f0d671509c55b8956c33b82c3ead28fa69d54286ca&w=1380"
                alt="Mental wellness illustration"
                className="rounded-lg shadow-xl ml-6"
              />
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

      {/* Self Understanding Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Self-Understanding
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Embark on a journey of self-discovery and personal growth.
              Understanding yourself is the first step towards better mental
              health.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Features */}
            <div className="space-y-8">
              <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Mental Clarity
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Develop a deeper understanding of your thought patterns and
                    emotional responses. Learn techniques to maintain clarity
                    under pressure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Emotional Resilience
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Build the strength to bounce back from challenges. Transform
                    obstacles into opportunities for personal growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Better Decision Making
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enhance your ability to make confident, well-informed
                    choices aligned with your values and goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Mindful Practice</h4>
                  </div>
                </div>
                <img
                  src="https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148766834.jpg?t=st=1737958010~exp=1737961610~hmac=d9a5dae22d9564405a029e95ac231f84cde03a92482ba9557231c5ecd9498571&w=740"
                  alt="Mindful practice"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
              {/* <div className="relative group mt-12">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Personal Growth</h4>
                  </div>
                </div>
                <img
                  src="/api/placeholder/300/400"
                  alt="Personal growth"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div> */}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/self"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Begin Your Journey
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
