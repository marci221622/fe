/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";
import { CheckoutType, checkoutTypeFromJSON, checkoutTypeToJSON } from "../../enums/checkout_type";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на добавление офферов в корзину */
export interface AddCartItemsRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Коды добавляемы офферов */
  offerCodes: string[];
  /** Тип чекаута */
  type: CheckoutType;
}

function createBaseAddCartItemsRequest(): AddCartItemsRequest {
  return { sessionData: undefined, offerCodes: [], type: 0 };
}

export const AddCartItemsRequest = {
  encode(message: AddCartItemsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.offerCodes) {
      writer.uint32(18).string(v!);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddCartItemsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddCartItemsRequest();
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
          if (tag !== 18) {
            break;
          }

          message.offerCodes.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): AddCartItemsRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      offerCodes: globalThis.Array.isArray(object?.offerCodes)
        ? object.offerCodes.map((e: any) => globalThis.String(e))
        : [],
      type: isSet(object.type) ? checkoutTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: AddCartItemsRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.offerCodes?.length) {
      obj.offerCodes = message.offerCodes;
    }
    if (message.type !== 0) {
      obj.type = checkoutTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddCartItemsRequest>, I>>(base?: I): AddCartItemsRequest {
    return AddCartItemsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddCartItemsRequest>, I>>(object: I): AddCartItemsRequest {
    const message = createBaseAddCartItemsRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.offerCodes = object.offerCodes?.map((e) => e) || [];
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
