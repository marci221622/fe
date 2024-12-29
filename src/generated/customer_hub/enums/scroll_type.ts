/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип скролла слайдера */
export enum ScrollType {
  /** SIMPLE - Простой */
  SIMPLE = 0,
  /** PAGED - Постраничный */
  PAGED = 1,
  UNRECOGNIZED = -1,
}

export function scrollTypeFromJSON(object: any): ScrollType {
  switch (object) {
    case 0:
    case "SIMPLE":
      return ScrollType.SIMPLE;
    case 1:
    case "PAGED":
      return ScrollType.PAGED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ScrollType.UNRECOGNIZED;
  }
}

export function scrollTypeToJSON(object: ScrollType): string {
  switch (object) {
    case ScrollType.SIMPLE:
      return "SIMPLE";
    case ScrollType.PAGED:
      return "PAGED";
    case ScrollType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
