"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { baseURL } from "../../baseURL";

const NewsDetailPage = () => {
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: baseURL,
        });
        const postResponse = await api.get(`/posts/${postId}`);
        setPost(postResponse?.data);
        await api.put(`/posts/${postId}/view`);
        const recentPostsResponse = await api.get("/posts?type=news", {
          params: { limit: 3 },
        });
        setRecentPosts(recentPostsResponse.data?.posts);

        setLoading(false);
      } catch (err) {
        setError("Failed to load post");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  const truncateContent = (content, length = 150) => {
    const strippedContent = content.replace(/<[^>]*>/g, "");
    return strippedContent.length > length
      ? strippedContent.substring(0, length) + "..."
      : strippedContent;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!post) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <article className="bg-white shadow-lg rounded-xl overflow-hidden">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-6 space-x-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                <span>{post.totalViews} Views</span>
              </div>
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
          Recent <span className="text-[#FF844C]">Posts</span>
        </h3>
        {recentPosts.map((post) => (
          <div key={post._id} className="mb-4 pb-4 border-b last:border-b-0">
            <Link
              href={`/news/${generateSlug(post.title, post._id)}`}
              className="font-semibold text-gray-700 mb-2 hover:text-[#78E1FE] cursor-pointer"
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
  );
};

export default NewsDetailPage;
