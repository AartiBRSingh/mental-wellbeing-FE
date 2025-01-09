import React from "react";

const BlogCard = ({
  imgUrl,
  title,
  description,
  totalViews,
  date,
  redirectTo,
}) => {
  return (
    <div className="bg-cream rounded-2xl shadow-xl p-5 min-h-[600px] relative">
      {/* Image container with hover effects */}
      <div className="relative mb-6 group">
        {/* Background effect that only appears on hover */}
        <div className="absolute -right-2 -top-2 w-full h-64 bg-orange-300 rounded-xl transform rotate-2 transition-all duration-300 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-3"></div>
        <img
          src={imgUrl}
          alt="Helping to Navigate"
          className="relative w-full h-64 object-cover rounded-xl shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
        />
      </div>
      <div className="px-2 bg-transparent">
        <div className="mb-4">
          <h2 className="text-xl font-bold border-l-4 border-amber-800 pl-4 py-2 bg-amber-100 rounded-r-xl">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 mt-4 mb-4 text-base leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute bottom-5 left-5 right-5 my-6">
        <a
          href={redirectTo}
          className="flex items-center justify-center gap-2 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span className="text-center">Read More</span>
          <span className="text-2xl transition-transform duration-300 hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
