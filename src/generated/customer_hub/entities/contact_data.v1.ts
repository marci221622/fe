/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ContactType, contactTypeFromJSON, contactTypeToJSON } from "../enums/contact_type";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Контактные данные */
export interface ContactData {
  /** Тип контакта */
  type: ContactType;
  /** Значение (Пример: для типа PHONE 89091371488) */
  value: string;
  /** Имя пользователя */
  personName?: string | undefined;
}

function createBaseContactData(): ContactData {
  return { type: 0, value: "", personName: undefined };
}

export const ContactData = {
  encode(message: ContactData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.personName !== undefined) {
      writer.uint32(26).string(message.personName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContactData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContactData();
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

  fromJSON(object: any): ContactData {
    return {
      type: isSet(object.type) ? contactTypeFromJSON(object.type) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      personName: isSet(object.personName) ? globalThis.String(object.personName) : undefined,
    };
  },

  toJSON(message: ContactData): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<ContactData>, I>>(base?: I): ContactData {
    return ContactData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContactData>, I>>(object: I): ContactData {
    const message = createBaseContactData();
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
