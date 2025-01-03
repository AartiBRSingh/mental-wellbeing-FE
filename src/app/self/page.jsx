"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseURL } from "../baseURL";

const Page = () => {
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

    const userPaymentDetails = JSON.parse(
      localStorage.getItem("paymentDetails")
    );
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedPhoneNo = localStorage.getItem("contactNumber");

    setUserId(storedUserId);
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNo(storedPhoneNo);

    if (userPaymentDetails && userPaymentDetails.hasPaid) {
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
          }),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("Payment Successful!");
          localStorage.setItem(
            "paymentDetails",
            JSON.stringify({ hasPaid: true })
          );
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
    <div className="bg-transparent flex items-center justify-center p-6">
      <div className="max-w-7xl w-full bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl">
        <div className="relative">
          <img
            src="/self.png"
            alt="Student Well-being"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="p-8 space-y-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            Discover Your Potential: A Journey of Self-Understanding
          </h1>

          <p className="text-gray-600 leading-relaxed">
            Self-understanding is the key to unlocking your personal growth and
            potential. It&apos;s about recognizing your unique strengths,
            embracing your vulnerabilities, and charting a path of continuous
            self-improvement.
          </p>

          <div className="bg-gray-100 border-l-4 border-black p-4 rounded-r-lg">
            <p className="text-gray-800 italic">
              &quot;Know yourself. Your greatest asset is your understanding of
              who you are and who you can become.&quot;
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Why Self-Understanding Matters
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Enhances decision-making and personal clarity</li>
              <li>Builds authentic self-confidence</li>
              <li>Improves relationship dynamics</li>
              <li>Helps identify personal goals and passions</li>
            </ul>
          </div>
          <div className="mt-6">
            {hasPaid ? (
              <button
                onClick={() => router.push("/questionnaires?userType=self")}
                className="w-full py-3 px-6 bg-black text-white font-semibold rounded-full 
                transition duration-300 ease-in-out 
                hover:bg-gray-800 hover:shadow-lg 
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Begin Your Self-Discovery
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
  );
};

export default Page;
