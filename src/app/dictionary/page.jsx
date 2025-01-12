"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const DictionaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const response = await axios.get(
          "https://starfish-app-fko8w.ondigitalocean.app/dictionary"
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

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Medical Dictionary
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                  {entry.title}
                </h2>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {entry.h2Title}
                </h3>
                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: entry.content.substring(0, 150) + "...",
                  }}
                />
                <Link
                  href={`/dictionary/${generateSlug(entry.title, entry._id)}`}
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
