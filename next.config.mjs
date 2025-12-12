/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "pub-7d6509f6e55c4ee5a7db3beb1ed86e0c.r2.dev",
        port : "",
        protocol : "https",
        pathname : "/**"
      },
    ],
  },
};

export default nextConfig;
