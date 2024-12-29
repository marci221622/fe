/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BrandItems } from "../../entities/brand_items.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Section, sectionFromJSON, sectionToJSON } from "../../enums/section";
import { Sort, sortFromJSON, sortToJSON } from "../../enums/sort";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение списка Товаров по списку любимых Брендов */
export interface GetFavoriteBrandsItemsListRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Параметры поиска Брендов */
  searchParams: SearchBrandsItemsParams | undefined;
}

export interface SearchBrandsItemsParams {
  brandsCodes: string[];
  /** Секция бренда, если задана, то будут возвращены товары только переданного бренда */
  section?:
    | Section
    | undefined;
  /** Количество возвращаемых товаров для бренда */
  itemsCount: string;
  /** Сортировка */
  sort: Sort;
}

/** Список брендов */
export interface GetBrandsItemsListResponse {
  /** Список Брендов с секциями и товарами в каждом бренде */
  items: BrandItems[];
}

function createBaseGetFavoriteBrandsItemsListRequest(): GetFavoriteBrandsItemsListRequest {
  return { sessionData: undefined, searchParams: undefined };
}

export const GetFavoriteBrandsItemsListRequest = {
  encode(message: GetFavoriteBrandsItemsListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.searchParams !== undefined) {
      SearchBrandsItemsParams.encode(message.searchParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFavoriteBrandsItemsListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFavoriteBrandsItemsListRequest();
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

          message.searchParams = SearchBrandsItemsParams.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFavoriteBrandsItemsListRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      searchParams: isSet(object.searchParams) ? SearchBrandsItemsParams.fromJSON(object.searchParams) : undefined,
    };
  },

  toJSON(message: GetFavoriteBrandsItemsListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.searchParams !== undefined) {
      obj.searchParams = SearchBrandsItemsParams.toJSON(message.searchParams);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFavoriteBrandsItemsListRequest>, I>>(
    base?: I,
  ): GetFavoriteBrandsItemsListRequest {
    return GetFavoriteBrandsItemsListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFavoriteBrandsItemsListRequest>, I>>(
    object: I,
  ): GetFavoriteBrandsItemsListRequest {
    const message = createBaseGetFavoriteBrandsItemsListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.searchParams = (object.searchParams !== undefined && object.searchParams !== null)
      ? SearchBrandsItemsParams.fromPartial(object.searchParams)
      : undefined;
    return message;
  },
};

function createBaseSearchBrandsItemsParams(): SearchBrandsItemsParams {
  return { brandsCodes: [], section: undefined, itemsCount: "0", sort: 0 };
}

export const SearchBrandsItemsParams = {
  encode(message: SearchBrandsItemsParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.brandsCodes) {
      writer.uint32(10).string(v!);
    }
    if (message.section !== undefined) {
      writer.uint32(24).int32(message.section);
    }
    if (message.itemsCount !== "0") {
      writer.uint32(16).int64(message.itemsCount);
    }
    if (message.sort !== 0) {
      writer.uint32(32).int32(message.sort);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchBrandsItemsParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchBrandsItemsParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brandsCodes.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.sort = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchBrandsItemsParams {
    return {
      brandsCodes: globalThis.Array.isArray(object?.brandsCodes)
        ? object.brandsCodes.map((e: any) => globalThis.String(e))
        : [],
      section: isSet(object.section) ? sectionFromJSON(object.section) : undefined,
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      sort: isSet(object.sort) ? sortFromJSON(object.sort) : 0,
    };
  },

  toJSON(message: SearchBrandsItemsParams): unknown {
    const obj: any = {};
    if (message.brandsCodes?.length) {
      obj.brandsCodes = message.brandsCodes;
    }
    if (message.section !== undefined) {
      obj.section = sectionToJSON(message.section);
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.sort !== 0) {
      obj.sort = sortToJSON(message.sort);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchBrandsItemsParams>, I>>(base?: I): SearchBrandsItemsParams {
    return SearchBrandsItemsParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchBrandsItemsParams>, I>>(object: I): SearchBrandsItemsParams {
    const message = createBaseSearchBrandsItemsParams();
    message.brandsCodes = object.brandsCodes?.map((e) => e) || [];
    message.section = object.section ?? undefined;
    message.itemsCount = object.itemsCount ?? "0";
    message.sort = object.sort ?? 0;
    return message;
  },
};

function createBaseGetBrandsItemsListResponse(): GetBrandsItemsListResponse {
  return { items: [] };
}

export const GetBrandsItemsListResponse = {
  encode(message: GetBrandsItemsListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      BrandItems.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBrandsItemsListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBrandsItemsListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(BrandItems.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBrandsItemsListResponse {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => BrandItems.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetBrandsItemsListResponse): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => BrandItems.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBrandsItemsListResponse>, I>>(base?: I): GetBrandsItemsListResponse {
    return GetBrandsItemsListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBrandsItemsListResponse>, I>>(object: I): GetBrandsItemsListResponse {
    const message = createBaseGetBrandsItemsListResponse();
    message.items = object.items?.map((e) => BrandItems.fromPartial(e)) || [];
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
