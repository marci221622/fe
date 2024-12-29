/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Contact } from "../../entities/contact.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Получение профиля пользователя */
export interface GetCustomerProfileRequest {
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

/** Профиль пользователя */
export interface CustomerProfileResponse {
  /** Идентификатор клиента */
  customerId: string;
  /** "Родительский" идентификатор */
  parentId?:
    | string
    | undefined;
  /** Имя клиента */
  firstName: string;
  /** Отчество клиента */
  secondName: string;
  /** Фамилия клиента */
  lastName: string;
  /** Имя пользователя */
  login: string;
  /** Идентификатор предпочитаемого контакта для связи */
  preferredContactId: string;
  /** Структура с контактными данными */
  contacts: Contact[];
  /** Идентификатор пользователя */
  userId: string;
}

function createBaseGetCustomerProfileRequest(): GetCustomerProfileRequest {
  return { sessionData: undefined, accessToken: "" };
}

export const GetCustomerProfileRequest = {
  encode(message: GetCustomerProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerProfileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): GetCustomerProfileRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: GetCustomerProfileRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerProfileRequest>, I>>(base?: I): GetCustomerProfileRequest {
    return GetCustomerProfileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerProfileRequest>, I>>(object: I): GetCustomerProfileRequest {
    const message = createBaseGetCustomerProfileRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseCustomerProfileResponse(): CustomerProfileResponse {
  return {
    customerId: "0",
    parentId: undefined,
    firstName: "",
    secondName: "",
    lastName: "",
    login: "",
    preferredContactId: "0",
    contacts: [],
    userId: "0",
  };
}

export const CustomerProfileResponse = {
  encode(message: CustomerProfileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerId !== "0") {
      writer.uint32(8).int64(message.customerId);
    }
    if (message.parentId !== undefined) {
      writer.uint32(16).int64(message.parentId);
    }
    if (message.firstName !== "") {
      writer.uint32(26).string(message.firstName);
    }
    if (message.secondName !== "") {
      writer.uint32(34).string(message.secondName);
    }
    if (message.lastName !== "") {
      writer.uint32(42).string(message.lastName);
    }
    if (message.login !== "") {
      writer.uint32(50).string(message.login);
    }
    if (message.preferredContactId !== "0") {
      writer.uint32(56).int64(message.preferredContactId);
    }
    for (const v of message.contacts) {
      Contact.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.userId !== "0") {
      writer.uint32(72).int64(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerProfileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerProfileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.customerId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.parentId = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.secondName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.login = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.preferredContactId = longToString(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.contacts.push(Contact.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.userId = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerProfileResponse {
    return {
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : "0",
      parentId: isSet(object.parentId) ? globalThis.String(object.parentId) : undefined,
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : "",
      secondName: isSet(object.secondName) ? globalThis.String(object.secondName) : "",
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : "",
      login: isSet(object.login) ? globalThis.String(object.login) : "",
      preferredContactId: isSet(object.preferredContactId) ? globalThis.String(object.preferredContactId) : "0",
      contacts: globalThis.Array.isArray(object?.contacts) ? object.contacts.map((e: any) => Contact.fromJSON(e)) : [],
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "0",
    };
  },

  toJSON(message: CustomerProfileResponse): unknown {
    const obj: any = {};
    if (message.customerId !== "0") {
      obj.customerId = message.customerId;
    }
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
    }
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.secondName !== "") {
      obj.secondName = message.secondName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.login !== "") {
      obj.login = message.login;
    }
    if (message.preferredContactId !== "0") {
      obj.preferredContactId = message.preferredContactId;
    }
    if (message.contacts?.length) {
      obj.contacts = message.contacts.map((e) => Contact.toJSON(e));
    }
    if (message.userId !== "0") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerProfileResponse>, I>>(base?: I): CustomerProfileResponse {
    return CustomerProfileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerProfileResponse>, I>>(object: I): CustomerProfileResponse {
    const message = createBaseCustomerProfileResponse();
    message.customerId = object.customerId ?? "0";
    message.parentId = object.parentId ?? undefined;
    message.firstName = object.firstName ?? "";
    message.secondName = object.secondName ?? "";
    message.lastName = object.lastName ?? "";
    message.login = object.login ?? "";
    message.preferredContactId = object.preferredContactId ?? "0";
    message.contacts = object.contacts?.map((e) => Contact.fromPartial(e)) || [];
    message.userId = object.userId ?? "0";
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
