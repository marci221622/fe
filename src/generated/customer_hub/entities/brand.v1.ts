/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Бренд */
export interface Brand {
  /** Идентификатор */
  id: string;
  /** Код бренда */
  code: string;
  /** Заголовок */
  title: string;
  /** Информационная ссылка */
  infoLink: string;
  /** Секция */
  sections: string[];
  /** Находится ли данный бренд в топах секция */
  sectionsTop: string[];
  /** Изображение */
  logoLink:
    | Image
    | undefined;
  /** Код коллекции */
  collectionCode: string;
  /** Слаг */
  slug: string;
}

function createBaseBrand(): Brand {
  return {
    id: "0",
    code: "",
    title: "",
    infoLink: "",
    sections: [],
    sectionsTop: [],
    logoLink: undefined,
    collectionCode: "",
    slug: "",
  };
}

export const Brand = {
  encode(message: Brand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.infoLink !== "") {
      writer.uint32(42).string(message.infoLink);
    }
    for (const v of message.sections) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.sectionsTop) {
      writer.uint32(58).string(v!);
    }
    if (message.logoLink !== undefined) {
      Image.encode(message.logoLink, writer.uint32(66).fork()).ldelim();
    }
    if (message.collectionCode !== "") {
      writer.uint32(74).string(message.collectionCode);
    }
    if (message.slug !== "") {
      writer.uint32(82).string(message.slug);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Brand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrand();
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
        case 5:
          if (tag !== 42) {
            break;
          }

          message.infoLink = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sections.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sectionsTop.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.logoLink = Image.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.collectionCode = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
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

  fromJSON(object: any): Brand {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      infoLink: isSet(object.infoLink) ? globalThis.String(object.infoLink) : "",
      sections: globalThis.Array.isArray(object?.sections) ? object.sections.map((e: any) => globalThis.String(e)) : [],
      sectionsTop: globalThis.Array.isArray(object?.sectionsTop)
        ? object.sectionsTop.map((e: any) => globalThis.String(e))
        : [],
      logoLink: isSet(object.logoLink) ? Image.fromJSON(object.logoLink) : undefined,
      collectionCode: isSet(object.collectionCode) ? globalThis.String(object.collectionCode) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
    };
  },

  toJSON(message: Brand): unknown {
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
    if (message.infoLink !== "") {
      obj.infoLink = message.infoLink;
    }
    if (message.sections?.length) {
      obj.sections = message.sections;
    }
    if (message.sectionsTop?.length) {
      obj.sectionsTop = message.sectionsTop;
    }
    if (message.logoLink !== undefined) {
      obj.logoLink = Image.toJSON(message.logoLink);
    }
    if (message.collectionCode !== "") {
      obj.collectionCode = message.collectionCode;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Brand>, I>>(base?: I): Brand {
    return Brand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Brand>, I>>(object: I): Brand {
    const message = createBaseBrand();
    message.id = object.id ?? "0";
    message.code = object.code ?? "";
    message.title = object.title ?? "";
    message.infoLink = object.infoLink ?? "";
    message.sections = object.sections?.map((e) => e) || [];
    message.sectionsTop = object.sectionsTop?.map((e) => e) || [];
    message.logoLink = (object.logoLink !== undefined && object.logoLink !== null)
      ? Image.fromPartial(object.logoLink)
      : undefined;
    message.collectionCode = object.collectionCode ?? "";
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
