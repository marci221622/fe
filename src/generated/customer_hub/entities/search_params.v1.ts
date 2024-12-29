/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Section, sectionFromJSON, sectionToJSON } from "../enums/section";
import { Sort, sortFromJSON, sortToJSON } from "../enums/sort";
import { SearchFilter } from "./search_filter.v1";
import { Slug } from "./slug.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Поисковые параметры */
export interface SearchParams {
  /** Параметры поискового фильтра */
  filters: SearchFilter[];
  /** Полнотекстовый поиск */
  fulltext?:
    | string
    | undefined;
  /** Коллекции */
  collections: string[];
  /** Бренды */
  brands: string[];
  /**
   * для ситуаций когда у нас есть меню и мы хотим пофильтровать по меню (show_in_filters в базе)
   * до какого родителя root элемент
   */
  rootMenuCode: string;
  /**
   * то что фильтровать, он и учитывается для построения фильтра
   * выбраны selected от current_menu_code наверх до root_menu_code, без выбора соседних, только прямые "родители"
   */
  currentMenuCode: string;
  /**
   * page_size - количество запрашиваемых айтемов на одной странице
   * по-умолчанию 20, если не передано
   */
  pageSize?:
    | string
    | undefined;
  /** Сортировка */
  sort?:
    | Sort
    | undefined;
  /** Коды текущего меню */
  currentMenuCodes: string[];
  /**
   * favorite_list_id - фильтрация товаров по признаку принадлежности избранному
   * если параметр не передан, то фильтрации по избранному не будет
   */
  favoriteListId?:
    | string
    | undefined;
  /** Секции */
  sections: Section[];
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
  /** Slug */
  slug?:
    | Slug
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  section: Section;
}

function createBaseSearchParams(): SearchParams {
  return {
    filters: [],
    fulltext: undefined,
    collections: [],
    brands: [],
    rootMenuCode: "",
    currentMenuCode: "",
    pageSize: undefined,
    sort: undefined,
    currentMenuCodes: [],
    favoriteListId: undefined,
    sections: [],
    itemCodes: [],
    slug: undefined,
    section: 0,
  };
}

export const SearchParams = {
  encode(message: SearchParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.filters) {
      SearchFilter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.fulltext !== undefined) {
      writer.uint32(18).string(message.fulltext);
    }
    for (const v of message.collections) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.brands) {
      writer.uint32(34).string(v!);
    }
    if (message.rootMenuCode !== "") {
      writer.uint32(50).string(message.rootMenuCode);
    }
    if (message.currentMenuCode !== "") {
      writer.uint32(58).string(message.currentMenuCode);
    }
    if (message.pageSize !== undefined) {
      writer.uint32(64).int64(message.pageSize);
    }
    if (message.sort !== undefined) {
      writer.uint32(72).int32(message.sort);
    }
    for (const v of message.currentMenuCodes) {
      writer.uint32(82).string(v!);
    }
    if (message.favoriteListId !== undefined) {
      writer.uint32(90).string(message.favoriteListId);
    }
    writer.uint32(98).fork();
    for (const v of message.sections) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.itemCodes) {
      writer.uint32(114).string(v!);
    }
    if (message.slug !== undefined) {
      Slug.encode(message.slug, writer.uint32(122).fork()).ldelim();
    }
    if (message.section !== 0) {
      writer.uint32(40).int32(message.section);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filters.push(SearchFilter.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fulltext = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.collections.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.brands.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rootMenuCode = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.currentMenuCode = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.pageSize = longToString(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.sort = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.currentMenuCodes.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.favoriteListId = reader.string();
          continue;
        case 12:
          if (tag === 96) {
            message.sections.push(reader.int32() as any);

            continue;
          }

          if (tag === 98) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sections.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.itemCodes.push(reader.string());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.slug = Slug.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchParams {
    return {
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => SearchFilter.fromJSON(e))
        : [],
      fulltext: isSet(object.fulltext) ? globalThis.String(object.fulltext) : undefined,
      collections: globalThis.Array.isArray(object?.collections)
        ? object.collections.map((e: any) => globalThis.String(e))
        : [],
      brands: globalThis.Array.isArray(object?.brands) ? object.brands.map((e: any) => globalThis.String(e)) : [],
      rootMenuCode: isSet(object.rootMenuCode) ? globalThis.String(object.rootMenuCode) : "",
      currentMenuCode: isSet(object.currentMenuCode) ? globalThis.String(object.currentMenuCode) : "",
      pageSize: isSet(object.pageSize) ? globalThis.String(object.pageSize) : undefined,
      sort: isSet(object.sort) ? sortFromJSON(object.sort) : undefined,
      currentMenuCodes: globalThis.Array.isArray(object?.currentMenuCodes)
        ? object.currentMenuCodes.map((e: any) => globalThis.String(e))
        : [],
      favoriteListId: isSet(object.favoriteListId) ? globalThis.String(object.favoriteListId) : undefined,
      sections: globalThis.Array.isArray(object?.sections) ? object.sections.map((e: any) => sectionFromJSON(e)) : [],
      itemCodes: globalThis.Array.isArray(object?.itemCodes)
        ? object.itemCodes.map((e: any) => globalThis.String(e))
        : [],
      slug: isSet(object.slug) ? Slug.fromJSON(object.slug) : undefined,
      section: isSet(object.section) ? sectionFromJSON(object.section) : 0,
    };
  },

  toJSON(message: SearchParams): unknown {
    const obj: any = {};
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => SearchFilter.toJSON(e));
    }
    if (message.fulltext !== undefined) {
      obj.fulltext = message.fulltext;
    }
    if (message.collections?.length) {
      obj.collections = message.collections;
    }
    if (message.brands?.length) {
      obj.brands = message.brands;
    }
    if (message.rootMenuCode !== "") {
      obj.rootMenuCode = message.rootMenuCode;
    }
    if (message.currentMenuCode !== "") {
      obj.currentMenuCode = message.currentMenuCode;
    }
    if (message.pageSize !== undefined) {
      obj.pageSize = message.pageSize;
    }
    if (message.sort !== undefined) {
      obj.sort = sortToJSON(message.sort);
    }
    if (message.currentMenuCodes?.length) {
      obj.currentMenuCodes = message.currentMenuCodes;
    }
    if (message.favoriteListId !== undefined) {
      obj.favoriteListId = message.favoriteListId;
    }
    if (message.sections?.length) {
      obj.sections = message.sections.map((e) => sectionToJSON(e));
    }
    if (message.itemCodes?.length) {
      obj.itemCodes = message.itemCodes;
    }
    if (message.slug !== undefined) {
      obj.slug = Slug.toJSON(message.slug);
    }
    if (message.section !== 0) {
      obj.section = sectionToJSON(message.section);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchParams>, I>>(base?: I): SearchParams {
    return SearchParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchParams>, I>>(object: I): SearchParams {
    const message = createBaseSearchParams();
    message.filters = object.filters?.map((e) => SearchFilter.fromPartial(e)) || [];
    message.fulltext = object.fulltext ?? undefined;
    message.collections = object.collections?.map((e) => e) || [];
    message.brands = object.brands?.map((e) => e) || [];
    message.rootMenuCode = object.rootMenuCode ?? "";
    message.currentMenuCode = object.currentMenuCode ?? "";
    message.pageSize = object.pageSize ?? undefined;
    message.sort = object.sort ?? undefined;
    message.currentMenuCodes = object.currentMenuCodes?.map((e) => e) || [];
    message.favoriteListId = object.favoriteListId ?? undefined;
    message.sections = object.sections?.map((e) => e) || [];
    message.itemCodes = object.itemCodes?.map((e) => e) || [];
    message.slug = (object.slug !== undefined && object.slug !== null) ? Slug.fromPartial(object.slug) : undefined;
    message.section = object.section ?? 0;
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
