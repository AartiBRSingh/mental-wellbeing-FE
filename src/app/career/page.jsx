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
} from "lucide-react";
import axios from "axios";
import { baseURL } from "../baseURL";
import CustomCursor from "../components/CustomCursor";
import CareerOpportunities from "../components/CareerOpportunities";

const ApplicationModal = ({ isOpen, onClose, ...props }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <CustomCursor />
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
    },
    {
      title: "Diverse Career Paths",
      description:
        "Explore roles in counseling, research, corporate well-being, and individual mental health.",
      image:
        "https://img.freepik.com/free-vector/people-going-back-work_52683-48223.jpg?t=st=1739289159~exp=1739292759~hmac=74addc557307bc9cbd2a8bcd7b20e16ecc716002df7d3b260ae8e50b7e618cb2&w=1380",
    },
    {
      title: "Work with Experts",
      description:
        "Collaborate with leading psychologists, therapists, and educators in a professional environment.",
      image:
        "https://img.freepik.com/free-vector/video-conferencing-concept-landing-page_52683-18368.jpg?t=st=1739289209~exp=1739292809~hmac=a383e6cd3977f036e6703f22c1e253ed50be53123add4cf3b139c067592b0492&w=1380",
    },
    {
      title: "Career Growth & Flexibility",
      description:
        "Hybrid and remote work opportunities with continuous professional development.",
      image:
        "https://img.freepik.com/free-vector/flat-leadership-background_23-2147938562.jpg?t=st=1739289263~exp=1739292863~hmac=3eee9c80afad906f8b3b439f1093676c45e1523bbb5b70037cae895ceac8d951&w=740",
    },
    {
      title: "On-Field Job Roles",
      description:
        " Work directly with schools, corporate organizations, and community programs, providing hands-on mental health support.",
      image:
        "https://img.freepik.com/free-vector/family-phisician-with-husband-pregnant-wife-playing-children-family-doctor-medical-family-practice-primary-healthcare-care-concept-bright-vibrant-violet-isolated-illustration_335657-539.jpg?t=st=1739289576~exp=1739293176~hmac=bea02118150af178059ea1a096e5278dca34bcc9ea7d1c88fe47c988f2cf6db3&w=1380",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="flex justify-between bg-white">
        <div>
          <h1 className="text-6xl max-w-[900px] p-4 ml-32 mt-12">
            A career with{" "}
            <strong className="text-orange-500">ShareYrHeart</strong> is more
            than just a job
          </h1>
          <p className="max-w-[650px] text-2xl absolute left-[400px] top-[310px] p-2">
            <span className="text-red-500 text-4xl mr-3">♥</span>
            it’s an opportunity to transform lives while growing professionally
            in the fast-evolving field of mental health.
          </p>
          <p className="max-w-[600px] text-2xl  absolute top-[450px] left-[220px] p-2">
            Whether you’re a psychologist, counselor, trainer, or entrepreneur,
            ShareYrHeart offers a platform to make a meaningful impact.
            <span className="text-green-400 text-2xl ml-2">♦</span>
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-life-coaching-illustration_23-2150279254.jpg?t=st=1739423710~exp=1739427310~hmac=504397953875b3553cb03a43ea9e6b031bfaa1dc0fb6212c40ded1d2dfd88522&w=1380"
          alt="Mental wellness illustration"
          className="h-[500px] w-auto mr-10"
        />
      </div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Shape the Future of Mental Health
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
          >
            Join ShareYrHeart and be part of a revolution in mental health care,
            making a real difference in people lives while building an
            exceptional career.
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Apply Now
          </motion.button>
        </div>

        <div className="bg-white">
          <div className="flex justify-between items-center mt-5 mx-72 bg-white">
            <div>
              <img
                src="https://img.freepik.com/free-vector/autumn-tree-concept-illustration_114360-22762.jpg?t=st=1739424712~exp=1739428312~hmac=19f833c75266af2ae4628e5d2243b2dbe5538d5effe4f1f3eb6aa35dae6cf429&w=740"
                alt="Mental wellness illustration"
                className="h-[500px] w-auto"
              />
            </div>
            <div className="flex justify-center mt-5">
              <span className="bg-green-300 absolute px-3 py-1 rounded-md text-sm font-semibold mt-4">
                Calm
              </span>
              <img
                src="https://img.freepik.com/free-vector/interview-concept-illustration_114360-1501.jpg?t=st=1739424391~exp=1739427991~hmac=c94a261ffed8efd6f9de4b439058eded8fa1c6213ea87126629655b704cb9557&w=1380"
                alt="Mental wellness illustration"
                className="h-[500px] w-auto "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Future Growth Section */}
      <section className="py-16 px-4 bg-white/50 ">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold p-2 max-w-max  text-gray-900 mb-32 "
          >
            Future Growth &{" "}
            <strong className="text-blue-500">Opportunities</strong>
            <p className="absolute left-[700px] mt-4 max-w-max p-2 ">
              in Mental Health with{" "}
              <strong className="text-5xl text-orange-500">ShareYrHeart</strong>
            </p>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
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
      <CareerOpportunities />

      {/* Why Join Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Why Build Your Career with ShareYrHeart?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyJoinUsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-52 w-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-700">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center bg-white mt-16 p-8">
          <p className="text-3xl text-gray-700 max-w-[1200px]">
            By joining <strong>ShareYrHeart</strong>, you’re not just securing a
            job—you’re becoming part of a revolution in mental health, shaping
            the future of well-being, one life at a time.{" "}
          </p>
        </div>
        <div className="flex justify-center bg-white pb-4">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Apply Now
          </motion.button>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-serif text-stone-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="bg-white/80 mx-20 rounded-2xl divide-y divide-stone-200 mt-16">
            {[
              {
                question: "What career opportunities does ShareYrHeart offer?",
                answer:
                  "ShareYrHeart provides a wide range of career opportunities in the mental health and well-being sector, including Mental Health Experts (Psychologists, Counselors, Therapists), Corporate Well-being Consultants (Employee Assistance Programs), School & Student Counselors (Student Well-being Programs), Self-Understanding Coaches (Personal Growth & Mental Well-being), Clinic Setup & On-Field Mental Health Professionals, Online Mental Health Experts (Live Chat & Forum Support), and Trainers & Educators (Professional Courses & Certification Programs).",
              },
              {
                question:
                  "How can I work as a mental health expert with ShareYrHeart?",
                answer:
                  "Qualified psychologists, counselors, and mental health professionals can apply to join our expert directory, offer services through our platform, conduct online/offline sessions, and participate in wellness programs.",
              },
              {
                question:
                  "Does ShareYrHeart provide opportunities for setting up a clinic?",
                answer:
                  "Yes! We support clinic setups for mental health professionals by offering business guidance, branding, patient referrals, and collaboration opportunities to establish a successful practice.",
              },
              {
                question:
                  "Can I work with ShareYrHeart while maintaining another job?",
                answer:
                  "Yes! We offer flexible working models, including full-time, part-time, and freelance opportunities, allowing professionals to contribute based on their availability.",
              },
              {
                question:
                  "What is the future growth projection in mental health with ShareYrHeart?",
                answer:
                  "The mental health industry is rapidly expanding, with increasing awareness and demand for services. ShareYrHeart is at the forefront of this transformation, offering corporate partnerships for workplace mental well-being, educational collaborations to enhance student mental health, expanding teletherapy & online consultation services, and opportunities for entrepreneurs to establish clinics and mental health ventures.",
              },
              {
                question:
                  "What kind of professional growth can I expect at ShareYrHeart?",
                answer:
                  "Working with ShareYrHeart provides a strong professional network with leading mental health experts, opportunities to deliver workshops, training, and online courses, access to continuous learning and certification programs, and a recognized platform to build your personal brand and reach more clients.",
              },
              {
                question: "How do I apply for a career with ShareYrHeart?",
                answer:
                  "You can explore open positions and submit your application through our Careers page or contact us at support@shareyrheart.com for collaboration opportunities.",
              },
              {
                question: "Do I need prior experience to join ShareYrHeart?",
                answer:
                  "While experience is preferred for expert roles, we also provide training programs and certifications to help aspiring professionals enter the mental health field.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left text-stone-800 hover:text-stone-900"
                >
                  <span className="font-semibold text-lg ml-20">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-4 text-stone-600 transition-all ml-20 duration-200 ${
                    openFaq === index ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      {/* <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Join Our Team
          </motion.h2>

          <div className="bg-white p-8 rounded-xl shadow-lg">
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
        </div>
      </section> */}
      {/* Application Modal */}
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
