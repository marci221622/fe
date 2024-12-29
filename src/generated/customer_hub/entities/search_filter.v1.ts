/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SearchFilterType, searchFilterTypeFromJSON, searchFilterTypeToJSON } from "../enums/search_filter_type";
import { Range } from "./range.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

export interface SearchFilter {
  /** Код поискового фильтра. Пример: FILTER_ATTRIBUTE_CODE_41: filter-12 */
  code: string;
  /** Значения поискового фильтра. Пример: [val15, val26] */
  values: string[];
  /** Тип фильтра */
  type: SearchFilterType;
  /** Значение поискового фильтра для RANGE фильтра */
  rangeValue?: Range | undefined;
}

function createBaseSearchFilter(): SearchFilter {
  return { code: "", values: [], type: 0, rangeValue: undefined };
}

export const SearchFilter = {
  encode(message: SearchFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    for (const v of message.values) {
      writer.uint32(18).string(v!);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.rangeValue !== undefined) {
      Range.encode(message.rangeValue, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchFilter();
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

          message.values.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rangeValue = Range.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchFilter {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      values: globalThis.Array.isArray(object?.values) ? object.values.map((e: any) => globalThis.String(e)) : [],
      type: isSet(object.type) ? searchFilterTypeFromJSON(object.type) : 0,
      rangeValue: isSet(object.rangeValue) ? Range.fromJSON(object.rangeValue) : undefined,
    };
  },

  toJSON(message: SearchFilter): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.values?.length) {
      obj.values = message.values;
    }
    if (message.type !== 0) {
      obj.type = searchFilterTypeToJSON(message.type);
    }
    if (message.rangeValue !== undefined) {
      obj.rangeValue = Range.toJSON(message.rangeValue);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchFilter>, I>>(base?: I): SearchFilter {
    return SearchFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchFilter>, I>>(object: I): SearchFilter {
    const message = createBaseSearchFilter();
    message.code = object.code ?? "";
    message.values = object.values?.map((e) => e) || [];
    message.type = object.type ?? 0;
    message.rangeValue = (object.rangeValue !== undefined && object.rangeValue !== null)
      ? Range.fromPartial(object.rangeValue)
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
