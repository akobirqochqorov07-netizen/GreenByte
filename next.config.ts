import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // @ts-ignore - Exists inside runtime engine but lacks standard d.ts typings
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
