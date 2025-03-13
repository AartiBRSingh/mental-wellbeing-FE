"use client";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";

export default function RateClinic({ clinicId }) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const submitReview = async () => {
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
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
