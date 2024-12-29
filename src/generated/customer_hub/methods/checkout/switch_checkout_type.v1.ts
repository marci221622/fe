/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";
import { CheckoutType, checkoutTypeFromJSON, checkoutTypeToJSON } from "../../enums/checkout_type";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на смену типа чекаута */
export interface SwitchCheckoutTypeRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Тип чекаута usual или clickAndCollect */
  type: CheckoutType;
}

function createBaseSwitchCheckoutTypeRequest(): SwitchCheckoutTypeRequest {
  return { sessionData: undefined, type: 0 };
}

export const SwitchCheckoutTypeRequest = {
  encode(message: SwitchCheckoutTypeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwitchCheckoutTypeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwitchCheckoutTypeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwitchCheckoutTypeRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      type: isSet(object.type) ? checkoutTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: SwitchCheckoutTypeRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.type !== 0) {
      obj.type = checkoutTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwitchCheckoutTypeRequest>, I>>(base?: I): SwitchCheckoutTypeRequest {
    return SwitchCheckoutTypeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwitchCheckoutTypeRequest>, I>>(object: I): SwitchCheckoutTypeRequest {
    const message = createBaseSwitchCheckoutTypeRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.type = object.type ?? 0;
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
