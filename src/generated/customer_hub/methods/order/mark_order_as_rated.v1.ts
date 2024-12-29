/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Запрос на пометку заказа как оцененного */
export interface MarkOrderAsRatedRequest {
  /** Код заказа */
  code: string;
  ratedAt?: Date | undefined;
}

/** Ответ на пометку заказа как оцененного */
export interface MarkOrderAsRatedResponse {
}

function createBaseMarkOrderAsRatedRequest(): MarkOrderAsRatedRequest {
  return { code: "", ratedAt: undefined };
}

export const MarkOrderAsRatedRequest = {
  encode(message: MarkOrderAsRatedRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.ratedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.ratedAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarkOrderAsRatedRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarkOrderAsRatedRequest();
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

          message.ratedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MarkOrderAsRatedRequest {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      ratedAt: isSet(object.ratedAt) ? fromJsonTimestamp(object.ratedAt) : undefined,
    };
  },

  toJSON(message: MarkOrderAsRatedRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.ratedAt !== undefined) {
      obj.ratedAt = message.ratedAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MarkOrderAsRatedRequest>, I>>(base?: I): MarkOrderAsRatedRequest {
    return MarkOrderAsRatedRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MarkOrderAsRatedRequest>, I>>(object: I): MarkOrderAsRatedRequest {
    const message = createBaseMarkOrderAsRatedRequest();
    message.code = object.code ?? "";
    message.ratedAt = object.ratedAt ?? undefined;
    return message;
  },
};

function createBaseMarkOrderAsRatedResponse(): MarkOrderAsRatedResponse {
  return {};
}

export const MarkOrderAsRatedResponse = {
  encode(_: MarkOrderAsRatedResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarkOrderAsRatedResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarkOrderAsRatedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MarkOrderAsRatedResponse {
    return {};
  },

  toJSON(_: MarkOrderAsRatedResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MarkOrderAsRatedResponse>, I>>(base?: I): MarkOrderAsRatedResponse {
    return MarkOrderAsRatedResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MarkOrderAsRatedResponse>, I>>(_: I): MarkOrderAsRatedResponse {
    const message = createBaseMarkOrderAsRatedResponse();
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
