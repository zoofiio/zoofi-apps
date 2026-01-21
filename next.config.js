const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
console.info('BASE_PATH', basePath)
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
}

module.exports = nextConfig
