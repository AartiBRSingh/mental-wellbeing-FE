"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { baseURL } from "../baseURL";
import toast, { Toaster } from "react-hot-toast";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);
  const [Loading, setLoading] = useState(false);

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-categories`);
      setCategories(response.data);

      toast.success("Succesfully fetched blogs");
    } catch (error) {
      toast.error("Error fetching Blogs:", error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${baseURL}/posts?category=${selectedCategory}&page=${currentPage}`;

      if (searchQuery) {
        url += `&title=${encodeURIComponent(searchQuery)}`;
      }

      const response = await axios.get(url);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/posts?page=1&limit=3`);
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
    <div className="bg-transparent font-sans">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="w-32 h-fit bg-green-100 rounded-full blur-3xl opacity-20 mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Explore Our <span className="text-orange-600">Stories</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover transformative insights and inspiring narratives that shape
            perspectives and spark meaningful conversations.
          </p>
        </header>
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-700 appearance-none bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Filter className="ml-[-30px] text-gray-400" />
            </div>
            <div className="flex-1 flex items-center">
              <Search className="ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors ml-[-30px]"
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-gray-400 mb-3">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">
                  No posts found. Try a different search or category.
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover aspect-square md:aspect-auto group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-4 py-1.5 rounded-full text-sm bg-green-100 text-green-600 font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${generateSlug(post.title, post._id)}`}
                        className="block text-2xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors"
                        target="_blank"
                      >
                        {post.title}
                      </Link>
                      <div className="flex gap-2 items-center text-gray-400 text-sm mb-4">
                        <Eye className="w-4 h-4 text-green-400" />
                        {post.totalViews.toLocaleString()} Views
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {truncateContent(post.content)}
                      </p>
                      <Link
                        href={`/blogs/${generateSlug(post.title, post._id)}`}
                        className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                        target="_blank"
                      >
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="flex justify-center items-center space-x-6 mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center px-6 py-3 rounded-xl bg-white text-gray-700 shadow-md disabled:opacity-50 hover:bg-green-50 transition-colors disabled:hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              <span className="text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center px-6 py-3 rounded-xl bg-white text-gray-700 shadow-md disabled:opacity-50 hover:bg-green-50 transition-colors disabled:hover:bg-white"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              Recent
              <span className="text-green-600 ml-2">Posts</span>
            </h3>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="group pb-6 border-b last:border-b-0 last:pb-0"
                >
                  <Link
                    href={`/blogs/${generateSlug(post.title, post._id)}`}
                    className="block font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors"
                    target="_blank"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {truncateContent(post.content, 100)}
                  </p>
                  <div className="flex items-center text-sm text-gray-400 space-x-3">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 text-green-400 mr-1.5" />
                      <span>{post.totalViews.toLocaleString()} Views</span>
                    </div>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
