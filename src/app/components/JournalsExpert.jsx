"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Tag,
  Filter,
  Plus,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";

const JournalsExpert = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showPostForm, setShowPostForm] = useState(false);
  const [professional, setProfessional] = useState({});

  // Form state
  const [newJournal, setNewJournal] = useState({
    title: "",
    content: "",
    category: "",
    patientCode: "",
    tags: "",
    followUp: "",
    privateNotes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch professional data - replace with actual API calls
        // const profResponse = await fetch('/api/professional');
        // const profData = await profResponse.json();
        // setProfessional(profData);

        // Fetch journal entries - replace with actual API calls
        // const journalResponse = await fetch('/api/journals');
        // const journalData = await journalResponse.json();
        // setJournals(journalData);

        // Simulating API delay
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJournal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    // Create new journal entry
    const newEntry = {
      id: Date.now(), // temporary ID until backend generates one
      date: new Date().toISOString().split("T")[0],
      patientCode: newJournal.patientCode,
      category: newJournal.category,
      title: newJournal.title,
      content: newJournal.content,
      tags: newJournal.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      followUp: newJournal.followUp,
      privateNotes: newJournal.privateNotes,
      mood: "neutral", // default
      lastEdited: new Date().toISOString(),
    };

    // Update state with new journal
    setJournals((prevJournals) => [newEntry, ...prevJournals]);

    // Reset form
    setNewJournal({
      title: "",
      content: "",
      category: "",
      patientCode: "",
      tags: "",
      followUp: "",
      privateNotes: "",
    });

    // Close form
    setShowPostForm(false);

    // In a real app, you would also make an API call to save the entry
    // Example: await fetch('/api/journals', { method: 'POST', body: JSON.stringify(newEntry) })
  };

  const handleDeleteJournal = (id) => {
    setJournals((prevJournals) =>
      prevJournals.filter((journal) => journal.id !== id)
    );
    // In a real app: await fetch(`/api/journals/${id}`, { method: 'DELETE' })
  };

  const filteredJournals = journals.filter((journal) => {
    if (filter === "all") return true;
    return journal.category === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-serif text-gray-800">
                {professional.name
                  ? `${professional.name}'s Professional Journal`
                  : "Professional Journal"}
              </h1>
              {professional.role && (
                <div className="text-gray-600 mt-1">
                  {professional.role} • {professional.specialization}
                </div>
              )}
              {professional.license && (
                <div className="text-gray-500 text-sm mt-1">
                  License: {professional.license} •{" "}
                  {professional.yearsOfPractice} Years of Practice
                </div>
              )}
            </div>
            <button
              onClick={() => setShowPostForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Entry
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Entries</option>
            <option value="session-notes">Session Notes</option>
            <option value="case-reflection">Case Reflections</option>
            <option value="research-notes">Research Notes</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Journal Entry Form Modal */}
        {showPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                New Journal Entry
              </h2>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="category"
                    value={newJournal.category}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-200 rounded-lg"
                    required
                  >
                    <option value="">Entry Category</option>
                    <option value="session-notes">Session Notes</option>
                    <option value="case-reflection">Case Reflection</option>
                    <option value="research-notes">Research Notes</option>
                  </select>
                  <input
                    type="text"
                    name="patientCode"
                    value={newJournal.patientCode}
                    onChange={handleInputChange}
                    placeholder="Patient Code (e.g., PT-123)"
                    className="p-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="title"
                  value={newJournal.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
                <textarea
                  name="content"
                  value={newJournal.content}
                  onChange={handleInputChange}
                  placeholder="Content"
                  rows={6}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="tags"
                  value={newJournal.tags}
                  onChange={handleInputChange}
                  placeholder="Tags (comma separated)"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <textarea
                  name="followUp"
                  value={newJournal.followUp}
                  onChange={handleInputChange}
                  placeholder="Follow-up Notes"
                  rows={3}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <textarea
                  name="privateNotes"
                  value={newJournal.privateNotes}
                  onChange={handleInputChange}
                  placeholder="Private Notes"
                  rows={3}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Journal Entries */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : journals.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No journal entries yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first entry to get started.
            </p>
            <button
              onClick={() => setShowPostForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Entry
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJournals.map((journal) => (
              <div
                key={journal.id}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(journal.date).toLocaleDateString()}
                      <span>•</span>
                      <span className="font-medium">{journal.patientCode}</span>
                      <span>•</span>
                      <span className="capitalize">
                        {journal.category.replace("-", " ")}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {journal.title}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Edit journal"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => handleDeleteJournal(journal.id)}
                      aria-label="Delete journal"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none mb-4">
                  <p className="text-gray-600 whitespace-pre-line">
                    {journal.content}
                  </p>
                </div>
                {journal.tags && journal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {journal.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {journal.followUp && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Follow-up Notes
                    </h3>
                    <p className="text-gray-600">{journal.followUp}</p>
                  </div>
                )}
                {journal.privateNotes && (
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Private Notes
                    </h3>
                    <p className="text-gray-600">{journal.privateNotes}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                  <Clock className="w-4 h-4" />
                  Last edited: {new Date(journal.lastEdited).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalsExpert;
