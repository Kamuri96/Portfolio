import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Portfolio" : "",
  trailingSlash: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.qiita.com" },
      { protocol: "https", hostname: "zenn.dev" },
      { protocol: "https", hostname: "assets.st-note.com" },
      { protocol: "https", hostname: "qiita-user-contents.imgix.net" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    loader: "custom",
    loaderFile: "src/imageLoader.ts",
  },
  devIndicators: false,
};

export default nextConfig;
