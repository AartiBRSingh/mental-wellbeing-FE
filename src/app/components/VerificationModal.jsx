import axios from "axios";
import { useState } from "react";
import { baseURL } from "../baseURL";
import { X } from "lucide-react";

const VerificationModal = ({ isOpen, onClose, identifier }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

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
      setMessage("Email verified successfully! You can now log in.");
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10 relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        {/* <div className="absolute -top-2 -right-2 w-20 h-20 bg-[#FDD56A] rounded-full opacity-40"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#003B29] rounded-full opacity-20"></div> */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#003B29] mb-2">
            Verification Required
          </h2>
          <p className="text-gray-600">
            Please verify your email/phone before logging in.
          </p>
        </div>
        {message && (
          <div
            className={`p-3 rounded-lg text-sm mb-4 ${
              message.includes("success")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
        {!showOtpInput ? (
          <button
            onClick={handleResendVerification}
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? "Sending..." : "Send Verification OTP"}
          </button>
        ) : (
          <div className="space-y-4 mb-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter OTP <span className="text-red-500">*</span>
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                maxLength={6}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003B29] focus:border-transparent"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length !== 6}
              className="w-full bg-[#003B29] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#00503A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;
