/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SellerData } from "./seller_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Данные по продавцу */
export interface Seller {
  /** Идентификатор */
  id: string;
  /** Данные продовца */
  seller: SellerData | undefined;
}

function createBaseSeller(): Seller {
  return { id: "0", seller: undefined };
}

export const Seller = {
  encode(message: Seller, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.seller !== undefined) {
      SellerData.encode(message.seller, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Seller {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeller();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.seller = SellerData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Seller {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      seller: isSet(object.seller) ? SellerData.fromJSON(object.seller) : undefined,
    };
  },

  toJSON(message: Seller): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.seller !== undefined) {
      obj.seller = SellerData.toJSON(message.seller);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Seller>, I>>(base?: I): Seller {
    return Seller.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Seller>, I>>(object: I): Seller {
    const message = createBaseSeller();
    message.id = object.id ?? "0";
    message.seller = (object.seller !== undefined && object.seller !== null)
      ? SellerData.fromPartial(object.seller)
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
