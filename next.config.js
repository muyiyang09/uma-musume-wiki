/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/uma-musume-wiki',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
