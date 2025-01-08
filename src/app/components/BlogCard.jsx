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
    <div className="bg-cream rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
      <div className="mb-4">
        <img
          src={imgUrl}
          alt="Helping to Navigate"
          className="rounded-t-lg h-60 w-full object-cover"
        />
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center border-b border-t border-t-[#956144] border-b-[#956144] mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <h2 className="text-xl font-semibold">|</h2>
          <a
            href={redirectTo}
            className="cursor-pointer inline-flex items-center px-6 my-1 py-2 bg-yellow-400 text-green-900 font-bold rounded-md hover:bg-yellow-500 transition-colors duration-300"
          >
            <span className="cursor-pointer ">→</span>
          </a>
        </div>
        <p className="text-opacity-70 mb-4 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
