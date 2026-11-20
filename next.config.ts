
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kaka-restaurant",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
