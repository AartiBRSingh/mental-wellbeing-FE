"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { RegisterModal } from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";

export default function RateClinic({ clinicId }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setUserId(userId);
    } else {
      setUserId("");
    }
  }, []);

  const submitReview = async () => {
    if (!userId) {
      setIsModalOpen(true);
      return;
    }
    if (!name || !review) {
      setMessage("Name and review are required");
      return;
    }
    try {
      await axios.post(`${baseURL}/clinics/${clinicId}/rate`, { name, review });
      setMessage("Review submitted successfully");
      setName("");
      setReview("");
    } catch (error) {
      setMessage("Error submitting review");
    }
  };

  return (
    <div className="p-4 border bg-white rounded-2xl shadow-md mt-3 max-w-max">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Leave a Review</h2>
        <button
          onClick={submitReview}
          className="mt-2 px-4 py-2  text-blue-500 rounded"
        >
          Submit
        </button>
      </div>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mt-2 border rounded"
      />
      <textarea
        placeholder="Your Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-2 mt-2 border rounded"
      />
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
