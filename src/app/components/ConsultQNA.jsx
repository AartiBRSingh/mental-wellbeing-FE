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
  const [searchTerm, setSearchTerm] = useState("");
  const [professional, setProfessional] = useState(null);
  const [showResponseForm, setShowResponseForm] = useState(null);
  const [responseText, setResponseText] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    details: "",
    tags: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch this data from your API
        // const response = await fetch('/api/questions');
        // const data = await response.json();
        // setQuestions(data.questions);
        // setProfessional(data.professional);

        // Since we're removing hardcoded data, initialize with empty arrays
        setQuestions([]);
        setProfessional({
          name: "Current User",
          role: "Healthcare Professional",
          specialization: "Your Specialization",
          responsesGiven: 0,
          rating: 0,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setQuestions([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmitQuestion = (e) => {
    e.preventDefault();

    // Create new question object
    const newQuestion = {
      id: Date.now(), // Use timestamp as unique ID
      question: formData.title,
      details: formData.details,
      askedBy: "Current User", // In a real app, this would be the logged-in user
      askedByRole: "Healthcare Professional",
      date: new Date().toISOString().split("T")[0],
      category: formData.category,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      responses: [],
      status: "unanswered",
      urgency: formData.category === "emergency" ? "high" : "medium",
    };

    // Add new question to state
    setQuestions([newQuestion, ...questions]);

    // Reset form and close modal
    setFormData({
      category: "",
      title: "",
      details: "",
      tags: "",
    });
    setShowAskForm(false);
  };

  // Handle response submission
  const handleSubmitResponse = (questionId) => {
    if (!responseText.trim()) return;

    // Find the question to update
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        // Create new response
        const newResponse = {
          id: Date.now(),
          professional: professional.name,
          role: professional.role,
          response: responseText,
          date: new Date().toISOString().split("T")[0],
          likes: 0,
          isVerified: true,
        };

        // Update question with new response and change status
        return {
          ...question,
          responses: [...question.responses, newResponse],
          status: "answered",
        };
      }
      return question;
    });

    // Update state
    setQuestions(updatedQuestions);
    setResponseText("");
    setShowResponseForm(null);

    // Update professional stats in a real app
    if (professional) {
      setProfessional({
        ...professional,
        responsesGiven: professional.responsesGiven + 1,
      });
    }
  };

  // Filter and search questions
  const filteredQuestions = questions.filter((question) => {
    // Apply category filter
    const categoryMatch =
      filter === "all" ||
      question.category.toLowerCase() === filter.toLowerCase();

    // Apply search term if present
    const searchMatch =
      !searchTerm ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (question.details &&
        question.details.toLowerCase().includes(searchTerm.toLowerCase())) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return categoryMatch && searchMatch;
  });

  // Categories for dropdown
  const categories = [
    { value: "treatment", label: "Treatment" },
    { value: "techniques", label: "Techniques" },
    { value: "emergency", label: "Emergency" },
    { value: "diagnosis", label: "Diagnosis" },
    { value: "research", label: "Research" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Professional Header */}
        {professional && (
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
                  {professional.responsesGiven} responses
                  {professional.rating > 0 &&
                    ` • ${professional.rating} rating`}
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
        )}

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
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

        {/* Ask Question Form Modal */}
        {showAskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-serif text-gray-800 mb-4">
                Ask a Question
              </h2>
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
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
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Question Title"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleFormChange}
                  placeholder="Detailed question..."
                  rows={6}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
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
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg shadow-sm"
                >
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
                        {question.details && (
                          <p className="text-gray-600 mt-2">
                            {question.details}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {question.tags &&
                        question.tags.map((tag, index) => (
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
                    {question.responses && question.responses.length > 0 ? (
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

                    {/* Response Form */}
                    {showResponseForm === question.id ? (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Your Response
                        </h3>
                        <textarea
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg mb-2"
                          rows={4}
                          placeholder="Write your professional response..."
                        ></textarea>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setShowResponseForm(null);
                              setResponseText("");
                            }}
                            className="px-3 py-1 text-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmitResponse(question.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg"
                            disabled={!responseText.trim()}
                          >
                            Submit Response
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowResponseForm(question.id)}
                        className="mt-4 text-green-600 hover:text-green-700 font-medium"
                      >
                        Add Response
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  {searchTerm
                    ? "No questions found matching your search criteria."
                    : filter !== "all"
                    ? "No questions found for this category."
                    : "No questions yet. Be the first to ask a question!"}
                </p>
                <button
                  onClick={() => setShowAskForm(true)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ask a Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultQNA;
