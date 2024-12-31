"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Eye } from "lucide-react";
import Link from "next/link";
import { baseURL } from "../baseURL";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-categories?type=blog`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      let url = `${baseURL}/posts?type=blog&category=${selectedCategory}&page=${currentPage}`;

      if (searchQuery) {
        url += `&title=${encodeURIComponent(searchQuery)}`;
      }

      const response = await axios.get(url);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/posts?type=blog&page=1&limit=3`
      );
      setRecentPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, currentPage, searchQuery]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const truncateContent = (content, length = 150) => {
    const strippedContent = content.replace(/<[^>]*>/g, "");
    return strippedContent.length > length
      ? strippedContent.substring(0, length) + "..."
      : strippedContent;
  };

  return (
    <div className="min-h-screen bg-transparent font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Our <span className="text-[#FF844C]">Blogs</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover transformative stories and insights that inspire and
            enlighten.
          </p>
        </header>
        <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#78E1FE] 
                         text-gray-700 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#CAFA90] 
                         text-gray-700"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {posts.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                No posts found. Try a different search or category.
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden 
                             transition-all duration-300 hover:shadow-xl"
                >
                  <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-sm 
                                       bg-[#FAD77B]/20 text-[#FF844C]"
                        >
                          {post.category}
                        </span>

                        <span className="text-gray-500 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${generateSlug(post.title, post._id)}`}
                        className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
                        target="_blank"
                      >
                        {post.title}
                      </Link>
                      <div className="flex gap-2 items-center text-gray-500 text-sm mb-3">
                        <Eye className="w-4 h-4 text-[#78E1FE]" />
                        {post.totalViews} Views
                      </div>
                      <p className="text-gray-600 mb-4">
                        {truncateContent(post.content)}
                      </p>
                      <Link
                        href={`/blogs/${generateSlug(post.title, post._id)}`}
                        className="text-orange-500 hover:underline cursor-pointer"
                        target="_blank"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg 
                           bg-[#CAFA90]/20 text-[#FF844C] 
                           disabled:opacity-50 hover:bg-[#CAFA90]/40 
                           transition-colors cursor-pointer"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg 
                           bg-[#78E1FE]/20 text-[#FF844C] 
                           disabled:opacity-50 hover:bg-[#78E1FE]/40 
                           transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
              Recent <span className="text-[#FF844C]">Posts</span>
            </h3>
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="mb-4 pb-4 border-b last:border-b-0"
              >
                <Link
                  href={`/blogs/${generateSlug(post.title, post._id)}`}
                  className="font-semibold text-gray-700 mb-2 hover:text-[#78E1FE] cursor-pointer"
                  target="_blank"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500 mb-2">
                  {truncateContent(post.content, 100)}
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <Eye className="w-4 h-4 text-[#78E1FE]" />
                  <span>{post.totalViews} Views</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
