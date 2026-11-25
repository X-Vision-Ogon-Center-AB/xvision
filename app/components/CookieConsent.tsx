"use client";
import { useEffect } from "react";
import { siteLang } from "@/lib/routes";

const CookieConsent = () => {
  useEffect(() => {
    const cookieBotWrapper = document.getElementById("CookiebotWrapper");
    if (cookieBotWrapper) {
      const script = document.createElement("script");
      script.id = "CookieDeclaration";
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-culture", siteLang());
      script.src =
        "https://consent.cookiebot.com/d966ab86-14d2-42ab-9df9-ebbffc2988a1/cd.js";

      cookieBotWrapper.appendChild(script);
    }
  }, []);

  return (
    <div id="CookiebotWrapper" className="container px-4 pt-10 py-8"></div>
  );
};

export default CookieConsent;
