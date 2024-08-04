/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_APP_URL: process.env.BASE_APP_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'melanc0ng.web.app',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
