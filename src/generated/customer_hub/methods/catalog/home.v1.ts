/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { BanneredItemsBlock } from "../../entities/bannered_items_block.v1";
import { BannersBlock, FavoriteBrandsBannersBlock } from "../../entities/banners_block.v1";
import { CategoriesBlock } from "../../entities/categories_block.v1";
import { InfoBlock } from "../../entities/info_block.v1";
import { ItemsBlock } from "../../entities/items_block.v1";
import { Loyalty } from "../../entities/loyalty.v1";
import { SessionData } from "../../entities/session_data.v1";
import { Section, sectionFromJSON, sectionToJSON } from "../../enums/section";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Получение "Главной" страницы */
export interface HomeRequest {
  /** Секция */
  section: Section;
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  platform: HomeRequest_Platform;
}

export enum HomeRequest_Platform {
  IOS = 0,
  ANDROID = 1,
  UNRECOGNIZED = -1,
}

export function homeRequest_PlatformFromJSON(object: any): HomeRequest_Platform {
  switch (object) {
    case 0:
    case "IOS":
      return HomeRequest_Platform.IOS;
    case 1:
    case "ANDROID":
      return HomeRequest_Platform.ANDROID;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HomeRequest_Platform.UNRECOGNIZED;
  }
}

export function homeRequest_PlatformToJSON(object: HomeRequest_Platform): string {
  switch (object) {
    case HomeRequest_Platform.IOS:
      return "IOS";
    case HomeRequest_Platform.ANDROID:
      return "ANDROID";
    case HomeRequest_Platform.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** "Главная" страница */
export interface HomeResponse {
  /** Товарный блоки */
  itemsBlocks: ItemsBlock[];
  /** Список блоков категорий */
  categoriesBlocks: CategoriesBlock[];
  /** Блоки с контентными баннерами */
  bannersBlocks: BannersBlock[];
  /** Текстовые блоки */
  infoBlocks: InfoBlock[];
  /** Описание промо-акций */
  loyalty?:
    | Loyalty
    | undefined;
  /**
   * Блоки с товарами Любимых Брендов
   * Возвращается один элемент, список всех ЛБ пользователя, в указанной секции
   * Для каждого Бренда возвращается 2 товара, сортировка исходных данных по SORT_PRESORTED
   */
  favoriteBrandsBlock: FavoriteBrandsBannersBlock[];
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  banneredItemsBlocks: BanneredItemsBlock[];
}

function createBaseHomeRequest(): HomeRequest {
  return { section: 0, sessionData: undefined, platform: 0 };
}

export const HomeRequest = {
  encode(message: HomeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.section !== 0) {
      writer.uint32(8).int32(message.section);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(26).fork()).ldelim();
    }
    if (message.platform !== 0) {
      writer.uint32(16).int32(message.platform);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HomeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHomeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.section = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.platform = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HomeRequest {
    return {
      section: isSet(object.section) ? sectionFromJSON(object.section) : 0,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      platform: isSet(object.platform) ? homeRequest_PlatformFromJSON(object.platform) : 0,
    };
  },

  toJSON(message: HomeRequest): unknown {
    const obj: any = {};
    if (message.section !== 0) {
      obj.section = sectionToJSON(message.section);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.platform !== 0) {
      obj.platform = homeRequest_PlatformToJSON(message.platform);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HomeRequest>, I>>(base?: I): HomeRequest {
    return HomeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HomeRequest>, I>>(object: I): HomeRequest {
    const message = createBaseHomeRequest();
    message.section = object.section ?? 0;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.platform = object.platform ?? 0;
    return message;
  },
};

function createBaseHomeResponse(): HomeResponse {
  return {
    itemsBlocks: [],
    categoriesBlocks: [],
    bannersBlocks: [],
    infoBlocks: [],
    loyalty: undefined,
    favoriteBrandsBlock: [],
    banneredItemsBlocks: [],
  };
}

export const HomeResponse = {
  encode(message: HomeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.itemsBlocks) {
      ItemsBlock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.categoriesBlocks) {
      CategoriesBlock.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.bannersBlocks) {
      BannersBlock.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.infoBlocks) {
      InfoBlock.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.loyalty !== undefined) {
      Loyalty.encode(message.loyalty, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.favoriteBrandsBlock) {
      FavoriteBrandsBannersBlock.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.banneredItemsBlocks) {
      BanneredItemsBlock.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HomeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHomeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.itemsBlocks.push(ItemsBlock.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.categoriesBlocks.push(CategoriesBlock.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bannersBlocks.push(BannersBlock.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.infoBlocks.push(InfoBlock.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.loyalty = Loyalty.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.favoriteBrandsBlock.push(FavoriteBrandsBannersBlock.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.banneredItemsBlocks.push(BanneredItemsBlock.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HomeResponse {
    return {
      itemsBlocks: globalThis.Array.isArray(object?.itemsBlocks)
        ? object.itemsBlocks.map((e: any) => ItemsBlock.fromJSON(e))
        : [],
      categoriesBlocks: globalThis.Array.isArray(object?.categoriesBlocks)
        ? object.categoriesBlocks.map((e: any) => CategoriesBlock.fromJSON(e))
        : [],
      bannersBlocks: globalThis.Array.isArray(object?.bannersBlocks)
        ? object.bannersBlocks.map((e: any) => BannersBlock.fromJSON(e))
        : [],
      infoBlocks: globalThis.Array.isArray(object?.infoBlocks)
        ? object.infoBlocks.map((e: any) => InfoBlock.fromJSON(e))
        : [],
      loyalty: isSet(object.loyalty) ? Loyalty.fromJSON(object.loyalty) : undefined,
      favoriteBrandsBlock: globalThis.Array.isArray(object?.favoriteBrandsBlock)
        ? object.favoriteBrandsBlock.map((e: any) => FavoriteBrandsBannersBlock.fromJSON(e))
        : [],
      banneredItemsBlocks: globalThis.Array.isArray(object?.banneredItemsBlocks)
        ? object.banneredItemsBlocks.map((e: any) => BanneredItemsBlock.fromJSON(e))
        : [],
    };
  },

  toJSON(message: HomeResponse): unknown {
    const obj: any = {};
    if (message.itemsBlocks?.length) {
      obj.itemsBlocks = message.itemsBlocks.map((e) => ItemsBlock.toJSON(e));
    }
    if (message.categoriesBlocks?.length) {
      obj.categoriesBlocks = message.categoriesBlocks.map((e) => CategoriesBlock.toJSON(e));
    }
    if (message.bannersBlocks?.length) {
      obj.bannersBlocks = message.bannersBlocks.map((e) => BannersBlock.toJSON(e));
    }
    if (message.infoBlocks?.length) {
      obj.infoBlocks = message.infoBlocks.map((e) => InfoBlock.toJSON(e));
    }
    if (message.loyalty !== undefined) {
      obj.loyalty = Loyalty.toJSON(message.loyalty);
    }
    if (message.favoriteBrandsBlock?.length) {
      obj.favoriteBrandsBlock = message.favoriteBrandsBlock.map((e) => FavoriteBrandsBannersBlock.toJSON(e));
    }
    if (message.banneredItemsBlocks?.length) {
      obj.banneredItemsBlocks = message.banneredItemsBlocks.map((e) => BanneredItemsBlock.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HomeResponse>, I>>(base?: I): HomeResponse {
    return HomeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HomeResponse>, I>>(object: I): HomeResponse {
    const message = createBaseHomeResponse();
    message.itemsBlocks = object.itemsBlocks?.map((e) => ItemsBlock.fromPartial(e)) || [];
    message.categoriesBlocks = object.categoriesBlocks?.map((e) => CategoriesBlock.fromPartial(e)) || [];
    message.bannersBlocks = object.bannersBlocks?.map((e) => BannersBlock.fromPartial(e)) || [];
    message.infoBlocks = object.infoBlocks?.map((e) => InfoBlock.fromPartial(e)) || [];
    message.loyalty = (object.loyalty !== undefined && object.loyalty !== null)
      ? Loyalty.fromPartial(object.loyalty)
      : undefined;
    message.favoriteBrandsBlock = object.favoriteBrandsBlock?.map((e) => FavoriteBrandsBannersBlock.fromPartial(e)) ||
      [];
    message.banneredItemsBlocks = object.banneredItemsBlocks?.map((e) => BanneredItemsBlock.fromPartial(e)) || [];
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
