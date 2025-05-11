import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    authInterrupts: true,
  },
  images: {
    domains: ["clerk.dev", "img.clerk.com"], // Add the domains from which Clerk serves images
  },
};

module.exports = nextConfig;

export default nextConfig;
