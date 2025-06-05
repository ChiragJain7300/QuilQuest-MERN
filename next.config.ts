import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      // https://ik.imagekit.io/dh6ouqerr/Mayor.png
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // This is not recommended for production, but useful for development
  },
  eslint: {
    ignoreDuringBuilds: true, // This is not recommended for production, but useful for development
  } /* config options here */,
};

export default nextConfig;
