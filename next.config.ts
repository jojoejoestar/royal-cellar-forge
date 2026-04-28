import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap", "@gsap/react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1280, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384, 512, 1024, 1200, 1280],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
