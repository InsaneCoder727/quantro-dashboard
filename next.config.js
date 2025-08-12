/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Prevent build-time API calls
  experimental: {
    esmExternals: false,
  },
  // Optimize for Vercel
  output: 'standalone',
}

module.exports = nextConfig
