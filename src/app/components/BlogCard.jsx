import React from "react";
import { Eye, Calendar } from "lucide-react";
import Link from "next/link";

const BlogCard = ({
  imgUrl,
  title,
  description,
  totalViews,
  date,
  redirectTo,
}) => {
  return (
    <div className="w-full max-w-sm bg-white border-2 border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover filter brightness-90 grayscale-[20%]"
          src={imgUrl}
          alt="Blog cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-[100px]">
          <Link
            href={redirectTo}
            className="text-xl font-semibold text-[#1F2937] tracking-tight cursor-pointer"
            target="_blank"
          >
            {title}
          </Link>
        </div>
        <div className="flex items-center justify-between text-[#6B7280] text-sm">
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#3B82F6]" />
            {totalViews} views
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#10B981]" />
            {date}
          </span>
        </div>
        <p
          className="text-[#4B5563] line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
        <Link
          href={redirectTo}
          target="_blank"
          className="inline-block mt-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg shadow-md hover:bg-[#2563EB] transition-colors cursor-pointer"
        >
          Read more
          <svg
            className="inline-block ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
