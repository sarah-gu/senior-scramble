/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "*.public.blob.vercel-storage.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "snrscramblebucket.s3.amazonaws.com" },
    ],
  },
};

module.exports = nextConfig;
