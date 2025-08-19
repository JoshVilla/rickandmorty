/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rickandmortyapi.com"], // ✅ allow this host
  },
};

module.exports = nextConfig;
