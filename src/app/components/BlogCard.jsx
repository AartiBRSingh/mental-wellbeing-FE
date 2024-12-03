import React from "react";
import { Eye, Calendar, ArrowUpRight } from "lucide-react";
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
    <div className="group relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transition-all duration-500 hover:shadow-4xl hover:scale-[1.015]">
      {/* Image Section with Sophisticated Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 
          group-hover:scale-105 filter brightness-90 contrast-125"
          src={imgUrl}
          alt="Blog cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111827]/60"></div>
      </div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-[#111827] via-[#111827]/90 to-transparent text-white">
        <div className="space-y-3">
          <Link href={redirectTo} target="_blank" className="group/title block">
            <h3
              className="text-xl font-semibold tracking-tight 
              transition-colors duration-300 
              group-hover/title:text-gray-300 
              line-clamp-2 cursor-pointer"
            >
              {title}
            </h3>
          </Link>

          <p
            className="text-gray-400 text-sm line-clamp-2 mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-600" />
              {totalViews} views
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              {date}
            </span>
          </div>

          <Link
            href={redirectTo}
            target="_blank"
            className="group/button mt-4 flex items-center justify-between 
              px-4 py-2 bg-white/10 text-white 
              rounded-lg backdrop-blur-sm border border-white/20
              hover:bg-white/20 transition-all duration-300 
              hover:border-white/40 cursor-pointer
              "
          >
            <span className="font-medium">Read more</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 
              group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
