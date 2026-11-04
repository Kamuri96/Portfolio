import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // 静的書き出しでは画像最適化サーバーが使えないため
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
