/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Button } from "./button.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Текстовый блок. Отображается в конце главной страницы. */
export interface InfoBlock {
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Список текстового блока */
  items: InfoBlock_InfoItem[];
  /** Кнопка */
  button:
    | Button
    | undefined;
  /** Позиция */
  position: string;
}

/** Элемент списка текстового блока */
export interface InfoBlock_InfoItem {
  /** Текст */
  text: string;
  /** Ссылка на картинку-иконку */
  iconLink?:
    | string
    | undefined;
  /** Картинка-иконка встроенная в приложение */
  iconNamed: string;
  /** Идентификатор */
  id: string;
  /** Позиция */
  position: string;
}

function createBaseInfoBlock(): InfoBlock {
  return { id: "0", title: "", items: [], button: undefined, position: "0" };
}

export const InfoBlock = {
  encode(message: InfoBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    for (const v of message.items) {
      InfoBlock_InfoItem.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.button !== undefined) {
      Button.encode(message.button, writer.uint32(42).fork()).ldelim();
    }
    if (message.position !== "0") {
      writer.uint32(48).int64(message.position);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoBlock();
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

          message.items.push(InfoBlock_InfoItem.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.button = Button.decode(reader, reader.uint32());
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

  fromJSON(object: any): InfoBlock {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      items: globalThis.Array.isArray(object?.items)
        ? object.items.map((e: any) => InfoBlock_InfoItem.fromJSON(e))
        : [],
      button: isSet(object.button) ? Button.fromJSON(object.button) : undefined,
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
    };
  },

  toJSON(message: InfoBlock): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.items?.length) {
      obj.items = message.items.map((e) => InfoBlock_InfoItem.toJSON(e));
    }
    if (message.button !== undefined) {
      obj.button = Button.toJSON(message.button);
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoBlock>, I>>(base?: I): InfoBlock {
    return InfoBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoBlock>, I>>(object: I): InfoBlock {
    const message = createBaseInfoBlock();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.items = object.items?.map((e) => InfoBlock_InfoItem.fromPartial(e)) || [];
    message.button = (object.button !== undefined && object.button !== null)
      ? Button.fromPartial(object.button)
      : undefined;
    message.position = object.position ?? "0";
    return message;
  },
};

function createBaseInfoBlock_InfoItem(): InfoBlock_InfoItem {
  return { text: "", iconLink: undefined, iconNamed: "", id: "0", position: "0" };
}

export const InfoBlock_InfoItem = {
  encode(message: InfoBlock_InfoItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.iconLink !== undefined) {
      writer.uint32(18).string(message.iconLink);
    }
    if (message.iconNamed !== "") {
      writer.uint32(26).string(message.iconNamed);
    }
    if (message.id !== "0") {
      writer.uint32(32).int64(message.id);
    }
    if (message.position !== "0") {
      writer.uint32(40).int64(message.position);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoBlock_InfoItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoBlock_InfoItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.text = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.iconLink = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.iconNamed = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
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

  fromJSON(object: any): InfoBlock_InfoItem {
    return {
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      iconLink: isSet(object.iconLink) ? globalThis.String(object.iconLink) : undefined,
      iconNamed: isSet(object.iconNamed) ? globalThis.String(object.iconNamed) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
    };
  },

  toJSON(message: InfoBlock_InfoItem): unknown {
    const obj: any = {};
    if (message.text !== "") {
      obj.text = message.text;
    }
    if (message.iconLink !== undefined) {
      obj.iconLink = message.iconLink;
    }
    if (message.iconNamed !== "") {
      obj.iconNamed = message.iconNamed;
    }
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoBlock_InfoItem>, I>>(base?: I): InfoBlock_InfoItem {
    return InfoBlock_InfoItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoBlock_InfoItem>, I>>(object: I): InfoBlock_InfoItem {
    const message = createBaseInfoBlock_InfoItem();
    message.text = object.text ?? "";
    message.iconLink = object.iconLink ?? undefined;
    message.iconNamed = object.iconNamed ?? "";
    message.id = object.id ?? "0";
    message.position = object.position ?? "0";
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
