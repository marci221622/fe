/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип статуса продовца */
export enum SellerLegalEntityType {
  /** NATURAL_PERSON - Физическое лицо */
  NATURAL_PERSON = 0,
  /** LEGAL_ENTITY - Юридическое лицо */
  LEGAL_ENTITY = 1,
  UNRECOGNIZED = -1,
}

export function sellerLegalEntityTypeFromJSON(object: any): SellerLegalEntityType {
  switch (object) {
    case 0:
    case "NATURAL_PERSON":
      return SellerLegalEntityType.NATURAL_PERSON;
    case 1:
    case "LEGAL_ENTITY":
      return SellerLegalEntityType.LEGAL_ENTITY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SellerLegalEntityType.UNRECOGNIZED;
  }
}

export function sellerLegalEntityTypeToJSON(object: SellerLegalEntityType): string {
  switch (object) {
    case SellerLegalEntityType.NATURAL_PERSON:
      return "NATURAL_PERSON";
    case SellerLegalEntityType.LEGAL_ENTITY:
      return "LEGAL_ENTITY";
    case SellerLegalEntityType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
