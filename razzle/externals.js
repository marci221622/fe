function addExternalModulesToTranspile(webpackOptions) {
  return {
    ...webpackOptions,
    notNodeExternalResMatch: (request, _context) => /swiper(.*)|ssr-window|react-sticky-box|dom7/.test(request),

    babelRule: {
      ...webpackOptions.babelRule,
      include: webpackOptions.babelRule.include.concat([/react-sticky-box/, /ssr-window/, /swiper(.*)/, /dom7/]),
    },
  };
}

module.exports = {
  modifyWebpackOptions({ options: { webpackOptions } }) {
    const next = addExternalModulesToTranspile(webpackOptions);

    return next;
  },
};
