/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
};

module.exports = nextConfig;
