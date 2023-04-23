/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  excludes: ["prisma/seed.ts"],
};

module.exports = removeImports({
  ...nextConfig,
});
