/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    domains: ["raw.githubusercontent.com"],
  },
  assetPrefix: "./",
};

module.exports = nextConfig;
