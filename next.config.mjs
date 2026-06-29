/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "gaps-verefications.s3.amazonaws.com"},
            {hostname: "img.youtube.com"},
        ],
      },
    experimental: {
        serverActions: {
            bodySizeLimit: "6mb",
        },
    },
};

export default nextConfig;
