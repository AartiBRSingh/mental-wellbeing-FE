import "./globals.css";
import { Fraunces } from "next/font/google";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";

const font = Fraunces({ subsets: ["latin"] });

export const metadata = {
  title: "Top Mental Well-Being Program In India | Expert guidance & Support",
  description:
    "Discover our leading mental well-being program designed to enhance your emotional health and resilience. Expert guidance, personalized support, and proven strategies to help you thrive. Start your journey to a healthier mind today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased bg-[#F9F5F2] no-select`}
        // style={{ backgroundImage: "url('/bg-01.svg')" }}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
