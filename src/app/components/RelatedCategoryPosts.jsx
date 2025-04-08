// RelatedCategoryPosts.jsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RelatedCategoryPosts = ({ posts = [], category = "" }) => {
  // Function to generate slug from title and id
  const generateSlug = (title, id) => {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
        More on{" "}
        <span className="relative text-[#956144] ml-2">
          {category}
          <svg
            className="absolute w-full h-[10px] -bottom-2 left-0"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 5 Q 50 -5, 100 5"
              stroke="orange"
              strokeWidth="4"
              fill="transparent"
            />
          </svg>
        </span>
      </h2>

      <hr className="border-t border-black mx-10 mb-8 " />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {post.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <Link href={`/blog/${generateSlug(post.title, post._id)}`}>
                <div className="font-semibold text-lg text-gray-800 hover:text-[#78E1FE] mb-2 line-clamp-2">
                  {post.title}
                </div>
              </Link>
              {post.subTitle && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.subTitle}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-500">
                  {post.totalViews} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCategoryPosts;
