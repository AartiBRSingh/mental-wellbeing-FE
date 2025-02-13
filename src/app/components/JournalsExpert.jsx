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

  // Mock professional data
  const professional = {
    name: "Dr. Sarah Williams",
    role: "Clinical Psychologist",
    specialization: "Cognitive Behavioral Therapy",
    license: "PSY20134",
    yearsOfPractice: 8,
  };

  // Hardcoded personal journal entries
  const fallbackJournals = [
    {
      id: 1,
      date: "2024-02-08",
      patientCode: "PT-089",
      category: "session-notes",
      title: "CBT Session Progress - Anxiety Management",
      content:
        "Today's session with PT-089 showed marked improvement in anxiety management techniques. The patient demonstrated better understanding of cognitive restructuring methods. Key observations:\n\n- Successfully identified 3 cognitive distortions\n- Completed breathing exercises without guidance\n- Reported reduced anxiety in social situations",
      tags: ["CBT", "Anxiety", "Progress"],
      followUp: "Schedule weekly sessions for next month",
      privateNotes:
        "Consider introducing group therapy as supplementary treatment",
      mood: "positive",
      lastEdited: "2024-02-08T15:30:00",
    },
    {
      id: 2,
      date: "2024-02-07",
      patientCode: "PT-076",
      category: "case-reflection",
      title: "Treatment Resistance Analysis - Depression Case",
      content:
        "Reflecting on PT-076's treatment progress. Current medication appears to have plateaued in effectiveness. Notable patterns:\n\n- Sleep patterns remain irregular\n- Increased engagement in daily activities\n- Mixed response to current medication dosage",
      tags: ["Depression", "Medication", "Treatment-Resistant"],
      followUp: "Consult with psychiatrist about medication adjustment",
      privateNotes: "Review latest research on treatment-resistant depression",
      mood: "neutral",
      lastEdited: "2024-02-07T17:45:00",
    },
    {
      id: 3,
      date: "2024-02-06",
      patientCode: "PT-092",
      category: "research-notes",
      title: "Mindfulness Integration in Teen Therapy",
      content:
        "Documenting observations from implementing mindfulness techniques with teenage patients. Key findings:\n\n- Higher engagement with app-based mindfulness exercises\n- Positive response to shorter, more frequent sessions\n- Correlation between mindfulness practice and reduced anxiety reports",
      tags: ["Mindfulness", "Teenagers", "Research"],
      followUp: "Develop structured mindfulness program for teens",
      privateNotes: "Potential topic for upcoming conference presentation",
      mood: "positive",
      lastEdited: "2024-02-06T14:15:00",
    },
  ];

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        // Simulated API call
        // const response = await fetch('api/professional/journals');
        // const data = await response.json();
        // setJournals(data);

        setTimeout(() => {
          setJournals(fallbackJournals);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching journals:", error);
        setJournals(fallbackJournals);
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setShowPostForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-serif text-gray-800">
                {professional.name}&apos;s Professional Journal
              </h1>
              <div className="text-gray-600 mt-1">
                {professional.role} • {professional.specialization}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                License: {professional.license} • {professional.yearsOfPractice}{" "}
                Years of Practice
              </div>
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
                <div className="grid grid-cols-1 gap-4">
                  <select className="p-2 border border-gray-200 rounded-lg">
                    <option value="">Entry Category</option>
                    <option value="session-notes">Session Notes</option>
                    <option value="case-reflection">Case Reflection</option>
                    <option value="research-notes">Research Notes</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <textarea
                  placeholder="Content"
                  rows={6}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                {/* <textarea
                  placeholder="Private Notes"
                  rows={3}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                /> */}
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
        ) : (
          <div className="space-y-6">
            {journals.map((journal) => (
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
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none mb-4">
                  <p className="text-gray-600 whitespace-pre-line">
                    {journal.content}
                  </p>
                </div>
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
                {/* <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Follow-up Notes
                  </h3>
                  <p className="text-gray-600">{journal.followUp}</p>
                </div> */}
                {/* <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Private Notes
                  </h3>
                  <p className="text-gray-600">{journal.privateNotes}</p>
                </div> */}
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
