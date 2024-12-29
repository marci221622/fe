/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Section, sectionFromJSON, sectionToJSON } from "../enums/section";
import { Category } from "./category.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Каталог */
export interface Catalog {
  /** Идентификатор */
  id: string;
  /** Секция: мужское/женское/детское */
  gender?:
    | Section
    | undefined;
  /** Заголовок */
  title?:
    | string
    | undefined;
  /** Категория */
  categories: Category[];
  /** Код меню */
  menuCode: string;
  /** Количество элементов */
  itemsCount: string;
}

function createBaseCatalog(): Catalog {
  return { id: "0", gender: undefined, title: undefined, categories: [], menuCode: "", itemsCount: "0" };
}

export const Catalog = {
  encode(message: Catalog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.gender !== undefined) {
      writer.uint32(16).int32(message.gender);
    }
    if (message.title !== undefined) {
      writer.uint32(26).string(message.title);
    }
    for (const v of message.categories) {
      Category.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.menuCode !== "") {
      writer.uint32(42).string(message.menuCode);
    }
    if (message.itemsCount !== "0") {
      writer.uint32(48).int64(message.itemsCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Catalog {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCatalog();
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
          if (tag !== 16) {
            break;
          }

          message.gender = reader.int32() as any;
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

          message.categories.push(Category.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.menuCode = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Catalog {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      gender: isSet(object.gender) ? sectionFromJSON(object.gender) : undefined,
      title: isSet(object.title) ? globalThis.String(object.title) : undefined,
      categories: globalThis.Array.isArray(object?.categories)
        ? object.categories.map((e: any) => Category.fromJSON(e))
        : [],
      menuCode: isSet(object.menuCode) ? globalThis.String(object.menuCode) : "",
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
    };
  },

  toJSON(message: Catalog): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.gender !== undefined) {
      obj.gender = sectionToJSON(message.gender);
    }
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.categories?.length) {
      obj.categories = message.categories.map((e) => Category.toJSON(e));
    }
    if (message.menuCode !== "") {
      obj.menuCode = message.menuCode;
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Catalog>, I>>(base?: I): Catalog {
    return Catalog.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Catalog>, I>>(object: I): Catalog {
    const message = createBaseCatalog();
    message.id = object.id ?? "0";
    message.gender = object.gender ?? undefined;
    message.title = object.title ?? undefined;
    message.categories = object.categories?.map((e) => Category.fromPartial(e)) || [];
    message.menuCode = object.menuCode ?? "";
    message.itemsCount = object.itemsCount ?? "0";
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
