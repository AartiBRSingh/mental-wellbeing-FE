import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center my-6 md:my-10">
      <main className="flex flex-col md:flex-row justify-center items-center w-[90vw] md:w-[80vw] lg:w-[60vw] gap-8 md:gap-0">
        {/* Text Section */}
        <section className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left">
          <div className="inline-block">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#956144] text-xs font-semibold">
              MENTAL HEALTH AT 30&apos;S
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="text-[#956144]">Mental Health </span>
            <br />
            <span>is Wealth</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <Link
              href={"#footer"}
              className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform"
            >
              <span className="text-2xl">↓</span>
            </Link>

            <p className="text-gray-800 max-w-md text-center sm:text-left">
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </p>
          </div>
        </section>

        {/* Image Section */}
        <section className="flex-1 flex justify-center md:justify-end bg-transparent  mt-8 md:mt-0">
          <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[350px] md:h-96 mr-20">
            {/* Top Image */}
            <div className="absolute lg:top-4 lg:right-1/4 right-10 -top-8 transform -translate-x-1/2 scale-75 sm:scale-90 md:scale-100">
              <div className="relative">
                <div className="absolute -top-8 left-0">
                  <span className="bg-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold z-10">
                    Happier
                  </span>
                </div>
                <div className="w-36 h-36 bg-yellow-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-fingers-crossed-illustration_23-2150212632.jpg?t=st=1738051346~exp=1738054946~hmac=2b5264f4fd2426e5b85b75a8389299e69dd47b481e0a90fa1e53c1a8d1033dfe&w=740"
                    alt="Profile 1"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>

            {/* Middle Image */}
            <div className="absolute lg:top-1/4 top-2 lg:right-0 -right-16 scale-75 sm:scale-90 md:scale-100">
              <div className="relative">
                <div className="absolute -top-8 right-14">
                  <span className="bg-green-300 px-3 py-1 rounded-md text-sm font-semibold">
                    Calm
                  </span>
                </div>
                <div className="w-48 h-48 bg-green-300 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://img.freepik.com/free-vector/ash-wednesday-concept-illustration_114360-4563.jpg?t=st=1738051234~exp=1738054834~hmac=8b1b551097a0db2f13c07d8ec1476ff8d95d4413a0ba5ddc2b3b89984f7c365f&w=740"
                    alt="Profile 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -right-8 top-1/2 rounded-lg px-2 py-1">
                  <span className="text-orange-500">✓</span>
                </div>
                <span className="absolute -right-4 bottom-0 text-green-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>

            {/* Bottom Image */}
            <div className="absolute bottom-0 lg:left-1/4 left-10 mr-20 scale-75 sm:scale-90 md:scale-100">
              <div className="relative">
                <div className="w-56 h-56 bg-purple-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://img.freepik.com/free-vector/beautiful-woman-with-brown-hair_24908-81058.jpg?t=st=1738051683~exp=1738055283~hmac=87eebd9b79e21150a58a9d1ca2e775b0dadc6addc87f9adc1661e3ba04a7fbb8&w=740"
                    alt="Profile 3"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -left-10 top-1/2 bg-transparent rounded-lg p-1">
                  <span className="text-red-500 text-4xl">♥</span>
                </div>
                <div className="absolute -bottom-8">
                  <span className="bg-purple-200 px-3 py-1 rounded-md text-sm font-semibold">
                    Positive
                  </span>
                </div>
                <span className="absolute -left-4 top-0 text-purple-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 right-1/4 text-gray-300 text-2xl">
              ～
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
