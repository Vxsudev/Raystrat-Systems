const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // buffer-equal-constant-time v1.0.0 references SlowBuffer which was removed
    // in Node.js v22+. This alias redirects to a compatible polyfill.
    config.resolve.alias['buffer-equal-constant-time'] =
      path.resolve(__dirname, 'patches/buffer-equal-constant-time.js');
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      { source: '/services/leads-hunter-agent', destination: '/systems/demand-acquisition', permanent: true },
      { source: '/services/follow-up-agent', destination: '/systems/follow-through', permanent: true },
      { source: '/services/support-agent', destination: '/systems/frontline-support', permanent: true },
      { source: '/services/operations-agent', destination: '/systems/operations-control', permanent: true },
      { source: '/services/data-command-agent', destination: '/systems/command-intelligence', permanent: true },
      { source: '/services/custom-ai-agent', destination: '/systems/custom-operations', permanent: true },
      { source: '/services', destination: '/systems', permanent: true },
    ];
  },
};

module.exports = nextConfig;
