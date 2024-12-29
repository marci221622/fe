/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Мета данные по авторизации */
export interface AuthenticationMeta {
  timeoutSeconds: string;
}

function createBaseAuthenticationMeta(): AuthenticationMeta {
  return { timeoutSeconds: "0" };
}

export const AuthenticationMeta = {
  encode(message: AuthenticationMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timeoutSeconds !== "0") {
      writer.uint32(8).int64(message.timeoutSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticationMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticationMeta();
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

  fromJSON(object: any): AuthenticationMeta {
    return { timeoutSeconds: isSet(object.timeoutSeconds) ? globalThis.String(object.timeoutSeconds) : "0" };
  },

  toJSON(message: AuthenticationMeta): unknown {
    const obj: any = {};
    if (message.timeoutSeconds !== "0") {
      obj.timeoutSeconds = message.timeoutSeconds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthenticationMeta>, I>>(base?: I): AuthenticationMeta {
    return AuthenticationMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthenticationMeta>, I>>(object: I): AuthenticationMeta {
    const message = createBaseAuthenticationMeta();
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
