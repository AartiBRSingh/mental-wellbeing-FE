import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex justify-center my-10">
      {" "}
      <main className="flex md:h-[500px] justify-center items-center w-[60vw]">
        <section className="flex-1 flex flex-col gap-8">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full border border-[#956144] text-xs font-semibold">
              MENTAL HEALTH AT 30'S
            </span>
          </div>
          <h1 className="lg:text-7xl text-xl">
            <span className="text-[#956144]">Mental Health </span>
            <br />
            <span>is Wealth</span>
          </h1>
          <div className="flex gap-4">
            <div className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg hover:scale-125">
              <span className="text-2xl">↓</span>
            </div>

            <p className="text-gray-800 max-w-md">
              To live your life to the fullest, we're continuing to find ways to
              prevent mental health problems.
            </p>
          </div>
        </section>
        <section className="flex-1 flex justify-end bg-cream z-10">
          <div className="relative w-[500px] h-96">
            <div className="absolute top-0 right-1/4 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute -top-8 left-0">
                  <span className="bg-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold z-10">
                    Happier
                  </span>
                </div>
                <div className="w-36 h-36 bg-yellow-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile 1"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>
            <div className="absolute top-1/4 right-0">
              <div className="relative">
                <div className="absolute -top-8 right-0">
                  <span className="bg-green-300 px-3 py-1 rounded-md text-sm font-semibold">
                    Calm
                  </span>
                </div>
                <div className="w-48 h-48 bg-green-300 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile 2"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -right-8 top-1/2  rounded-lg px-2 py-1">
                  <span className="text-orange-500">✓</span>
                </div>
                <span className="absolute -right-4 bottom-0 text-green-400 text-2xl">
                  ♦
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/4 mr-20">
              <div className="relative">
                <div className="w-56 h-56 bg-purple-100 rounded-2xl overflow-hidden p-1 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
