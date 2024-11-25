"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseURL } from "../baseURL";
import axios from "axios";
import { DecorativeShapes } from "../sections/Services";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");

  const handleSubmit = async (event) => {
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
      userType: finalUserType,
      ...(finalUserType === "employee" && { organizationName, webUrl }),
    };

    try {
      await axios.post(`${baseURL}/create-users`, payload);
      setName("");
      setEmail("");
      setContactNumber("");
      setOrganizationName("");
      setWebUrl("");
      setCity("");
      setState("");
      setPassword("");
      setLoading(false);
      router.push(`/login?userType=${finalUserType}`);
    } catch (error) {
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

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex justify-center items-center bg-[#003B29] rounded-3xl w-[80vw] h-[80vh] flex-wrap px-16 relative">
        <DecorativeShapes />
        <div className="flex-1 flex items-center justify-center p-4">
          {/* <img
            src="/api/placeholder/800/600"
            alt="Signup background"
            className=" object-cover"
          /> */}
          <section className="flex-1 flex flex-col gap-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full border border-green-700 text-white text-xs font-semibold">
                CARING IS ALWAYS FREE{" "}
              </span>
            </div>
            <h1 className="lg:text-6xl text-xl text-white">
              <span>We help you to </span>
              <br />
              <span className="text-[#FDD56A] relative">
                g
                <span className="relative">
                  row confidence
                  <svg
                    className="absolute w-full h-[10px] bottom-0 left-0"
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

            <p className="text-white max-w-md">
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </p>
          </section>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-lg space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className="text-gray-600 mt-2">
                  Fill in your details to get started
                </p>
              </div>

              {error && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-600 text-sm">{error}</p>
                </div>
              )}

              {!userType && (
                <div>
                  <label className={labelClasses}>
                    User Type <span className="text-black">*</span>
                  </label>
                  <select
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    required
                    className={inputClasses}
                  >
                    <option value="">Select user type</option>
                    <option value="Self">Self</option>
                    <option value="Employee">Employee</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label htmlFor="password" className={labelClasses}>
                    Password <span className="text-black">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              {showEmployeeFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="organizationName" className={labelClasses}>
                      Organization Name <span className="text-black">*</span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-gray-600 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                disabled={loading || (!userType && !selectedUserType)}
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

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/login?userType=${
                        userType || selectedUserType.toLowerCase()
                      }`
                    )
                  }
                  className="text-black hover:text-gray-600 font-medium transition-colors"
                >
                  Already have an account? Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
