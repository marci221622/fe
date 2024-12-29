/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Type, typeFromJSON, typeToJSON } from "../enums/type";
import { Slug } from "./slug.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/**
 * Payload включает в себя тип и значение действия для баннера
 * Например: {type: category, value: "125"}
 * По тапу на баннер должен быть совершен переход на категорию с id=125
 */
export interface Payload {
  /** Тип */
  type: Type;
  /** Значение */
  value: string;
  /** Код меню */
  menuCode?:
    | string
    | undefined;
  /** Слаг */
  slug:
    | Slug
    | undefined;
  /** Название */
  title: string;
}

function createBasePayload(): Payload {
  return { type: 0, value: "", menuCode: undefined, slug: undefined, title: "" };
}

export const Payload = {
  encode(message: Payload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.menuCode !== undefined) {
      writer.uint32(26).string(message.menuCode);
    }
    if (message.slug !== undefined) {
      Slug.encode(message.slug, writer.uint32(34).fork()).ldelim();
    }
    if (message.title !== "") {
      writer.uint32(42).string(message.title);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payload {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayload();
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

          message.value = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.menuCode = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slug = Slug.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.title = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Payload {
    return {
      type: isSet(object.type) ? typeFromJSON(object.type) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      menuCode: isSet(object.menuCode) ? globalThis.String(object.menuCode) : undefined,
      slug: isSet(object.slug) ? Slug.fromJSON(object.slug) : undefined,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
    };
  },

  toJSON(message: Payload): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = typeToJSON(message.type);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.menuCode !== undefined) {
      obj.menuCode = message.menuCode;
    }
    if (message.slug !== undefined) {
      obj.slug = Slug.toJSON(message.slug);
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Payload>, I>>(base?: I): Payload {
    return Payload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Payload>, I>>(object: I): Payload {
    const message = createBasePayload();
    message.type = object.type ?? 0;
    message.value = object.value ?? "";
    message.menuCode = object.menuCode ?? undefined;
    message.slug = (object.slug !== undefined && object.slug !== null) ? Slug.fromPartial(object.slug) : undefined;
    message.title = object.title ?? "";
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
