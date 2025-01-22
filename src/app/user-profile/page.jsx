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

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    city: "",
    state: "",
    password: "",
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
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <input
          type={type}
          name={name}
          value={editForm[name]}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );

  console.log(user.caseStudy);

  return (
    <div className=" py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 mt-1">{user?.email}</p>
          </div>
        </div>

        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
              activeTab === "profile"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`flex-1 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
              activeTab === "payments"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Payment History
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-black hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              )}
            </div>

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

            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleEdit} className="space-y-6">
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

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-black transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Phone className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Contact Number
                        </p>
                        <p className="text-lg text-gray-900">
                          {user?.contactNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <MapPin className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Location
                        </p>
                        <p className="text-lg text-gray-900">
                          {user?.city}, {user?.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Calendar className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Member Since
                        </p>
                        <p className="text-lg text-gray-900">
                          {new Date(user?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {user?.caseStudy?.length <= 0 && !isEditing && (
              <div className="mt-4 border-t border-gray-100 bg-gray-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Let us understand you better!
                      </h3>
                      <p className="text-sm text-gray-500">
                        Take your self-understanding case study
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/self"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black transition-colors text-sm font-medium cursor-pointer"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {user?.paymentDetails?.map((payment) => (
                <div
                  key={payment._id}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
