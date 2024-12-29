/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Размер */
export interface Size {
  /** Российский размер */
  russianSize: string;
  /** Российское наименование размера */
  russianLabel: string;
  /** Размер производителя */
  vendorSize: string;
  /** Наименование размера производителя */
  vendorLabel: string;
}

function createBaseSize(): Size {
  return { russianSize: "", russianLabel: "", vendorSize: "", vendorLabel: "" };
}

export const Size = {
  encode(message: Size, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.russianSize !== "") {
      writer.uint32(10).string(message.russianSize);
    }
    if (message.russianLabel !== "") {
      writer.uint32(18).string(message.russianLabel);
    }
    if (message.vendorSize !== "") {
      writer.uint32(26).string(message.vendorSize);
    }
    if (message.vendorLabel !== "") {
      writer.uint32(34).string(message.vendorLabel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Size {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.russianSize = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.russianLabel = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.vendorSize = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.vendorLabel = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Size {
    return {
      russianSize: isSet(object.russianSize) ? globalThis.String(object.russianSize) : "",
      russianLabel: isSet(object.russianLabel) ? globalThis.String(object.russianLabel) : "",
      vendorSize: isSet(object.vendorSize) ? globalThis.String(object.vendorSize) : "",
      vendorLabel: isSet(object.vendorLabel) ? globalThis.String(object.vendorLabel) : "",
    };
  },

  toJSON(message: Size): unknown {
    const obj: any = {};
    if (message.russianSize !== "") {
      obj.russianSize = message.russianSize;
    }
    if (message.russianLabel !== "") {
      obj.russianLabel = message.russianLabel;
    }
    if (message.vendorSize !== "") {
      obj.vendorSize = message.vendorSize;
    }
    if (message.vendorLabel !== "") {
      obj.vendorLabel = message.vendorLabel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Size>, I>>(base?: I): Size {
    return Size.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Size>, I>>(object: I): Size {
    const message = createBaseSize();
    message.russianSize = object.russianSize ?? "";
    message.russianLabel = object.russianLabel ?? "";
    message.vendorSize = object.vendorSize ?? "";
    message.vendorLabel = object.vendorLabel ?? "";
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
