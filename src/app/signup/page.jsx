"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseURL } from "../baseURL";
import axios from "axios";
import { DecorativeShapes } from "../sections/Services";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import RecaptchaProvider from "../utils/RecaptchaProvider";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordUser, setShowPasswordUser] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    userType: "",
    packagePaid: false,
    password: "",
    phoneVerified: true,
    emailVerified: true,
    city: "",
    state: "",
    image: null,
  });
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "bg-red-500",
  });

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const finalUserType = userType || selectedUserType.toLowerCase();

    const payload = {
      name,
      email,
      contactNumber,
      city,
      state,
      password,
      organizationCode,
      userType: finalUserType,
      ...(finalUserType === "employee" && { organizationName, webUrl }),
    };

    try {
      await axios.post(`${baseURL}/create-users`, payload);
      setName("");
      setEmail("");
      setContactNumber("");
      setOrganizationName("");
      setOrganizationCode("");
      setWebUrl("");
      setCity("");
      setState("");
      setPassword("");
      setLoading(false);
      router.push(`/sign-in?userType=${finalUserType}`);
      toast.success("Successfully SignedUp");
    } catch (error) {
      toast.error("Error in SignUp:", error);
      console.error(error);
      setError("An error occurred while signing up. Please try again.");
      setLoading(false);
    }
  };

  const showEmployeeFields =
    (userType || selectedUserType.toLowerCase()) === "employee";

  const inputClasses =
    "mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 outline-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  const handleInputChange = (e) => {
    const { id, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? e.target.checked : value,
    }));
    if (id === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    if (passwordStrength.score < 3) {
      setError("Please choose a stronger password");
      return;
    }

    setLoading(true);
    setError("");
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("userType", formData.userType);
    formDataToSend.append("packagePaid", String(formData.packagePaid));
    formDataToSend.append("phoneVerified", String(formData.phoneVerified));
    formDataToSend.append("emailVerified", String(formData.emailVerified));
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("password", formData.password);

    if (image) {
      formDataToSend.append("image", image);
    }
    try {
      await axios.post(`${baseURL}/create-expert`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        userType: "",
        packagePaid: false,
        password: "",
        phoneVerified: true,
        emailVerified: true,
        city: "",
        state: "",
        image: null,
      });
      router.push(`/sign-in?userType=expert`);
      setLoading(false);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setError(errorMessage);
      setLoading(false);
    }
  };
  const calculatePasswordStrength = (password) => {
    let score = 0;
    let message = "";
    let color = "bg-red-500";

    if (password.length >= 8) score++;
    if (password.match(/[a-z]+/)) score++;
    if (password.match(/[A-Z]+/)) score++;
    if (password.match(/[0-9]+/)) score++;
    if (password.match(/[$@#&!]+/)) score++;

    switch (score) {
      case 0:
      case 1:
        message = "Very Weak";
        color = "bg-red-500";
        break;
      case 2:
        message = "Weak";
        color = "bg-orange-500";
        break;
      case 3:
        message = "Medium";
        color = "bg-yellow-500";
        break;
      case 4:
        message = "Strong";
        color = "bg-green-500";
        break;
      case 5:
        message = "Very Strong";
        color = "bg-green-600";
        break;
    }

    return { score, message, color };
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center py-6 px-4 sm:px-6">
        <Toaster position="bottom-left" reverseOrder={false} />
        <div className="flex justify-center items-center bg-[#003B29] rounded-3xl w-full max-w-7xl flex-col lg:flex-row p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-4 mb-8 lg:mb-0">
            <section className="flex-1 flex flex-col gap-4 md:gap-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
                  CARING IS ALWAYS FREE
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-6xl text-white">
                <span>We help you to </span>
                <br />
                <span className="text-[#FDD56A] relative">
                  g
                  <span className="relative">
                    row confidence
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
                <br />
                <span> at any age</span>
              </h1>

              <p className="text-white max-w-md text-sm md:text-base">
                To live your life to the fullest, we&apos;re continuing to find
                ways to prevent mental health problems.
              </p>
            </section>
          </div>

          {isUserLogin ? (
            <div className="flex-1 flex items-center justify-center w-full max-w-md">
              <div className="w-full">
                <form
                  onSubmit={handleUserSubmit}
                  className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg space-y-4 md:space-y-6 max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-center space-x-4 px-2 sm:px-4">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isUserLogin ? "text-black" : "text-gray-500"
                      }`}
                    >
                      User Register
                    </span>

                    <div
                      className="w-14 h-7 bg-gray-300 rounded-full cursor-pointer relative"
                      onClick={() => setIsUserLogin(!isUserLogin)}
                    >
                      <div
                        className={`
                        absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                        ${isUserLogin ? "translate-x-1" : "translate-x-8"}
                      `}
                      />
                    </div>

                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        !isUserLogin ? "text-black" : "text-gray-500"
                      }`}
                    >
                      Expert Register
                    </span>
                  </div>
                  <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      Create Account
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">
                      Fill in your details to get started
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {error}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Name <span className="text-black">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email <span className="text-black">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="contactNumber" className={labelClasses}>
                        Contact Number <span className="text-black">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organizationCode"
                        className={labelClasses}
                      >
                        Organization Code
                      </label>
                      <input
                        type="text"
                        id="organizationCode"
                        value={organizationCode}
                        onChange={(e) => setOrganizationCode(e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {showEmployeeFields && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="organizationName"
                          className={labelClasses}
                        >
                          Organization Name{" "}
                          <span className="text-black">*</span>
                        </label>
                        <input
                          type="text"
                          id="organizationName"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          required
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="webUrl" className={labelClasses}>
                          Web URL <span className="text-black">*</span>
                        </label>
                        <input
                          type="text"
                          id="webUrl"
                          value={webUrl}
                          onChange={(e) => setWebUrl(e.target.value)}
                          required
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="city" className={labelClasses}>
                        City <span className="text-black">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className={labelClasses}>
                        State <span className="text-black">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className={labelClasses}>
                      Password <span className="text-black">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`${inputClasses} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-gray-600 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                  <div className="text-center mt-4 sm:mt-6 space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/sign-in?userType=${
                            userType || selectedUserType.toLowerCase()
                          }`
                        )
                      }
                      className="text-black hover:text-gray-600 font-medium transition-colors cursor-pointer text-sm"
                    >
                      Already have an account? Log in
                    </button>
                    <div className="block w-full">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/sign-in?userType=${
                              userType || selectedUserType.toLowerCase()
                            }`
                          )
                        }
                        className="text-black hover:text-gray-600 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
                      >
                        Are you running an organization? Please sign up here
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center w-full max-w-md">
              <form
                onSubmit={handleAdminSubmit}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg space-y-4 md:space-y-6 max-h-[80vh] md:max-h-[90vh] overflow-y-auto w-full"
              >
                <div className="flex items-center justify-center space-x-4 px-2 sm:px-4">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isUserLogin ? "text-black" : "text-gray-500"
                    }`}
                  >
                    User Register
                  </span>

                  <div
                    className="w-14 h-7 bg-gray-300 rounded-full cursor-pointer relative"
                    onClick={() => setIsUserLogin(!isUserLogin)}
                  >
                    <div
                      className={`
                      absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${isUserLogin ? "translate-x-1" : "translate-x-8"}
                    `}
                    />
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      !isUserLogin ? "text-black" : "text-gray-500"
                    }`}
                  >
                    Expert Register
                  </span>
                </div>
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Expert Registration
                  </h2>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <label htmlFor="name" className={labelClasses}>
                      Full Name <span className="text-[#EF4444] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className={labelClasses}>
                      Email <span className="text-[#EF4444] ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <label htmlFor="state" className={labelClasses}>
                      State <span className="text-[#EF4444] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="Enter State"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="city" className={labelClasses}>
                      City <span className="text-[#EF4444] ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="Enter City"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <label htmlFor="contactNumber" className={labelClasses}>
                      Mobile Number{" "}
                      <span className="text-[#EF4444] ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div>
                    <label htmlFor="userType" className={labelClasses}>
                      User Type <span className="text-[#EF4444] ml-1">*</span>
                    </label>
                    <select
                      id="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Select User Type</option>
                      <option value="Individual Therapy">
                        Individual Therapy
                      </option>
                      <option value="Couples / Marriage Counseling">
                        Couples / Marriage Counseling
                      </option>
                      <option value="Child & Teen Therapy">
                        Child & Teen Therapy
                      </option>
                      <option value="Family Therapy">Family Therapy</option>
                      <option value="Psychiatry & Medication">
                        Psychiatry & Medication
                      </option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="relative p-3 sm:p-4 rounded-lg border border-gray-200">
                    <label
                      htmlFor="image"
                      className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center"
                    >
                      <span className="mr-2 text-black font-semibold">
                        Upload Image
                      </span>
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm"
                      >
                        Choose File
                      </label>
                      {image && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-full border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                    {image && (
                      <p className="mt-2 text-xs sm:text-sm text-gray-600 truncate">
                        Selected File: {image.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="password" className={labelClasses}>
                    Password <span className="text-[#EF4444] ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className={`${inputClasses} pr-12`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-1 flex items-center space-x-2">
                      <div
                        className={`h-1 w-1/4 ${passwordStrength.color} rounded`}
                      ></div>
                      <div
                        className={`h-1 w-1/4 ${
                          passwordStrength.score > 1
                            ? passwordStrength.color
                            : "bg-gray-200"
                        } rounded`}
                      ></div>
                      <div
                        className={`h-1 w-1/4 ${
                          passwordStrength.score > 2
                            ? passwordStrength.color
                            : "bg-gray-200"
                        } rounded`}
                      ></div>
                      <div
                        className={`h-1 w-1/4 ${
                          passwordStrength.score > 3
                            ? passwordStrength.color
                            : "bg-gray-200"
                        } rounded`}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="mt-4 sm:mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold focus:ring-offset-2 transition-all duration-200 cursor-pointer"
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                </div>
                <div className="text-center mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/sign-in?userType=${
                          userType || selectedUserType.toLowerCase()
                        }`
                      )
                    }
                    className="text-black hover:text-gray-600 font-medium transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    Already have an account? Log in
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignupPage />
    </Suspense>
  );
};

export default page;
