import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // The alumni "Contribute" page from the old preview now lives on /join.
      { source: "/contribute", destination: "/join#speakers", permanent: true },
      { source: "/puzzles", destination: "/problems", permanent: false },
      { source: "/calendar", destination: "/events", permanent: false },
    ];
  },
};

export default nextConfig;
