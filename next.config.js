/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: 'r-m-hufford/test-blogposts/main/images/**'
      }
    ]
  }
}

module.exports = nextConfig
