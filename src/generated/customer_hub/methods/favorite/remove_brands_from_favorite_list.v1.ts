/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FavoriteListBrand } from "../../entities/favorite_list_brand.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** RemoveBrandsFromFavoriteListRequest запрос на удаление бренда из избранного */
export interface RemoveBrandsFromFavoriteListRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Коды брендов удаляемых из списка избранного */
  brands: FavoriteListBrand[];
}

/** Ответ на удаление из списка избранного. Приходит пустой если бренды удалены, иначе ошибка */
export interface RemoveBrandsFromFavoriteListResponse {
}

function createBaseRemoveBrandsFromFavoriteListRequest(): RemoveBrandsFromFavoriteListRequest {
  return { sessionData: undefined, brands: [] };
}

export const RemoveBrandsFromFavoriteListRequest = {
  encode(message: RemoveBrandsFromFavoriteListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.brands) {
      FavoriteListBrand.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveBrandsFromFavoriteListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveBrandsFromFavoriteListRequest();
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

  fromJSON(object: any): RemoveBrandsFromFavoriteListRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      brands: globalThis.Array.isArray(object?.brands)
        ? object.brands.map((e: any) => FavoriteListBrand.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RemoveBrandsFromFavoriteListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => FavoriteListBrand.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveBrandsFromFavoriteListRequest>, I>>(
    base?: I,
  ): RemoveBrandsFromFavoriteListRequest {
    return RemoveBrandsFromFavoriteListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveBrandsFromFavoriteListRequest>, I>>(
    object: I,
  ): RemoveBrandsFromFavoriteListRequest {
    const message = createBaseRemoveBrandsFromFavoriteListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.brands = object.brands?.map((e) => FavoriteListBrand.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveBrandsFromFavoriteListResponse(): RemoveBrandsFromFavoriteListResponse {
  return {};
}

export const RemoveBrandsFromFavoriteListResponse = {
  encode(_: RemoveBrandsFromFavoriteListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveBrandsFromFavoriteListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveBrandsFromFavoriteListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RemoveBrandsFromFavoriteListResponse {
    return {};
  },

  toJSON(_: RemoveBrandsFromFavoriteListResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveBrandsFromFavoriteListResponse>, I>>(
    base?: I,
  ): RemoveBrandsFromFavoriteListResponse {
    return RemoveBrandsFromFavoriteListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RemoveBrandsFromFavoriteListResponse>, I>>(
    _: I,
  ): RemoveBrandsFromFavoriteListResponse {
    const message = createBaseRemoveBrandsFromFavoriteListResponse();
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
