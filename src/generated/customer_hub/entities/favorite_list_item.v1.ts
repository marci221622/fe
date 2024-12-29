/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** FavoriteListItem объект товара в избранном */
export interface FavoriteListItem {
  /** Код товара */
  itemCode: string;
}

function createBaseFavoriteListItem(): FavoriteListItem {
  return { itemCode: "" };
}

export const FavoriteListItem = {
  encode(message: FavoriteListItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.itemCode !== "") {
      writer.uint32(10).string(message.itemCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FavoriteListItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFavoriteListItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.itemCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FavoriteListItem {
    return { itemCode: isSet(object.itemCode) ? globalThis.String(object.itemCode) : "" };
  },

  toJSON(message: FavoriteListItem): unknown {
    const obj: any = {};
    if (message.itemCode !== "") {
      obj.itemCode = message.itemCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FavoriteListItem>, I>>(base?: I): FavoriteListItem {
    return FavoriteListItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FavoriteListItem>, I>>(object: I): FavoriteListItem {
    const message = createBaseFavoriteListItem();
    message.itemCode = object.itemCode ?? "";
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
