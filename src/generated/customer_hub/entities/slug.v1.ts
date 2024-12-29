/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип сущности слага. */
export enum SlugType {
  SLUG_TYPE_UNSPECIFIED = 0,
  /** SLUG_TYPE_MENU_ITEM - для ссылок вида: https://collect.tsum.ru/women/catalog/sumki-43165 */
  SLUG_TYPE_MENU_ITEM = 1,
  /** SLUG_TYPE_BRAND - для ссылок вида: https://collect.tsum.ru/women/brand/balenciaga-1253 */
  SLUG_TYPE_BRAND = 2,
  /** SLUG_TYPE_COLLECTION - для ссылок вида: https://collect.tsum.ru/women/collection/sumki-do-50000-rubley */
  SLUG_TYPE_COLLECTION = 3,
  /** SLUG_TYPE_ITEM - для ссылок вида: https://collect.tsum.ru/item/sumka-balenciaga-5821 */
  SLUG_TYPE_ITEM = 4,
  UNRECOGNIZED = -1,
}

export function slugTypeFromJSON(object: any): SlugType {
  switch (object) {
    case 0:
    case "SLUG_TYPE_UNSPECIFIED":
      return SlugType.SLUG_TYPE_UNSPECIFIED;
    case 1:
    case "SLUG_TYPE_MENU_ITEM":
      return SlugType.SLUG_TYPE_MENU_ITEM;
    case 2:
    case "SLUG_TYPE_BRAND":
      return SlugType.SLUG_TYPE_BRAND;
    case 3:
    case "SLUG_TYPE_COLLECTION":
      return SlugType.SLUG_TYPE_COLLECTION;
    case 4:
    case "SLUG_TYPE_ITEM":
      return SlugType.SLUG_TYPE_ITEM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SlugType.UNRECOGNIZED;
  }
}

export function slugTypeToJSON(object: SlugType): string {
  switch (object) {
    case SlugType.SLUG_TYPE_UNSPECIFIED:
      return "SLUG_TYPE_UNSPECIFIED";
    case SlugType.SLUG_TYPE_MENU_ITEM:
      return "SLUG_TYPE_MENU_ITEM";
    case SlugType.SLUG_TYPE_BRAND:
      return "SLUG_TYPE_BRAND";
    case SlugType.SLUG_TYPE_COLLECTION:
      return "SLUG_TYPE_COLLECTION";
    case SlugType.SLUG_TYPE_ITEM:
      return "SLUG_TYPE_ITEM";
    case SlugType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Slug сущности (товара, бренда, коллекции и т.д.) */
export interface Slug {
  type: SlugType;
  slug: string;
}

function createBaseSlug(): Slug {
  return { type: 0, slug: "" };
}

export const Slug = {
  encode(message: Slug, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.slug !== "") {
      writer.uint32(18).string(message.slug);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Slug {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlug();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.slug = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Slug {
    return {
      type: isSet(object.type) ? slugTypeFromJSON(object.type) : 0,
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
    };
  },

  toJSON(message: Slug): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = slugTypeToJSON(message.type);
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Slug>, I>>(base?: I): Slug {
    return Slug.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Slug>, I>>(object: I): Slug {
    const message = createBaseSlug();
    message.type = object.type ?? 0;
    message.slug = object.slug ?? "";
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
