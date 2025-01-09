"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { baseURL } from "../baseURL";
import Link from "next/link";

const ClinicDisplay = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTimings, setExpandedTimings] = useState({});

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(`${baseURL}/clinics`);
        setClinics(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch clinic data");
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const toggleTimings = (clinicId) => {
    setExpandedTimings((prev) => ({
      ...prev,
      [clinicId]: !prev[clinicId],
    }));
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleDirections = (googleUrl) => {
    window.open(googleUrl, "_blank");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {clinics.map((clinic) => (
        <div
          key={clinic._id}
          className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white">{clinic.name}</h2>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Info */}
              <div className="space-y-6">
                {/* Address Section */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600 mb-2">
                      {clinic.line1}
                      {clinic.line2 && <span>, {clinic.line2}</span>}
                      <br />
                      {clinic.city}, {clinic.state} - {clinic.pincode}
                    </p>
                    <button
                      onClick={() => handleDirections(clinic.googleAddressUrl)}
                      className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      Get Directions <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Timings Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleTimings(clinic._id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold">Working Hours</h3>
                    </div>
                    {expandedTimings[clinic._id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  <div
                    className={`grid grid-cols-2 gap-2 mt-2 transition-all duration-300 ${
                      expandedTimings[clinic._id] ? "block" : "hidden"
                    }`}
                  >
                    {Object.entries(clinic.timings).map(([day, time]) => (
                      <div key={day} className="text-sm">
                        <span className="capitalize font-medium">{day}: </span>
                        <span className="text-gray-600">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleCall(clinic.phoneNumber)}
                    className="w-full flex items-center space-x-3 bg-white hover:bg-blue-50 p-4 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
                  >
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600 hover:text-blue-600">
                      {clinic.phoneNumber}
                    </span>
                  </button>

                  <button
                    onClick={() => handleEmail(clinic.email)}
                    className="w-full flex items-center space-x-3 bg-white hover:bg-blue-50 p-4 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
                  >
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600 hover:text-blue-600">
                      {clinic.email}
                    </span>
                  </button>
                </div>
                <Link
                  href={`/clinics/${generateSlug(clinic.name, clinic._id)}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  target="_blank"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Right Column - Images and Map */}
              <div className="space-y-4">
                {/* Images */}
                <div className="grid grid-cols-2 gap-2">
                  {clinic.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-lg overflow-hidden shadow-md"
                      onClick={() => window.open(image, "_blank")}
                    >
                      <img
                        src={image}
                        alt={`${clinic.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Google Map */}
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src={clinic.googleAddressUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClinicDisplay;
