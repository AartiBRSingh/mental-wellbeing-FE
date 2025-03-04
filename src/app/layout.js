import "./globals.css";
import { Fraunces } from "next/font/google";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import RecaptchaProvider from "./utils/RecaptchaProvider";
import Script from "next/script";

const font = Fraunces({ subsets: ["latin"] });

export const metadata = {
  title: " Top Mental Health Services In India | Expert Guidance & Support",
  description:
    "Discover our leading mental well-being program designed to enhance your emotional health and resilience. Expert guidance, personalized support, and proven strategies to help you thrive. Start your journey to a healthier mind today!",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KN87CTM7');`,
          }}
        ></Script>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
      </head>
      <body
        className={`${font.className} antialiased bg-[#F9F5F2] no-select`}
        // style={{ backgroundImage: "url('/bg-01.svg')" }}
      >
        <RecaptchaProvider>
          <Navbar />
          {children}
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
