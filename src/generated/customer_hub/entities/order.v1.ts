/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { Money } from "../../common/money.v1";
import { TimeOfDay } from "../../common/timeofday.v1";
import { Timestamp } from "../../google/protobuf/timestamp";
import { AvailableOrderAction, availableOrderActionFromJSON, availableOrderActionToJSON } from "../enums/order_actions";
import { OrderLotStatus, orderLotStatusFromJSON, orderLotStatusToJSON } from "../enums/order_lot";
import { OrderStatus, orderStatusFromJSON, orderStatusToJSON } from "../enums/order_status";
import { Brand } from "./brand.v1";
import { ServiceItem } from "./delivery.v1";
import { AttributesGroup } from "./item.v1";
import { Label } from "./label.v1";
import { Size } from "./size.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Заказ */
export interface Order {
  /** Код заказа */
  code: string;
  /** Статус заказа "активный" или "завершенный" */
  status: OrderStatus;
  /** Дата создания */
  createdAt:
    | Date
    | undefined;
  /** Цена */
  price:
    | Money
    | undefined;
  /** Окончательная цена */
  finalPrice:
    | Money
    | undefined;
  /** Информация про доставки */
  deliveries: Order_Delivery[];
  /** Описание по заказу (для TYP и т.д.) */
  description: string;
  /** ФИО покупателя */
  customerFullName: string;
  /** Телефон покупателя */
  customerPhone: string;
  /** Статус заказа на OMS */
  orderStatus: Order_Status;
  /** Источник */
  source: string;
  /** Дата обновление */
  updatedAt:
    | Date
    | undefined;
  /** Дата завершения */
  closedAt:
    | Date
    | undefined;
  /** Допустимые действия с заказом */
  availableActions: AvailableOrderAction[];
}

/** Тип статуса заказа */
export enum Order_Status {
  ORDER_STATUS_PAID = 0,
  ORDER_STATUS_PACKING = 1,
  ORDER_STATUS_SHIPPED = 2,
  ORDER_STATUS_COMPLETED = 3,
  ORDER_STATUS_CANCELED = 4,
  ORDER_STATUS_CREATED = 5,
  ORDER_STATUS_PACKED = 6,
  UNRECOGNIZED = -1,
}

export function order_StatusFromJSON(object: any): Order_Status {
  switch (object) {
    case 0:
    case "ORDER_STATUS_PAID":
      return Order_Status.ORDER_STATUS_PAID;
    case 1:
    case "ORDER_STATUS_PACKING":
      return Order_Status.ORDER_STATUS_PACKING;
    case 2:
    case "ORDER_STATUS_SHIPPED":
      return Order_Status.ORDER_STATUS_SHIPPED;
    case 3:
    case "ORDER_STATUS_COMPLETED":
      return Order_Status.ORDER_STATUS_COMPLETED;
    case 4:
    case "ORDER_STATUS_CANCELED":
      return Order_Status.ORDER_STATUS_CANCELED;
    case 5:
    case "ORDER_STATUS_CREATED":
      return Order_Status.ORDER_STATUS_CREATED;
    case 6:
    case "ORDER_STATUS_PACKED":
      return Order_Status.ORDER_STATUS_PACKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Order_Status.UNRECOGNIZED;
  }
}

export function order_StatusToJSON(object: Order_Status): string {
  switch (object) {
    case Order_Status.ORDER_STATUS_PAID:
      return "ORDER_STATUS_PAID";
    case Order_Status.ORDER_STATUS_PACKING:
      return "ORDER_STATUS_PACKING";
    case Order_Status.ORDER_STATUS_SHIPPED:
      return "ORDER_STATUS_SHIPPED";
    case Order_Status.ORDER_STATUS_COMPLETED:
      return "ORDER_STATUS_COMPLETED";
    case Order_Status.ORDER_STATUS_CANCELED:
      return "ORDER_STATUS_CANCELED";
    case Order_Status.ORDER_STATUS_CREATED:
      return "ORDER_STATUS_CREATED";
    case Order_Status.ORDER_STATUS_PACKED:
      return "ORDER_STATUS_PACKED";
    case Order_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Товар заказа */
export interface Order_Item {
  /** Код предложения */
  offerCode: string;
  /** Код товара */
  itemCode: string;
  /** Заголовок */
  title: string;
  /** Бренд */
  brand:
    | Brand
    | undefined;
  /** Размер */
  size:
    | Size
    | undefined;
  /** Изображение */
  image:
    | Image
    | undefined;
  /** Цена */
  price:
    | Money
    | undefined;
  /** Б/у или нет товар */
  isUsed?:
    | boolean
    | undefined;
  /** Метки/шильдики */
  labels: Label[];
  /** Доступен ли товар для Click&Collect */
  availableToCollect: boolean;
  /**
   * Группы атрибутов
   * список групп отсортирован согласно sort_order в КП
   */
  attributesGroups: AttributesGroup[];
  /** Статус позиции заказа */
  status: OrderLotStatus;
}

/** Временные интервалы (относительное время) */
export interface Order_TimeInterval {
  /** Дата начала */
  start:
    | TimeOfDay
    | undefined;
  /** Дата конца */
  end: TimeOfDay | undefined;
}

/** Временные интервалы (абсолютное время) */
export interface Order_TimestampInterval {
  /** Дата начала */
  start:
    | Date
    | undefined;
  /** Дата конца */
  end: Date | undefined;
}

/** Доставка */
export interface Order_Delivery {
  /** Код доставки */
  code: string;
  /** Оператор доставляющий груз */
  operator: string;
  /** Дата доставки. */
  deliveryDate:
    | Date
    | undefined;
  /** Интервал доставки (например: 10:00-18:00, 12:00-14:00). */
  deliveryInterval:
    | Order_TimeInterval
    | undefined;
  /** Товары */
  items: Order_Item[];
  /** Описание */
  description: string;
  /** Адрес доставки */
  deliveryAddress: string;
  /** Интервал бронирования (например: 2023-05-01 10:00-2023-05-02 18:00). */
  reserveInterval?:
    | Order_TimestampInterval
    | undefined;
  /** Описание услуг доставки */
  serviceItems: ServiceItem[];
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  serviceItem: ServiceItem | undefined;
}

function createBaseOrder(): Order {
  return {
    code: "",
    status: 0,
    createdAt: undefined,
    price: undefined,
    finalPrice: undefined,
    deliveries: [],
    description: "",
    customerFullName: "",
    customerPhone: "",
    orderStatus: 0,
    source: "",
    updatedAt: undefined,
    closedAt: undefined,
    availableActions: [],
  };
}

export const Order = {
  encode(message: Order, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(42).string(message.code);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(50).fork()).ldelim();
    }
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(58).fork()).ldelim();
    }
    if (message.finalPrice !== undefined) {
      Money.encode(message.finalPrice, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.deliveries) {
      Order_Delivery.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(82).string(message.description);
    }
    if (message.customerFullName !== "") {
      writer.uint32(90).string(message.customerFullName);
    }
    if (message.customerPhone !== "") {
      writer.uint32(98).string(message.customerPhone);
    }
    if (message.orderStatus !== 0) {
      writer.uint32(104).int32(message.orderStatus);
    }
    if (message.source !== "") {
      writer.uint32(114).string(message.source);
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(122).fork()).ldelim();
    }
    if (message.closedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.closedAt), writer.uint32(130).fork()).ldelim();
    }
    writer.uint32(138).fork();
    for (const v of message.availableActions) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          if (tag !== 42) {
            break;
          }

          message.code = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.finalPrice = Money.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.deliveries.push(Order_Delivery.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.description = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.customerFullName = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.customerPhone = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.orderStatus = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.source = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.closedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 17:
          if (tag === 136) {
            message.availableActions.push(reader.int32() as any);

            continue;
          }

          if (tag === 138) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.availableActions.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Order {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      status: isSet(object.status) ? orderStatusFromJSON(object.status) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      finalPrice: isSet(object.finalPrice) ? Money.fromJSON(object.finalPrice) : undefined,
      deliveries: globalThis.Array.isArray(object?.deliveries)
        ? object.deliveries.map((e: any) => Order_Delivery.fromJSON(e))
        : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      customerFullName: isSet(object.customerFullName) ? globalThis.String(object.customerFullName) : "",
      customerPhone: isSet(object.customerPhone) ? globalThis.String(object.customerPhone) : "",
      orderStatus: isSet(object.orderStatus) ? order_StatusFromJSON(object.orderStatus) : 0,
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
      closedAt: isSet(object.closedAt) ? fromJsonTimestamp(object.closedAt) : undefined,
      availableActions: globalThis.Array.isArray(object?.availableActions)
        ? object.availableActions.map((e: any) => availableOrderActionFromJSON(e))
        : [],
    };
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.status !== 0) {
      obj.status = orderStatusToJSON(message.status);
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.finalPrice !== undefined) {
      obj.finalPrice = Money.toJSON(message.finalPrice);
    }
    if (message.deliveries?.length) {
      obj.deliveries = message.deliveries.map((e) => Order_Delivery.toJSON(e));
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.customerFullName !== "") {
      obj.customerFullName = message.customerFullName;
    }
    if (message.customerPhone !== "") {
      obj.customerPhone = message.customerPhone;
    }
    if (message.orderStatus !== 0) {
      obj.orderStatus = order_StatusToJSON(message.orderStatus);
    }
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.updatedAt !== undefined) {
      obj.updatedAt = message.updatedAt.toISOString();
    }
    if (message.closedAt !== undefined) {
      obj.closedAt = message.closedAt.toISOString();
    }
    if (message.availableActions?.length) {
      obj.availableActions = message.availableActions.map((e) => availableOrderActionToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Order>, I>>(base?: I): Order {
    return Order.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Order>, I>>(object: I): Order {
    const message = createBaseOrder();
    message.code = object.code ?? "";
    message.status = object.status ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.finalPrice = (object.finalPrice !== undefined && object.finalPrice !== null)
      ? Money.fromPartial(object.finalPrice)
      : undefined;
    message.deliveries = object.deliveries?.map((e) => Order_Delivery.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.customerFullName = object.customerFullName ?? "";
    message.customerPhone = object.customerPhone ?? "";
    message.orderStatus = object.orderStatus ?? 0;
    message.source = object.source ?? "";
    message.updatedAt = object.updatedAt ?? undefined;
    message.closedAt = object.closedAt ?? undefined;
    message.availableActions = object.availableActions?.map((e) => e) || [];
    return message;
  },
};

function createBaseOrder_Item(): Order_Item {
  return {
    offerCode: "",
    itemCode: "",
    title: "",
    brand: undefined,
    size: undefined,
    image: undefined,
    price: undefined,
    isUsed: undefined,
    labels: [],
    availableToCollect: false,
    attributesGroups: [],
    status: 0,
  };
}

export const Order_Item = {
  encode(message: Order_Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offerCode !== "") {
      writer.uint32(10).string(message.offerCode);
    }
    if (message.itemCode !== "") {
      writer.uint32(18).string(message.itemCode);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.brand !== undefined) {
      Brand.encode(message.brand, writer.uint32(34).fork()).ldelim();
    }
    if (message.size !== undefined) {
      Size.encode(message.size, writer.uint32(42).fork()).ldelim();
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(50).fork()).ldelim();
    }
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(58).fork()).ldelim();
    }
    if (message.isUsed !== undefined) {
      writer.uint32(64).bool(message.isUsed);
    }
    for (const v of message.labels) {
      Label.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.availableToCollect === true) {
      writer.uint32(80).bool(message.availableToCollect);
    }
    for (const v of message.attributesGroups) {
      AttributesGroup.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(96).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order_Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder_Item();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.offerCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.itemCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.brand = Brand.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.size = Size.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.isUsed = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.labels.push(Label.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.availableToCollect = reader.bool();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.attributesGroups.push(AttributesGroup.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Order_Item {
    return {
      offerCode: isSet(object.offerCode) ? globalThis.String(object.offerCode) : "",
      itemCode: isSet(object.itemCode) ? globalThis.String(object.itemCode) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      brand: isSet(object.brand) ? Brand.fromJSON(object.brand) : undefined,
      size: isSet(object.size) ? Size.fromJSON(object.size) : undefined,
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      isUsed: isSet(object.isUsed) ? globalThis.Boolean(object.isUsed) : undefined,
      labels: globalThis.Array.isArray(object?.labels) ? object.labels.map((e: any) => Label.fromJSON(e)) : [],
      availableToCollect: isSet(object.availableToCollect) ? globalThis.Boolean(object.availableToCollect) : false,
      attributesGroups: globalThis.Array.isArray(object?.attributesGroups)
        ? object.attributesGroups.map((e: any) => AttributesGroup.fromJSON(e))
        : [],
      status: isSet(object.status) ? orderLotStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Order_Item): unknown {
    const obj: any = {};
    if (message.offerCode !== "") {
      obj.offerCode = message.offerCode;
    }
    if (message.itemCode !== "") {
      obj.itemCode = message.itemCode;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.brand !== undefined) {
      obj.brand = Brand.toJSON(message.brand);
    }
    if (message.size !== undefined) {
      obj.size = Size.toJSON(message.size);
    }
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.isUsed !== undefined) {
      obj.isUsed = message.isUsed;
    }
    if (message.labels?.length) {
      obj.labels = message.labels.map((e) => Label.toJSON(e));
    }
    if (message.availableToCollect === true) {
      obj.availableToCollect = message.availableToCollect;
    }
    if (message.attributesGroups?.length) {
      obj.attributesGroups = message.attributesGroups.map((e) => AttributesGroup.toJSON(e));
    }
    if (message.status !== 0) {
      obj.status = orderLotStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Order_Item>, I>>(base?: I): Order_Item {
    return Order_Item.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Order_Item>, I>>(object: I): Order_Item {
    const message = createBaseOrder_Item();
    message.offerCode = object.offerCode ?? "";
    message.itemCode = object.itemCode ?? "";
    message.title = object.title ?? "";
    message.brand = (object.brand !== undefined && object.brand !== null) ? Brand.fromPartial(object.brand) : undefined;
    message.size = (object.size !== undefined && object.size !== null) ? Size.fromPartial(object.size) : undefined;
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.isUsed = object.isUsed ?? undefined;
    message.labels = object.labels?.map((e) => Label.fromPartial(e)) || [];
    message.availableToCollect = object.availableToCollect ?? false;
    message.attributesGroups = object.attributesGroups?.map((e) => AttributesGroup.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseOrder_TimeInterval(): Order_TimeInterval {
  return { start: undefined, end: undefined };
}

export const Order_TimeInterval = {
  encode(message: Order_TimeInterval, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      TimeOfDay.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      TimeOfDay.encode(message.end, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order_TimeInterval {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder_TimeInterval();
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

  fromJSON(object: any): Order_TimeInterval {
    return {
      start: isSet(object.start) ? TimeOfDay.fromJSON(object.start) : undefined,
      end: isSet(object.end) ? TimeOfDay.fromJSON(object.end) : undefined,
    };
  },

  toJSON(message: Order_TimeInterval): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = TimeOfDay.toJSON(message.start);
    }
    if (message.end !== undefined) {
      obj.end = TimeOfDay.toJSON(message.end);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Order_TimeInterval>, I>>(base?: I): Order_TimeInterval {
    return Order_TimeInterval.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Order_TimeInterval>, I>>(object: I): Order_TimeInterval {
    const message = createBaseOrder_TimeInterval();
    message.start = (object.start !== undefined && object.start !== null)
      ? TimeOfDay.fromPartial(object.start)
      : undefined;
    message.end = (object.end !== undefined && object.end !== null) ? TimeOfDay.fromPartial(object.end) : undefined;
    return message;
  },
};

function createBaseOrder_TimestampInterval(): Order_TimestampInterval {
  return { start: undefined, end: undefined };
}

export const Order_TimestampInterval = {
  encode(message: Order_TimestampInterval, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      Timestamp.encode(toTimestamp(message.start), writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(toTimestamp(message.end), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order_TimestampInterval {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder_TimestampInterval();
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

  fromJSON(object: any): Order_TimestampInterval {
    return {
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
    };
  },

  toJSON(message: Order_TimestampInterval): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = message.start.toISOString();
    }
    if (message.end !== undefined) {
      obj.end = message.end.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Order_TimestampInterval>, I>>(base?: I): Order_TimestampInterval {
    return Order_TimestampInterval.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Order_TimestampInterval>, I>>(object: I): Order_TimestampInterval {
    const message = createBaseOrder_TimestampInterval();
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
    return message;
  },
};

function createBaseOrder_Delivery(): Order_Delivery {
  return {
    code: "",
    operator: "",
    deliveryDate: undefined,
    deliveryInterval: undefined,
    items: [],
    description: "",
    deliveryAddress: "",
    reserveInterval: undefined,
    serviceItems: [],
    serviceItem: undefined,
  };
}

export const Order_Delivery = {
  encode(message: Order_Delivery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.operator !== "") {
      writer.uint32(18).string(message.operator);
    }
    if (message.deliveryDate !== undefined) {
      Timestamp.encode(toTimestamp(message.deliveryDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.deliveryInterval !== undefined) {
      Order_TimeInterval.encode(message.deliveryInterval, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.items) {
      Order_Item.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.deliveryAddress !== "") {
      writer.uint32(66).string(message.deliveryAddress);
    }
    if (message.reserveInterval !== undefined) {
      Order_TimestampInterval.encode(message.reserveInterval, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.serviceItems) {
      ServiceItem.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.serviceItem !== undefined) {
      ServiceItem.encode(message.serviceItem, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order_Delivery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder_Delivery();
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

          message.operator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deliveryDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.deliveryInterval = Order_TimeInterval.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.items.push(Order_Item.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.description = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.deliveryAddress = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reserveInterval = Order_TimestampInterval.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.serviceItems.push(ServiceItem.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.serviceItem = ServiceItem.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Order_Delivery {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      operator: isSet(object.operator) ? globalThis.String(object.operator) : "",
      deliveryDate: isSet(object.deliveryDate) ? fromJsonTimestamp(object.deliveryDate) : undefined,
      deliveryInterval: isSet(object.deliveryInterval)
        ? Order_TimeInterval.fromJSON(object.deliveryInterval)
        : undefined,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Order_Item.fromJSON(e)) : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      deliveryAddress: isSet(object.deliveryAddress) ? globalThis.String(object.deliveryAddress) : "",
      reserveInterval: isSet(object.reserveInterval)
        ? Order_TimestampInterval.fromJSON(object.reserveInterval)
        : undefined,
      serviceItems: globalThis.Array.isArray(object?.serviceItems)
        ? object.serviceItems.map((e: any) => ServiceItem.fromJSON(e))
        : [],
      serviceItem: isSet(object.serviceItem) ? ServiceItem.fromJSON(object.serviceItem) : undefined,
    };
  },

  toJSON(message: Order_Delivery): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.operator !== "") {
      obj.operator = message.operator;
    }
    if (message.deliveryDate !== undefined) {
      obj.deliveryDate = message.deliveryDate.toISOString();
    }
    if (message.deliveryInterval !== undefined) {
      obj.deliveryInterval = Order_TimeInterval.toJSON(message.deliveryInterval);
    }
    if (message.items?.length) {
      obj.items = message.items.map((e) => Order_Item.toJSON(e));
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.deliveryAddress !== "") {
      obj.deliveryAddress = message.deliveryAddress;
    }
    if (message.reserveInterval !== undefined) {
      obj.reserveInterval = Order_TimestampInterval.toJSON(message.reserveInterval);
    }
    if (message.serviceItems?.length) {
      obj.serviceItems = message.serviceItems.map((e) => ServiceItem.toJSON(e));
    }
    if (message.serviceItem !== undefined) {
      obj.serviceItem = ServiceItem.toJSON(message.serviceItem);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Order_Delivery>, I>>(base?: I): Order_Delivery {
    return Order_Delivery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Order_Delivery>, I>>(object: I): Order_Delivery {
    const message = createBaseOrder_Delivery();
    message.code = object.code ?? "";
    message.operator = object.operator ?? "";
    message.deliveryDate = object.deliveryDate ?? undefined;
    message.deliveryInterval = (object.deliveryInterval !== undefined && object.deliveryInterval !== null)
      ? Order_TimeInterval.fromPartial(object.deliveryInterval)
      : undefined;
    message.items = object.items?.map((e) => Order_Item.fromPartial(e)) || [];
    message.description = object.description ?? "";
    message.deliveryAddress = object.deliveryAddress ?? "";
    message.reserveInterval = (object.reserveInterval !== undefined && object.reserveInterval !== null)
      ? Order_TimestampInterval.fromPartial(object.reserveInterval)
      : undefined;
    message.serviceItems = object.serviceItems?.map((e) => ServiceItem.fromPartial(e)) || [];
    message.serviceItem = (object.serviceItem !== undefined && object.serviceItem !== null)
      ? ServiceItem.fromPartial(object.serviceItem)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
