/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ContactData } from "../../entities/contact_data.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Добавление контактных данных пользователя */
export interface AddUserContactRequest {
  /** Обновляемые контактные данные */
  contact:
    | ContactData
    | undefined;
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  accessToken: string;
}

function createBaseAddUserContactRequest(): AddUserContactRequest {
  return { contact: undefined, sessionData: undefined, accessToken: "" };
}

export const AddUserContactRequest = {
  encode(message: AddUserContactRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contact !== undefined) {
      ContactData.encode(message.contact, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddUserContactRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddUserContactRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contact = ContactData.decode(reader, reader.uint32());
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddUserContactRequest {
    return {
      contact: isSet(object.contact) ? ContactData.fromJSON(object.contact) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: AddUserContactRequest): unknown {
    const obj: any = {};
    if (message.contact !== undefined) {
      obj.contact = ContactData.toJSON(message.contact);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddUserContactRequest>, I>>(base?: I): AddUserContactRequest {
    return AddUserContactRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddUserContactRequest>, I>>(object: I): AddUserContactRequest {
    const message = createBaseAddUserContactRequest();
    message.contact = (object.contact !== undefined && object.contact !== null)
      ? ContactData.fromPartial(object.contact)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
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
