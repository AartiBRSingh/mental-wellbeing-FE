"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { baseURL } from "../baseURL";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

// const GraffitiDecoration = () => (
//   <svg className="absolute inset-0 " xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M50,100 Q100,50 150,100 T250,100"
//       fill="none"
//       stroke="#956144"
//       strokeWidth="2"
//       strokeOpacity="0.1"
//       className="animate-draw"
//     />
//     <circle cx="80%" cy="20%" r="4" fill="#956144" fillOpacity="0.1" />
//     <circle cx="82%" cy="22%" r="2" fill="#956144" fillOpacity="0.1" />
//     <circle cx="78%" cy="18%" r="3" fill="#956144" fillOpacity="0.1" />
//     <path
//       d="M300,200 C350,150 400,250 450,200"
//       fill="none"
//       stroke="#956144"
//       strokeWidth="2"
//       strokeOpacity="0.1"
//       className="animate-draw-delayed"
//     />
//     <path
//       d="M50,300 L80,320 L60,350 Z"
//       fill="#956144"
//       fillOpacity="0.1"
//       className="animate-fade-in"
//     />
//   </svg>
// );

// const AnimatedBackground = () => (
//   <div className="absolute inset-0 w-full h-full -z-20 opacity-[0.20]">
//     <svg
//       width="100%"
//       height="100%"
//       preserveAspectRatio="none"
//       viewBox="0 0 1440 560"
//     >
//       <g mask="url(#SvgjsMask1045)" fill="none">
//         <path
//           d="M492.2808232629382 101.5810851651076L410.46649701170605-40.12548468904271 268.75992715755575 41.68884156218947 350.5742534087879 183.39541141633975z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M784.5026226134269 332.69404116415933L698.7971903478887 195.53667858322962 561.6398277669589 281.2421108487678 647.3452600324972 418.39947342969754z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M312.0091831295798 18.060033743368663L304.026056082914 109.30759342634758 403.25674281255874 26.043160790034474z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float2"
//         />
//         <path
//           d="M1047.5851970125009 190.99726152587627L915.3763464286003 184.06848926521067 1040.6564247518352 323.2061121097769z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M1345.3704613677994 281.74262237755863L1402.1558261246782 218.6760856194283 1339.089289366548 161.8907208625494 1282.3039246096691 224.9572576206797z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M971.3081986680622 31.203208220363834L865.9723897771667-74.13260067053179 760.636580886271 31.203208220363848 865.9723897771667 136.53901711125945z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float2"
//         />
//         <path
//           d="M313.5062614317195 444.2028693823155L167.95124016682973 456.93728366226816 180.6856544467824 602.4923049271579 326.24067571167217 589.7578906472053z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M949.5064394394894 390.3217331841341L831.7138448344011 349.762490220567 791.1546018708341 467.55508482565523 908.9471964759223 508.11432778922233z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float1"
//         />
//         <path
//           d="M1179.3569590037064 490.34987812910964L1295.1546908338971 539.503099065219 1344.3079117700065 423.7053672350281 1228.5101799398158 374.55214629891884z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M678.6545895767308 221.99824876247678L747.9278015210969 91.71428571916198 617.6438384777821 22.44107377479594 548.370626533416 152.72503681811074z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float3"
//         />
//         <path
//           d="M498.5104417843806 614.3685630144779L442.95422596587775 442.82802055246793 335.4565445735176 558.1051704778375z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float2"
//         />
//         <path
//           d="M99.1693208040048 128.70324158200285L-10.23458114404923 109.41238187377753-29.525440852274556 218.81628382183158 79.87846109577949 238.10714353005687z"
//           fill="rgba(149, 97, 68, 0.4)"
//           className="triangle-float2"
//         />
//       </g>
//       <defs>
//         <mask id="SvgjsMask1045">
//           <rect width="1440" height="560" fill="#ffffff" />
//         </mask>
//         <style>
//           {`
//             @keyframes float1 {
//               0%{transform: translate(0, 0)}
//               50%{transform: translate(-10px, 0)}
//               100%{transform: translate(0, 0)}
//             }

//             .triangle-float1 {
//               animation: float1 5s infinite;
//             }

//             @keyframes float2 {
//               0%{transform: translate(0, 0)}
//               50%{transform: translate(-5px, -5px)}
//               100%{transform: translate(0, 0)}
//             }

//             .triangle-float2 {
//               animation: float2 4s infinite;
//             }

//             @keyframes float3 {
//               0%{transform: translate(0, 0)}
//               50%{transform: translate(0, -10px)}
//               100%{transform: translate(0, 0)}
//             }

//             .triangle-float3 {
//               animation: float3 6s infinite;
//             }
//           `}
//         </style>
//       </defs>
//     </svg>
//   </div>
// );

// const WaveBackground = () => (
//   <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//     <div className="relative">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 1440 320"
//         className="w-full transform translate-y-1/2"
//       >
//         <path
//           fill="#a2d9ff"
//           fillOpacity="0.2"
//           d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,261.3C672,267,768,245,864,218.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//         />
//       </svg>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 1440 320"
//         className="w-full absolute top-0 transform translate-y-1/3"
//       >
//         <path
//           fill="#a2d9ff"
//           fillOpacity="0.1"
//           d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,261.3C672,267,768,245,864,218.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//         />
//       </svg>
//     </div>
//   </div>
// );

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
    <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-24 relative">
        {/* Header section - Keep exactly the same */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 md:gap-6 mb-8 md:mb-20">
          <div className="space-y-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-[#956144] opacity-10 rotate-2 rounded-lg" />
              <div className="relative px-3 md:px-4 py-1.5 bg-white rounded-lg text-xs md:text-sm text-[#956144] font-medium border border-[#956144]/20">
                MENTAL HEALTH AT ANY AGE
              </div>
            </div>
            <Image
              src="/hearttext.png"
              alt="Decorative image"
              width={50}
              height={50}
              className="absolute -rotate-12 -top-[20px] right-8 sm:right-[1040px] z-0 opacity-100"
            />

            <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2D2D2D]">
              <span className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 bg-[#F5E6E0] rounded-full -z-10" />
              Latest from{" "}
              <span className="text-[#956144] relative">
                S
                <span className="relative">
                  hareYrHeart
                  <svg
                    className="absolute w-full h-[10px] -bottom-2 left-0"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 -5, 100 5"
                      stroke="orange"
                      strokeWidth="4"
                      fill="transparent"
                    />
                  </svg>
                </span>
              </span>
            </h2>

            {/* <p className="text-gray-600 max-w-xl text-base md:text-lg">
              To live your life to the fullest, we&apos;re continuing to find
              ways to prevent mental health problems.
            </p> */}
          </div>
        </div>

        {/* Mobile blog grid with horizontal scroll */}
        <div className="sm:hidden overflow-x-auto pb-4 mx-4">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {data?.map((item, index) => (
              <div key={index} className="w-[280px] flex-shrink-0">
                <BlogCard
                  imgUrl={item?.image}
                  title={item?.title}
                  totalViews={item.totalViews}
                  date={formatDate(item.updatedAt)}
                  description={
                    <span
                      className="text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: `${item.content.slice(0, 300)}${
                          item.content.length > 100 ? "..." : ""
                        }`,
                      }}
                    />
                  }
                  redirectTo={`/blogs/${generateSlug(item.title, item._id)}`}
                  index={index}
                  createdAt={item.createdAt}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop blog grid - Keep exactly the same */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 md:gap-8 mx-4 sm:mx-8 md:mx-16 lg:mx-2">
          {data?.map((item, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 bg-[#F5E6E0] rounded-3xl opacity-0 transition-opacity -z-10" />
              <BlogCard
                imgUrl={item?.image}
                title={item?.title}
                totalViews={item.totalViews}
                date={formatDate(item.updatedAt)}
                description={
                  <span
                    className="text-gray-600 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: `${item.content.slice(0, 300)}${
                        item.content.length > 100 ? "..." : ""
                      }`,
                    }}
                  />
                }
                redirectTo={`/blogs/${generateSlug(item.title, item._id)}`}
                index={index}
                createdAt={item.createdAt}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16 ml-20">
          <Link
            href="/blogs"
            className="group w-full sm:w-auto mx-4 sm:mx-8 md:mx-16 lg:mx-0"
          >
            <button className="px-6 py-3 bg-[#D2691E] text-white rounded-xl hover:bg-[#A0522D] transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
              All News
              <ChevronRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
