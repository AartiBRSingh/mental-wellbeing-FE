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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/mentalHealth.png"
                alt="Mental Health Icon"
                className="w-15 h-10"
              />
              <h1 className="text-3xl font-semibold text-black">
                <strong className="text-[#956144] font-semibold text-4xl">
                  Self
                </strong>{" "}
                Mental Health & Well-being
              </h1>
            </div>

            <div className="flex justify-center mb-4">
              <img
                src="https://img.freepik.com/free-vector/tiny-people-beautiful-flower-garden-inside-female-head-isolated-flat-illustration_74855-11098.jpg?t=st=1743517262~exp=1743520862~hmac=dc5da5e71f940caeca4d965bc812f1670d8ecd6d44219d4416e28cc1d4329a10&w=996"
                alt="Mental Health Icon"
                className="w-auto h-72 rounded-lg shadow-lg"
              />
            </div>

            <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/self-assessment.png"
                  alt="Brain Icon"
                  className="w-6 h-6"
                />
                <h3 className="font-semibold text-gray-800">
                  ShareYrHearts Self-Understanding Program
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our program is designed to address India mental health
                challenges through comprehensive assessment, personalized
                sessions, and therapeutic interventions. Early intervention can
                significantly improve well-being.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <img
                    src="/images/assessment-icon.svg"
                    alt=""
                    className="w-3 h-3 mr-1"
                  />
                  Comprehensive Assessment
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <img
                    src="/images/personalized-icon.svg"
                    alt=""
                    className="w-3 h-3 mr-1"
                  />
                  Personalized Sessions
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <img
                    src="/images/therapy-icon.svg"
                    alt=""
                    className="w-3 h-3 mr-1"
                  />
                  Therapeutic Interventions
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/warning.png"
                  alt="Warning Icon"
                  className="w-6 h-6"
                />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Warning Signs
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="/images/emotional-icon.svg"
                      alt=""
                      className="w-4 h-4"
                    />
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
                    <img
                      src="/images/behavioral-icon.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    <h3 className="font-medium text-gray-800 text-sm">
                      Behavioral Signs
                    </h3>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></span>
                      <span>Social withdrawal</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></span>
                      <span>Changes in sleep patterns</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></span>
                      <span>Difficulty concentrating</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></span>
                      <span>Increased substance use</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></span>
                      <span>Unexplained aggression</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="/images/physical-icon.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    <h3 className="font-medium text-gray-800 text-sm">
                      Physical Signs
                    </h3>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full"></span>
                      <span>Frequent headaches</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full"></span>
                      <span>Changes in appetite</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full"></span>
                      <span>Fatigue and low energy</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full"></span>
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

            <div className="m-2 flex justify-center">
              {hasPaid ? (
                <button
                  onClick={() => router.push("/questionnaires?userType=self")}
                  className="py-4 w-full min-w-max px-10 bg-blue-400 text-white font-semibold mt-4 rounded-xl
                      transition duration-300 ease-in-out hover:shadow-lg hover:opacity-90
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Begin Your Well-being Journey
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  className="w-full py-4 px-6 mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl
                      transition duration-300 ease-in-out hover:shadow-lg hover:opacity-90
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Make Payment (₹500) to Begin Your Assessment
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/psychology.png"
                  alt="India Icon"
                  className="w-6 h-6"
                />
                <h3 className="font-semibold text-gray-800">
                  Mental Health in India
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Approximately 14.6% of India population (197.3 million people)
                suffer from mental health disorders. With a treatment gap of
                80.4% and only 0.3 psychiatrists per 100,000 people, mental
                health care remains a critical challenge.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/pngegg.png"
                  alt="Benefits Icon"
                  className="w-6 h-6"
                />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Program Benefits
                </h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div>
                    <span className="font-medium text-gray-800">
                      Enhanced Self-Awareness
                    </span>
                    <p className="text-sm text-gray-600">
                      Develop deeper understanding of thoughts, emotions, and
                      behaviors
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div>
                    <span className="font-medium text-gray-800">
                      Improved Coping Mechanisms
                    </span>
                    <p className="text-sm text-gray-600">
                      Learn effective strategies to manage stress and emotional
                      challenges
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div>
                    <span className="font-medium text-gray-800">
                      Empowerment
                    </span>
                    <p className="text-sm text-gray-600">
                      Gain control over your mental health journey through
                      knowledge and tools
                    </p>
                  </div>
                </li>
              </ul>
            </div>

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

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-inner border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <img src="/service.png" alt="Impact Icon" className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-gray-900">
                  The Impact
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-red-100 p-2 rounded-full"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      Economic Burden
                    </h3>
                    <p className="text-xs text-gray-600">
                      Mental health conditions projected to cost India USD 1.03
                      trillion (2012-2030)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      Suicide Rate
                    </h3>
                    <p className="text-xs text-gray-600">
                      WHO estimates 21.1 per 100,000 population in India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      Treatment Gap
                    </h3>
                    <p className="text-xs text-gray-600">
                      80.4% of individuals with common mental disorders dont
                      receive care
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-white p-3 rounded-lg text-xs text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="/images/stigma-icon.svg"
                    alt=""
                    className="w-4 h-4"
                  />
                  <h3 className="font-medium text-gray-800 text-sm">
                    Stigma and Awareness
                  </h3>
                </div>
                <p>
                  Despite the high prevalence, mental health issues in India are
                  often stigmatized, leading to reluctance in seeking
                  professional help. This societal stigma exacerbates the
                  treatment gap, leaving many without necessary care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
