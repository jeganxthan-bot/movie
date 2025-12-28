/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    allowedDevOrigins: [
      'http://localhost:3000', // your dev origin
      'http://127.0.0.1:3000', // optional
    ],
  },
  images: {
    domains: [
      'm.media-amazon.com', 
      'staging.strem.io',
      'img10.hotstar.com',
      'static.wikia.nocookie.net',
      'images.metahub.space',
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
