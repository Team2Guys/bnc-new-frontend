/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,

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
      optimizePackageImports: ['react-icons/*', 'antd'],
  },
};

export default nextConfig;