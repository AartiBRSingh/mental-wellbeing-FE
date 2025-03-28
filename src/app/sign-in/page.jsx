"use client";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { DecorativeShapes } from "../sections/Services";
import { baseURL } from "../baseURL";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import VerificationModal from "../components/VerificationModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [isLoginWIthOrgCode, setLoginWIthOrgCode] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const searchParams = useSearchParams();
  console.log(searchParams.get("userType"), "raju");

  useEffect(() => {
    if (searchParams.get("userType") === "expert") {
      setIsUserLogin(false);
    }
  }, [searchParams]);

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
      toast.success("OTP Sent!");
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.verificationRequired
      ) {
        setShowVerificationModal(true);
        toast.error("Verification required.");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      setError(error.response?.data?.message || "Something went wrong");
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

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-center items-center bg-[#003B29] rounded-3xl w-full max-w-6xl md:h-auto lg:h-[80vh] flex-col lg:flex-row p-6 md:p-8 lg:px-12 relative overflow-hidden">
        <DecorativeShapes />
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 z-10 mb-8 lg:mb-0">
          <section className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <div className="inline-block">
              <span className="px-3 py-1 md:px-4 md:py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
                CARING IS ALWAYS FREE
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
              <span>We help you to </span>
              <br />
              <span className="text-[#FDD56A] relative">
                g
                <span className="relative">
                  row confidence
                  <svg
                    className="absolute w-full h-[6px] md:h-[8px] lg:h-[10px] bottom-0 left-0"
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

            <p className="text-white text-sm md:text-base max-w-md">
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </p>
          </section>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-2 md:p-4 z-10">
          <form
            onSubmit={isOtpSent ? handleOtpSubmit : handleEmailSubmit}
            className="w-full max-w-sm p-4 md:px-8 md:py-10 border border-gray-200 rounded shadow-sm bg-white"
          >
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
            {/* {error && (
              <p className="text-red-500 mb-3 md:mb-4 text-sm">{error}</p>
            )} */}
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
              <Link href={"/signup"} className="cursor-pointer">
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
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        identifier={email}
      />
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Login />
    </Suspense>
  );
};

export default page;
