/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

export enum CheckoutType {
  /** CHECKOUT_TYPE_USUAL_UNSPECIFIED - Оформление обычного заказа */
  CHECKOUT_TYPE_USUAL_UNSPECIFIED = 0,
  /** CHECKOUT_TYPE_ONE_CLICK - Быстрая покупка */
  CHECKOUT_TYPE_ONE_CLICK = 1,
  /** CHECKOUT_TYPE_CLICK_AND_COLLECT - Покупка в шоу-руме */
  CHECKOUT_TYPE_CLICK_AND_COLLECT = 2,
  /** CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK - Быстрая покупка в шоу-руме */
  CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK = 3,
  UNRECOGNIZED = -1,
}

export function checkoutTypeFromJSON(object: any): CheckoutType {
  switch (object) {
    case 0:
    case "CHECKOUT_TYPE_USUAL_UNSPECIFIED":
      return CheckoutType.CHECKOUT_TYPE_USUAL_UNSPECIFIED;
    case 1:
    case "CHECKOUT_TYPE_ONE_CLICK":
      return CheckoutType.CHECKOUT_TYPE_ONE_CLICK;
    case 2:
    case "CHECKOUT_TYPE_CLICK_AND_COLLECT":
      return CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT;
    case 3:
    case "CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK":
      return CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CheckoutType.UNRECOGNIZED;
  }
}

export function checkoutTypeToJSON(object: CheckoutType): string {
  switch (object) {
    case CheckoutType.CHECKOUT_TYPE_USUAL_UNSPECIFIED:
      return "CHECKOUT_TYPE_USUAL_UNSPECIFIED";
    case CheckoutType.CHECKOUT_TYPE_ONE_CLICK:
      return "CHECKOUT_TYPE_ONE_CLICK";
    case CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT:
      return "CHECKOUT_TYPE_CLICK_AND_COLLECT";
    case CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK:
      return "CHECKOUT_TYPE_CLICK_AND_COLLECT_ONE_CLICK";
    case CheckoutType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
