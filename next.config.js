/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
    domains: ["raw.githubusercontent.com"],
  },
  assetPrefix: "./",
};

module.exports = nextConfig;
