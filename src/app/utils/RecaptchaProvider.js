"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RecaptchaProvider = ({ children }) => {
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
