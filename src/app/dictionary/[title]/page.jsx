"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { baseURL } from "../../baseURL";

const TherapyDetailPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const dictionaryId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: baseURL,
        });
        const postResponse = await api.get(`/dictionary/${dictionaryId}`);
        setData(postResponse?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    if (dictionaryId) {
      fetchData();
    }
  }, [dictionaryId]);

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
          href="/dictionary"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Dictionary
        </Link>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/dictionary"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dictionary
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <article className="bg-white shadow-xl rounded-2xl overflow-hidden">
              {data.image && (
                <div className="relative h-96">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {data.h1Title}
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-200">
                      {data.h2Title}
                    </h2>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center text-gray-600 mb-6 space-x-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <span className="text-sm">
                      {new Date(data.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {data.title}
                  </h3>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  />
                </div>
              </div>
            </article>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-xl p-6 sticky top-8">
              <h4 className="text-lg font-semibold mb-4">Quick Overview</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Main Title</p>
                  <p className="font-medium">{data.h1Title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subtitle</p>
                  <p className="font-medium">{data.h2Title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {new Date(data.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyDetailPage;
