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

  // Existing functionality remains the same
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
        setShowModal(false);
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-left" reverseOrder={false} />

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-700 rounded-2xl shadow-xl p-6 sm:p-8 mb-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Clinic Info */}
            <div className="md:col-span-2">
              <span className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
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

              <div className="space-y-4 text-white mt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-lg">
                    {clinic.line1}
                    {clinic.line2 && <br />}
                    {clinic.line2}
                    <br />
                    {clinic.city}, {clinic.state} - {clinic.pincode}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 flex-shrink-0" />
                  <p className="text-lg">{clinic.phoneNumber}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 flex-shrink-0" />
                  <p className="text-lg">{clinic.email}</p>
                </div>

                {/* About Section */}
                <div className="bg-white/10 rounded-2xl shadow-lg p-6 mb-8 mr-28">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About Us
                  </h2>
                  <p className="text-white leading-relaxed">{clinic.about}</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Opening Hours
              </h3>
              <div className="space-y-2">
                {Object.entries(clinic.timings).map(([day, time]) => (
                  <div key={day} className="flex justify-between text-white">
                    <span className="capitalize">{day}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Images & Testimonials Grid */}
          <div className="flex mb-2 gap-4">
            {/* Clinic Images */}
            {clinic.images && clinic.images.length > 0 && (
              <div className="bg-white/10 p-4 rounded-xl mt-4">
                <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {clinic.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg"
                    >
                      <img
                        src={image}
                        alt={`Clinic image ${index + 1}`}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials */}
            {clinic.testimonials && clinic.testimonials.length > 0 && (
              <div className="bg-white/10 p-6 rounded-xl mt-4 ">
                <h2 className="text-2xl font-bold text-white mb-4">
                  What Our Patients Say
                </h2>
                <SimpleTestimonialCarousel testimonials={clinic.testimonials} />
              </div>
            )}
          </div>

          {/* Medical Experts Section */}
          <div className="bg-white/10 rounded-2xl shadow-lg p-4">
            <h2 className="text-2xl font-bold text-white mb-4">
              Our Medical Experts
            </h2>
            <div className="flex flex-wrap gap-4">
              {clinic?.experts.map((expert) => (
                <div
                  key={expert._id}
                  className="w-full sm:w-[calc(33.33%-0.75rem)] max-w-[280px] flex-shrink-0 bg-slate-200 shadow-xl shadow-slate-700 overflow-hidden transition-transform duration-300 hover:scale-105 border-2 rounded-lg p-1"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={expert.image}
                      alt={`Dr. ${expert.name}`}
                      className="w-full h-full object-cover rounded-lg border-2 border-blue-500"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xl font-semibold mb-1">{`Dr. ${expert.name}`}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {expert.specialization}
                    </p>
                    <div className="flex items-center mb-3 text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="text-xs text-green-600">
                        Next Available: Today
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookAppointment(expert._id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <CustomCursor />
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>

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
                  min={new Date().toISOString().split("T")[0]}
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
