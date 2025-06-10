import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [
      ['next-font-loaders', {}]
    ]
  }
}