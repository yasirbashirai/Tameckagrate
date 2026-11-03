import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds the upload-anywhere version for shared hosting (see scripts/build-deploy.sh).
// It uses its own build folder so it never collides with a running `next dev`.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      distDir: ".next-export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      // The nonprofit's legal name is "From Survivor to Soft": keep old links working
      // (the static build does this in deploy/php/.htaccess instead)
      async redirects() {
        return [
          { source: "/from-survival-to-soft/:path*", destination: "/from-survivor-to-soft/:path*", permanent: true },
        ];
      },
    };

export default nextConfig;
