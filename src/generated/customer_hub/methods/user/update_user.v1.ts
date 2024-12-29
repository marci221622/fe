/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Contact } from "../../entities/contact.v1";
import { SessionData } from "../../entities/session_data.v1";
import { UserData } from "../../entities/user_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на обновление данных пользователя */
export interface UpdateUserRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Данные пользователя */
  userData:
    | UserData
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  preferredContactId?: string | undefined;
}

/** Данные пользователя из ответа */
export interface UserDataResponse {
  /** Имя */
  firstName: string;
  /** Отчество */
  secondName: string;
  /** Фамилия */
  lastName: string;
  /** Логин */
  login: string;
}

/** Ответ по обновлению данных пользователя */
export interface UserResponse {
  /** Идентификатор */
  id: string;
  /** Идентификатор предпочитаемого контатка */
  preferredContactId: string;
  /** Контактный денные */
  contacts: Contact[];
  /** Данные пользователя */
  userData: UserDataResponse | undefined;
}

function createBaseUpdateUserRequest(): UpdateUserRequest {
  return { sessionData: undefined, userData: undefined, preferredContactId: undefined };
}

export const UpdateUserRequest = {
  encode(message: UpdateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.userData !== undefined) {
      UserData.encode(message.userData, writer.uint32(26).fork()).ldelim();
    }
    if (message.preferredContactId !== undefined) {
      writer.uint32(16).int64(message.preferredContactId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userData = UserData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.preferredContactId = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      userData: isSet(object.userData) ? UserData.fromJSON(object.userData) : undefined,
      preferredContactId: isSet(object.preferredContactId) ? globalThis.String(object.preferredContactId) : undefined,
    };
  },

  toJSON(message: UpdateUserRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.userData !== undefined) {
      obj.userData = UserData.toJSON(message.userData);
    }
    if (message.preferredContactId !== undefined) {
      obj.preferredContactId = message.preferredContactId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(base?: I): UpdateUserRequest {
    return UpdateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(object: I): UpdateUserRequest {
    const message = createBaseUpdateUserRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.userData = (object.userData !== undefined && object.userData !== null)
      ? UserData.fromPartial(object.userData)
      : undefined;
    message.preferredContactId = object.preferredContactId ?? undefined;
    return message;
  },
};

function createBaseUserDataResponse(): UserDataResponse {
  return { firstName: "", secondName: "", lastName: "", login: "" };
}

export const UserDataResponse = {
  encode(message: UserDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstName !== "") {
      writer.uint32(10).string(message.firstName);
    }
    if (message.secondName !== "") {
      writer.uint32(18).string(message.secondName);
    }
    if (message.lastName !== "") {
      writer.uint32(26).string(message.lastName);
    }
    if (message.login !== "") {
      writer.uint32(34).string(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserDataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserDataResponse();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserDataResponse {
    return {
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : "",
      secondName: isSet(object.secondName) ? globalThis.String(object.secondName) : "",
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : "",
      login: isSet(object.login) ? globalThis.String(object.login) : "",
    };
  },

  toJSON(message: UserDataResponse): unknown {
    const obj: any = {};
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
    return obj;
  },

  create<I extends Exact<DeepPartial<UserDataResponse>, I>>(base?: I): UserDataResponse {
    return UserDataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserDataResponse>, I>>(object: I): UserDataResponse {
    const message = createBaseUserDataResponse();
    message.firstName = object.firstName ?? "";
    message.secondName = object.secondName ?? "";
    message.lastName = object.lastName ?? "";
    message.login = object.login ?? "";
    return message;
  },
};

function createBaseUserResponse(): UserResponse {
  return { id: "0", preferredContactId: "0", contacts: [], userData: undefined };
}

export const UserResponse = {
  encode(message: UserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.preferredContactId !== "0") {
      writer.uint32(16).int64(message.preferredContactId);
    }
    for (const v of message.contacts) {
      Contact.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.userData !== undefined) {
      UserDataResponse.encode(message.userData, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserResponse();
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

          message.preferredContactId = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contacts.push(Contact.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.userData = UserDataResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      preferredContactId: isSet(object.preferredContactId) ? globalThis.String(object.preferredContactId) : "0",
      contacts: globalThis.Array.isArray(object?.contacts) ? object.contacts.map((e: any) => Contact.fromJSON(e)) : [],
      userData: isSet(object.userData) ? UserDataResponse.fromJSON(object.userData) : undefined,
    };
  },

  toJSON(message: UserResponse): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.preferredContactId !== "0") {
      obj.preferredContactId = message.preferredContactId;
    }
    if (message.contacts?.length) {
      obj.contacts = message.contacts.map((e) => Contact.toJSON(e));
    }
    if (message.userData !== undefined) {
      obj.userData = UserDataResponse.toJSON(message.userData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserResponse>, I>>(base?: I): UserResponse {
    return UserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserResponse>, I>>(object: I): UserResponse {
    const message = createBaseUserResponse();
    message.id = object.id ?? "0";
    message.preferredContactId = object.preferredContactId ?? "0";
    message.contacts = object.contacts?.map((e) => Contact.fromPartial(e)) || [];
    message.userData = (object.userData !== undefined && object.userData !== null)
      ? UserDataResponse.fromPartial(object.userData)
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
