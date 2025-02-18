"use client";
import React, { useState, useEffect } from "react";
import { User, ThumbsUp, MessageCircle, Share2, Bookmark } from "lucide-react";
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
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState({});

  const fetchPosts = async (tags = "", search = "") => {
    try {
      const res = await axios.get(
        `${baseURL}/get-posts${tags ? `?tags=${tags}` : ""}${
          search ? `?search=${search}` : ""
        }`
      );
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
      fetchPosts();
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
      fetchPosts();
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
      fetchPosts();
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const toggleLike = async (postId) => {
    await axios.post(`${baseURL}/post/${postId}/like`);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <nav className="bg-white border-b border-[#E2DED9] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-serif text-[#2E7D32] font-bold">
            Quorum
          </h1>
          <div className="flex items-center space-x-6">
            <input
              className="w-64 px-4 py-2 rounded-full bg-[#F5F5F0] border border-[#E2DED9] focus:outline-none focus:border-[#2E7D32] placeholder-[#8B8178]"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchPosts(selectedTag, e.target.value);
              }}
            />
            <button
              onClick={() => setShowNewPostForm(true)}
              className="px-4 py-2 bg-[#2E7D32] text-white rounded-full hover:bg-[#1B5E20] transition-colors"
            >
              Start a Discussion
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            {showNewPostForm && (
              <div className="bg-white rounded-lg shadow-sm border border-[#E2DED9] p-6 mb-6">
                <input
                  className="w-full px-4 py-2 text-lg font-medium border-b border-[#E2DED9] focus:outline-none focus:border-[#2E7D32] placeholder-[#8B8178]"
                  placeholder="What do you want to ask or share?"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full px-4 py-3 mt-4 h-32 bg-[#F5F5F0] rounded-lg border border-[#E2DED9] focus:outline-none focus:border-[#2E7D32] placeholder-[#8B8178]"
                  placeholder="Provide more details..."
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                />
                <input
                  className="w-full px-4 py-2 mt-4 bg-[#F5F5F0] rounded-lg border border-[#E2DED9] focus:outline-none focus:border-[#2E7D32] placeholder-[#8B8178]"
                  placeholder="Add topics (comma separated)"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                />
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    onClick={() => setShowNewPostForm(false)}
                    className="px-4 py-2 text-[#8B8178] hover:text-[#2E7D32]"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-[#2E7D32] text-white rounded-full hover:bg-[#1B5E20] transition-colors"
                    onClick={createPost}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}

            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-sm border border-[#E2DED9] p-6 mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2D2D2D]">
                      Anonymous User
                    </h3>
                    <p className="text-sm text-[#8B8178]">
                      Posted in {post.tags?.join(", ")}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-medium text-[#2D2D2D] mb-3">
                  {post.title}
                </h2>
                <p className="text-[#4A4A4A] mb-4">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E2DED9]">
                  <div className="flex items-center space-x-6">
                    <button
                      className="flex items-center space-x-2 text-[#8B8178] hover:text-[#2E7D32]"
                      onClick={() => toggleLike(post._id)}
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>Upvote</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 text-[#8B8178] hover:text-[#2E7D32]"
                      onClick={() =>
                        setShowCommentForm({
                          ...showCommentForm,
                          [post._id]: !showCommentForm[post._id],
                        })
                      }
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 text-[#8B8178] hover:text-[#2E7D32]">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="text-[#8B8178] hover:text-[#2E7D32]">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                {showCommentForm[post._id] && (
                  <div className="mt-4 pt-4 border-t border-[#E2DED9]">
                    <input
                      className="w-full px-4 py-2 bg-[#F5F5F0] rounded-lg border border-[#E2DED9] focus:outline-none focus:border-[#2E7D32] placeholder-[#8B8178]"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-[#2E7D32] text-white rounded-full hover:bg-[#1B5E20] transition-colors"
                      onClick={() => addComment(post._id)}
                    >
                      Add Comment
                    </button>
                  </div>
                )}

                {post.comments?.map((c) => (
                  <div
                    key={c._id}
                    className="mt-4 pl-4 border-l-2 border-[#E2DED9]"
                  >
                    <p className="text-[#4A4A4A]">{c.text}</p>
                    <div className="mt-2">
                      <input
                        className="w-full px-4 py-2 bg-[#F5F5F0] rounded-lg border border-[#E2DED9] focus:outline-none focus:border-[#2E7D32] placeholder-[#8B8178]"
                        placeholder="Reply to this comment..."
                        value={reply[c._id] || ""}
                        onChange={(e) =>
                          setReply({ ...reply, [c._id]: e.target.value })
                        }
                      />
                      <button
                        className="mt-2 px-4 py-1 text-sm bg-[#2E7D32] text-white rounded-full hover:bg-[#1B5E20] transition-colors"
                        onClick={() => addReply(post._id, c._id)}
                      >
                        Reply
                      </button>
                    </div>
                    {c.replies?.map((r) => (
                      <div
                        key={r._id}
                        className="ml-4 mt-2 pl-4 border-l border-[#E2DED9]"
                      >
                        <p className="text-[#666666]">{r.text}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </article>
            ))}
          </div>

          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-[#E2DED9] p-6">
              <h2 className="text-lg font-medium text-[#2D2D2D] mb-4">
                Popular Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag
                        ? "bg-[#2E7D32] text-white"
                        : "bg-[#F5F5F0] text-[#8B8178] hover:bg-[#E8F5E9] hover:text-[#2E7D32]"
                    }`}
                    onClick={() => {
                      setSelectedTag(tag);
                      fetchPosts(tag, searchQuery);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forum;
