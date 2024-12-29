/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип продовца */
export enum SellerType {
  /** MERCURY - Mercury мода */
  MERCURY = 0,
  /** PRIVATE_SELLER - Частный продавец */
  PRIVATE_SELLER = 1,
  UNRECOGNIZED = -1,
}

export function sellerTypeFromJSON(object: any): SellerType {
  switch (object) {
    case 0:
    case "MERCURY":
      return SellerType.MERCURY;
    case 1:
    case "PRIVATE_SELLER":
      return SellerType.PRIVATE_SELLER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SellerType.UNRECOGNIZED;
  }
}

export function sellerTypeToJSON(object: SellerType): string {
  switch (object) {
    case SellerType.MERCURY:
      return "MERCURY";
    case SellerType.PRIVATE_SELLER:
      return "PRIVATE_SELLER";
    case SellerType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
