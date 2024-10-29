const Navbar = () => {
  const navLinks = [
    { label: "Home", redirectTo: "" },
    { label: "Product", redirectTo: "" },
    { label: "Testimonials", redirectTo: "" },
  ];
  const dropdownOptions = [
    { label: "Self", href: "#" },
    { label: "Student", href: "#" },
    { label: "Employee", href: "#" },
  ];
  return (
    <div className="w-full flex justify-center">
      <nav className="h-20 rounded-b-3xl shadow-sm flex justify-between items-center bg-white px-10  w-[80vw]">
        <section className="font-semibold text-xl cursor-pointer">
          ShareYrHeart
        </section>
        <section>
          <ul className="flex justify-between items-center gap-10">
            {navLinks.map((item, index) => (
              <li
                key={index}
                className="relative font-semibold text-gray-600 cursor-pointer text-sm group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 group-hover:w-full transition-all duration-300 ease-in-out" />
              </li>
            ))}
          </ul>
        </section>
        <section className="flex justify-between items-center gap-10">
          <div className="relative group">
            <button className="relative w-8 h-8 cursor-pointer">
              <div className="relative flex flex-col justify-center w-full h-full">
                <div
                  className="w-full h-[2px] bg-black transition-all duration-300 ease-in-out 
                        group-hover:rotate-45 group-hover:translate-y-[6px]"
                />
                <div
                  className="w-full h-[2px] bg-black mt-[10px] transition-all duration-300 ease-in-out 
                        group-hover:-rotate-45 group-hover:-translate-y-[6px]"
                />
              </div>
            </button>
            <div
              className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 
                    group-hover:visible transition-all duration-300 ease-in-out"
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 z-20">
                {dropdownOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 
                       transition duration-150 ease-in-out first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </a>
                ))}
              </div>
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200" />
            </div>
          </div>
          <button
            className={`px-6 bg-black text-white p-2 rounded-full transition duration-300 ease-in-out
        hover:bg-white hover:text-black border hover:border-black hover:shadow-inner`}
          >
            Sign In
          </button>
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
