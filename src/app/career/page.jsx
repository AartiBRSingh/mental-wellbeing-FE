"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { baseURL } from "../baseURL";
import { Loader2 } from "lucide-react";

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    coverLetter: "",
    cv: null,
  });

  const IndianStates = {
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
      "Tirupati",
      "Rajahmundry",
      "Kakinada",
    ],
    "Arunachal Pradesh": [
      "Itanagar",
      "Naharlagun",
      "Pasighat",
      "Tawang",
      "Ziro",
    ],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Raigarh"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
    ],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Mandi"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    Karnataka: [
      "Bangalore",
      "Mysore",
      "Hubli",
      "Mangalore",
      "Belgaum",
      "Gulbarga",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Kollam",
      "Malappuram",
    ],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Thane",
      "Navi Mumbai",
    ],
    Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Salem",
      "Tiruchirappalli",
      "Vellore",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Nizamabad",
      "Karimnagar",
      "Khammam",
      "Secunderabad",
    ],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Agra",
      "Varanasi",
      "Allahabad",
      "Ghaziabad",
    ],
    Uttarakhand: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    Delhi: [
      "New Delhi",
      "North Delhi",
      "South Delhi",
      "East Delhi",
      "West Delhi",
    ],
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getCities = () => {
    return formData.state ? IndianStates[formData.state] || [] : [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setError("Please upload a PDF file only");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post(`${baseURL}/internships`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        state: "",
        city: "",
        postalCode: "",
        coverLetter: "",
        cv: null,
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex justify-center">
        <section className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl max-w-5xl ">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Career with ShareYrHeart
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 ml-2">
              A career with ShareYrHeart is more than just a job—it’s an
              opportunity to transform lives while growing professionally in the
              fast-evolving field of mental health. Whether you’re a
              psychologist, counselor, trainer, or entrepreneur, ShareYrHeart
              offers a platform to make a meaningful impact.
            </p>
            <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Why Build Your Career with ShareYrHeart?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Be a Changemaker
                </h3>
                <p className="text-gray-700">
                  {" "}
                  Help individuals, students, and employees enhance their mental
                  well-being.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Diverse Career Paths
                </h3>
                <p className="text-gray-700">
                  {" "}
                  Explore roles in counseling, research, corporate well-being,
                  and individual mental health
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  On-Field Job Roles
                </h3>
                <p className="text-gray-700">
                  Work directly with schools, corporate organizations, and
                  community programs, providing hands-on mental health support.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Work with Experts
                </h3>
                <p className="text-gray-700">
                  Collaborate with leading psychologists, therapists, and
                  educators in a professional and growth-oriented environment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  Career Growth & Flexibility
                </h3>
                <p className="text-gray-700">
                  Hybrid and remote work opportunities, training programs, and
                  certificate courses to boost your professional development.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" p-8 rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-purple-100"
        >
          <div className="flex gap-2 ">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6">Job</h2>
            <span className="text-green-500 relative text-4xl md:text-6xl lg:text-4xl block">
              <span className="relative">
                Application
                <svg
                  className="absolute w-full h-[6px] bottom-0 left-0"
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
          </div>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Application submitted successfully! We will contact you soon.
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                  required
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                  required
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                required
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(IndianStates)
                    .sort()
                    .map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                  required
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {getCities().map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="6"
                placeholder="Tell us why you're interested in this internship and what makes you a great candidate..."
                className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-green-500"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700">
                CV (PDF only)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-full file:border-0 
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700 
                    hover:file:bg-blue-100 
                    transition-colors duration-200"
                  required
                />
                {formData.cv && (
                  <span className="text-sm text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    File selected
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InternshipForm;
