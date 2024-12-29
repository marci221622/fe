/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ScrollType, scrollTypeFromJSON, scrollTypeToJSON } from "../enums/scroll_type";
import { Button } from "./button.v1";
import { Item } from "./item.v1";
import { ItemMin } from "./item_min.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Товарный блок, например: Новинки в любимых брендах, Вам может понравиться, Часы популярных брендов и т.д. */
export interface ItemsBlock {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Список товаров */
  itemsList: Item[];
  /** Тип скролла слайдера */
  scrollType: ScrollType;
  /** Кнопка */
  button:
    | Button
    | undefined;
  /** Позиция */
  position: string;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  items: ItemMin[];
}

function createBaseItemsBlock(): ItemsBlock {
  return { id: "0", title: "", itemsList: [], scrollType: 0, button: undefined, position: "0", items: [] };
}

export const ItemsBlock = {
  encode(message: ItemsBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    for (const v of message.itemsList) {
      Item.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.scrollType !== 0) {
      writer.uint32(40).int32(message.scrollType);
    }
    if (message.button !== undefined) {
      Button.encode(message.button, writer.uint32(50).fork()).ldelim();
    }
    if (message.position !== "0") {
      writer.uint32(56).int64(message.position);
    }
    for (const v of message.items) {
      ItemMin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemsBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemsBlock();
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
        case 8:
          if (tag !== 66) {
            break;
          }

          message.itemsList.push(Item.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.scrollType = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.button = Button.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.position = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): ItemsBlock {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      itemsList: globalThis.Array.isArray(object?.itemsList) ? object.itemsList.map((e: any) => Item.fromJSON(e)) : [],
      scrollType: isSet(object.scrollType) ? scrollTypeFromJSON(object.scrollType) : 0,
      button: isSet(object.button) ? Button.fromJSON(object.button) : undefined,
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => ItemMin.fromJSON(e)) : [],
    };
  },

  toJSON(message: ItemsBlock): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.itemsList?.length) {
      obj.itemsList = message.itemsList.map((e) => Item.toJSON(e));
    }
    if (message.scrollType !== 0) {
      obj.scrollType = scrollTypeToJSON(message.scrollType);
    }
    if (message.button !== undefined) {
      obj.button = Button.toJSON(message.button);
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    if (message.items?.length) {
      obj.items = message.items.map((e) => ItemMin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ItemsBlock>, I>>(base?: I): ItemsBlock {
    return ItemsBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ItemsBlock>, I>>(object: I): ItemsBlock {
    const message = createBaseItemsBlock();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.itemsList = object.itemsList?.map((e) => Item.fromPartial(e)) || [];
    message.scrollType = object.scrollType ?? 0;
    message.button = (object.button !== undefined && object.button !== null)
      ? Button.fromPartial(object.button)
      : undefined;
    message.position = object.position ?? "0";
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
