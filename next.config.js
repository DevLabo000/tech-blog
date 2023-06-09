/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // 圧縮無効
          },
        },
      ],
    });
    return config;
  },
  images: {
    unoptimized: false,
    disableStaticImages: true, // importした画像の型定義設定を無効にする
    domains: [
      'storage.googleapis.com',
      'horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app',
      'devlabo-hk.com',
      'localhost',
    ],
  },
};

module.exports = nextConfig;
