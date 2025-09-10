/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/logos/favicon.ico",
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/logos/logo192.png",
      },
    ];
  },
};

module.exports = nextConfig;
