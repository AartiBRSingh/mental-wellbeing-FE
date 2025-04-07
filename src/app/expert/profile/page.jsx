"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomCursor from "../../components/CustomCursor";
import { baseURL } from "../../baseURL";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import WalletBalance from "@/app/components/WalletBalance";

const PricingPlans = ({
  plans,
  showPopup,
  handleClosePopup,
  handlePayment,
}) => {
  if (!showPopup) return null;

  const CheckIcon = () => (
    <svg
      className="w-4 h-4 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl animate-in fade-in duration-300">
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Upgrade Your Plan
            </h2>
            <p className="text-gray-600 mt-2">
              Choose a plan below to unlock features and credits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="relative overflow-hidden rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {plan.id === "Pro" && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600 ml-2">INR</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {plan.credits}
                    </span>{" "}
                    credits included
                  </div>

                  <div className="space-y-2">
                    {plan.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckIcon />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    onClick={() => {
                      handlePayment(plan._id, plan.price);
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleClosePopup}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileDashboard = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [hasPackage, setHasPackage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [plans, setPlans] = useState([]);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [verifyPhone, setVerifyPhone] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const requestOTP = async (identifier) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${baseURL}/expert/request-otp-for-verification`,
        {
          identifier,
        }
      );
      setSuccess("OTP sent successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (identifier, otp) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`${baseURL}/expert/verify-expert`, {
        identifier,
        otp,
      });
      setSuccess("Verification successful!");
      setVerifyEmail(profile.verifyEmail);
      setVerifyPhone(profile.verifyPhone);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    const storedHasPackage = Cookies.get("hasPackage");
    const storedPhoneVerify = Cookies.get("verifyPhone");
    const storedEmailVerify = Cookies.get("verifyEmail");
    setUserId(storedUserId);
    setHasPackage(storedHasPackage);
    setVerifyPhone(storedPhoneVerify);
    setVerifyEmail(storedEmailVerify);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${baseURL}/get-expert/${userId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${baseURL}/plans`);
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (hasPackage !== "true") {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasPackage]);

  useEffect(() => {
    if (profile?.experience?.length === 0) {
      const timer = setTimeout(() => {
        router.push("/expert/complete-profile");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [profile?.experience?.length, router]);

  const handleClosePopup = () => {
    setShowPopup(false);
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

    setUserId(storedUserId);
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNo(storedPhoneNo);
  }, []);

  const handlePayment = async (packageId, amount) => {
    const response = await fetch(`${baseURL}/api/create-order-expert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount, packageId }),
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
        const verifyResponse = await fetch(
          `${baseURL}/api/verify-payment-expert`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId,
              amount,
              packageId,
            }),
          }
        );

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("Payment Successful!");
          Cookies.set("paymentDetails", JSON.stringify({ hasPackage: true }));
          setShowPopup(false);
          Cookies.set("hasPackage", true);
          Cookies.set("packageId", packageId);
          window.location.reload();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-24 h-24 rounded-full border-2 border-t-black animate-spin"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Hero Section - Modernized */}
        <header className="relative bg-gradient-to-r from-white to-gray-50 rounded-2xl p-10 shadow-md mb-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Profile Image */}
            <div className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-lg border-4 border-gray-200 hover:border-gray-300 transition-all">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4">
              {/* Name & Verification Badges */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <span className="text-black relative text-4xl md:text-6xl lg:text-5xl block">
                  <span className="relative">
                    {profile.name}
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
                {/* <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900">
                  {profile.name}
                </h2> */}
                <div className="flex flex-wrap gap-2">
                  {profile.verifyEmail && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full flex items-center shadow-sm">
                      ✅ Verified Email
                    </span>
                  )}
                  {profile.verifyPhone && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center shadow-sm">
                      📞 Verified Phone
                    </span>
                  )}
                </div>
              </div>
              {/* User Type & Contact Info */}
              <h3 className="text-2xl font-medium text-gray-700">
                {profile.userType}
              </h3>
              <div>
                <WalletBalance balance={profile.walletBalance} />
              </div>
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  ✉️ <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  📞 <span>{profile.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  📍{" "}
                  <span>
                    {profile.city}, {profile.state}
                  </span>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-3 pt-3">
                {profile.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium shadow hover:bg-gray-200 transition-all"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* About Section */}
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                {profile.about}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-4">
          {/* Experience Section */}
          <section className="bg-white rounded-2xl p-8 shadow-lg flex-1 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
              <span className="bg-blue-50 p-2 rounded-lg">💼</span>
              Experience
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {profile.experience.map((exp, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl shadow-lg border-2 border-black hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-[-4rem] group-hover:translate-x-12 transition-transform duration-300 opacity-20" />
                  <div className="mb-4">
                    <div className="text-6xl font-light text-blue-200 group-hover:text-blue-300 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {exp.title}
                  </h4>
                  <div className="space-y-3">
                    <p className="text-gray-600 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {exp.location}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {new Date(exp.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mt-4 leading-relaxed bg-white p-4 rounded-lg shadow-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Services & Expertise Section */}
            <div className="grid grid-cols-2 gap-6 lg:w-[800px]">
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
                  <span className="bg-indigo-50 p-2 rounded-lg">⚡</span>
                  Services
                </h3>
                <div className="space-y-4">
                  {profile.services.map((service, index) => (
                    <div
                      key={index}
                      className="group p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 flex items-center gap-4"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-lg text-gray-700 group-hover:text-indigo-700 transition-colors">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
                  <span className="bg-emerald-50 p-2 rounded-lg">🌿</span>
                  Therapies
                </h3>
                <div className="space-y-4">
                  {profile.therapies.map((therapy, index) => (
                    <div
                      key={index}
                      className="group p-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 flex items-center gap-4"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-lg text-gray-700 group-hover:text-emerald-700 transition-colors">
                        {therapy}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Education & Awards Section */}
            <div className="grid grid-cols-1 gap-6 lg:w-[600px]">
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
                  <span className="bg-violet-50 p-2 rounded-lg">🎓</span>
                  Education
                </h3>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-xl hover:bg-violet-50 transition-all duration-300"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">
                        {edu.school}
                      </h4>
                      <p className="text-gray-600 mb-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <svg
                          className="w-4 h-4 text-violet-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(edu.startDate).toLocaleDateString()} -{" "}
                        {new Date(edu.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
                  <span className="bg-amber-50 p-2 rounded-lg">🏆</span>
                  Awards
                </h3>
                <div className="space-y-6">
                  {profile.honorsAndAwards.map((award, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-xl hover:bg-amber-50 transition-all duration-300"
                    >
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">
                        {award.title}
                      </h4>
                      <p className="text-gray-600 mb-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                        {award.issuer}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <svg
                          className="w-4 h-4 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {new Date(award.issueDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                        {award.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Contact Section - Modernized */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-3xl font-light text-white mb-8 pb-4 border-b border-gray-700">
                  Contact Information
                </h3>

                {/* Email Section */}
                <div className="space-y-4">
                  <div className="text-lg">
                    <span className="block text-gray-400 mb-2">Email</span>
                    <div className="flex items-center gap-2 text-white">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {profile.email}
                    </div>

                    {!profile.verifyEmail && (
                      <div className="mt-4 space-y-4">
                        <span className="block text-red-400 text-sm">
                          Not Verified
                        </span>
                        <button
                          className="px-4 py-2 bg-blue-500
                          hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                          onClick={() => requestOTP(profile.email)}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            "Send OTP"
                          )}
                        </button>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter OTP"
                            className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={emailOTP}
                            onChange={(e) => setEmailOTP(e.target.value)}
                          />
                          <button
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            onClick={() => verifyOTP(profile.email, emailOTP)}
                            disabled={loading}
                          >
                            {loading ? "Verifying..." : "Verify"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Section */}
                <div className="space-y-4">
                  <div className="text-lg">
                    <span className="block text-gray-400 mb-2">Phone</span>
                    <div className="flex items-center gap-2 text-white">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {profile.contactNumber}
                    </div>

                    {!profile.verifyPhone && (
                      <div className="mt-4 space-y-4">
                        <span className="block text-red-400 text-sm">
                          Not Verified
                        </span>
                        <button
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                          onClick={() => requestOTP(profile.contactNumber)}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            "Send OTP"
                          )}
                        </button>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter OTP"
                            className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={phoneOTP}
                            onChange={(e) => setPhoneOTP(e.target.value)}
                          />
                          <button
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            onClick={() =>
                              verifyOTP(profile.contactNumber, phoneOTP)
                            }
                            disabled={loading}
                          >
                            {loading ? "Verifying..." : "Verify"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Section */}
                <div className="text-lg">
                  <span className="block text-gray-400 mb-2">Location</span>
                  <div className="flex items-center gap-2 text-white">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {profile.city}, {profile.state}
                  </div>
                </div>

                {/* Feedback Messages */}
                {error && (
                  <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
                    <p className="text-green-500">{success}</p>
                  </div>
                )}
              </div>

              {/* Languages Section */}
              <div>
                <h3 className="text-3xl font-light text-white mb-8 pb-4 border-b border-gray-700">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-4">
                  {profile.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Pricing Plans Modal */}
        <PricingPlans
          plans={plans}
          showPopup={showPopup}
          handleClosePopup={handleClosePopup}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default ProfileDashboard;
