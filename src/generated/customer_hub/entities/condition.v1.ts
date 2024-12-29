/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Состояние товара */
export interface Condition {
  /** Состояние */
  state: Condition_State;
  /** Описание */
  description: string;
  /** Ссылка */
  link: string;
}

export enum Condition_State {
  /** ITEM_CONDITION_GRADE_UNSPECIFIED - Неизвестное */
  ITEM_CONDITION_GRADE_UNSPECIFIED = 0,
  /** ITEM_CONDITION_GRADE_NEW_WITH_TAG - Новое, с биркой */
  ITEM_CONDITION_GRADE_NEW_WITH_TAG = 1,
  /** ITEM_CONDITION_GRADE_NEW - Новое */
  ITEM_CONDITION_GRADE_NEW = 2,
  /** ITEM_CONDITION_GRADE_EXCELLENT - Отличное */
  ITEM_CONDITION_GRADE_EXCELLENT = 3,
  /** ITEM_CONDITION_GRADE_GOOD - Хорошее */
  ITEM_CONDITION_GRADE_GOOD = 4,
  UNRECOGNIZED = -1,
}

export function condition_StateFromJSON(object: any): Condition_State {
  switch (object) {
    case 0:
    case "ITEM_CONDITION_GRADE_UNSPECIFIED":
      return Condition_State.ITEM_CONDITION_GRADE_UNSPECIFIED;
    case 1:
    case "ITEM_CONDITION_GRADE_NEW_WITH_TAG":
      return Condition_State.ITEM_CONDITION_GRADE_NEW_WITH_TAG;
    case 2:
    case "ITEM_CONDITION_GRADE_NEW":
      return Condition_State.ITEM_CONDITION_GRADE_NEW;
    case 3:
    case "ITEM_CONDITION_GRADE_EXCELLENT":
      return Condition_State.ITEM_CONDITION_GRADE_EXCELLENT;
    case 4:
    case "ITEM_CONDITION_GRADE_GOOD":
      return Condition_State.ITEM_CONDITION_GRADE_GOOD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Condition_State.UNRECOGNIZED;
  }
}

export function condition_StateToJSON(object: Condition_State): string {
  switch (object) {
    case Condition_State.ITEM_CONDITION_GRADE_UNSPECIFIED:
      return "ITEM_CONDITION_GRADE_UNSPECIFIED";
    case Condition_State.ITEM_CONDITION_GRADE_NEW_WITH_TAG:
      return "ITEM_CONDITION_GRADE_NEW_WITH_TAG";
    case Condition_State.ITEM_CONDITION_GRADE_NEW:
      return "ITEM_CONDITION_GRADE_NEW";
    case Condition_State.ITEM_CONDITION_GRADE_EXCELLENT:
      return "ITEM_CONDITION_GRADE_EXCELLENT";
    case Condition_State.ITEM_CONDITION_GRADE_GOOD:
      return "ITEM_CONDITION_GRADE_GOOD";
    case Condition_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseCondition(): Condition {
  return { state: 0, description: "", link: "" };
}

export const Condition = {
  encode(message: Condition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.link !== "") {
      writer.uint32(26).string(message.link);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Condition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.link = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Condition {
    return {
      state: isSet(object.state) ? condition_StateFromJSON(object.state) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      link: isSet(object.link) ? globalThis.String(object.link) : "",
    };
  },

  toJSON(message: Condition): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = condition_StateToJSON(message.state);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.link !== "") {
      obj.link = message.link;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Condition>, I>>(base?: I): Condition {
    return Condition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Condition>, I>>(object: I): Condition {
    const message = createBaseCondition();
    message.state = object.state ?? 0;
    message.description = object.description ?? "";
    message.link = object.link ?? "";
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
