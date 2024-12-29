const path = require('path');

const { modifyWebpackOptions } = require('./razzle/externals');
const { addOptimizations } = require('./razzle/optimization');
const { addPlugins } = require('./razzle/plugins');
const { addScss } = require('./razzle/scss');
const { patchUrlLoader } = require('./razzle/url-loader');

function getEntryForWeb(entry, isDev) {
  const { client } = entry;

  const staticEntries = {
    // Доп entry - что бы статику проксировать на nginx
    error500: path.resolve('src/application/entrypoints/error500'),
  };

  if (isDev) {
    return {
      client: [client[0], path.resolve(`src/application/entrypoints/client`)],
    };
  }

  return {
    client: path.resolve('src/application/entrypoints/client'),
    ...staticEntries,
  };
}

const IS_DEV = process?.env?.NODE_ENV === 'development';

const compose = (...funcs) =>
  funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args)),
    arg => arg,
  );

module.exports = {
  options: {
    verbose: IS_DEV,
    enableSourceMaps: IS_DEV,
    buildType: 'iso',
    browserslist: !IS_DEV && ['last 2 version'],
  },
  modifyWebpackOptions,
  modifyWebpackConfig({ env: { target, dev }, webpackConfig }) {
    const transformer = compose(addPlugins, addScss, addOptimizations, patchUrlLoader);
    const { config } = transformer({ config: webpackConfig, isNode: target === 'node', isDev: dev });

    if (target === 'web') {
      const web = {
        ...config,
        entry: getEntryForWeb(config.entry, dev),
      };

      return web;
    }

    return config;
  },
};
