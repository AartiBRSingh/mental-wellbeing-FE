"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const NewsSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/posts?type=news`);
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
    <div className="bg-white pt-10 pb-20 px-6 lg:px-32">
      <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-3xl lg:text-6xl font-semibold">
          Latest from <span className=" text-[#956144]">Shareyrheart</span>
        </h1>
        <Link
          href={"/news"}
          className="font-semibold flex gap-2 underline items-center cursor-pointer text-base lg:text-lg"
        >
          Read all News <FaArrowRightLong />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 p-10 relative">
        {data?.map((item, index) => (
          <BlogCard
            key={index}
            imgUrl={item?.image}
            title={item?.title}
            totalViews={item.totalViews}
            date={formatDate(item.updatedAt)}
            description={
              <span
                dangerouslySetInnerHTML={{
                  __html: `${item.content.slice(0, 300)}${
                    item.content.length > 100 ? "..." : ""
                  }`,
                }}
              />
            }
            redirectTo={`/blogs/${generateSlug(item.title, item._id)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
