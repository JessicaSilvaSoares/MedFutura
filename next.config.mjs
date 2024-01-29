/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    URL_BASE: process.env.URL_BASE,
    USERNAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD
  }
};

export default nextConfig;
