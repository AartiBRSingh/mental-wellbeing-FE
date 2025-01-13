"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "../baseURL";
import ContentCard from "../components/ContentCard";

const DictionaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/content?ogType=Dictionary`
        );
        setEntries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dictionary entries");
        setLoading(false);
      }
    };

    fetchDictionary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/bg-01.svg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-12">
          <span className="text-gray-700 relative">
            M
            <span className="relative">
              edical Dictionary
              <svg
                className="absolute w-full h-[6px] bottom-0 left-0"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 -5, 100 5"
                  stroke="orange"
                  strokeWidth="6"
                  fill="transparent"
                />
              </svg>
            </span>
          </span>
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <ContentCard entry={entry} key={entry._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
