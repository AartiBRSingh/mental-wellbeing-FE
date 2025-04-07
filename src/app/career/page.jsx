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
  HelpCircle,
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

const handleEmailSupport = () => {
  const email = "support@shareyrheart.com";
  const subject = "Support Request";

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}`,
    "_blank"
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
    <div className="min-h-screen mt-20">
      {/* Hero Section */}
      <div className="flex justify-center mb-8">
        <span className="relative text-4xl md:text-4xl xl:text-5xl font-serif text-stone-800 max-w-full md:max-w-[1000px] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
          Job &
          <span className="relative text-[#956144] ml-3">
            Career
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
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-md md:text-xl font-semibold  p-2 md:p-4 mx-auto ">
          Its an opportunity to transform lives while growing professionally in
          the fast-evolving field of mental health.
        </p>
      </div>

      <div className="flex gap-8 justify-center max-w-7xl mx-auto mt-8 mb-8">
        <div className="bg-white p-8 rounded-xl shadow-sm w-full">
          <div className="flex justify-center mb-3">
            <img
              src="/feedback.png"
              alt="Benefits Icon"
              className="w-24 h-24"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <h3 className="text-lg font-medium text-gray-800">
              Be a Changemaker
            </h3>
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="text-gray-600 leading-relaxed text-sm mt-6">
              Help individuals, students, and employees enhance their mental
              well-being.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm w-full">
          <div className="flex justify-center mb-3">
            <img src="/choice.png" alt="Benefits Icon" className="w-24 h-24" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <h3 className="text-lg font-medium text-gray-800">
              Diverse Career Paths
            </h3>
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="text-gray-600 leading-relaxed text-sm mt-6">
              Explore roles in counseling, research, corporate well-being, and
              individual mental health.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm w-full">
          <div className="flex justify-center mb-3">
            <img src="/role.png" alt="Benefits Icon" className="w-24 h-24" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <h3 className="text-lg font-medium text-gray-800">
              On-Field Job Roles
            </h3>
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="text-gray-600 leading-relaxed text-sm mt-5">
              Work directly with schools, corporate organizations, and community
              programs, providing hands-on mental health support.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-8 justify-center max-w-4xl mx-auto mt-8 mb-8">
        <div className="bg-white p-8 rounded-xl shadow-sm w-full">
          <div className="flex justify-center mb-3">
            <img
              src="/professional.png"
              alt="Benefits Icon"
              className="w-24 h-24"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <h3 className="text-lg font-medium text-gray-800">
              Work with Experts
            </h3>
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="text-gray-600 leading-relaxed text-sm mt-2">
              Collaborate with leading psychologists, therapists, and educators
              in a professional and growth-oriented environment.
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm w-full">
          <div className="flex justify-center mb-3">
            <img src="/goal.png" alt="Benefits Icon" className="w-24 h-24" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <h3 className="text-lg font-medium text-gray-800">
              Career Growth & Flexibility
            </h3>
          </div>
          <div className="flex justify-center items-center gap-3">
            <p className="text-gray-600 leading-relaxed text-sm mt-3">
              Hybrid and remote work opportunities, training programs, and
              certificate courses to boost your professional development.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center bg-white rounded-lg p-4 md:p-8 mt-4 md:mt-12">
        <p className="text-base md:text-xl font-semibold p-2 md:p-4 mx-auto">
          The mental health industry is experiencing rapid expansion, with
          growing awareness, increased corporate investments, and digital
          transformations. ShareYrHeart is leading this revolution, offering
          multiple opportunities for professionals in both online and on-field
          roles.
        </p>
      </div>

      <div className="bg-white rounded-xl max-w-7xl mx-auto p-6 shadow-sm border border-gray-100 mt-8 ">
        <div className="flex justify-center mb-8">
          <span className="relative text-2xl md:text-3xl xl:text-3xl font-serif text-stone-800 max-w-full md:max-w-[1000px] [text-shadow:_2px_2px_2px_rgb(0_0_0_/_30%)] block">
            Growth &
            <span className="relative text-[#956144] ml-3">
              Opportunities
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
        </div>
        <ul className="space-y-6">
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium  text-gray-800">
                  Expanding Mental Health Awareness
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Schools, workplaces, and communities are prioritizing mental
                  well-being, creating new job prospects.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium text-gray-800">
                  AI & Digital Mental Health
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Innovations in teletherapy, AI-driven assessments, and 24/7
                  expert support are reshaping the industry.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium text-gray-800">
                  Corporate Well-Being Programs
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Rising demand for mental health initiatives in workplaces,
                  opening avenues for counselors and trainers.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium  text-gray-800">
                  Student & Youth Mental Health
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Schools and universities integrating mental wellness programs
                  require skilled professionals.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium  text-gray-800">
                  Clinic Set-Up & Franchise Growth
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  ShareYrHeart offers opportunities for professionals to
                  establish their own clinics under its expanding network.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium  text-gray-800">
                  On-Field Mental Health Services
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Engage directly with institutions, NGOs, and communities to
                  provide real-world mental health solutions.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium  text-gray-800">
                  Global Reach & Expansion
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Digital accessibility and nationwide clinics are paving the
                  way for international opportunities.
                </p>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex justify-center ">
              <img
                src="/check-mark.png"
                alt="Benefits Icon"
                className="w-6 h-6 mr-2 mt-1"
              />
              <div>
                <span className="font-medium  text-gray-800">
                  Research & Entrepreneurship
                </span>
                <p className="text-sm text-gray-600 ml-5">
                  Professionals can contribute to new mental health policies,
                  conduct research, and develop innovative interventions.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto text-center rounded-lg">
        <p className=" font-semibold text-xl text-black mt-12 text-center">
          By joining ShareYrHeart, you’re not just securing a job—you’re
          becoming part of a revolution in mental health, shaping the future of
          well-being, one life at a time.
        </p>
      </div>

      <section className="py-12  px-4">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.button
            onClick={() => setOpen(true)}
            className="bg-[#D2691E] text-white px-6 md:px-8 py-2 rounded-xl text-base md:text-lg font-semibold hover:bg-[#A0522D] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Apply Now
          </motion.button>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center px-4 md:px-0 pb-8">
          <p className="text-stone-600">Need help? Contact our support team</p>
          <button
            className="mt-4 inline-flex items-center text-blue-700 hover:text-blue-800 cursor-pointer"
            onClick={handleEmailSupport}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Support
          </button>
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
