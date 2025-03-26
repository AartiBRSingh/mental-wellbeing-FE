"use client";
import React, { useEffect, useState } from "react";
import {
  Star,
  Info,
  ChevronDown,
  Calendar,
  Clock,
  Share,
  CheckCircle,
} from "lucide-react";
import { TiTickOutline } from "react-icons/ti";

import { useSearchParams } from "next/navigation";
import { baseURL } from "@/app/baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import CourseReviews from "@/app/components/CourseReviews";
import ShareModal from "@/app/components/ShareModal";
import LoginModal from "@/app/components/LoginModal"; // Import the LoginModal
import toast, { Toaster } from "react-hot-toast";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Add state for login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const convertToBulletPoints = (text) => {
    if (!text) return [];
    return text.split(".").filter((item) => item.trim().length > 0);
  };

  const getTotalDuration = (curriculum) => {
    if (!curriculum || !Array.isArray(curriculum)) return 0;
    let totalMonths = 0;
    curriculum.forEach((item) => {
      if (item.duration) {
        // Assuming duration is stored in minutes, convert to months
        // This is a placeholder calculation - adjust based on your actual data
        totalMonths += Math.ceil(item.duration / (60 * 24 * 30)); // rough estimate
      }
    });
    return totalMonths || 3; // Default to 3 months if calculation results in 0
  };

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setUserId(userId);
    } else {
      setUserId("");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/get-courses/${id}`);
        setCourse(res.data);
        setReviews(res.data.reviews || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the offset to center the section
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const elementHeight = elementRect.height;

      // Calculate the scroll position to center the element
      const scrollPosition =
        absoluteElementTop - viewportHeight / 2 + elementHeight / 2;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: "about", label: "About" },
    { id: "outcomes", label: "Outcomes" },
    { id: "courses", label: "Courses" },
    { id: "testimonials", label: "Testimonials" },
  ];

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();

    const storedUserId = Cookies.get("userId");
    const storedUserName = Cookies.get("name");
    const storedEmail = Cookies.get("email");
    const storedPhoneNo = Cookies.get("contactNumber");

    setUserId(storedUserId);
    setUserName(storedUserName);
    setEmail(storedEmail);
    setPhoneNo(storedPhoneNo);
  }, []);

  const handlePayment = async () => {
    // Check if user is signed in
    const storedUserId = Cookies.get("userId");

    if (!storedUserId) {
      // Open login modal if not signed in
      setShowLoginModal(true);
      return;
    }

    const amount = course.discountedPrice;

    const response = await fetch(`${baseURL}/api/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: storedUserId, amount }),
    });

    const data = await response.json();
    if (!data.success) {
      return alert("Failed to create Razorpay order");
    }

    const { order } = data;

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_CR2IahVWmEdcMA",
      amount: order.amount,
      currency: "INR",
      name: "ShareYHeart",
      description: "Transaction",
      image: "/logo.png",
      order_id: order.id,
      handler: async (response) => {
        const verifyResponse = await fetch(
          `${baseURL}/api/verify-payment-course`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: storedUserId,
              amount,
              courseId: course._id,
              planType: "course",
            }),
          }
        );

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          toast.success("Payment Successful!");
        } else {
          toast.error("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: userName,
        email: email,
        contact: phoneNo,
      },
      theme: {
        color: "black",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/courses/${id}/reviews`, {
        studentId: userId,
        rating,
        comment,
      });

      // Add the new review to the reviews array
      const newReview = response.data.review;
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);

      // Update the course rating in the course object
      const newAverageRating = calculateAverageRating(updatedReviews);
      setCourse((prevCourse) => ({
        ...prevCourse,
        rating: newAverageRating,
        reviewsCount: updatedReviews.length,
      }));

      // Reset form fields
      setRating(0);
      setComment("");

      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("Failed to submit review. Please try again.");
    }
    setLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white m-10 rounded-2xl shadow-xl">
        <div className="animate-pulse">
          <div className="h-48 w-48 bg-gray-200 rounded-full mb-6 mx-auto md:mx-0"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-white to-[#FFD255] my-10 rounded-2xl shadow-xl">
      <Toaster position="bottom-left" reverseOrder={false} />
      {/* Hero Section */}
      <div className="mb-8 p-6 bg-transparent rounded-xl mx-5">
        <div className="flex flex-col md:flex-row md:items-center p-5 gap-6 rounded-2xl ">
          <span className="text-black relative font-semibold text-4xl md:text-6xl lg:text-5xl block mb-4">
            <span className="relative">
              {course?.title}
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
        <div className="m-4">
          <div className="relative">
            <p
              className={`text-gray-700 mb-1 max-w-max leading-relaxed ${
                !showFullDescription ? "line-clamp-3" : ""
              }`}
            >
              {course?.about?.content}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none transition-colors duration-200"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          </div>
          <div className="flex items-center gap-2 my-4">
            <span className="text-gray-600 font-medium">Instructor: </span>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              {course?.instructor}
            </a>
          </div>
          <div className="flex items-center gap-2 my-4">
            <p>
              Recognised by:{" "}
              <strong className="text-blue-600 hover:underline font-medium">
                Jadavpur University
              </strong>{" "}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-4 text-lg">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Start Date:{" "}
                <span className="font-medium">{course?.startDate}</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                Schedule:{" "}
                <span className="font-medium">{course?.schedule}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Price & Enrollment Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="max-w-xs w-full">
            <div className="mb-3">
              {course?.discountedPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {formatPrice(course.discountedPrice)}
                  </span>
                  <span className="text-gray-500 line-through">
                    {formatPrice(course.price)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">
                    {Math.round(
                      ((course.price - course.discountedPrice) / course.price) *
                        100
                    )}
                    % off
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  {course?.price ? formatPrice(course.price) : "Free"}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePayment}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold mb-2 hover:bg-blue-700 transition-colors duration-200 shadow-md mt-4 flex-grow"
              >
                Enroll Now
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-green-500 text-white py-3 px-4 rounded-lg font-semibold mb-2 hover:bg-slate-600 transition-colors duration-200 shadow-md gap-2 mt-4 flex items-center justify-center"
              >
                Share
                <Share size={20} />
              </button>
            </div>
          </div>
          {course?.enrollmentCount > 0 && (
            <div className="mt-4 flex items-center bg-blue-50 px-4 py-2 rounded-lg">
              <span className="font-bold text-blue-700">
                {course?.enrollmentCount}
              </span>
              <span className="text-blue-600"> students already enrolled</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="border-r border-gray-200 md:border-r-2">
            <div className="flex items-center gap-2 mb-2 ml-10 mt-3">
              <span className="font-bold text-xl text-blue-600">
                {course?.rating || calculateAverageRating(reviews) || 0}
              </span>
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-gray-600 font-medium">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>
          <div className="border-r border-gray-200 md:border-r-2 ml-5 ">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{course?.level} Level</h3>
              <Info className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm">Recommended experience</p>
          </div>
          <div className="border-r border-gray-200 md:border-r-2 ml-8">
            <h3 className="font-bold text-lg mb-2">
              {course?.numCourses} Courses
            </h3>
            <p className="text-gray-600 text-sm">
              {course?.paceDescription} pace
            </p>
          </div>
          <div className="mx-10">
            <div className="flex gap-2">
              <Calendar />
              <span className="font-bold text-lg mb-2">
                {course.duration || getTotalDuration(course.curriculum)} months
              </span>
            </div>
            <h3 className="text-gray-600 text-md">At {course?.schedulePace}</h3>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-20 bg-white border-b mb-6 z- py-5 px-5 rounded-xl shadow-sm">
        <nav className="flex gap-8 overflow-x-auto">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`pb-4 px-3 flex items-center gap-1 whitespace-nowrap transition-colors duration-200 ${
                activeSection === id
                  ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
          {course?.about?.title || "About This Course"}
        </h2>
        <div className="text-gray-700 mb-6 whitespace-pre-line leading-relaxed">
          {course?.about?.content}
        </div>
        {course?.about?.skills && course.about.skills.length > 0 && (
          <>
            <h3 className="font-bold mb-3 text-lg">Skills you will gain:</h3>
            <div className="flex flex-wrap gap-2">
              {course.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Outcomes Section */}
      <div
        id="outcomes"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-green-500 pl-3">
          {course?.outcomes?.title || "Career Outcomes"}
        </h2>
        {course?.outcomes?.items && course.outcomes.items.length > 0 && (
          <ul className="space-y-4">
            {course.outcomes.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-3 h-3 mr-5">
                  <CheckCircle
                    color="green"
                    size={24}
                    className="inline-block"
                  />
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Courses Section */}
      <div
        id="courses"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
          Courses
        </h2>
        <div className="space-y-4">
          {course?.courses?.length > 0 ? (
            course.courses.map((courseItem, index) => {
              const curriculumItem = course.curriculum?.[index];
              const isExpanded = expandedItems[index];
              const descriptionPoints = convertToBulletPoints(
                courseItem.description
              );
              const curriculumPoints = convertToBulletPoints(
                curriculumItem?.description
              );

              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setExpandedItems((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">
                        {courseItem.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {courseItem.duration}
                        </p>
                        {curriculumItem?.duration > 0 && (
                          <p className="text-sm text-gray-600 flex items-center sm:ml-4">
                            <Clock className="w-4 h-4 mr-1" />
                            {`${Math.ceil(
                              curriculumItem.duration / 60
                            )}h per week`}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-4">
                      {descriptionPoints.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-700">
                            Course Overview:
                          </h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {descriptionPoints.map((point, i) => (
                              <li key={i} className="text-gray-600">
                                {point.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {curriculumPoints.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-700">
                            Curriculum Details:
                          </h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {curriculumPoints.map((point, i) => (
                              <li key={i} className="text-gray-600">
                                {point.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 italic">
              No curriculum information available
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div
        id="testimonials"
        className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-yellow-500 pl-3">
          Student Reviews
        </h2>
        <CourseReviews
          courseReviews={reviews}
          onSubmitReview={handleSubmit}
          userId={userId}
          loading={loading}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
        />
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ShareModal
            onClose={() => setShowShareModal(false)}
            copyToClipboard={handleCopyToClipboard}
            src={pageUrl}
          />
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default CourseDetailPage;
