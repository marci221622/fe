/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ContactType, contactTypeFromJSON, contactTypeToJSON } from "../enums/contact_type";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Контакт пользователя */
export interface Contact {
  /** Идентификатор */
  id: string;
  /** Тип контакта (телефон, почта и т.д.) */
  type: ContactType;
  /** Значение */
  value: string;
  /** Имя пользователя */
  personName?: string | undefined;
}

function createBaseContact(): Contact {
  return { id: "0", type: 0, value: "", personName: undefined };
}

export const Contact = {
  encode(message: Contact, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    if (message.personName !== undefined) {
      writer.uint32(34).string(message.personName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contact {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContact();
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

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.personName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Contact {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      type: isSet(object.type) ? contactTypeFromJSON(object.type) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      personName: isSet(object.personName) ? globalThis.String(object.personName) : undefined,
    };
  },

  toJSON(message: Contact): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.type !== 0) {
      obj.type = contactTypeToJSON(message.type);
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.personName !== undefined) {
      obj.personName = message.personName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Contact>, I>>(base?: I): Contact {
    return Contact.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Contact>, I>>(object: I): Contact {
    const message = createBaseContact();
    message.id = object.id ?? "0";
    message.type = object.type ?? 0;
    message.value = object.value ?? "";
    message.personName = object.personName ?? undefined;
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
