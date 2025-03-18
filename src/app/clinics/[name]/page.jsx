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
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsPosition = tabsRef.current.getBoundingClientRect().top;
        const navbarHeight = 64; // Replace with your actual navbar height
        setIsSticky(tabsPosition <= navbarHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const testimonialsPerPage = 2;

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
      <div className="max-w-7xl mx-auto px-4 -mt-10 sm:px-6 lg:px-8 mb-12 bg-gradient-to-b from-white to-green-600 rounded-2xl p-6">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center md:ml-10">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 bg-white/10 w-fit rounded-full px-4 py-1 text-sm backdrop-blur-sm mb-6">
                <Clock className="w-4 h-4" />
                <span>Open Today</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium">{clinic.timings.monday}</span>
              </div>

              <span className="text-black relative font-semibold text-4xl md:text-6xl lg:text-5xl block mb-4">
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
                <span className="text-slate-800">
                  {clinic.testimonials?.length || 0} Patient Reviews
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p className="text-slate-900">
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

              {/* VIEW MAP button for mobile only */}
              <div className="mt-6 md:hidden">
                <button
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center justify-center w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
                >
                  <Map className="w-5 h-5 mr-2" />
                  VIEW MAP
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {/* Navigation Tabs */}
            <div
              ref={tabsRef}
              className={`bg-white rounded-t-2xl shadow-sm p-4 ${
                isSticky ? "sticky top-24 z-10 rounded-2xl shadow-md" : ""
              }`}
            >
              <div className="flex space-x-6">
                {["about", "gallery", "experts", "testimonials"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => scrollToSection(tab)}
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

            {/* About Section */}
            <div ref={aboutRef} id="about" className=" pt-4">
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
                      State-of-the-art medical equipment and comfortable
                      environment
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

            {/* Gallery Section */}
            <div ref={galleryRef} id="gallery" className="pt-2 mt-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Image className="w-6 h-6 mr-2 text-blue-600" />
                  Clinic Gallery
                </h2>

                {clinic.images && clinic.images.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {clinic.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video relative rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
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

                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setShowGalleryModal(true)}
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <span className="font-medium">View all photos</span>
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No gallery images available.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Modal */}
            {showGalleryModal && (
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="absolute right-4 top-4 text-white hover:text-gray-300"
                >
                  <X className="w-8 h-8" />
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
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="mt-4 text-center text-white">
                    <p>
                      {currentImageIndex + 1} / {clinic.images.length}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Experts Section */}
            <div ref={expertsRef} id="experts" className=" pt-2 mt-4">
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
                          {expert.name}
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

            <div className="flex justify-center mt-3">
              <RateClinic clinicId={id} />
            </div>

            {/* Testimonials Section */}
            {/* <div
              ref={testimonialsRef}
              id="testimonials"
              className="space-y-6 pt-8 mt-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Patient Testimonials
                </h2>
                <div className="space-y-6">
                  {clinic.testimonials && clinic.testimonials.length > 0 ? (
                    clinic.testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial._id || index}
                        className="bg-blue-50 p-6 rounded-xl relative"
                      >
                        <div className="absolute top-4 right-4 text-blue-300">
                          <Quote className="w-8 h-8" />
                        </div>
                        <p className="text-gray-700 italic mb-4 leading-relaxed">
                          {testimonial.review}
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {testimonial.name}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No testimonials available yet.</p>
                    </div>
                  )}
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Share Your Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="mt-8 md:mt-2 max-w-sm w-full hidden md:block p-1 bg-white rounded-2xl shadow-xl">
              <iframe
                src={clinic.googleAddressUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-2xl"
              ></iframe>
            </div>

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

            {/* Testimonials Section - Move this below RateClinic in the right column */}
            <div
              ref={testimonialsRef}
              id="testimonials"
              className="space-y-6 mt-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Patient Testimonials
                </h2>

                {clinic.testimonials && clinic.testimonials.length > 0 ? (
                  <>
                    <div className="space-y-6">
                      {clinic.testimonials
                        .slice(
                          currentTestimonialPage * testimonialsPerPage,
                          currentTestimonialPage * testimonialsPerPage +
                            testimonialsPerPage
                        )
                        .map((testimonial, index) => (
                          <div
                            key={testimonial._id || index}
                            className="bg-blue-50 p-6 rounded-xl relative"
                          >
                            <div className="absolute top-4 right-4 text-blue-300">
                              <Quote className="w-8 h-8" />
                            </div>
                            <p className="text-gray-700 italic mb-4 leading-relaxed">
                              {testimonial.review}
                            </p>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {testimonial.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {testimonial.name}
                                </h4>
                                <div className="flex items-center space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className="w-4 h-4 text-yellow-400 fill-current"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-sm text-gray-500">
                        Showing page {currentTestimonialPage + 1} of{" "}
                        {Math.ceil(
                          (clinic.testimonials.length || 0) /
                            testimonialsPerPage
                        )}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={handlePrevTestimonialPage}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextTestimonialPage}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                          aria-label="Next page"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No testimonials available yet.</p>
                  </div>
                )}

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Share Your Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
