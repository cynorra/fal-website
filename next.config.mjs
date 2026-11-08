/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "assets.aceternity.com"],
  },
  experimental: {
    // Build with a single worker to keep peak memory low on constrained machines.
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
