/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Объект хлебных крошек */
export interface BreadCrumbs {
  name: string;
  /** слаг */
  link: string;
  /**
   * гендер для построения URL'a ссылки,
   * на момент 27.10.2023 есть только два гендера: male и female
   */
  gender: string;
}

function createBaseBreadCrumbs(): BreadCrumbs {
  return { name: "", link: "", gender: "" };
}

export const BreadCrumbs = {
  encode(message: BreadCrumbs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.link !== "") {
      writer.uint32(18).string(message.link);
    }
    if (message.gender !== "") {
      writer.uint32(26).string(message.gender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BreadCrumbs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBreadCrumbs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.link = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BreadCrumbs {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      link: isSet(object.link) ? globalThis.String(object.link) : "",
      gender: isSet(object.gender) ? globalThis.String(object.gender) : "",
    };
  },

  toJSON(message: BreadCrumbs): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.link !== "") {
      obj.link = message.link;
    }
    if (message.gender !== "") {
      obj.gender = message.gender;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BreadCrumbs>, I>>(base?: I): BreadCrumbs {
    return BreadCrumbs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BreadCrumbs>, I>>(object: I): BreadCrumbs {
    const message = createBaseBreadCrumbs();
    message.name = object.name ?? "";
    message.link = object.link ?? "";
    message.gender = object.gender ?? "";
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
