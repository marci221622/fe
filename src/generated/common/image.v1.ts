/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.common.image.v1";

/**
 * Изображение: товара, баннера, категории и т.д.
 * https://kb.int.tsum.com/display/PONG/Image+Proto
 */
export interface Image {
  src: string;
  mime: string;
  width: number;
  height: number;
  /**
   * Параметр cases может отражать различные цели и состояния, например:
   * web, phone, desktop - для выбора целевой платформы или типа устройства (в вебе они тоже разные)
   * mobile-network - изображения в более низком качестве для тарифицируемого или медленного интернета
   * no-watermark - а что если понадобится превентивно выводить изображения без водяного знака пусть даже в низком качестве?
   * baseline или progressive - для выбора стратегии с превью
   * vip-account - для vip пользователей только лучшее
   * home-page, catalog-page, item-page, cart-page - можно даже так, за неимением оных можно будет найти любое другое подходящее изображение или не выводить вовсе
   * tiny, small, medium, large - план Б на размеры
   */
  cases: Image_Case[];
}

export enum Image_Case {
  CASE_SIZE_UNSPECIFIED = 0,
  CASE_SIZE_SMALL = 1,
  CASE_SIZE_MEDIUM = 2,
  CASE_SIZE_LARGE = 3,
  CASE_SIZE_SOURCE = 4,
  UNRECOGNIZED = -1,
}

export function image_CaseFromJSON(object: any): Image_Case {
  switch (object) {
    case 0:
    case "CASE_SIZE_UNSPECIFIED":
      return Image_Case.CASE_SIZE_UNSPECIFIED;
    case 1:
    case "CASE_SIZE_SMALL":
      return Image_Case.CASE_SIZE_SMALL;
    case 2:
    case "CASE_SIZE_MEDIUM":
      return Image_Case.CASE_SIZE_MEDIUM;
    case 3:
    case "CASE_SIZE_LARGE":
      return Image_Case.CASE_SIZE_LARGE;
    case 4:
    case "CASE_SIZE_SOURCE":
      return Image_Case.CASE_SIZE_SOURCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Image_Case.UNRECOGNIZED;
  }
}

export function image_CaseToJSON(object: Image_Case): string {
  switch (object) {
    case Image_Case.CASE_SIZE_UNSPECIFIED:
      return "CASE_SIZE_UNSPECIFIED";
    case Image_Case.CASE_SIZE_SMALL:
      return "CASE_SIZE_SMALL";
    case Image_Case.CASE_SIZE_MEDIUM:
      return "CASE_SIZE_MEDIUM";
    case Image_Case.CASE_SIZE_LARGE:
      return "CASE_SIZE_LARGE";
    case Image_Case.CASE_SIZE_SOURCE:
      return "CASE_SIZE_SOURCE";
    case Image_Case.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseImage(): Image {
  return { src: "", mime: "", width: 0, height: 0, cases: [] };
}

export const Image = {
  encode(message: Image, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.src !== "") {
      writer.uint32(10).string(message.src);
    }
    if (message.mime !== "") {
      writer.uint32(18).string(message.mime);
    }
    if (message.width !== 0) {
      writer.uint32(24).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    writer.uint32(42).fork();
    for (const v of message.cases) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Image {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.src = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mime = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.width = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.height = reader.int32();
          continue;
        case 5:
          if (tag === 40) {
            message.cases.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cases.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Image {
    return {
      src: isSet(object.src) ? globalThis.String(object.src) : "",
      mime: isSet(object.mime) ? globalThis.String(object.mime) : "",
      width: isSet(object.width) ? globalThis.Number(object.width) : 0,
      height: isSet(object.height) ? globalThis.Number(object.height) : 0,
      cases: globalThis.Array.isArray(object?.cases) ? object.cases.map((e: any) => image_CaseFromJSON(e)) : [],
    };
  },

  toJSON(message: Image): unknown {
    const obj: any = {};
    if (message.src !== "") {
      obj.src = message.src;
    }
    if (message.mime !== "") {
      obj.mime = message.mime;
    }
    if (message.width !== 0) {
      obj.width = Math.round(message.width);
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.cases?.length) {
      obj.cases = message.cases.map((e) => image_CaseToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Image>, I>>(base?: I): Image {
    return Image.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Image>, I>>(object: I): Image {
    const message = createBaseImage();
    message.src = object.src ?? "";
    message.mime = object.mime ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.cases = object.cases?.map((e) => e) || [];
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
