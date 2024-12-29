/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Item } from "../../entities/item.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение товаров по их кодам */
export interface GetItemsByCodesRequest {
  /** Коды товаров */
  codes: string[];
  /** Поисковые параметры */
  searchParams?:
    | GetItemsByCodesSearchRequestParams
    | undefined;
  /** Пагинация, если пустая строка, выведет результаты первой страницы */
  pageToken: string;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Параметры поиска запрос */
export interface GetItemsByCodesSearchRequestParams {
  /** фильтр по наличию (если его нет - отдается полный список) */
  inStock?:
    | boolean
    | undefined;
  /** количество товаров на одной странице */
  pageSize?: string | undefined;
}

/** Ответ на запрос товара по коду */
export interface GetItemsByCodesResponse {
  /** Товары */
  item: Item[];
  /** items_count общее количество найденных айтемов в БД удовлетворяющих запросу */
  itemsCount: string;
  /**
   * next_page_token - токен следующей страницы пагинации.
   * Чтобы запросить результаты следующей страницы, нужно подставить значение next_page_token
   * в GetItemsByCodesRequest.page_token
   * Если пустая строка, то текущая страница - последняя
   */
  nextPageToken: string;
}

function createBaseGetItemsByCodesRequest(): GetItemsByCodesRequest {
  return { codes: [], searchParams: undefined, pageToken: "", sessionData: undefined };
}

export const GetItemsByCodesRequest = {
  encode(message: GetItemsByCodesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.codes) {
      writer.uint32(10).string(v!);
    }
    if (message.searchParams !== undefined) {
      GetItemsByCodesSearchRequestParams.encode(message.searchParams, writer.uint32(18).fork()).ldelim();
    }
    if (message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsByCodesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsByCodesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.codes.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.searchParams = GetItemsByCodesSearchRequestParams.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pageToken = reader.string();
          continue;
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

  fromJSON(object: any): GetItemsByCodesRequest {
    return {
      codes: globalThis.Array.isArray(object?.codes) ? object.codes.map((e: any) => globalThis.String(e)) : [],
      searchParams: isSet(object.searchParams)
        ? GetItemsByCodesSearchRequestParams.fromJSON(object.searchParams)
        : undefined,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetItemsByCodesRequest): unknown {
    const obj: any = {};
    if (message.codes?.length) {
      obj.codes = message.codes;
    }
    if (message.searchParams !== undefined) {
      obj.searchParams = GetItemsByCodesSearchRequestParams.toJSON(message.searchParams);
    }
    if (message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsByCodesRequest>, I>>(base?: I): GetItemsByCodesRequest {
    return GetItemsByCodesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsByCodesRequest>, I>>(object: I): GetItemsByCodesRequest {
    const message = createBaseGetItemsByCodesRequest();
    message.codes = object.codes?.map((e) => e) || [];
    message.searchParams = (object.searchParams !== undefined && object.searchParams !== null)
      ? GetItemsByCodesSearchRequestParams.fromPartial(object.searchParams)
      : undefined;
    message.pageToken = object.pageToken ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetItemsByCodesSearchRequestParams(): GetItemsByCodesSearchRequestParams {
  return { inStock: undefined, pageSize: undefined };
}

export const GetItemsByCodesSearchRequestParams = {
  encode(message: GetItemsByCodesSearchRequestParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inStock !== undefined) {
      writer.uint32(16).bool(message.inStock);
    }
    if (message.pageSize !== undefined) {
      writer.uint32(24).int64(message.pageSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsByCodesSearchRequestParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsByCodesSearchRequestParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.inStock = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageSize = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemsByCodesSearchRequestParams {
    return {
      inStock: isSet(object.inStock) ? globalThis.Boolean(object.inStock) : undefined,
      pageSize: isSet(object.pageSize) ? globalThis.String(object.pageSize) : undefined,
    };
  },

  toJSON(message: GetItemsByCodesSearchRequestParams): unknown {
    const obj: any = {};
    if (message.inStock !== undefined) {
      obj.inStock = message.inStock;
    }
    if (message.pageSize !== undefined) {
      obj.pageSize = message.pageSize;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsByCodesSearchRequestParams>, I>>(
    base?: I,
  ): GetItemsByCodesSearchRequestParams {
    return GetItemsByCodesSearchRequestParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsByCodesSearchRequestParams>, I>>(
    object: I,
  ): GetItemsByCodesSearchRequestParams {
    const message = createBaseGetItemsByCodesSearchRequestParams();
    message.inStock = object.inStock ?? undefined;
    message.pageSize = object.pageSize ?? undefined;
    return message;
  },
};

function createBaseGetItemsByCodesResponse(): GetItemsByCodesResponse {
  return { item: [], itemsCount: "0", nextPageToken: "" };
}

export const GetItemsByCodesResponse = {
  encode(message: GetItemsByCodesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.item) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsByCodesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsByCodesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.item.push(Item.decode(reader, reader.uint32()));
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

  fromJSON(object: any): GetItemsByCodesResponse {
    return {
      item: globalThis.Array.isArray(object?.item) ? object.item.map((e: any) => Item.fromJSON(e)) : [],
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
    };
  },

  toJSON(message: GetItemsByCodesResponse): unknown {
    const obj: any = {};
    if (message.item?.length) {
      obj.item = message.item.map((e) => Item.toJSON(e));
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsByCodesResponse>, I>>(base?: I): GetItemsByCodesResponse {
    return GetItemsByCodesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsByCodesResponse>, I>>(object: I): GetItemsByCodesResponse {
    const message = createBaseGetItemsByCodesResponse();
    message.item = object.item?.map((e) => Item.fromPartial(e)) || [];
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
