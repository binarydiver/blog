/** @type {import('next').NextConfig} */
import withMarkdoc from '@markdoc/next.js';

// const isEnvProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // assetPrefix: isEnvProd ? '/template-nextjs-blog' : '',
  // basePath: isEnvProd ? '/template-nextjs-blog' : '',
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
