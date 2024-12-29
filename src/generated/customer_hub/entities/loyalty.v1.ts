/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import {
  ActionMechanicsType,
  actionMechanicsTypeFromJSON,
  actionMechanicsTypeToJSON,
} from "../enums/action_mechanics_type.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описание промо-акций */
export interface Loyalty {
  regulationUrls: string[];
  stickyBanners: string[];
  shortDescriptions: string[];
  fullDescriptions: string[];
  actionMechanics: ActionMechanics | undefined;
  period: Period | undefined;
}

/** Описание механики промо-акции */
export interface ActionMechanics {
  /** Тип механики */
  type: ActionMechanicsType;
  /** Промо-код, купон на скидку и пр. при наличии */
  value?: string | undefined;
}

/** Период действия акции */
export interface Period {
  /** Дата начала */
  start:
    | Date
    | undefined;
  /** Дата окончания */
  end?: Date | undefined;
}

function createBaseLoyalty(): Loyalty {
  return {
    regulationUrls: [],
    stickyBanners: [],
    shortDescriptions: [],
    fullDescriptions: [],
    actionMechanics: undefined,
    period: undefined,
  };
}

export const Loyalty = {
  encode(message: Loyalty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.regulationUrls) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.stickyBanners) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.shortDescriptions) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.fullDescriptions) {
      writer.uint32(34).string(v!);
    }
    if (message.actionMechanics !== undefined) {
      ActionMechanics.encode(message.actionMechanics, writer.uint32(42).fork()).ldelim();
    }
    if (message.period !== undefined) {
      Period.encode(message.period, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Loyalty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoyalty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.regulationUrls.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stickyBanners.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.shortDescriptions.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fullDescriptions.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.actionMechanics = ActionMechanics.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.period = Period.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Loyalty {
    return {
      regulationUrls: globalThis.Array.isArray(object?.regulationUrls)
        ? object.regulationUrls.map((e: any) => globalThis.String(e))
        : [],
      stickyBanners: globalThis.Array.isArray(object?.stickyBanners)
        ? object.stickyBanners.map((e: any) => globalThis.String(e))
        : [],
      shortDescriptions: globalThis.Array.isArray(object?.shortDescriptions)
        ? object.shortDescriptions.map((e: any) => globalThis.String(e))
        : [],
      fullDescriptions: globalThis.Array.isArray(object?.fullDescriptions)
        ? object.fullDescriptions.map((e: any) => globalThis.String(e))
        : [],
      actionMechanics: isSet(object.actionMechanics) ? ActionMechanics.fromJSON(object.actionMechanics) : undefined,
      period: isSet(object.period) ? Period.fromJSON(object.period) : undefined,
    };
  },

  toJSON(message: Loyalty): unknown {
    const obj: any = {};
    if (message.regulationUrls?.length) {
      obj.regulationUrls = message.regulationUrls;
    }
    if (message.stickyBanners?.length) {
      obj.stickyBanners = message.stickyBanners;
    }
    if (message.shortDescriptions?.length) {
      obj.shortDescriptions = message.shortDescriptions;
    }
    if (message.fullDescriptions?.length) {
      obj.fullDescriptions = message.fullDescriptions;
    }
    if (message.actionMechanics !== undefined) {
      obj.actionMechanics = ActionMechanics.toJSON(message.actionMechanics);
    }
    if (message.period !== undefined) {
      obj.period = Period.toJSON(message.period);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Loyalty>, I>>(base?: I): Loyalty {
    return Loyalty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Loyalty>, I>>(object: I): Loyalty {
    const message = createBaseLoyalty();
    message.regulationUrls = object.regulationUrls?.map((e) => e) || [];
    message.stickyBanners = object.stickyBanners?.map((e) => e) || [];
    message.shortDescriptions = object.shortDescriptions?.map((e) => e) || [];
    message.fullDescriptions = object.fullDescriptions?.map((e) => e) || [];
    message.actionMechanics = (object.actionMechanics !== undefined && object.actionMechanics !== null)
      ? ActionMechanics.fromPartial(object.actionMechanics)
      : undefined;
    message.period = (object.period !== undefined && object.period !== null)
      ? Period.fromPartial(object.period)
      : undefined;
    return message;
  },
};

function createBaseActionMechanics(): ActionMechanics {
  return { type: 0, value: undefined };
}

export const ActionMechanics = {
  encode(message: ActionMechanics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== undefined) {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActionMechanics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionMechanics();
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

  fromJSON(object: any): ActionMechanics {
    return {
      type: isSet(object.type) ? actionMechanicsTypeFromJSON(object.type) : 0,
      value: isSet(object.value) ? globalThis.String(object.value) : undefined,
    };
  },

  toJSON(message: ActionMechanics): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = actionMechanicsTypeToJSON(message.type);
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActionMechanics>, I>>(base?: I): ActionMechanics {
    return ActionMechanics.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActionMechanics>, I>>(object: I): ActionMechanics {
    const message = createBaseActionMechanics();
    message.type = object.type ?? 0;
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBasePeriod(): Period {
  return { start: undefined, end: undefined };
}

export const Period = {
  encode(message: Period, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== undefined) {
      Timestamp.encode(toTimestamp(message.start), writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== undefined) {
      Timestamp.encode(toTimestamp(message.end), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Period {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriod();
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

  fromJSON(object: any): Period {
    return {
      start: isSet(object.start) ? fromJsonTimestamp(object.start) : undefined,
      end: isSet(object.end) ? fromJsonTimestamp(object.end) : undefined,
    };
  },

  toJSON(message: Period): unknown {
    const obj: any = {};
    if (message.start !== undefined) {
      obj.start = message.start.toISOString();
    }
    if (message.end !== undefined) {
      obj.end = message.end.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Period>, I>>(base?: I): Period {
    return Period.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Period>, I>>(object: I): Period {
    const message = createBasePeriod();
    message.start = object.start ?? undefined;
    message.end = object.end ?? undefined;
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
