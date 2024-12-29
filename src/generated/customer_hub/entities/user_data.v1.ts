/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Contact } from "./contact.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Данные пользователя */
export interface UserData {
  /** Имя */
  firstName?:
    | string
    | undefined;
  /** Отчество */
  secondName?:
    | string
    | undefined;
  /** Фамилия */
  lastName?:
    | string
    | undefined;
  /** Логин */
  login?:
    | string
    | undefined;
  /** Контакты */
  contacts: Contact[];
  /** UDID */
  UDID?:
    | string
    | undefined;
  /** Идентификатор покупателя */
  customerId?:
    | string
    | undefined;
  /** Предпочитаемый id для связи */
  preferredContactId?:
    | string
    | undefined;
  /** Идентификатор пользователя */
  userId?:
    | string
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  password?: string | undefined;
}

function createBaseUserData(): UserData {
  return {
    firstName: undefined,
    secondName: undefined,
    lastName: undefined,
    login: undefined,
    contacts: [],
    UDID: undefined,
    customerId: undefined,
    preferredContactId: undefined,
    userId: undefined,
    password: undefined,
  };
}

export const UserData = {
  encode(message: UserData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== undefined) {
      writer.uint32(10).string(message.firstName);
    }
    if (message.secondName !== undefined) {
      writer.uint32(18).string(message.secondName);
    }
    if (message.lastName !== undefined) {
      writer.uint32(26).string(message.lastName);
    }
    if (message.login !== undefined) {
      writer.uint32(34).string(message.login);
    }
    for (const v of message.contacts) {
      Contact.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.UDID !== undefined) {
      writer.uint32(58).string(message.UDID);
    }
    if (message.customerId !== undefined) {
      writer.uint32(66).string(message.customerId);
    }
    if (message.preferredContactId !== undefined) {
      writer.uint32(74).string(message.preferredContactId);
    }
    if (message.userId !== undefined) {
      writer.uint32(82).string(message.userId);
    }
    if (message.password !== undefined) {
      writer.uint32(42).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.secondName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.login = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.contacts.push(Contact.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.UDID = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.customerId = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.preferredContactId = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserData {
    return {
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : undefined,
      secondName: isSet(object.secondName) ? globalThis.String(object.secondName) : undefined,
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : undefined,
      login: isSet(object.login) ? globalThis.String(object.login) : undefined,
      contacts: globalThis.Array.isArray(object?.contacts) ? object.contacts.map((e: any) => Contact.fromJSON(e)) : [],
      UDID: isSet(object.UDID) ? globalThis.String(object.UDID) : undefined,
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : undefined,
      preferredContactId: isSet(object.preferredContactId) ? globalThis.String(object.preferredContactId) : undefined,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : undefined,
      password: isSet(object.password) ? globalThis.String(object.password) : undefined,
    };
  },

  toJSON(message: UserData): unknown {
    const obj: any = {};
    if (message.firstName !== undefined) {
      obj.firstName = message.firstName;
    }
    if (message.secondName !== undefined) {
      obj.secondName = message.secondName;
    }
    if (message.lastName !== undefined) {
      obj.lastName = message.lastName;
    }
    if (message.login !== undefined) {
      obj.login = message.login;
    }
    if (message.contacts?.length) {
      obj.contacts = message.contacts.map((e) => Contact.toJSON(e));
    }
    if (message.UDID !== undefined) {
      obj.UDID = message.UDID;
    }
    if (message.customerId !== undefined) {
      obj.customerId = message.customerId;
    }
    if (message.preferredContactId !== undefined) {
      obj.preferredContactId = message.preferredContactId;
    }
    if (message.userId !== undefined) {
      obj.userId = message.userId;
    }
    if (message.password !== undefined) {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserData>, I>>(base?: I): UserData {
    return UserData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserData>, I>>(object: I): UserData {
    const message = createBaseUserData();
    message.firstName = object.firstName ?? undefined;
    message.secondName = object.secondName ?? undefined;
    message.lastName = object.lastName ?? undefined;
    message.login = object.login ?? undefined;
    message.contacts = object.contacts?.map((e) => Contact.fromPartial(e)) || [];
    message.UDID = object.UDID ?? undefined;
    message.customerId = object.customerId ?? undefined;
    message.preferredContactId = object.preferredContactId ?? undefined;
    message.userId = object.userId ?? undefined;
    message.password = object.password ?? undefined;
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
