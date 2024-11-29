"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const BlogSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/posts`);
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
    <div className=" bg-white pt-10 pb-20 px-32">
      <div className="mb-20 flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-semibold">
          Latest from{" "}
          <span className="relative inline-block">
            Shareyrheart
            <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-200"></span>
          </span>
        </h1>
        <Link
          href={"/blogs"}
          className="font-semibold flex gap-2 underline items-center"
        >
          View all <FaArrowRightLong />
        </Link>
      </div>
      <div className="flex justify-start items-center flex-wrap gap-4">
        {data?.map((item, index) => (
          <BlogCard
            key={index}
            imgUrl={item?.image}
            title={item?.title}
            totalViews={item.totalViews}
            date={formatDate(item.updatedAt)}
            redirectTo={`/blogs/${generateSlug(item.title, item._id)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
