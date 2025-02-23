"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  Mail,
  Phone,
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { baseURL } from "../baseURL";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const ExpertPage = () => {
  const searchParams = useSearchParams();
  const urlUserType = searchParams.get("userType");
  const carouselRef = useRef(null);

  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [cities, setCities] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const userTypes = [
    "Individual Therapy",
    "Couples / Marriage Counseling",
    "Child & Teen Therapy",
    "Family Therapy",
    "Psychiatry & Medication",
  ];

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-experts`, {
          params: {
            search,
            userType: selectedUserType || urlUserType,
            city: selectedCity,
          },
        });
        setExperts(response.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchExperts();
  }, [search, selectedCity, selectedUserType, urlUserType]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-cities`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Adjust this value based on your card width
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const ExpertCard = ({ expert, isMobile }) => (
    <div
      className={`bg-slate-50 rounded-xl md:rounded-3xl p-4 md:p-8 relative border shadow-xl border-red-100 ${
        isMobile ? "min-w-[300px] max-w-[300px] mx-2" : "w-full"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={expert.image || "/api/placeholder/300/200"}
              alt={expert.name}
              className="w-24 h-24 md:w-44 md:h-44 object-cover rounded-full shadow-md"
            />
          </div>
          <Link
            href={`/all-experts/${expert._id}?tab=info`}
            className="cursor-pointer flex items-center justify-center gap-2 py-2 w-full max-w-[200px] bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
          >
            <span className="text-center">View profile</span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="flex-1">
          <h3 className="flex flex-col md:flex-row items-start md:items-center text-lg md:text-3xl font-medium mb-2 md:mb-4">
            {expert.name}
            {expert.isProfileVerified && (
              <div className="mt-2 md:mt-0 md:ml-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs md:text-sm flex items-center shadow-sm w-fit">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                SYH Approved
              </div>
            )}
          </h3>

          <div className="space-y-2 md:space-y-3">
            <p className="text-sm md:text-xl font-medium text-gray-600">
              {expert.userType}
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <Mail className="w-4 h-4 text-black" />
              <span className="text-xs md:text-xl truncate text-gray-600">
                {expert.email}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Phone className="w-4 h-4 text-black" />
              <span className="text-xs md:text-xl text-gray-600">
                {expert.contactNumber}
              </span>
            </div>
            <div className="flex items-center bg-white shadow-md rounded-full px-2 md:px-3 mt-2 md:mt-4 max-w-24">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-3 h-3 md:w-8 md:h-8 ${
                    index < expert.rating
                      ? "text-yellow-500 fill-current"
                      : "text-yellow-500 fill-current"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <div className="bg-blue-100 rounded-xl p-2 md:p-4 text-center mb-4 md:mb-0">
            <h4 className="text-black text-sm md:text-lg font-semibold mb-2">
              Clinic Timings
            </h4>
            <p className="text-slate-500 text-xs md:text-lg">Monday - Friday</p>
            <p className="text-slate-500 text-xs md:text-lg mt-1 md:mt-3">
              9:00 AM - 5:00 PM
            </p>
          </div>
          <button className="w-full md:w-40 mt-4 md:mt-0 md:absolute md:right-16 md:bottom-10 bg-green-700 text-white p-2 rounded-xl hover:bg-green-800 transition-colors font-semibold text-sm md:text-base">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-8 md:py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gray-800">
          <span className="relative">
            Our Experts
            <svg
              className="absolute w-full h-[6px] md:h-[8px] lg:h-[10px] -bottom-1 left-0"
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
        </h2>
        <p className="text-sm md:text-base text-gray-600 text-center mb-6 max-w-2xl mx-auto px-4">
          Connect with our verified experts who are here to help you on your
          journey.
        </p>

        <div className="mb-6 flex flex-col md:flex-row justify-center gap-4 px-4">
          <input
            type="text"
            placeholder="Search experts..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring focus:ring-orange-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-48 focus:ring focus:ring-orange-500"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-48 focus:ring focus:ring-orange-500"
          >
            <option value="">All Types</option>
            {userTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar touch-pan-x"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {experts.map((expert) => (
              <div key={expert._id} style={{ scrollSnapAlign: "start" }}>
                <ExpertCard expert={expert} isMobile={true} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={() => scrollCarousel("left")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Static View */}
        <div className="hidden md:block space-y-4 md:space-y-6">
          {experts?.map((expert) => (
            <ExpertCard key={expert._id} expert={expert} isMobile={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ExpertPage />
    </Suspense>
  );
};

export default page;
