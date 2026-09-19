import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/s2",
        destination: "/S2",
      },
    ];
  },
};

export default nextConfig;
