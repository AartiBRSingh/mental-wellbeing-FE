"use client";
import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import axios from "axios";
import { baseURL } from "../baseURL";

const Forum = () => {
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

  const fetchPosts = async (tagList = [], search = "") => {
    try {
      let queryParams = "";

      if (tagList.length > 0) {
        queryParams += `?tags=${tagList.join(",")}`;
      }

      if (search) {
        queryParams += queryParams ? `&search=${search}` : `?search=${search}`;
      }

      const res = await axios.get(`${baseURL}/get-posts${queryParams}`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get(`${baseURL}/tags`);
      setTags(res.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const createPost = async () => {
    try {
      await axios.post(`${baseURL}/add-post`, newPost);
      setNewPost({ title: "", content: "", tags: "" });
      setShowNewPostForm(false);
      fetchPosts(selectedTags);
      fetchTags();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const addComment = async (postId) => {
    try {
      await axios.post(`${baseURL}/post/${postId}/comment`, { text: comment });
      setComment("");
      setShowCommentForm({ ...showCommentForm, [postId]: false });
      fetchPosts(selectedTags);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const addReply = async (postId, commentId) => {
    try {
      await axios.post(`${baseURL}/post/${postId}/comment/${commentId}/reply`, {
        text: reply[commentId],
      });
      setReply({ ...reply, [commentId]: "" });
      fetchPosts(selectedTags);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const toggleLike = async (postId) => {
    await axios.post(`${baseURL}/post/${postId}/like`);
    fetchPosts(selectedTags);
  };

  const handleTagClick = (tag) => {
    // If tag is already selected, remove it, otherwise add it
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Effect to refetch posts when selected tags change
  useEffect(() => {
    fetchPosts(selectedTags, searchQuery);
  }, [selectedTags]);

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  // Clear all selected tags
  const clearSelectedTags = () => {
    setSelectedTags([]);
  };

  // Render the topics section for both mobile and desktop
  const renderTopicsSection = () => {
    return (
      <>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full mr-2 inline-block"></span>
          Trending Topics
        </h2>

        {/* Selected topics badges */}
        {selectedTags.length > 0 && (
          <div className="mb-4">
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

        {/* Topics List */}
        {tags.length === 0 ? (
          <p className="text-gray-500 text-sm">No topics available yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                selectedTags.length === 0
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
              }`}
              onClick={clearSelectedTags}
            >
              All Topics
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Responsive Nav Bar */}
      <nav className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            {/* <h1 className="text-2xl sm:text-3xl font-serif text-emerald-700 font-bold tracking-tight">
              Forum
            </h1> */}
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
              <button
                onClick={() => setShowNewPostForm(true)}
                className="w-2/3 xl:w-auto xl:px-5 py-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium text-sm shadow-sm hover:shadow"
              >
                <span className="whitespace-nowrap">Start Discussion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Popular Topics - Only visible on mobile screens */}
      <div className="lg:hidden px-4 sm:px-6 py-5 bg-white border-b border-gray-200 shadow-sm">
        {renderTopicsSection()}
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {/* New Post Form */}
            {showNewPostForm && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Create New Discussion
                </h3>
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

            {/* Empty State */}
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
                <button
                  onClick={() => setShowNewPostForm(true)}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors duration-200 inline-flex items-center gap-2 font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Start a Discussion
                </button>
              </div>
            )}

            {/* Posts */}
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6 transition-all duration-200 hover:shadow-lg"
              >
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

                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 xl:text-md text-sm">
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag) => (
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

                {/* Action Buttons */}
                <div className="flex xl:flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors duration-200 group"
                      onClick={() => toggleLike(post._id)}
                    >
                      <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">
                        {post.likes || 0} Upvotes
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
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 transition-colors duration-200 group">
                      <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 group">
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>

                {/* Comments Section */}
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

                {/* Comments List */}
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

                        {/* Reply Form */}
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

                        {/* Nested Replies */}
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

          {/* Sidebar - Only visible on desktop */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 sticky top-24">
              {/* Desktop Popular Topics */}
              {renderTopicsSection()}

              {/* Forum Statistics */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
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

              {/* Desktop New Discussion Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowNewPostForm(true)}
                  className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Start New Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forum;
