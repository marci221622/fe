/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.common.money.v1";

export interface Money {
  /**
   * Код валюты в формате ISO 4217 (прим. ).
   * Пример: RUB; USD; KZT;
   */
  currencyCode: string;
  /**
   * Единица валюты.
   * Как конкатенация целых и сотых.
   * Пример: 1р. 35к. = 135; 100р. = 10000; 1$ 1c = 101;
   */
  units: string;
}

function createBaseMoney(): Money {
  return { currencyCode: "", units: "0" };
}

export const Money = {
  encode(message: Money, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currencyCode !== "") {
      writer.uint32(10).string(message.currencyCode);
    }
    if (message.units !== "0") {
      writer.uint32(16).int64(message.units);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Money {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoney();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.currencyCode = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.units = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Money {
    return {
      currencyCode: isSet(object.currencyCode) ? globalThis.String(object.currencyCode) : "",
      units: isSet(object.units) ? globalThis.String(object.units) : "0",
    };
  },

  toJSON(message: Money): unknown {
    const obj: any = {};
    if (message.currencyCode !== "") {
      obj.currencyCode = message.currencyCode;
    }
    if (message.units !== "0") {
      obj.units = message.units;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Money>, I>>(base?: I): Money {
    return Money.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Money>, I>>(object: I): Money {
    const message = createBaseMoney();
    message.currencyCode = object.currencyCode ?? "";
    message.units = object.units ?? "0";
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
