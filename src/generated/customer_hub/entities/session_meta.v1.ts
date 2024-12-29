/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CheckoutType, checkoutTypeFromJSON, checkoutTypeToJSON } from "../enums/checkout_type";
import { Platform, platformFromJSON, platformToJSON } from "../enums/platform";

export const protobufPackage = "utp.customer_hub_service.v1";

export interface SessionMeta {
  code: string;
  /** Идентификатор клиента. Для гостя не заполняется */
  customerId?:
    | string
    | undefined;
  /** Регион нахождения пользователя, например, МСК */
  region?:
    | string
    | undefined;
  /** Платформа с которой осуществляется покупка */
  platform?:
    | Platform
    | undefined;
  /** Рассчитанный на основе параметров устройства цифровой отпечаток */
  deviceFingerprint?:
    | string
    | undefined;
  /** Номер телефона авторизованного клиента или получателя заказа */
  phone?:
    | string
    | undefined;
  /** IP-адрес, с которого осуществлялась попытка оплаты */
  ip?:
    | string
    | undefined;
  /** Тип чекаута */
  type: CheckoutType;
  /** Идентификатор пользователя */
  userId?: string | undefined;
}

function createBaseSessionMeta(): SessionMeta {
  return {
    code: "",
    customerId: undefined,
    region: undefined,
    platform: undefined,
    deviceFingerprint: undefined,
    phone: undefined,
    ip: undefined,
    type: 0,
    userId: undefined,
  };
}

export const SessionMeta = {
  encode(message: SessionMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.customerId !== undefined) {
      writer.uint32(18).string(message.customerId);
    }
    if (message.region !== undefined) {
      writer.uint32(26).string(message.region);
    }
    if (message.platform !== undefined) {
      writer.uint32(32).int32(message.platform);
    }
    if (message.deviceFingerprint !== undefined) {
      writer.uint32(42).string(message.deviceFingerprint);
    }
    if (message.phone !== undefined) {
      writer.uint32(50).string(message.phone);
    }
    if (message.ip !== undefined) {
      writer.uint32(58).string(message.ip);
    }
    if (message.type !== 0) {
      writer.uint32(64).int32(message.type);
    }
    if (message.userId !== undefined) {
      writer.uint32(74).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SessionMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSessionMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.customerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.region = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.platform = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.deviceFingerprint = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.phone = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SessionMeta {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : undefined,
      region: isSet(object.region) ? globalThis.String(object.region) : undefined,
      platform: isSet(object.platform) ? platformFromJSON(object.platform) : undefined,
      deviceFingerprint: isSet(object.deviceFingerprint) ? globalThis.String(object.deviceFingerprint) : undefined,
      phone: isSet(object.phone) ? globalThis.String(object.phone) : undefined,
      ip: isSet(object.ip) ? globalThis.String(object.ip) : undefined,
      type: isSet(object.type) ? checkoutTypeFromJSON(object.type) : 0,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : undefined,
    };
  },

  toJSON(message: SessionMeta): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.customerId !== undefined) {
      obj.customerId = message.customerId;
    }
    if (message.region !== undefined) {
      obj.region = message.region;
    }
    if (message.platform !== undefined) {
      obj.platform = platformToJSON(message.platform);
    }
    if (message.deviceFingerprint !== undefined) {
      obj.deviceFingerprint = message.deviceFingerprint;
    }
    if (message.phone !== undefined) {
      obj.phone = message.phone;
    }
    if (message.ip !== undefined) {
      obj.ip = message.ip;
    }
    if (message.type !== 0) {
      obj.type = checkoutTypeToJSON(message.type);
    }
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SessionMeta>, I>>(base?: I): SessionMeta {
    return SessionMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SessionMeta>, I>>(object: I): SessionMeta {
    const message = createBaseSessionMeta();
    message.code = object.code ?? "";
    message.customerId = object.customerId ?? undefined;
    message.region = object.region ?? undefined;
    message.platform = object.platform ?? undefined;
    message.deviceFingerprint = object.deviceFingerprint ?? undefined;
    message.phone = object.phone ?? undefined;
    message.ip = object.ip ?? undefined;
    message.type = object.type ?? 0;
    message.userId = object.userId ?? undefined;
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
