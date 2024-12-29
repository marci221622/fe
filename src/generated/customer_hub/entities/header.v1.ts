/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Brand } from "./brand.v1";
import { Collection } from "./collection.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Данные для заголовка товарной выдачи каталога */
export interface Header {
  /** первая коллекция из списка коллекций в запросе (SearchParams.QueryBase.collections[0]) */
  collection:
    | Collection
    | undefined;
  /**
   * первый бренд из списка брендов в запросе (SearchParams.QueryBase.brands[0])
   * выставляется только если в запросе был передан один бренд
   */
  brand?: Brand | undefined;
}

function createBaseHeader(): Header {
  return { collection: undefined, brand: undefined };
}

export const Header = {
  encode(message: Header, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== undefined) {
      Collection.encode(message.collection, writer.uint32(10).fork()).ldelim();
    }
    if (message.brand !== undefined) {
      Brand.encode(message.brand, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = Collection.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.brand = Brand.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Header {
    return {
      collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined,
      brand: isSet(object.brand) ? Brand.fromJSON(object.brand) : undefined,
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    if (message.collection !== undefined) {
      obj.collection = Collection.toJSON(message.collection);
    }
    if (message.brand !== undefined) {
      obj.brand = Brand.toJSON(message.brand);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Header>, I>>(base?: I): Header {
    return Header.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.collection = (object.collection !== undefined && object.collection !== null)
      ? Collection.fromPartial(object.collection)
      : undefined;
    message.brand = (object.brand !== undefined && object.brand !== null) ? Brand.fromPartial(object.brand) : undefined;
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
