"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
} from "lucide-react";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";

const ClinicDisplay = () => {
  // Rest of the code remains exactly the same as before
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTimings, setExpandedTimings] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(`${baseURL}/clinics`);
        setClinics(response.data);
        setFilteredClinics(response.data);
        const uniqueStates = [
          ...new Set(response.data.map((clinic) => clinic.state)),
        ];
        setStates(uniqueStates);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch clinic data");
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateClinics = clinics.filter(
        (clinic) => clinic.state === selectedState
      );
      const uniqueCities = [
        ...new Set(stateClinics.map((clinic) => clinic.city)),
      ];
      setCities(uniqueCities);
    }
  }, [selectedState]);

  useEffect(() => {
    let filtered = clinics;
    if (selectedState) {
      filtered = filtered.filter((clinic) => clinic.state === selectedState);
    }
    if (selectedCity) {
      filtered = filtered.filter((clinic) => clinic.city === selectedCity);
    }
    setFilteredClinics(filtered);
  }, [selectedState, selectedCity, clinics]);

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

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  const SearchSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-lg font-bold text-gray-700 mb-2">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-lg font-bold text-gray-700 mb-2">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSelectedState("");
            setSelectedCity("");
          }}
          className="px-6 py-3 font-bold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );

  const TestimonialSection = ({ clinicId, testimonials }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
      setCurrentTestimonial((prev) =>
        prev === testimonials?.length - 1 ? 0 : prev + 1
      );
    };

    useEffect(() => {
      const timer = setInterval(nextTestimonial, 5000);
      return () => clearInterval(timer);
    }, [testimonials?.length]);

    return testimonials?.length > 0 ? (
      <div className="bg-gray-50 p-6 rounded-lg mt-6">
        <h3 className="text-lg font-semibold mb-4">What Our Patients Say</h3>
        <div className="relative overflow-hidden">
          <div className="transition-all duration-500 ease-in-out">
            <div className="space-y-2">
              {/* <div className="flex items-center mb-2">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )
                )}
              </div> */}
              <p className="text-gray-600 italic">
                {testimonials[currentTestimonial].review}
              </p>
              <p className="text-sm font-medium text-gray-800">
                - {testimonials[currentTestimonial].name}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <SearchSection />

      {filteredClinics.map((clinic) => (
        <div
          key={clinic._id}
          className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-300 p-6">
            <h2 className="text-2xl font-bold text-white">{clinic.name}</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
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
                      className="inline-flex items-center text-sm text-green-500 hover:text-green-700 transition-colors"
                    >
                      Get Directions <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleTimings(clinic._id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-500" />
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

                <div className="space-y-3">
                  <button
                    onClick={() => handleCall(clinic.phoneNumber)}
                    className="w-full flex items-center space-x-3 bg-white hover:bg-green-50 p-4 rounded-lg transition-colors border border-gray-200 hover:border-green-200"
                  >
                    <Phone className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 hover:text-green-600">
                      {clinic.phoneNumber}
                    </span>
                  </button>

                  <button
                    onClick={() => handleEmail(clinic.email)}
                    className="w-full flex items-center space-x-3 bg-white hover:bg-green-50 p-4 rounded-lg transition-colors border border-gray-200 hover:border-green-200"
                  >
                    <Mail className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 hover:text-green-600">
                      {clinic.email}
                    </span>
                  </button>
                </div>

                <Link
                  href={`/clinics/${generateSlug(clinic.name, clinic._id)}`}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                  target="_blank"
                >
                  Read More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
                <TestimonialSection
                  clinicId={clinic._id}
                  testimonials={clinic.testimonials}
                />
              </div>

              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <img
                    src={clinic.images[0]}
                    alt={`${clinic.name} - Featured Image`}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => window.open(clinic.images[0], "_blank")}
                  />
                </div>

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
