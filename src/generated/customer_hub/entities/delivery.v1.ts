/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Money } from "../../common/money.v1";
import { TimeOfDay } from "../../common/timeofday.v1";
import { Timestamp } from "../../google/protobuf/timestamp";
import { DeliveryType, deliveryTypeFromJSON, deliveryTypeToJSON } from "../enums/delivery_type";
import { AddressData } from "./address.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает услугу доставки */
export interface ServiceItem {
  /** Стоимость услуги */
  price:
    | Money
    | undefined;
  /** Название для отображения */
  displayName: string;
  /** Итоговая стоимость услуги с учетом скидки */
  finalPrice:
    | Money
    | undefined;
  /**
   * Код услуги. Возможные значения:
   * delivery - доставка товара
   * inspection - осмотр при получении
   * partial_redemption - частичный выкуп
   * fitting - примерка
   */
  code: string;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  id: string;
}

/** Описывает свойства доставки */
export interface DeliveryProperty {
  /** Код */
  code: string;
  /** Значение */
  value: string;
}

/** Описывает временной интервал (абсолютное время) */
export interface TimeInterval {
  /** Дата и время начала */
  start:
    | Date
    | undefined;
  /** Дата и время окончания */
  end: Date | undefined;
}

/** Описывает временной интервал (относительное время) */
export interface TimeOfDayInterval {
  /** Время начала интервала */
  start:
    | TimeOfDay
    | undefined;
  /** Время окончания интервала */
  end: TimeOfDay | undefined;
}

/** Описывает интервал доставки/бронирования */
export interface DeliveryInterval {
  /** Код интервала */
  code: string;
  /** Временной интервал (абсолютное время) */
  interval?:
    | TimeInterval
    | undefined;
  /** Временной интервал (относительное время) */
  hours?: TimeOfDayInterval | undefined;
}

/** Описывает позицию доставки */
export interface DeliveryLot {
  /** Код товара */
  itemCode: string;
  /**
   * Идентификатор позиции корзины. Заполняется
   * только в ответах на запросы методов чекаута
   */
  cartItemId?:
    | string
    | undefined;
  /** Условия возврата */
  returnConditions?: ReturnConditions | undefined;
}

/** Описывает доставку/бронирование */
export interface Delivery {
  /** Дата доставки (округленное до начала дня время) */
  deliveryDate:
    | Date
    | undefined;
  /** Интервалы доставки/бронирования. Не заполняется если доставка невозможна. */
  deliveryIntervals: DeliveryInterval[];
  /** Код 3PL оператора */
  operator: string;
  /** Итоговая стоимость доставки */
  serviceItem:
    | ServiceItem
    | undefined;
  /** Дисклеймер доставки. Если доставка невозможна - содержит описание причины. */
  description: string;
  /** Детализация услуг по доставке (стоимость доставки, примерка и пр.) */
  serviceItems: ServiceItem[];
  /** Заголовок доставки (доставка №n). Одинаковое значение для всех доставок указанных позиций корзины. */
  title: string;
  /** Строковое описание опций доставки (с осмотром, без примерки) */
  propertiesDescription: string;
  /** Опции доставки */
  properties: DeliveryProperty[];
  /** Признак возможности доставки указанных позиций корзины. */
  available: boolean;
  /** Товары в доставке */
  lots: DeliveryLot[];
  /**
   * @exclude deprecated at 23.11.2023, delete after 01.03.2024
   *
   * @deprecated
   */
  cartItemIds: string[];
}

/**
 * @exclude deprecated at 25.10.2023, delete after 01.10.2023
 *
 * @deprecated
 */
export interface DeliveriesByDates {
  /** Дата */
  dateTime:
    | Date
    | undefined;
  /** Набор доставок */
  deliveries: Delivery[];
}

/** Описывает контактные данные получателя заказа */
export interface DeliveryContact {
  /**
   * Идентификатор контакта. Может быть заполнен идентификатором авторизованного
   * пользователя, если заполняется на основе данных профиля
   */
  contactId?:
    | string
    | undefined;
  /** Номер телефона получателя в формате E.164 */
  phone: string;
  /** Разделенные пробелом имя и фамилия получателя */
  personName: string;
}

/** Описывает данные доставки чекаута */
export interface DeliveryState {
  /** Контактная информация получателя */
  recipient:
    | DeliveryContact
    | undefined;
  /** Адрес доставки */
  destination:
    | AddressData
    | undefined;
  /** Выбранный вариант доставки */
  selectedDeliveries: Delivery[];
  /** Строковое описание выбранных доставок */
  description: string;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  selectedDelivery: Delivery | undefined;
}

/** Описывает условия возврата. */
export interface ReturnConditions {
  /** Возврат доступен? */
  isAvailable: boolean;
  /** Количество дней на возврат. */
  days: number;
}

/** Описывает сгруппированные по типу доставки */
export interface DeliveriesByType {
  /** Тип */
  type: DeliveryType;
  /** Данные доставок */
  deliveries: Delivery[];
}

function createBaseServiceItem(): ServiceItem {
  return { price: undefined, displayName: "", finalPrice: undefined, code: "", id: "" };
}

export const ServiceItem = {
  encode(message: ServiceItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(18).fork()).ldelim();
    }
    if (message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.finalPrice !== undefined) {
      Money.encode(message.finalPrice, writer.uint32(34).fork()).ldelim();
    }
    if (message.code !== "") {
      writer.uint32(42).string(message.code);
    }
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.finalPrice = Money.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.code = reader.string();
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServiceItem {
    return {
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      finalPrice: isSet(object.finalPrice) ? Money.fromJSON(object.finalPrice) : undefined,
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
    };
  },

  toJSON(message: ServiceItem): unknown {
    const obj: any = {};
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.finalPrice !== undefined) {
      obj.finalPrice = Money.toJSON(message.finalPrice);
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServiceItem>, I>>(base?: I): ServiceItem {
    return ServiceItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServiceItem>, I>>(object: I): ServiceItem {
    const message = createBaseServiceItem();
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.displayName = object.displayName ?? "";
    message.finalPrice = (object.finalPrice !== undefined && object.finalPrice !== null)
      ? Money.fromPartial(object.finalPrice)
      : undefined;
    message.code = object.code ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeliveryProperty(): DeliveryProperty {
  return { code: "", value: "" };
}

export const DeliveryProperty = {
  encode(message: DeliveryProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveryProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveryProperty();
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

  fromJSON(object: any): DeliveryProperty {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: DeliveryProperty): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveryProperty>, I>>(base?: I): DeliveryProperty {
    return DeliveryProperty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveryProperty>, I>>(object: I): DeliveryProperty {
    const message = createBaseDeliveryProperty();
    message.code = object.code ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseTimeInterval(): TimeInterval {
  return { start: undefined, end: undefined };
}

export const TimeInterval = {
  encode(message: TimeInterval, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      Timestamp.encode(toTimestamp(message.start), writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(toTimestamp(message.end), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeInterval {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeInterval();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.start = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.end = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimeInterval {
    return {
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
    };
  },

  toJSON(message: TimeInterval): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = message.start.toISOString();
    }
    if (message.end !== undefined) {
      obj.end = message.end.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimeInterval>, I>>(base?: I): TimeInterval {
    return TimeInterval.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimeInterval>, I>>(object: I): TimeInterval {
    const message = createBaseTimeInterval();
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
    return message;
  },
};

function createBaseTimeOfDayInterval(): TimeOfDayInterval {
  return { start: undefined, end: undefined };
}

export const TimeOfDayInterval = {
  encode(message: TimeOfDayInterval, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      TimeOfDay.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      TimeOfDay.encode(message.end, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TimeOfDayInterval {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimeOfDayInterval();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.start = TimeOfDay.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.end = TimeOfDay.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TimeOfDayInterval {
    return {
      start: isSet(object.start) ? TimeOfDay.fromJSON(object.start) : undefined,
      end: isSet(object.end) ? TimeOfDay.fromJSON(object.end) : undefined,
    };
  },

  toJSON(message: TimeOfDayInterval): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = TimeOfDay.toJSON(message.start);
    }
    if (message.end !== undefined) {
      obj.end = TimeOfDay.toJSON(message.end);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TimeOfDayInterval>, I>>(base?: I): TimeOfDayInterval {
    return TimeOfDayInterval.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TimeOfDayInterval>, I>>(object: I): TimeOfDayInterval {
    const message = createBaseTimeOfDayInterval();
    message.start = (object.start !== undefined && object.start !== null)
      ? TimeOfDay.fromPartial(object.start)
      : undefined;
    message.end = (object.end !== undefined && object.end !== null) ? TimeOfDay.fromPartial(object.end) : undefined;
    return message;
  },
};

function createBaseDeliveryInterval(): DeliveryInterval {
  return { code: "", interval: undefined, hours: undefined };
}

export const DeliveryInterval = {
  encode(message: DeliveryInterval, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.interval !== undefined) {
      TimeInterval.encode(message.interval, writer.uint32(18).fork()).ldelim();
    }
    if (message.hours !== undefined) {
      TimeOfDayInterval.encode(message.hours, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveryInterval {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveryInterval();
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

          message.interval = TimeInterval.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.hours = TimeOfDayInterval.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeliveryInterval {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      interval: isSet(object.interval) ? TimeInterval.fromJSON(object.interval) : undefined,
      hours: isSet(object.hours) ? TimeOfDayInterval.fromJSON(object.hours) : undefined,
    };
  },

  toJSON(message: DeliveryInterval): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.interval !== undefined) {
      obj.interval = TimeInterval.toJSON(message.interval);
    }
    if (message.hours !== undefined) {
      obj.hours = TimeOfDayInterval.toJSON(message.hours);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveryInterval>, I>>(base?: I): DeliveryInterval {
    return DeliveryInterval.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveryInterval>, I>>(object: I): DeliveryInterval {
    const message = createBaseDeliveryInterval();
    message.code = object.code ?? "";
    message.interval = (object.interval !== undefined && object.interval !== null)
      ? TimeInterval.fromPartial(object.interval)
      : undefined;
    message.hours = (object.hours !== undefined && object.hours !== null)
      ? TimeOfDayInterval.fromPartial(object.hours)
      : undefined;
    return message;
  },
};

function createBaseDeliveryLot(): DeliveryLot {
  return { itemCode: "", cartItemId: undefined, returnConditions: undefined };
}

export const DeliveryLot = {
  encode(message: DeliveryLot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.itemCode !== "") {
      writer.uint32(10).string(message.itemCode);
    }
    if (message.cartItemId !== undefined) {
      writer.uint32(18).string(message.cartItemId);
    }
    if (message.returnConditions !== undefined) {
      ReturnConditions.encode(message.returnConditions, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveryLot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveryLot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.itemCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.cartItemId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.returnConditions = ReturnConditions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeliveryLot {
    return {
      itemCode: isSet(object.itemCode) ? globalThis.String(object.itemCode) : "",
      cartItemId: isSet(object.cartItemId) ? globalThis.String(object.cartItemId) : undefined,
      returnConditions: isSet(object.returnConditions) ? ReturnConditions.fromJSON(object.returnConditions) : undefined,
    };
  },

  toJSON(message: DeliveryLot): unknown {
    const obj: any = {};
    if (message.itemCode !== "") {
      obj.itemCode = message.itemCode;
    }
    if (message.cartItemId !== undefined) {
      obj.cartItemId = message.cartItemId;
    }
    if (message.returnConditions !== undefined) {
      obj.returnConditions = ReturnConditions.toJSON(message.returnConditions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveryLot>, I>>(base?: I): DeliveryLot {
    return DeliveryLot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveryLot>, I>>(object: I): DeliveryLot {
    const message = createBaseDeliveryLot();
    message.itemCode = object.itemCode ?? "";
    message.cartItemId = object.cartItemId ?? undefined;
    message.returnConditions = (object.returnConditions !== undefined && object.returnConditions !== null)
      ? ReturnConditions.fromPartial(object.returnConditions)
      : undefined;
    return message;
  },
};

function createBaseDelivery(): Delivery {
  return {
    deliveryDate: undefined,
    deliveryIntervals: [],
    operator: "",
    serviceItem: undefined,
    description: "",
    serviceItems: [],
    title: "",
    propertiesDescription: "",
    properties: [],
    available: false,
    lots: [],
    cartItemIds: [],
  };
}

export const Delivery = {
  encode(message: Delivery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deliveryDate !== undefined) {
      Timestamp.encode(toTimestamp(message.deliveryDate), writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.deliveryIntervals) {
      DeliveryInterval.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.operator !== "") {
      writer.uint32(26).string(message.operator);
    }
    if (message.serviceItem !== undefined) {
      ServiceItem.encode(message.serviceItem, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    for (const v of message.serviceItems) {
      ServiceItem.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.title !== "") {
      writer.uint32(66).string(message.title);
    }
    if (message.propertiesDescription !== "") {
      writer.uint32(74).string(message.propertiesDescription);
    }
    for (const v of message.properties) {
      DeliveryProperty.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.available === true) {
      writer.uint32(88).bool(message.available);
    }
    for (const v of message.lots) {
      DeliveryLot.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.cartItemIds) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delivery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelivery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deliveryDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deliveryIntervals.push(DeliveryInterval.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.operator = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.serviceItem = ServiceItem.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.serviceItems.push(ServiceItem.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.title = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.propertiesDescription = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.properties.push(DeliveryProperty.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.available = reader.bool();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.lots.push(DeliveryLot.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.cartItemIds.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Delivery {
    return {
      deliveryDate: isSet(object.deliveryDate) ? fromJsonTimestamp(object.deliveryDate) : undefined,
      deliveryIntervals: globalThis.Array.isArray(object?.deliveryIntervals)
        ? object.deliveryIntervals.map((e: any) => DeliveryInterval.fromJSON(e))
        : [],
      operator: isSet(object.operator) ? globalThis.String(object.operator) : "",
      serviceItem: isSet(object.serviceItem) ? ServiceItem.fromJSON(object.serviceItem) : undefined,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      serviceItems: globalThis.Array.isArray(object?.serviceItems)
        ? object.serviceItems.map((e: any) => ServiceItem.fromJSON(e))
        : [],
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      propertiesDescription: isSet(object.propertiesDescription) ? globalThis.String(object.propertiesDescription) : "",
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => DeliveryProperty.fromJSON(e))
        : [],
      available: isSet(object.available) ? globalThis.Boolean(object.available) : false,
      lots: globalThis.Array.isArray(object?.lots) ? object.lots.map((e: any) => DeliveryLot.fromJSON(e)) : [],
      cartItemIds: globalThis.Array.isArray(object?.cartItemIds)
        ? object.cartItemIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Delivery): unknown {
    const obj: any = {};
    if (message.deliveryDate !== undefined) {
      obj.deliveryDate = message.deliveryDate.toISOString();
    }
    if (message.deliveryIntervals?.length) {
      obj.deliveryIntervals = message.deliveryIntervals.map((e) => DeliveryInterval.toJSON(e));
    }
    if (message.operator !== "") {
      obj.operator = message.operator;
    }
    if (message.serviceItem !== undefined) {
      obj.serviceItem = ServiceItem.toJSON(message.serviceItem);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.serviceItems?.length) {
      obj.serviceItems = message.serviceItems.map((e) => ServiceItem.toJSON(e));
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.propertiesDescription !== "") {
      obj.propertiesDescription = message.propertiesDescription;
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => DeliveryProperty.toJSON(e));
    }
    if (message.available === true) {
      obj.available = message.available;
    }
    if (message.lots?.length) {
      obj.lots = message.lots.map((e) => DeliveryLot.toJSON(e));
    }
    if (message.cartItemIds?.length) {
      obj.cartItemIds = message.cartItemIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Delivery>, I>>(base?: I): Delivery {
    return Delivery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Delivery>, I>>(object: I): Delivery {
    const message = createBaseDelivery();
    message.deliveryDate = object.deliveryDate ?? undefined;
    message.deliveryIntervals = object.deliveryIntervals?.map((e) => DeliveryInterval.fromPartial(e)) || [];
    message.operator = object.operator ?? "";
    message.serviceItem = (object.serviceItem !== undefined && object.serviceItem !== null)
      ? ServiceItem.fromPartial(object.serviceItem)
      : undefined;
    message.description = object.description ?? "";
    message.serviceItems = object.serviceItems?.map((e) => ServiceItem.fromPartial(e)) || [];
    message.title = object.title ?? "";
    message.propertiesDescription = object.propertiesDescription ?? "";
    message.properties = object.properties?.map((e) => DeliveryProperty.fromPartial(e)) || [];
    message.available = object.available ?? false;
    message.lots = object.lots?.map((e) => DeliveryLot.fromPartial(e)) || [];
    message.cartItemIds = object.cartItemIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseDeliveriesByDates(): DeliveriesByDates {
  return { dateTime: undefined, deliveries: [] };
}

export const DeliveriesByDates = {
  encode(message: DeliveriesByDates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.dateTime), writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.deliveries) {
      Delivery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveriesByDates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveriesByDates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deliveries.push(Delivery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeliveriesByDates {
    return {
      dateTime: isSet(object.dateTime) ? fromJsonTimestamp(object.dateTime) : undefined,
      deliveries: globalThis.Array.isArray(object?.deliveries)
        ? object.deliveries.map((e: any) => Delivery.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeliveriesByDates): unknown {
    const obj: any = {};
    if (message.dateTime !== undefined) {
      obj.dateTime = message.dateTime.toISOString();
    }
    if (message.deliveries?.length) {
      obj.deliveries = message.deliveries.map((e) => Delivery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveriesByDates>, I>>(base?: I): DeliveriesByDates {
    return DeliveriesByDates.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveriesByDates>, I>>(object: I): DeliveriesByDates {
    const message = createBaseDeliveriesByDates();
    message.dateTime = object.dateTime ?? undefined;
    message.deliveries = object.deliveries?.map((e) => Delivery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDeliveryContact(): DeliveryContact {
  return { contactId: undefined, phone: "", personName: "" };
}

export const DeliveryContact = {
  encode(message: DeliveryContact, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contactId !== undefined) {
      writer.uint32(8).int64(message.contactId);
    }
    if (message.phone !== "") {
      writer.uint32(18).string(message.phone);
    }
    if (message.personName !== "") {
      writer.uint32(26).string(message.personName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveryContact {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveryContact();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.contactId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.phone = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.personName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeliveryContact {
    return {
      contactId: isSet(object.contactId) ? globalThis.String(object.contactId) : undefined,
      phone: isSet(object.phone) ? globalThis.String(object.phone) : "",
      personName: isSet(object.personName) ? globalThis.String(object.personName) : "",
    };
  },

  toJSON(message: DeliveryContact): unknown {
    const obj: any = {};
    if (message.contactId !== undefined) {
      obj.contactId = message.contactId;
    }
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    if (message.personName !== "") {
      obj.personName = message.personName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveryContact>, I>>(base?: I): DeliveryContact {
    return DeliveryContact.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveryContact>, I>>(object: I): DeliveryContact {
    const message = createBaseDeliveryContact();
    message.contactId = object.contactId ?? undefined;
    message.phone = object.phone ?? "";
    message.personName = object.personName ?? "";
    return message;
  },
};

function createBaseDeliveryState(): DeliveryState {
  return {
    recipient: undefined,
    destination: undefined,
    selectedDeliveries: [],
    description: "",
    selectedDelivery: undefined,
  };
}

export const DeliveryState = {
  encode(message: DeliveryState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== undefined) {
      DeliveryContact.encode(message.recipient, writer.uint32(10).fork()).ldelim();
    }
    if (message.destination !== undefined) {
      AddressData.encode(message.destination, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.selectedDeliveries) {
      Delivery.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.selectedDelivery !== undefined) {
      Delivery.encode(message.selectedDelivery, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveryState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveryState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipient = DeliveryContact.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.destination = AddressData.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.selectedDeliveries.push(Delivery.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.selectedDelivery = Delivery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeliveryState {
    return {
      recipient: isSet(object.recipient) ? DeliveryContact.fromJSON(object.recipient) : undefined,
      destination: isSet(object.destination) ? AddressData.fromJSON(object.destination) : undefined,
      selectedDeliveries: globalThis.Array.isArray(object?.selectedDeliveries)
        ? object.selectedDeliveries.map((e: any) => Delivery.fromJSON(e))
        : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      selectedDelivery: isSet(object.selectedDelivery) ? Delivery.fromJSON(object.selectedDelivery) : undefined,
    };
  },

  toJSON(message: DeliveryState): unknown {
    const obj: any = {};
    if (message.recipient !== undefined) {
      obj.recipient = DeliveryContact.toJSON(message.recipient);
    }
    if (message.destination !== undefined) {
      obj.destination = AddressData.toJSON(message.destination);
    }
    if (message.selectedDeliveries?.length) {
      obj.selectedDeliveries = message.selectedDeliveries.map((e) => Delivery.toJSON(e));
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.selectedDelivery !== undefined) {
      obj.selectedDelivery = Delivery.toJSON(message.selectedDelivery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveryState>, I>>(base?: I): DeliveryState {
    return DeliveryState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveryState>, I>>(object: I): DeliveryState {
    const message = createBaseDeliveryState();
    message.recipient = (object.recipient !== undefined && object.recipient !== null)
      ? DeliveryContact.fromPartial(object.recipient)
      : undefined;
    message.destination = (object.destination !== undefined && object.destination !== null)
      ? AddressData.fromPartial(object.destination)
      : undefined;
    message.selectedDeliveries = object.selectedDeliveries?.map((e) => Delivery.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.selectedDelivery = (object.selectedDelivery !== undefined && object.selectedDelivery !== null)
      ? Delivery.fromPartial(object.selectedDelivery)
      : undefined;
    return message;
  },
};

function createBaseReturnConditions(): ReturnConditions {
  return { isAvailable: false, days: 0 };
}

export const ReturnConditions = {
  encode(message: ReturnConditions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.isAvailable === true) {
      writer.uint32(8).bool(message.isAvailable);
    }
    if (message.days !== 0) {
      writer.uint32(16).int32(message.days);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReturnConditions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReturnConditions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.isAvailable = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.days = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReturnConditions {
    return {
      isAvailable: isSet(object.isAvailable) ? globalThis.Boolean(object.isAvailable) : false,
      days: isSet(object.days) ? globalThis.Number(object.days) : 0,
    };
  },

  toJSON(message: ReturnConditions): unknown {
    const obj: any = {};
    if (message.isAvailable === true) {
      obj.isAvailable = message.isAvailable;
    }
    if (message.days !== 0) {
      obj.days = Math.round(message.days);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReturnConditions>, I>>(base?: I): ReturnConditions {
    return ReturnConditions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReturnConditions>, I>>(object: I): ReturnConditions {
    const message = createBaseReturnConditions();
    message.isAvailable = object.isAvailable ?? false;
    message.days = object.days ?? 0;
    return message;
  },
};

function createBaseDeliveriesByType(): DeliveriesByType {
  return { type: 0, deliveries: [] };
}

export const DeliveriesByType = {
  encode(message: DeliveriesByType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    for (const v of message.deliveries) {
      Delivery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeliveriesByType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeliveriesByType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deliveries.push(Delivery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeliveriesByType {
    return {
      type: isSet(object.type) ? deliveryTypeFromJSON(object.type) : 0,
      deliveries: globalThis.Array.isArray(object?.deliveries)
        ? object.deliveries.map((e: any) => Delivery.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeliveriesByType): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = deliveryTypeToJSON(message.type);
    }
    if (message.deliveries?.length) {
      obj.deliveries = message.deliveries.map((e) => Delivery.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeliveriesByType>, I>>(base?: I): DeliveriesByType {
    return DeliveriesByType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeliveriesByType>, I>>(object: I): DeliveriesByType {
    const message = createBaseDeliveriesByType();
    message.type = object.type ?? 0;
    message.deliveries = object.deliveries?.map((e) => Delivery.fromPartial(e)) || [];
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (globalThis.Number(t.seconds) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
