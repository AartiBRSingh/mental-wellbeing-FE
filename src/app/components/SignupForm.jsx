import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  Users,
  Briefcase,
  Loader2,
  Check,
  AlertCircle,
  ChevronDown,
  Sparkles,
  School,
  Building,
} from "lucide-react";
import CustomCursor from "./CustomCursor";
import { baseURL } from "../baseURL";
import axios from "axios";

const OrganizationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    userCount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputFocus, setInputFocus] = useState({
    organizationName: false,
    organizationType: false,
    userCount: false,
  });

  const organizationTypes = [
    { id: "educational", label: "Educational", icon: School },
    { id: "corporate", label: "Corporate", icon: Building },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.organizationType) {
      setError("Please select an organization type");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${baseURL}/organization`, formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1000);
    } catch (err) {
      setError("Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, organizationType: type.id });
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <CustomCursor />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-24 w-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Enroll your organization
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Organization Name
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    inputFocus.organizationName
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Enter organization name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  onFocus={() =>
                    setInputFocus({ ...inputFocus, organizationName: true })
                  }
                  onBlur={() =>
                    setInputFocus({ ...inputFocus, organizationName: false })
                  }
                  required
                  className="w-full pl-12 pr-4 py-3 border rounded-xl transition-all duration-200 outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           hover:border-gray-400 bg-white"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Organization Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl text-left transition-all duration-200
                           hover:border-gray-400 bg-white flex items-center justify-between
                           ${
                             isDropdownOpen
                               ? "ring-2 ring-blue-500 border-transparent"
                               : ""
                           }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`transition-colors duration-200 ${
                        formData.organizationType
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span
                      className={
                        formData.organizationType
                          ? "text-gray-900"
                          : "text-gray-500"
                      }
                    >
                      {formData.organizationType
                        ? organizationTypes.find(
                            (t) => t.id === formData.organizationType
                          )?.label
                        : "Select organization type"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200
                                      ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border py-1 z-10">
                    {organizationTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleTypeSelect(type)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2
                                 transition-colors duration-200"
                      >
                        <type.icon className="h-5 w-5 text-gray-400" />
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                User Count
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    inputFocus.userCount ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <Users className="h-5 w-5" />
                </div>
                <input
                  type="number"
                  name="userCount"
                  placeholder="Enter number of users"
                  value={formData.userCount}
                  onChange={handleChange}
                  onFocus={() =>
                    setInputFocus({ ...inputFocus, userCount: true })
                  }
                  onBlur={() =>
                    setInputFocus({ ...inputFocus, userCount: false })
                  }
                  required
                  min="1"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl transition-all duration-200 outline-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           hover:border-gray-400 bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 
                         transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || success}
                className={`px-6 py-2 rounded-xl font-medium flex items-center justify-center min-w-[120px]
                         transition-all duration-200 ${
                           success
                             ? "bg-green-500 text-white"
                             : "bg-blue-600 hover:bg-blue-700 text-white"
                         }`}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : success ? (
                  <Check className="h-5 w-5" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationModal;
