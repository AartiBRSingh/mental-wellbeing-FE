"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "../baseURL";

const DisorderPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchDisorder = async () => {
      try {
        const response = await axios.get(`${baseURL}/content?ogType=Disorder`);
        setEntries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Disorder entries");
        setLoading(false);
      }
    };

    fetchDisorder();
  }, []);

  const groupEntriesByFirstLetter = (entries) => {
    const grouped = {};
    entries.forEach((entry) => {
      const firstLetter = entry.title[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(entry);
    });
    return grouped;
  };

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
  };

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

  const groupedEntries = groupEntriesByFirstLetter(entries);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6">
        <nav className="text-sm">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">-</li>
            <li>
              <Link
                href="/resources"
                className="text-gray-500 hover:text-gray-700"
              >
                Resources
              </Link>
            </li>
            <li className="text-gray-500">-</li>
            <li className="text-gray-700">Medical Disorders</li>
          </ol>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Left Sidebar (Index List) */}
        <div className="w-1/4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Index</h2>
          <div className="overflow-y-auto h-[80vh]">
            {Object.keys(groupedEntries)
              .sort()
              .map((letter) => (
                <div key={letter} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {letter}
                  </h3>
                  <ul>
                    {groupedEntries[letter]
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((entry) => (
                        <li key={entry._id}>
                          <button
                            onClick={() => handleSelectEntry(entry)}
                            className="text-blue-600 hover:text-blue-800 hover:underline py-1 w-full text-left"
                          >
                            {entry.title}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-3/4">
          {selectedEntry ? (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedEntry.title}
              </h1>
              <p>{selectedEntry.content}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              <p>Select a disorder to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisorderPage;
