import Image from "next/image";
import Hero from "./sections/Hero";
import GetHelp from "./sections/GetHelp";
import Services from "./sections/Services";
import WhyUs from "./sections/WhyUs";
import Testimonials from "./sections/Testimonials";
import BlogSection from "./sections/BlogSection";
import NewsSection from "./sections/NewsSection";
import CoursePage from "./sections/CoursePage";

export default function Home() {
  return (
    <>
      <Hero />
      <GetHelp />
      <Services />
      <WhyUs />
      <CoursePage />
      <BlogSection />
      <Testimonials />
      {/* <NewsSection /> */}
    </>
  );
}
