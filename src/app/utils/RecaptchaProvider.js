"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { usePathname } from "next/navigation";

const RecaptchaProvider = ({ children }) => {
  const pathname = usePathname();

  // Only show ReCaptcha on sign-in and sign-up pages
  const showRecaptcha = pathname === "/sign-in" || pathname === "/signup";

  if (!showRecaptcha) {
    return children;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaProvider;
