/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Статус позиции заказа */
export enum OrderLotStatus {
  /** ORDER_LOT_STATUS_UNSPECIFIED - Статус не определён */
  ORDER_LOT_STATUS_UNSPECIFIED = 0,
  /** ORDER_LOT_STATUS_RECEIVED - Успешно доставлено / выкуплено */
  ORDER_LOT_STATUS_RECEIVED = 1,
  /** ORDER_LOT_STATUS_NOT_REDEEMED - Не выкуплено */
  ORDER_LOT_STATUS_NOT_REDEEMED = 2,
  /** ORDER_LOT_STATUS_RETURNED - Возврат */
  ORDER_LOT_STATUS_RETURNED = 3,
  UNRECOGNIZED = -1,
}

export function orderLotStatusFromJSON(object: any): OrderLotStatus {
  switch (object) {
    case 0:
    case "ORDER_LOT_STATUS_UNSPECIFIED":
      return OrderLotStatus.ORDER_LOT_STATUS_UNSPECIFIED;
    case 1:
    case "ORDER_LOT_STATUS_RECEIVED":
      return OrderLotStatus.ORDER_LOT_STATUS_RECEIVED;
    case 2:
    case "ORDER_LOT_STATUS_NOT_REDEEMED":
      return OrderLotStatus.ORDER_LOT_STATUS_NOT_REDEEMED;
    case 3:
    case "ORDER_LOT_STATUS_RETURNED":
      return OrderLotStatus.ORDER_LOT_STATUS_RETURNED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderLotStatus.UNRECOGNIZED;
  }
}

export function orderLotStatusToJSON(object: OrderLotStatus): string {
  switch (object) {
    case OrderLotStatus.ORDER_LOT_STATUS_UNSPECIFIED:
      return "ORDER_LOT_STATUS_UNSPECIFIED";
    case OrderLotStatus.ORDER_LOT_STATUS_RECEIVED:
      return "ORDER_LOT_STATUS_RECEIVED";
    case OrderLotStatus.ORDER_LOT_STATUS_NOT_REDEEMED:
      return "ORDER_LOT_STATUS_NOT_REDEEMED";
    case OrderLotStatus.ORDER_LOT_STATUS_RETURNED:
      return "ORDER_LOT_STATUS_RETURNED";
    case OrderLotStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
