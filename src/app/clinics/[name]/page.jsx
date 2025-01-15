"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Calendar, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { baseURL } from "../../baseURL";
import toast, { Toaster } from "react-hot-toast";
import SimpleTestimonialCarousel from "@/app/components/TestimonialCarousel";
import CustomCursor from "@/app/components/CustomCursor";

const ClinicDetailPage = () => {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const clinicId = searchParams.get("id");
  const [showModal, setShowModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    expert: "",
    message: "",
    clinicId: clinicId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = (expert) => {
    setSelectedExpert(expert);
    setAppointmentForm((prev) => ({
      ...prev,
      expert: expert,
    }));
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = axios.create({ baseURL: baseURL });
        const postResponse = await api.get(`/clinics/${clinicId}`);
        setClinic(postResponse?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load clinic");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    if (clinicId) fetchData();
  }, [clinicId]);

  console.log(appointmentForm, "raju");

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/enquiries`,
        appointmentForm
      );
      if (response.data.success) {
        setAppointmentForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          message: "",
          expert: "",
        });
        toast.success("Appointment request submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to submit appointment request";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!clinic) return null;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/bg-01.svg')" }}
    >
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="bg-gradient-to-r mt-4 from-violet-600 to-blue-700 text-white rounded-2xl mx-8 md:mx-8 lg:mx-72 shadow-lg shadow-slate-600">
        <div className="max-w-7xl mx-auto px-4 p-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center ml-16">
            <div className="w-full lg:w-auto">
              <span className="text-white relative text-4xl md:text-6xl lg:text-7xl block">
                <span className="relative">
                  {clinic.name}
                  <svg
                    className="absolute w-full h-[10px] bottom-0 left-0"
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
              <div className="space-y-4 mt-8 md:mt-12">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <p className="text-base md:text-lg">
                    {clinic.line1}
                    {clinic.line2 && `, ${clinic.line2}`}
                    <br />
                    {clinic.city}, {clinic.state} - {clinic.pincode}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <p className="text-base md:text-lg text-white">
                    {clinic.phoneNumber}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <p className="text-base md:text-lg text-white">
                    {clinic.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg w-full lg:w-[300px] shadow-gray-500 border border-black mt-6 lg:mt-6 mx-16">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                Opening Hours
              </h3>
              <div className="space-y-3 md:space-y-4">
                {Object.entries(clinic.timings).map(([day, time]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <span className="capitalize font-medium text-gray-700">
                      {day}
                    </span>
                    <span className="text-gray-600">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 shadow-lg shadow-slate-600 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                About Us
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-600">
                {clinic.about}
              </p>
            </div>
            {clinic.images && clinic.images.length > 0 && (
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 shadow-lg shadow-slate-600">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                  Images
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {clinic.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-md"
                    >
                      <img
                        src={image}
                        alt={`Clinic image ${index + 1}`}
                        className="w-full h-36 object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 shadow-lg shadow-slate-600 max-h-48 text-black">
              {clinic.testimonials && clinic.testimonials.length > 0 && (
                <SimpleTestimonialCarousel testimonials={clinic.testimonials} />
              )}
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 shadow-lg shadow-slate-600 cursor-pointer">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                Location
              </h3>
              <div className="w-full h-48 rounded-xl overflow-hidden">
                <iframe
                  src={clinic.googleAddressUrl}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-12 px-4">
          <h2 className="text-3xl font-bold mb-8 px-4">Our Medical Experts</h2>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="inline-flex space-x-6 px-4">
                {clinic?.experts.map((expert) => (
                  <div
                    key={expert._id}
                    className="flex-none w-72 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-64 w-full">
                      <img
                        src={expert.image}
                        alt={`Dr. ${expert.name}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{`Dr. ${expert.name}`}</h3>
                      <p className="text-gray-600 mb-4">
                        {expert.specialization}
                      </p>

                      <div className="flex items-center mb-6 text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Next Available: Today</span>
                      </div>
                      <button
                        onClick={() => handleBookAppointment(expert._id)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <span>Book Appointment</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <CustomCursor />
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Book Appointment with Dr. {selectedExpert?.name}
            </h3>

            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={appointmentForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={appointmentForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={appointmentForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={appointmentForm.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                onClick={handleAppointmentSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Appointment Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicDetailPage;
