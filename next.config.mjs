/** @type {import('next').NextConfig} */
import withMarkdoc from '@markdoc/next.js';

// const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // assetPrefix: isProd ? '/template-nextjs-blog' : '',
  // basePath: isProd ? '/template-nextjs-blog' : '',
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
