/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
