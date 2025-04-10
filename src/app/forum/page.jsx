"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  User,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  Send,
  Plus,
  Hash,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ShareModal from "@/app/components/ShareModal";
import axios from "axios";
import { baseURL } from "../baseURL";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Forum = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState({});
  const [stayAnonymous, setStayAnonymous] = useState(false);

  // Share Modal States
  const [selectedPostUrl, setSelectedPostUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Refs for horizontal scrolling
  const topicsScrollRef = useRef(null);

  // Scroll functions for horizontal scrolling
  const scrollLeft = () => {
    if (topicsScrollRef.current) {
      topicsScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (topicsScrollRef.current) {
      topicsScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Fetch User ID from Cookies
  useEffect(() => {
    const userId = Cookies.get("userId");
    setUserId(userId || "");
  }, []);

  // Fetch Posts
  const fetchPosts = async (tagList = [], search = "") => {
    try {
      let queryParams = "";

      if (tagList.length > 0) {
        const encodedTags = tagList
          .map((tag) => encodeURIComponent(tag))
          .join(",");
        queryParams += `?tags=${encodedTags}`;
      }

      if (search) {
        const encodedSearch = encodeURIComponent(search);
        queryParams += queryParams
          ? `&search=${encodedSearch}`
          : `?search=${encodedSearch}`;
      }

      const res = await axios.get(`${baseURL}/get-posts${queryParams}`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch Tags
  const fetchTags = async () => {
    try {
      const res = await axios.get(`${baseURL}/tags`);
      const filteredTags = res.data.filter((tag) => tag && tag.trim() !== "");
      setTags(filteredTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Create Post
  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", newPost.content);
      if (!stayAnonymous) {
        formData.append("user", userId);
      }
      if (newPost.tags && newPost.tags.trim() !== "") {
        formData.append("tags", newPost.tags);
      }

      if (newPost.image) {
        formData.append("image", newPost.image);
      }

      await axios.post(`${baseURL}/add-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewPost({ title: "", content: "", tags: "", image: null });
      setShowNewPostForm(false);
      fetchPosts(selectedTags);
      fetchTags();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Add Comment
  const addComment = async (postId) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    try {
      await axios.post(`${baseURL}/post/${postId}/comment`, {
        text: comment,
        user: stayAnonymous ? null : userId,
      });
      setComment("");
      setShowCommentForm({ ...showCommentForm, [postId]: false });
      fetchPosts(selectedTags);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Add Reply
  const addReply = async (postId, commentId) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    try {
      await axios.post(`${baseURL}/post/${postId}/comment/${commentId}/reply`, {
        text: reply[commentId],
        user: stayAnonymous ? null : userId,
      });
      setReply({ ...reply, [commentId]: "" });
      fetchPosts(selectedTags);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Toggle Like
  const toggleLike = async (postId) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    await axios.post(`${baseURL}/post/${postId}/like`, { userId });
    fetchPosts(selectedTags);
  };

  // Handle Tag Click
  const handleTagClick = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    if (selectedPostUrl) {
      navigator.clipboard.writeText(selectedPostUrl);
    }
  };

  // Handle Share Click
  const handleShareClick = (postUrl) => {
    setSelectedPostUrl(postUrl);
    setShowShareModal(true);
  };

  // UseEffects
  useEffect(() => {
    fetchPosts(selectedTags, searchQuery);
  }, [selectedTags]);

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  // Clear Selected Tags
  const clearSelectedTags = () => {
    setSelectedTags([]);
  };

  // Render Trending Topics (for top of page)
  const renderTrendingTopics = () => {
    return (
      <div className="">
        <div className="max-w-full mx-16 px-4 sm:px-6 py-4">
          {/* Scrollable topics with navigation buttons */}
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-black rounded-full shadow-md p-1 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div
              ref={topicsScrollRef}
              className="overflow-x-auto pb-2 hide-scrollbar px-6"
            >
              <div className="flex space-x-2 min-w-max">
                {/* <button
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                    selectedTags.length === 0
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
                  }`}
                  onClick={clearSelectedTags}
                >
                  All Topics
                </button> */}
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-black"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-black rounded-full shadow-md p-1 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Top Trending Topics */}
      <div className="sticky top-28 bg-white mt-12 z-20">
        {renderTrendingTopics()}
      </div>

      {/* Navigation */}
      {/* <nav className="sticky top-28 z-10 backdrop-blur-md bg-white border-b shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center w-full sm:w-auto gap-1 xl:gap-6">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="xl:w-full w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchPosts(selectedTags, e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">
            {showNewPostForm && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Create New Discussion
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full border rounded p-2 hover:ring-2 hover:ring-green-500 hover:border-green-500 hover:shadow-md hover:shadow-green-300"
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                />
                <input
                  className="w-full px-4 py-3 text-base sm:text-lg font-medium border-b border-gray-200 focus:outline-none focus:border-emerald-500 placeholder-gray-400 mb-4"
                  placeholder="What do you want to ask or share?"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full px-4 py-3 mt-2 h-32 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
                  placeholder="Provide more details..."
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                />
                <input
                  className="w-full px-4 py-3 mt-4 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
                  placeholder="Add topics (comma separated)"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                />
                <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stayAnonymous}
                    onChange={() => setStayAnonymous(!stayAnonymous)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span>Stay Anonymous</span>
                </label>
                <div className="flex flex-col sm:flex-row justify-end mt-6 gap-3">
                  <button
                    onClick={() => setShowNewPostForm(false)}
                    className="w-full sm:w-auto px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors duration-200 font-medium text-sm shadow-sm hover:shadow"
                    onClick={createPost}
                  >
                    Post Discussion
                  </button>
                </div>
              </div>
            )}

            {posts.length === 0 && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-10 mb-6 text-center">
                <div className="text-gray-400 mb-3">
                  <MessageCircle className="w-12 h-12 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No discussions yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Be the first to start a conversation!
                </p>
              </div>
            )}

            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6 transition-all duration-200 hover:shadow-lg"
              >
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Anonymous User
                    </h3>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Posted recently
                    </div>
                  </div>
                </div>

                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto rounded-lg mt-2"
                  />
                )}

                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 xl:text-md text-sm">
                  {post.content}
                </p>

                {/* Post Tags */}
                {post.tags?.length > 0 &&
                  post.tags.some((tag) => tag && tag.trim() !== "") && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags
                        .filter((tag) => tag && tag.trim() !== "")
                        .map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                    </div>
                  )}

                <div className="flex xl:flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <button
                      className={`flex items-center space-x-2 transition-colors duration-200 group ${
                        post.likes.includes(userId)
                          ? "text-emerald-600"
                          : "text-gray-500 hover:text-emerald-600"
                      }`}
                      onClick={() => toggleLike(post._id)}
                      disabled={post.likes.includes(userId)}
                    >
                      <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">
                        {post.likes?.length || 0} Upvotes
                      </span>
                    </button>

                    <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors duration-200 group"
                      onClick={() =>
                        setShowCommentForm({
                          ...showCommentForm,
                          [post._id]: !showCommentForm[post._id],
                        })
                      }
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">
                        {(post.comments?.length || 0) +
                          (post.comments?.reduce(
                            (acc, c) => acc + (c.replies?.length || 0),
                            0
                          ) || 0)}{" "}
                        Comments
                      </span>
                    </button>

                    <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors duration-200 group"
                      onClick={() =>
                        handleShareClick(
                          `${window.location.origin}/post/${post._id}`
                        )
                      }
                    >
                      <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>

                  <button className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 group">
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>

                {/* Comment Form */}
                {showCommentForm[post._id] && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="relative flex items-center">
                      <input
                        className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        className="absolute right-3 p-1.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors duration-200"
                        onClick={() => addComment(post._id)}
                        disabled={!comment.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                {post.comments?.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-medium text-gray-500">
                      Comments ({post.comments.length})
                    </h4>
                    {post.comments?.map((c) => (
                      <div
                        key={c._id}
                        className="pt-3 pl-4 border-l-2 border-emerald-100 transition-all duration-200 hover:border-emerald-400"
                      >
                        {/* Comment */}
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 mb-2 break-words xl:text-sm text-xs">
                              {c.text}
                            </p>
                            <div className="text-xs text-gray-500 mb-3">
                              Anonymous • Just now
                            </div>
                          </div>
                        </div>

                        {/* Reply Input */}
                        <div className="ml-11 mb-3 relative flex items-center">
                          <input
                            className="w-full px-3 py-2 pr-10 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
                            placeholder="Reply to this comment..."
                            value={reply[c._id] || ""}
                            onChange={(e) =>
                              setReply({ ...reply, [c._id]: e.target.value })
                            }
                          />
                          <button
                            className="absolute right-2 p-1 text-emerald-600 hover:text-emerald-700 disabled:text-gray-400 transition-colors duration-200"
                            onClick={() => addReply(post._id, c._id)}
                            disabled={!reply[c._id]?.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Replies */}
                        {c.replies?.map((r) => (
                          <div
                            key={r._id}
                            className="ml-11 mt-3 pl-3 border-l border-gray-200"
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <User className="w-3 h-3 text-gray-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-gray-700 text-sm break-words">
                                  {r.text}
                                </p>
                                <div className="text-xs text-gray-500 mt-1">
                                  Anonymous • Just now
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 sticky top-48">
              {/* Forum Statistics */}
              <div className="">
                <div className="my-5 flex justify-center">
                  <button
                    onClick={() =>
                      userId
                        ? setShowNewPostForm(true)
                        : router.push("/sign-in")
                    }
                    className="px-7 py-3.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm shadow-sm hover:shadow"
                  >
                    <span className="whitespace-nowrap">Start Discussion</span>
                  </button>
                </div>

                <div className=" p-4">
                  {/* Selected tags */}
                  {selectedTags.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500">
                          Selected Topics
                        </h3>
                        <button
                          onClick={clearSelectedTags}
                          className="text-xs text-emerald-600 hover:text-emerald-700"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <div
                            key={`selected-${tag}`}
                            className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 group"
                          >
                            {tag}
                            <button
                              onClick={() => handleTagClick(tag)}
                              className="p-0.5 rounded-full hover:bg-emerald-200 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-medium text-gray-500 mt-3 mb-3">
                  Forum Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl sm:text-2xl font-semibold text-emerald-600">
                      {posts.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Total Discussions
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xl sm:text-2xl font-semibold text-emerald-600">
                      {tags.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Active Topics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShareModal
            onClose={() => setShowShareModal(false)}
            copyToClipboard={copyToClipboard}
            src={selectedPostUrl}
          />
        </div>
      )}

      {/* Hide Scrollbar Styles */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Forum;
