/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { Money } from "../../common/money.v1";
import { AvailableAction, availableActionFromJSON, availableActionToJSON } from "../enums/item";
import { Brand } from "./brand.v1";
import { Collection } from "./collection.v1";
import { Color } from "./color.v1";
import { Condition } from "./condition.v1";
import { ItemOffer } from "./item_offer.v1";
import { Label } from "./label.v1";
import { Size } from "./size.v1";
import { Slug } from "./slug.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Товар */
export interface Item {
  /** Код */
  code: string;
  /** Артикул */
  article: string;
  /** Идентификатор секции */
  sectionId: string;
  /** Артикул производителя */
  articleProducer: string;
  /** Техническая информация */
  technicalInformation: string;
  /** Композиция */
  composition: string;
  /** Наличие в стоках */
  inStock: boolean;
  /** Заголовок */
  title: string;
  /** Описание */
  description: string;
  /** Бренд */
  brand:
    | Brand
    | undefined;
  /** Цвет */
  color:
    | Color
    | undefined;
  /** Признак "новизны" - товар новый или б/у */
  novelty: boolean;
  /** Маленькие изображения */
  imagesSmall: Image[];
  /** Средние изображения */
  imagesMiddle: Image[];
  /** Большие изображения */
  imagesLarge: Image[];
  /** Абсолютная ссылка */
  absoluteLink: string;
  /** Метки/Шильдики */
  labels: Label[];
  /** Предложения у продавцов */
  itemOffers: ItemOffer[];
  /** Есть ли в списке избранного */
  favorite: boolean;
  /** Добавлен ли в корзину */
  inCart: boolean;
  /** Размер */
  size:
    | Size
    | undefined;
  /** Состояние */
  condition:
    | Condition
    | undefined;
  /** Количество */
  quantity: string;
  /** Коллекция */
  collection?:
    | Collection
    | undefined;
  /** Цена в ЦУМе */
  tsumPrice?: Money | undefined;
  kit?:
    | string
    | undefined;
  /** Б/у или нет */
  isUsed?:
    | boolean
    | undefined;
  /** Секция */
  sections: string[];
  /** Вещь из ЦУМа */
  fromTsum: boolean;
  /** Флаг, что товар у кого-то зарезервирован */
  isCollected: boolean;
  /** Флаг, что товар виден в поиске */
  isVisible: boolean;
  /** Размер скидки в процентах (целое число), например: 20 */
  discountPercent?:
    | number
    | undefined;
  /** Флаг показывает, что товар можно вернуть */
  availableToReturn: boolean;
  /**
   * Группы атрибутов
   * список групп отсортирован согласно sort_order в КП
   */
  attributesGroups: AttributesGroup[];
  /** слаг */
  slug: string;
  /** список доступных действий */
  availableActions: AvailableAction[];
  /**
   * Список всех связанных (по vendor_code) айтемов всех размеров.
   * В том числе в списке будет и тот айтем, который был запрошен (в GetItemByCode).
   * Список заполняется только в ответе на получение карточки (GetItemByCode), в других методах заполняться не будет.
   *
   * Список отсортирован по возрастанию RU размеров.
   * В случае совпадения размеров, сортировка происходит по другим полям (например по item_code).
   * У айтема, по которому была запрошена карточка, будет проставлен is_selected true.
   */
  relatedItemSizes: RelatedItem[];
  /** Список кодов похожих товаров */
  relevantItemCodes: string[];
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  availableToCollect: boolean;
  /** @deprecated */
  designCountry: string;
  /** @deprecated */
  madeCountry: string;
}

/** Связанный Item */
export interface RelatedItem {
  /** код айтема */
  code: string;
  slug?: Slug | undefined;
  size?:
    | Size
    | undefined;
  /** является ли айтем забронированным */
  isCollected?: boolean | undefined;
  isSelected?: boolean | undefined;
}

/** Атрибут-значения */
export interface AttributeValues {
  /** Код атрибута */
  code: string;
  /** Название атрибута */
  title: string;
  /** Список значений атрибута, может быть пустым, */
  values: AttributeValue[];
  /** Признак для отображения аттрибута */
  isHidden: boolean;
}

/** Значение атрибута */
export interface AttributeValue {
  /** Код значения атрибута */
  code: string;
  /** Значения атрибута */
  value: string;
}

/**
 * Группа атрибутов
 * Объединяет несколько атрибутов, описывающие какую-то характеристику товара.
 * Например, группа атрибутов "Ремешок", в группе находятся пары атрибут - значения (значений может быть несколько).
 * Например: {"Размер": ["10cm"]}, {"Цвет": ["Черный"]}
 */
export interface AttributesGroup {
  /** Название группы */
  title: string;
  /** Список пар атрибут - значения. */
  attributesValues: AttributeValues[];
}

function createBaseItem(): Item {
  return {
    code: "",
    article: "",
    sectionId: "0",
    articleProducer: "",
    technicalInformation: "",
    composition: "",
    inStock: false,
    title: "",
    description: "",
    brand: undefined,
    color: undefined,
    novelty: false,
    imagesSmall: [],
    imagesMiddle: [],
    imagesLarge: [],
    absoluteLink: "",
    labels: [],
    itemOffers: [],
    favorite: false,
    inCart: false,
    size: undefined,
    condition: undefined,
    quantity: "0",
    collection: undefined,
    tsumPrice: undefined,
    kit: undefined,
    isUsed: undefined,
    sections: [],
    fromTsum: false,
    isCollected: false,
    isVisible: false,
    discountPercent: undefined,
    availableToReturn: false,
    attributesGroups: [],
    slug: "",
    availableActions: [],
    relatedItemSizes: [],
    relevantItemCodes: [],
    availableToCollect: false,
    designCountry: "",
    madeCountry: "",
  };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.article !== "") {
      writer.uint32(18).string(message.article);
    }
    if (message.sectionId !== "0") {
      writer.uint32(24).int64(message.sectionId);
    }
    if (message.articleProducer !== "") {
      writer.uint32(34).string(message.articleProducer);
    }
    if (message.technicalInformation !== "") {
      writer.uint32(58).string(message.technicalInformation);
    }
    if (message.composition !== "") {
      writer.uint32(66).string(message.composition);
    }
    if (message.inStock === true) {
      writer.uint32(72).bool(message.inStock);
    }
    if (message.title !== "") {
      writer.uint32(82).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(90).string(message.description);
    }
    if (message.brand !== undefined) {
      Brand.encode(message.brand, writer.uint32(98).fork()).ldelim();
    }
    if (message.color !== undefined) {
      Color.encode(message.color, writer.uint32(106).fork()).ldelim();
    }
    if (message.novelty === true) {
      writer.uint32(112).bool(message.novelty);
    }
    for (const v of message.imagesSmall) {
      Image.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    for (const v of message.imagesMiddle) {
      Image.encode(v!, writer.uint32(130).fork()).ldelim();
    }
    for (const v of message.imagesLarge) {
      Image.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    if (message.absoluteLink !== "") {
      writer.uint32(146).string(message.absoluteLink);
    }
    for (const v of message.labels) {
      Label.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    for (const v of message.itemOffers) {
      ItemOffer.encode(v!, writer.uint32(162).fork()).ldelim();
    }
    if (message.favorite === true) {
      writer.uint32(168).bool(message.favorite);
    }
    if (message.inCart === true) {
      writer.uint32(176).bool(message.inCart);
    }
    if (message.size !== undefined) {
      Size.encode(message.size, writer.uint32(186).fork()).ldelim();
    }
    if (message.condition !== undefined) {
      Condition.encode(message.condition, writer.uint32(194).fork()).ldelim();
    }
    if (message.quantity !== "0") {
      writer.uint32(200).int64(message.quantity);
    }
    if (message.collection !== undefined) {
      Collection.encode(message.collection, writer.uint32(210).fork()).ldelim();
    }
    if (message.tsumPrice !== undefined) {
      Money.encode(message.tsumPrice, writer.uint32(218).fork()).ldelim();
    }
    if (message.kit !== undefined) {
      writer.uint32(226).string(message.kit);
    }
    if (message.isUsed !== undefined) {
      writer.uint32(240).bool(message.isUsed);
    }
    for (const v of message.sections) {
      writer.uint32(258).string(v!);
    }
    if (message.fromTsum === true) {
      writer.uint32(264).bool(message.fromTsum);
    }
    if (message.isCollected === true) {
      writer.uint32(272).bool(message.isCollected);
    }
    if (message.isVisible === true) {
      writer.uint32(280).bool(message.isVisible);
    }
    if (message.discountPercent !== undefined) {
      writer.uint32(288).int32(message.discountPercent);
    }
    if (message.availableToReturn === true) {
      writer.uint32(296).bool(message.availableToReturn);
    }
    for (const v of message.attributesGroups) {
      AttributesGroup.encode(v!, writer.uint32(306).fork()).ldelim();
    }
    if (message.slug !== "") {
      writer.uint32(314).string(message.slug);
    }
    writer.uint32(322).fork();
    for (const v of message.availableActions) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.relatedItemSizes) {
      RelatedItem.encode(v!, writer.uint32(330).fork()).ldelim();
    }
    for (const v of message.relevantItemCodes) {
      writer.uint32(338).string(v!);
    }
    if (message.availableToCollect === true) {
      writer.uint32(248).bool(message.availableToCollect);
    }
    if (message.designCountry !== "") {
      writer.uint32(42).string(message.designCountry);
    }
    if (message.madeCountry !== "") {
      writer.uint32(50).string(message.madeCountry);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.article = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sectionId = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.articleProducer = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.technicalInformation = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.composition = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.inStock = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.title = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.description = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.brand = Brand.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.color = Color.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.novelty = reader.bool();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.imagesSmall.push(Image.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.imagesMiddle.push(Image.decode(reader, reader.uint32()));
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.imagesLarge.push(Image.decode(reader, reader.uint32()));
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.absoluteLink = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.labels.push(Label.decode(reader, reader.uint32()));
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.itemOffers.push(ItemOffer.decode(reader, reader.uint32()));
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.favorite = reader.bool();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.inCart = reader.bool();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.size = Size.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.condition = Condition.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.quantity = longToString(reader.int64() as Long);
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.collection = Collection.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.tsumPrice = Money.decode(reader, reader.uint32());
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.kit = reader.string();
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }

          message.isUsed = reader.bool();
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.sections.push(reader.string());
          continue;
        case 33:
          if (tag !== 264) {
            break;
          }

          message.fromTsum = reader.bool();
          continue;
        case 34:
          if (tag !== 272) {
            break;
          }

          message.isCollected = reader.bool();
          continue;
        case 35:
          if (tag !== 280) {
            break;
          }

          message.isVisible = reader.bool();
          continue;
        case 36:
          if (tag !== 288) {
            break;
          }

          message.discountPercent = reader.int32();
          continue;
        case 37:
          if (tag !== 296) {
            break;
          }

          message.availableToReturn = reader.bool();
          continue;
        case 38:
          if (tag !== 306) {
            break;
          }

          message.attributesGroups.push(AttributesGroup.decode(reader, reader.uint32()));
          continue;
        case 39:
          if (tag !== 314) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 40:
          if (tag === 320) {
            message.availableActions.push(reader.int32() as any);

            continue;
          }

          if (tag === 322) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.availableActions.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 41:
          if (tag !== 330) {
            break;
          }

          message.relatedItemSizes.push(RelatedItem.decode(reader, reader.uint32()));
          continue;
        case 42:
          if (tag !== 338) {
            break;
          }

          message.relevantItemCodes.push(reader.string());
          continue;
        case 31:
          if (tag !== 248) {
            break;
          }

          message.availableToCollect = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.designCountry = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.madeCountry = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      article: isSet(object.article) ? globalThis.String(object.article) : "",
      sectionId: isSet(object.sectionId) ? globalThis.String(object.sectionId) : "0",
      articleProducer: isSet(object.articleProducer) ? globalThis.String(object.articleProducer) : "",
      technicalInformation: isSet(object.technicalInformation) ? globalThis.String(object.technicalInformation) : "",
      composition: isSet(object.composition) ? globalThis.String(object.composition) : "",
      inStock: isSet(object.inStock) ? globalThis.Boolean(object.inStock) : false,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      brand: isSet(object.brand) ? Brand.fromJSON(object.brand) : undefined,
      color: isSet(object.color) ? Color.fromJSON(object.color) : undefined,
      novelty: isSet(object.novelty) ? globalThis.Boolean(object.novelty) : false,
      imagesSmall: globalThis.Array.isArray(object?.imagesSmall)
        ? object.imagesSmall.map((e: any) => Image.fromJSON(e))
        : [],
      imagesMiddle: globalThis.Array.isArray(object?.imagesMiddle)
        ? object.imagesMiddle.map((e: any) => Image.fromJSON(e))
        : [],
      imagesLarge: globalThis.Array.isArray(object?.imagesLarge)
        ? object.imagesLarge.map((e: any) => Image.fromJSON(e))
        : [],
      absoluteLink: isSet(object.absoluteLink) ? globalThis.String(object.absoluteLink) : "",
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => Label.fromJSON(e)) : [],
      itemOffers: globalThis.Array.isArray(object?.itemOffers)
        ? object.itemOffers.map((e: any) => ItemOffer.fromJSON(e))
        : [],
      favorite: isSet(object.favorite) ? globalThis.Boolean(object.favorite) : false,
      inCart: isSet(object.inCart) ? globalThis.Boolean(object.inCart) : false,
      size: isSet(object.size) ? Size.fromJSON(object.size) : undefined,
      condition: isSet(object.condition) ? Condition.fromJSON(object.condition) : undefined,
      quantity: isSet(object.quantity) ? globalThis.String(object.quantity) : "0",
      collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined,
      tsumPrice: isSet(object.tsumPrice) ? Money.fromJSON(object.tsumPrice) : undefined,
      kit: isSet(object.kit) ? globalThis.String(object.kit) : undefined,
      isUsed: isSet(object.isUsed) ? globalThis.Boolean(object.isUsed) : undefined,
      sections: globalThis.Array.isArray(object?.sections) ? object.sections.map((e: any) => globalThis.String(e)) : [],
      fromTsum: isSet(object.fromTsum) ? globalThis.Boolean(object.fromTsum) : false,
      isCollected: isSet(object.isCollected) ? globalThis.Boolean(object.isCollected) : false,
      isVisible: isSet(object.isVisible) ? globalThis.Boolean(object.isVisible) : false,
      discountPercent: isSet(object.discountPercent) ? globalThis.Number(object.discountPercent) : undefined,
      availableToReturn: isSet(object.availableToReturn) ? globalThis.Boolean(object.availableToReturn) : false,
      attributesGroups: globalThis.Array.isArray(object?.attributesGroups)
        ? object.attributesGroups.map((e: any) => AttributesGroup.fromJSON(e))
        : [],
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      availableActions: globalThis.Array.isArray(object?.availableActions)
        ? object.availableActions.map((e: any) => availableActionFromJSON(e))
        : [],
      relatedItemSizes: globalThis.Array.isArray(object?.relatedItemSizes)
        ? object.relatedItemSizes.map((e: any) => RelatedItem.fromJSON(e))
        : [],
      relevantItemCodes: globalThis.Array.isArray(object?.relevantItemCodes)
        ? object.relevantItemCodes.map((e: any) => globalThis.String(e))
        : [],
      availableToCollect: isSet(object.availableToCollect) ? globalThis.Boolean(object.availableToCollect) : false,
      designCountry: isSet(object.designCountry) ? globalThis.String(object.designCountry) : "",
      madeCountry: isSet(object.madeCountry) ? globalThis.String(object.madeCountry) : "",
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.article !== "") {
      obj.article = message.article;
    }
    if (message.sectionId !== "0") {
      obj.sectionId = message.sectionId;
    }
    if (message.articleProducer !== "") {
      obj.articleProducer = message.articleProducer;
    }
    if (message.technicalInformation !== "") {
      obj.technicalInformation = message.technicalInformation;
    }
    if (message.composition !== "") {
      obj.composition = message.composition;
    }
    if (message.inStock === true) {
      obj.inStock = message.inStock;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.brand !== undefined) {
      obj.brand = Brand.toJSON(message.brand);
    }
    if (message.color !== undefined) {
      obj.color = Color.toJSON(message.color);
    }
    if (message.novelty === true) {
      obj.novelty = message.novelty;
    }
    if (message.imagesSmall?.length) {
      obj.imagesSmall = message.imagesSmall.map((e) => Image.toJSON(e));
    }
    if (message.imagesMiddle?.length) {
      obj.imagesMiddle = message.imagesMiddle.map((e) => Image.toJSON(e));
    }
    if (message.imagesLarge?.length) {
      obj.imagesLarge = message.imagesLarge.map((e) => Image.toJSON(e));
    }
    if (message.absoluteLink !== "") {
      obj.absoluteLink = message.absoluteLink;
    }
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => Label.toJSON(e));
    }
    if (message.itemOffers?.length) {
      obj.itemOffers = message.itemOffers.map((e) => ItemOffer.toJSON(e));
    }
    if (message.favorite === true) {
      obj.favorite = message.favorite;
    }
    if (message.inCart === true) {
      obj.inCart = message.inCart;
    }
    if (message.size !== undefined) {
      obj.size = Size.toJSON(message.size);
    }
    if (message.condition !== undefined) {
      obj.condition = Condition.toJSON(message.condition);
    }
    if (message.quantity !== "0") {
      obj.quantity = message.quantity;
    }
    if (message.collection !== undefined) {
      obj.collection = Collection.toJSON(message.collection);
    }
    if (message.tsumPrice !== undefined) {
      obj.tsumPrice = Money.toJSON(message.tsumPrice);
    }
    if (message.kit !== undefined) {
      obj.kit = message.kit;
    }
    if (message.isUsed !== undefined) {
      obj.isUsed = message.isUsed;
    }
    if (message.sections?.length) {
      obj.sections = message.sections;
    }
    if (message.fromTsum === true) {
      obj.fromTsum = message.fromTsum;
    }
    if (message.isCollected === true) {
      obj.isCollected = message.isCollected;
    }
    if (message.isVisible === true) {
      obj.isVisible = message.isVisible;
    }
    if (message.discountPercent !== undefined) {
      obj.discountPercent = Math.round(message.discountPercent);
    }
    if (message.availableToReturn === true) {
      obj.availableToReturn = message.availableToReturn;
    }
    if (message.attributesGroups?.length) {
      obj.attributesGroups = message.attributesGroups.map((e) => AttributesGroup.toJSON(e));
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.availableActions?.length) {
      obj.availableActions = message.availableActions.map((e) => availableActionToJSON(e));
    }
    if (message.relatedItemSizes?.length) {
      obj.relatedItemSizes = message.relatedItemSizes.map((e) => RelatedItem.toJSON(e));
    }
    if (message.relevantItemCodes?.length) {
      obj.relevantItemCodes = message.relevantItemCodes;
    }
    if (message.availableToCollect === true) {
      obj.availableToCollect = message.availableToCollect;
    }
    if (message.designCountry !== "") {
      obj.designCountry = message.designCountry;
    }
    if (message.madeCountry !== "") {
      obj.madeCountry = message.madeCountry;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Item>, I>>(base?: I): Item {
    return Item.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.code = object.code ?? "";
    message.article = object.article ?? "";
    message.sectionId = object.sectionId ?? "0";
    message.articleProducer = object.articleProducer ?? "";
    message.technicalInformation = object.technicalInformation ?? "";
    message.composition = object.composition ?? "";
    message.inStock = object.inStock ?? false;
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.brand = (object.brand !== undefined && object.brand !== null) ? Brand.fromPartial(object.brand) : undefined;
    message.color = (object.color !== undefined && object.color !== null) ? Color.fromPartial(object.color) : undefined;
    message.novelty = object.novelty ?? false;
    message.imagesSmall = object.imagesSmall?.map((e) => Image.fromPartial(e)) || [];
    message.imagesMiddle = object.imagesMiddle?.map((e) => Image.fromPartial(e)) || [];
    message.imagesLarge = object.imagesLarge?.map((e) => Image.fromPartial(e)) || [];
    message.absoluteLink = object.absoluteLink ?? "";
    message.labels = object.labels?.map((e) => Label.fromPartial(e)) || [];
    message.itemOffers = object.itemOffers?.map((e) => ItemOffer.fromPartial(e)) || [];
    message.favorite = object.favorite ?? false;
    message.inCart = object.inCart ?? false;
    message.size = (object.size !== undefined && object.size !== null) ? Size.fromPartial(object.size) : undefined;
    message.condition = (object.condition !== undefined && object.condition !== null)
      ? Condition.fromPartial(object.condition)
      : undefined;
    message.quantity = object.quantity ?? "0";
    message.collection = (object.collection !== undefined && object.collection !== null)
      ? Collection.fromPartial(object.collection)
      : undefined;
    message.tsumPrice = (object.tsumPrice !== undefined && object.tsumPrice !== null)
      ? Money.fromPartial(object.tsumPrice)
      : undefined;
    message.kit = object.kit ?? undefined;
    message.isUsed = object.isUsed ?? undefined;
    message.sections = object.sections?.map((e) => e) || [];
    message.fromTsum = object.fromTsum ?? false;
    message.isCollected = object.isCollected ?? false;
    message.isVisible = object.isVisible ?? false;
    message.discountPercent = object.discountPercent ?? undefined;
    message.availableToReturn = object.availableToReturn ?? false;
    message.attributesGroups = object.attributesGroups?.map((e) => AttributesGroup.fromPartial(e)) || [];
    message.slug = object.slug ?? "";
    message.availableActions = object.availableActions?.map((e) => e) || [];
    message.relatedItemSizes = object.relatedItemSizes?.map((e) => RelatedItem.fromPartial(e)) || [];
    message.relevantItemCodes = object.relevantItemCodes?.map((e) => e) || [];
    message.availableToCollect = object.availableToCollect ?? false;
    message.designCountry = object.designCountry ?? "";
    message.madeCountry = object.madeCountry ?? "";
    return message;
  },
};

function createBaseRelatedItem(): RelatedItem {
  return { code: "", slug: undefined, size: undefined, isCollected: undefined, isSelected: undefined };
}

export const RelatedItem = {
  encode(message: RelatedItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.slug !== undefined) {
      Slug.encode(message.slug, writer.uint32(18).fork()).ldelim();
    }
    if (message.size !== undefined) {
      Size.encode(message.size, writer.uint32(26).fork()).ldelim();
    }
    if (message.isCollected !== undefined) {
      writer.uint32(32).bool(message.isCollected);
    }
    if (message.isSelected !== undefined) {
      writer.uint32(40).bool(message.isSelected);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RelatedItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRelatedItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.slug = Slug.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.size = Size.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isCollected = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isSelected = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RelatedItem {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      slug: isSet(object.slug) ? Slug.fromJSON(object.slug) : undefined,
      size: isSet(object.size) ? Size.fromJSON(object.size) : undefined,
      isCollected: isSet(object.isCollected) ? globalThis.Boolean(object.isCollected) : undefined,
      isSelected: isSet(object.isSelected) ? globalThis.Boolean(object.isSelected) : undefined,
    };
  },

  toJSON(message: RelatedItem): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.slug !== undefined) {
      obj.slug = Slug.toJSON(message.slug);
    }
    if (message.size !== undefined) {
      obj.size = Size.toJSON(message.size);
    }
    if (message.isCollected !== undefined) {
      obj.isCollected = message.isCollected;
    }
    if (message.isSelected !== undefined) {
      obj.isSelected = message.isSelected;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RelatedItem>, I>>(base?: I): RelatedItem {
    return RelatedItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RelatedItem>, I>>(object: I): RelatedItem {
    const message = createBaseRelatedItem();
    message.code = object.code ?? "";
    message.slug = (object.slug !== undefined && object.slug !== null) ? Slug.fromPartial(object.slug) : undefined;
    message.size = (object.size !== undefined && object.size !== null) ? Size.fromPartial(object.size) : undefined;
    message.isCollected = object.isCollected ?? undefined;
    message.isSelected = object.isSelected ?? undefined;
    return message;
  },
};

function createBaseAttributeValues(): AttributeValues {
  return { code: "", title: "", values: [], isHidden: false };
}

export const AttributeValues = {
  encode(message: AttributeValues, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    for (const v of message.values) {
      AttributeValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.isHidden === true) {
      writer.uint32(32).bool(message.isHidden);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttributeValues {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttributeValues();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.values.push(AttributeValue.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isHidden = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AttributeValues {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      values: globalThis.Array.isArray(object?.values) ? object.values.map((e: any) => AttributeValue.fromJSON(e)) : [],
      isHidden: isSet(object.isHidden) ? globalThis.Boolean(object.isHidden) : false,
    };
  },

  toJSON(message: AttributeValues): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.values?.length) {
      obj.values = message.values.map((e) => AttributeValue.toJSON(e));
    }
    if (message.isHidden === true) {
      obj.isHidden = message.isHidden;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AttributeValues>, I>>(base?: I): AttributeValues {
    return AttributeValues.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AttributeValues>, I>>(object: I): AttributeValues {
    const message = createBaseAttributeValues();
    message.code = object.code ?? "";
    message.title = object.title ?? "";
    message.values = object.values?.map((e) => AttributeValue.fromPartial(e)) || [];
    message.isHidden = object.isHidden ?? false;
    return message;
  },
};

function createBaseAttributeValue(): AttributeValue {
  return { code: "", value: "" };
}

export const AttributeValue = {
  encode(message: AttributeValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttributeValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttributeValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AttributeValue {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: AttributeValue): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AttributeValue>, I>>(base?: I): AttributeValue {
    return AttributeValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AttributeValue>, I>>(object: I): AttributeValue {
    const message = createBaseAttributeValue();
    message.code = object.code ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseAttributesGroup(): AttributesGroup {
  return { title: "", attributesValues: [] };
}

export const AttributesGroup = {
  encode(message: AttributesGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    for (const v of message.attributesValues) {
      AttributeValues.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttributesGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttributesGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.attributesValues.push(AttributeValues.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AttributesGroup {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      attributesValues: globalThis.Array.isArray(object?.attributesValues)
        ? object.attributesValues.map((e: any) => AttributeValues.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AttributesGroup): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.attributesValues?.length) {
      obj.attributesValues = message.attributesValues.map((e) => AttributeValues.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AttributesGroup>, I>>(base?: I): AttributesGroup {
    return AttributesGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AttributesGroup>, I>>(object: I): AttributesGroup {
    const message = createBaseAttributesGroup();
    message.title = object.title ?? "";
    message.attributesValues = object.attributesValues?.map((e) => AttributeValues.fromPartial(e)) || [];
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
