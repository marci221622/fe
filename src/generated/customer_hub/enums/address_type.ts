/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип адреса */
export enum AddressType {
  /** ADDRESS_TYPE_UNSPECIFIED - Адрес не установлен */
  ADDRESS_TYPE_UNSPECIFIED = 0,
  UNRECOGNIZED = -1,
}

export function addressTypeFromJSON(object: any): AddressType {
  switch (object) {
    case 0:
    case "ADDRESS_TYPE_UNSPECIFIED":
      return AddressType.ADDRESS_TYPE_UNSPECIFIED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AddressType.UNRECOGNIZED;
  }
}

export function addressTypeToJSON(object: AddressType): string {
  switch (object) {
    case AddressType.ADDRESS_TYPE_UNSPECIFIED:
      return "ADDRESS_TYPE_UNSPECIFIED";
    case AddressType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
