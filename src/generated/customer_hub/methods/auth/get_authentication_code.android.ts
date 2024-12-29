/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { AuthenticationMeta } from "../../entities/authentication_meta.v1";
import { CaptchaVerificationInfo } from "../../entities/captcha_response";
import { ContactData } from "../../entities/contact_data.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение кода доступа */
export interface GetAuthenticationCodeAndroidRequest {
  /** Данные пользователя */
  contact:
    | ContactData
    | undefined;
  /** Ответ сервиса проверки captcha */
  verificationInfo:
    | CaptchaVerificationInfo
    | undefined;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Ответ запроса кода доступа */
export interface GetAuthenticationCodeAndroidResponse {
  /** Код авторизации */
  code: string;
  /** Мета данные по авторизации */
  meta: AuthenticationMeta | undefined;
}

function createBaseGetAuthenticationCodeAndroidRequest(): GetAuthenticationCodeAndroidRequest {
  return { contact: undefined, verificationInfo: undefined, sessionData: undefined };
}

export const GetAuthenticationCodeAndroidRequest = {
  encode(message: GetAuthenticationCodeAndroidRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contact !== undefined) {
      ContactData.encode(message.contact, writer.uint32(10).fork()).ldelim();
    }
    if (message.verificationInfo !== undefined) {
      CaptchaVerificationInfo.encode(message.verificationInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthenticationCodeAndroidRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticationCodeAndroidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contact = ContactData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.verificationInfo = CaptchaVerificationInfo.decode(reader, reader.uint32());
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

  fromJSON(object: any): GetAuthenticationCodeAndroidRequest {
    return {
      contact: isSet(object.contact) ? ContactData.fromJSON(object.contact) : undefined,
      verificationInfo: isSet(object.verificationInfo)
        ? CaptchaVerificationInfo.fromJSON(object.verificationInfo)
        : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetAuthenticationCodeAndroidRequest): unknown {
    const obj: any = {};
    if (message.contact !== undefined) {
      obj.contact = ContactData.toJSON(message.contact);
    }
    if (message.verificationInfo !== undefined) {
      obj.verificationInfo = CaptchaVerificationInfo.toJSON(message.verificationInfo);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthenticationCodeAndroidRequest>, I>>(
    base?: I,
  ): GetAuthenticationCodeAndroidRequest {
    return GetAuthenticationCodeAndroidRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthenticationCodeAndroidRequest>, I>>(
    object: I,
  ): GetAuthenticationCodeAndroidRequest {
    const message = createBaseGetAuthenticationCodeAndroidRequest();
    message.contact = (object.contact !== undefined && object.contact !== null)
      ? ContactData.fromPartial(object.contact)
      : undefined;
    message.verificationInfo = (object.verificationInfo !== undefined && object.verificationInfo !== null)
      ? CaptchaVerificationInfo.fromPartial(object.verificationInfo)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetAuthenticationCodeAndroidResponse(): GetAuthenticationCodeAndroidResponse {
  return { code: "", meta: undefined };
}

export const GetAuthenticationCodeAndroidResponse = {
  encode(message: GetAuthenticationCodeAndroidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.meta !== undefined) {
      AuthenticationMeta.encode(message.meta, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthenticationCodeAndroidResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticationCodeAndroidResponse();
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

          message.meta = AuthenticationMeta.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAuthenticationCodeAndroidResponse {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      meta: isSet(object.meta) ? AuthenticationMeta.fromJSON(object.meta) : undefined,
    };
  },

  toJSON(message: GetAuthenticationCodeAndroidResponse): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.meta !== undefined) {
      obj.meta = AuthenticationMeta.toJSON(message.meta);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAuthenticationCodeAndroidResponse>, I>>(
    base?: I,
  ): GetAuthenticationCodeAndroidResponse {
    return GetAuthenticationCodeAndroidResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAuthenticationCodeAndroidResponse>, I>>(
    object: I,
  ): GetAuthenticationCodeAndroidResponse {
    const message = createBaseGetAuthenticationCodeAndroidResponse();
    message.code = object.code ?? "";
    message.meta = (object.meta !== undefined && object.meta !== null)
      ? AuthenticationMeta.fromPartial(object.meta)
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
