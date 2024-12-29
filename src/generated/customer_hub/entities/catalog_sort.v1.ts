/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Sort, sortFromJSON, sortToJSON } from "../enums/sort";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Сортировка каталога */
export interface CatalogSort {
  /** Тип сортировки */
  code: Sort;
  /** Заголовок */
  title: string;
  /** Выбран или нет */
  selected: boolean;
}

function createBaseCatalogSort(): CatalogSort {
  return { code: 0, title: "", selected: false };
}

export const CatalogSort = {
  encode(message: CatalogSort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.selected === true) {
      writer.uint32(24).bool(message.selected);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CatalogSort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCatalogSort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.selected = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CatalogSort {
    return {
      code: isSet(object.code) ? sortFromJSON(object.code) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
    };
  },

  toJSON(message: CatalogSort): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = sortToJSON(message.code);
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.selected === true) {
      obj.selected = message.selected;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CatalogSort>, I>>(base?: I): CatalogSort {
    return CatalogSort.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CatalogSort>, I>>(object: I): CatalogSort {
    const message = createBaseCatalogSort();
    message.code = object.code ?? 0;
    message.title = object.title ?? "";
    message.selected = object.selected ?? false;
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
