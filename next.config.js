const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
console.info('BASE_PATH', basePath)
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
}

module.exports = nextConfig
