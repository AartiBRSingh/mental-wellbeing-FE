"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!clinic) return null;

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
  console.log(appointmentForm, "raju");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{clinic.name}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="text-blue-500" />
              <p className="text-gray-600">
                {clinic.line1}
                {clinic.line2 && `, ${clinic.line2}`}
                <br />
                {clinic.city}, {clinic.state} - {clinic.pincode}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-blue-500" />
              <p className="text-gray-600">{clinic.phoneNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-blue-500" />
              <p className="text-gray-600">{clinic.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Opening Hours</h3>
            {Object.entries(clinic.timings).map(([day, time]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="capitalize">{day}</span>
                <span className="text-gray-600">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600">{clinic.about}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
        <div className="w-full h-96">
          <iframe
            src={clinic.googleAddressUrl}
            className="w-full h-full rounded-lg"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinic.images.map((image, index) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <img
                src={image}
                alt={`Clinic image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Our Professionals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinic.experts.map((expert) => (
            <div key={expert._id} className="bg-gray-50 rounded-lg p-4">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {expert.name}
              </h3>
              <p className="text-gray-600 text-center mb-2">
                {expert.userType}
              </p>
              {expert.specialization && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {expert.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinic.testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-gray-50 rounded-lg p-6 shadow transition-transform hover:scale-105"
            >
              <p className="text-gray-600 italic mb-4">
                &quot;{testimonial.review}&quot;
              </p>
              <p className="font-semibold text-right">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Request an Appointment
        </h2>
        <form onSubmit={handleAppointmentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                value={appointmentForm.name}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                value={appointmentForm.email}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                value={appointmentForm.phone}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                value={appointmentForm.date}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Professional
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                value={appointmentForm.expert}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    expert: e.target.value,
                  })
                }
              >
                <option value="">Select a professional</option>
                {clinic.experts.map((expert) => (
                  <option key={expert._id} value={expert._id}>
                    {expert.name} - {expert.userType}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={appointmentForm.message}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Request Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClinicDetailPage;
