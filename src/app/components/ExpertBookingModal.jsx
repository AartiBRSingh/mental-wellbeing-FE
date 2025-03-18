"use client";
import { ArrowRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "../baseURL";
import { useRouter } from "next/navigation";

const ExpertBookingModal = ({ setShowModal }) => {
  const router = useRouter();
  const [appointmentForm, setAppointmentForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState({
    type: "",
    text: "",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setUserId(userId);
    } else {
      setUserId("");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getUserDataFromCookies = () => {
      const name = Cookies.get("name");
      const email = Cookies.get("email");
      const phone = Cookies.get("phone");

      setAppointmentForm((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        phone: phone || prev.phone,
      }));
    };

    getUserDataFromCookies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage({ type: "", text: "" });
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await axios.post(
        `${baseURL}/expert-booking`,
        appointmentForm
      );

      if (response.data.success) {
        setSubmitMessage({
          type: "success",
          text: "Appointment booked successfully!",
        });
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      } else {
        setSubmitMessage({
          type: "error",
          text:
            response.data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error.response?.data?.error ||
          "Failed to connect to server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Book Your Appointment
        </h3>

        {submitMessage.text && (
          <div
            className={`p-3 mb-4 rounded-lg ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={appointmentForm.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={appointmentForm.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={appointmentForm.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={appointmentForm.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Message
            </label>
            <textarea
              name="message"
              value={appointmentForm.message}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about your medical concern..."
            ></textarea>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl`}
            >
              <span>{loading ? "Processing..." : "Confirm Appointment"}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              By booking an appointment you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpertBookingModal;
