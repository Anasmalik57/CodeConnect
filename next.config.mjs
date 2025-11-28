/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // unoptimized: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
