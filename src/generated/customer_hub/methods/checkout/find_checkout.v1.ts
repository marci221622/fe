/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на получение данных чекаута */
export interface FindCheckoutRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Номер заказа */
  orderCode?:
    | string
    | undefined;
  /**
   * Страница, в контексте которой вызывается метод (например, cart или checkout)
   * для правильного отображения дисклеймера акции
   */
  place?: string | undefined;
}

function createBaseFindCheckoutRequest(): FindCheckoutRequest {
  return { sessionData: undefined, orderCode: undefined, place: undefined };
}

export const FindCheckoutRequest = {
  encode(message: FindCheckoutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.orderCode !== undefined) {
      writer.uint32(18).string(message.orderCode);
    }
    if (message.place !== undefined) {
      writer.uint32(26).string(message.place);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindCheckoutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindCheckoutRequest();
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

          message.orderCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.place = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindCheckoutRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      orderCode: isSet(object.orderCode) ? globalThis.String(object.orderCode) : undefined,
      place: isSet(object.place) ? globalThis.String(object.place) : undefined,
    };
  },

  toJSON(message: FindCheckoutRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.orderCode !== undefined) {
      obj.orderCode = message.orderCode;
    }
    if (message.place !== undefined) {
      obj.place = message.place;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindCheckoutRequest>, I>>(base?: I): FindCheckoutRequest {
    return FindCheckoutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindCheckoutRequest>, I>>(object: I): FindCheckoutRequest {
    const message = createBaseFindCheckoutRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.orderCode = object.orderCode ?? undefined;
    message.place = object.place ?? undefined;
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
