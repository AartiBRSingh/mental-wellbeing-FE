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

const COLORS = ["#77DEFF", "#00FF00", "#FF8458", "#FACC15", "#CCCCFF"];

const SelfAssessmentPage = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const router = useRouter();

  const mentalHealthStats = [
    { name: "Mental Health Concerns", value: 65 },
    { name: "Healthy Mental State", value: 35 },
  ];

  const wellbeingDistribution = [
    { name: "Anxiety", value: 25 },
    { name: "Depression", value: 20 },
    { name: "Work-Life Balance", value: 30 },
    { name: "Relationship Issues", value: 15 },
    { name: "Others", value: 10 },
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-black bg-clip-text">
              <strong className="text-[#956144] font-semibold text-4xl">
                Self
              </strong>{" "}
              Mental Health & Well-being
            </h1>

            <div className="relative h-48 rounded-lg overflow-hidden">
              <img
                src="https://img.freepik.com/free-vector/high-self-esteem-illustration_23-2148766834.jpg?w=740"
                alt="Personal well-being illustration"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <p className="text-gray-600 leading-relaxed">
              Personal well-being is about achieving harmony between your
              mental, emotional, and physical health. Its a journey of
              self-discovery and growth that enables you to live a more
              fulfilling life.
            </p>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-800 italic">
                Understanding and maintaining your mental health is crucial for
                personal growth, relationships, and overall life satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <h3 className="text-lg font-semibold text-center">
                  Mental Health Overview
                </h3>
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
              </div>

              <div className="h-80">
                <h3 className="text-lg font-semibold text-center">
                  Well-being Distribution
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={wellbeingDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
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
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <div className="flex gap-2">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                  Key
                </h2>
                <span className="text-green-500 relative text-4xl block">
                  <span className="relative">
                    Benefits
                    <svg
                      className="absolute w-full h-[6px] bottom-0 left-0"
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
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                  <span>
                    Enhanced self-awareness and emotional intelligence
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span>Improved relationships and communication</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
                  <span>Better work-life balance and stress management</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <div className="flex gap-2">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                  Warning
                </h2>
                <span className="text-green-500 relative text-4xl block">
                  <span className="relative">
                    Signs
                    <svg
                      className="absolute w-full h-[6px] bottom-0 left-0"
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
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                  <span>Persistent feelings of anxiety or depression</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                  <span>Difficulty maintaining relationships</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                  <span>Changes in sleep or eating patterns</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-800 italic">
                Taking care of your mental health is just as important as
                physical health. Our self-assessment program helps you
                understand your emotional well-being and provides tools for
                personal growth and resilience.
              </p>
            </div>
          </div>
        </div>
        <div className="m-2 flex justify-center">
          {hasPaid ? (
            <button
              onClick={() => router.push("/questionnaires?userType=self")}
              className="py-4 min-w-[800px] px-10 bg-gradient-to-r from-[#EBB509] to-purple-600 text-white font-semibold rounded-xl
                      transition duration-300 ease-in-out hover:shadow-lg hover:opacity-90
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Begin Your Well-being Journey
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl
                      transition duration-300 ease-in-out hover:shadow-lg hover:opacity-90
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Make Payment to Begin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
