"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  X,
  Star,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import CustomCursor from "@/app/components/CustomCursor";
import RateClinic from "@/app/sections/RateClinic";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/app/baseURL";

const ClinicDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("about");
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    expert: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/clinics/${id}`);
        setClinic(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!clinic) return null;

  const tabContent = {
    about: (
      <div className="space-y-6">
        <div className="bg-white rounded-b-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About Our Clinic
          </h2>
          <p className="text-gray-600 leading-relaxed">{clinic.about}</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Expert Care</span>
              </div>
              <p className="text-sm text-gray-600">
                Professional medical services with experienced specialists
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Modern Facilities</span>
              </div>
              <p className="text-sm text-gray-600">
                State-of-the-art medical equipment and comfortable environment
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Patient-First</span>
              </div>
              <p className="text-sm text-gray-600">
                Focused on providing the best patient experience
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    experts: (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Our Medical Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinic.experts.map((expert) => (
              <div
                key={expert._id}
                className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Available Today
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Dr. {expert.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {expert.specialization}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 bg-white/10 w-fit rounded-full px-4 py-1 text-sm backdrop-blur-sm mb-6">
              <Clock className="w-4 h-4" />
              <span>Open Today</span>
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium">{clinic.timings.monday}</span>
            </div>

            {/* <h1 className="text-5xl font-bold mb-4">{clinic.name}</h1> */}
            <span className="text-white relative font-semibold text-4xl md:text-6xl lg:text-5xl block mb-4">
              <span className="relative">
                {clinic.name}
                <svg
                  className="absolute w-full h-[6px] bottom-0 left-0"
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

            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-blue-100">2 Patient Reviews</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-blue-50">
                  {clinic.line1}
                  <br />
                  {clinic.city}, {clinic.state} - {clinic.pincode}
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 sm:px-6 lg:px-8 mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-t-2xl shadow-sm p-4">
              <div className="flex space-x-6">
                {["about", "experts"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`pb-2 font-medium text-lg capitalize ${
                      selectedTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {tabContent[selectedTab]}
            <div className="flex">
              <RateClinic clinicId={id} />
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <a
                  href={`tel:${clinic.phoneNumber}`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                >
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium">{clinic.phoneNumber}</span>
                </a>
                <a
                  href={`mailto:${clinic.email}`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                >
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium">{clinic.email}</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Opening Hours
              </h2>
              <div className="space-y-3">
                {Object.entries(clinic.timings).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="capitalize text-gray-600">{day}</span>
                    <span
                      className={`font-medium ${
                        day === "sunday" ? "text-red-500" : "text-gray-800"
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showModal && (
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

            <form className="space-y-4">
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
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Confirm Appointment</span>
                  <ArrowRight className="w-5 h-5" />
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
      )}

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {clinic.name}
              </h3>
              <p className="text-gray-600">
                Providing quality healthcare services with a focus on patient
                comfort and well-being.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  About Us
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Our Doctors
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Services
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600">
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Emergency Contact
              </h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  {clinic.phoneNumber}
                </p>
                <p className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  {clinic.email}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} {clinic.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClinicDetailPage;
