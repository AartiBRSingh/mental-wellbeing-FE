import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";

const GetHelp = () => {
  return (
    <div className="w-full flex justify-center my-10">
      {" "}
      <main className="flex md:h-[500px] justify-center gap-24 items-center w-[60vw]">
        <section className="flex-1 bg-transparent z-10">
          <img src="/dummyimg.png" alt="" />
        </section>
        <section className="flex-1 flex flex-col gap-8">
          <h1 className="lg:text-6xl text-xl">
            <span>How </span>
            <span className="text-[#956144]">can we </span>
            <br />
            <span>help you?</span>
          </h1>
          <div className="flex gap-4">
            <p className="text-gray-800 max-w-md">
              We work with world-class experts to create wellbeing human
              centered tools and courses unite sustainable growth.
            </p>
          </div>
          <div className="flex gap-4">
            <p className="text-gray-800 max-w-md">
              We take data-driven decisions around your wellbeing strategy.
            </p>
          </div>
          <button className="cursor-pointer flex  items-center gap-2 w-fit px-8 bg-black text-white font-bold py-3 rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black border hover:border-black hover:shadow-inner">
            Get help
            <MdChevronRight size={30} color="#FF7F4B" />
          </button>
        </section>
      </main>
    </div>
  );
};

export default GetHelp;
