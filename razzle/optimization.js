module.exports = {
  addOptimizations: ({ config, isNode, isDev }) => {
    if (!isNode) {
      const nextConfig = {
        ...config,

        // Игнорировать ошибки о размере (иначе в CI не соберется билд)
        performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000,
        },

        optimization: {
          splitChunks: {
            cacheGroups: {
              default: false,

              vendor: {
                test: /node_modules/,
                name: 'deps',
                chunks: 'initial',
                reuseExistingChunk: true,
              },

              common: {
                name: 'common',
                chunks: 'all',
                minChunks: 3,
                reuseExistingChunk: true,
              },
            },
          },
        },
      };

      return { config: nextConfig, isNode, isDev };
    }

    return { config, isNode, isDev };
  },
};
