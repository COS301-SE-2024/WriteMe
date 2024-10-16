/* v8 ignore start */
//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

const withPWA = require("@ducanh2912/next-pwa").default({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  dest: "public",
  fallbacks: {
    document: "/offline"
  }
})

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve(__dirname, '../../node_modules/yjs')
    }
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['@tldraw/tldraw']
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'minio.khyalkara.com',
      },
      {
        protocol: 'https',
        hostname: 's3.writeme.co.za',
      },
    ],
  },
  transpilePackages: ["next-auth"],
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withPWA,
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
