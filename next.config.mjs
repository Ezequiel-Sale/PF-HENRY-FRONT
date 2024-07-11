/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'web-back.perfectgym.com',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '/dadwg3dgb/**',
          },
      ],
  }
};

export default nextConfig;
