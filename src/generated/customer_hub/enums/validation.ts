/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип валидации для чекаута */
export enum ValidationResult {
  /** VALIDATION_RESULT_UNKNOWN - Валидация не производилась */
  VALIDATION_RESULT_UNKNOWN = 0,
  /** VALIDATION_RESULT_VALID - Успешная валидация */
  VALIDATION_RESULT_VALID = 1,
  /** VALIDATION_RESULT_INVALID_CART - Не верные параметры корзины (изменилось наличие и пр.) */
  VALIDATION_RESULT_INVALID_CART = 10,
  /** VALIDATION_RESULT_INVALID_DELIVERY - Не верные параметры доставки (неактуальный план и пр.) */
  VALIDATION_RESULT_INVALID_DELIVERY = 11,
  /** VALIDATION_RESULT_PAYMENT_ERROR - Не прошла оплата */
  VALIDATION_RESULT_PAYMENT_ERROR = 12,
  /** VALIDATION_RESULT_ORDER_ERROR - Не удалось создать заказ */
  VALIDATION_RESULT_ORDER_ERROR = 13,
  /** VALIDATION_RESULT_ERROR - Валидация не проведена из-за ошибки */
  VALIDATION_RESULT_ERROR = 999,
  UNRECOGNIZED = -1,
}

export function validationResultFromJSON(object: any): ValidationResult {
  switch (object) {
    case 0:
    case "VALIDATION_RESULT_UNKNOWN":
      return ValidationResult.VALIDATION_RESULT_UNKNOWN;
    case 1:
    case "VALIDATION_RESULT_VALID":
      return ValidationResult.VALIDATION_RESULT_VALID;
    case 10:
    case "VALIDATION_RESULT_INVALID_CART":
      return ValidationResult.VALIDATION_RESULT_INVALID_CART;
    case 11:
    case "VALIDATION_RESULT_INVALID_DELIVERY":
      return ValidationResult.VALIDATION_RESULT_INVALID_DELIVERY;
    case 12:
    case "VALIDATION_RESULT_PAYMENT_ERROR":
      return ValidationResult.VALIDATION_RESULT_PAYMENT_ERROR;
    case 13:
    case "VALIDATION_RESULT_ORDER_ERROR":
      return ValidationResult.VALIDATION_RESULT_ORDER_ERROR;
    case 999:
    case "VALIDATION_RESULT_ERROR":
      return ValidationResult.VALIDATION_RESULT_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidationResult.UNRECOGNIZED;
  }
}

export function validationResultToJSON(object: ValidationResult): string {
  switch (object) {
    case ValidationResult.VALIDATION_RESULT_UNKNOWN:
      return "VALIDATION_RESULT_UNKNOWN";
    case ValidationResult.VALIDATION_RESULT_VALID:
      return "VALIDATION_RESULT_VALID";
    case ValidationResult.VALIDATION_RESULT_INVALID_CART:
      return "VALIDATION_RESULT_INVALID_CART";
    case ValidationResult.VALIDATION_RESULT_INVALID_DELIVERY:
      return "VALIDATION_RESULT_INVALID_DELIVERY";
    case ValidationResult.VALIDATION_RESULT_PAYMENT_ERROR:
      return "VALIDATION_RESULT_PAYMENT_ERROR";
    case ValidationResult.VALIDATION_RESULT_ORDER_ERROR:
      return "VALIDATION_RESULT_ORDER_ERROR";
    case ValidationResult.VALIDATION_RESULT_ERROR:
      return "VALIDATION_RESULT_ERROR";
    case ValidationResult.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
