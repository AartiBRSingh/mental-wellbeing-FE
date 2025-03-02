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
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeTab, setActiveTab] = useState("content"); // "index" or "content" for mobile view

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

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
    // Switch to content tab when an entry is selected on mobile
    if (window.innerWidth < 768) {
      setActiveTab("content");
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Function to safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  // Group entries by category only
  const groupEntriesByCategory = (entries) => {
    const grouped = {};

    entries.forEach((entry) => {
      const category = entry.category || "Uncategorized";

      if (!grouped[category]) {
        grouped[category] = [];
      }

      // Since subcategory = title, we'll directly add the entry to the category
      grouped[category].push(entry);
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

  const groupedEntries = groupEntriesByCategory(entries);

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
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

      {/* Mobile Tabs Navigation */}
      <div className="md:hidden max-w-6xl mx-auto mb-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("index")}
            className={`flex-1 py-2 px-4 font-medium text-center ${
              activeTab === "index"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Index
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 py-2 px-4 font-medium text-center ${
              activeTab === "content"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Content
            {selectedEntry
              ? `: ${selectedEntry.title.substring(0, 15)}...`
              : ""}
          </button>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto">
        {/* Mobile View - Tab-based Layout */}
        <div className="md:hidden">
          {activeTab === "index" ? (
            <div className="w-full mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Index</h2>
              <div className="overflow-y-auto max-h-[70vh] border rounded-lg p-3 bg-gray-50">
                {Object.keys(groupedEntries)
                  .sort()
                  .map((category) => (
                    <div key={category} className="mb-2">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-blue-600 p-2 rounded hover:bg-gray-100"
                      >
                        <span>{category}</span>
                        <span className="text-gray-500">
                          {expandedCategories[category] ? "−" : "+"}
                        </span>
                      </button>

                      {expandedCategories[category] && (
                        <ul className="ml-2 border-l-2 border-gray-200 pl-2 mt-1">
                          {groupedEntries[category]
                            .sort((a, b) =>
                              (a.subCategory || a.title).localeCompare(
                                b.subCategory || b.title
                              )
                            )
                            .map((entry) => (
                              <li key={entry._id} className="py-1">
                                <button
                                  onClick={() => handleSelectEntry(entry)}
                                  className={`text-sm hover:underline w-full text-left px-2 py-1 rounded ${
                                    selectedEntry &&
                                    selectedEntry._id === entry._id
                                      ? "text-blue-600 font-medium bg-blue-50"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {entry.subCategory || entry.title}
                                </button>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full">
              {selectedEntry ? (
                <div className="bg-white rounded-lg shadow-sm p-4 border">
                  <div className="mb-4 flex flex-col items-start gap-3">
                    {selectedEntry.image && (
                      <img
                        src={selectedEntry.image}
                        alt={selectedEntry.title}
                        className="w-full h-auto object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {selectedEntry.title}
                      </h1>
                      {selectedEntry.category && (
                        <p className="text-gray-600 mt-1">
                          Category: {selectedEntry.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      selectedEntry.content
                    )}
                    className="prose max-w-none text-gray-800 leading-relaxed text-sm"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg text-gray-500 border">
                  <p className="text-center px-4">
                    Select a disorder from the index to view details
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop View - Side by Side Layout */}
        <div className="hidden md:flex md:flex-row gap-8">
          {/* Left Sidebar (Index List with Categories) */}
          <div className="w-1/4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Index</h2>
            <div className="overflow-y-auto max-h-[80vh] border rounded-lg p-4 bg-gray-50">
              {Object.keys(groupedEntries)
                .sort()
                .map((category) => (
                  <div key={category} className="mb-3">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-blue-600 p-2 rounded hover:bg-gray-100"
                    >
                      <span>{category}</span>
                      <span className="text-gray-500">
                        {expandedCategories[category] ? "−" : "+"}
                      </span>
                    </button>

                    {expandedCategories[category] && (
                      <ul className="ml-3 border-l-2 border-gray-200 pl-2 mt-1">
                        {groupedEntries[category]
                          .sort((a, b) =>
                            (a.subCategory || a.title).localeCompare(
                              b.subCategory || b.title
                            )
                          )
                          .map((entry) => (
                            <li key={entry._id} className="py-1">
                              <button
                                onClick={() => handleSelectEntry(entry)}
                                className={`text-sm hover:underline w-full text-left px-2 py-1 rounded ${
                                  selectedEntry &&
                                  selectedEntry._id === entry._id
                                    ? "text-blue-600 font-medium bg-blue-50"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {entry.subCategory || entry.title}
                              </button>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-3/4">
            {selectedEntry ? (
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="mb-6 flex flex-row items-center gap-4">
                  {selectedEntry.image && (
                    <img
                      src={selectedEntry.image}
                      alt={selectedEntry.title}
                      className="w-40 h-auto object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {selectedEntry.title}
                    </h1>
                    {selectedEntry.category && (
                      <p className="text-gray-600 mt-1">
                        Category: {selectedEntry.category}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={createMarkup(selectedEntry.content)}
                  className="prose max-w-none text-gray-800 leading-relaxed"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg text-gray-500 border">
                <p>Select a disorder from the index to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisorderPage;
