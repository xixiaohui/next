import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
    // ⚠️ 忽略构建时的 TypeScript 错误
    ignoreBuildErrors: true,
  },

  images:{
    domains:['compocore.com']
  }
};

export default nextConfig;
