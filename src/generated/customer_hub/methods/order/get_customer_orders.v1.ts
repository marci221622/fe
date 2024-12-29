/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Order } from "../../entities/order.v1";
import { SessionData } from "../../entities/session_data.v1";
import { OrderStatus, orderStatusFromJSON, orderStatusToJSON } from "../../enums/order_status";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на получение списка заказов */
export interface GetCustomerOrdersRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Пагинация */
  pagination:
    | GetCustomerOrdersRequest_Pagination
    | undefined;
  /** Сортировка */
  sort:
    | GetCustomerOrdersRequest_ListOrdersSort
    | undefined;
  /** Статусы заказов */
  statuses: OrderStatus[];
}

/** Пагинация */
export interface GetCustomerOrdersRequest_Pagination {
  limit: string;
  offset: string;
}

/** Сортировка */
export interface GetCustomerOrdersRequest_ListOrdersSort {
  field: GetCustomerOrdersRequest_ListOrdersSort_Field;
  direction: GetCustomerOrdersRequest_ListOrdersSort_Direction;
}

export enum GetCustomerOrdersRequest_ListOrdersSort_Field {
  CREATED_AT = 0,
  UNRECOGNIZED = -1,
}

export function getCustomerOrdersRequest_ListOrdersSort_FieldFromJSON(
  object: any,
): GetCustomerOrdersRequest_ListOrdersSort_Field {
  switch (object) {
    case 0:
    case "CREATED_AT":
      return GetCustomerOrdersRequest_ListOrdersSort_Field.CREATED_AT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetCustomerOrdersRequest_ListOrdersSort_Field.UNRECOGNIZED;
  }
}

export function getCustomerOrdersRequest_ListOrdersSort_FieldToJSON(
  object: GetCustomerOrdersRequest_ListOrdersSort_Field,
): string {
  switch (object) {
    case GetCustomerOrdersRequest_ListOrdersSort_Field.CREATED_AT:
      return "CREATED_AT";
    case GetCustomerOrdersRequest_ListOrdersSort_Field.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum GetCustomerOrdersRequest_ListOrdersSort_Direction {
  DESC = 0,
  ASC = 1,
  UNRECOGNIZED = -1,
}

export function getCustomerOrdersRequest_ListOrdersSort_DirectionFromJSON(
  object: any,
): GetCustomerOrdersRequest_ListOrdersSort_Direction {
  switch (object) {
    case 0:
    case "DESC":
      return GetCustomerOrdersRequest_ListOrdersSort_Direction.DESC;
    case 1:
    case "ASC":
      return GetCustomerOrdersRequest_ListOrdersSort_Direction.ASC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetCustomerOrdersRequest_ListOrdersSort_Direction.UNRECOGNIZED;
  }
}

export function getCustomerOrdersRequest_ListOrdersSort_DirectionToJSON(
  object: GetCustomerOrdersRequest_ListOrdersSort_Direction,
): string {
  switch (object) {
    case GetCustomerOrdersRequest_ListOrdersSort_Direction.DESC:
      return "DESC";
    case GetCustomerOrdersRequest_ListOrdersSort_Direction.ASC:
      return "ASC";
    case GetCustomerOrdersRequest_ListOrdersSort_Direction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Ответ на запрос списка заказов */
export interface CustomerOrdersResponse {
  /** Заказы */
  orders: Order[];
}

function createBaseGetCustomerOrdersRequest(): GetCustomerOrdersRequest {
  return { sessionData: undefined, pagination: undefined, sort: undefined, statuses: [] };
}

export const GetCustomerOrdersRequest = {
  encode(message: GetCustomerOrdersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      GetCustomerOrdersRequest_Pagination.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.sort !== undefined) {
      GetCustomerOrdersRequest_ListOrdersSort.encode(message.sort, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).fork();
    for (const v of message.statuses) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerOrdersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerOrdersRequest();
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

          message.pagination = GetCustomerOrdersRequest_Pagination.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sort = GetCustomerOrdersRequest_ListOrdersSort.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag === 32) {
            message.statuses.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.statuses.push(reader.int32() as any);
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

  fromJSON(object: any): GetCustomerOrdersRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      pagination: isSet(object.pagination)
        ? GetCustomerOrdersRequest_Pagination.fromJSON(object.pagination)
        : undefined,
      sort: isSet(object.sort) ? GetCustomerOrdersRequest_ListOrdersSort.fromJSON(object.sort) : undefined,
      statuses: globalThis.Array.isArray(object?.statuses)
        ? object.statuses.map((e: any) => orderStatusFromJSON(e))
        : [],
    };
  },

  toJSON(message: GetCustomerOrdersRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.pagination !== undefined) {
      obj.pagination = GetCustomerOrdersRequest_Pagination.toJSON(message.pagination);
    }
    if (message.sort !== undefined) {
      obj.sort = GetCustomerOrdersRequest_ListOrdersSort.toJSON(message.sort);
    }
    if (message.statuses?.length) {
      obj.statuses = message.statuses.map((e) => orderStatusToJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerOrdersRequest>, I>>(base?: I): GetCustomerOrdersRequest {
    return GetCustomerOrdersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerOrdersRequest>, I>>(object: I): GetCustomerOrdersRequest {
    const message = createBaseGetCustomerOrdersRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? GetCustomerOrdersRequest_Pagination.fromPartial(object.pagination)
      : undefined;
    message.sort = (object.sort !== undefined && object.sort !== null)
      ? GetCustomerOrdersRequest_ListOrdersSort.fromPartial(object.sort)
      : undefined;
    message.statuses = object.statuses?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetCustomerOrdersRequest_Pagination(): GetCustomerOrdersRequest_Pagination {
  return { limit: "0", offset: "0" };
}

export const GetCustomerOrdersRequest_Pagination = {
  encode(message: GetCustomerOrdersRequest_Pagination, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== "0") {
      writer.uint32(8).int64(message.limit);
    }
    if (message.offset !== "0") {
      writer.uint32(16).int64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerOrdersRequest_Pagination {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerOrdersRequest_Pagination();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.limit = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerOrdersRequest_Pagination {
    return {
      limit: isSet(object.limit) ? globalThis.String(object.limit) : "0",
      offset: isSet(object.offset) ? globalThis.String(object.offset) : "0",
    };
  },

  toJSON(message: GetCustomerOrdersRequest_Pagination): unknown {
    const obj: any = {};
    if (message.limit !== "0") {
      obj.limit = message.limit;
    }
    if (message.offset !== "0") {
      obj.offset = message.offset;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerOrdersRequest_Pagination>, I>>(
    base?: I,
  ): GetCustomerOrdersRequest_Pagination {
    return GetCustomerOrdersRequest_Pagination.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerOrdersRequest_Pagination>, I>>(
    object: I,
  ): GetCustomerOrdersRequest_Pagination {
    const message = createBaseGetCustomerOrdersRequest_Pagination();
    message.limit = object.limit ?? "0";
    message.offset = object.offset ?? "0";
    return message;
  },
};

function createBaseGetCustomerOrdersRequest_ListOrdersSort(): GetCustomerOrdersRequest_ListOrdersSort {
  return { field: 0, direction: 0 };
}

export const GetCustomerOrdersRequest_ListOrdersSort = {
  encode(message: GetCustomerOrdersRequest_ListOrdersSort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== 0) {
      writer.uint32(8).int32(message.field);
    }
    if (message.direction !== 0) {
      writer.uint32(16).int32(message.direction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerOrdersRequest_ListOrdersSort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerOrdersRequest_ListOrdersSort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.direction = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerOrdersRequest_ListOrdersSort {
    return {
      field: isSet(object.field) ? getCustomerOrdersRequest_ListOrdersSort_FieldFromJSON(object.field) : 0,
      direction: isSet(object.direction)
        ? getCustomerOrdersRequest_ListOrdersSort_DirectionFromJSON(object.direction)
        : 0,
    };
  },

  toJSON(message: GetCustomerOrdersRequest_ListOrdersSort): unknown {
    const obj: any = {};
    if (message.field !== 0) {
      obj.field = getCustomerOrdersRequest_ListOrdersSort_FieldToJSON(message.field);
    }
    if (message.direction !== 0) {
      obj.direction = getCustomerOrdersRequest_ListOrdersSort_DirectionToJSON(message.direction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerOrdersRequest_ListOrdersSort>, I>>(
    base?: I,
  ): GetCustomerOrdersRequest_ListOrdersSort {
    return GetCustomerOrdersRequest_ListOrdersSort.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerOrdersRequest_ListOrdersSort>, I>>(
    object: I,
  ): GetCustomerOrdersRequest_ListOrdersSort {
    const message = createBaseGetCustomerOrdersRequest_ListOrdersSort();
    message.field = object.field ?? 0;
    message.direction = object.direction ?? 0;
    return message;
  },
};

function createBaseCustomerOrdersResponse(): CustomerOrdersResponse {
  return { orders: [] };
}

export const CustomerOrdersResponse = {
  encode(message: CustomerOrdersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerOrdersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerOrdersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orders.push(Order.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerOrdersResponse {
    return { orders: globalThis.Array.isArray(object?.orders) ? object.orders.map((e: any) => Order.fromJSON(e)) : [] };
  },

  toJSON(message: CustomerOrdersResponse): unknown {
    const obj: any = {};
    if (message.orders?.length) {
      obj.orders = message.orders.map((e) => Order.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerOrdersResponse>, I>>(base?: I): CustomerOrdersResponse {
    return CustomerOrdersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerOrdersResponse>, I>>(object: I): CustomerOrdersResponse {
    const message = createBaseCustomerOrdersResponse();
    message.orders = object.orders?.map((e) => Order.fromPartial(e)) || [];
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
