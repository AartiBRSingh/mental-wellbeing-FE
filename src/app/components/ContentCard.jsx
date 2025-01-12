import Link from "next/link";
import React from "react";

const ContentCard = ({ entry }) => {
  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
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
  );
};

export default ContentCard;
