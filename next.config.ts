import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.qiita.com",
      },
      {
        protocol: "https",
        hostname: "zenn.dev",
      },
      {
        protocol: "https",
        hostname: "assets.st-note.com",
      },
      {
        protocol: "https",
        hostname: "qiita-user-contents.imgix.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
