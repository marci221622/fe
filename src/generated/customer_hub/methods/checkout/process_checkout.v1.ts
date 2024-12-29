/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CheckoutData } from "../../entities/checkout_data.v1";
import { ThreeDSecureData } from "../../entities/payment.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на исполнение чекаута */
export interface ProcessCheckoutRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Полученная от SDK CloudPayments (для предоплатных заказов) */
  cryptogram?:
    | string
    | undefined;
  /** Идентификатор сохранённой карты (см. payment_service.ListSavedCards) */
  cardId?:
    | string
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  paymentSuccessUrl?:
    | string
    | undefined;
  /** @deprecated */
  paymentFailUrl?: string | undefined;
}

/** Описывает ответ исполнения чекаута */
export interface ProcessCheckoutResponse {
  /** Результат операции */
  result: ProcessCheckoutResponse_Result;
  /** Данные checkout'а */
  checkoutState:
    | CheckoutData
    | undefined;
  /** Данные для 3DS авторизации (заполняется в случае необходимости result: PROCESS_RESULT_3DS_PENDING) */
  threedsData?:
    | ThreeDSecureData
    | undefined;
  /** URl для перехода для проведения 3DS (заполняется в случае необходимости result: PROCESS_RESULT_3DS_PENDING) */
  paymentUrl?:
    | string
    | undefined;
  /** Код созданного заказа. Заполняется при result: PROCESS_RESULT_SUCCESS */
  orderCode?: string | undefined;
}

export enum ProcessCheckoutResponse_Result {
  /** PROCESS_RESULT_UNKNOWN - Значение по умолчанию - не определено */
  PROCESS_RESULT_UNKNOWN = 0,
  /** PROCESS_RESULT_SUCCESS - Заказ размещён; авторизация платежа проведена или не требуется */
  PROCESS_RESULT_SUCCESS = 1,
  /** PROCESS_RESULT_INVALID_STATE - Заказ не размещён; ошибка валидации параметров checkout'а. Подробности в CheckoutData.ValidationResult */
  PROCESS_RESULT_INVALID_STATE = 2,
  /** PROCESS_RESULT_3DS_PENDING - Заказ не размещён; пользователю необходимо пройти 3DS авторизацию (threeds_data будет заполнен) */
  PROCESS_RESULT_3DS_PENDING = 3,
  /** PROCESS_RESULT_PAYMENT_PENDING - Заказ не размещён; ожидание подтверждения оплаты */
  PROCESS_RESULT_PAYMENT_PENDING = 4,
  UNRECOGNIZED = -1,
}

export function processCheckoutResponse_ResultFromJSON(object: any): ProcessCheckoutResponse_Result {
  switch (object) {
    case 0:
    case "PROCESS_RESULT_UNKNOWN":
      return ProcessCheckoutResponse_Result.PROCESS_RESULT_UNKNOWN;
    case 1:
    case "PROCESS_RESULT_SUCCESS":
      return ProcessCheckoutResponse_Result.PROCESS_RESULT_SUCCESS;
    case 2:
    case "PROCESS_RESULT_INVALID_STATE":
      return ProcessCheckoutResponse_Result.PROCESS_RESULT_INVALID_STATE;
    case 3:
    case "PROCESS_RESULT_3DS_PENDING":
      return ProcessCheckoutResponse_Result.PROCESS_RESULT_3DS_PENDING;
    case 4:
    case "PROCESS_RESULT_PAYMENT_PENDING":
      return ProcessCheckoutResponse_Result.PROCESS_RESULT_PAYMENT_PENDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProcessCheckoutResponse_Result.UNRECOGNIZED;
  }
}

export function processCheckoutResponse_ResultToJSON(object: ProcessCheckoutResponse_Result): string {
  switch (object) {
    case ProcessCheckoutResponse_Result.PROCESS_RESULT_UNKNOWN:
      return "PROCESS_RESULT_UNKNOWN";
    case ProcessCheckoutResponse_Result.PROCESS_RESULT_SUCCESS:
      return "PROCESS_RESULT_SUCCESS";
    case ProcessCheckoutResponse_Result.PROCESS_RESULT_INVALID_STATE:
      return "PROCESS_RESULT_INVALID_STATE";
    case ProcessCheckoutResponse_Result.PROCESS_RESULT_3DS_PENDING:
      return "PROCESS_RESULT_3DS_PENDING";
    case ProcessCheckoutResponse_Result.PROCESS_RESULT_PAYMENT_PENDING:
      return "PROCESS_RESULT_PAYMENT_PENDING";
    case ProcessCheckoutResponse_Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseProcessCheckoutRequest(): ProcessCheckoutRequest {
  return {
    sessionData: undefined,
    cryptogram: undefined,
    cardId: undefined,
    paymentSuccessUrl: undefined,
    paymentFailUrl: undefined,
  };
}

export const ProcessCheckoutRequest = {
  encode(message: ProcessCheckoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.cryptogram !== undefined) {
      writer.uint32(34).string(message.cryptogram);
    }
    if (message.cardId !== undefined) {
      writer.uint32(40).int64(message.cardId);
    }
    if (message.paymentSuccessUrl !== undefined) {
      writer.uint32(18).string(message.paymentSuccessUrl);
    }
    if (message.paymentFailUrl !== undefined) {
      writer.uint32(26).string(message.paymentFailUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessCheckoutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessCheckoutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cryptogram = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.cardId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.paymentSuccessUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paymentFailUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessCheckoutRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      cryptogram: isSet(object.cryptogram) ? globalThis.String(object.cryptogram) : undefined,
      cardId: isSet(object.cardId) ? globalThis.String(object.cardId) : undefined,
      paymentSuccessUrl: isSet(object.paymentSuccessUrl) ? globalThis.String(object.paymentSuccessUrl) : undefined,
      paymentFailUrl: isSet(object.paymentFailUrl) ? globalThis.String(object.paymentFailUrl) : undefined,
    };
  },

  toJSON(message: ProcessCheckoutRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.cryptogram !== undefined) {
      obj.cryptogram = message.cryptogram;
    }
    if (message.cardId !== undefined) {
      obj.cardId = message.cardId;
    }
    if (message.paymentSuccessUrl !== undefined) {
      obj.paymentSuccessUrl = message.paymentSuccessUrl;
    }
    if (message.paymentFailUrl !== undefined) {
      obj.paymentFailUrl = message.paymentFailUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessCheckoutRequest>, I>>(base?: I): ProcessCheckoutRequest {
    return ProcessCheckoutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessCheckoutRequest>, I>>(object: I): ProcessCheckoutRequest {
    const message = createBaseProcessCheckoutRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.cryptogram = object.cryptogram ?? undefined;
    message.cardId = object.cardId ?? undefined;
    message.paymentSuccessUrl = object.paymentSuccessUrl ?? undefined;
    message.paymentFailUrl = object.paymentFailUrl ?? undefined;
    return message;
  },
};

function createBaseProcessCheckoutResponse(): ProcessCheckoutResponse {
  return { result: 0, checkoutState: undefined, threedsData: undefined, paymentUrl: undefined, orderCode: undefined };
}

export const ProcessCheckoutResponse = {
  encode(message: ProcessCheckoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.checkoutState !== undefined) {
      CheckoutData.encode(message.checkoutState, writer.uint32(18).fork()).ldelim();
    }
    if (message.threedsData !== undefined) {
      ThreeDSecureData.encode(message.threedsData, writer.uint32(26).fork()).ldelim();
    }
    if (message.paymentUrl !== undefined) {
      writer.uint32(34).string(message.paymentUrl);
    }
    if (message.orderCode !== undefined) {
      writer.uint32(42).string(message.orderCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProcessCheckoutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProcessCheckoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.checkoutState = CheckoutData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.threedsData = ThreeDSecureData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.paymentUrl = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.orderCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProcessCheckoutResponse {
    return {
      result: isSet(object.result) ? processCheckoutResponse_ResultFromJSON(object.result) : 0,
      checkoutState: isSet(object.checkoutState) ? CheckoutData.fromJSON(object.checkoutState) : undefined,
      threedsData: isSet(object.threedsData) ? ThreeDSecureData.fromJSON(object.threedsData) : undefined,
      paymentUrl: isSet(object.paymentUrl) ? globalThis.String(object.paymentUrl) : undefined,
      orderCode: isSet(object.orderCode) ? globalThis.String(object.orderCode) : undefined,
    };
  },

  toJSON(message: ProcessCheckoutResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = processCheckoutResponse_ResultToJSON(message.result);
    }
    if (message.checkoutState !== undefined) {
      obj.checkoutState = CheckoutData.toJSON(message.checkoutState);
    }
    if (message.threedsData !== undefined) {
      obj.threedsData = ThreeDSecureData.toJSON(message.threedsData);
    }
    if (message.paymentUrl !== undefined) {
      obj.paymentUrl = message.paymentUrl;
    }
    if (message.orderCode !== undefined) {
      obj.orderCode = message.orderCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProcessCheckoutResponse>, I>>(base?: I): ProcessCheckoutResponse {
    return ProcessCheckoutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProcessCheckoutResponse>, I>>(object: I): ProcessCheckoutResponse {
    const message = createBaseProcessCheckoutResponse();
    message.result = object.result ?? 0;
    message.checkoutState = (object.checkoutState !== undefined && object.checkoutState !== null)
      ? CheckoutData.fromPartial(object.checkoutState)
      : undefined;
    message.threedsData = (object.threedsData !== undefined && object.threedsData !== null)
      ? ThreeDSecureData.fromPartial(object.threedsData)
      : undefined;
    message.paymentUrl = object.paymentUrl ?? undefined;
    message.orderCode = object.orderCode ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
