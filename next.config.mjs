/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "gaps-verefications.s3.amazonaws.com"},
        ],
      },
};

export default nextConfig;