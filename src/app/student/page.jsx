"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseURL } from "../baseURL";
import Cookies from "js-cookie";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  ChevronRight,
} from "recharts";
import DemoRequestModal from "../components/DemoRequestModal";

const COLORS = ["#77DEFF", "#00FF00", "#FF8458", "#FACC15", "#CCCCFF"];

const StudentWellbeingPage = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const StudentStats = [
    { name: "Mental Health Issues", value: 70 },
    { name: "Healthy Mental State", value: 30 },
  ];

  const impactStats = [
    { name: "Anxiety Disorders", value: 30 },
    { name: "PTSD", value: 10 },
    { name: "Stress-Related Issues", value: 20 },
    { name: "Depression", value: 25 },
    { name: "Bipolar Disorder", value: 8 },
    { name: "Others", value: 7 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-gray-600">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();

    const storedUserId = Cookies.get("userId");
    const storedUserName = Cookies.get("name");
    const storedEmail = Cookies.get("email");
    const storedPhoneNo = Cookies.get("contactNumber");
    const paidForStudent = Cookies.get("paidForStudent");

    setUserId(storedUserId);
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNo(storedPhoneNo);

    if (paidForStudent !== "false") {
      setHasPaid(true);
    }
  }, []);

  const handlePayment = async () => {
    const amount = 500;

    const response = await fetch(`${baseURL}/api/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount }),
    });

    const data = await response.json();
    if (!data.success) {
      return alert("Failed to create Razorpay order");
    }

    const { order } = data;

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "ShareYHeart",
      description: "Transaction",
      image: "/logo.png",
      order_id: order.id,
      handler: async (response) => {
        const verifyResponse = await fetch(`${baseURL}/api/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId,
            amount,
            planType: "student",
          }),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("Payment Successful!");
          Cookies.set("paidForEmployee", "true");
          router.push("/questionnaires?userType=student");
        } else {
          alert("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: userName,
        email: email,
        contact: phoneNo,
      },
      theme: {
        color: "black",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-7xl w-full  overflow-hidden">
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold bg-white p-4 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-3">
                  <strong className="text-black font-semibold text-4xl mr-2">
                    Educational
                  </strong>
                  <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-4xl block  font-semibold text-center">
                    Institutes
                    <svg
                      className="absolute w-full h-[6px] -bottom-1 left-0"
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
                </div>
              </h1>
            </div>

            <div className="relative rounded-lg overflow-hidden bg-white p-6">
              <div className="flex justify-center items-center gap-2 mb-3">
                <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block mb-5 font-semibold text-center">
                  Overview
                  <svg
                    className="absolute w-full h-[6px] -bottom-1 left-0"
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
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                In recent years, mental health among Indian students has become
                a pressing concern, with various studies highlighting alarming
                trends:
              </p>
              <div className="flex text-gray-600 flex-wrap gap-3">
                <li>
                  <strong>Prevalence of Mental Health Issues:</strong> A study
                  published in the Indian Journal of Community Medicine reported
                  that 44.1% of higher secondary school students exhibited
                  symptoms of depression.
                </li>
                <li>
                  <strong>Suicide Rates:</strong> According to the National
                  Crime Records Bureau (NCRB), there has been a significant rise
                  in student suicides over the past decade, with a 50% increase
                  among male students and a 61% increase among female students.
                </li>
                <li>
                  <strong>Psychological Distress:</strong> Research indicates
                  that 27.8% of undergraduate students and 31.3% of postgraduate
                  students in India have experienced mental health conditions,
                  with a notable percentage having suicidal thoughts.
                </li>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                These statistics underscore the urgent need for comprehensive
                mental health support systems within educational institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-center gap-2 mb-2"></div>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={StudentStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {StudentStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Source: Student Mental Health Survey
                </p>
              </div>

              <div className="h-80 bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-center gap-2 mb-2"></div>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={impactStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {impactStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Source: National Mental Health Survey
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-center gap-2 mb-4">
                <img
                  src="/warning1.png"
                  alt="Warning Icon"
                  className="w-10 h-10"
                />
                <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block mb-5 font-semibold text-center">
                  Warning Signs
                  <svg
                    className="absolute w-full h-[6px] -bottom-1 left-0"
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2"></div>
                  <ul className="text-sm text-black space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Difficulty Making Decisions</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Substance Use</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Sleep Disturbances</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Changes in Eating Habits</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Fatigue and Low Energy</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Frequent Headaches or Stomach Issues</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2"></div>
                  <ul className="text-sm text-black space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Persistent Sadness or Mood Swings</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Increased Anxiety or Stress</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Self-Harm or Suicidal Thoughts</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Increased Aggression or Irritability</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Declining Academic Performance</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Social Withdrawal</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 italic">
                If these signs persist for weeks or interfere with daily life,
                it is important to seek help from a mental health professional.
                Early intervention can make a significant difference in
                well-being.
              </p>
            </div>

            <div className="bg-transparent p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-[#956144] relative text-2xl md:text-3xl lg:text-3xl block mb-5 font-semibold text-center">
                  <span className="relative">
                    Our Services
                    <svg
                      className="absolute w-full h-[6px] -bottom-1 left-0"
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

              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Recognizing the critical importance of mental health in academic
                success and personal development, ShareYrHeart has developed a
                Student Well-being Program tailored to address the unique
                challenges faced by students. The program encompasses:
              </p>

              <div className="flex gap-8 justify-center">
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/checklist.png"
                      alt="Assessment Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Comprehensive Assessments
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-2">
                      Conducting assessments to identify specific mental health
                      needs and challenges, forming the foundation for
                      customized support plans.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/behavioral.png"
                      alt="Activities Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Targeted Activities
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-2">
                      Offering sessions on time management, effective
                      communication, and coping strategies to navigate academic
                      and social challenges.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/psycghologyself.png"
                      alt="Session Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Group Session
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-2">
                      Creating supportive peer groups where students can share
                      experiences and learn from each other under professional
                      supervision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-8 justify-center">
              <div className="bg-white px-32 py-10  rounded-lg shadow-sm ">
                <div className="flex justify-center items-center gap-3">
                  <h3 className="text-2xl font-medium text-gray-800">
                    Schools
                  </h3>
                </div>
                <div className="flex justify-center items-center gap-3"></div>
              </div>
              <div className="bg-white px-32 py-10 rounded-lg shadow-sm ">
                <div className="flex justify-center items-center gap-3">
                  <h3 className="text-2xl font-medium text-gray-800">
                    Colleges
                  </h3>
                </div>
                <div className="flex justify-center items-center gap-3"></div>
              </div>
            </div>

            <div className="flex justify-center ">
              <button
                onClick={openModal}
                className="px-4 sm:px-6 py-2 my-6 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Book a Demo
              </button>
              <DemoRequestModal isOpen={isModalOpen} onClose={closeModal} />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-[#956144] relative text-2xl md:text-3xl lg:text-3xl block mb-5 font-semibold text-center">
                  <span className="relative">
                    Program Benefits
                    <svg
                      className="absolute w-full h-[6px] -bottom-1 left-0"
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
                        Enhanced Academic Performance
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        By addressing mental health issues, students can achieve
                        better concentration, memory retention, and overall
                        academic success.
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
                        Improved Emotional Resilience
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Equipping students with coping mechanisms to handle
                        setbacks and challenges, fostering a growth mindset.
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
                        Supportive Community
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Building a network of peers and professionals that
                        encourages open discussions about mental health,
                        reducing stigma and promoting help-seeking behavior.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <p className=" font-medium text-black mt-12 text-center">
                Implementing ShareYrHearts Student Well-being Program can
                significantly contribute to creating a healthier, more
                supportive educational environment, enabling students to thrive
                both academically and personally.
              </p>
            </div>

            <div className="m-2 flex justify-center">
              <button
                onClick={() => router.push("/student/college")}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentWellbeingPage;
