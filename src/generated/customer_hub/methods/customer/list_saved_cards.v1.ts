/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { SessionData } from "../../entities/session_data.v1";
import { PaymentMethodCode, paymentMethodCodeFromJSON, paymentMethodCodeToJSON } from "../../enums/payment";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на список сохраненных карт */
export interface ListSavedCardsRequest {
  /** Контекст текущей сессии */
  sessionData:
    | SessionData
    | undefined;
  /** Код платежного метода */
  paymentMethodCode: PaymentMethodCode;
}

/** Список сохраненных карт */
export interface ListSavedCardsResponse {
  savedCards: ListSavedCardsResponse_SavedCardData[];
}

/** Сохраненные карты */
export interface ListSavedCardsResponse_SavedCardData {
  id: string;
  pan: string;
  paymentSystemType: string;
}

function createBaseListSavedCardsRequest(): ListSavedCardsRequest {
  return { sessionData: undefined, paymentMethodCode: 0 };
}

export const ListSavedCardsRequest = {
  encode(message: ListSavedCardsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(10).fork()).ldelim();
    }
    if (message.paymentMethodCode !== 0) {
      writer.uint32(16).int32(message.paymentMethodCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSavedCardsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSavedCardsRequest();
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
          if (tag !== 16) {
            break;
          }

          message.paymentMethodCode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSavedCardsRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      paymentMethodCode: isSet(object.paymentMethodCode) ? paymentMethodCodeFromJSON(object.paymentMethodCode) : 0,
    };
  },

  toJSON(message: ListSavedCardsRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.paymentMethodCode !== 0) {
      obj.paymentMethodCode = paymentMethodCodeToJSON(message.paymentMethodCode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSavedCardsRequest>, I>>(base?: I): ListSavedCardsRequest {
    return ListSavedCardsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSavedCardsRequest>, I>>(object: I): ListSavedCardsRequest {
    const message = createBaseListSavedCardsRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.paymentMethodCode = object.paymentMethodCode ?? 0;
    return message;
  },
};

function createBaseListSavedCardsResponse(): ListSavedCardsResponse {
  return { savedCards: [] };
}

export const ListSavedCardsResponse = {
  encode(message: ListSavedCardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.savedCards) {
      ListSavedCardsResponse_SavedCardData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSavedCardsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSavedCardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.savedCards.push(ListSavedCardsResponse_SavedCardData.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSavedCardsResponse {
    return {
      savedCards: globalThis.Array.isArray(object?.savedCards)
        ? object.savedCards.map((e: any) => ListSavedCardsResponse_SavedCardData.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListSavedCardsResponse): unknown {
    const obj: any = {};
    if (message.savedCards?.length) {
      obj.savedCards = message.savedCards.map((e) => ListSavedCardsResponse_SavedCardData.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSavedCardsResponse>, I>>(base?: I): ListSavedCardsResponse {
    return ListSavedCardsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSavedCardsResponse>, I>>(object: I): ListSavedCardsResponse {
    const message = createBaseListSavedCardsResponse();
    message.savedCards = object.savedCards?.map((e) => ListSavedCardsResponse_SavedCardData.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListSavedCardsResponse_SavedCardData(): ListSavedCardsResponse_SavedCardData {
  return { id: "0", pan: "", paymentSystemType: "" };
}

export const ListSavedCardsResponse_SavedCardData = {
  encode(message: ListSavedCardsResponse_SavedCardData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.pan !== "") {
      writer.uint32(18).string(message.pan);
    }
    if (message.paymentSystemType !== "") {
      writer.uint32(26).string(message.paymentSystemType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSavedCardsResponse_SavedCardData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSavedCardsResponse_SavedCardData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pan = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.paymentSystemType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListSavedCardsResponse_SavedCardData {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      pan: isSet(object.pan) ? globalThis.String(object.pan) : "",
      paymentSystemType: isSet(object.paymentSystemType) ? globalThis.String(object.paymentSystemType) : "",
    };
  },

  toJSON(message: ListSavedCardsResponse_SavedCardData): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.pan !== "") {
      obj.pan = message.pan;
    }
    if (message.paymentSystemType !== "") {
      obj.paymentSystemType = message.paymentSystemType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListSavedCardsResponse_SavedCardData>, I>>(
    base?: I,
  ): ListSavedCardsResponse_SavedCardData {
    return ListSavedCardsResponse_SavedCardData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListSavedCardsResponse_SavedCardData>, I>>(
    object: I,
  ): ListSavedCardsResponse_SavedCardData {
    const message = createBaseListSavedCardsResponse_SavedCardData();
    message.id = object.id ?? "0";
    message.pan = object.pan ?? "";
    message.paymentSystemType = object.paymentSystemType ?? "";
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
