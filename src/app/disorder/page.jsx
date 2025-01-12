"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "../baseURL";
import ContentCard from "../components/ContentCard";

const DisorderPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Medical Disorder
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

export default DisorderPage;
