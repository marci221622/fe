/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CatalogFilter } from "../../entities/catalog_filter.v1";
import { CatalogSort } from "../../entities/catalog_sort.v1";
import { Category } from "../../entities/category.v1";
import { Collection } from "../../entities/collection.v1";
import { Header } from "../../entities/header.v1";
import { Item } from "../../entities/item.v1";
import { SearchParams } from "../../entities/search_params.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Slug } from "../../entities/slug.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение списка товаров */
export interface GetItemsRequest {
  /** Поисковые параметры */
  searchParams:
    | SearchParams
    | undefined;
  /** Пагинация, если пустая строка, выведет результаты первой страницы */
  pageToken: string;
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Список товаров */
export interface GetItemsResponse {
  /** Товары */
  items: Item[];
  /** Фильтры каталога */
  filters: CatalogFilter[];
  /** items_count общее количество найденных айтемов в БД удовлетворяющих запросу */
  itemsCount: string;
  /** количество фильтров */
  filtersCount: string;
  /** Категории меню */
  menuItems: Category[];
  /** Сортировки каталога */
  sorts: CatalogSort[];
  /**
   * next_page_token - токен следующей страницы пагинации.
   *
   * Чтобы запросить результаты следующей страницы, нужно подставить значение next_page_token
   * в GetItemsRequest.page_token.
   * Если пустая строка, то текущая страница - последняя.
   */
  nextPageToken: string;
  /** Поисковая строка, прилетевшая в запросе */
  fulltext?:
    | string
    | undefined;
  /** Заголовки */
  header:
    | Header
    | undefined;
  /**
   * Меню выбранной секции.
   * Нужно для отображения на web desktop.
   * Один из пунктов меню (рутовый, который прописан в слаге), раскрыт (содержит вложенные элементы меню).
   * Остальные пункты меню дочерних элементов меню не содержат.
   */
  allMenuItems: Category[];
  /**
   * Список кодов айтемов
   * Нужен для пагинаций результатов полнотекстового запроса.
   * Общий флоу полнотекстового поиска:
   * Клиент передает fulltext строку, сервер идет во внешний провайдер и получает N релевантных результатов (айтем кодов) согласно fulltext запросу.
   * Сервер возвращает pageSize результатов, nextPageToken и item_codes всех найденных (внешним провайдером) айтемов.
   * При запросе результатов следующей страницы пагинации, клиент передает список item_codes и pageToken (который берет из nextPageToken полученного ранее ответа).
   * Таким образом, при пагинации, повторных запросов во внешний провайдер не происходит.
   */
  itemCodes: string[];
  /**
   * Актуальный слаг, для редиректа
   * Веб-фронтенд, присылающий запрос со слагом в первую очередь должен смотреть на это поле.
   * Если оно заполнено, на остальные поля ответа смотреть не нужно.
   * Например, раньше в КП категория называлась "Блузы", слаг blyzi-1232, затем переименовали в "Блузки", слаг стал blyzki-1232,
   * если запрос придет со слагом blyzi-1232, мы вернем current_slug blyzki-1232 и веб сделает 301-ый редирект с устаревшей ссылки на актуальную.
   */
  currentSlug?:
    | Slug
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  collection: Collection | undefined;
}

function createBaseGetItemsRequest(): GetItemsRequest {
  return { searchParams: undefined, pageToken: "", sessionData: undefined };
}

export const GetItemsRequest = {
  encode(message: GetItemsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.searchParams !== undefined) {
      SearchParams.encode(message.searchParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.pageToken !== "") {
      writer.uint32(18).string(message.pageToken);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.searchParams = SearchParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GetItemsRequest {
    return {
      searchParams: isSet(object.searchParams) ? SearchParams.fromJSON(object.searchParams) : undefined,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetItemsRequest): unknown {
    const obj: any = {};
    if (message.searchParams !== undefined) {
      obj.searchParams = SearchParams.toJSON(message.searchParams);
    }
    if (message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsRequest>, I>>(base?: I): GetItemsRequest {
    return GetItemsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsRequest>, I>>(object: I): GetItemsRequest {
    const message = createBaseGetItemsRequest();
    message.searchParams = (object.searchParams !== undefined && object.searchParams !== null)
      ? SearchParams.fromPartial(object.searchParams)
      : undefined;
    message.pageToken = object.pageToken ?? "";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetItemsResponse(): GetItemsResponse {
  return {
    items: [],
    filters: [],
    itemsCount: "0",
    filtersCount: "0",
    menuItems: [],
    sorts: [],
    nextPageToken: "",
    fulltext: undefined,
    header: undefined,
    allMenuItems: [],
    itemCodes: [],
    currentSlug: undefined,
    collection: undefined,
  };
}

export const GetItemsResponse = {
  encode(message: GetItemsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.filters) {
      CatalogFilter.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.itemsCount !== "0") {
      writer.uint32(24).int64(message.itemsCount);
    }
    if (message.filtersCount !== "0") {
      writer.uint32(32).int64(message.filtersCount);
    }
    for (const v of message.menuItems) {
      Category.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sorts) {
      CatalogSort.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(58).string(message.nextPageToken);
    }
    if (message.fulltext !== undefined) {
      writer.uint32(66).string(message.fulltext);
    }
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.allMenuItems) {
      Category.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.itemCodes) {
      writer.uint32(98).string(v!);
    }
    if (message.currentSlug !== undefined) {
      Slug.encode(message.currentSlug, writer.uint32(106).fork()).ldelim();
    }
    if (message.collection !== undefined) {
      Collection.encode(message.collection, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemsResponse();
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
          if (tag !== 18) {
            break;
          }

          message.filters.push(CatalogFilter.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.filtersCount = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.menuItems.push(Category.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sorts.push(CatalogSort.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.fulltext = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.header = Header.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.allMenuItems.push(Category.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.itemCodes.push(reader.string());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.currentSlug = Slug.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.collection = Collection.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemsResponse {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => CatalogFilter.fromJSON(e))
        : [],
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      filtersCount: isSet(object.filtersCount) ? globalThis.String(object.filtersCount) : "0",
      menuItems: globalThis.Array.isArray(object?.menuItems)
        ? object.menuItems.map((e: any) => Category.fromJSON(e))
        : [],
      sorts: globalThis.Array.isArray(object?.sorts) ? object.sorts.map((e: any) => CatalogSort.fromJSON(e)) : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
      fulltext: isSet(object.fulltext) ? globalThis.String(object.fulltext) : undefined,
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      allMenuItems: globalThis.Array.isArray(object?.allMenuItems)
        ? object.allMenuItems.map((e: any) => Category.fromJSON(e))
        : [],
      itemCodes: globalThis.Array.isArray(object?.itemCodes)
        ? object.itemCodes.map((e: any) => globalThis.String(e))
        : [],
      currentSlug: isSet(object.currentSlug) ? Slug.fromJSON(object.currentSlug) : undefined,
      collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined,
    };
  },

  toJSON(message: GetItemsResponse): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => CatalogFilter.toJSON(e));
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.filtersCount !== "0") {
      obj.filtersCount = message.filtersCount;
    }
    if (message.menuItems?.length) {
      obj.menuItems = message.menuItems.map((e) => Category.toJSON(e));
    }
    if (message.sorts?.length) {
      obj.sorts = message.sorts.map((e) => CatalogSort.toJSON(e));
    }
    if (message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    if (message.fulltext !== undefined) {
      obj.fulltext = message.fulltext;
    }
    if (message.header !== undefined) {
      obj.header = Header.toJSON(message.header);
    }
    if (message.allMenuItems?.length) {
      obj.allMenuItems = message.allMenuItems.map((e) => Category.toJSON(e));
    }
    if (message.itemCodes?.length) {
      obj.itemCodes = message.itemCodes;
    }
    if (message.currentSlug !== undefined) {
      obj.currentSlug = Slug.toJSON(message.currentSlug);
    }
    if (message.collection !== undefined) {
      obj.collection = Collection.toJSON(message.collection);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemsResponse>, I>>(base?: I): GetItemsResponse {
    return GetItemsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemsResponse>, I>>(object: I): GetItemsResponse {
    const message = createBaseGetItemsResponse();
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    message.filters = object.filters?.map((e) => CatalogFilter.fromPartial(e)) || [];
    message.itemsCount = object.itemsCount ?? "0";
    message.filtersCount = object.filtersCount ?? "0";
    message.menuItems = object.menuItems?.map((e) => Category.fromPartial(e)) || [];
    message.sorts = object.sorts?.map((e) => CatalogSort.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    message.fulltext = object.fulltext ?? undefined;
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.allMenuItems = object.allMenuItems?.map((e) => Category.fromPartial(e)) || [];
    message.itemCodes = object.itemCodes?.map((e) => e) || [];
    message.currentSlug = (object.currentSlug !== undefined && object.currentSlug !== null)
      ? Slug.fromPartial(object.currentSlug)
      : undefined;
    message.collection = (object.collection !== undefined && object.collection !== null)
      ? Collection.fromPartial(object.collection)
      : undefined;
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
