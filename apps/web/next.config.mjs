/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sanity image CDN domain is typically: cdn.sanity.io
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
