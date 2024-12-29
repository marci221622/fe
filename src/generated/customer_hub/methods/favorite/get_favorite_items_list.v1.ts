/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Item } from "../../entities/item.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение списка товаров */
export interface GetFavoriteItemsListRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** favorite_list_id - фильтрация товаров по признаку принадлежности к списку избранного пользователя */
  favoriteListId: string;
  /**
   * page_size - количество запрашиваемых айтемов на одной странице
   * по-умолчанию 20, если не передано
   */
  pageSize?:
    | string
    | undefined;
  /** Пагинация, если пустая строка, выведет результаты первой страницы */
  pageToken: string;
  /** фильтр по товарам в наличии */
  inStock?: boolean | undefined;
}

/** Список товаров */
export interface GetFavoriteItemsListResponse {
  /** Товары */
  items: Item[];
  /** items_count общее количество найденных айтемов в БД удовлетворяющих запросу */
  itemsCount: string;
  /**
   * next_page_token - токен следующей страницы пагинации.
   *
   * Чтобы запросить результаты следующей страницы, нужно подставить значение next_page_token
   * в GetItemsRequest.page_token.
   * Если пустая строка, то текущая страница - последняя.
   */
  nextPageToken: string;
}

function createBaseGetFavoriteItemsListRequest(): GetFavoriteItemsListRequest {
  return { sessionData: undefined, favoriteListId: "", pageSize: undefined, pageToken: "", inStock: undefined };
}

export const GetFavoriteItemsListRequest = {
  encode(message: GetFavoriteItemsListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.favoriteListId !== "") {
      writer.uint32(18).string(message.favoriteListId);
    }
    if (message.pageSize !== undefined) {
      writer.uint32(24).int64(message.pageSize);
    }
    if (message.pageToken !== "") {
      writer.uint32(34).string(message.pageToken);
    }
    if (message.inStock !== undefined) {
      writer.uint32(40).bool(message.inStock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFavoriteItemsListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFavoriteItemsListRequest();
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

          message.favoriteListId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageSize = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pageToken = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.inStock = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFavoriteItemsListRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      favoriteListId: isSet(object.favoriteListId) ? globalThis.String(object.favoriteListId) : "",
      pageSize: isSet(object.pageSize) ? globalThis.String(object.pageSize) : undefined,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      inStock: isSet(object.inStock) ? globalThis.Boolean(object.inStock) : undefined,
    };
  },

  toJSON(message: GetFavoriteItemsListRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.favoriteListId !== "") {
      obj.favoriteListId = message.favoriteListId;
    }
    if (message.pageSize !== undefined) {
      obj.pageSize = message.pageSize;
    }
    if (message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.inStock !== undefined) {
      obj.inStock = message.inStock;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFavoriteItemsListRequest>, I>>(base?: I): GetFavoriteItemsListRequest {
    return GetFavoriteItemsListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFavoriteItemsListRequest>, I>>(object: I): GetFavoriteItemsListRequest {
    const message = createBaseGetFavoriteItemsListRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.favoriteListId = object.favoriteListId ?? "";
    message.pageSize = object.pageSize ?? undefined;
    message.pageToken = object.pageToken ?? "";
    message.inStock = object.inStock ?? undefined;
    return message;
  },
};

function createBaseGetFavoriteItemsListResponse(): GetFavoriteItemsListResponse {
  return { items: [], itemsCount: "0", nextPageToken: "" };
}

export const GetFavoriteItemsListResponse = {
  encode(message: GetFavoriteItemsListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.itemsCount !== "0") {
      writer.uint32(16).int64(message.itemsCount);
    }
    if (message.nextPageToken !== "") {
      writer.uint32(26).string(message.nextPageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFavoriteItemsListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFavoriteItemsListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(Item.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFavoriteItemsListResponse {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
    };
  },

  toJSON(message: GetFavoriteItemsListResponse): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFavoriteItemsListResponse>, I>>(base?: I): GetFavoriteItemsListResponse {
    return GetFavoriteItemsListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFavoriteItemsListResponse>, I>>(object: I): GetFavoriteItemsListResponse {
    const message = createBaseGetFavoriteItemsListResponse();
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    message.itemsCount = object.itemsCount ?? "0";
    message.nextPageToken = object.nextPageToken ?? "";
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
