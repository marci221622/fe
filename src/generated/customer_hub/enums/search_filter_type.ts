/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип фильтра */
export enum SearchFilterType {
  /** SEARCH_FILTER_TYPE_UNSPECIFIED - тип фильтра не задан */
  SEARCH_FILTER_TYPE_UNSPECIFIED = 0,
  /** SEARCH_FILTER_TYPE_MULTIPLE - тип с возможностью выбора нескольких значений */
  SEARCH_FILTER_TYPE_MULTIPLE = 1,
  /** SEARCH_FILTER_TYPE_SWITCHABLE - тип вкл/выкл, у него не заполняется поле values в SearchFilter (наличие его в запросе уже показывает, что он выбран) */
  SEARCH_FILTER_TYPE_SWITCHABLE = 2,
  /** SEARCH_FILTER_TYPE_RANGE - тип RANGE со значениями min и max, у него не заполняется поле values в SearchFilter, а заполняются range и selected_range */
  SEARCH_FILTER_TYPE_RANGE = 3,
  UNRECOGNIZED = -1,
}

export function searchFilterTypeFromJSON(object: any): SearchFilterType {
  switch (object) {
    case 0:
    case "SEARCH_FILTER_TYPE_UNSPECIFIED":
      return SearchFilterType.SEARCH_FILTER_TYPE_UNSPECIFIED;
    case 1:
    case "SEARCH_FILTER_TYPE_MULTIPLE":
      return SearchFilterType.SEARCH_FILTER_TYPE_MULTIPLE;
    case 2:
    case "SEARCH_FILTER_TYPE_SWITCHABLE":
      return SearchFilterType.SEARCH_FILTER_TYPE_SWITCHABLE;
    case 3:
    case "SEARCH_FILTER_TYPE_RANGE":
      return SearchFilterType.SEARCH_FILTER_TYPE_RANGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SearchFilterType.UNRECOGNIZED;
  }
}

export function searchFilterTypeToJSON(object: SearchFilterType): string {
  switch (object) {
    case SearchFilterType.SEARCH_FILTER_TYPE_UNSPECIFIED:
      return "SEARCH_FILTER_TYPE_UNSPECIFIED";
    case SearchFilterType.SEARCH_FILTER_TYPE_MULTIPLE:
      return "SEARCH_FILTER_TYPE_MULTIPLE";
    case SearchFilterType.SEARCH_FILTER_TYPE_SWITCHABLE:
      return "SEARCH_FILTER_TYPE_SWITCHABLE";
    case SearchFilterType.SEARCH_FILTER_TYPE_RANGE:
      return "SEARCH_FILTER_TYPE_RANGE";
    case SearchFilterType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
