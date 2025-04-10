"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsTwitterX, BsQuora } from "react-icons/bs";
import { Helmet } from "react-helmet";
import CitySearch from "@/app/components/CitySearch";
import RelatedCategoryPosts from "@/app/components/RelatedCategoryPosts";

import {
  Clock,
  Eye,
  ArrowRight,
  Share,
  Facebook,
  Twitter,
  Linkedin,
  Mails,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { baseURL } from "../../baseURL";
import ShareModal from "@/app/components/ShareModal";
import { FaWhatsapp } from "react-icons/fa";
import useUserInteraction from "@/app/hooks/useUserInteraction";

const BlogDetailPage = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [cities, setCities] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
  };

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  // Helper function to open share popups with consistent dimensions
  const openSharePopup = (url) => {
    window.open(
      url,
      "_blank",
      "width=600,height=500,location=yes,resizable=yes,scrollbars=yes"
    );
  };

  const generateMetaDescription = (content, length = 160) => {
    const strippedContent = content.replace(/<[^>]*>/g, "");
    return strippedContent.length > length
      ? strippedContent.substring(0, length) + "..."
      : strippedContent;
  };
  const { trackPostView } = useUserInteraction();

  const handlePostClick = (postId, slugUrl) => {
    trackPostView(postId);
    router.push(`/blogs/${slugUrl}`);
  };

  useEffect(() => {
    // Set the page URL when the component mounts
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }

    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: baseURL,
        });
        const postResponse = await api.get(`/posts/${postId}`);
        setPost(postResponse?.data);
        await api.put(`/posts/${postId}/view`);
        const recentPostsResponse = await api.get("/posts", {
          params: { limit: 3 },
        });
        setRecentPosts(recentPostsResponse.data?.posts);

        if (postResponse?.data?.category) {
          const categoryPostsResponse = await api.get("/posts", {
            params: {
              category: postResponse.data.category,
              limit: 4,
              excludeId: postId, // Exclude current post
            },
          });
          setCategoryPosts(categoryPostsResponse.data?.posts || []);
        }

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

  useEffect(() => {
    // Set the page URL when the component mounts
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }

    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: baseURL,
        });

        // Fetch post data and recent posts
        const postResponse = await api.get(`/posts/${postId}`);
        setPost(postResponse?.data);

        await api.put(`/posts/${postId}/view`);

        const recentPostsResponse = await api.get("/posts", {
          params: { limit: 3 },
        });
        setRecentPosts(recentPostsResponse.data?.posts);

        // Fetch cities for the CitySearch component
        try {
          const expertsResponse = await api.get(`/get-experts`);
          if (expertsResponse.data && Array.isArray(expertsResponse.data)) {
            // Extract unique cities
            const uniqueCities = [
              ...new Set(
                expertsResponse.data
                  .map((expert) => expert.city?.trim())
                  .filter((city) => city && city !== "")
              ),
            ].sort();

            setCities(uniqueCities);
          }
        } catch (cityError) {
          console.error("Error fetching cities:", cityError);
          // Don't set the main error - we still want to show the blog post
        }

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

  const buttonStyle =
    "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer hover:opacity-80";

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

  // URL encode the page URL and title for sharing
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title);

  // Generate meta description for sharing
  const metaDescription = generateMetaDescription(post.content);

  return (
    <>
      {/* Add Helmet for dynamic meta tags */}
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={metaDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        {post.image && <meta property="og:image" content={post.image} />}

        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={metaDescription} />
        {post.image && <meta property="twitter:image" content={post.image} />}
      </Helmet>

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
              <div className="flex flex-col mb-4">
                <div className="my-2 text-lg text-gray-600">
                  {post.category}
                </div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {post.title}
                </h1>
                {post.subTitle && (
                  <h2 className="text-xl text-gray-700 mt-2">
                    {post.subTitle}
                  </h2>
                )}
              </div>
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
              <div className="flex gap-3">
                {/* WhatsApp share button */}
                <button
                  className={`${buttonStyle} bg-green-500 hover:bg-green-600`}
                  onClick={() =>
                    openSharePopup(
                      `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`
                    )
                  }
                >
                  <FaWhatsapp size={20} className="text-white" />
                </button>

                {/* Email share button */}
                <button
                  className={`${buttonStyle} bg-red-500 hover:bg-red-600`}
                  onClick={() =>
                    openSharePopup(
                      `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodedTitle}&body=Check out this article: ${encodedUrl}`
                    )
                  }
                >
                  <Mails size={20} className="text-white" />
                </button>

                {/* Quora share button */}
                <button
                  className={`${buttonStyle} bg-red-500 hover:bg-[#006396]`}
                  onClick={() =>
                    openSharePopup(
                      `https://quora.com/link/create-post?url=${encodedUrl}`
                    )
                  }
                >
                  <BsQuora size={20} className="text-white" />
                </button>

                {/* LinkedIn share button */}
                <button
                  className={`${buttonStyle} bg-[#0077b5] hover:bg-[#006396]`}
                  onClick={() =>
                    openSharePopup(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`
                    )
                  }
                >
                  <Linkedin size={20} className="text-white" />
                </button>

                {/* Twitter share button */}
                <button
                  className={`${buttonStyle} bg-black hover:bg-sky-600`}
                  onClick={() =>
                    openSharePopup(
                      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
                    )
                  }
                >
                  <BsTwitterX size={20} className="text-white" />
                </button>

                {/* Facebook share button */}
                <button
                  className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`}
                  onClick={() =>
                    openSharePopup(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`
                    )
                  }
                >
                  <Facebook size={20} className="text-white" />
                </button>
              </div>
              <div
                className="prose max-w-none mt-5"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* Add References Section */}
              {post.references && post.references.length > 0 && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    References
                  </h4>
                  {post.references.map((reference, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-sm text-gray-600 font-medium">
                        {reference.title}
                      </p>
                      {reference.details && (
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {reference.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>

        <div>
          <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
              Recent
              <span className="relative text-[#956144] ml-2">
                Post
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
            </h3>
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="mb-4 pb-4 border-b last:border-b-0"
              >
                <a
                  href="#"
                  className="block font-semibold text-gray-800 mb-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePostClick(
                      post._id,
                      generateSlug(post.title, post._id)
                    );
                  }}
                >
                  {post.title}
                </a>
                {post.subTitle && (
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    {post.subTitle}
                  </p>
                )}
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
          <div className="mt-16">
            {/* Option 1: Pass the pre-fetched cities */}
            <CitySearch
              className=""
              initialCities={cities}
              subtitle="Online or in-person, connect with trusted professionals for support tailored to your needs and location."
            />

            {/* Option 2: Let the component fetch cities itself 
            <CitySearch 
              subtitle="Find therapists in your area"
            />
            */}
          </div>
        </div>

        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ShareModal
              onClose={() => setShowShareModal(false)}
              copyToClipboard={handleCopyToClipboard}
              src={pageUrl}
            />
          </div>
        )}

        <div className="col-span-full mt-8 flex justify-center mr-[500px] items-center">
          <div className="flex justify-center gap-3">
            {/* WhatsApp share button */}
            <button
              className={`${buttonStyle} bg-green-500 hover:bg-green-600`}
              onClick={() =>
                openSharePopup(
                  `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`
                )
              }
            >
              <FaWhatsapp size={20} className="text-white" />
            </button>

            {/* Email share button */}
            <button
              className={`${buttonStyle} bg-red-500 hover:bg-red-600`}
              onClick={() =>
                openSharePopup(
                  `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodedTitle}&body=Check out this article: ${encodedUrl}`
                )
              }
            >
              <Mails size={20} className="text-white" />
            </button>

            {/* Quora share button */}
            <button
              className={`${buttonStyle} bg-red-500 hover:bg-[#006396]`}
              onClick={() =>
                openSharePopup(
                  `https://quora.com/link/create-post?url=${encodedUrl}`
                )
              }
            >
              <BsQuora size={20} className="text-white" />
            </button>

            {/* LinkedIn share button */}
            <button
              className={`${buttonStyle} bg-[#0077b5] hover:bg-[#006396]`}
              onClick={() =>
                openSharePopup(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`
                )
              }
            >
              <Linkedin size={20} className="text-white" />
            </button>

            {/* Twitter share button */}
            <button
              className={`${buttonStyle} bg-black hover:bg-sky-600`}
              onClick={() =>
                openSharePopup(
                  `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
                )
              }
            >
              <BsTwitterX size={20} className="text-white" />
            </button>

            {/* Facebook share button */}
            <button
              className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`}
              onClick={() =>
                openSharePopup(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`
                )
              }
            >
              <Facebook size={20} className="text-white" />
            </button>
          </div>
        </div>

        {categoryPosts.length > 0 && (
          <div className="col-span-full mt-8">
            <RelatedCategoryPosts
              posts={categoryPosts}
              category={post.category}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetailPage;
