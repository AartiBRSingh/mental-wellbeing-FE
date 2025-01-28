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
    <div className="p-0">
      <Link
        href={`/dictionary/${generateSlug(entry.title, entry._id)}`}
        className="inline-block px-6 py-2  text-white rounded-lg hover:bg-blue-100 transition-colors duration-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {entry.h2Title}
        </h3>
      </Link>
    </div>
  );
};

export default ContentCard;
