import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["quality-generally-muskrat.ngrok-free.app"],

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint during production build
  },

  webpack: (config, { isServer, buildId, dev, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
        }),
        new webpack.NormalModuleReplacementPlugin(
          /node:crypto/,
          (resource: any) => {
            resource.request = resource.request.replace(/^node:/, "");
          }
        )
      );
    }
    return config;
  },
};

export default nextConfig;
