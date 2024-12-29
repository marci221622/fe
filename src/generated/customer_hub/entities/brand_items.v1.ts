/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Section, sectionFromJSON, sectionToJSON } from "../enums/section";
import { Item } from "./item.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Бренд с секцией и товарами в нем */
export interface BrandItems {
  /** Код бренда */
  brandCode: string;
  /** Секция бренда */
  section?:
    | Section
    | undefined;
  /** Список товаров бренда */
  items: Item[];
}

function createBaseBrandItems(): BrandItems {
  return { brandCode: "", section: undefined, items: [] };
}

export const BrandItems = {
  encode(message: BrandItems, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.brandCode !== "") {
      writer.uint32(10).string(message.brandCode);
    }
    if (message.section !== undefined) {
      writer.uint32(16).int32(message.section);
    }
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrandItems {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrandItems();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brandCode = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.items.push(Item.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BrandItems {
    return {
      brandCode: isSet(object.brandCode) ? globalThis.String(object.brandCode) : "",
      section: isSet(object.section) ? sectionFromJSON(object.section) : undefined,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
    };
  },

  toJSON(message: BrandItems): unknown {
    const obj: any = {};
    if (message.brandCode !== "") {
      obj.brandCode = message.brandCode;
    }
    if (message.section !== undefined) {
      obj.section = sectionToJSON(message.section);
    }
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrandItems>, I>>(base?: I): BrandItems {
    return BrandItems.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BrandItems>, I>>(object: I): BrandItems {
    const message = createBaseBrandItems();
    message.brandCode = object.brandCode ?? "";
    message.section = object.section ?? undefined;
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
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
