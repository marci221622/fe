/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { KeyValue } from "./key_value.v1";
import { Range } from "./range.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Фильтр каталога */
export interface CatalogFilter {
  /** Код */
  code: string;
  /** Значения фильтра */
  values: CatalogFilter_Value[];
  type: CatalogFilter_Type;
  /** Приоритет, для того чтобы правильно фильтры расположить */
  priority: number;
  /** Название фильтра */
  title: string;
}

/** Тип фильтра по критериям */
export enum CatalogFilter_Type {
  COLOR = 0,
  PRICE = 1,
  BRAND = 2,
  LABEL = 3,
  SIZE = 4,
  CONDITION_GRADE = 5,
  ATTRIBUTE = 6,
  /**
   * SWITCHABLE - тип фильтра вкл/выкл
   * если фильтр типа switchable, то в values возвращать один элемент, где label и code повторяют код и тайтл фильтра
   * bool selected если фильтр был выбран в запросе и возвращается items_count
   */
  SWITCHABLE = 7,
  CATEGORY = 8,
  RANGE = 9,
  UNRECOGNIZED = -1,
}

export function catalogFilter_TypeFromJSON(object: any): CatalogFilter_Type {
  switch (object) {
    case 0:
    case "COLOR":
      return CatalogFilter_Type.COLOR;
    case 1:
    case "PRICE":
      return CatalogFilter_Type.PRICE;
    case 2:
    case "BRAND":
      return CatalogFilter_Type.BRAND;
    case 3:
    case "LABEL":
      return CatalogFilter_Type.LABEL;
    case 4:
    case "SIZE":
      return CatalogFilter_Type.SIZE;
    case 5:
    case "CONDITION_GRADE":
      return CatalogFilter_Type.CONDITION_GRADE;
    case 6:
    case "ATTRIBUTE":
      return CatalogFilter_Type.ATTRIBUTE;
    case 7:
    case "SWITCHABLE":
      return CatalogFilter_Type.SWITCHABLE;
    case 8:
    case "CATEGORY":
      return CatalogFilter_Type.CATEGORY;
    case 9:
    case "RANGE":
      return CatalogFilter_Type.RANGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CatalogFilter_Type.UNRECOGNIZED;
  }
}

export function catalogFilter_TypeToJSON(object: CatalogFilter_Type): string {
  switch (object) {
    case CatalogFilter_Type.COLOR:
      return "COLOR";
    case CatalogFilter_Type.PRICE:
      return "PRICE";
    case CatalogFilter_Type.BRAND:
      return "BRAND";
    case CatalogFilter_Type.LABEL:
      return "LABEL";
    case CatalogFilter_Type.SIZE:
      return "SIZE";
    case CatalogFilter_Type.CONDITION_GRADE:
      return "CONDITION_GRADE";
    case CatalogFilter_Type.ATTRIBUTE:
      return "ATTRIBUTE";
    case CatalogFilter_Type.SWITCHABLE:
      return "SWITCHABLE";
    case CatalogFilter_Type.CATEGORY:
      return "CATEGORY";
    case CatalogFilter_Type.RANGE:
      return "RANGE";
    case CatalogFilter_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Описание значений фильтра */
export interface CatalogFilter_Value {
  /** Код */
  code: string;
  /** Метка */
  label: string;
  /** Ключ-значение параметров */
  properties: KeyValue[];
  /** Выбран или нет */
  selected: boolean;
  /** Изображение */
  image?:
    | Image
    | undefined;
  /** Приоритет */
  priority: number;
  /** Количество айтемов, удовлетворяющих значению фильтра */
  itemsCount: string;
  /** Дочерние значения фильтра (для иерархических фильтров) */
  children: CatalogFilter_Value[];
  /** Исходный диапазон значений */
  range?:
    | Range
    | undefined;
  /** Заданый пользователем диапазон значений */
  selectedRange?: Range | undefined;
}

function createBaseCatalogFilter(): CatalogFilter {
  return { code: "", values: [], type: 0, priority: 0, title: "" };
}

export const CatalogFilter = {
  encode(message: CatalogFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    for (const v of message.values) {
      CatalogFilter_Value.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.priority !== 0) {
      writer.uint32(32).int32(message.priority);
    }
    if (message.title !== "") {
      writer.uint32(42).string(message.title);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CatalogFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCatalogFilter();
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

          message.values.push(CatalogFilter_Value.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.priority = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.title = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CatalogFilter {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => CatalogFilter_Value.fromJSON(e))
        : [],
      type: isSet(object.type) ? catalogFilter_TypeFromJSON(object.type) : 0,
      priority: isSet(object.priority) ? globalThis.Number(object.priority) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
    };
  },

  toJSON(message: CatalogFilter): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.values?.length) {
      obj.values = message.values.map((e) => CatalogFilter_Value.toJSON(e));
    }
    if (message.type !== 0) {
      obj.type = catalogFilter_TypeToJSON(message.type);
    }
    if (message.priority !== 0) {
      obj.priority = Math.round(message.priority);
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CatalogFilter>, I>>(base?: I): CatalogFilter {
    return CatalogFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CatalogFilter>, I>>(object: I): CatalogFilter {
    const message = createBaseCatalogFilter();
    message.code = object.code ?? "";
    message.values = object.values?.map((e) => CatalogFilter_Value.fromPartial(e)) || [];
    message.type = object.type ?? 0;
    message.priority = object.priority ?? 0;
    message.title = object.title ?? "";
    return message;
  },
};

function createBaseCatalogFilter_Value(): CatalogFilter_Value {
  return {
    code: "",
    label: "",
    properties: [],
    selected: false,
    image: undefined,
    priority: 0,
    itemsCount: "0",
    children: [],
    range: undefined,
    selectedRange: undefined,
  };
}

export const CatalogFilter_Value = {
  encode(message: CatalogFilter_Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    for (const v of message.properties) {
      KeyValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.selected === true) {
      writer.uint32(32).bool(message.selected);
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(42).fork()).ldelim();
    }
    if (message.priority !== 0) {
      writer.uint32(48).int32(message.priority);
    }
    if (message.itemsCount !== "0") {
      writer.uint32(56).int64(message.itemsCount);
    }
    for (const v of message.children) {
      CatalogFilter_Value.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.range !== undefined) {
      Range.encode(message.range, writer.uint32(74).fork()).ldelim();
    }
    if (message.selectedRange !== undefined) {
      Range.encode(message.selectedRange, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CatalogFilter_Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCatalogFilter_Value();
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

          message.label = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.properties.push(KeyValue.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.selected = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.priority = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.itemsCount = longToString(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.children.push(CatalogFilter_Value.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.range = Range.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.selectedRange = Range.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CatalogFilter_Value {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => KeyValue.fromJSON(e))
        : [],
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      priority: isSet(object.priority) ? globalThis.Number(object.priority) : 0,
      itemsCount: isSet(object.itemsCount) ? globalThis.String(object.itemsCount) : "0",
      children: globalThis.Array.isArray(object?.children)
        ? object.children.map((e: any) => CatalogFilter_Value.fromJSON(e))
        : [],
      range: isSet(object.range) ? Range.fromJSON(object.range) : undefined,
      selectedRange: isSet(object.selectedRange) ? Range.fromJSON(object.selectedRange) : undefined,
    };
  },

  toJSON(message: CatalogFilter_Value): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => KeyValue.toJSON(e));
    }
    if (message.selected === true) {
      obj.selected = message.selected;
    }
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.priority !== 0) {
      obj.priority = Math.round(message.priority);
    }
    if (message.itemsCount !== "0") {
      obj.itemsCount = message.itemsCount;
    }
    if (message.children?.length) {
      obj.children = message.children.map((e) => CatalogFilter_Value.toJSON(e));
    }
    if (message.range !== undefined) {
      obj.range = Range.toJSON(message.range);
    }
    if (message.selectedRange !== undefined) {
      obj.selectedRange = Range.toJSON(message.selectedRange);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CatalogFilter_Value>, I>>(base?: I): CatalogFilter_Value {
    return CatalogFilter_Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CatalogFilter_Value>, I>>(object: I): CatalogFilter_Value {
    const message = createBaseCatalogFilter_Value();
    message.code = object.code ?? "";
    message.label = object.label ?? "";
    message.properties = object.properties?.map((e) => KeyValue.fromPartial(e)) || [];
    message.selected = object.selected ?? false;
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.priority = object.priority ?? 0;
    message.itemsCount = object.itemsCount ?? "0";
    message.children = object.children?.map((e) => CatalogFilter_Value.fromPartial(e)) || [];
    message.range = (object.range !== undefined && object.range !== null) ? Range.fromPartial(object.range) : undefined;
    message.selectedRange = (object.selectedRange !== undefined && object.selectedRange !== null)
      ? Range.fromPartial(object.selectedRange)
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
