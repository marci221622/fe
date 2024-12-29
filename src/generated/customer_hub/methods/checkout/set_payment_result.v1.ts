/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CheckoutData } from "../../entities/checkout_data.v1";
import { TransactionData } from "../../entities/payment.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на завершение 3DS и оформление заказа */
export interface SetPaymentResultRequest {
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
  paRes: string;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  paymentResult: TransactionData | undefined;
}

/** Описывает результат оформления заказа */
export interface SetPaymentResultResponse {
  /** Код созданного заказа */
  orderCode: string;
  /**
   * Данные чекаута. Содержит только выкупленные позиции и подтверждённый план доставки.
   * Для обычной корзины невыкупленные позиции переносятся в новую сессию с тем же кодом.
   */
  checkoutData: CheckoutData | undefined;
}

function createBaseSetPaymentResultRequest(): SetPaymentResultRequest {
  return { sessionData: undefined, paRes: "", paymentResult: undefined };
}

export const SetPaymentResultRequest = {
  encode(message: SetPaymentResultRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.paRes !== "") {
      writer.uint32(26).string(message.paRes);
    }
    if (message.paymentResult !== undefined) {
      TransactionData.encode(message.paymentResult, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPaymentResultRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPaymentResultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paRes = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.paymentResult = TransactionData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetPaymentResultRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      paRes: isSet(object.paRes) ? globalThis.String(object.paRes) : "",
      paymentResult: isSet(object.paymentResult) ? TransactionData.fromJSON(object.paymentResult) : undefined,
    };
  },

  toJSON(message: SetPaymentResultRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.paRes !== "") {
      obj.paRes = message.paRes;
    }
    if (message.paymentResult !== undefined) {
      obj.paymentResult = TransactionData.toJSON(message.paymentResult);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetPaymentResultRequest>, I>>(base?: I): SetPaymentResultRequest {
    return SetPaymentResultRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetPaymentResultRequest>, I>>(object: I): SetPaymentResultRequest {
    const message = createBaseSetPaymentResultRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.paRes = object.paRes ?? "";
    message.paymentResult = (object.paymentResult !== undefined && object.paymentResult !== null)
      ? TransactionData.fromPartial(object.paymentResult)
      : undefined;
    return message;
  },
};

function createBaseSetPaymentResultResponse(): SetPaymentResultResponse {
  return { orderCode: "", checkoutData: undefined };
}

export const SetPaymentResultResponse = {
  encode(message: SetPaymentResultResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderCode !== "") {
      writer.uint32(10).string(message.orderCode);
    }
    if (message.checkoutData !== undefined) {
      CheckoutData.encode(message.checkoutData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPaymentResultResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPaymentResultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orderCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.checkoutData = CheckoutData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetPaymentResultResponse {
    return {
      orderCode: isSet(object.orderCode) ? globalThis.String(object.orderCode) : "",
      checkoutData: isSet(object.checkoutData) ? CheckoutData.fromJSON(object.checkoutData) : undefined,
    };
  },

  toJSON(message: SetPaymentResultResponse): unknown {
    const obj: any = {};
    if (message.orderCode !== "") {
      obj.orderCode = message.orderCode;
    }
    if (message.checkoutData !== undefined) {
      obj.checkoutData = CheckoutData.toJSON(message.checkoutData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetPaymentResultResponse>, I>>(base?: I): SetPaymentResultResponse {
    return SetPaymentResultResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetPaymentResultResponse>, I>>(object: I): SetPaymentResultResponse {
    const message = createBaseSetPaymentResultResponse();
    message.orderCode = object.orderCode ?? "";
    message.checkoutData = (object.checkoutData !== undefined && object.checkoutData !== null)
      ? CheckoutData.fromPartial(object.checkoutData)
      : undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
