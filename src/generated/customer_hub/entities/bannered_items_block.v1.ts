/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ScrollType, scrollTypeFromJSON, scrollTypeToJSON } from "../enums/scroll_type";
import { Banner } from "./banner.v1";
import { Item } from "./item.v1";
import { ItemMin } from "./item_min.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/**
 * Блок с баннером и товарами.
 * Например — "Гардероб блогеров", "Гардероб инфлюенсеров", "Гардероб Насти Ивлеевой"
 */
export interface BanneredItemsBlock {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Товары в блоке */
  banneredItems: BanneredItemsBlock_BanneredItems[];
  /** Тип скролла слайдера */
  scrollType: ScrollType;
  /** Позиция */
  position: string;
}

/** Тип товаров блока */
export interface BanneredItemsBlock_BanneredItems {
  /** Баннер */
  banner:
    | Banner
    | undefined;
  /** Список товаров */
  itemsList: Item[];
  /** Идентификатор */
  id: string;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  items: ItemMin[];
}

function createBaseBanneredItemsBlock(): BanneredItemsBlock {
  return { id: "0", title: "", banneredItems: [], scrollType: 0, position: "0" };
}

export const BanneredItemsBlock = {
  encode(message: BanneredItemsBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    for (const v of message.banneredItems) {
      BanneredItemsBlock_BanneredItems.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.scrollType !== 0) {
      writer.uint32(40).int32(message.scrollType);
    }
    if (message.position !== "0") {
      writer.uint32(56).int64(message.position);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BanneredItemsBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanneredItemsBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.banneredItems.push(BanneredItemsBlock_BanneredItems.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.scrollType = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.position = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BanneredItemsBlock {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      banneredItems: globalThis.Array.isArray(object?.banneredItems)
        ? object.banneredItems.map((e: any) => BanneredItemsBlock_BanneredItems.fromJSON(e))
        : [],
      scrollType: isSet(object.scrollType) ? scrollTypeFromJSON(object.scrollType) : 0,
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
    };
  },

  toJSON(message: BanneredItemsBlock): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.banneredItems?.length) {
      obj.banneredItems = message.banneredItems.map((e) => BanneredItemsBlock_BanneredItems.toJSON(e));
    }
    if (message.scrollType !== 0) {
      obj.scrollType = scrollTypeToJSON(message.scrollType);
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BanneredItemsBlock>, I>>(base?: I): BanneredItemsBlock {
    return BanneredItemsBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BanneredItemsBlock>, I>>(object: I): BanneredItemsBlock {
    const message = createBaseBanneredItemsBlock();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.banneredItems = object.banneredItems?.map((e) => BanneredItemsBlock_BanneredItems.fromPartial(e)) || [];
    message.scrollType = object.scrollType ?? 0;
    message.position = object.position ?? "0";
    return message;
  },
};

function createBaseBanneredItemsBlock_BanneredItems(): BanneredItemsBlock_BanneredItems {
  return { banner: undefined, itemsList: [], id: "0", items: [] };
}

export const BanneredItemsBlock_BanneredItems = {
  encode(message: BanneredItemsBlock_BanneredItems, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.banner !== undefined) {
      Banner.encode(message.banner, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.itemsList) {
      Item.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.id !== "0") {
      writer.uint32(24).int64(message.id);
    }
    for (const v of message.items) {
      ItemMin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BanneredItemsBlock_BanneredItems {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanneredItemsBlock_BanneredItems();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.banner = Banner.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.itemsList.push(Item.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.items.push(ItemMin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BanneredItemsBlock_BanneredItems {
    return {
      banner: isSet(object.banner) ? Banner.fromJSON(object.banner) : undefined,
      itemsList: globalThis.Array.isArray(object?.itemsList) ? object.itemsList.map((e: any) => Item.fromJSON(e)) : [],
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => ItemMin.fromJSON(e)) : [],
    };
  },

  toJSON(message: BanneredItemsBlock_BanneredItems): unknown {
    const obj: any = {};
    if (message.banner !== undefined) {
      obj.banner = Banner.toJSON(message.banner);
    }
    if (message.itemsList?.length) {
      obj.itemsList = message.itemsList.map((e) => Item.toJSON(e));
    }
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.items?.length) {
      obj.items = message.items.map((e) => ItemMin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BanneredItemsBlock_BanneredItems>, I>>(
    base?: I,
  ): BanneredItemsBlock_BanneredItems {
    return BanneredItemsBlock_BanneredItems.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BanneredItemsBlock_BanneredItems>, I>>(
    object: I,
  ): BanneredItemsBlock_BanneredItems {
    const message = createBaseBanneredItemsBlock_BanneredItems();
    message.banner = (object.banner !== undefined && object.banner !== null)
      ? Banner.fromPartial(object.banner)
      : undefined;
    message.itemsList = object.itemsList?.map((e) => Item.fromPartial(e)) || [];
    message.id = object.id ?? "0";
    message.items = object.items?.map((e) => ItemMin.fromPartial(e)) || [];
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
