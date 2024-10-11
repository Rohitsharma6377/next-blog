/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/public/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;