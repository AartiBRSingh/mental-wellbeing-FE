import React from "react";
const Testimonials = () => {
  return (
    <div className=" bg-white flex justify-end pb-20">
      {" "}
      <div className="flex gap-20 items-center w-2/3 bg-cream rounded-2xl">
        {/* Left Profile Card */}
        <div className="bg-[#49382E] rounded-3xl shadow-lg w-[350px] p-10">
          <div className="mb-4">
            <img
              src="https://images.unsplash.com/photo-1729761137674-9a3a841f7cea?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Helping to Navigate"
              className="rounded-lg h-60 w-full object-cover "
            />
          </div>
          <div className="px-4">
            <div className="flex justify-between items-center border-b border-t border-t-[#956144] border-b-[#956144] mb-2 text-white">
              <h2 className="text-lg font-semibold">Helping to Navigate</h2>
              <h2 className="text-xl font-semibold">|</h2>
              <a
                href="#"
                className="inline-flex items-center px-6 my-1 py-2  text-whites font-bold rounded-md "
              >
                <span>→</span>
              </a>
            </div>
            <p className=" mb-4 text-sm text-white">
              Reach out to program from college to elementary school students
            </p>
          </div>
        </div>

        {/* Right Testimonial Section */}
        <div className="w-[600px]">
          <div className="relative mb-4">
            <h2 className="text-3xl font-serif font-semibold">
              &quot; Felt a{" "}
              <span className="relative underline italic text-amber-900 bg-amber-800 bg-opacity-20">
                connection
                <div className="absolute w-full h-2 bg-[#E8C4B8] bottom-1 -z-10"></div>
              </span>{" "}
              to myself &quot;
            </h2>
          </div>
          <div className="w-16 h-16s bg-[#FF725E] rounded-full flex items-center justify-center  mb-4">
            <img
              src="/test.png"
              alt="Alison"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Alison,</span>
                <span className="text-gray-500 text-sm">
                  Creative Designer, BBC Inc.
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="space-y-4">
            <p className="text-gray-700 font-semibold">
              &quot; The Psychology Awareness Initiative gives me maximum
              flexibility and discover my own secret hidden confidence
            </p>
            <p className="text-gray-700 font-semibold">
              They may be used as a guide on our own psychology awareness
              program. &quot;
            </p>
          </div>

          {/* Decorative Leaf */}
          <div className="absolute bottom-4 right-4 text-gray-200">🍃</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
