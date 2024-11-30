"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, User, FileText } from "lucide-react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  const [authToken, setAuthToken] = useState(null);

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
    // You might want to add redirect logic here
  };

  if (pathname.includes("signup") || pathname.includes("login")) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <nav className="h-20 rounded-b-3xl shadow-sm flex justify-between items-center bg-white px-10 w-[80vw]">
        <section className="font-semibold text-xl cursor-pointer">
          ShareYrHeart
        </section>
        <section>
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
        <section className="flex justify-between items-center gap-10">
          <div className="relative group">
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

          {isAuthenticated ? (
            <div className="relative group">
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
                  {/* <Link href="/results">
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                      <FileText size={16} />
                      <span className="text-sm text-gray-700">See Results</span>
                    </div>
                  </Link> */}
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
            <Link href="/login" className="cursor-pointer">
              <button className="cursor-pointer px-6 bg-black text-white p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner">
                Sign In
              </button>
            </Link>
          )}
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
