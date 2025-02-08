"use client";
import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Heart,
  Share2,
  BookmarkPlus,
  Search,
  X,
  Send,
} from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f8f5f0] rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#5C4033]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#8B7355] hover:text-[#5C4033]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPostModal, setNewPostModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [replyContent, setReplyContent] = useState("");

  // Fallback data with comments array added
  const fallbackPosts = [
    {
      id: 1,
      author: "Sarah Mitchell",
      avatar: "/api/placeholder/32/32",
      title: "The Art of Sustainable Gardening",
      content:
        "I've been experimenting with companion planting and natural pest control methods. Would love to hear others' experiences!",
      likes: 124,
      comments: [
        {
          id: 1,
          author: "John Doe",
          avatar: "/api/placeholder/32/32",
          content:
            "Great tips! I've had success with marigolds as natural pest control.",
          likes: 12,
          timeAgo: "1h ago",
        },
      ],
      timeAgo: "2h ago",
      tags: ["gardening", "sustainability", "nature"],
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      author: "James Wilson",
      avatar: "/api/placeholder/32/32",
      title: "Traditional Pottery Techniques",
      content:
        "Recently started learning about ancient pottery methods. The connection to earth and tradition is fascinating.",
      likes: 89,
      comments: [],
      timeAgo: "4h ago",
      tags: ["crafts", "pottery", "traditional"],
      isLiked: false,
      isBookmarked: false,
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = () => {
    const newPost = {
      id: posts.length + 1,
      author: "Current User",
      avatar: "/api/placeholder/32/32",
      title: newPostTitle,
      content: newPostContent,
      likes: 0,
      comments: [],
      timeAgo: "Just now",
      tags: newPostTags.split(",").map((tag) => tag.trim()),
      isLiked: false,
      isBookmarked: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTags("");
    setNewPostModal(false);
  };

  const handleReply = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              author: "Current User",
              avatar: "/api/placeholder/32/32",
              content: replyContent,
              likes: 0,
              timeAgo: "Just now",
            },
          ],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setReplyContent("");
  };

  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const toggleBookmark = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          };
        }
        return post;
      })
    );
  };

  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-[#f8f5f0] border border-[#8B7355]/20 rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Navigation */}
      <nav className="bg-[#8B7355] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* <h1 className="text-[#f8f5f0] text-2xl font-semibold">
              EarthlyDiscourse
            </h1> */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="px-4 py-2 rounded-full bg-[#f8f5f0] text-[#5C4033] w-64 focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
                <Search className="absolute right-3 top-2.5 text-[#8B7355] h-5 w-5" />
              </div>
              <button
                onClick={() => setNewPostModal(true)}
                className="px-4 py-2 bg-[#4A6741] text-[#f8f5f0] rounded-lg hover:bg-[#3D5635] transition-colors"
              >
                New Post
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[#5C4033] mb-4">
                Communities
              </h2>
              <ul className="space-y-3">
                {[
                  "Sustainable Living",
                  "Traditional Crafts",
                  "Nature Photography",
                  "Organic Cooking",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#8B7355] hover:text-[#5C4033] cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="col-span-6 space-y-6">
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            {posts.map((post) => (
              <Card key={post.id} className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-[#5C4033]">{post.author}</p>
                    <p className="text-sm text-[#8B7355]">{post.timeAgo}</p>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-[#5C4033] mb-2">
                  {post.title}
                </h2>
                <p className="text-[#5C4033] mb-4">{post.content}</p>
                <div className="flex space-x-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#4A6741]/10 text-[#4A6741] rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-6 text-[#8B7355]">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center space-x-2 hover:text-[#5C4033]"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        post.isLiked ? "fill-current" : ""
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setCommentsModal(true);
                    }}
                    className="flex items-center space-x-2 hover:text-[#5C4033]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-[#5C4033]">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="flex items-center space-x-2 hover:text-[#5C4033]"
                  >
                    <BookmarkPlus
                      className={`h-5 w-5 ${
                        post.isBookmarked ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[#5C4033] mb-4">
                Trending Topics
              </h2>
              <ul className="space-y-4">
                {[
                  "#sustainableliving",
                  "#traditionalcrafts",
                  "#naturephotography",
                ].map((topic) => (
                  <li
                    key={topic}
                    className="text-[#8B7355] hover:text-[#5C4033] cursor-pointer"
                  >
                    <p className="font-medium">{topic}</p>
                    <p className="text-sm">
                      {Math.floor(Math.random() * 1000)} discussions
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      <Modal
        isOpen={newPostModal}
        onClose={() => setNewPostModal(false)}
        title="Create New Post"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full px-3 py-2 border border-[#8B7355]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          />
          <textarea
            placeholder="Share your thoughts..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-[#8B7355]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={newPostTags}
            onChange={(e) => setNewPostTags(e.target.value)}
            className="w-full px-3 py-2 border border-[#8B7355]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
          />
          <button
            onClick={handleNewPost}
            className="w-full px-4 py-2 bg-[#4A6741] text-[#f8f5f0] rounded-lg hover:bg-[#3D5635] transition-colors"
          >
            Post
          </button>
        </div>
      </Modal>

      {/* Comments Modal */}
      <Modal
        isOpen={commentsModal}
        onClose={() => {
          setCommentsModal(false);
          setSelectedPost(null);
        }}
        title="Comments"
      >
        {selectedPost && (
          <div className="space-y-4">
            {selectedPost.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-[#8B7355]/20 pb-4"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-[#5C4033]">
                      {comment.author}
                    </p>
                    <p className="text-sm text-[#8B7355]">{comment.timeAgo}</p>
                  </div>
                </div>
                <p className="text-[#5C4033]">{comment.content}</p>
              </div>
            ))}
            <div className="flex space-x-2">
              <textarea
                placeholder="Write a comment..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="flex-1 px-3 py-2 border border-[#8B7355]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] resize-none"
                rows={3}
              />
              <button
                onClick={() => handleReply(selectedPost.id)}
                className="px-4 py-2 bg-[#4A6741] text-[#f8f5f0] rounded-lg hover:bg-[#3D5635] transition-colors self-end"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommunityPage;
