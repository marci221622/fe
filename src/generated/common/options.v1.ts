/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.common.options.v1";

/** читается в https://gitlab.int.tsum.com/preowned/simona/delta/core/ для логирования */
export interface SensitiveData {
  /**
   * if set, hides only specified keys, otherwise the whole field of type map<...,...>
   * do not rename! delta/core depends on it
   */
  mapKeysToRedact: string[];
  /**
   * if set, replaces value of string field by their encrypted version
   * do not rename! delta/core depends on it
   */
  needEncrypt: boolean;
}

function createBaseSensitiveData(): SensitiveData {
  return { mapKeysToRedact: [], needEncrypt: false };
}

export const SensitiveData = {
  encode(message: SensitiveData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.mapKeysToRedact) {
      writer.uint32(10).string(v!);
    }
    if (message.needEncrypt === true) {
      writer.uint32(16).bool(message.needEncrypt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SensitiveData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSensitiveData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mapKeysToRedact.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.needEncrypt = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SensitiveData {
    return {
      mapKeysToRedact: globalThis.Array.isArray(object?.mapKeysToRedact)
        ? object.mapKeysToRedact.map((e: any) => globalThis.String(e))
        : [],
      needEncrypt: isSet(object.needEncrypt) ? globalThis.Boolean(object.needEncrypt) : false,
    };
  },

  toJSON(message: SensitiveData): unknown {
    const obj: any = {};
    if (message.mapKeysToRedact?.length) {
      obj.mapKeysToRedact = message.mapKeysToRedact;
    }
    if (message.needEncrypt === true) {
      obj.needEncrypt = message.needEncrypt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SensitiveData>, I>>(base?: I): SensitiveData {
    return SensitiveData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SensitiveData>, I>>(object: I): SensitiveData {
    const message = createBaseSensitiveData();
    message.mapKeysToRedact = object.mapKeysToRedact?.map((e) => e) || [];
    message.needEncrypt = object.needEncrypt ?? false;
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
