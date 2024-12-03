"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, User, FileText, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [authToken, setAuthToken] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    setAuthToken(token);
    setUserData({ name, email });

    if (authToken) {
      setIsAuthenticated(true);
      setUserData({ name: name || "", email: email || "" });
    }
  }, [authToken]);

  const navLinks = [
    { label: "Home", redirectTo: "/" },
    { label: "Product", redirectTo: "#product" },
    { label: "Testimonials", redirectTo: "#testimonials" },
    { label: "Blogs", redirectTo: "/blogs" },
  ];

  const dropdownOptions = [
    { label: "Self", href: "/questionnaires?userType=self" },
    { label: "Employee", href: "/questionnaires?userType=employee" },
    { label: "Student", href: "/questionnaires?userType=student" },
  ];

  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUserData({ name: "", email: "" });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (pathname.includes("signup") || pathname.includes("login")) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <nav className="h-20 rounded-b-3xl shadow-sm flex justify-between items-center bg-white px-4 md:px-10 w-full md:w-[80vw]">
        {/* Logo */}
        <section className="font-semibold text-xl cursor-pointer">
          ShareYrHeart
        </section>

        {/* Desktop Navigation */}
        <section className="hidden md:block">
          <ul className="flex justify-between items-center gap-10">
            {navLinks.map((item, index) => (
              <Link href={item.redirectTo} key={index}>
                <li className="relative font-semibold text-gray-600 cursor-pointer text-sm group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300 ease-in-out" />
                </li>
              </Link>
            ))}
          </ul>
        </section>

        {/* Right Section */}
        <section className="flex items-center gap-4 md:gap-10">
          {/* Dropdown for Questionnaires (Desktop) */}
          <div className="relative group hidden md:block">
            <button className="relative w-8 h-8 cursor-pointer">
              <div className="relative flex flex-col justify-center w-full h-full">
                <div className="w-full h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:translate-y-[6px]" />
                <div className="w-full h-[2px] bg-black mt-[10px] transition-all duration-300 ease-in-out group-hover:-rotate-45 group-hover:-translate-y-[6px]" />
              </div>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 z-20">
                {dropdownOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </a>
                ))}
              </div>
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
            </div>
          </div>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="relative group hidden md:block">
              <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300">
                <User size={20} />
                <span className="text-sm font-medium">{userData.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {userData.name}
                    </p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-red-600"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </div>
                </div>
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block cursor-pointer">
              <button className="cursor-pointer px-6 bg-black text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </section>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden z-30">
            <div className="flex flex-col">
              {/* Mobile Navigation Links */}
              {navLinks.map((item, index) => (
                <Link
                  href={item.redirectTo}
                  key={index}
                  onClick={toggleMobileMenu}
                >
                  <div className="px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                    {item.label}
                  </div>
                </Link>
              ))}

              {/* Mobile Questionnaire Options */}
              <div className="border-b border-gray-200">
                {dropdownOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.href}
                    className="block px-4 py-3 hover:bg-gray-50"
                    onClick={toggleMobileMenu}
                  >
                    {option.label}
                  </a>
                ))}
              </div>

              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <div>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {userData.name}
                    </p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
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
                  href="/login"
                  className="block px-4 py-3"
                  onClick={toggleMobileMenu}
                >
                  <button className="w-full px-6 bg-black text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
