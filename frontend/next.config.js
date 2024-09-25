/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_EXT_API_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_EXT_API_HOSTNAME,
        port: process.env.NEXT_PUBLIC_EXT_API_PORT,
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
