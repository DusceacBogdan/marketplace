/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns takes an array of configuration objects
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // You can add optional 'port' and 'pathname' properties if needed
      },
      {
        protocol: "https",
        hostname: "assets.sunglasshut.com",
        // You can add optional 'port' and 'pathname' properties if needed
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        // You can add optional 'port' and 'pathname' properties if needed
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  redirects: async () => [
    { source: "/", destination: "/home", permanent: true },
  ],
};

export default nextConfig;
