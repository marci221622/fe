/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Система учёта рекламы */
export interface ERID {
  /** токен рекламного блока */
  token: string;
  /** отображаемое название */
  legalEntityName: string;
}

function createBaseERID(): ERID {
  return { token: "", legalEntityName: "" };
}

export const ERID = {
  encode(message: ERID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.legalEntityName !== "") {
      writer.uint32(18).string(message.legalEntityName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ERID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseERID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.legalEntityName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ERID {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      legalEntityName: isSet(object.legalEntityName) ? globalThis.String(object.legalEntityName) : "",
    };
  },

  toJSON(message: ERID): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.legalEntityName !== "") {
      obj.legalEntityName = message.legalEntityName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ERID>, I>>(base?: I): ERID {
    return ERID.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ERID>, I>>(object: I): ERID {
    const message = createBaseERID();
    message.token = object.token ?? "";
    message.legalEntityName = object.legalEntityName ?? "";
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
