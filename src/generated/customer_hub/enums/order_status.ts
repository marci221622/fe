/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Статус заказа */
export enum OrderStatus {
  /** ACTIVE - Активный - оплачен, в доставке и т.д. */
  ACTIVE = 0,
  /** FINISHED - Завершенный - отменен, доставлен */
  FINISHED = 1,
  UNRECOGNIZED = -1,
}

export function orderStatusFromJSON(object: any): OrderStatus {
  switch (object) {
    case 0:
    case "ACTIVE":
      return OrderStatus.ACTIVE;
    case 1:
    case "FINISHED":
      return OrderStatus.FINISHED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderStatus.UNRECOGNIZED;
  }
}

export function orderStatusToJSON(object: OrderStatus): string {
  switch (object) {
    case OrderStatus.ACTIVE:
      return "ACTIVE";
    case OrderStatus.FINISHED:
      return "FINISHED";
    case OrderStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
