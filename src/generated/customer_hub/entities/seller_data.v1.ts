/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  SellerLegalEntityType,
  sellerLegalEntityTypeFromJSON,
  sellerLegalEntityTypeToJSON,
} from "../enums/seller_legal_entitty_type";
import { SellerType, sellerTypeFromJSON, sellerTypeToJSON } from "../enums/seller_type";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Данные продовца */
export interface SellerData {
  /** Идентификатор пользователя */
  userId: string;
  /** Рейтинг доверия */
  trustingRating: number;
  /** Юридический тип продовца - ИП или ЮЛ */
  legalEntityType: SellerLegalEntityType;
  /** Разрешен ли возрат */
  returnAllowed: boolean;
  /** Тип продовца */
  sellerType: SellerType;
}

function createBaseSellerData(): SellerData {
  return { userId: "0", trustingRating: 0, legalEntityType: 0, returnAllowed: false, sellerType: 0 };
}

export const SellerData = {
  encode(message: SellerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).int64(message.userId);
    }
    if (message.trustingRating !== 0) {
      writer.uint32(16).int32(message.trustingRating);
    }
    if (message.legalEntityType !== 0) {
      writer.uint32(24).int32(message.legalEntityType);
    }
    if (message.returnAllowed === true) {
      writer.uint32(32).bool(message.returnAllowed);
    }
    if (message.sellerType !== 0) {
      writer.uint32(40).int32(message.sellerType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SellerData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSellerData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.trustingRating = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.legalEntityType = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.returnAllowed = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.sellerType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SellerData {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "0",
      trustingRating: isSet(object.trustingRating) ? globalThis.Number(object.trustingRating) : 0,
      legalEntityType: isSet(object.legalEntityType) ? sellerLegalEntityTypeFromJSON(object.legalEntityType) : 0,
      returnAllowed: isSet(object.returnAllowed) ? globalThis.Boolean(object.returnAllowed) : false,
      sellerType: isSet(object.sellerType) ? sellerTypeFromJSON(object.sellerType) : 0,
    };
  },

  toJSON(message: SellerData): unknown {
    const obj: any = {};
    if (message.userId !== "0") {
      obj.userId = message.userId;
    }
    if (message.trustingRating !== 0) {
      obj.trustingRating = Math.round(message.trustingRating);
    }
    if (message.legalEntityType !== 0) {
      obj.legalEntityType = sellerLegalEntityTypeToJSON(message.legalEntityType);
    }
    if (message.returnAllowed === true) {
      obj.returnAllowed = message.returnAllowed;
    }
    if (message.sellerType !== 0) {
      obj.sellerType = sellerTypeToJSON(message.sellerType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SellerData>, I>>(base?: I): SellerData {
    return SellerData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SellerData>, I>>(object: I): SellerData {
    const message = createBaseSellerData();
    message.userId = object.userId ?? "0";
    message.trustingRating = object.trustingRating ?? 0;
    message.legalEntityType = object.legalEntityType ?? 0;
    message.returnAllowed = object.returnAllowed ?? false;
    message.sellerType = object.sellerType ?? 0;
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
