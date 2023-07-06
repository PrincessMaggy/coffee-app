/*  @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images:{
//     loader:'default',
//     path: '/_next/image',
//    },
// };
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    images: {
        domains: ['images.unsplash.com', 'ss3.4sqi.net'],
    },
};
