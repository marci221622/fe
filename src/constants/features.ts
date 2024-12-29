export const featuresFlagsDev = {
  productWidgets: {
    key: '@collect/product-widgets',
    // Включаем полностью https://jira.int.tsum.com/browse/POWEB-439
    enabled: true,
  },
};

export type FeatureDevKey = keyof typeof featuresFlagsDev;
