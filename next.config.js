/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/template-nextjs-blog' : '',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  publicRuntimeConfig: {
    assetPrefix: isProd ? '/template-nextjs-blog' : '',
  },
};

const withMarkdoc = require('@markdoc/next.js');
module.exports = withMarkdoc({ mode: 'static' })(nextConfig);
