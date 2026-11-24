/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets client components (menu, footer) build links for the right site.
  env: {
    NEXT_PUBLIC_SITE_LANG: process.env.STORYBLOCK_LANG || "sv",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
