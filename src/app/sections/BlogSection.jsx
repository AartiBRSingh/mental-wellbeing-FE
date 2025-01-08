"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const GraffitiDecoration = () => (
  <svg className="absolute inset-0 " xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50,100 Q100,50 150,100 T250,100"
      fill="none"
      stroke="#956144"
      strokeWidth="2"
      strokeOpacity="0.1"
      className="animate-draw"
    />
    <circle cx="80%" cy="20%" r="4" fill="#956144" fillOpacity="0.1" />
    <circle cx="82%" cy="22%" r="2" fill="#956144" fillOpacity="0.1" />
    <circle cx="78%" cy="18%" r="3" fill="#956144" fillOpacity="0.1" />
    <path
      d="M300,200 C350,150 400,250 450,200"
      fill="none"
      stroke="#956144"
      strokeWidth="2"
      strokeOpacity="0.1"
      className="animate-draw-delayed"
    />
    <path
      d="M50,300 L80,320 L60,350 Z"
      fill="#956144"
      fillOpacity="0.1"
      className="animate-fade-in"
    />
  </svg>
);

const WaveBackground = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full transform translate-y-1/2"
      >
        <path
          fill="#a2d9ff"
          fillOpacity="0.2"
          d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,261.3C672,267,768,245,864,218.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full absolute top-0 transform translate-y-1/3"
      >
        <path
          fill="#a2d9ff"
          fillOpacity="0.1"
          d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,261.3C672,267,768,245,864,218.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  </div>
);

const BlogSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/posts?limit=3`);
        setData(response?.data?.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const dayWithSuffix =
      day +
      (day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th");
    return `${dayWithSuffix} ${month}, ${year}`;
  }

  function generateSlug(title, id) {
    return `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")}?id=${id}`;
  }

  return (
    <div className="relative bg-[#FFF8F5] py-20 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <GraffitiDecoration />
      <WaveBackground />

      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-[#F5E6E0] animate-float" />
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-[#F5E6E0] animate-float-delayed" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#956144] opacity-10 rotate-2 rounded-lg" />
              <div className="relative px-4 py-1.5 bg-white rounded-lg text-sm text-[#956144] font-medium border border-[#956144]/20">
                MENTAL HEALTH AT 30&apos;S
              </div>
            </div>

            <h2 className="relative text-4xl lg:text-6xl font-bold text-[#2D2D2D]">
              <span className="absolute -top-6 -left-6 w-12 h-12 bg-[#F5E6E0] rounded-full -z-10" />
              Latest from{" "}
              <span className="relative text-[#956144]">
                Shareyrheart
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 100 6"
                >
                  <path
                    d="M0,3 Q25,0 50,3 T100,3"
                    fill="none"
                    stroke="#956144"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-gray-600 max-w-xl text-lg">
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </p>
          </div>

          <Link href="/blogs" className="group">
            <button className="relative flex items-center gap-2 px-8 py-3.5 bg-[#956144] text-white rounded-full transition-all duration-300 hover:bg-[#7A4F37] overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              <span className="font-medium">Read all articles</span>
              <MdChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {data?.map((item, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 bg-[#F5E6E0] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <BlogCard
                imgUrl={item?.image}
                title={item?.title}
                totalViews={item.totalViews}
                date={formatDate(item.updatedAt)}
                description={
                  <span
                    className="text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: `${item.content.slice(0, 300)}${
                        item.content.length > 100 ? "..." : ""
                      }`,
                    }}
                  />
                }
                redirectTo={`/blogs/${generateSlug(item.title, item._id)}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
