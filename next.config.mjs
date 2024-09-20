/** @type {import('next').NextConfig} */
import withMarkdoc from '@markdoc/next.js';

// const isEnvProd = process.env.NODE_ENV === 'production';
// const dynamicPath = isEnvProd ? '/template-nextjs-blog' : '';

const nextConfig = {
  // assetPrefix: dynamicPath,
  // basePath: dynamicPath,
  images: {
    unoptimized: true,
  },
  output: 'export',
  reactStrictMode: true,
  ...withMarkdoc({ mode: 'static' })({
    pageExtensions: ['md', 'mdoc', 'jsx', 'tsx'],
  }),
  trailingSlash: true,
};

export default nextConfig;
