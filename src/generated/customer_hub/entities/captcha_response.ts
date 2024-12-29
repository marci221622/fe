/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CaptchaProvider, captchaProviderFromJSON, captchaProviderToJSON } from "../enums/captcha_provider";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Ответ SDK на проверку captcha */
export interface CaptchaVerificationInfo {
  /** Использованный для проверки сервис. Поддерживается только reCaptcha */
  provider: CaptchaProvider;
  /** Ответ SDK после проверки на клиенте */
  response: string;
}

function createBaseCaptchaVerificationInfo(): CaptchaVerificationInfo {
  return { provider: 0, response: "" };
}

export const CaptchaVerificationInfo = {
  encode(message: CaptchaVerificationInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.provider !== 0) {
      writer.uint32(8).int32(message.provider);
    }
    if (message.response !== "") {
      writer.uint32(18).string(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CaptchaVerificationInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCaptchaVerificationInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.provider = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CaptchaVerificationInfo {
    return {
      provider: isSet(object.provider) ? captchaProviderFromJSON(object.provider) : 0,
      response: isSet(object.response) ? globalThis.String(object.response) : "",
    };
  },

  toJSON(message: CaptchaVerificationInfo): unknown {
    const obj: any = {};
    if (message.provider !== 0) {
      obj.provider = captchaProviderToJSON(message.provider);
    }
    if (message.response !== "") {
      obj.response = message.response;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CaptchaVerificationInfo>, I>>(base?: I): CaptchaVerificationInfo {
    return CaptchaVerificationInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CaptchaVerificationInfo>, I>>(object: I): CaptchaVerificationInfo {
    const message = createBaseCaptchaVerificationInfo();
    message.provider = object.provider ?? 0;
    message.response = object.response ?? "";
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
