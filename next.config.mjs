/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the site can be served from Cloudflare Pages. Time-dependent pages are refreshed by a daily rebuild.
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Build with a single worker to keep peak memory low on constrained machines.
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
