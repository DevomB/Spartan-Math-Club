import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/contribute", destination: "/join", permanent: true },
      { source: "/puzzles", destination: "/problems", permanent: false },
      { source: "/calendar", destination: "/events", permanent: false },
      { source: "/consulting", destination: "/applied-math", permanent: true },
    ];
  },
};

export default nextConfig;
