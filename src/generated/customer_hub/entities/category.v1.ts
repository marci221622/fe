/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { Brand } from "./brand.v1";
import { Button } from "./button.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Категория */
export interface Category {
  /** Заголовок для "следующего" экрана */
  titleForNextLevelScreen?:
    | string
    | undefined;
  /** Заголовок */
  title: string;
  /** Изображение */
  image:
    | Image
    | undefined;
  /** Категория */
  categories: Category[];
  /** Кнопка */
  button:
    | Button
    | undefined;
  /** Позиция */
  position: string;
  /** Код коллекции */
  collectionCode?:
    | string
    | undefined;
  /** Код меню */
  menuCode: string;
  /** Выбран или нет */
  selected?:
    | boolean
    | undefined;
  /** Количество товаров */
  itemsCount: string;
  /** Топ брендов */
  topBrands: Brand[];
  /** Слаг */
  slug: string;
  /** Изображение категории для веба */
  filterDocumentImage:
    | Image
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  id: string;
}

function createBaseCategory(): Category {
  return {
    titleForNextLevelScreen: undefined,
    title: "",
    image: undefined,
    categories: [],
    button: undefined,
    position: "0",
    collectionCode: undefined,
    menuCode: "",
    selected: undefined,
    itemsCount: "0",
    topBrands: [],
    slug: "",
    filterDocumentImage: undefined,
    id: "0",
  };
}

export const Category = {
  encode(message: Category, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.titleForNextLevelScreen !== undefined) {
      writer.uint32(18).string(message.titleForNextLevelScreen);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.categories) {
      Category.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.button !== undefined) {
      Button.encode(message.button, writer.uint32(58).fork()).ldelim();
    }
    if (message.position !== "0") {
      writer.uint32(64).int64(message.position);
    }
    if (message.collectionCode !== undefined) {
      writer.uint32(74).string(message.collectionCode);
    }
    if (message.menuCode !== "") {
      writer.uint32(82).string(message.menuCode);
    }
    if (message.selected !== undefined) {
      writer.uint32(88).bool(message.selected);
    }
    if (message.itemsCount !== "0") {
      writer.uint32(96).int64(message.itemsCount);
    }
    for (const v of message.topBrands) {
      Brand.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.slug !== "") {
      writer.uint32(114).string(message.slug);
    }
    if (message.filterDocumentImage !== undefined) {
      Image.encode(message.filterDocumentImage, writer.uint32(122).fork()).ldelim();
    }
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Category {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.titleForNextLevelScreen = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.title = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.categories.push(Category.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.button = Button.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.position = longToString(reader.int64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.collectionCode = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.menuCode = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.selected = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.topBrands.push(Brand.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.filterDocumentImage = Image.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Category {
    return {
      titleForNextLevelScreen: isSet(object.titleForNextLevelScreen)
        ? globalThis.String(object.titleForNextLevelScreen)
        : undefined,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      categories: globalThis.Array.isArray(object?.categories)
        ? object.categories.map((e: any) => Category.fromJSON(e))
        : [],
      button: isSet(object.button) ? Button.fromJSON(object.button) : undefined,
      position: isSet(object.position) ? globalThis.String(object.position) : "0",
      collectionCode: isSet(object.collectionCode) ? globalThis.String(object.collectionCode) : undefined,
      menuCode: isSet(object.menuCode) ? globalThis.String(object.menuCode) : "",
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : undefined,
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      topBrands: globalThis.Array.isArray(object?.topBrands) ? object.topBrands.map((e: any) => Brand.fromJSON(e)) : [],
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      filterDocumentImage: isSet(object.filterDocumentImage) ? Image.fromJSON(object.filterDocumentImage) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
    };
  },

  toJSON(message: Category): unknown {
    const obj: any = {};
    if (message.titleForNextLevelScreen !== undefined) {
      obj.titleForNextLevelScreen = message.titleForNextLevelScreen;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.categories?.length) {
      obj.categories = message.categories.map((e) => Category.toJSON(e));
    }
    if (message.button !== undefined) {
      obj.button = Button.toJSON(message.button);
    }
    if (message.position !== "0") {
      obj.position = message.position;
    }
    if (message.collectionCode !== undefined) {
      obj.collectionCode = message.collectionCode;
    }
    if (message.menuCode !== "") {
      obj.menuCode = message.menuCode;
    }
    if (message.selected !== undefined) {
      obj.selected = message.selected;
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.topBrands?.length) {
      obj.topBrands = message.topBrands.map((e) => Brand.toJSON(e));
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.filterDocumentImage !== undefined) {
      obj.filterDocumentImage = Image.toJSON(message.filterDocumentImage);
    }
    if (message.id !== "0") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Category>, I>>(base?: I): Category {
    return Category.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Category>, I>>(object: I): Category {
    const message = createBaseCategory();
    message.titleForNextLevelScreen = object.titleForNextLevelScreen ?? undefined;
    message.title = object.title ?? "";
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.categories = object.categories?.map((e) => Category.fromPartial(e)) || [];
    message.button = (object.button !== undefined && object.button !== null)
      ? Button.fromPartial(object.button)
      : undefined;
    message.position = object.position ?? "0";
    message.collectionCode = object.collectionCode ?? undefined;
    message.menuCode = object.menuCode ?? "";
    message.selected = object.selected ?? undefined;
    message.itemsCount = object.itemsCount ?? "0";
    message.topBrands = object.topBrands?.map((e) => Brand.fromPartial(e)) || [];
    message.slug = object.slug ?? "";
    message.filterDocumentImage = (object.filterDocumentImage !== undefined && object.filterDocumentImage !== null)
      ? Image.fromPartial(object.filterDocumentImage)
      : undefined;
    message.id = object.id ?? "0";
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
