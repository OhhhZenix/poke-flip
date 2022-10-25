/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
    domains: ["raw.githubusercontent.com"],
  },
  basePath: "/nextjs-pages",
  assetPrefix: "/nextjs-pages",
};

module.exports = nextConfig;
