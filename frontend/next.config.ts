import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cinestar.com.vn", "api-website.cinestar.com.vn", "example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-website.cinestar.com.vn",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "media.vov.vn",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
