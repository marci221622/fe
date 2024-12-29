/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Banner } from "./banner.v1";
import { BrandItems } from "./brand_items.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Блок с контентными баннерами. Например — "Новинки в популярных брендах" */
export interface BannersBlock {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Баннер */
  banners: Banner[];
  /** Позиция */
  position: string;
  /** Кол-во банеров */
  bannersCount: string;
}

/** Блок Баннеров Любимых Брендов с товарами в них */
export interface FavoriteBrandsBannersBlock {
  /** идентификатор */
  id: string;
  /** код */
  code: string;
  /** название */
  title: string;
  /** позиция */
  position: string;
  /** Список Товаров по Брендам */
  brandsItems: BrandItems[];
}

function createBaseBannersBlock(): BannersBlock {
  return { id: "0", title: "", banners: [], position: "0", bannersCount: "0" };
}

export const BannersBlock = {
  encode(message: BannersBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    for (const v of message.banners) {
      Banner.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.position !== "0") {
      writer.uint32(56).int64(message.position);
    }
    if (message.bannersCount !== "0") {
      writer.uint32(64).int64(message.bannersCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BannersBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBannersBlock();
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

          message.banners.push(Banner.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.position = longToString(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.bannersCount = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BannersBlock {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      banners: globalThis.Array.isArray(object?.banners) ? object.banners.map((e: any) => Banner.fromJSON(e)) : [],
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
      bannersCount: isSet(object.bannersCount) ? globalThis.String(object.bannersCount) : "0",
    };
  },

  toJSON(message: BannersBlock): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.banners?.length) {
      obj.banners = message.banners.map((e) => Banner.toJSON(e));
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    if (message.bannersCount !== "0") {
      obj.bannersCount = message.bannersCount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BannersBlock>, I>>(base?: I): BannersBlock {
    return BannersBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BannersBlock>, I>>(object: I): BannersBlock {
    const message = createBaseBannersBlock();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.banners = object.banners?.map((e) => Banner.fromPartial(e)) || [];
    message.position = object.position ?? "0";
    message.bannersCount = object.bannersCount ?? "0";
    return message;
  },
};

function createBaseFavoriteBrandsBannersBlock(): FavoriteBrandsBannersBlock {
  return { id: "0", code: "", title: "", position: "0", brandsItems: [] };
}

export const FavoriteBrandsBannersBlock = {
  encode(message: FavoriteBrandsBannersBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.position !== "0") {
      writer.uint32(32).int64(message.position);
    }
    for (const v of message.brandsItems) {
      BrandItems.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FavoriteBrandsBannersBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFavoriteBrandsBannersBlock();
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

          message.code = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.position = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.brandsItems.push(BrandItems.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FavoriteBrandsBannersBlock {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
      brandsItems: globalThis.Array.isArray(object?.brandsItems)
        ? object.brandsItems.map((e: any) => BrandItems.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FavoriteBrandsBannersBlock): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    if (message.brandsItems?.length) {
      obj.brandsItems = message.brandsItems.map((e) => BrandItems.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FavoriteBrandsBannersBlock>, I>>(base?: I): FavoriteBrandsBannersBlock {
    return FavoriteBrandsBannersBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FavoriteBrandsBannersBlock>, I>>(object: I): FavoriteBrandsBannersBlock {
    const message = createBaseFavoriteBrandsBannersBlock();
    message.id = object.id ?? "0";
    message.code = object.code ?? "";
    message.title = object.title ?? "";
    message.position = object.position ?? "0";
    message.brandsItems = object.brandsItems?.map((e) => BrandItems.fromPartial(e)) || [];
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
