/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ContactData } from "../../entities/contact_data.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/**
 * @exclude deprecated at 25.10.2023, delete after 01.12.2023
 *
 * @deprecated
 */
export interface GetAuthenticationCodeRequest {
  /** Данные пользователя */
  contact:
    | ContactData
    | undefined;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/**
 * @exclude deprecated at 25.10.2023, delete after 01.12.2023
 *
 * @deprecated
 */
export interface AuthenticationCodeResponse {
  /** Код авторизации */
  code: string;
  meta: AuthenticationCodeResponse_AuthenticationMeta | undefined;
}

/** Мета данные по авторизации */
export interface AuthenticationCodeResponse_AuthenticationMeta {
  timeoutSeconds: string;
}

function createBaseGetAuthenticationCodeRequest(): GetAuthenticationCodeRequest {
  return { contact: undefined, sessionData: undefined };
}

export const GetAuthenticationCodeRequest = {
  encode(message: GetAuthenticationCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contact !== undefined) {
      ContactData.encode(message.contact, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthenticationCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticationCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAuthenticationCodeRequest {
    return {
      contact: isSet(object.contact) ? ContactData.fromJSON(object.contact) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetAuthenticationCodeRequest): unknown {
    const obj: any = {};
    if (message.contact !== undefined) {
      obj.contact = ContactData.toJSON(message.contact);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthenticationCodeRequest>, I>>(base?: I): GetAuthenticationCodeRequest {
    return GetAuthenticationCodeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthenticationCodeRequest>, I>>(object: I): GetAuthenticationCodeRequest {
    const message = createBaseGetAuthenticationCodeRequest();
    message.contact = (object.contact !== undefined && object.contact !== null)
      ? ContactData.fromPartial(object.contact)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseAuthenticationCodeResponse(): AuthenticationCodeResponse {
  return { code: "", meta: undefined };
}

export const AuthenticationCodeResponse = {
  encode(message: AuthenticationCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.meta !== undefined) {
      AuthenticationCodeResponse_AuthenticationMeta.encode(message.meta, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticationCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticationCodeResponse();
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

          message.meta = AuthenticationCodeResponse_AuthenticationMeta.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticationCodeResponse {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      meta: isSet(object.meta) ? AuthenticationCodeResponse_AuthenticationMeta.fromJSON(object.meta) : undefined,
    };
  },

  toJSON(message: AuthenticationCodeResponse): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.meta !== undefined) {
      obj.meta = AuthenticationCodeResponse_AuthenticationMeta.toJSON(message.meta);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticationCodeResponse>, I>>(base?: I): AuthenticationCodeResponse {
    return AuthenticationCodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticationCodeResponse>, I>>(object: I): AuthenticationCodeResponse {
    const message = createBaseAuthenticationCodeResponse();
    message.code = object.code ?? "";
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? AuthenticationCodeResponse_AuthenticationMeta.fromPartial(object.meta)
      : undefined;
    return message;
  },
};

function createBaseAuthenticationCodeResponse_AuthenticationMeta(): AuthenticationCodeResponse_AuthenticationMeta {
  return { timeoutSeconds: "0" };
}

export const AuthenticationCodeResponse_AuthenticationMeta = {
  encode(message: AuthenticationCodeResponse_AuthenticationMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timeoutSeconds !== "0") {
      writer.uint32(8).int64(message.timeoutSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticationCodeResponse_AuthenticationMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticationCodeResponse_AuthenticationMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timeoutSeconds = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticationCodeResponse_AuthenticationMeta {
    return { timeoutSeconds: isSet(object.timeoutSeconds) ? globalThis.String(object.timeoutSeconds) : "0" };
  },

  toJSON(message: AuthenticationCodeResponse_AuthenticationMeta): unknown {
    const obj: any = {};
    if (message.timeoutSeconds !== "0") {
      obj.timeoutSeconds = message.timeoutSeconds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticationCodeResponse_AuthenticationMeta>, I>>(
    base?: I,
  ): AuthenticationCodeResponse_AuthenticationMeta {
    return AuthenticationCodeResponse_AuthenticationMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticationCodeResponse_AuthenticationMeta>, I>>(
    object: I,
  ): AuthenticationCodeResponse_AuthenticationMeta {
    const message = createBaseAuthenticationCodeResponse_AuthenticationMeta();
    message.timeoutSeconds = object.timeoutSeconds ?? "0";
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
