import React from "react";
import { ChevronRight, Eye, Calendar, Bookmark } from "lucide-react";

const DecorativeCircles = () => (
  <svg
    className="absolute right-4 top-4 w-20 h-20 opacity-10"
    viewBox="0 0 100 100"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="50"
      cy="50"
      r="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const DecorativeDots = () => (
  <svg
    className="absolute left-4 bottom-4 w-16 h-16 opacity-10"
    viewBox="0 0 64 64"
  >
    <circle cx="8" cy="8" r="2" fill="currentColor" />
    <circle cx="24" cy="8" r="2" fill="currentColor" />
    <circle cx="40" cy="8" r="2" fill="currentColor" />
    <circle cx="8" cy="24" r="2" fill="currentColor" />
    <circle cx="24" cy="24" r="2" fill="currentColor" />
    <circle cx="40" cy="24" r="2" fill="currentColor" />
    <circle cx="8" cy="40" r="2" fill="currentColor" />
    <circle cx="24" cy="40" r="2" fill="currentColor" />
    <circle cx="40" cy="40" r="2" fill="currentColor" />
  </svg>
);

const BlogCard = ({
  imgUrl,
  title,
  description,
  totalViews,
  date,
  redirectTo,
  index,
  createdAt,
}) => {
  const formatDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getBackgroundStyle = (index) => {
    const styles = [
      "from-yellow-100 to-yellow-200",
      "from-green-100 to-green-200",
      "from-purple-100 to-purple-200",
    ];
    return styles[index % styles.length];
  };

  return (
    <div
      className={`
      rounded-3xl p-6 md:p-8 relative border shadow-lg 
      bg-gradient-to-r ${getBackgroundStyle(index)}
      transform transition-all duration-300 hover:scale-[1.02]
      hover:shadow-xl overflow-hidden 
      w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto
    `}
    >
      <DecorativeCircles />
      <DecorativeDots />

      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <Calendar size={16} />
        <span className="text-sm">{formatDate(createdAt)}</span>
      </div>

      <h2 className="font-semibold text-xl md:text-2xl mb-4 text-gray-800 line-clamp-2 relative z-10">
        {title}
      </h2>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 text-gray-700">
          <Eye size={16} />
          <span className="text-sm font-medium">{totalViews} views</span>
        </div>

        <a
          href={redirectTo}
          className="
            flex items-center gap-1 px-4 py-2 
            rounded-full bg-white text-gray-700 
            font-medium text-sm shadow-md 
            transform transition-all duration-300
            hover:shadow-lg hover:translate-x-1
          "
        >
          Read More
          <ChevronRight size={16} />
        </a>
      </div>

      <div className="absolute top-4 right-4 transform rotate-45 opacity-20">
        <Bookmark size={64} />
      </div>
    </div>
  );
};

export default BlogCard;
