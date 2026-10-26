import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The nonprofit's legal name is "From Survivor to Soft": keep old links working
  async redirects() {
    return [
      { source: "/from-survival-to-soft/:path*", destination: "/from-survivor-to-soft/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
