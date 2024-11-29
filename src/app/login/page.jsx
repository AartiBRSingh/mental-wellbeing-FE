"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import { DecorativeShapes } from "../sections/Services";
import { baseURL } from "../baseURL";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const router = useRouter();

  const onEmailSubmit = async (identifier) => {
    try {
      await axios.post(`${baseURL}/users/request-otp`, { identifier });
      setIsOtpSent(true);
    } catch (error) {
      throw new Error(
        error.response?.data || "Failed to send OTP. Please try again."
      );
    }
  };

  const onOtpSubmit = async ({ identifier, otp }) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        identifier,
        otp,
      });
      const { token } = response?.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("name", response?.data.profile.name);
      localStorage.setItem("email", response?.data.profile.email);
      localStorage.setItem("userType", response?.data.profile.userType);
      localStorage.setItem("caseStudy", response?.data.profile.caseStudy)

      router.push(
        `/questionnaires?userType=${localStorage.getItem("userType")}`
      );
    } catch (error) {
      throw new Error(error.response?.data || "Invalid OTP. Please try again.");
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onEmailSubmit(email);
    } catch (error) {
      setError("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onOtpSubmit({ identifier: email, otp });
    } catch (error) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex justify-center items-center bg-[#003B29] rounded-3xl w-[80vw] h-[80vh] flex-wrap px-16 relative">
        <DecorativeShapes />
        <div className="flex-1 flex items-center justify-center p-4">
          <section className="flex-1 flex flex-col gap-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
                CARING IS ALWAYS FREE{" "}
              </span>
            </div>
            <h1 className="lg:text-6xl text-xl text-white">
              <span>We help you to </span>
              <br />
              <span className="text-[#FDD56A] relative">
                g
                <span className="relative">
                  row confidence
                  <svg
                    className="absolute w-full h-[10px] bottom-0 left-0"
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
              <br />
              <span> at any age</span>
            </h1>

            <p className="text-white max-w-md">
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </p>
          </section>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <form
            onSubmit={isOtpSent ? handleOtpSubmit : handleEmailSubmit}
            className="w-full max-w-sm px-8 py-10 border border-gray-200 rounded shadow-sm bg-white"
          >
            <h2 className="text-2xl font-semibold mb-4">
              {isOtpSent ? "Verify OTP" : "Login"}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {isOtpSent && (
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter OTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-gray-600 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Loading..." : isOtpSent ? "Verify OTP" : "Send OTP"}
            </button>

            <p className="mt-4 text-center">
              Do not have an account yet?{" "}
              <Link href={"/signup"}>
                <button type="button" className="text-red-500 underline">
                  Sign up here
                </button>
              </Link>
            </p>

            <div className="mt-4 text-center">
              <Link href={"/"}>
                <button type="button" className="text-blue-500 underline">
                  Go Back to Home
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
