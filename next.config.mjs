/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  output: 'standalone',
  images: {
    domains: ['furniturezone.pk', 'example.com', 'res.cloudinary.com', 'unsplash.com', 'lh3.googleusercontent.com',
      "bncvidoes.s3.eu-north-1.amazonaws.com",
      "bncmain.s3.eu-north-1.amazonaws.com"
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false,
  },
  
  experimental: {
    optimizePackageImports: ['react-icons/*'],
  },

  compress: true,
  
async headers() {
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
       {
        source: '/:path*\\.(avif|webp|png|jpg|jpeg|svg|gif)',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
    ];
  },
};

export default nextConfig;