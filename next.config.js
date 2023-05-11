/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_REACT_APP_API_URL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  },
};

module.exports = nextConfig;
