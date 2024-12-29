const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function addScss({ config, isNode, isDev }) {
  config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: [
      (isDev && !isNode && 'style-loader') ||
        (!isNode &&
          !isDev && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          }),
      {
        loader: 'css-loader',
        options: {
          sourceMap: false,
          esModule: false,
          modules: {
            exportOnlyLocals: isNode,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: ['postcss-preset-env', 'autoprefixer'],
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false,
        },
      },
    ].filter(Boolean),
  });

  return { config, isNode, isDev };
}

module.exports = { addScss };
