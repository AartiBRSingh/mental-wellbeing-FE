import axios from "axios";
import { useState } from "react";
import { baseURL } from "../baseURL";
import { X } from "lucide-react";

const VerificationModal = ({ isOpen, onClose, identifier }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [identifier2, setIdentifier2] = useState("");
  const [showOtpInput2, setShowOtpInput2] = useState(false);
  const [otp2, setOtp2] = useState("");

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      setMessage("");
      const response = await axios.post(
        `${baseURL}/expert/request-otp-for-verification`,
        {
          identifier,
        }
      );
      setMessage("Verification OTP sent successfully");
      setShowOtpInput(true);
      setIsLoading(false);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to send verification OTP"
      );
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${baseURL}/expert/verify-expert`, {
        identifier,
        otp,
      });
      setMessage(
        `${
          identifier.includes("@") ? "Email" : "Phone Number"
        } verified successfully! Please verify your ${
          identifier.includes("@") ? "Phone Number" : "Email"
        } as well.`
      );
      setIsLoading(false);
      setNextStep(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
      setIsLoading(false);
    }
  };

  const handleResendVerification2 = async () => {
    try {
      setIsLoading(true);
      setMessage("");

      if (!identifier2) {
        setMessage(
          "Please enter your " +
            (identifier.includes("@") ? "Phone Number" : "Email")
        );
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${baseURL}/expert/request-otp-for-verification`,
        {
          identifier: identifier2,
        }
      );
      setMessage("Verification OTP sent successfully");
      setShowOtpInput2(true);
      setIsLoading(false);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to send verification OTP"
      );
      setIsLoading(false);
    }
  };

  const handleVerifyOtp2 = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${baseURL}/expert/verify-expert`, {
        identifier: identifier2,
        otp: otp2,
      });
      setMessage(
        `${
          identifier2.includes("@") ? "Email" : "Phone Number"
        } verified successfully! You can now log in.`
      );
      setIsLoading(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const renderCurrentStep = () => {
    if (nextStep) {
      // Secondary verification step (after first verification is successful)
      return (
        <div className="flex flex-col space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter {!identifier.includes("@") ? "Email" : "Phone Number"} *
            </label>
            <input
              type="text"
              value={identifier2}
              onChange={(e) => setIdentifier2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003B29] focus:border-transparent"
            />
          </div>

          {!showOtpInput2 ? (
            <button
              onClick={handleResendVerification2}
              className="w-full bg-[#003B29] text-white py-3 rounded-lg font-medium hover:bg-[#00503B] transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification OTP"}
            </button>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  value={otp2}
                  onChange={(e) =>
                    setOtp2(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength={6}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003B29] focus:border-transparent"
                />
              </div>

              <button
                onClick={handleVerifyOtp2}
                className="w-full bg-[#003B29] text-white py-3 rounded-lg font-medium hover:bg-[#00503B] transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>
      );
    } else {
      // First verification step
      return (
        <div className="flex flex-col space-y-4">
          {!showOtpInput ? (
            <button
              onClick={handleResendVerification}
              className="w-full bg-[#003B29] text-white py-3 rounded-lg font-medium hover:bg-[#00503B] transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification OTP"}
            </button>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength={6}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003B29] focus:border-transparent"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-[#003B29] text-white py-3 rounded-lg font-medium hover:bg-[#00503B] transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verification Required
          </h2>
          <p className="text-gray-600">
            {nextStep
              ? `Please verify your ${
                  !identifier.includes("@") ? "Email" : "Phone Number"
                } to complete registration.`
              : `Please verify your ${
                  identifier.includes("@") ? "Email" : "Phone Number"
                } before logging in.`}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg">
            {message}
          </div>
        )}

        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default VerificationModal;
