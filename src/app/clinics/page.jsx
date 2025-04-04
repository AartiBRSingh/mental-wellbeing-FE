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
  ChevronLeft,
  Search,
} from "lucide-react";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";

const ClinicDisplay = () => {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTimings, setExpandedTimings] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleFaqs, setVisibleFaqs] = useState(2);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleViewMore = () => {
    setVisibleFaqs(visibleFaqs === 2 ? faqList.length : 2);
  };

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

  const faqList = [
    {
      question: " What services do ShareYrHeart Clinics provide?",
      answer:
        "ShareYrHeart Clinics offer a range of mental health treatments and therapies, including Psychological counseling and therapy Stress, anxiety, and depression management Psychiatric consultations Behavioral therapy for children and adults Employee and student well-being programs Self-understanding and personal growth sessions",
    },
    {
      question: "Do I need an appointment to visit ShareYrHeart Clinics?",
      answer:
        "No, prior appointments are not required. You can walk in anytime during clinic hours and consult with a mental health expert.",
    },
    {
      question: "Are both therapy and medical treatments available?",
      answer:
        "Yes, ShareYrHeart Clinics provide Therapeutic treatments such as counseling, psychotherapy, and behavioral therapy. Medical treatments for mental health conditions, including psychiatric evaluations and medication management.",
    },
    {
      question: "  Are emergency mental health services available?",
      answer:
        "While we do not provide emergency psychiatric hospitalization, we offer immediate support and crisis intervention for individuals in distress.",
    },
    {
      question: "What are the clinic hours?",
      answer:
        "Clinic hours vary by location. Please visit www.shareyrheart.com or contact support@shareyrheart.com for specific timings.",
    },
    {
      question: "Do ShareYrHeart Clinics accept health insurance?",
      answer:
        "Yes, mental health treatments at our clinics may be covered under insurance. We recommend checking with your insurance provider or speaking to our clinic staff for assistance.",
    },
    {
      question: "Can I choose my preferred therapist or doctor?",
      answer:
        "Yes, you can request a specific therapist or doctor based on availability. Our team will assist in matching you with the right expert.",
    },
    {
      question: "How can I locate the nearest ShareYrHeart Clinic?",
      answer:
        "Visit www.shareyrheart.com to find your nearest clinic or contact us at support@shareyrheart.com for directions.",
    },
  ];

  const SearchSection = () => (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg mb-4 md:mb-8">
      <div className="flex flex-wrap items-end gap-2 sm:gap-3">
        {/* State Selection */}
        <div className="flex-1 min-w-[130px]">
          <label className="block text-xl font-semibold text-gray-700 mb-1.5">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City Selection */}
        <div className="flex-1 min-w-[130px]">
          <label className="block text-xl font-semibold text-gray-700 mb-1.5">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent"
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

        {/* Reset Button */}
        <button
          onClick={() => {
            setSelectedState("");
            setSelectedCity("");
          }}
          className="px-4 py-2 text-xl  bg-[#F9F5F2] text-black rounded-lg hover:bg-slate-100 transition-colors active:bg-black-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2 whitespace-nowrap"
        >
          Reset
        </button>
      </div>
    </div>
  );

  const TestimonialSection = ({ testimonials, showAll = true }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const displayTestimonials = showAll
      ? testimonials || []
      : testimonials?.filter((t) => t.isApproved === true) || [];

    useEffect(() => {
      if (displayTestimonials.length > 0) {
        const timer = setInterval(() => {
          setCurrentTestimonial((prev) =>
            prev === displayTestimonials.length - 1 ? 0 : prev + 1
          );
        }, 5000);
        return () => clearInterval(timer);
      }
    }, [displayTestimonials.length]);

    const nextTestimonial = () => {
      setCurrentTestimonial((prev) =>
        prev === displayTestimonials.length - 1 ? 0 : prev + 1
      );
    };

    const prevTestimonial = () => {
      setCurrentTestimonial((prev) =>
        prev === 0 ? displayTestimonials.length - 1 : prev - 1
      );
    };

    if (displayTestimonials.length === 0) return null;

    return (
      <div className="bg-gray-50 p-6 rounded-lg mt-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-black-800">
          What Our Patients Say
        </h3>
        <div className="relative overflow-hidden">
          <div className="transition-all duration-500 ease-in-out">
            <div className="space-y-3 line-clamp-1">
              <p className="text-gray-600 italic">
                {displayTestimonials[currentTestimonial].review}
              </p>
              <p className="text-sm font-medium text-black-700">
                - {displayTestimonials[currentTestimonial].name}
              </p>
            </div>
          </div>

          {displayTestimonials.length > 1 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={prevTestimonial}
                className="p-1 rounded-full bg-black-100 hover:bg-black-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-black-700" />
              </button>
              <div className="flex space-x-1 items-center">
                {displayTestimonials.map((_, index) => (
                  <span
                    key={index}
                    className={`block h-2 w-2 rounded-full ${
                      currentTestimonial === index
                        ? "bg-black-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-1 rounded-full bg-black-100 hover:bg-black-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-black-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <SearchSection />

      {filteredClinics.map((clinic) => (
        <div
          key={clinic._id}
          className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className=" p-6 flex justify-between">
            <span className="text-[#956144] relative text-4xl md:text-6xl lg:text-5xl block">
              <span className="relative">
                {clinic.name}
                <svg
                  className="absolute w-full h-[10px] -bottom-1 left-0"
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
            <div className="hidden md:flex items-center justify-center">
              <Link
                href={`/clinics/${generateSlug(clinic.name, clinic._id)}`}
                className="inline-flex text-xl pt-4 pl-2 items-center text-slate-700 font-semibold hover:text-black  transition-colors"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-1">Address</h3>
                    <p className="text-gray-600 mb-2">
                      {clinic.line1}
                      {clinic.line2 && <span>, {clinic.line2}</span>}
                      <br />
                      {clinic.city}, {clinic.state} - {clinic.pincode}
                    </p>
                    <button
                      onClick={() => handleDirections(clinic.googleAddressUrl)}
                      className="inline-flex items-center text-sm text-green-500 hover:text-black-700 transition-colors"
                    >
                      Get Directions <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleCall(clinic.phoneNumber)}
                    className="w-full flex items-center space-x-3 bg-white hover:bg-black-50 p-4 rounded-lg transition-colors border border-gray-200 hover:border-black-200"
                  >
                    <Phone className="w-5 h-5 text-black-500" />
                    <span className="text-gray-600 hover:text-black-600">
                      {clinic.phoneNumber}
                    </span>
                  </button>

                  <button
                    onClick={() => handleEmail(clinic.email)}
                    className="w-full flex items-center space-x-3 bg-white hover:bg-black-50 p-4 rounded-lg transition-colors border border-gray-200 hover:border-black-200"
                  >
                    <Mail className="w-5 h-5 text-black-500" />
                    <span className="text-gray-600 hover:text-black-600">
                      {clinic.email}
                    </span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleTimings(clinic._id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-black-500" />
                      <h3 className="font-semibold text-xl">Working Hours</h3>
                    </div>
                    {expandedTimings[clinic._id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  <div
                    className={`grid grid-cols-1 gap-4 mt-2 transition-all duration-300 ${
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

                <div className="flex items-center justify-center md:hidden">
                  <Link
                    href={`/clinics/${generateSlug(clinic.name, clinic._id)}`}
                    className="inline-flex text-lg pt-4 pl-2 items-center text-black-600 font-semibold hover:text-black-700 transition-colors"
                  >
                    View More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              <div className="space-y-5">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <img
                    src={clinic.images[0]}
                    alt={`${clinic.name} - Featured Image`}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => window.open(clinic.images[0])}
                  />
                </div>

                <TestimonialSection
                  testimonials={clinic.testimonials}
                  showAll={true}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="xl:text-4xl text-2xl font-serif text-stone-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="bg-white/80 rounded-2xl divide-y divide-stone-200 mt-12 mb-8">
          {faqList.slice(0, visibleFaqs).map((faq, index) => (
            <div key={index} className="p-6">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between text-left text-stone-800 hover:text-stone-900"
              >
                <span className="font-semibold text-md ml-10">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mt-4 text-stone-600 text-sm transition-all ml-10 duration-200 ${
                  openFaq === index ? "block" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {faqList.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={toggleViewMore}
              className="px-6 py-2 text-black-600 border border-black-600 rounded-full hover:bg-black-50 transition-colors duration-300 ease-in-out flex items-center space-x-2 opacity-70 hover:opacity-100"
            >
              <span>{visibleFaqs === 2 ? "View More" : "View Less"}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  visibleFaqs > 2 ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicDisplay;
