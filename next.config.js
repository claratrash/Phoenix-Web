/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Erlaube Data URLs für lokale Bilder
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Erlaube inline Data URLs
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Unoptimierte Bilder für Data URLs
    unoptimized: false,
  },
}

module.exports = nextConfig
