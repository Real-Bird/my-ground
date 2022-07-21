/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = removeImports({
  ...nextConfig,
});
