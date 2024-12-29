/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Метод платежа */
export enum PaymentMethodCode {
  /** PAYMENT_METHOD_CARD_UNSPECIFIED - Не установлен, по-умолчанию картой */
  PAYMENT_METHOD_CARD_UNSPECIFIED = 0,
  /** PAYMENT_METHOD_CODE_CLOUD_PAYMENTS - Оплата через CloudPayments */
  PAYMENT_METHOD_CODE_CLOUD_PAYMENTS = 1,
  UNRECOGNIZED = -1,
}

export function paymentMethodCodeFromJSON(object: any): PaymentMethodCode {
  switch (object) {
    case 0:
    case "PAYMENT_METHOD_CARD_UNSPECIFIED":
      return PaymentMethodCode.PAYMENT_METHOD_CARD_UNSPECIFIED;
    case 1:
    case "PAYMENT_METHOD_CODE_CLOUD_PAYMENTS":
      return PaymentMethodCode.PAYMENT_METHOD_CODE_CLOUD_PAYMENTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PaymentMethodCode.UNRECOGNIZED;
  }
}

export function paymentMethodCodeToJSON(object: PaymentMethodCode): string {
  switch (object) {
    case PaymentMethodCode.PAYMENT_METHOD_CARD_UNSPECIFIED:
      return "PAYMENT_METHOD_CARD_UNSPECIFIED";
    case PaymentMethodCode.PAYMENT_METHOD_CODE_CLOUD_PAYMENTS:
      return "PAYMENT_METHOD_CODE_CLOUD_PAYMENTS";
    case PaymentMethodCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Статус транзакции */
export enum TransactionStatus {
  /** TRANSACTION_STATUS_UNSPECIFIED - Неизвестный */
  TRANSACTION_STATUS_UNSPECIFIED = 0,
  /** TRANSACTION_STATUS_STARTED - Транзакция начата */
  TRANSACTION_STATUS_STARTED = 1,
  /** TRANSACTION_STATUS_PAID - Транзакция оплачена */
  TRANSACTION_STATUS_PAID = 2,
  /** TRANSACTION_STATUS_COMMITTED - Транзакция отправлена */
  TRANSACTION_STATUS_COMMITTED = 3,
  /** TRANSACTION_STATUS_ROLLED_BACK - Транзакция откатана */
  TRANSACTION_STATUS_ROLLED_BACK = 4,
  /** TRANSACTION_STATUS_NOT_ACTIVE - Транзакция не активна */
  TRANSACTION_STATUS_NOT_ACTIVE = 5,
  /** TRANSACTION_STATUS_CANCELLED - Транзация отменена */
  TRANSACTION_STATUS_CANCELLED = 6,
  /** TRANSACTION_STATUS_DEACTIVATED - Транзакция деактиварована */
  TRANSACTION_STATUS_DEACTIVATED = 7,
  UNRECOGNIZED = -1,
}

export function transactionStatusFromJSON(object: any): TransactionStatus {
  switch (object) {
    case 0:
    case "TRANSACTION_STATUS_UNSPECIFIED":
      return TransactionStatus.TRANSACTION_STATUS_UNSPECIFIED;
    case 1:
    case "TRANSACTION_STATUS_STARTED":
      return TransactionStatus.TRANSACTION_STATUS_STARTED;
    case 2:
    case "TRANSACTION_STATUS_PAID":
      return TransactionStatus.TRANSACTION_STATUS_PAID;
    case 3:
    case "TRANSACTION_STATUS_COMMITTED":
      return TransactionStatus.TRANSACTION_STATUS_COMMITTED;
    case 4:
    case "TRANSACTION_STATUS_ROLLED_BACK":
      return TransactionStatus.TRANSACTION_STATUS_ROLLED_BACK;
    case 5:
    case "TRANSACTION_STATUS_NOT_ACTIVE":
      return TransactionStatus.TRANSACTION_STATUS_NOT_ACTIVE;
    case 6:
    case "TRANSACTION_STATUS_CANCELLED":
      return TransactionStatus.TRANSACTION_STATUS_CANCELLED;
    case 7:
    case "TRANSACTION_STATUS_DEACTIVATED":
      return TransactionStatus.TRANSACTION_STATUS_DEACTIVATED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TransactionStatus.UNRECOGNIZED;
  }
}

export function transactionStatusToJSON(object: TransactionStatus): string {
  switch (object) {
    case TransactionStatus.TRANSACTION_STATUS_UNSPECIFIED:
      return "TRANSACTION_STATUS_UNSPECIFIED";
    case TransactionStatus.TRANSACTION_STATUS_STARTED:
      return "TRANSACTION_STATUS_STARTED";
    case TransactionStatus.TRANSACTION_STATUS_PAID:
      return "TRANSACTION_STATUS_PAID";
    case TransactionStatus.TRANSACTION_STATUS_COMMITTED:
      return "TRANSACTION_STATUS_COMMITTED";
    case TransactionStatus.TRANSACTION_STATUS_ROLLED_BACK:
      return "TRANSACTION_STATUS_ROLLED_BACK";
    case TransactionStatus.TRANSACTION_STATUS_NOT_ACTIVE:
      return "TRANSACTION_STATUS_NOT_ACTIVE";
    case TransactionStatus.TRANSACTION_STATUS_CANCELLED:
      return "TRANSACTION_STATUS_CANCELLED";
    case TransactionStatus.TRANSACTION_STATUS_DEACTIVATED:
      return "TRANSACTION_STATUS_DEACTIVATED";
    case TransactionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
