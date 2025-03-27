"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../baseURL";
import toast, { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId || "");
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [expertId]);

  const fetchJournals = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/get-expertJournal?expertId=${expertId}`
      );
      setJournals(response.data);
    } catch (error) {
      console.error("Error fetching journals:", error);
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

  return (
    <div className="max-w-3xl mx-auto p-4 bg-green-50">
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Expert Journals</h2>
        {userId === expertId && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            Add New Journal
          </button>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              {editingId ? "Edit Journal" : "Create New Journal"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
                required
              ></textarea>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {journals.map((journal) => (
          <div
            key={journal._id}
            className="bg-white border border-green-200 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-green-800">
              {journal.title}
            </h3>
            <p className="text-sm text-green-600 mb-2">{journal.category}</p>
            <p className="text-gray-700 mb-2">{journal.content}</p>
            <p className="text-sm text-green-500 mb-2">
              Tags: {journal.tags.join(", ")}
            </p>
            {userId === expertId && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(journal)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(journal._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalsExpert;
