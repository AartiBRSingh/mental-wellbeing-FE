"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  TrendingUp,
  Brain,
  Users,
  Globe,
  Building2,
  BookOpen,
  Rocket,
  Laptop,
  X,
  ChevronDown,
  Star,
  Target,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { baseURL } from "../baseURL";
import CustomCursor from "../components/CustomCursor";
import CareerOpportunities from "../components/CareerOpportunities";

const ApplicationModal = ({ isOpen, onClose, ...props }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Join Our Team</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{props.children}</div>
      </motion.div>
    </div>
  );
};

const CareerPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    coverLetter: "",
    designation: "",
    cv: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const IndianStates = {
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
    ],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
    Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
  };

  const futureGrowthCards = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "Expanding Mental Health Awareness",
      description:
        "Schools, workplaces, and communities are prioritizing mental well-being, creating new job prospects.",
    },
    {
      icon: <Laptop className="w-8 h-8 text-purple-600" />,
      title: "AI & Digital Mental Health",
      description:
        "Innovations in teletherapy, AI-driven assessments, and 24/7 expert support are reshaping the industry.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      title: "Corporate Well-Being Programs",
      description:
        "Rising demand for mental health initiatives in workplaces, opening avenues for counselors and trainers.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Student & Youth Mental Health",
      description:
        "Schools and universities integrating mental wellness programs require skilled professionals.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-600" />,
      title: "Clinic Set-Up & Franchise Growth",
      description:
        "ShareYrHeart offers opportunities for professionals to establish their own clinics under its expanding network.",
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Global Reach & Expansion",
      description:
        "Digital accessibility and nationwide clinics are paving the way for international opportunities.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      title: "Research & Entrepreneurship",
      description:
        "Professionals can contribute to new mental health policies, conduct research, and develop innovative interventions.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-pink-600" />,
      title: "On-Field Mental Health Services",
      description:
        "Engage directly with institutions, NGOs, and communities to provide real-world mental health solutions.",
    },
  ];

  const whyJoinUsCards = [
    {
      title: "Be a Changemaker",
      description:
        "Help individuals, students, and employees enhance their mental well-being.",
      image:
        "https://img.freepik.com/free-vector/impossible-concept-illustration_114360-19864.jpg?t=st=1739289104~exp=1739292704~hmac=213df4e518bdeb5a3c42cd038e74af23a1867b0cc6c54899ea02683cb32f758d&w=1380",
      icon: <Star className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Diverse Career Paths",
      description:
        "Explore roles in counseling, research, corporate well-being, and individual mental health.",
      image:
        "https://img.freepik.com/free-vector/girls-playing-ludo-game_23-2148705741.jpg?t=st=1739458415~exp=1739462015~hmac=1dde848caf7135d0bb8b4ca5f32bca50994bf240bdac5c9d2862ea885316daa0&w=1380",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Work with Experts",
      description:
        "Collaborate with leading psychologists, therapists, and educators in a professional environment.",
      image:
        "https://img.freepik.com/free-vector/group-therapy-concept-illustration_114360-3488.jpg?t=st=1739458602~exp=1739462202~hmac=2b9c7970601e7ef74a7ab1f15ad3365772c1c4f5be75234432ccc9435324d072&w=1380",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Career Growth & Flexibility",
      description:
        "Hybrid and remote work opportunities with continuous professional development.",
      image:
        "https://img.freepik.com/free-vector/flat-hand-drawn-remote-working-scenes_23-2148852454.jpg?t=st=1739458559~exp=1739462159~hmac=e80b48d84a5fb3ffb2b9d724593c54cc149a20d43fbbdc6f592274819d90e5ee&w=1380",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "On-Field Job Roles",
      description:
        "Work directly with schools, corporate organizations, and community programs, providing hands-on mental health support.",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-young-people-using-technological-devices-background_23-2148125447.jpg?t=st=1739458503~exp=1739462103~hmac=5902fe7fcd7245dc78f6bb432ce2183c7d491dc8d9137876a7c946a2685445f7&w=740",
      icon: <Target className="w-6 h-6" />,
      color: "from-orange-500 to-amber-500",
    },
  ];

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
        designation: "",
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row bg-white rounded-lg md:rounded-3xl mx-4 md:mx-12 lg:mx-48 shadow-sm p-4">
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl md:text-4xl p-2 md:p-4 mt-4 md:mt-12 mx-auto lg:ml-32">
            A career with{" "}
            <strong className="text-[#956144] font-semibold text-3xl md:text-5xl">
              ShareYrHeart
            </strong>{" "}
            is more than just a job
          </h1>
          <p className="text-md md:text-2xl p-2 md:p-4 mx-auto lg:ml-32">
            <span className="text-red-500  mr-3">♥</span>
            its an opportunity to transform lives while growing professionally
            in the fast-evolving field of mental health.
          </p>
          <p className="text-base md:text-xl p-2 md:p-4 mx-auto lg:ml-32">
            Whether youre a psychologist, counselor, trainer, or entrepreneur,
            ShareYrHeart offers a platform to make a meaningful impact.
            <span className="text-green-400 text-xl md:text-2xl ml-2">♦</span>
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-life-coaching-illustration_23-2150279254.jpg"
          alt="Mental wellness illustration"
          className="w-full lg:w-auto h-auto lg:h-[400px] mt-4 lg:mt-0 mx-auto lg:mr-10"
        />
      </div>

      {/* Main Content Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="flex justify-center mb-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#956144] opacity-10 rotate-2 rounded-lg" />
            <div className="relative px-3 md:px-4 py-1.5 bg-white rounded-lg text-xs md:text-sm text-[#956144] font-medium border border-[#956144]/20">
              MENTAL HEALTH AT ANY AGE
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Shape the Future of{" "}
            <strong className="text-[#956144] font-semibold text-4xl md:text-7xl">
              Mental Health
            </strong>
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join ShareYrHeart and be part of a revolution in mental health care,
            making a real difference in peoples lives while building an
            exceptional career.
          </motion.p>
          <motion.button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-6 md:px-8 py-2 rounded-xl text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Apply Now
          </motion.button>
        </div>

        {/* Image Section */}
        <div className="bg-white mx-4 md:mx-12 lg:mx-40 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-4 md:p-8">
            {/* <div className="w-full md:w-1/2">
              <img
                src="https://img.freepik.com/free-vector/autumn-tree-concept-illustration_114360-22762.jpg"
                alt="Mental wellness illustration"
                className="h-auto w-full max-w-[400px] mx-auto"
              />
            </div> */}
            <div className="w-full md:w-1/2 relative">
              <span className="bg-green-300 px-3 py-1 rounded-md text-sm font-semibold absolute top-0 left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-0">
                Calm
              </span>
              <img
                src="https://img.freepik.com/free-vector/interview-concept-illustration_114360-1501.jpg"
                alt="Mental wellness illustration"
                className="h-auto w-full max-w-[400px] mx-auto mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Future Growth Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-2xl md:text-4xl font-bold p-2 text-center md:text-left text-gray-900 mb-8 md:mb-32">
            Future <strong className="text-orange-500">Growth</strong> &{" "}
            <strong className="text-blue-500">Opportunities</strong>
            <p className="md:absolute md:left-[700px] mt-4 text-center md:text-left">
              in Mental Health with{" "}
              <strong className="text-[#956144] font-semibold text-3xl md:text-5xl">
                ShareYrHeart
              </strong>
            </p>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-20">
            {futureGrowthCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      {/* <CareerOpportunities /> */}

      {/* Why Join Us Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-semibold text-black p-3 mb-6 md:mb-10">
              Why Choose{" "}
              <strong className="text-[#956144] font-semibold">
                ShareYrHeart
              </strong>
              ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join a community of passionate professionals dedicated to
              transforming mental health care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyJoinUsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="p-6 md:p-8">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${card.color} text-white mb-6`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">
                      {card.description}
                    </p>
                    <div className="relative h-40 md:h-48 rounded-xl overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-12 md:mt-20 text-center">
            <button
              onClick={() => setOpen(true)}
              className="px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              Start Your Journey With Us
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        <ApplicationModal isOpen={isOpen} onClose={() => setOpen(false)}>
          <div className="space-y-6">
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg"
                >
                  Application submitted successfully! We will contact you soon.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Mental Health Expert">
                      Mental Health Expert
                    </option>
                    <option value="Psychiatry Services">
                      Psychiatry Services
                    </option>
                    <option value="Corporate Roles">Corporate Roles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
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
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2">
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
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Tell us why you're interested in joining ShareYrHeart and what makes you a great candidate..."
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200 hover:border-blue-400"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors duration-200"
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
              </div>
            </form>
          </div>
        </ApplicationModal>
      </AnimatePresence>
    </div>
  );
};

export default CareerPage;
