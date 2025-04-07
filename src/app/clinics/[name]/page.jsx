"use client";
import React, { useState, useEffect, useRef } from "react";
import { Image, ChevronLeft } from "lucide-react";
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
  Quote,
  Map,
} from "lucide-react";
import CustomCursor from "@/app/components/CustomCursor";
import RateClinic from "@/app/sections/RateClinic";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/app/baseURL";

const ClinicDetailPage = () => {
  const searchParams = useSearchParams();
  const [currentExpertIndex, setCurrentExpertIndex] = useState(0);
  const id = searchParams.get("id");
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("about");
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef(null);
  const aboutRef = useRef(null);
  const expertsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const galleryRef = useRef(null);
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
        setError("Failed to load clinic data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle sticky navbar
  // Replace your current sticky navbar useEffect with this:
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsPosition = tabsRef.current.getBoundingClientRect().top;
        const navbarHeight = 64; // Replace with your actual navbar height

        // Add a small buffer to prevent flickering at the threshold
        if (tabsPosition <= navbarHeight + 2) {
          // Only set to true if it's not already true
          if (!isSticky) setIsSticky(true);
        } else {
          // Only set to false if it's not already false
          if (isSticky) setIsSticky(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]); // Add isSticky to the dependency array

  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const testimonialsPerPage = 2;

  const handleNextExpert = () => {
    if (clinic && clinic.experts) {
      setCurrentExpertIndex((prevIndex) =>
        prevIndex === clinic.experts.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevExpert = () => {
    if (clinic && clinic.experts) {
      setCurrentExpertIndex((prevIndex) =>
        prevIndex === 0 ? clinic.experts.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextTestimonialPage = () => {
    const maxPages =
      Math.ceil((clinic.testimonials?.length || 0) / testimonialsPerPage) - 1;
    setCurrentTestimonialPage((prev) => (prev < maxPages ? prev + 1 : 0));
  };

  const handlePrevTestimonialPage = () => {
    const maxPages =
      Math.ceil((clinic.testimonials?.length || 0) / testimonialsPerPage) - 1;
    setCurrentTestimonialPage((prev) => (prev > 0 ? prev - 1 : maxPages));
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === clinic.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? clinic.images.length - 1 : prevIndex - 1
    );
  };
  const scrollToSection = (section) => {
    const scrollOptions = {
      behavior: "smooth",
      block: "start",
    };

    setSelectedTab(section);

    switch (section) {
      case "about":
        aboutRef.current?.scrollIntoView(scrollOptions);
        break;
      case "gallery":
        galleryRef.current?.scrollIntoView(scrollOptions);
        break;
      case "experts":
        expertsRef.current?.scrollIntoView(scrollOptions);
        break;
      case "testimonials":
        testimonialsRef.current?.scrollIntoView(scrollOptions);
        break;
      default:
        break;
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mb-12 p-3 sm:p-6">
        <div className="px-2 py-8 sm:px-6 lg:px-8">
          {/* Header section - Made more responsive */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center md:ml-0 md:ml-10">
            <div className="max-w-full md:max-w-3xl">
              {/* Opening hours tag - adjusted for small screens */}
              <div className="flex items-center space-x-2 bg-white/10 w-fit rounded-full px-3 py-1 text-xs sm:text-sm backdrop-blur-sm mb-4 sm:mb-6">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Open Today</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium">{clinic.timings.monday}</span>
              </div>

              {/* Clinic name - responsive text sizes */}
              <span className="text-black relative font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl block mb-4">
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

              {/* Reviews section - made responsive */}
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-slate-800 text-sm sm:text-base">
                  {clinic.testimonials?.length || 0} Patient Reviews
                </span>
              </div>

              {/* Address and booking section - improved for smaller screens */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-8 h-8 mt-1 text-red-500 flex-shrink-0" />
                  <p className="text-slate-900 text-sm sm:text-base">
                    {clinic.line1}
                    <br />
                    {clinic.city}, {clinic.state} - {clinic.pincode}
                  </p>
                </div>

                {/* Booking button - full width on mobile */}
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Book Appointment
                </button>
              </div>

              {/* VIEW MAP button for mobile only */}
              <div className="mt-4 md:hidden">
                <button
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg text-sm"
                >
                  <Map className="w-4 h-4 mr-2" />
                  VIEW MAP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid layout - improved for responsiveness */}
        <div className="grid grid-cols-1  gap-4 sm:gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {/* Navigation Tabs - made responsive */}
            <div
              ref={tabsRef}
              className={`bg-white rounded-t-xl sm:rounded-t-2xl shadow-sm p-3 sm:p-4 transition-all duration-200 ease-in-out ${
                isSticky
                  ? "sticky top-16 sm:top-20 z-10 rounded-xl sm:rounded-2xl shadow-md"
                  : ""
              }`}
            >
              <div className="flex overflow-x-auto hide-scrollbar space-x-4 sm:space-x-6">
                {["about", "gallery", "experts", "testimonials"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => scrollToSection(tab)}
                    className={`pb-2 font-medium text-base sm:text-lg capitalize whitespace-nowrap ${
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

            {/* About Section - improved spacing for mobile */}
            <div ref={aboutRef} id="about" className="pt-3 sm:pt-4">
              <div className="bg-white rounded-b-xl sm:rounded-b-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex justify-center mb-6">
                  <strong className="text-black font-semibold text-3xl mr-1">
                    About
                  </strong>
                  <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block  font-semibold text-center">
                    Clinic
                    <svg
                      className="absolute w-full h-[6px] -bottom-1 left-0"
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
                </div>
                <p className="text-black leading-relaxed text-lg sm:text-base">
                  {clinic.about}
                </p>
                <div className="mt-6 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className=" p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center space-x-2 text-black mb-1 sm:mb-2">
                      <img
                        src="/check-mark.png"
                        alt="Benefits Icon"
                        className="w-6 h-6  mt-1"
                      />
                      <span className="font-semibold text-lg sm:text-base">
                        Expert-Led Confidential Care
                      </span>
                    </div>
                  </div>
                  <div className=" p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center space-x-2 text-black mb-1 sm:mb-2">
                      <img
                        src="/check-mark.png"
                        alt="Benefits Icon"
                        className="w-6 h-6  mt-1"
                      />
                      <span className="font-semibold text-lg sm:text-base">
                        Comprehensive Mental Health Services
                      </span>
                    </div>
                  </div>
                  <div className=" p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center space-x-2 text-black mb-1 sm:mb-2">
                      <img
                        src="/check-mark.png"
                        alt="Benefits Icon"
                        className="w-6 h-6 mt-1"
                      />
                      <span className="font-semibold text-lg sm:text-base">
                        Confidential & Professional Care
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-normal gap-4 mt-3 sm:mt-6">
              {/* Contact Card - Responsive adjustments */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg px-6 sm:px-12 mt-6 md:mt-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <a
                    href={`tel:${clinic.phoneNumber}`}
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                  >
                    <div className="bg-blue-50 p-1.5 sm:p-2 rounded-lg">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      {clinic.phoneNumber}
                    </span>
                  </a>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                  >
                    <div className="bg-blue-50 p-1.5 sm:p-2 rounded-lg">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      {clinic.email}
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-2 sm:mt-8 md:mt-2 max-w-sm w-full hidden md:block p-1 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl">
                <iframe
                  src={clinic.googleAddressUrl}
                  width="225%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-xl sm:rounded-2xl"
                ></iframe>
              </div>
            </div>

            {/* Opening Hours Card - improved for mobile */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex justify-center mb-6">
                <strong className="text-black font-semibold text-3xl mr-1">
                  Opening
                </strong>
                <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block  font-semibold text-center">
                  Hours
                  <svg
                    className="absolute w-full h-[6px] -bottom-1 left-0"
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
              </div>
              <div className="flex justify-center mb-6">
                <div className="space-y-2 max-w-auto sm:space-y-3">
                  {Object.entries(clinic.timings).map(([day, time]) => (
                    <div
                      key={day}
                      className="flex justify-between gap-28 items-center"
                    >
                      <div className="flex">
                        <span className="capitalize text-black text-sm sm:text-base">
                          {day}
                        </span>
                      </div>
                      <span
                        className={`font-medium text-sm sm:text-base ${
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

            {/* Gallery Section - improved for mobile */}
            <div ref={galleryRef} id="gallery" className="pt-2 mt-3 sm:mt-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex justify-center mb-6">
                  <strong className="text-black font-semibold text-3xl mr-1">
                    Clinic
                  </strong>
                  <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block  font-semibold text-center">
                    Gallery
                    <svg
                      className="absolute w-full h-[6px] -bottom-1 left-0"
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
                </div>

                {clinic.images && clinic.images.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                      {clinic.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setShowGalleryModal(true);
                          }}
                        >
                          <img
                            src={image}
                            alt={`Clinic image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 sm:mt-4 text-center">
                      <button
                        onClick={() => setShowGalleryModal(true)}
                        className="inline-flex items-center text-black hover:text-blue-800 text-sm sm:text-base"
                      >
                        <span className="font-medium">View all photos</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <p>No gallery images available.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Modal - Improved for all screen sizes */}
            {showGalleryModal && (
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-2 sm:p-4 z-50">
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="absolute right-2 sm:right-4 top-2 sm:top-4 text-white hover:text-gray-300"
                >
                  <X className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>

                <div className="relative w-full max-w-4xl">
                  <div className="relative">
                    <img
                      src={clinic.images[currentImageIndex]}
                      alt={`Gallery image ${currentImageIndex + 1}`}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />

                    <button
                      onClick={handlePrevImage}
                      className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/70"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/70"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  <div className="mt-2 sm:mt-4 text-center text-white">
                    <p>
                      {currentImageIndex + 1} / {clinic.images.length}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Experts Section - improved for all devices */}
            <div ref={expertsRef} id="experts" className="pt-2 mt-3 sm:mt-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex justify-center mb-6">
                  <strong className="text-black font-semibold text-3xl mr-3">
                    Visiting
                  </strong>
                  <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block  font-semibold text-center">
                    Specialist
                    <svg
                      className="absolute w-full h-[6px] -bottom-1 left-0"
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
                </div>

                {clinic.experts && clinic.experts.length > 0 ? (
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-300"
                        style={{
                          transform: `translateX(-${
                            currentExpertIndex * 100
                          }%)`,
                        }}
                      >
                        {clinic.experts.map((expert) => (
                          <div
                            key={expert._id}
                            className="w-full flex-shrink-0 px-2 sm:px-4"
                          >
                            {/* Adjusted container size for better mobile display */}
                            <div className="mx-auto max-w-xs sm:max-w-64">
                              <div className="bg-slate-100 border border-black rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl overflow-hidden hover:shadow-md transition-shadow">
                                {/* Responsive aspect ratio */}
                                <div className="aspect-auto relative">
                                  <img
                                    src={expert.image}
                                    alt={expert.name}
                                    className="w-full h-64 object-contain"
                                  />
                                </div>
                                {/* Better padding for mobile */}
                                <div className="p-3 sm:p-2">
                                  <div className="flex items-center justify-center sm:mb-0">
                                    <h3 className="text-base sm:text-xl font-bold text-gray-800">
                                      {expert.name}
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <p className="text-slate-600 font-medium mb-2 sm:mb-2 text-md sm:text-lg">
                                      {expert.specialization}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() => setShowModal(true)}
                                      className="flex-1  shadow-sm  text-blue-700 py-1.5 sm:py-2 rounded-lg font-medium hover:text-black transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                                    >
                                      <span>Book Appointment</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel Navigation - improved touch targets for mobile */}
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <button
                        onClick={handlePrevExpert}
                        className="bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md -ml-1 sm:-ml-2"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        onClick={handleNextExpert}
                        className="bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md -mr-1 sm:-mr-2"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                      </button>
                    </div>

                    {/* Pagination Dots - made more touch-friendly */}
                    <div className="flex justify-center mt-4 sm:mt-6 space-x-3">
                      {clinic.experts.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentExpertIndex(index)}
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                            currentExpertIndex === index
                              ? "bg-gray-500"
                              : "bg-gray-300"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Page Counter */}
                    <div className="text-center mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                      Expert {currentExpertIndex + 1} of {clinic.experts.length}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <p>No experts available.</p>
                  </div>
                )}
              </div>

              {/* Testimonials Section - improved for mobile */}
              <div
                ref={testimonialsRef}
                id="testimonials"
                className="mt-3 sm:mt-6"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                  <div className="flex justify-center mb-6">
                    <strong className="text-black font-semibold text-3xl mr-3"></strong>
                    <span className="relative text-[#956144] text-2xl md:text-3xl lg:text-3xl block  font-semibold text-center">
                      Testimonials
                      <svg
                        className="absolute w-full h-[6px] -bottom-1 left-0"
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
                  </div>

                  {clinic.testimonials && clinic.testimonials.length > 0 ? (
                    <>
                      <div className="space-y-4 sm:space-y-6">
                        {clinic.testimonials
                          .slice(
                            currentTestimonialPage * testimonialsPerPage,
                            currentTestimonialPage * testimonialsPerPage +
                              testimonialsPerPage
                          )
                          .map((testimonial, index) => (
                            <div
                              key={testimonial._id || index}
                              className="bg-[#F8FAFC] p-4 sm:p-6 rounded-lg sm:rounded-xl relative"
                            >
                              <p className="text-gray-700 italic mb-3 sm:mb-4 leading-relaxed line-clamp-2 text-sm sm:text-base">
                                {testimonial.review}
                              </p>
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base">
                                  {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                                    {testimonial.name}
                                  </h4>
                                  <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Pagination controls - improved for mobile */}
                      <div className="flex justify-between items-center mt-4 sm:mt-6">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Page {currentTestimonialPage + 1} of{" "}
                          {Math.ceil(
                            (clinic.testimonials.length || 0) /
                              testimonialsPerPage
                          )}
                        </span>
                        <div className="flex space-x-1 sm:space-x-2">
                          <button
                            onClick={handlePrevTestimonialPage}
                            className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                            aria-label="Previous page"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={handleNextTestimonialPage}
                            className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                            aria-label="Next page"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 sm:py-8 text-gray-500">
                      <p>No testimonials available yet.</p>
                    </div>
                  )}

                  <div className="flex justify-center mt-2 sm:mt-3">
                    <RateClinic clinicId={id} />
                  </div>
                </div>
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

      {/* Map Modal for Mobile View */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm md:hidden">
          <div className="bg-white rounded-2xl w-full max-w-lg p-4 relative">
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Clinic Location
            </h3>

            <div className="w-full h-80">
              <iframe
                src={clinic.googleAddressUrl}
                width="100%"
                height="100%"
                style={{ border: 2 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowMapModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicDetailPage;
