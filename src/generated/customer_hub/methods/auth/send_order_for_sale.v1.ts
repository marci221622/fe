/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на продажу товара */
export interface OrderForSaleRequest {
  placeholderToValue: OrderForSaleRequest_PlaceholderToValue[];
  /** Контекст текущей сессии */
  sessionData: SessionData | undefined;
}

/** Кто размещает запрос */
export interface OrderForSaleRequest_PlaceholderToValue {
  key: string;
  value: string;
}

/** Ответ на запрос продажи товара */
export interface OrderForSaleResponse {
  /** Идентификатор заявки */
  uuid: string;
}

function createBaseOrderForSaleRequest(): OrderForSaleRequest {
  return { placeholderToValue: [], sessionData: undefined };
}

export const OrderForSaleRequest = {
  encode(message: OrderForSaleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.placeholderToValue) {
      OrderForSaleRequest_PlaceholderToValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderForSaleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderForSaleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.placeholderToValue.push(OrderForSaleRequest_PlaceholderToValue.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): OrderForSaleRequest {
    return {
      placeholderToValue: globalThis.Array.isArray(object?.placeholderToValue)
        ? object.placeholderToValue.map((e: any) => OrderForSaleRequest_PlaceholderToValue.fromJSON(e))
        : [],
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: OrderForSaleRequest): unknown {
    const obj: any = {};
    if (message.placeholderToValue?.length) {
      obj.placeholderToValue = message.placeholderToValue.map((e) => OrderForSaleRequest_PlaceholderToValue.toJSON(e));
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrderForSaleRequest>, I>>(base?: I): OrderForSaleRequest {
    return OrderForSaleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrderForSaleRequest>, I>>(object: I): OrderForSaleRequest {
    const message = createBaseOrderForSaleRequest();
    message.placeholderToValue =
      object.placeholderToValue?.map((e) => OrderForSaleRequest_PlaceholderToValue.fromPartial(e)) || [];
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseOrderForSaleRequest_PlaceholderToValue(): OrderForSaleRequest_PlaceholderToValue {
  return { key: "", value: "" };
}

export const OrderForSaleRequest_PlaceholderToValue = {
  encode(message: OrderForSaleRequest_PlaceholderToValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderForSaleRequest_PlaceholderToValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderForSaleRequest_PlaceholderToValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
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

  fromJSON(object: any): OrderForSaleRequest_PlaceholderToValue {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: OrderForSaleRequest_PlaceholderToValue): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrderForSaleRequest_PlaceholderToValue>, I>>(
    base?: I,
  ): OrderForSaleRequest_PlaceholderToValue {
    return OrderForSaleRequest_PlaceholderToValue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrderForSaleRequest_PlaceholderToValue>, I>>(
    object: I,
  ): OrderForSaleRequest_PlaceholderToValue {
    const message = createBaseOrderForSaleRequest_PlaceholderToValue();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseOrderForSaleResponse(): OrderForSaleResponse {
  return { uuid: "" };
}

export const OrderForSaleResponse = {
  encode(message: OrderForSaleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderForSaleResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderForSaleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uuid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OrderForSaleResponse {
    return { uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "" };
  },

  toJSON(message: OrderForSaleResponse): unknown {
    const obj: any = {};
    if (message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OrderForSaleResponse>, I>>(base?: I): OrderForSaleResponse {
    return OrderForSaleResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OrderForSaleResponse>, I>>(object: I): OrderForSaleResponse {
    const message = createBaseOrderForSaleResponse();
    message.uuid = object.uuid ?? "";
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
