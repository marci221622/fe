/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { TransactionStatus, transactionStatusFromJSON, transactionStatusToJSON } from "../enums/payment";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Данные по платежу 3DS */
export interface ThreeDSecureData {
  /** PaReq */
  paReq: string;
  /** Ссылка шлюза */
  acsUrl: string;
  /** Дополнительные идентификатор транзакции */
  transactionExtId: string;
}

/** Данные по транзакции */
export interface TransactionData {
  /** Идентификатор транзакции */
  transactionId: string;
  /** Статус транзакции */
  status: TransactionStatus;
}

/** Состояние платежа */
export interface PaymentState {
  /** Код метода */
  methodCode: number;
  /** Данные по транзакции */
  transactionData?: TransactionData | undefined;
}

function createBaseThreeDSecureData(): ThreeDSecureData {
  return { paReq: "", acsUrl: "", transactionExtId: "" };
}

export const ThreeDSecureData = {
  encode(message: ThreeDSecureData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paReq !== "") {
      writer.uint32(10).string(message.paReq);
    }
    if (message.acsUrl !== "") {
      writer.uint32(18).string(message.acsUrl);
    }
    if (message.transactionExtId !== "") {
      writer.uint32(26).string(message.transactionExtId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThreeDSecureData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThreeDSecureData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.paReq = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.acsUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transactionExtId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ThreeDSecureData {
    return {
      paReq: isSet(object.paReq) ? globalThis.String(object.paReq) : "",
      acsUrl: isSet(object.acsUrl) ? globalThis.String(object.acsUrl) : "",
      transactionExtId: isSet(object.transactionExtId) ? globalThis.String(object.transactionExtId) : "",
    };
  },

  toJSON(message: ThreeDSecureData): unknown {
    const obj: any = {};
    if (message.paReq !== "") {
      obj.paReq = message.paReq;
    }
    if (message.acsUrl !== "") {
      obj.acsUrl = message.acsUrl;
    }
    if (message.transactionExtId !== "") {
      obj.transactionExtId = message.transactionExtId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ThreeDSecureData>, I>>(base?: I): ThreeDSecureData {
    return ThreeDSecureData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ThreeDSecureData>, I>>(object: I): ThreeDSecureData {
    const message = createBaseThreeDSecureData();
    message.paReq = object.paReq ?? "";
    message.acsUrl = object.acsUrl ?? "";
    message.transactionExtId = object.transactionExtId ?? "";
    return message;
  },
};

function createBaseTransactionData(): TransactionData {
  return { transactionId: "", status: 0 };
}

export const TransactionData = {
  encode(message: TransactionData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.transactionId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): TransactionData {
    return {
      transactionId: isSet(object.transactionId) ? globalThis.String(object.transactionId) : "",
      status: isSet(object.status) ? transactionStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: TransactionData): unknown {
    const obj: any = {};
    if (message.transactionId !== "") {
      obj.transactionId = message.transactionId;
    }
    if (message.status !== 0) {
      obj.status = transactionStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionData>, I>>(base?: I): TransactionData {
    return TransactionData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TransactionData>, I>>(object: I): TransactionData {
    const message = createBaseTransactionData();
    message.transactionId = object.transactionId ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBasePaymentState(): PaymentState {
  return { methodCode: 0, transactionData: undefined };
}

export const PaymentState = {
  encode(message: PaymentState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.methodCode !== 0) {
      writer.uint32(8).int32(message.methodCode);
    }
    if (message.transactionData !== undefined) {
      TransactionData.encode(message.transactionData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.methodCode = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.transactionData = TransactionData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PaymentState {
    return {
      methodCode: isSet(object.methodCode) ? globalThis.Number(object.methodCode) : 0,
      transactionData: isSet(object.transactionData) ? TransactionData.fromJSON(object.transactionData) : undefined,
    };
  },

  toJSON(message: PaymentState): unknown {
    const obj: any = {};
    if (message.methodCode !== 0) {
      obj.methodCode = Math.round(message.methodCode);
    }
    if (message.transactionData !== undefined) {
      obj.transactionData = TransactionData.toJSON(message.transactionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PaymentState>, I>>(base?: I): PaymentState {
    return PaymentState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PaymentState>, I>>(object: I): PaymentState {
    const message = createBasePaymentState();
    message.methodCode = object.methodCode ?? 0;
    message.transactionData = (object.transactionData !== undefined && object.transactionData !== null)
      ? TransactionData.fromPartial(object.transactionData)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
