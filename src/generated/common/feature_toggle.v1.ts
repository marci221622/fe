/* eslint-disable */

export const protobufPackage = "utp.common.feature_toggle.v1";

/** FeatureToggle - перечисление фич, которые можно включать/выключать в команде EPSILON */
export enum FeatureToggle {
  /** FEATURE_TOGGLE_UNSPECIFIED - Неизвестное значение */
  FEATURE_TOGGLE_UNSPECIFIED = 0,
  /**
   * FEATURE_TOGGLE_POPULAR_SORT - Включена сортировка по популярности
   * ios 1.20
   * android 1.8
   * web 1.2
   */
  FEATURE_TOGGLE_POPULAR_SORT = 1,
  /**
   * FEATURE_TOGGLE_SECTIONS - Включает секции в каталоге через поле sections
   * ios 1.17
   * android any
   * web any
   */
  FEATURE_TOGGLE_SECTIONS = 2,
  /**
   * FEATURE_TOGGLE_RESERVATION_ITEMS - Включает в выдачу товары только для резервации
   * ios 1.18
   * android 1.8
   * web 1.1.1
   */
  FEATURE_TOGGLE_RESERVATION_ITEMS = 3,
  /**
   * FEATURE_TOGGLE_GENDER_SUGGEST - Включает подсказки по полу
   * ios any
   * android any
   * web any
   */
  FEATURE_TOGGLE_GENDER_SUGGEST = 4,
  /**
   * FEATURE_TOGGLE_HIERARCHICAL_FILTER - Включает иерархический фильтры
   * ios 1.16
   * android any
   * web any
   */
  FEATURE_TOGGLE_HIERARCHICAL_FILTER = 5,
  /**
   * FEATURE_TOGGLE_CHECKOUT_CALCULATE_DELIVERY - Включает расчет стоимости доставки нужной версии
   * ios 1.11
   * android 1.3
   * web 1.1
   */
  FEATURE_TOGGLE_CHECKOUT_CALCULATE_DELIVERY = 6,
  /**
   * FEATURE_TOGGLE_RELATED_ITEMS - Включает выдачу похожих товаров
   * ios 1.0
   * android 1.0
   * web 1.0
   */
  FEATURE_TOGGLE_RELATED_ITEMS = 7,
  /**
   * FEATURE_TOGGLE_RANGE_FILTER - Включает фильтр по диапазону
   * ios any
   * android any
   * web any
   */
  FEATURE_TOGGLE_RANGE_FILTER = 8,
  UNRECOGNIZED = -1,
}

export function featureToggleFromJSON(object: any): FeatureToggle {
  switch (object) {
    case 0:
    case "FEATURE_TOGGLE_UNSPECIFIED":
      return FeatureToggle.FEATURE_TOGGLE_UNSPECIFIED;
    case 1:
    case "FEATURE_TOGGLE_POPULAR_SORT":
      return FeatureToggle.FEATURE_TOGGLE_POPULAR_SORT;
    case 2:
    case "FEATURE_TOGGLE_SECTIONS":
      return FeatureToggle.FEATURE_TOGGLE_SECTIONS;
    case 3:
    case "FEATURE_TOGGLE_RESERVATION_ITEMS":
      return FeatureToggle.FEATURE_TOGGLE_RESERVATION_ITEMS;
    case 4:
    case "FEATURE_TOGGLE_GENDER_SUGGEST":
      return FeatureToggle.FEATURE_TOGGLE_GENDER_SUGGEST;
    case 5:
    case "FEATURE_TOGGLE_HIERARCHICAL_FILTER":
      return FeatureToggle.FEATURE_TOGGLE_HIERARCHICAL_FILTER;
    case 6:
    case "FEATURE_TOGGLE_CHECKOUT_CALCULATE_DELIVERY":
      return FeatureToggle.FEATURE_TOGGLE_CHECKOUT_CALCULATE_DELIVERY;
    case 7:
    case "FEATURE_TOGGLE_RELATED_ITEMS":
      return FeatureToggle.FEATURE_TOGGLE_RELATED_ITEMS;
    case 8:
    case "FEATURE_TOGGLE_RANGE_FILTER":
      return FeatureToggle.FEATURE_TOGGLE_RANGE_FILTER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FeatureToggle.UNRECOGNIZED;
  }
}

export function featureToggleToJSON(object: FeatureToggle): string {
  switch (object) {
    case FeatureToggle.FEATURE_TOGGLE_UNSPECIFIED:
      return "FEATURE_TOGGLE_UNSPECIFIED";
    case FeatureToggle.FEATURE_TOGGLE_POPULAR_SORT:
      return "FEATURE_TOGGLE_POPULAR_SORT";
    case FeatureToggle.FEATURE_TOGGLE_SECTIONS:
      return "FEATURE_TOGGLE_SECTIONS";
    case FeatureToggle.FEATURE_TOGGLE_RESERVATION_ITEMS:
      return "FEATURE_TOGGLE_RESERVATION_ITEMS";
    case FeatureToggle.FEATURE_TOGGLE_GENDER_SUGGEST:
      return "FEATURE_TOGGLE_GENDER_SUGGEST";
    case FeatureToggle.FEATURE_TOGGLE_HIERARCHICAL_FILTER:
      return "FEATURE_TOGGLE_HIERARCHICAL_FILTER";
    case FeatureToggle.FEATURE_TOGGLE_CHECKOUT_CALCULATE_DELIVERY:
      return "FEATURE_TOGGLE_CHECKOUT_CALCULATE_DELIVERY";
    case FeatureToggle.FEATURE_TOGGLE_RELATED_ITEMS:
      return "FEATURE_TOGGLE_RELATED_ITEMS";
    case FeatureToggle.FEATURE_TOGGLE_RANGE_FILTER:
      return "FEATURE_TOGGLE_RANGE_FILTER";
    case FeatureToggle.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
