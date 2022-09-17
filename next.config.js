/** @type {import('next').NextConfig} */
const dedicatedEndPoint = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_DEV
  : 'https://rgsm-dev.infura-ipfs.io';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // set up domain for images
    domains: [dedicatedEndPoint, 'rgsm-dev.infura-ipfs.io'],
  },
};

module.exports = nextConfig;
