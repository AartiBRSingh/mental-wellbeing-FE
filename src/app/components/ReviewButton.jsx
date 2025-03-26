"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import ReviewForm from "./ReviewForm";
import LoginModal from "./LoginModal";

const ReviewButton = ({ expertId }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleShareFeedback = () => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      // Open login modal if not authenticated
      setIsLoginModalOpen(true);
    } else {
      // Open review modal if authenticated
      setIsReviewModalOpen(true);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleShareFeedback}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
      >
        Share your Feedback
      </button>

      <ReviewForm
        expertId={expertId}
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
      />

      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      )}
    </>
  );
};

export default ReviewButton;
