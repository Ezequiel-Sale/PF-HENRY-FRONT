/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'web-back.perfectgym.com',
            pathname: '/**',
          },
        ]
    }
};

export default nextConfig;
