"use client";
import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  ThumbsUp,
  Clock,
  Filter,
  Search,
  User,
  AlertCircle,
} from "lucide-react";

const ConsultQNA = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAskForm, setShowAskForm] = useState(false);
  const [filter, setFilter] = useState("all");

  // Mock professional data
  const professional = {
    name: "Dr. Sarah Williams",
    role: "Clinical Psychologist",
    specialization: "CBT Specialist",
    responsesGiven: 142,
    rating: 4.8,
  };

  // Hardcoded Q&A data
  const fallbackQuestions = [
    {
      id: 1,
      question:
        "How do you approach treatment-resistant depression in teenagers who've shown minimal response to both CBT and medication?",
      askedBy: "Dr. Michael Chen",
      askedByRole: "Psychiatrist",
      date: "2024-02-08",
      category: "Treatment",
      tags: ["Depression", "Teenagers", "Treatment-Resistant"],
      responses: [
        {
          id: 1,
          professional: "Dr. Sarah Williams",
          role: "Clinical Psychologist",
          response:
            "In my practice, I've found success with a multi-modal approach for treatment-resistant depression in teenagers. Here's my strategy:\n\n1. First, I reassess the CBT approach being used and often incorporate elements of DBT, particularly for emotional regulation.\n\n2. I recommend a thorough medical evaluation to rule out any underlying health issues (thyroid, vitamin D deficiency, etc.)\n\n3. Consider family-based therapy alongside individual sessions, as family dynamics often play a crucial role in teenage depression.\n\n4. Introduce behavioral activation more intensively, with very specific and achievable goals.",
          date: "2024-02-08",
          likes: 15,
          isVerified: true,
        },
      ],
      status: "answered",
      urgency: "medium",
    },
    {
      id: 2,
      question:
        "What are your experiences with integrating mindfulness techniques in group therapy sessions for anxiety disorders?",
      askedBy: "Dr. Emma Rodriguez",
      askedByRole: "Psychotherapist",
      date: "2024-02-07",
      category: "Techniques",
      tags: ["Mindfulness", "Group Therapy", "Anxiety"],
      responses: [],
      status: "unanswered",
      urgency: "low",
    },
    {
      id: 3,
      question:
        "Urgent: Seeking immediate guidance on managing acute panic attack in a patient with complex PTSD. Current coping mechanisms not effective.",
      askedBy: "Dr. James Wilson",
      askedByRole: "Clinical Counselor",
      date: "2024-02-08",
      category: "Emergency",
      tags: ["PTSD", "Panic Attacks", "Crisis Management"],
      responses: [
        {
          id: 2,
          professional: "Dr. Sarah Williams",
          role: "Clinical Psychologist",
          response:
            "For immediate intervention in this situation, I recommend:\n\n1. Guide the patient through the 5-4-3-2-1 grounding technique\n2. Use progressive muscle relaxation\n3. If prescribed, ensure proper use of PRN medication\n4. Establish a safe word/phrase for the patient to use when feeling overwhelmed\n\nFor long-term management, consider reviewing and adjusting their crisis plan.",
          date: "2024-02-08",
          likes: 8,
          isVerified: true,
        },
      ],
      status: "answered",
      urgency: "high",
    },
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Simulated API call
        // const response = await fetch('api/consultations');
        // const data = await response.json();
        // setQuestions(data);

        setTimeout(() => {
          setQuestions(fallbackQuestions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions(fallbackQuestions);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-serif text-gray-800">
                Professional Consultation Q&A
              </h1>
              <div className="text-gray-600 mt-1">
                {professional.name} • {professional.role} •{" "}
                {professional.specialization}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {professional.responsesGiven} responses • {professional.rating}{" "}
                rating
              </div>
            </div>
            <button
              onClick={() => setShowAskForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Ask a Question
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            <option value="treatment">Treatment</option>
            <option value="techniques">Techniques</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        {/* Ask Question Form Modal */}
        {showAskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                Ask a Question
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowAskForm(false);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <select className="p-2 border border-gray-200 rounded-lg">
                    <option value="">Category</option>
                    <option value="treatment">Treatment</option>
                    <option value="techniques">Techniques</option>
                    <option value="emergency">Emergency</option>
                  </select>
                  <select className="p-2 border border-gray-200 rounded-lg">
                    <option value="low">Low Urgency</option>
                    <option value="medium">Medium Urgency</option>
                    <option value="high">High Urgency</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Question Title"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <textarea
                  placeholder="Detailed question..."
                  rows={6}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAskForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Post Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Questions List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm">
                {/* Question Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <User className="w-4 h-4" />
                        {question.askedBy} • {question.askedByRole}
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        {new Date(question.date).toLocaleDateString()}
                        {question.urgency === "high" && (
                          <>
                            <span>•</span>
                            <span className="text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> Urgent
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {question.question}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responses */}
                <div className="p-6">
                  {question.responses.length > 0 ? (
                    <div className="space-y-6">
                      {question.responses.map((response) => (
                        <div
                          key={response.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <User className="w-4 h-4" />
                            {response.professional} • {response.role}
                            {response.isVerified && (
                              <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
                                Verified Response
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 whitespace-pre-line">
                            {response.response}
                          </p>
                          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                            <button className="flex items-center gap-1 hover:text-green-600">
                              <ThumbsUp className="w-4 h-4" />
                              {response.likes}
                            </button>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            {new Date(response.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No responses yet. Be the first to respond!
                    </div>
                  )}
                  <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                    Add Response
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultQNA;
