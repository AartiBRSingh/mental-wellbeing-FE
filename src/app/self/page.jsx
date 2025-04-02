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
} from "recharts";
import { ChevronRight } from "lucide-react";

const COLORS = ["#77DEFF", "#F6D038", "#FF8458", "#FACC15", "#CCCCFF"];

const SelfAssessmentPage = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const router = useRouter();

  // Updated with India-specific mental health statistics
  const mentalHealthStats = [
    { name: "Healthy Mental State", value: 14.6 },
    { name: "Mental Health Concern", value: 85.4 },
  ];

  // Updated with India-specific mental health issues distribution
  const wellbeingDistribution = [
    { name: "Anxiety Disorders", value: 38 },
    { name: "Depressive Disorders", value: 32 },
    { name: "Substance Use Disorders", value: 18 },
    { name: "Schizophrenia", value: 7 },
    { name: "Others", value: 5 },
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
    const paidForSelf = Cookies.get("paidForSelf");

    setUserId(storedUserId);
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNo(storedPhoneNo);

    if (paidForSelf !== "false") {
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
      key: "rzp_test_CR2IahVWmEdcMA",
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
            planType: "self",
          }),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("Payment Successful!");
          Cookies.set("paidForSelf", "true");
          router.push("/questionnaires?userType=self");
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
      <div className="max-w-7xl w-full bg-gradient-to-b from-white to-red-200 rounded-2xl overflow-hidden shadow-2xl">
        <div className=" p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <img
                src="/mentalHealth.png"
                alt="Mental Health Icon"
                className="w-15 h-10"
              /> */}
              <h1 className="text-3xl font-semibold bg-white p-4 rounded-lg shadow-md text-center">
                <strong className="text-black font-semibold text-4xl">
                  Self Understanding
                </strong>{" "}
              </h1>
            </div>

            <div className="flex justify-center mb-4">
              {/* <img
                src="https://img.freepik.com/free-vector/tiny-people-beautiful-flower-garden-inside-female-head-isolated-flat-illustration_74855-11098.jpg?t=st=1743517262~exp=1743520862~hmac=dc5da5e71f940caeca4d965bc812f1670d8ecd6d44219d4416e28cc1d4329a10&w=996"
                alt="Mental Health Icon"
                className="w-auto h-72 rounded-lg shadow-lg"
              /> */}
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
                Mental health has become an increasingly critical issue in
                India, affecting a significant portion of the population. Recent
                studies provide a comprehensive overview of the current mental
                health landscape:
              </p>
              <div className="flex flex-wrap gap-3">
                <li>
                  <strong>Prevalence of Mental Health Disorders:</strong> The
                  Global Burden of Disease Study revealed that in it’s last
                  survey, approximately 197.3 million individuals in India were
                  affected by mental disorders, accounting for 14.6% of the
                  population.
                </li>
                <li>
                  <strong>Suicide Rates: </strong> The World Health Organization
                  (WHO) estimates an age-adjusted suicide rate of 21.1 per
                  100,000 population in India, highlighting the severity of
                  mental health challenges.
                </li>
                <li>
                  <strong>Economic Impact: </strong> Mental health conditions
                  are projected to cost the Indian economy USD 1.03 trillion
                  between 2012 and 2030 due to lost productivity and related
                  expenses.
                </li>
              </div>
            </div>

            {/* <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/self-assessment.png"
                  alt="Brain Icon"
                  className="w-6 h-6"
                />
                <h3 className="font-semibold text-2xl text-gray-800">
                  Challenges
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                <li>
                  <strong>Stigma and Awareness:</strong> Despite the high
                  prevalence, mental health issues in India are often
                  stigmatized, leading to reluctance in seeking professional
                  help. This societal stigma exacerbates the treatment gap,
                  leaving many without necessary care.
                </li>
                <li>
                  <strong>Treatment Gap: </strong> The National Mental Health
                  Survey (NMHS) 2015-16 reported a treatment gap of 80.4% for
                  common mental disorders, indicating that a vast majority of
                  individuals do not receive the care they need.
                </li>
                <li>
                  <strong>Resource Constraints: </strong> India faces a shortage
                  of mental health professionals, with only 0.3 psychiatrists
                  and 0.07 psychologists per 100,000 people, compared to 6.6
                  psychiatrists per 100,000 in developed countries.
                </li>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-center">
                    Mental Health in India (2023)
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={mentalHealthStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mentalHealthStats.map((entry, index) => (
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
                  Source: Global Burden of Disease Study
                </p>
              </div>

              <div className="h-80 bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-center">
                    Distribution of Mental Health Disorders
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={wellbeingDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {wellbeingDistribution.map((entry, index) => (
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

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-800 text-sm">
                      Emotional Signs
                    </h3>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Persistent sadness</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Excessive worry or fear</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Loss of interest</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Feeling overwhelmed</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Suicidal thoughts</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-800 text-sm">
                      Behavioral Signs
                    </h3>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Social withdrawal</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Changes in sleep patterns</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Difficulty concentrating</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Increased substance use</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Unexplained aggression</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-800 text-sm">
                      Physical Signs
                    </h3>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Frequent headaches</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Changes in appetite</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Fatigue and low energy</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      <span>Gastrointestinal issues</span>
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

              <div className="flex gap-8 justify-center">
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/checklist.png"
                      alt="Benefits Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Comprehensive Assessment
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-2">
                      Utilizing validated self-assessment tools to help
                      individuals understand their emotional well-being and
                      identify areas for personal growth.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/behavioral.png"
                      alt="Benefits Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Therapeutic Interventions
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-3">
                      Confidential sessions with experienced mental health
                      professionals to explore personal challenges and develop
                      coping strategies.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/psycghologyself.png"
                      alt="Benefits Icon"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Personalized Sessions
                    </h3>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <p className="text-gray-600 leading-relaxed text-sm mt-5">
                      Implementation of therapies to address specific mental
                      health concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
                Book a Demo
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* <img
                  src="/pngegg.png"
                  alt="Benefits Icon"
                  className="w-8 h-8"
                /> */}
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
                        Enhanced Self-Awareness
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Develop deeper understanding of thoughts, emotions, and
                        behaviors
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
                        Improved Coping Mechanisms
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Learn effective strategies to manage stress and
                        emotional challenges
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
                        Empowerment
                      </span>
                      <p className="text-sm text-gray-600 ml-5">
                        Gain control over your mental health journey through
                        knowledge and tools
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="m-2 flex justify-center">
              {hasPaid ? (
                <button
                  onClick={() => router.push("/questionnaires?userType=self")}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
