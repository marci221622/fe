/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Brand } from "../../entities/brand.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Ответ на запрос списка брендов */
export interface GetBrandListRequest {
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Ответ на запрос списка брендов */
export interface GetBrandListResponse {
  /** Список брендов */
  brands: Brand[];
}

function createBaseGetBrandListRequest(): GetBrandListRequest {
  return { sessionData: undefined };
}

export const GetBrandListRequest = {
  encode(message: GetBrandListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBrandListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBrandListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBrandListRequest {
    return { sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined };
  },

  toJSON(message: GetBrandListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBrandListRequest>, I>>(base?: I): GetBrandListRequest {
    return GetBrandListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBrandListRequest>, I>>(object: I): GetBrandListRequest {
    const message = createBaseGetBrandListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetBrandListResponse(): GetBrandListResponse {
  return { brands: [] };
}

export const GetBrandListResponse = {
  encode(message: GetBrandListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.brands) {
      Brand.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBrandListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBrandListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brands.push(Brand.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBrandListResponse {
    return { brands: globalThis.Array.isArray(object?.brands) ? object.brands.map((e: any) => Brand.fromJSON(e)) : [] };
  },

  toJSON(message: GetBrandListResponse): unknown {
    const obj: any = {};
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => Brand.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBrandListResponse>, I>>(base?: I): GetBrandListResponse {
    return GetBrandListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBrandListResponse>, I>>(object: I): GetBrandListResponse {
    const message = createBaseGetBrandListResponse();
    message.brands = object.brands?.map((e) => Brand.fromPartial(e)) || [];
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
