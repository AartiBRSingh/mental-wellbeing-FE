"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DecorativeShapes } from "../sections/Services";
import { baseURL } from "../baseURL";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import RecaptchaProvider from "../utils/RecaptchaProvider";
import VerificationModal from "./VerificationModal";

const LoginModal = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [isLoginWIthOrgCode, setLoginWIthOrgCode] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();

  const onEmailSubmit = async (identifier, recaptchaToken) => {
    const url = isUserLogin
      ? `${baseURL}/users/request-otp`
      : `${baseURL}/expert/request-otp`;
    try {
      await axios.post(url, {
        identifier,
        recaptchaToken,
      });
      setIsOtpSent(true);
    } catch (error) {
      throw new Error(
        error.response?.data || "Failed to send OTP. Please try again."
      );
    }
  };

  const onOtpSubmit = async ({
    identifier,
    otp,
    organizationCode,
    recaptchaToken,
  }) => {
    const url = isUserLogin
      ? `${baseURL}/users/login`
      : `${baseURL}/expert/login`;
    try {
      const response = await axios.post(url, {
        identifier,
        otp,
        organizationCode,
        recaptchaToken,
      });
      const { token, profile } = response?.data;

      Cookies.set("authToken", token);
      Cookies.set("userId", profile.userId);
      Cookies.set("name", profile.name);
      Cookies.set("email", profile.email);
      Cookies.set("userType", profile.userType);
      Cookies.set("contactNumber", profile.contactNumber);

      if (!isUserLogin) {
        Cookies.set("hasPackage", profile.hasPackage);
        Cookies.set("packageId", profile.packageId || "");
        Cookies.set("city", profile.city);
        Cookies.set("state", profile.state);
        Cookies.set("verifyPhone", profile.verifyPhone);
        Cookies.set("verifyEmail", profile.verifyEmail);
      } else {
        Cookies.set("caseStudy", profile.caseStudy);
        Cookies.set("paidForSelf", profile.paidForSelf);
        Cookies.set("paidForEmployee", profile.paidForEmployee);
        Cookies.set("paidForStudent", profile.paidForStudent);
      }
      if (isUserLogin) {
        router.push(`/${Cookies.get("userType")}`);
      } else {
        router.push(`/expert/profile`);
      }
    } catch (error) {
      throw new Error(
        error.response?.data || "Invalid credentials. Please try again."
      );
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      setError("reCAPTCHA not available. Please try again later.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recaptchaToken = await executeRecaptcha("login_email");

      if (isLoginWIthOrgCode) {
        await onOtpSubmit({
          identifier: email,
          otp: "",
          organizationCode,
          recaptchaToken,
        });
      } else {
        await onEmailSubmit(email, recaptchaToken);
        toast.success("OTP Sent!");
      }
    } catch (error) {
      setError(
        isLoginWIthOrgCode
          ? "Invalid credentials"
          : "An error occurred while sending OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      setError("reCAPTCHA not available. Please try again later.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recaptchaToken = await executeRecaptcha("verify_otp");
      await onOtpSubmit({
        identifier: email,
        otp,
        organizationCode,
        recaptchaToken,
      });
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full min-h-screen flex justify-center items-center p-4">
        <Toaster position="bottom-left" reverseOrder={false} />
        <div>
          <div className="w-full lg:w-auto flex items-center justify-center p-4 z-10 mb-8 lg:mb-0">
            <form
              onSubmit={isOtpSent ? handleOtpSubmit : handleEmailSubmit}
              className="w-full max-w-full p-4 md:px-8 md:py-10 border border-gray-200 rounded shadow-sm bg-white"
            >
              <button onClick={onClose} className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                <span
                  className={`text-xs md:text-sm font-medium ${
                    isUserLogin ? "text-black" : "text-gray-500"
                  }`}
                >
                  User Login
                </span>
                <div
                  className="w-12 md:w-14 h-6 md:h-7 bg-gray-300 rounded-full cursor-pointer relative"
                  onClick={() => setIsUserLogin(!isUserLogin)}
                >
                  <div
                    className={`
                  absolute top-1 w-4 md:w-5 h-4 md:h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                  ${
                    isUserLogin
                      ? "translate-x-1"
                      : "translate-x-7 md:translate-x-8"
                  }
                `}
                  />
                </div>

                <span
                  className={`text-xs md:text-sm font-medium ${
                    !isUserLogin ? "text-black" : "text-gray-500"
                  }`}
                >
                  Expert Login
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
                {isOtpSent ? "Verify OTP" : "Login"}
              </h2>
              {error && (
                <p className="text-red-500 mb-3 md:mb-4 text-sm">{error}</p>
              )}
              <div className="mb-3 md:mb-4">
                <label
                  htmlFor="email"
                  className="block text-xs md:text-sm font-medium text-gray-700"
                >
                  Email or Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
                  required
                />
              </div>
              {isLoginWIthOrgCode && (
                <div className="mb-3 md:mb-4">
                  <label
                    htmlFor="organizationCode"
                    className="block text-xs md:text-sm font-medium text-gray-700"
                  >
                    Enter Organization Code{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationCode"
                    value={organizationCode}
                    onChange={(e) => setOrganizationCode(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>
              )}
              {isOtpSent && !isLoginWIthOrgCode && (
                <div className="mb-3 md:mb-4">
                  <label
                    htmlFor="otp"
                    className="block text-xs md:text-sm font-medium text-gray-700"
                  >
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="cursor-pointer w-full bg-black text-white p-2 md:p-3 rounded-lg text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : isLoginWIthOrgCode
                  ? "Login"
                  : isOtpSent
                  ? "Verify OTP"
                  : "Send OTP"}
              </button>
              {!isLoginWIthOrgCode && (
                <>
                  <p className="text-center my-2 text-sm">- or -</p>
                  <button
                    type="button"
                    onClick={() => setLoginWIthOrgCode(true)}
                    className="cursor-pointer w-full bg-black text-white p-2 md:p-3 rounded-lg text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
                  >
                    Login with organization code
                  </button>
                </>
              )}
              <p className="mt-3 md:mt-4 text-center text-xs md:text-sm">
                Do not have an account yet?{" "}
                <Link
                  href={`/signup?signedUpFor=${pathname}`}
                  className="cursor-pointer"
                >
                  <button
                    type="button"
                    className="text-red-500 underline cursor-pointer"
                  >
                    Sign up here
                  </button>
                </Link>
              </p>
              <div className="mt-2 md:mt-4 text-center text-xs md:text-sm">
                <Link href={"/"} className="cursor-pointer">
                  <button
                    type="button"
                    className="text-blue-500 underline cursor-pointer"
                  >
                    Go Back to Home
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
