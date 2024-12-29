/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.common.auth.v1";

export enum ContactType {
  CONTACT_TYPE_UNSPECIFIED = 0,
  CONTACT_TYPE_PHONE = 1,
  CONTACT_TYPE_EMAIL = 2,
  UNRECOGNIZED = -1,
}

export function contactTypeFromJSON(object: any): ContactType {
  switch (object) {
    case 0:
    case "CONTACT_TYPE_UNSPECIFIED":
      return ContactType.CONTACT_TYPE_UNSPECIFIED;
    case 1:
    case "CONTACT_TYPE_PHONE":
      return ContactType.CONTACT_TYPE_PHONE;
    case 2:
    case "CONTACT_TYPE_EMAIL":
      return ContactType.CONTACT_TYPE_EMAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContactType.UNRECOGNIZED;
  }
}

export function contactTypeToJSON(object: ContactType): string {
  switch (object) {
    case ContactType.CONTACT_TYPE_UNSPECIFIED:
      return "CONTACT_TYPE_UNSPECIFIED";
    case ContactType.CONTACT_TYPE_PHONE:
      return "CONTACT_TYPE_PHONE";
    case ContactType.CONTACT_TYPE_EMAIL:
      return "CONTACT_TYPE_EMAIL";
    case ContactType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Contact {
  id: string;
  contact: ContactData | undefined;
}

export interface ContactData {
  type: ContactType;
  value: string;
  personName?: string | undefined;
}

export interface GetAuthenticationCodeRequest {
  contact: ContactData | undefined;
}

export interface AuthenticationCodeResponse {
  code: string;
}

export interface AuthenticateByCodeRequest {
  code: string;
  contactValue: string;
  userIp: string;
  fingerprint?: string | undefined;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RevokeUserTokensRequest {
  userId: string;
  refreshToken?: string | undefined;
}

export interface RevokeTokenRequest {
  refreshToken: string;
}

export interface ServiceAuthorization {
  enabled: boolean;
}

function createBaseContact(): Contact {
  return { id: "0", contact: undefined };
}

export const Contact = {
  encode(message: Contact, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.contact !== undefined) {
      ContactData.encode(message.contact, writer.uint32(18).fork()).ldelim();
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
          if (tag !== 18) {
            break;
          }

          message.contact = ContactData.decode(reader, reader.uint32());
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
      contact: isSet(object.contact) ? ContactData.fromJSON(object.contact) : undefined,
    };
  },

  toJSON(message: Contact): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.contact !== undefined) {
      obj.contact = ContactData.toJSON(message.contact);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Contact>, I>>(base?: I): Contact {
    return Contact.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Contact>, I>>(object: I): Contact {
    const message = createBaseContact();
    message.id = object.id ?? "0";
    message.contact = (object.contact !== undefined && object.contact !== null)
      ? ContactData.fromPartial(object.contact)
      : undefined;
    return message;
  },
};

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

function createBaseGetAuthenticationCodeRequest(): GetAuthenticationCodeRequest {
  return { contact: undefined };
}

export const GetAuthenticationCodeRequest = {
  encode(message: GetAuthenticationCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contact !== undefined) {
      ContactData.encode(message.contact, writer.uint32(10).fork()).ldelim();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAuthenticationCodeRequest {
    return { contact: isSet(object.contact) ? ContactData.fromJSON(object.contact) : undefined };
  },

  toJSON(message: GetAuthenticationCodeRequest): unknown {
    const obj: any = {};
    if (message.contact !== undefined) {
      obj.contact = ContactData.toJSON(message.contact);
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
    return message;
  },
};

function createBaseAuthenticationCodeResponse(): AuthenticationCodeResponse {
  return { code: "" };
}

export const AuthenticationCodeResponse = {
  encode(message: AuthenticationCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthenticationCodeResponse {
    return { code: isSet(object.code) ? globalThis.String(object.code) : "" };
  },

  toJSON(message: AuthenticationCodeResponse): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticationCodeResponse>, I>>(base?: I): AuthenticationCodeResponse {
    return AuthenticationCodeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticationCodeResponse>, I>>(object: I): AuthenticationCodeResponse {
    const message = createBaseAuthenticationCodeResponse();
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseAuthenticateByCodeRequest(): AuthenticateByCodeRequest {
  return { code: "", contactValue: "", userIp: "", fingerprint: undefined };
}

export const AuthenticateByCodeRequest = {
  encode(message: AuthenticateByCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.contactValue !== "") {
      writer.uint32(18).string(message.contactValue);
    }
    if (message.userIp !== "") {
      writer.uint32(26).string(message.userIp);
    }
    if (message.fingerprint !== undefined) {
      writer.uint32(34).string(message.fingerprint);
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userIp = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fingerprint = reader.string();
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
      userIp: isSet(object.userIp) ? globalThis.String(object.userIp) : "",
      fingerprint: isSet(object.fingerprint) ? globalThis.String(object.fingerprint) : undefined,
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
    if (message.userIp !== "") {
      obj.userIp = message.userIp;
    }
    if (message.fingerprint !== undefined) {
      obj.fingerprint = message.fingerprint;
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
    message.userIp = object.userIp ?? "";
    message.fingerprint = object.fingerprint ?? undefined;
    return message;
  },
};

function createBaseTokenResponse(): TokenResponse {
  return { accessToken: "", refreshToken: "" };
}

export const TokenResponse = {
  encode(message: TokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
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
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenResponse>, I>>(base?: I): TokenResponse {
    return TokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TokenResponse>, I>>(object: I): TokenResponse {
    const message = createBaseTokenResponse();
    message.accessToken = object.accessToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseRefreshTokenRequest(): RefreshTokenRequest {
  return { refreshToken: "" };
}

export const RefreshTokenRequest = {
  encode(message: RefreshTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefreshTokenRequest {
    return { refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "" };
  },

  toJSON(message: RefreshTokenRequest): unknown {
    const obj: any = {};
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RefreshTokenRequest>, I>>(base?: I): RefreshTokenRequest {
    return RefreshTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RefreshTokenRequest>, I>>(object: I): RefreshTokenRequest {
    const message = createBaseRefreshTokenRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseRevokeUserTokensRequest(): RevokeUserTokensRequest {
  return { userId: "0", refreshToken: undefined };
}

export const RevokeUserTokensRequest = {
  encode(message: RevokeUserTokensRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).int64(message.userId);
    }
    if (message.refreshToken !== undefined) {
      writer.uint32(18).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeUserTokensRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeUserTokensRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeUserTokensRequest {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "0",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : undefined,
    };
  },

  toJSON(message: RevokeUserTokensRequest): unknown {
    const obj: any = {};
    if (message.userId !== "0") {
      obj.userId = message.userId;
    }
    if (message.refreshToken !== undefined) {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeUserTokensRequest>, I>>(base?: I): RevokeUserTokensRequest {
    return RevokeUserTokensRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeUserTokensRequest>, I>>(object: I): RevokeUserTokensRequest {
    const message = createBaseRevokeUserTokensRequest();
    message.userId = object.userId ?? "0";
    message.refreshToken = object.refreshToken ?? undefined;
    return message;
  },
};

function createBaseRevokeTokenRequest(): RevokeTokenRequest {
  return { refreshToken: "" };
}

export const RevokeTokenRequest = {
  encode(message: RevokeTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refreshToken !== "") {
      writer.uint32(10).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RevokeTokenRequest {
    return { refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "" };
  },

  toJSON(message: RevokeTokenRequest): unknown {
    const obj: any = {};
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeTokenRequest>, I>>(base?: I): RevokeTokenRequest {
    return RevokeTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeTokenRequest>, I>>(object: I): RevokeTokenRequest {
    const message = createBaseRevokeTokenRequest();
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseServiceAuthorization(): ServiceAuthorization {
  return { enabled: false };
}

export const ServiceAuthorization = {
  encode(message: ServiceAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceAuthorization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServiceAuthorization {
    return { enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false };
  },

  toJSON(message: ServiceAuthorization): unknown {
    const obj: any = {};
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServiceAuthorization>, I>>(base?: I): ServiceAuthorization {
    return ServiceAuthorization.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServiceAuthorization>, I>>(object: I): ServiceAuthorization {
    const message = createBaseServiceAuthorization();
    message.enabled = object.enabled ?? false;
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
