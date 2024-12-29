/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описание значений фильтра типа RANGE */
export interface Range {
  /** минимальное возможное значение */
  min?:
    | string
    | undefined;
  /** максимальное возможное значение */
  max?: string | undefined;
}

function createBaseRange(): Range {
  return { min: undefined, max: undefined };
}

export const Range = {
  encode(message: Range, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.min !== undefined) {
      writer.uint32(8).int64(message.min);
    }
    if (message.max !== undefined) {
      writer.uint32(16).int64(message.max);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Range {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.min = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.max = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Range {
    return {
      min: isSet(object.min) ? globalThis.String(object.min) : undefined,
      max: isSet(object.max) ? globalThis.String(object.max) : undefined,
    };
  },

  toJSON(message: Range): unknown {
    const obj: any = {};
    if (message.min !== undefined) {
      obj.min = message.min;
    }
    if (message.max !== undefined) {
      obj.max = message.max;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Range>, I>>(base?: I): Range {
    return Range.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Range>, I>>(object: I): Range {
    const message = createBaseRange();
    message.min = object.min ?? undefined;
    message.max = object.max ?? undefined;
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
