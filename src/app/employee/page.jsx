"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import Cookies from "js-cookie";

const COLORS = ["#77DEFF", "#A1DC6E", "#FF8458", "#FACC15"];

const WorkplaceMentalHealthPage = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const router = useRouter();

  const workplaceStats = [
    { name: "Mental Health Issues", value: 15 },
    { name: "Healthy Mental State", value: 85 },
  ];

  const impactStats = [
    { name: "Depression", value: 40 },
    { name: "Anxiety", value: 35 },
    { name: "Stress", value: 25 },
  ];

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
    const paidForEmployee = Cookies.get("paidForEmployee");

    setUserId(storedUserId);
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNo(storedPhoneNo);

    if (paidForEmployee !== "false") {
      setHasPaid(true);
    }
  }, []);

  const handlePayment = async () => {
    // ... (keeping the existing payment handling code)
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD255] to-green-500 bg-clip-text text-transparent">
              Mental Health in the Workplace
            </h1>

            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <img
                src="https://img.freepik.com/free-vector/good-team-concept-illustration_114360-4225.jpg?t=st=1737958269~exp=1737961869~hmac=9f55dffa1ad3cbe3003fbe6986667390cde22ce60ebf14ec70599896f3d62e8b&w=740"
                alt="Nature scene representing mental wellness"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <p className="text-gray-600 leading-relaxed">
              Understanding and supporting mental health in the workplace is
              crucial. Our data shows significant impact on both individuals and
              organizations.
            </p>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-800 italic">
                A healthy workplace is one that actively promotes and protects
                the mental well-being of its employees.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <div className="flex gap-2">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                  Key
                </h2>
                <span className="text-green-500 relative text-4xl md:text-6xl lg:text-4xl block">
                  <span className="relative">
                    Findings
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
                    12 billion working days lost annually to mental health
                    issues
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                  <span>
                    1 in 6 employees experience mental health problems
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
                  <span>Economic engagement crucial for recovery</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <h3 className="text-lg font-semibold  text-center">
                  Current Workplace Statistics
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={workplaceStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {workplaceStats.map((entry, index) => (
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

              <div className="h-60">
                <h3 className="text-lg font-semibold text-center">
                  Mental Health Impact Distribution
                </h3>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={impactStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
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
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-inner ">
              <div className="flex gap-2">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                  Warning
                </h2>
                <span className="text-green-500 relative text-4xl md:text-6xl lg:text-4xl block">
                  <span className="relative">
                    signs
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
                  <span>Persistent tardiness and visible stress</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                  <span>Emotional volatility and withdrawal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                  <span>Difficulty with feedback and communication</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              {hasPaid ? (
                <button
                  onClick={() =>
                    router.push("/questionnaires?userType=employee")
                  }
                  className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-[#EBB509] to-purple-600 text-white font-semibold rounded-xl
                  transition duration-300 ease-in-out hover:shadow-lg hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Begin Your Mental Health Journey
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
      </div>
    </div>
  );
};

export default WorkplaceMentalHealthPage;
