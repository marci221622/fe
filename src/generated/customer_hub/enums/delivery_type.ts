/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип доставки */
export enum DeliveryType {
  /** DELIVERY_TYPE_UNSPECIFIED - Не определено */
  DELIVERY_TYPE_UNSPECIFIED = 0,
  /** DELIVERY_TYPE_ADDRESS - Доставка адресату */
  DELIVERY_TYPE_ADDRESS = 1,
  /** DELIVERY_TYPE_PICK_UP_POINT - Доставка в ПВЗ */
  DELIVERY_TYPE_PICK_UP_POINT = 2,
  UNRECOGNIZED = -1,
}

export function deliveryTypeFromJSON(object: any): DeliveryType {
  switch (object) {
    case 0:
    case "DELIVERY_TYPE_UNSPECIFIED":
      return DeliveryType.DELIVERY_TYPE_UNSPECIFIED;
    case 1:
    case "DELIVERY_TYPE_ADDRESS":
      return DeliveryType.DELIVERY_TYPE_ADDRESS;
    case 2:
    case "DELIVERY_TYPE_PICK_UP_POINT":
      return DeliveryType.DELIVERY_TYPE_PICK_UP_POINT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DeliveryType.UNRECOGNIZED;
  }
}

export function deliveryTypeToJSON(object: DeliveryType): string {
  switch (object) {
    case DeliveryType.DELIVERY_TYPE_UNSPECIFIED:
      return "DELIVERY_TYPE_UNSPECIFIED";
    case DeliveryType.DELIVERY_TYPE_ADDRESS:
      return "DELIVERY_TYPE_ADDRESS";
    case DeliveryType.DELIVERY_TYPE_PICK_UP_POINT:
      return "DELIVERY_TYPE_PICK_UP_POINT";
    case DeliveryType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
