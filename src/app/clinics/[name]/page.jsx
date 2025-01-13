"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
  ChevronRight,
  User,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { baseURL } from "../../baseURL";
import toast, { Toaster } from "react-hot-toast";

const ClinicDetailPage = () => {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const clinicId = searchParams.get("id");
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    expert: "",
    message: "",
    clinicId: clinicId,
  });

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

      {/* Hero Section */}
      <div className="bg-gradient-to-r mt-4 from-violet-600 to-blue-700 text-white rounded-2xl mx-4 md:mx-8 lg:mx-64 shadow-lg shadow-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
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
                  <p className="text-base md:text-lg">{clinic.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <p className="text-base md:text-lg">{clinic.email}</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg w-full lg:w-[300px] shadow-gray-500 border border-black mt-6 lg:mt-0">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-600">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                About Us
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600">
                {clinic.about}
              </p>
            </div>

            {/* Testimonials */}
            {clinic.testimonials && clinic.testimonials.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-600">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                  Patient Reviews
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {clinic.testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-100"
                    >
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="bg-blue-100 rounded-full p-2 md:p-3">
                          <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {testimonial.name}
                          </p>
                          <div className="flex text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        &quot;{testimonial.review}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          {clinic.images && clinic.images.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-600">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 p-4">
                Images
              </h2>
              <div className="space-y-4">
                {clinic.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-xl"
                  >
                    <img
                      src={image}
                      alt={`Clinic image ${index + 1}`}
                      className="w-full h-48 md:h-52 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-600 w-full mt-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            Location
          </h3>
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden">
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
  );
};

export default ClinicDetailPage;
