"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { baseURL } from "../baseURL";
import Link from "next/link";

const ExpertPage = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-experts`);
        setExperts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experts:", error);
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-cream relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-600">Loading experts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
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
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Connect with our verified experts who are here to help you on your
          journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <div
              key={expert._id}
              className="bg-cream rounded-3xl p-4 relative size-auto border border-red-100"
            >
              <div className="relative mb-4 group">
                <div className="absolute -right-2 -top-2 w-full h-40 bg-slate-400 rounded-xl transform rotate-2 transition-all duration-300 opacity-0 scale-85 group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-3"></div>
                <img
                  src={expert.image || "/api/placeholder/300/200"}
                  alt={expert.name}
                  className="relative w-full h-56 object-cover rounded-xl shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                />
                {expert.isProfileVerified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center shadow-sm">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Verified
                  </div>
                )}
              </div>

              <div className="px-1 bg-transparent">
                <div>
                  <h3 className="text-xl font-medium border-l-4 border-amber-800 pl-4 py-2 bg-amber-100 rounded-r-xl line-clamp-2">
                    {expert.name}
                  </h3>
                </div>

                <div className="text-gray-600 mt-4 mb-6 space-y-3">
                  <p className="text-sm font-medium">{expert.userType}</p>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-black" />
                    <span className="text-sm truncate">{expert.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-black" />
                    <span className="text-sm">{expert.contactNumber}</span>
                  </div>
                </div>
              </div>

              <div className="relative bottom-2 left-1 px-4">
                <Link
                  href={`/all-experts/${expert._id}`}
                  className="flex items-center justify-center gap-2 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="text-center">View Details</span>
                  <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertPage;
