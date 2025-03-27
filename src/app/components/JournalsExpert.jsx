"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../baseURL";
import toast, { Toaster } from "react-hot-toast";
import { Search, Plus, Edit2, Trash2, Filter, Clock, User } from "lucide-react";

const JournalsExpert = ({ expertId }) => {
  const [journals, setJournals] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    tags: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "treatment", label: "Treatment" },
    { value: "techniques", label: "Techniques" },
    { value: "emergency", label: "Emergency" },
    { value: "diagnosis", label: "Diagnosis" },
    { value: "research", label: "Research" },
  ];

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId || "");
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [expertId]);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/get-expertJournal?expertId=${expertId}`
      );
      setJournals(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching journals:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Not logged in");
      return;
    }

    if (userId !== expertId) {
      toast.error("Unauthorized action");
      return;
    }

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        expert: expertId,
      };

      if (editingId) {
        await axios.put(`${baseURL}/edit-expertJournal/${editingId}`, data);
      } else {
        await axios.post(`${baseURL}/create-expertJournal`, data);
      }

      setFormData({ category: "", title: "", content: "", tags: "" });
      setEditingId(null);
      setIsModalOpen(false);
      fetchJournals();
    } catch (error) {
      console.error("Error saving journal:", error);
    }
  };

  const handleEdit = (journal) => {
    setFormData({
      category: journal.category,
      title: journal.title,
      content: journal.content,
      tags: journal.tags.join(", "),
    });
    setEditingId(journal._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!userId) {
      toast.error("Not logged in");
      return;
    }

    if (userId !== expertId) {
      toast.error("Unauthorized action");
      return;
    }

    try {
      await axios.delete(`${baseURL}/delete-expertJournal/${id}`);
      fetchJournals();
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };

  const filteredJournals = journals.filter((journal) => {
    const categoryMatch =
      filter === "all" ||
      journal.category.toLowerCase() === filter.toLowerCase();
    const searchMatch =
      !searchTerm ||
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-serif text-gray-800">
                Professional Journals
              </h1>
              <div className="text-gray-600 mt-1">
                Experts Personal Knowledge Repository
              </div>
            </div>
            {userId === expertId && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="inline-block mr-2 -mt-1" size={20} />
                Add New Journal
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJournals.length > 0 ? (
              filteredJournals.map((journal) => (
                <div
                  key={journal._id}
                  className="bg-white rounded-lg shadow-sm"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <User className="w-4 h-4" />
                          Expert
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          {new Date(journal.createdAt).toLocaleDateString()}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {journal.title}
                        </h2>
                        <p className="text-gray-600 mt-2">{journal.content}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {journal.tags &&
                        journal.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  {userId === expertId && (
                    <div className="p-4 flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(journal)}
                        className="text-yellow-600 hover:text-yellow-700 flex items-center gap-1"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(journal._id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  {searchTerm
                    ? "No journals found matching your search criteria."
                    : filter !== "all"
                    ? "No journals found for this category."
                    : "No journals yet. Start by adding a new journal!"}
                </p>
                {userId === expertId && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add New Journal
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                {editingId ? "Edit Journal" : "Add New Journal"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="p-2 border border-gray-200 rounded-lg"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Journal Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
                <textarea
                  placeholder="Journal Content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {editingId ? "Update Journal" : "Create Journal"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
};

export default JournalsExpert;
