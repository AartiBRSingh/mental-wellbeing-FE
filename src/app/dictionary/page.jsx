"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "../baseURL";

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
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
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
                href="/get-help"
                className="text-gray-500 hover:text-gray-700"
              >
                Get Help
              </Link>
            </li>
            <li className="text-gray-500">-</li>
            <li className="text-gray-700">Diagnosis Dictionary</li>
          </ol>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto flex gap-8">
        {/* Left Sidebar (Index List) */}
        <div className="w-full">
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
                          <Link
                            href={`/dictionary/detail?id=${entry._id}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline py-1 w-full text-left"
                          >
                            {entry.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
