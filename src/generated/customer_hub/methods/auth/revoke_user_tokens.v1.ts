/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на отзыв всех токенов доступа */
export interface RevokeUserTokensRequest {
  /** Идентификатор пользователя */
  userId: string;
  /** Refresh токен */
  refreshToken: string;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

function createBaseRevokeUserTokensRequest(): RevokeUserTokensRequest {
  return { userId: "0", refreshToken: "", sessionData: undefined };
}

export const RevokeUserTokensRequest = {
  encode(message: RevokeUserTokensRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).int64(message.userId);
    }
    if (message.refreshToken !== "") {
      writer.uint32(18).string(message.refreshToken);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
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

  fromJSON(object: any): RevokeUserTokensRequest {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "0",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: RevokeUserTokensRequest): unknown {
    const obj: any = {};
    if (message.userId !== "0") {
      obj.userId = message.userId;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RevokeUserTokensRequest>, I>>(base?: I): RevokeUserTokensRequest {
    return RevokeUserTokensRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RevokeUserTokensRequest>, I>>(object: I): RevokeUserTokensRequest {
    const message = createBaseRevokeUserTokensRequest();
    message.userId = object.userId ?? "0";
    message.refreshToken = object.refreshToken ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
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
