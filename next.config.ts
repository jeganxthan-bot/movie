/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "staging.strem.io" },
      { protocol: "https", hostname: "img10.hotstar.com" },
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      { protocol: "https", hostname: "images.metahub.space" },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
