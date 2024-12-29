/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** FavoriteListBrand объект бренда в избранном */
export interface FavoriteListBrand {
  /** Код бренда */
  brandCode: string;
  /** Секции */
  sections: string[];
}

function createBaseFavoriteListBrand(): FavoriteListBrand {
  return { brandCode: "", sections: [] };
}

export const FavoriteListBrand = {
  encode(message: FavoriteListBrand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.brandCode !== "") {
      writer.uint32(10).string(message.brandCode);
    }
    for (const v of message.sections) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FavoriteListBrand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFavoriteListBrand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brandCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sections.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FavoriteListBrand {
    return {
      brandCode: isSet(object.brandCode) ? globalThis.String(object.brandCode) : "",
      sections: globalThis.Array.isArray(object?.sections) ? object.sections.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: FavoriteListBrand): unknown {
    const obj: any = {};
    if (message.brandCode !== "") {
      obj.brandCode = message.brandCode;
    }
    if (message.sections?.length) {
      obj.sections = message.sections;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FavoriteListBrand>, I>>(base?: I): FavoriteListBrand {
    return FavoriteListBrand.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FavoriteListBrand>, I>>(object: I): FavoriteListBrand {
    const message = createBaseFavoriteListBrand();
    message.brandCode = object.brandCode ?? "";
    message.sections = object.sections?.map((e) => e) || [];
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
