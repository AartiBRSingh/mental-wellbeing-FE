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
    <div className="group relative w-full max-w-sm bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(135,_206,_235,_0.7)] hover:scale-[1.060] h-[460px] will-change-transform">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-75 contrast-110 saturate-105"
          src={imgUrl}
          alt="Blog cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70"></div>
      </div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent text-gray-200 backdrop-blur-sm">
        <div className="space-y-4">
          <Link href={redirectTo} target="_blank" className="group/title block">
            <h3 className="text-2xl font-bold tracking-tight 
              transition-all duration-300 
              group-hover/title:text-white
              line-clamp-2 cursor-pointer shadow-xl">
              {title}
            </h3>
          </Link>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4"
            dangerouslySetInnerHTML={{ __html: description }}>
          </p>

          <div className="flex items-center justify-between text-sm text-gray-200">
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
              <Eye className="w-4 h-4" />
              {totalViews} views
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
          </div>

          <Link
            href={redirectTo}
            target="_blank"
            className="group/button mt-4 flex items-center justify-between 
              px-6 py-3 bg-gradient-to-r from-green-900 to-green-600
              rounded-xl backdrop-blur-sm  transition-all duration-300 
              hover:from-blue-500/30 hover:to-green-600"
          >
            <span className="font-medium text-white bg-clip-text text-transparent">
              Read more
            </span>
            <ArrowUpRight className="w-6 h-6 text-white transition-all duration-300 
              group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;