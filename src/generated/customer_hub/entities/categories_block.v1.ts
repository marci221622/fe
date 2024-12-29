/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { ERID } from "./erid.v1";
import { Payload } from "./payload.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Товарные группы/Категории. Например — "Актуальные категории" */
export interface CategoriesBlock {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Категория */
  categories: CategoriesBlock_Category[];
  /** Позиция */
  position: string;
}

/** Описание категории */
export interface CategoriesBlock_Category {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Изображение */
  image:
    | Image
    | undefined;
  /** Данные по блоку */
  payload:
    | Payload
    | undefined;
  /** ERID рекламного блока */
  erid?: ERID | undefined;
}

function createBaseCategoriesBlock(): CategoriesBlock {
  return { id: "0", title: "", categories: [], position: "0" };
}

export const CategoriesBlock = {
  encode(message: CategoriesBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    for (const v of message.categories) {
      CategoriesBlock_Category.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.position !== "0") {
      writer.uint32(48).int64(message.position);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoriesBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoriesBlock();
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

          message.categories.push(CategoriesBlock_Category.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
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

  fromJSON(object: any): CategoriesBlock {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      categories: globalThis.Array.isArray(object?.categories)
        ? object.categories.map((e: any) => CategoriesBlock_Category.fromJSON(e))
        : [],
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
    };
  },

  toJSON(message: CategoriesBlock): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.categories?.length) {
      obj.categories = message.categories.map((e) => CategoriesBlock_Category.toJSON(e));
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoriesBlock>, I>>(base?: I): CategoriesBlock {
    return CategoriesBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoriesBlock>, I>>(object: I): CategoriesBlock {
    const message = createBaseCategoriesBlock();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.categories = object.categories?.map((e) => CategoriesBlock_Category.fromPartial(e)) || [];
    message.position = object.position ?? "0";
    return message;
  },
};

function createBaseCategoriesBlock_Category(): CategoriesBlock_Category {
  return { id: "0", title: "", image: undefined, payload: undefined, erid: undefined };
}

export const CategoriesBlock_Category = {
  encode(message: CategoriesBlock_Category, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(26).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Payload.encode(message.payload, writer.uint32(34).fork()).ldelim();
    }
    if (message.erid !== undefined) {
      ERID.encode(message.erid, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoriesBlock_Category {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoriesBlock_Category();
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

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.payload = Payload.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.erid = ERID.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CategoriesBlock_Category {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      payload: isSet(object.payload) ? Payload.fromJSON(object.payload) : undefined,
      erid: isSet(object.erid) ? ERID.fromJSON(object.erid) : undefined,
    };
  },

  toJSON(message: CategoriesBlock_Category): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.payload !== undefined) {
      obj.payload = Payload.toJSON(message.payload);
    }
    if (message.erid !== undefined) {
      obj.erid = ERID.toJSON(message.erid);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoriesBlock_Category>, I>>(base?: I): CategoriesBlock_Category {
    return CategoriesBlock_Category.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CategoriesBlock_Category>, I>>(object: I): CategoriesBlock_Category {
    const message = createBaseCategoriesBlock_Category();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Payload.fromPartial(object.payload)
      : undefined;
    message.erid = (object.erid !== undefined && object.erid !== null) ? ERID.fromPartial(object.erid) : undefined;
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
