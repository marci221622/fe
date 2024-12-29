/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ValidationResult, validationResultFromJSON, validationResultToJSON } from "../enums/validation";
import { CartState } from "./cart.v1";
import { DeliveryState } from "./delivery.v1";
import { Loyalty } from "./loyalty.v1";
import { PaymentState } from "./payment.v1";
import { SessionMeta } from "./session_meta.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает данные чекаута */
export interface CheckoutData {
  /** Данные корзины */
  cartData:
    | CartState
    | undefined;
  /** Данные доставки */
  deliveryData:
    | DeliveryState
    | undefined;
  /** Данные оплаты */
  paymentData:
    | PaymentState
    | undefined;
  /** Результат внутренней валидации данных */
  valid: ValidationResult;
  /** Контекст чекаута */
  meta:
    | SessionMeta
    | undefined;
  /** Описание промо-акций */
  loyalty?: Loyalty | undefined;
}

function createBaseCheckoutData(): CheckoutData {
  return {
    cartData: undefined,
    deliveryData: undefined,
    paymentData: undefined,
    valid: 0,
    meta: undefined,
    loyalty: undefined,
  };
}

export const CheckoutData = {
  encode(message: CheckoutData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cartData !== undefined) {
      CartState.encode(message.cartData, writer.uint32(10).fork()).ldelim();
    }
    if (message.deliveryData !== undefined) {
      DeliveryState.encode(message.deliveryData, writer.uint32(18).fork()).ldelim();
    }
    if (message.paymentData !== undefined) {
      PaymentState.encode(message.paymentData, writer.uint32(26).fork()).ldelim();
    }
    if (message.valid !== 0) {
      writer.uint32(32).int32(message.valid);
    }
    if (message.meta !== undefined) {
      SessionMeta.encode(message.meta, writer.uint32(42).fork()).ldelim();
    }
    if (message.loyalty !== undefined) {
      Loyalty.encode(message.loyalty, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckoutData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckoutData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cartData = CartState.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deliveryData = DeliveryState.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paymentData = PaymentState.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.valid = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.meta = SessionMeta.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.loyalty = Loyalty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckoutData {
    return {
      cartData: isSet(object.cartData) ? CartState.fromJSON(object.cartData) : undefined,
      deliveryData: isSet(object.deliveryData) ? DeliveryState.fromJSON(object.deliveryData) : undefined,
      paymentData: isSet(object.paymentData) ? PaymentState.fromJSON(object.paymentData) : undefined,
      valid: isSet(object.valid) ? validationResultFromJSON(object.valid) : 0,
      meta: isSet(object.meta) ? SessionMeta.fromJSON(object.meta) : undefined,
      loyalty: isSet(object.loyalty) ? Loyalty.fromJSON(object.loyalty) : undefined,
    };
  },

  toJSON(message: CheckoutData): unknown {
    const obj: any = {};
    if (message.cartData !== undefined) {
      obj.cartData = CartState.toJSON(message.cartData);
    }
    if (message.deliveryData !== undefined) {
      obj.deliveryData = DeliveryState.toJSON(message.deliveryData);
    }
    if (message.paymentData !== undefined) {
      obj.paymentData = PaymentState.toJSON(message.paymentData);
    }
    if (message.valid !== 0) {
      obj.valid = validationResultToJSON(message.valid);
    }
    if (message.meta !== undefined) {
      obj.meta = SessionMeta.toJSON(message.meta);
    }
    if (message.loyalty !== undefined) {
      obj.loyalty = Loyalty.toJSON(message.loyalty);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckoutData>, I>>(base?: I): CheckoutData {
    return CheckoutData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckoutData>, I>>(object: I): CheckoutData {
    const message = createBaseCheckoutData();
    message.cartData = (object.cartData !== undefined && object.cartData !== null)
      ? CartState.fromPartial(object.cartData)
      : undefined;
    message.deliveryData = (object.deliveryData !== undefined && object.deliveryData !== null)
      ? DeliveryState.fromPartial(object.deliveryData)
      : undefined;
    message.paymentData = (object.paymentData !== undefined && object.paymentData !== null)
      ? PaymentState.fromPartial(object.paymentData)
      : undefined;
    message.valid = object.valid ?? 0;
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? SessionMeta.fromPartial(object.meta)
      : undefined;
    message.loyalty = (object.loyalty !== undefined && object.loyalty !== null)
      ? Loyalty.fromPartial(object.loyalty)
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
