"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, User, Menu, X, UserIcon } from "lucide-react";
import CustomCursor from "../components/CustomCursor";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const userType = Cookies.get("userType");
    const userId = Cookies.get("userId");

    if (token) {
      setIsAuthenticated(true);
      setUserData({
        name: name || "",
        email: email || "",
        userType: userType || "",
        userId: userId || "",
      });
    } else {
      setIsAuthenticated(false);
      setUserData({ name: "", email: "" });
    }
  }, []);

  useEffect(() => {
    const cookieCheck = setInterval(() => {
      const token = Cookies.get("authToken");
      const name = Cookies.get("name");
      const email = Cookies.get("email");
      const userType = Cookies.get("userType");
      const userId = Cookies.get("userId");

      if (token) {
        setIsAuthenticated(true);
        setUserData({
          name: name || "",
          email: email || "",
          userType: userType || "",
          userId: userId || "",
        });
      } else {
        setIsAuthenticated(false);
        setUserData({ name: "", email: "" });
      }
    }, 1000);

    return () => clearInterval(cookieCheck);
  }, []);

  const navLinks = [
    {
      label: "Mental Wellbeing",
      redirectTo: "mental-wellbeing",
      dropdown: [
        { label: "Self", href: "/self" },
        { label: "Campus", href: "/student" },
        { label: "Workplace", href: "/employee" },
      ],
    },
    { label: "Clinics", redirectTo: "/clinics" },
    {
      label: "Courses",
      redirectTo: "/all-courses",
    },
  ];

  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("userId");
    Cookies.remove("userType");
    localStorage.removeItem("caseStudy");
    setIsAuthenticated(false);
    setUserData({ name: "", email: "" });
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (pathname.includes("signup") || pathname.includes("sign-in")) {
    return null;
  }

  return (
    <>
      <div className="w-full flex justify-center fixed top-0 left-0 z-50 bg-white">
        <nav className="h-20 rounded-b-3xl shadow-sm flex justify-between items-center bg-white px-4 md:px-10 w-full md:w-[80vw]">
          <Link href={"/"}>
            <img
              src="/syhLogo.png"
              alt="logo"
              className="w-full h-16 cursor-pointer"
            />
          </Link>
          <section className="hidden md:block">
            <ul className="flex justify-between items-center gap-10 p-2">
              {navLinks.map((item, index) => (
                <div key={index} className="relative group">
                  <Link href={item.redirectTo}>
                    <li className="relative font-semibold text-gray-600 cursor-pointer text-sm group">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300 ease-in-out" />
                    </li>
                  </Link>
                  {item.dropdown && (
                    <div className="absolute left-2 top-7 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                        {item.dropdown.map((option, optionIndex) => (
                          <Link
                            key={optionIndex}
                            href={option.href}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option.label}
                          </Link>
                        ))}
                      </div>
                      <div className="absolute -top-2 left-3 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </section>
          <section className="flex items-center gap-4 md:gap-6">
            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300">
                  <User size={20} />
                  <span className="text-sm font-medium">{userData.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {userData.name}
                      </p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                    <Link
                      href={
                        userData.userType === "self"
                          ? `user-profile?id=${userData?.userId}`
                          : "/expert/profile"
                      }
                    >
                      <div className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-blue-600">
                        <UserIcon size={16} />
                        <span className="text-sm">Go to Profile</span>
                      </div>
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-red-600"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </div>
                  </div>
                  <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
                </div>
              </div>
            ) : (
              <Link href="/sign-in" className="hidden md:block">
                <button className="cursor-pointer px-4 bg-black text-white p-2 rounded-xl shadow-lg transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner">
                  Sign In
                </button>
              </Link>
            )}
            <Link
              href={"/get-started"}
              className="cursor-pointer font-semibold xl:px-4 px-1 bg-[#7CE7FF] text-black xl:p-2 p-1 shadow-lg rounded-xl transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner"
            >
              Get Started
            </Link>
            <button
              className="md:hidden cursor-pointer"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </section>
          {isMobileMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden z-50">
              <div className="flex flex-col max-h-[calc(100vh-5rem)] overflow-y-auto">
                {navLinks.map((item, index) => (
                  <div key={index}>
                    <Link href={item.redirectTo} onClick={toggleMobileMenu}>
                      <div className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                        {item.label}
                      </div>
                    </Link>
                    {item.dropdown && (
                      <div className="bg-gray-50">
                        {item.dropdown.map((option, optionIndex) => (
                          <Link
                            key={optionIndex}
                            href={option.href}
                            onClick={toggleMobileMenu}
                          >
                            <div className="px-8 py-3 border-b border-gray-200 hover:bg-gray-100">
                              {option.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isAuthenticated ? (
                  <div>
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {userData.name}
                      </p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                    <Link
                      href={
                        userData.userType === "self"
                          ? `user-profile?id=${userData?.userId}`
                          : "/expert/profile"
                      }
                      onClick={toggleMobileMenu}
                    >
                      <div className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-blue-600">
                        <UserIcon size={16} />
                        <span className="text-sm">Go to Profile</span>
                      </div>
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-red-600"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="block px-4 py-3"
                    onClick={toggleMobileMenu}
                  >
                    <button className="cursor-pointer w-full px-6 bg-black text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
      <div className="h-20 mb-4" />{" "}
      {/* This creates space below the fixed navbar */}
    </>
  );
};

export default Navbar;
