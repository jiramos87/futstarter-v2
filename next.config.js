/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disable TypeScript support
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'futstarter-players.s3.sa-east-1.amazonaws.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
