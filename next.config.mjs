/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "asba-verefications.s3.amazonaws.com"},
        ],
      },
};

export default nextConfig;