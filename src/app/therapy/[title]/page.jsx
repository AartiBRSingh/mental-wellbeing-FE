"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { baseURL } from "../../baseURL";
import ContentDetailCard from "@/app/components/ContentDetailCard";

const TherapyDetailPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const therapyId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: baseURL,
        });
        const postResponse = await api.get(`/content/${therapyId}`);
        setData(postResponse?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    if (therapyId) {
      fetchData();
    }
  }, [therapyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
        <Link
          href="/therapy"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Therapy
        </Link>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <ContentDetailCard data={data} />;
};

export default TherapyDetailPage;
