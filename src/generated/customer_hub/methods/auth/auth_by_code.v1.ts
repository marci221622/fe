/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";
import { UserData } from "../../entities/user_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на авторизацию в системе по коду */
export interface AuthenticateByCodeRequest {
  /** Код */
  code: string;
  /** Контакт на который пришел код авторизации */
  contactValue: string;
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Кастомные коды сессий чекаута */
  customSessionCodes: string[];
}

/** Токен получаемый при успешной авторизации по коду */
export interface TokenResponse {
  /** Access токен */
  accessToken: string;
  /** Refresh токен */
  refreshToken: string;
  /** Новый ли пользователь в системе */
  isNewUser: boolean;
  /** Lанные профиля авторизованного пользователя */
  customerProfile:
    | UserData
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  userId: string;
}

function createBaseAuthenticateByCodeRequest(): AuthenticateByCodeRequest {
  return { code: "", contactValue: "", sessionData: undefined, customSessionCodes: [] };
}

export const AuthenticateByCodeRequest = {
  encode(message: AuthenticateByCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.contactValue !== "") {
      writer.uint32(18).string(message.contactValue);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    for (const v of message.customSessionCodes) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateByCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateByCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contactValue = reader.string();
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.customSessionCodes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticateByCodeRequest {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      contactValue: isSet(object.contactValue) ? globalThis.String(object.contactValue) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      customSessionCodes: globalThis.Array.isArray(object?.customSessionCodes)
        ? object.customSessionCodes.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: AuthenticateByCodeRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.contactValue !== "") {
      obj.contactValue = message.contactValue;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.customSessionCodes?.length) {
      obj.customSessionCodes = message.customSessionCodes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticateByCodeRequest>, I>>(base?: I): AuthenticateByCodeRequest {
    return AuthenticateByCodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticateByCodeRequest>, I>>(object: I): AuthenticateByCodeRequest {
    const message = createBaseAuthenticateByCodeRequest();
    message.code = object.code ?? "";
    message.contactValue = object.contactValue ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.customSessionCodes = object.customSessionCodes?.map((e) => e) || [];
    return message;
  },
};

function createBaseTokenResponse(): TokenResponse {
  return { accessToken: "", refreshToken: "", isNewUser: false, customerProfile: undefined, userId: "0" };
}

export const TokenResponse = {
  encode(message: TokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    if (message.isNewUser === true) {
      writer.uint32(24).bool(message.isNewUser);
    }
    if (message.customerProfile !== undefined) {
      UserData.encode(message.customerProfile, writer.uint32(42).fork()).ldelim();
    }
    if (message.userId !== "0") {
      writer.uint32(32).int64(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isNewUser = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.customerProfile = UserData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
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

  fromJSON(object: any): TokenResponse {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      isNewUser: isSet(object.isNewUser) ? globalThis.Boolean(object.isNewUser) : false,
      customerProfile: isSet(object.customerProfile) ? UserData.fromJSON(object.customerProfile) : undefined,
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "0",
    };
  },

  toJSON(message: TokenResponse): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.isNewUser === true) {
      obj.isNewUser = message.isNewUser;
    }
    if (message.customerProfile !== undefined) {
      obj.customerProfile = UserData.toJSON(message.customerProfile);
    }
    if (message.userId !== "0") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenResponse>, I>>(base?: I): TokenResponse {
    return TokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TokenResponse>, I>>(object: I): TokenResponse {
    const message = createBaseTokenResponse();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    message.isNewUser = object.isNewUser ?? false;
    message.customerProfile = (object.customerProfile !== undefined && object.customerProfile !== null)
      ? UserData.fromPartial(object.customerProfile)
      : undefined;
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
