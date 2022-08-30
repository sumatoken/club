/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AGORA_APP_ID: process.env.AGORA_APP_ID,
  },
};

module.exports = nextConfig;
