"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { baseURL } from "../baseURL";

/**
 * CitySearch Component
 *
 * A reusable component that displays a list of cities with search functionality
 * By default shows 12 featured cities, but allows searching through all available cities
 *
 * @param {Object} props
 * @param {string} props.title - Optional custom title for the component
 * @param {string} props.subtitle - Optional custom subtitle for the component
 * @param {string} props.className - Optional additional classes for styling
 * @param {Function} props.onCitySelect - Optional callback when a city is selected
 */
const CitySearch = ({
  title = "Find Mental Health Expert",
  subtitle = "Featured cities or search for others",
  className = "",
  onCitySelect = null,
}) => {
  // List of 12 featured cities to show by default
  const featuredCities = [
    "ahmedabad",
    "Bengaluru",
    "Chennai",
    "kolkata",
    "mumbai",
    "Hyderabad",
    "Pune",
    "New delhi",
    "Jaipur",
    "Lucknow",
    "Varanasi",
    "surat",
  ];

  const [searchCity, setSearchCity] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState(featuredCities);
  const [loading, setLoading] = useState(true);

  // Fetch all cities from API on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const expertsResponse = await axios.get(`${baseURL}/get-experts`);

        if (expertsResponse.data && Array.isArray(expertsResponse.data)) {
          // Extract unique cities, filter out empty values, and sort alphabetically
          const uniqueCities = [
            ...new Set(
              expertsResponse.data
                .map((expert) => expert.city?.trim())
                .filter((city) => city && city !== "")
            ),
          ].sort();

          setAllCities(uniqueCities);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Filter cities based on search input
  useEffect(() => {
    if (searchCity.trim() === "") {
      // Show featured cities when no search
      setDisplayedCities(featuredCities);
    } else {
      // Filter through all cities when searching
      const filtered = allCities.filter((city) =>
        city.toLowerCase().includes(searchCity.toLowerCase())
      );
      setDisplayedCities(filtered);
    }
  }, [searchCity, allCities]);

  // Handle city selection
  const handleCityClick = (city) => {
    if (onCitySelect) {
      onCitySelect(city);
    }
  };

  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 h-fit ${className}`}>
      <div className="flex justify-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          {title.split(" ").slice(0, -1).join(" ")}
          <span className="relative text-[#956144] ml-2">
            {title.split(" ").slice(-1)}
            <svg
              className="relative w-full h-[10px] -bottom-2 left-0"
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
        </h3>
      </div>

      <div className="flex justify-center my-6">
        <img
          src="/medical-checkup.png"
          alt="Benefits Icon"
          className="w-32 h-32"
        />
      </div>

      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}

      {/* Search box with search icon */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search cities..."
          className="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-orange-500 focus:outline-none shadow-sm"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          <p className="mt-2 text-gray-500">Loading cities...</p>
        </div>
      ) : (
        <>
          {/* Cities listing with hover and active states */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {displayedCities.length > 0 ? (
              displayedCities.map((city) => (
                <Link
                  href={`/all-experts?city=${encodeURIComponent(city)}`}
                  key={city}
                  className="text-gray-700 hover:text-[#78E1FE] transition-colors py-1.5 px-2 rounded-md hover:bg-gray-50 flex items-center"
                  onClick={() => handleCityClick(city)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {city}
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center py-4">
                No cities found matching your search
              </p>
            )}
          </div>

          {/* View all experts link */}
          <div className="mt-6 text-center">
            <Link
              href="/all-experts"
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              View all Experts
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CitySearch;
