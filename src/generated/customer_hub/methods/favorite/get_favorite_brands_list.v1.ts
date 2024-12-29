/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FavoriteListBrand } from "../../entities/favorite_list_brand.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение списка брендов */
export interface GetFavoriteBrandsListRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Секция бренда, если не передано - возвращаются все избранные бренды */
  section?: string | undefined;
}

/** Список брендов */
export interface GetFavoriteBrandsListResponse {
  /** Бренды, sections заполняется в зависимости от добавленного в избранное */
  brands: FavoriteListBrand[];
}

function createBaseGetFavoriteBrandsListRequest(): GetFavoriteBrandsListRequest {
  return { sessionData: undefined, section: undefined };
}

export const GetFavoriteBrandsListRequest = {
  encode(message: GetFavoriteBrandsListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.section !== undefined) {
      writer.uint32(18).string(message.section);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFavoriteBrandsListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFavoriteBrandsListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.section = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFavoriteBrandsListRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      section: isSet(object.section) ? globalThis.String(object.section) : undefined,
    };
  },

  toJSON(message: GetFavoriteBrandsListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.section !== undefined) {
      obj.section = message.section;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFavoriteBrandsListRequest>, I>>(base?: I): GetFavoriteBrandsListRequest {
    return GetFavoriteBrandsListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFavoriteBrandsListRequest>, I>>(object: I): GetFavoriteBrandsListRequest {
    const message = createBaseGetFavoriteBrandsListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.section = object.section ?? undefined;
    return message;
  },
};

function createBaseGetFavoriteBrandsListResponse(): GetFavoriteBrandsListResponse {
  return { brands: [] };
}

export const GetFavoriteBrandsListResponse = {
  encode(message: GetFavoriteBrandsListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.brands) {
      FavoriteListBrand.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFavoriteBrandsListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFavoriteBrandsListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brands.push(FavoriteListBrand.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFavoriteBrandsListResponse {
    return {
      brands: globalThis.Array.isArray(object?.brands)
        ? object.brands.map((e: any) => FavoriteListBrand.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetFavoriteBrandsListResponse): unknown {
    const obj: any = {};
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => FavoriteListBrand.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFavoriteBrandsListResponse>, I>>(base?: I): GetFavoriteBrandsListResponse {
    return GetFavoriteBrandsListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFavoriteBrandsListResponse>, I>>(
    object: I,
  ): GetFavoriteBrandsListResponse {
    const message = createBaseGetFavoriteBrandsListResponse();
    message.brands = object.brands?.map((e) => FavoriteListBrand.fromPartial(e)) || [];
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
