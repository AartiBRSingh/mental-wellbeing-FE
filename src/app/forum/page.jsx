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
  TrendingUp,
  Users,
} from "lucide-react";
import CustomCursor from "../components/CustomCursor";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
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
      className={`bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-lg text-green-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navigation */}
      <nav className="bg-blue-500 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="relative group flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search discussions..."
                className="px-5 py-2.5 rounded-full bg-white/90 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300 pl-12"
              />
              <Search className="absolute left-4 top-3 text-gray-400 h-5 w-5" />
            </div>
            <button
              onClick={() => setNewPostModal(true)}
              className="ml-6 px-6 py-2.5 bg-yellow-400 text-gray-800 rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-md font-medium"
            >
              New Post
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="h-6 w-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-800">Communities</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Sustainable Living",
                  "Traditional Crafts",
                  "Nature Photography",
                  "Organic Cooking",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-gray-600 hover:text-green-500 cursor-pointer transition-colors duration-300 hover:bg-green-50 p-2 rounded-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="col-span-6 space-y-8">
            {error && (
              <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
                Error: {error}
              </div>
            )}
            {posts.map((post) => (
              <Card
                key={post.id}
                className="p-6 hover:transform hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="rounded-full ring-2 ring-green-500/20"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.timeAgo}</p>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-green-100 text-green-600 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-8 text-gray-500">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center space-x-2 hover:text-green-500 transition-colors group"
                  >
                    <Heart
                      className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                        post.isLiked ? "fill-current text-red-500" : ""
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setCommentsModal(true);
                    }}
                    className="flex items-center space-x-2 hover:text-green-500 transition-colors group"
                  >
                    <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-500 transition-colors group">
                    <Share2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="flex items-center space-x-2 hover:text-green-500 transition-colors group"
                  >
                    <BookmarkPlus
                      className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                        post.isBookmarked ? "fill-current text-green-500" : ""
                      }`}
                    />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  Trending Topics
                </h2>
              </div>
              <ul className="space-y-6">
                {[
                  "#sustainableliving",
                  "#traditionalcrafts",
                  "#naturephotography",
                ].map((topic) => (
                  <li key={topic} className="group cursor-pointer">
                    <p className="font-medium text-green-600 group-hover:text-green-700 transition-colors">
                      {topic}
                    </p>
                    <p className="text-sm text-gray-500">
                      {Math.floor(Math.random() * 1000)} discussions
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Modern New Post Modal */}
      <Modal
        isOpen={newPostModal}
        onClose={() => setNewPostModal(false)}
        title="Create New Post"
      >
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <textarea
            placeholder="Share your thoughts..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={newPostTags}
            onChange={(e) => setNewPostTags(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <button
            onClick={handleNewPost}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-400 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md font-medium"
          >
            Post
          </button>
        </div>
      </Modal>

      {/* Modern Comments Modal */}

      <Modal
        isOpen={commentsModal}
        onClose={() => {
          setCommentsModal(false);
          setSelectedPost(null);
        }}
        title="Comments"
      >
        {selectedPost && (
          <div className="space-y-6">
            {selectedPost.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full ring-2 ring-green-500/20"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {comment.author}
                    </p>
                    <p className="text-sm text-gray-500">{comment.timeAgo}</p>
                  </div>
                </div>
                <p className="text-gray-600 pl-11">{comment.content}</p>
              </div>
            ))}
            <div className="flex space-x-3">
              <textarea
                placeholder="Write a comment..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
                rows={3}
              />
              <button
                onClick={() => handleReply(selectedPost.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-400 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md self-end"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CommunityPage;
