"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseURL } from "../baseURL";
import Cookies from "js-cookie";

const StudentWellbeingPage = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const router = useRouter();

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
    <div className="flex items-center justify-center p-6">
      <img
        src="https://img.freepik.com/free-vector/hand-painted-watercolor-nature-background_23-2148941603.jpg?t=st=1738214446~exp=1738218046~hmac=18198897681cec14319e7653577f8232cb534bda98ec75c6f4ce552dc9b94fdc&w=1380"
        alt="Background"
        className="absolute w-full h-[720px] object-cover rounded-lg opacity-40"
      />
      <div className="relative z-10">
        <div className="max-w-7xl w-full bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl">
          {/* Image Section */}
          <div className="relative">
            <img
              src="https://img.freepik.com/free-vector/happy-students-jumping-with-flat-design_23-2147907627.jpg?t=st=1737958353~exp=1737961953~hmac=b35ff6009000582dff7710c6c86c923f98fb82aa915ccc17fbbd564321b15760&w=740"
              alt="Student Well-being"
              className="w-full h-full object-contain object-center"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 leading-tight rounded-3xl text-center p-4">
              Student Well-being: Nurturing Holistic Growth
            </h1>

            <p className="text-gray-600 leading-relaxed">
              Student well-being is described as the manifestation of good
              emotion in life as a result of the harmonious interaction of
              unique environmental factors and individual expectations.
            </p>

            <div className="bg-gray-100 border-l-4 border-black p-4 rounded-r-lg shadow-xl">
              <p className="text-gray-800 italic">
                &quot;Well-being is a state where individuals realize their
                potential, cope with life&apos;s stresses, work productively,
                and contribute to their community.&quot; - World Health
                Organisation (WHO)
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 rounded-full bg-[#77DEFF] p-2 max-w-[380px] text-center">
                Key Aspects of Student Well-being
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Spiritual Development</li>
                <li>Physical Health</li>
                <li>Social Interaction</li>
                <li>Mental Resilience</li>
              </ul>
            </div>

            <div className="mt-6">
              {hasPaid ? (
                <button
                  onClick={() =>
                    router.push("/questionnaires?userType=student")
                  }
                  className="w-full py-3 px-6 bg-black text-white font-semibold rounded-full 
                transition duration-300 ease-in-out 
                hover:bg-[#FACC15] hover:text-black hover:shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Begin Your Journey
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  className="w-full py-3 px-6 bg-black text-white font-semibold rounded-full 
                transition duration-300 ease-in-out 
                hover:bg-gray-800 hover:shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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

export default StudentWellbeingPage;
