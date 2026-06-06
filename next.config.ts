import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "promptgod.pro" }],
        destination: "https://copymuse.digital/prompt/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "aicaption.id" }],
        destination: "https://copymuse.digital/caption/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "aicaption.pro" }],
        destination: "https://copymuse.digital/caption/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
