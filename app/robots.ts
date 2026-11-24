import type { MetadataRoute } from "next";

const DOMAINS = {
  sv: "https://www.xvisionkliniken.se",
  da: "https://www.xvisionkliniken.dk",
  en: "https://www.xvisionclinic.com",
} as const;

export default function robots(): MetadataRoute.Robots {
  const lang = process.env.STORYBLOCK_LANG;
  const domain = lang === "da" ? DOMAINS.da : lang === "en" ? DOMAINS.en : DOMAINS.sv;
  const isProduction = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;
  return {
    // Preview builds must never be indexed.
    rules: isProduction
      ? { userAgent: "*", allow: "/", disallow: ["/accounts", "/api/", "/generalsettings"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
