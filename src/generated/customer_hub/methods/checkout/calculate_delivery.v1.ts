/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Address } from "../../entities/address.v1";
import { DeliveriesByDates, Delivery } from "../../entities/delivery.v1";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает запрос на расчёт вариантов доставки */
export interface CalculateDeliveryRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Идентификатор адреса назначения. Может быть выбран из списка адресов пользователя */
  addressId?:
    | string
    | undefined;
  /**
   * Дата, не ранее которой ожидается доставка. Для большинства случаев заполняется как "сейчас".
   * Валидным считается значение "сегодня": более или равно началу текущих суток
   */
  date:
    | Date
    | undefined;
  /** Название временной зоны (см. TZ database name https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) */
  timezone?:
    | string
    | undefined;
  /** Данные адреса назначения. Может быть выбран из подсказок адреса */
  address?: Address | undefined;
}

/** Описывает ответ с вариантами доставки */
export interface CalculateDeliveryResponse {
  /** Варианты доставки */
  deliveries: Delivery[];
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.10.2023
   *
   * @deprecated
   */
  deliveriesByDates: DeliveriesByDates[];
}

function createBaseCalculateDeliveryRequest(): CalculateDeliveryRequest {
  return { sessionData: undefined, addressId: undefined, date: undefined, timezone: undefined, address: undefined };
}

export const CalculateDeliveryRequest = {
  encode(message: CalculateDeliveryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.addressId !== undefined) {
      writer.uint32(18).string(message.addressId);
    }
    if (message.date !== undefined) {
      Timestamp.encode(toTimestamp(message.date), writer.uint32(26).fork()).ldelim();
    }
    if (message.timezone !== undefined) {
      writer.uint32(34).string(message.timezone);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalculateDeliveryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalculateDeliveryRequest();
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

          message.addressId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.date = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.timezone = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.address = Address.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalculateDeliveryRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      addressId: isSet(object.addressId) ? globalThis.String(object.addressId) : undefined,
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      timezone: isSet(object.timezone) ? globalThis.String(object.timezone) : undefined,
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
    };
  },

  toJSON(message: CalculateDeliveryRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.addressId !== undefined) {
      obj.addressId = message.addressId;
    }
    if (message.date !== undefined) {
      obj.date = message.date.toISOString();
    }
    if (message.timezone !== undefined) {
      obj.timezone = message.timezone;
    }
    if (message.address !== undefined) {
      obj.address = Address.toJSON(message.address);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalculateDeliveryRequest>, I>>(base?: I): CalculateDeliveryRequest {
    return CalculateDeliveryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalculateDeliveryRequest>, I>>(object: I): CalculateDeliveryRequest {
    const message = createBaseCalculateDeliveryRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.addressId = object.addressId ?? undefined;
    message.date = object.date ?? undefined;
    message.timezone = object.timezone ?? undefined;
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    return message;
  },
};

function createBaseCalculateDeliveryResponse(): CalculateDeliveryResponse {
  return { deliveries: [], deliveriesByDates: [] };
}

export const CalculateDeliveryResponse = {
  encode(message: CalculateDeliveryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.deliveries) {
      Delivery.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.deliveriesByDates) {
      DeliveriesByDates.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalculateDeliveryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalculateDeliveryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.deliveries.push(Delivery.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deliveriesByDates.push(DeliveriesByDates.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalculateDeliveryResponse {
    return {
      deliveries: globalThis.Array.isArray(object?.deliveries)
        ? object.deliveries.map((e: any) => Delivery.fromJSON(e))
        : [],
      deliveriesByDates: globalThis.Array.isArray(object?.deliveriesByDates)
        ? object.deliveriesByDates.map((e: any) => DeliveriesByDates.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CalculateDeliveryResponse): unknown {
    const obj: any = {};
    if (message.deliveries?.length) {
      obj.deliveries = message.deliveries.map((e) => Delivery.toJSON(e));
    }
    if (message.deliveriesByDates?.length) {
      obj.deliveriesByDates = message.deliveriesByDates.map((e) => DeliveriesByDates.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalculateDeliveryResponse>, I>>(base?: I): CalculateDeliveryResponse {
    return CalculateDeliveryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalculateDeliveryResponse>, I>>(object: I): CalculateDeliveryResponse {
    const message = createBaseCalculateDeliveryResponse();
    message.deliveries = object.deliveries?.map((e) => Delivery.fromPartial(e)) || [];
    message.deliveriesByDates = object.deliveriesByDates?.map((e) => DeliveriesByDates.fromPartial(e)) || [];
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
