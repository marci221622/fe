/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/**
 * Действия в приложении, доступные для товара
 * см. utp.catalog_read_service.v1.AvailableAction
 */
export enum AvailableAction {
  /** AVAILABLE_ACTION_UNSPECIFIED - Неопределено */
  AVAILABLE_ACTION_UNSPECIFIED = 0,
  /** AVAILABLE_ACTION_BUY - Покупка товара в приложении (в т.ч. OneClick) */
  AVAILABLE_ACTION_BUY = 1,
  /** AVAILABLE_ACTION_COLLECT - Бронирование товара для выкупа в ПВЗ */
  AVAILABLE_ACTION_COLLECT = 2,
  UNRECOGNIZED = -1,
}

export function availableActionFromJSON(object: any): AvailableAction {
  switch (object) {
    case 0:
    case "AVAILABLE_ACTION_UNSPECIFIED":
      return AvailableAction.AVAILABLE_ACTION_UNSPECIFIED;
    case 1:
    case "AVAILABLE_ACTION_BUY":
      return AvailableAction.AVAILABLE_ACTION_BUY;
    case 2:
    case "AVAILABLE_ACTION_COLLECT":
      return AvailableAction.AVAILABLE_ACTION_COLLECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AvailableAction.UNRECOGNIZED;
  }
}

export function availableActionToJSON(object: AvailableAction): string {
  switch (object) {
    case AvailableAction.AVAILABLE_ACTION_UNSPECIFIED:
      return "AVAILABLE_ACTION_UNSPECIFIED";
    case AvailableAction.AVAILABLE_ACTION_BUY:
      return "AVAILABLE_ACTION_BUY";
    case AvailableAction.AVAILABLE_ACTION_COLLECT:
      return "AVAILABLE_ACTION_COLLECT";
    case AvailableAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
