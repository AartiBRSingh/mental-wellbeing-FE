"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ExpertFilter = ({ cityOptions, searchParams }) => {
  const pathname = usePathname();
  const activeCity = searchParams.city;
  const activeUserType = searchParams.expertType;

  const expertTypes = [
    { value: "", label: "All Types" },
    { value: "Individual Therapy", label: "Individual Therapy" },
    {
      value: "Couples / Marriage Counseling",
      label: "Couples / Marriage Counseling",
    },
    { value: "Child & Teen Therapy", label: "Child & Teen Therapy" },
    { value: "Family Therapy", label: "Family Therapy" },
    { value: "Psychiatry & Medication", label: "Psychiatry & Medication" },
  ];

  return (
    <div className="flex justify-center mb-8 space-x-4">
      {/* City Filter */}
      <select
        value={activeCity || ""}
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          if (e.target.value) {
            newParams.set("city", e.target.value);
          } else {
            newParams.delete("city");
          }
          window.location.search = newParams.toString();
        }}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">All Cities</option>
        {cityOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Expert Type Filter */}
      <div className="flex space-x-2">
        {expertTypes.map((type) => (
          <Link
            key={type.value}
            href={{
              pathname,
              query: {
                ...searchParams,
                expertType: type.value || undefined,
              },
            }}
            className={`px-4 py-2 border rounded-md ${
              activeUserType === type.value
                ? "bg-amber-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {type.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExpertFilter;
