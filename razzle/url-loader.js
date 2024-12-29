// в модулях 3ий по счету (index с 0)
// url loader убрать бейс64
const LOADER_INDEX = 2;

function patchUrlLoader({ config, isNode, isDev }) {
  // eslint-disable-next-line no-param-reassign
  config.module.rules[LOADER_INDEX].use[0].options.limit = false;

  return { config, isNode, isDev };
}

module.exports = { patchUrlLoader };
