/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Payload } from "./payload.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Кнопка под секцией блока */
export interface Button {
  /** Заголовок */
  title: string;
  /** Данные по кнопке */
  payload: Payload | undefined;
}

function createBaseButton(): Button {
  return { title: "", payload: undefined };
}

export const Button = {
  encode(message: Button, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.payload !== undefined) {
      Payload.encode(message.payload, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Button {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseButton();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.payload = Payload.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Button {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      payload: isSet(object.payload) ? Payload.fromJSON(object.payload) : undefined,
    };
  },

  toJSON(message: Button): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.payload !== undefined) {
      obj.payload = Payload.toJSON(message.payload);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Button>, I>>(base?: I): Button {
    return Button.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Button>, I>>(object: I): Button {
    const message = createBaseButton();
    message.title = object.title ?? "";
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Payload.fromPartial(object.payload)
      : undefined;
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
