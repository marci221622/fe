/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { FavoriteListBrand } from "../../entities/favorite_list_brand.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** AddBrandsToFavoriteListRequest запрос на добавления брендов в избранное */
export interface AddBrandsToFavoriteListRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Бренды добавляемые в список избранного */
  brands: FavoriteListBrand[];
}

/** Ответ на добавление. Приходит пустой если бренды добавлены, иначе ошибка */
export interface AddBrandsToFavoriteListResponse {
}

function createBaseAddBrandsToFavoriteListRequest(): AddBrandsToFavoriteListRequest {
  return { sessionData: undefined, brands: [] };
}

export const AddBrandsToFavoriteListRequest = {
  encode(message: AddBrandsToFavoriteListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.brands) {
      FavoriteListBrand.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddBrandsToFavoriteListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddBrandsToFavoriteListRequest();
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

  fromJSON(object: any): AddBrandsToFavoriteListRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      brands: globalThis.Array.isArray(object?.brands)
        ? object.brands.map((e: any) => FavoriteListBrand.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddBrandsToFavoriteListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => FavoriteListBrand.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddBrandsToFavoriteListRequest>, I>>(base?: I): AddBrandsToFavoriteListRequest {
    return AddBrandsToFavoriteListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddBrandsToFavoriteListRequest>, I>>(
    object: I,
  ): AddBrandsToFavoriteListRequest {
    const message = createBaseAddBrandsToFavoriteListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.brands = object.brands?.map((e) => FavoriteListBrand.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddBrandsToFavoriteListResponse(): AddBrandsToFavoriteListResponse {
  return {};
}

export const AddBrandsToFavoriteListResponse = {
  encode(_: AddBrandsToFavoriteListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddBrandsToFavoriteListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddBrandsToFavoriteListResponse();
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

  fromJSON(_: any): AddBrandsToFavoriteListResponse {
    return {};
  },

  toJSON(_: AddBrandsToFavoriteListResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AddBrandsToFavoriteListResponse>, I>>(base?: I): AddBrandsToFavoriteListResponse {
    return AddBrandsToFavoriteListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddBrandsToFavoriteListResponse>, I>>(_: I): AddBrandsToFavoriteListResponse {
    const message = createBaseAddBrandsToFavoriteListResponse();
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
