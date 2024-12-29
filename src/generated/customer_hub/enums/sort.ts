/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип сортировки */
export enum Sort {
  /** SORT_UNSPECIFIED - сортировка не задана, отсортируем так же как и в PRESORTED */
  SORT_UNSPECIFIED = 0,
  /** SORT_PRESORTED - по мерчу */
  SORT_PRESORTED = 1,
  /** SORT_NOVELTY - по дате добавления айтема в каталог, сначала новые */
  SORT_NOVELTY = 2,
  /** SORT_PRICE_ASC - по возрастанию цены */
  SORT_PRICE_ASC = 3,
  /** SORT_PRICE_DESC - по убыванию цены */
  SORT_PRICE_DESC = 4,
  /** SORT_POPULARITY - по популярности */
  SORT_POPULARITY = 5,
  UNRECOGNIZED = -1,
}

export function sortFromJSON(object: any): Sort {
  switch (object) {
    case 0:
    case "SORT_UNSPECIFIED":
      return Sort.SORT_UNSPECIFIED;
    case 1:
    case "SORT_PRESORTED":
      return Sort.SORT_PRESORTED;
    case 2:
    case "SORT_NOVELTY":
      return Sort.SORT_NOVELTY;
    case 3:
    case "SORT_PRICE_ASC":
      return Sort.SORT_PRICE_ASC;
    case 4:
    case "SORT_PRICE_DESC":
      return Sort.SORT_PRICE_DESC;
    case 5:
    case "SORT_POPULARITY":
      return Sort.SORT_POPULARITY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Sort.UNRECOGNIZED;
  }
}

export function sortToJSON(object: Sort): string {
  switch (object) {
    case Sort.SORT_UNSPECIFIED:
      return "SORT_UNSPECIFIED";
    case Sort.SORT_PRESORTED:
      return "SORT_PRESORTED";
    case Sort.SORT_NOVELTY:
      return "SORT_NOVELTY";
    case Sort.SORT_PRICE_ASC:
      return "SORT_PRICE_ASC";
    case Sort.SORT_PRICE_DESC:
      return "SORT_PRICE_DESC";
    case Sort.SORT_POPULARITY:
      return "SORT_POPULARITY";
    case Sort.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
