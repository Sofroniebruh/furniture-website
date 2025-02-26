import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1wks9jp83o0yk.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
