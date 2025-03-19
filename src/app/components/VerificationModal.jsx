import axios from "axios";
import { useState } from "react";
import { baseURL } from "../baseURL";

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

      const response = await axios.post(
        `${baseURL}/expert/verify-email-with-otp`,
        {
          identifier,
          otp,
        }
      );
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

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Email Verification Required</h2>
          <p>Please verify your email/phone before logging in.</p>

          {message && (
            <p
              className={
                message.includes("success") ? "success-msg" : "error-msg"
              }
            >
              {message}
            </p>
          )}

          {!showOtpInput ? (
            <button onClick={handleResendVerification} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Verification OTP"}
            </button>
          ) : (
            <div className="otp-section">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    )
  );
};
export default VerificationModal;
