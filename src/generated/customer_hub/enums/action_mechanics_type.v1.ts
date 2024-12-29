/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип механики промо-акции */
export enum ActionMechanicsType {
  /** ACTION_MECHANICS_TYPE_UNSPECIFIED - Не установлен */
  ACTION_MECHANICS_TYPE_UNSPECIFIED = 0,
  /** ACTION_MECHANICS_TYPE_COUPON - Промо-код */
  ACTION_MECHANICS_TYPE_COUPON = 1,
  /** ACTION_MECHANICS_TYPE_DISCOUNT - Скидка по условиям промо-акции */
  ACTION_MECHANICS_TYPE_DISCOUNT = 2,
  UNRECOGNIZED = -1,
}

export function actionMechanicsTypeFromJSON(object: any): ActionMechanicsType {
  switch (object) {
    case 0:
    case "ACTION_MECHANICS_TYPE_UNSPECIFIED":
      return ActionMechanicsType.ACTION_MECHANICS_TYPE_UNSPECIFIED;
    case 1:
    case "ACTION_MECHANICS_TYPE_COUPON":
      return ActionMechanicsType.ACTION_MECHANICS_TYPE_COUPON;
    case 2:
    case "ACTION_MECHANICS_TYPE_DISCOUNT":
      return ActionMechanicsType.ACTION_MECHANICS_TYPE_DISCOUNT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionMechanicsType.UNRECOGNIZED;
  }
}

export function actionMechanicsTypeToJSON(object: ActionMechanicsType): string {
  switch (object) {
    case ActionMechanicsType.ACTION_MECHANICS_TYPE_UNSPECIFIED:
      return "ACTION_MECHANICS_TYPE_UNSPECIFIED";
    case ActionMechanicsType.ACTION_MECHANICS_TYPE_COUPON:
      return "ACTION_MECHANICS_TYPE_COUPON";
    case ActionMechanicsType.ACTION_MECHANICS_TYPE_DISCOUNT:
      return "ACTION_MECHANICS_TYPE_DISCOUNT";
    case ActionMechanicsType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
