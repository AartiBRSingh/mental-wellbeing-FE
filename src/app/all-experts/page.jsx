"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Mail, Phone, Star, CheckCircle } from "lucide-react";
import Link from "next/link";
import { baseURL } from "../baseURL";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const ExpertPage = () => {
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-experts`, {
          params: { search, userType },
        });
        setExperts(response.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchExperts();
  }, [search, userType]);

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-4 text-gray-800">
          <span className="relative">
            Our Experts
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
        </h2>
        <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          Connect with our verified experts who are here to help you on your
          journey.
        </p>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search experts..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-96 focus:ring focus:ring-orange-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {experts?.map((expert) => (
            <div
              key={expert._id}
              className="bg-slate-50 rounded-3xl p-8 relative border shadow-xl border-red-100"
            >
              <div className="flex gap-6">
                {/* Left side - Profile Image */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <img
                      src={expert.image || "/api/placeholder/300/200"}
                      alt={expert.name}
                      className="w-44 h-44 object-cover rounded-full shadow-md"
                    />
                  </div>
                  <Link
                    href={`/all-experts/${expert._id}?tab=info`}
                    className="cursor-pointer flex items-center justify-center gap-2 py-2 w-full bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span className="text-center">View profile</span>
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>

                {/* Right side - Details */}
                <div className="flex-1 mt-4">
                  <h3 className="flex text-3xl font-medium mb-4">
                    {expert.name}{" "}
                    {expert.isProfileVerified && (
                      <div className="ml-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center shadow-sm">
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                        SYH Approved
                      </div>
                    )}
                  </h3>
                  <div className="space-y-3">
                    <p className="text-xl font-medium text-gray-600">
                      {expert.userType}
                    </p>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-black" />
                      <span className="text-xl truncate text-gray-600">
                        {expert.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-black" />
                      <span className="text-xl text-gray-600">
                        {expert.contactNumber}
                      </span>
                    </div>
                    <div className="flex items-center bg-white shadow-md rounded-full px-3 mt-4 max-w-24">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-8 h-8 ${
                            index < expert.rating
                              ? "text-yellow-500 fill-current"
                              : "text-yellow-500 fill-current"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2 mr-4">
                  <div className="bg-blue-100 rounded-xl p-2 text-center">
                    <h4 className="text-black text-lg font-semibold mb-2">
                      Clinic Timings
                    </h4>
                    <p className="text-slate-500 text-lg">Monday - Friday</p>
                    <p className="text-slate-500 text-lg mt-3">
                      9:00 AM - 5:00 PM
                    </p>
                  </div>

                  <button className="w-40 absolute right-16 bottom-10 bg-green-700 text-white p-2 rounded-xl hover:bg-green-800 transition-colors font-semibold">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
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
