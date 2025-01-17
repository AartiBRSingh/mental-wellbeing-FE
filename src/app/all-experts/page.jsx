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
      <section className="py-16 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          Loading experts...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert) => (
            <div
              key={expert._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={expert.image || "/api/placeholder/300/200"}
                  alt={expert.name}
                  className="w-full h-48 object-cover"
                />
                {expert.isProfileVerified && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{expert.name}</h3>
                <p className="text-gray-600 mb-2">{expert.userType}</p>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm truncate">{expert.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{expert.contactNumber}</span>
                </div>

                <Link
                  href={`/all-experts/${expert._id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
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
