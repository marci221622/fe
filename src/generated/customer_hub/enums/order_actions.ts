/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Действия в приложении, доступные для заказа */
export enum AvailableOrderAction {
  /** AVAILABLE_ORDER_ACTION_UNSPECIFIED - Неопределенно */
  AVAILABLE_ORDER_ACTION_UNSPECIFIED = 0,
  /** AVAILABLE_ORDER_ACTION_RATE - Оценка заказа */
  AVAILABLE_ORDER_ACTION_RATE = 1,
  UNRECOGNIZED = -1,
}

export function availableOrderActionFromJSON(object: any): AvailableOrderAction {
  switch (object) {
    case 0:
    case "AVAILABLE_ORDER_ACTION_UNSPECIFIED":
      return AvailableOrderAction.AVAILABLE_ORDER_ACTION_UNSPECIFIED;
    case 1:
    case "AVAILABLE_ORDER_ACTION_RATE":
      return AvailableOrderAction.AVAILABLE_ORDER_ACTION_RATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AvailableOrderAction.UNRECOGNIZED;
  }
}

export function availableOrderActionToJSON(object: AvailableOrderAction): string {
  switch (object) {
    case AvailableOrderAction.AVAILABLE_ORDER_ACTION_UNSPECIFIED:
      return "AVAILABLE_ORDER_ACTION_UNSPECIFIED";
    case AvailableOrderAction.AVAILABLE_ORDER_ACTION_RATE:
      return "AVAILABLE_ORDER_ACTION_RATE";
    case AvailableOrderAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
