"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Edit2,
  X,
  Check,
  Lock,
  FileSpreadsheet,
  BookOpen,
  Clock,
  AlertCircle,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { baseURL } from "../baseURL";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState("");
  const searchParams = useSearchParams();

  // Hardcoded consultation data for demonstration
  const consultations = [
    {
      id: 1,
      expertName: "Dr. Samrat Paul",
      date: "2025-01-25T10:00:00",
      status: "Completed",
      type: "Video Call",
      notes: "Follow-up in 2 weeks",
    },
    {
      id: 2,
      expertName: "Dr. Sougata Mondal",
      date: "2025-02-01T15:30:00",
      status: "Scheduled",
      type: "Video Call",
      notes: "Initial consultation",
    },
  ];

  // Hardcoded insights data
  const insights = [
    {
      date: "2025-01-28",
      title: "Weekly Progress Report",
      description:
        "Showing improvement in stress management and work-life balance",
      status: "Positive",
    },
    {
      date: "2025-01-21",
      title: "Case Study Analysis",
      description: "Areas of concern identified in work pressure handling",
      status: "Needs Attention",
    },
  ];

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    city: "",
    state: "",
    password: "",
    emergencyContact: "",
    occupation: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        contactNumber: user.contactNumber || "",
        city: user.city || "",
        state: user.state || "",
        password: "",
        emergencyContact: user.emergencyContact || "",
        occupation: user.occupation || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = searchParams.get("id");
        const response = await axios.get(`${baseURL}/get-users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [searchParams]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess(false);

    try {
      const userId = searchParams.get("id");
      const updateData = Object.fromEntries(
        Object.entries(editForm).filter(([_, value]) => value !== "")
      );

      const response = await axios.put(
        `${baseURL}/edit-users/${userId}`,
        updateData
      );
      setUser(response.data);
      setIsEditing(false);
      setEditSuccess(true);
      setTimeout(() => setEditSuccess(false), 3000);
    } catch (err) {
      setEditError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  const renderEditableField = (name, icon, label, type = "text") => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-transparent rounded-lg">{icon}</div>
        <input
          type={type}
          name={name}
          value={editForm[name]}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black shadow-md"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl justify-between items-start sm:items-center gap-4">
          <div>
            {/* <h1 className="text-3xl font-bold text-gray-900 ">{user?.name}</h1> */}
            <span className="text-gray-900 text-4xl font-bold relative">
              <span className="relative">
                {user?.name}
                <svg
                  className="absolute w-full h-[10px] -bottom-2 left-0"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 -5, 100 5"
                    stroke="orange"
                    strokeWidth="4"
                    fill="transparent"
                  />
                </svg>
              </span>
            </span>

            <div className="flex mt-3">
              <h2 className="text-xl font-semibold text-gray-900 mt-4 ml-3">
                Profile Information
              </h2>
              <div className="p-2 mt-1 flex justify-between items-center ml-2 ">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-black bg-transparent rounded-lg transition-colors hover:shadow-md"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-black bg-transparent rounded-lg transition-colors hover:shadow-md"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100">
              {isEditing ? (
                <form onSubmit={handleEdit} className="space-y-3 mb-4">
                  {renderEditableField(
                    "name",
                    <User className="h-5 w-5 text-black" />,
                    "Full Name"
                  )}
                  {renderEditableField(
                    "email",
                    <Mail className="h-5 w-5 text-black" />,
                    "Email"
                  )}
                  {renderEditableField(
                    "contactNumber",
                    <Phone className="h-5 w-5 text-black" />,
                    "Contact Number"
                  )}
                  {renderEditableField(
                    "city",
                    <MapPin className="h-5 w-5 text-black" />,
                    "City"
                  )}
                  {renderEditableField(
                    "state",
                    <MapPin className="h-5 w-5 text-black" />,
                    "State"
                  )}
                  {renderEditableField(
                    "password",
                    <Lock className="h-5 w-5 text-black" />,
                    "New Password",
                    "password"
                  )}
                  {renderEditableField(
                    "emergencyContact",
                    <Phone className="h-5 w-5 text-black" />,
                    "Emergency Contact"
                  )}
                  {renderEditableField(
                    "occupation",
                    <FileText className="h-5 w-5 text-black" />,
                    "Occupation"
                  )}
                  {renderEditableField(
                    "dateOfBirth",
                    <Calendar className="h-5 w-5 text-black" />,
                    "Date of Birth",
                    "date"
                  )}

                  <button
                    type="submit"
                    className="w-48 ml-[300px] px-4 py-2 shadow-md bg-white text-black rounded-lg hover:bg-green-500 transition-colors hover:text-white"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6"></div>

                  <div className="space-y-6"></div>
                </div>
              )}
            </div>

            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {editSuccess && (
                  <div className="m-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    Profile updated successfully!
                  </div>
                )}

                {editError && (
                  <div className="m-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    {editError}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 ml-2">
            <div className="p-1 bg-transparent rounded-lg">
              <Mail />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
          </div>

          <div className="flex  bg-transparent gap-4 mt-3">
            <div className="flex items-center space-x-2 ml-2">
              <div className="p-1 bg-transparent rounded-lg">
                <Phone className="h-6 w-6 text-black" />
              </div>
              <div className="">
                <p className="text-sm font-medium text-gray-500">
                  Contact Number
                </p>
                <p className="text-lg text-gray-900">{user?.contactNumber}</p>
              </div>
            </div>
            <div className="flex items-center ">
              <div className="p-3 bg-transparent rounded-lg">
                <Calendar className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Member Since
                </p>
                <p className="text-lg text-gray-900">
                  {new Date(user?.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center ">
              <div className="p-3 bg-transparent rounded-lg">
                <MapPin className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-lg text-gray-900">
                  {user?.city}, {user?.state}
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-1 mt-5 mb-6 bg-slate-50 rounded-lg p-1 shadow-md">
            {/* <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                activeTab === "profile"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Profile Details
            </button> */}
            <button
              onClick={() => setActiveTab("consultations")}
              className={`flex-1 p-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "consultations"
                  ? "bg-green-500 text-white"
                  : "text-black hover:bg-blue-200"
              }`}
            >
              My Consultations
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`flex-1 p2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "records"
                  ? "bg-green-500 text-white"
                  : "text-black hover:bg-blue-200"
              }`}
            >
              Records & Insights
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                activeTab === "services"
                  ? "bg-green-500 text-white"
                  : "text-black hover:bg-blue-200"
              }`}
            >
              My Services
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                activeTab === "payments"
                  ? "bg-green-500 text-white"
                  : "text-black hover:bg-blue-200"
              }`}
            >
              Payment History
            </button>
          </div>
          {activeTab === "consultations" && (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    My Consultations
                  </h2>
                  {/* <Link
                  href="/book-consultation"
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Book New</span>
                </Link> */}
                </div>
                <div className="space-y-4">
                  {consultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {consultation.expertName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(consultation.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">
                              {consultation.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {consultation.notes}
                          </p>
                        </div>
                        {/* <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          consultation.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {consultation.status}
                      </span> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Records & Insights
                </h2>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-100 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {insight.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(insight.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            {insight.description}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            insight.status === "Positive"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {insight.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  My Services
                </h2>
                <div className="space-y-4">
                  {user?.caseStudy?.map((study, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Case Study #{index + 1}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(study.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            Type: {study.userDetails.userType}
                          </p>
                        </div>
                        {/* <Link
                        href={`/case-study/${study._id}`}
                        className="flex items-center text-black hover:text-gray-600"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link> */}
                      </div>
                    </div>
                  ))}
                </div>
                {(!user?.caseStudy || user.caseStudy.length === 0) && (
                  <div className="text-center p-6">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Case Studies Yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Take your first case study to get started
                    </p>
                    <Link
                      href="/self"
                      className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Start Case Study
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {user?.paymentDetails?.map((payment, index) => (
                  <div
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.paymentAmount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {payment.planType} Plan
                          </p>
                          <p className="text-sm text-gray-500">
                            Transaction ID: {payment.paymentTransactionId}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(payment.paymentDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            payment.hasExpired
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {payment.hasExpired ? "Expired" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserProfile />
    </Suspense>
  );
};

export default page;
