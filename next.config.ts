import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // @ts-ignore - Exists inside runtime engine but lacks standard d.ts typings
    appIsrStatus: false,
    buildActivity: false,
  },
  output: 'export',
  basePath: '/GreenByte',
  trailingSlash: true,
};

export default nextConfig;
