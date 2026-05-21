
/** @type {import('next').NextConfig} */
const nextConfig = {
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
