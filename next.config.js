/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// Set to your repo name if deploying to https://<user>.github.io/<repo>/
// Leave empty for a custom domain or <user>.github.io root.
const repoBase = process.env.PAGES_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Pin the workspace root so Turbopack doesn't infer it from a parent lockfile.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  basePath: isProd ? repoBase : '',
  assetPrefix: isProd && repoBase ? `${repoBase}/` : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
