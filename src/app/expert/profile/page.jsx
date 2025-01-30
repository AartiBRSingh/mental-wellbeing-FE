"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomCursor from "../../components/CustomCursor";
import { baseURL } from "../../baseURL";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
      <CustomCursor />
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
  console.log(profile?.experience?.length, "raju");

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
      key: "rzp_test_CR2IahVWmEdcMA",
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

  // return (
  //   <div className=" my-10 flex justify-center items-center">
  //     <div className="min-h-screen  rounded-md bg-white  w-[80vw]">
  //       {/* Hero Section */}
  //       <header className="px-6 pt-12">
  //         <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  //           <div className="space-y-6">
  //             <div className="flex items-center gap-4 mb-6">
  //               <h2 className="text-6xl font-light leading-tight">
  //                 {profile.name}
  //               </h2>
  //               <div className="flex gap-2">
  //                 {profile.verifyEmail && (
  //                   <span className="px-3 py-1 bg-black text-white text-sm">
  //                     Verified Email
  //                   </span>
  //                 )}
  //                 {profile.verifyPhone && (
  //                   <span className="px-3 py-1 bg-black text-white text-sm">
  //                     Verified Phone
  //                   </span>
  //                 )}
  //               </div>
  //             </div>
  //             <div className="space-y-4">
  //               <h3 className="text-3xl font-light">{profile.userType}</h3>
  //               <div className="flex items-center gap-4 text-gray-600">
  //                 <span>{profile.email}</span>
  //                 <span>{profile.contactNumber}</span>
  //               </div>
  //               <div className="flex items-center gap-2 text-gray-600">
  //                 <span>
  //                   {profile.city}, {profile.state}
  //                 </span>
  //                 {!profile.verifyEmail && (
  //                   <span className="text-red-500 text-sm">
  //                     (Email not verified)
  //                   </span>
  //                 )}
  //                 {!profile.verifyPhone && (
  //                   <span className="text-red-500 text-sm">
  //                     (Phone not verified)
  //                   </span>
  //                 )}
  //               </div>
  //             </div>
  //             <div className="flex flex-wrap gap-2">
  //               {profile.specialization.map((spec, index) => (
  //                 <span
  //                   key={index}
  //                   className="px-4 py-1 border border-black text-sm"
  //                 >
  //                   {spec}
  //                 </span>
  //               ))}
  //             </div>
  //             <p className="text-xl text-gray-600 leading-relaxed  break-words w-full">
  //               {profile.about}
  //             </p>
  //           </div>
  //           <div className="relative aspect-square">
  //             <img
  //               src={profile.image}
  //               alt={profile.name}
  //               className="w-full h-full object-cover"
  //             />
  //           </div>
  //         </div>
  //       </header>

  //       {/* Main Content */}
  //       <main className="px-6 py-24">
  //         <div className="max-w-screen-xl mx-auto space-y-32">
  //           {/* Experience */}
  //           <section>
  //             <h3 className="text-4xl font-light mb-12">Experience</h3>
  //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
  //               {profile.experience.map((exp, index) => (
  //                 <div key={index} className="group">
  //                   <div className="mb-4 overflow-hidden">
  //                     <div className="text-5xl font-light text-gray-200 group-hover:text-black transition-colors">
  //                       {String(index + 1).padStart(2, "0")}
  //                     </div>
  //                   </div>
  //                   <h4 className="text-xl font-medium mb-2">{exp.title}</h4>
  //                   <p className="text-gray-600 mb-2">{exp.location}</p>
  //                   <p className="text-sm text-gray-500 mb-4">
  //                     {new Date(exp.startDate).toLocaleDateString()} -
  //                     {new Date(exp.endDate).toLocaleDateString()}
  //                   </p>
  //                   <p className="text-gray-600">{exp.description}</p>
  //                 </div>
  //               ))}
  //             </div>
  //           </section>

  //           {/* Services & Expertise */}
  //           <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
  //             <div>
  //               <h3 className="text-4xl font-light mb-12">Services</h3>
  //               <div className="space-y-6">
  //                 {profile.services.map((service, index) => (
  //                   <div key={index} className="group flex items-center gap-4">
  //                     <div className="w-2 h-2 bg-black rounded-full"></div>
  //                     <span className="text-xl">{service}</span>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //             <div>
  //               <h3 className="text-4xl font-light mb-12">Therapies</h3>
  //               <div className="space-y-6">
  //                 {profile.therapies.map((therapy, index) => (
  //                   <div key={index} className="group flex items-center gap-4">
  //                     <div className="w-2 h-2 bg-black rounded-full"></div>
  //                     <span className="text-xl">{therapy}</span>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           </section>

  //           {/* Education & Awards */}
  //           <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
  //             <div>
  //               <h3 className="text-4xl font-light mb-12">Education</h3>
  //               <div className="space-y-12">
  //                 {profile.education.map((edu, index) => (
  //                   <div key={index} className="group">
  //                     <h4 className="text-xl font-medium mb-2">{edu.school}</h4>
  //                     <p className="text-gray-600 mb-2">
  //                       {edu.degree} in {edu.fieldOfStudy}
  //                     </p>
  //                     <p className="text-sm text-gray-500">
  //                       {new Date(edu.startDate).toLocaleDateString()} -
  //                       {new Date(edu.endDate).toLocaleDateString()}
  //                     </p>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //             <div>
  //               <h3 className="text-4xl font-light mb-12">Awards</h3>
  //               <div className="space-y-12">
  //                 {profile.honorsAndAwards.map((award, index) => (
  //                   <div key={index} className="group">
  //                     <h4 className="text-xl font-medium mb-2">
  //                       {award.title}
  //                     </h4>
  //                     <p className="text-gray-600 mb-2">{award.issuer}</p>
  //                     <p className="text-sm text-gray-500 mb-2">
  //                       {new Date(award.issueDate).toLocaleDateString()}
  //                     </p>
  //                     <p className="text-gray-600">{award.description}</p>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           </section>

  //           {/* Contact Section */}
  //           <section className="bg-black text-white">
  //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 p-24">
  //               {/* Contact Information */}
  //               <div>
  //                 <h3 className="text-4xl font-light mb-12">
  //                   Contact Information
  //                 </h3>
  //                 <div className="space-y-8">
  //                   {/* Email Section */}
  //                   <div className="text-xl">
  //                     <span className="block text-gray-400 mb-2">Email</span>
  //                     {profile.email}
  //                     {!profile.verifyEmail && (
  //                       <>
  //                         <span className="block text-sm text-red-400 mt-1">
  //                           Not Verified
  //                         </span>
  //                         <button
  //                           className="mt-2 text-sm underline"
  //                           onClick={() => requestOTP(profile.email)}
  //                           disabled={loading}
  //                         >
  //                           {loading ? "Sending..." : "Send OTP"}
  //                         </button>
  //                         <div className="mt-2">
  //                           <input
  //                             type="text"
  //                             placeholder="Enter OTP"
  //                             className="p-2 border border-gray-400 text-black"
  //                             value={emailOTP}
  //                             onChange={(e) => setEmailOTP(e.target.value)}
  //                           />
  //                           <button
  //                             className="ml-2 px-4 py-2 bg-green-500 text-white"
  //                             onClick={() => verifyOTP(profile.email, emailOTP)}
  //                             disabled={loading}
  //                           >
  //                             {loading ? "Verifying..." : "Verify"}
  //                           </button>
  //                         </div>
  //                       </>
  //                     )}
  //                   </div>
  //                   {/* Phone Section */}
  //                   <div className="text-xl">
  //                     <span className="block text-gray-400 mb-2">Phone</span>
  //                     {profile.contactNumber}
  //                     {!profile.verifyPhone && (
  //                       <>
  //                         <span className="block text-sm text-red-400 mt-1">
  //                           Not Verified
  //                         </span>
  //                         <button
  //                           className="mt-2 text-sm underline"
  //                           onClick={() => requestOTP(profile.contactNumber)}
  //                           disabled={loading}
  //                         >
  //                           {loading ? "Sending..." : "Send OTP"}
  //                         </button>
  //                         <div className="mt-2">
  //                           <input
  //                             type="text"
  //                             placeholder="Enter OTP"
  //                             className="p-2 border border-gray-400 text-black"
  //                             value={phoneOTP}
  //                             onChange={(e) => setPhoneOTP(e.target.value)}
  //                           />
  //                           <button
  //                             className="ml-2 px-4 py-2 bg-green-500 text-white"
  //                             onClick={() =>
  //                               verifyOTP(profile.contactNumber, phoneOTP)
  //                             }
  //                             disabled={loading}
  //                           >
  //                             {loading ? "Verifying..." : "Verify"}
  //                           </button>
  //                         </div>
  //                       </>
  //                     )}
  //                   </div>
  //                   {/* Location Section */}
  //                   <p className="text-xl">
  //                     <span className="block text-gray-400 mb-2">Location</span>
  //                     {profile.city}, {profile.state}
  //                   </p>
  //                 </div>
  //               </div>

  //               {/* Languages Section */}
  //               <div>
  //                 <h3 className="text-4xl font-light mb-12">Languages</h3>
  //                 <div className="flex flex-wrap gap-4">
  //                   {profile.languages.map((lang, index) => (
  //                     <span
  //                       key={index}
  //                       className="px-6 py-3 border border-white/20"
  //                     >
  //                       {lang}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Feedback Messages */}
  //             {error && <p className="text-red-500 mt-4">{error}</p>}
  //             {success && <p className="text-green-500 mt-4">{success}</p>}
  //           </section>
  //         </div>
  //       </main>
  //     </div>
  //     <PricingPlans
  //       plans={plans}
  //       showPopup={showPopup}
  //       handleClosePopup={handleClosePopup}
  //       handlePayment={handlePayment}
  //     />
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {/* Hero Section - Modernized */}
        <header className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <h2 className="text-5xl font-light text-gray-800 leading-tight">
                  {profile.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.verifyEmail && (
                    <span className="px-4 py-1.5 bg-green-50 text-green-700 text-sm rounded-full flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Verified Email
                    </span>
                  )}
                  {profile.verifyPhone && (
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Verified Phone
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-gray-700">
                  {profile.userType}
                </h3>
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
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
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span>{profile.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span>
                      {profile.city}, {profile.state}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {profile.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mt-6">
                {profile.about}
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Experience Section - Enhanced */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b">
              Experience
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {profile.experience.map((exp, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 "
                >
                  <div className="mb-4">
                    <div className="text-5xl font-light text-gray-500 group-hover:text-gray-800 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {exp.title}
                  </h4>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
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
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
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
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services & Expertise Section - Modernized */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b">
                Services
              </h3>
              <div className="space-y-4">
                {profile.services.map((service, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-lg text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b">
                Therapies
              </h3>
              <div className="space-y-4">
                {profile.therapies.map((therapy, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-lg text-gray-700">{therapy}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Education & Awards Section - Enhanced */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b">
                Education
              </h3>
              <div className="space-y-8">
                {profile.education.map((edu, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {edu.school}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
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

            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-light text-gray-800 mb-8 pb-4 border-b">
                Awards
              </h3>
              <div className="space-y-8">
                {profile.honorsAndAwards.map((award, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {award.title}
                    </h4>
                    <p className="text-gray-600 mb-2">{award.issuer}</p>
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
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
                    <p className="text-gray-600">{award.description}</p>
                  </div>
                ))}
              </div>
            </section>
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
