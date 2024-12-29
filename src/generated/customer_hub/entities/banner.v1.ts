/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { ERID } from "./erid.v1";
import { Payload } from "./payload.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Баннер с изображением, текстовым описанием под ним, и payload. */
export interface Banner {
  /** Изображение */
  image:
    | Image
    | undefined;
  /** Данные по банеру */
  payload:
    | Payload
    | undefined;
  /** Идентификатор */
  id: string;
  /** Заголовок */
  title: string;
  /** Описание/текст под банером */
  description: string;
  /** ERID рекламного блока */
  erid?: ERID | undefined;
}

function createBaseBanner(): Banner {
  return { image: undefined, payload: undefined, id: "0", title: "", description: "", erid: undefined };
}

export const Banner = {
  encode(message: Banner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    if (message.payload !== undefined) {
      Payload.encode(message.payload, writer.uint32(26).fork()).ldelim();
    }
    if (message.id !== "0") {
      writer.uint32(32).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(42).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.erid !== undefined) {
      ERID.encode(message.erid, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Banner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.payload = Payload.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.title = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.erid = ERID.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Banner {
    return {
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      payload: isSet(object.payload) ? Payload.fromJSON(object.payload) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      erid: isSet(object.erid) ? ERID.fromJSON(object.erid) : undefined,
    };
  },

  toJSON(message: Banner): unknown {
    const obj: any = {};
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.payload !== undefined) {
      obj.payload = Payload.toJSON(message.payload);
    }
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.erid !== undefined) {
      obj.erid = ERID.toJSON(message.erid);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Banner>, I>>(base?: I): Banner {
    return Banner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Banner>, I>>(object: I): Banner {
    const message = createBaseBanner();
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.payload = (object.payload !== undefined && object.payload !== null)
      ? Payload.fromPartial(object.payload)
      : undefined;
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.erid = (object.erid !== undefined && object.erid !== null) ? ERID.fromPartial(object.erid) : undefined;
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
