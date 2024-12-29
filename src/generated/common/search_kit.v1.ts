/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "utp.common.search_kit.v1";

export enum SortDirection {
  SORT_DIRECTION_UNSPECIFIED = 0,
  SORT_DIRECTION_ASC = 1,
  SORT_DIRECTION_DESC = 2,
  UNRECOGNIZED = -1,
}

export function sortDirectionFromJSON(object: any): SortDirection {
  switch (object) {
    case 0:
    case "SORT_DIRECTION_UNSPECIFIED":
      return SortDirection.SORT_DIRECTION_UNSPECIFIED;
    case 1:
    case "SORT_DIRECTION_ASC":
      return SortDirection.SORT_DIRECTION_ASC;
    case 2:
    case "SORT_DIRECTION_DESC":
      return SortDirection.SORT_DIRECTION_DESC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SortDirection.UNRECOGNIZED;
  }
}

export function sortDirectionToJSON(object: SortDirection): string {
  switch (object) {
    case SortDirection.SORT_DIRECTION_UNSPECIFIED:
      return "SORT_DIRECTION_UNSPECIFIED";
    case SortDirection.SORT_DIRECTION_ASC:
      return "SORT_DIRECTION_ASC";
    case SortDirection.SORT_DIRECTION_DESC:
      return "SORT_DIRECTION_DESC";
    case SortDirection.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * --------------------------------------------------------------------------------
 * Типы доступных фильтров
 * --------------------------------------------------------------------------------
 */
export enum FilterType {
  FILTER_TYPE_UNSPECIFIED = 0,
  /** FILTER_TYPE_TEXT_START - widget: input text */
  FILTER_TYPE_TEXT_START = 1,
  /** FILTER_TYPE_TEXT_CONTAINS - widget: input text */
  FILTER_TYPE_TEXT_CONTAINS = 2,
  /** FILTER_TYPE_TEXT_END - widget: input text */
  FILTER_TYPE_TEXT_END = 3,
  /** FILTER_TYPE_TEXT_EQUAL - widget: input text */
  FILTER_TYPE_TEXT_EQUAL = 4,
  /** FILTER_TYPE_TEXT_IN - widget: input text */
  FILTER_TYPE_TEXT_IN = 5,
  /** FILTER_TYPE_DATETIME_BETWEEN - widget: input datetimepicker + input datetimepicker */
  FILTER_TYPE_DATETIME_BETWEEN = 6,
  /** FILTER_TYPE_NUMERIC_BETWEEN - widget: input number + input number */
  FILTER_TYPE_NUMERIC_BETWEEN = 7,
  /** FILTER_TYPE_NUMERIC_IN - widget: input text (числа, разделенные запятой) */
  FILTER_TYPE_NUMERIC_IN = 8,
  /** FILTER_TYPE_NUMERIC_NOT_IN - widget: input text (числа, разделенные запятой) */
  FILTER_TYPE_NUMERIC_NOT_IN = 9,
  /** FILTER_TYPE_BOOLEAN - widget: group radio (все - null / да - true  / нет - false) */
  FILTER_TYPE_BOOLEAN = 10,
  /** FILTER_TYPE_NOT_EMPTY - widget: group radio (все - null / да - true  / нет - false) */
  FILTER_TYPE_NOT_EMPTY = 11,
  /** FILTER_TYPE_TEXT_NOT_IN - widget: input text */
  FILTER_TYPE_TEXT_NOT_IN = 12,
  UNRECOGNIZED = -1,
}

export function filterTypeFromJSON(object: any): FilterType {
  switch (object) {
    case 0:
    case "FILTER_TYPE_UNSPECIFIED":
      return FilterType.FILTER_TYPE_UNSPECIFIED;
    case 1:
    case "FILTER_TYPE_TEXT_START":
      return FilterType.FILTER_TYPE_TEXT_START;
    case 2:
    case "FILTER_TYPE_TEXT_CONTAINS":
      return FilterType.FILTER_TYPE_TEXT_CONTAINS;
    case 3:
    case "FILTER_TYPE_TEXT_END":
      return FilterType.FILTER_TYPE_TEXT_END;
    case 4:
    case "FILTER_TYPE_TEXT_EQUAL":
      return FilterType.FILTER_TYPE_TEXT_EQUAL;
    case 5:
    case "FILTER_TYPE_TEXT_IN":
      return FilterType.FILTER_TYPE_TEXT_IN;
    case 6:
    case "FILTER_TYPE_DATETIME_BETWEEN":
      return FilterType.FILTER_TYPE_DATETIME_BETWEEN;
    case 7:
    case "FILTER_TYPE_NUMERIC_BETWEEN":
      return FilterType.FILTER_TYPE_NUMERIC_BETWEEN;
    case 8:
    case "FILTER_TYPE_NUMERIC_IN":
      return FilterType.FILTER_TYPE_NUMERIC_IN;
    case 9:
    case "FILTER_TYPE_NUMERIC_NOT_IN":
      return FilterType.FILTER_TYPE_NUMERIC_NOT_IN;
    case 10:
    case "FILTER_TYPE_BOOLEAN":
      return FilterType.FILTER_TYPE_BOOLEAN;
    case 11:
    case "FILTER_TYPE_NOT_EMPTY":
      return FilterType.FILTER_TYPE_NOT_EMPTY;
    case 12:
    case "FILTER_TYPE_TEXT_NOT_IN":
      return FilterType.FILTER_TYPE_TEXT_NOT_IN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FilterType.UNRECOGNIZED;
  }
}

export function filterTypeToJSON(object: FilterType): string {
  switch (object) {
    case FilterType.FILTER_TYPE_UNSPECIFIED:
      return "FILTER_TYPE_UNSPECIFIED";
    case FilterType.FILTER_TYPE_TEXT_START:
      return "FILTER_TYPE_TEXT_START";
    case FilterType.FILTER_TYPE_TEXT_CONTAINS:
      return "FILTER_TYPE_TEXT_CONTAINS";
    case FilterType.FILTER_TYPE_TEXT_END:
      return "FILTER_TYPE_TEXT_END";
    case FilterType.FILTER_TYPE_TEXT_EQUAL:
      return "FILTER_TYPE_TEXT_EQUAL";
    case FilterType.FILTER_TYPE_TEXT_IN:
      return "FILTER_TYPE_TEXT_IN";
    case FilterType.FILTER_TYPE_DATETIME_BETWEEN:
      return "FILTER_TYPE_DATETIME_BETWEEN";
    case FilterType.FILTER_TYPE_NUMERIC_BETWEEN:
      return "FILTER_TYPE_NUMERIC_BETWEEN";
    case FilterType.FILTER_TYPE_NUMERIC_IN:
      return "FILTER_TYPE_NUMERIC_IN";
    case FilterType.FILTER_TYPE_NUMERIC_NOT_IN:
      return "FILTER_TYPE_NUMERIC_NOT_IN";
    case FilterType.FILTER_TYPE_BOOLEAN:
      return "FILTER_TYPE_BOOLEAN";
    case FilterType.FILTER_TYPE_NOT_EMPTY:
      return "FILTER_TYPE_NOT_EMPTY";
    case FilterType.FILTER_TYPE_TEXT_NOT_IN:
      return "FILTER_TYPE_TEXT_NOT_IN";
    case FilterType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * --------------------------------------------------------------------------------
 * Запрос на получение списка
 * --------------------------------------------------------------------------------
 */
export interface GetListRequest {
  filters: GetListRequest_FilterGroup | undefined;
  sort: GetListRequest_Sort | undefined;
  pagination: GetListRequest_Pagination | undefined;
  fulltextQuery?: string | undefined;
  namedQueryIds: string[];
}

export interface GetListRequest_FilterGroup {
  operator: GetListRequest_FilterGroup_QueryOperator;
  filters: GetListRequest_FilterGroup_FieldFilter[];
  groups: GetListRequest_FilterGroup[];
}

export enum GetListRequest_FilterGroup_QueryOperator {
  QUERY_OPERATOR_UNSPECIFIED = 0,
  QUERY_OPERATOR_AND = 1,
  QUERY_OPERATOR_OR = 2,
  UNRECOGNIZED = -1,
}

export function getListRequest_FilterGroup_QueryOperatorFromJSON(
  object: any,
): GetListRequest_FilterGroup_QueryOperator {
  switch (object) {
    case 0:
    case "QUERY_OPERATOR_UNSPECIFIED":
      return GetListRequest_FilterGroup_QueryOperator.QUERY_OPERATOR_UNSPECIFIED;
    case 1:
    case "QUERY_OPERATOR_AND":
      return GetListRequest_FilterGroup_QueryOperator.QUERY_OPERATOR_AND;
    case 2:
    case "QUERY_OPERATOR_OR":
      return GetListRequest_FilterGroup_QueryOperator.QUERY_OPERATOR_OR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetListRequest_FilterGroup_QueryOperator.UNRECOGNIZED;
  }
}

export function getListRequest_FilterGroup_QueryOperatorToJSON(
  object: GetListRequest_FilterGroup_QueryOperator,
): string {
  switch (object) {
    case GetListRequest_FilterGroup_QueryOperator.QUERY_OPERATOR_UNSPECIFIED:
      return "QUERY_OPERATOR_UNSPECIFIED";
    case GetListRequest_FilterGroup_QueryOperator.QUERY_OPERATOR_AND:
      return "QUERY_OPERATOR_AND";
    case GetListRequest_FilterGroup_QueryOperator.QUERY_OPERATOR_OR:
      return "QUERY_OPERATOR_OR";
    case GetListRequest_FilterGroup_QueryOperator.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetListRequest_FilterGroup_FieldFilter {
  /** поле, по которому производится фильтрация */
  field: string;
  filterTextStart?: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart | undefined;
  filterTextContains?: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains | undefined;
  filterTextEnd?: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd | undefined;
  filterTextEqual?: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual | undefined;
  filterTextIn?: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn | undefined;
  filterDateTimeBetween?: GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween | undefined;
  filterNumericBetween?: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween | undefined;
  filterNumericIn?: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn | undefined;
  filterNumericNotIn?: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn | undefined;
  filterBoolean?: GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean | undefined;
  filterNotEmpty?: GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty | undefined;
  filterTextNotIn?: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn | undefined;
}

/**
 * --------------------------------------------------------------------------------
 * варианты фильтров со значениями
 * --------------------------------------------------------------------------------
 * FILTER_TYPE_TEXT_START
 */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart {
  value: string;
}

/** FILTER_TYPE_TEXT_CONTAINS */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains {
  value: string;
}

/** FILTER_TYPE_TEXT_END */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd {
  value: string;
}

/** FILTER_TYPE_TEXT_EQUAL */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual {
  value: string;
}

/** FILTER_TYPE_TEXT_IN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn {
  value: string[];
}

/** FILTER_TYPE_TEXT_NOT_IN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn {
  value: string[];
}

/** FILTER_TYPE_DATETIME_BETWEEN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween {
  value: GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value | undefined;
}

export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value {
  /**
   * значения опциональны, так как фильтр выполняет три функции:
   * - больше либо равно from
   * - меньше либо равно to
   * - больше либо равно from И меньше либо равно to
   */
  from?: Date | undefined;
  to?: Date | undefined;
}

/** FILTER_TYPE_NUMERIC_BETWEEN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween {
  value:
    | GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value
    | undefined;
  /** строгое неравенство */
  strict: boolean;
}

export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value {
  /**
   * значения опциональны, так как фильтр выполняет три функции:
   * - больше либо равно from
   * - меньше либо равно to
   * - больше либо равно from И меньше либо равно to
   */
  from?: number | undefined;
  to?: number | undefined;
}

/** FILTER_TYPE_NUMERIC_IN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn {
  value: number[];
}

/** FILTER_TYPE_NUMERIC_NOT_IN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn {
  value: number[];
}

/** BOOLEAN */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean {
  value: boolean;
}

/** NOT EMPTY (as BOOLEAN) */
export interface GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty {
  value: boolean;
}

export interface GetListRequest_Sort {
  field: string;
  direction: SortDirection;
}

export interface GetListRequest_Pagination {
  page: string;
  perPage: number;
}

export interface GetListRequest_Filter {
  field: string;
  type: FilterType;
}

/**
 * --------------------------------------------------------------------------------
 * Ответ с конфигурацией списка
 * --------------------------------------------------------------------------------
 */
export interface GetListConfigResponse {
  filters: GetListConfigResponse_Filter[];
  sort: GetListConfigResponse_Sort | undefined;
  perPage: number[];
  fulltextSearch: GetListConfigResponse_FulltextSearch | undefined;
  namedQueries: GetListConfigResponse_NamedQuery[];
  /** код конфига item/brand/collection */
  code: string;
}

export interface GetListConfigResponse_Autocomplete {
  request?: string | undefined;
  response?: string | undefined;
}

export interface GetListConfigResponse_FieldFilter {
  type: FilterType;
  options: GetListConfigResponse_FieldFilter_FieldOption[];
  autocomplete?: GetListConfigResponse_Autocomplete | undefined;
}

export interface GetListConfigResponse_FieldFilter_FieldOption {
  id: string;
  text: string;
}

export interface GetListConfigResponse_Filter {
  group?: GetListConfigResponse_Filter_Group | undefined;
  field?: GetListConfigResponse_Filter_Field | undefined;
}

export interface GetListConfigResponse_Filter_Group {
  /** название группы, например "Атрибуты" */
  label: string;
  fields: GetListConfigResponse_Filter_Group_GroupField[];
}

export interface GetListConfigResponse_Filter_Group_GroupField {
  /** название поля, например "Длина платья" */
  label: string;
  fieldName: string;
  /** для поля группы может быть доступен всего один фильтр */
  filter: GetListConfigResponse_FieldFilter | undefined;
}

export interface GetListConfigResponse_Filter_Field {
  /** название поля, например "Название товара" */
  label: string;
  fieldName: string;
  filters: GetListConfigResponse_FieldFilter[];
}

export interface GetListConfigResponse_Sort {
  fields: GetListConfigResponse_Sort_SortField[];
  default: GetListConfigResponse_Sort_SortDefault | undefined;
}

export interface GetListConfigResponse_Sort_SortField {
  field: string;
  label: string;
}

export interface GetListConfigResponse_Sort_SortDefault {
  field: string;
  direction: SortDirection;
}

export interface GetListConfigResponse_FulltextSearch {
  enable: boolean;
  description: string;
}

export interface GetListConfigResponse_NamedQuery {
  id: string;
  title: string;
  description: string;
}

/**
 * --------------------------------------------------------------------------------
 * Структуры для группировки метаинформации в секции meta ответа с получением списка
 * --------------------------------------------------------------------------------
 */
export interface SortInfo {
  field: string;
  direction: SortDirection;
}

export interface PaginationInfo {
  total: string;
  perPage: number;
  page: number;
  pageCount: string;
}

export interface ResponseMeta {
  sort: SortInfo | undefined;
  pagination: PaginationInfo | undefined;
}

/**
 * --------------------------------------------------------------------------------
 * Автокомплит в двух вариантах, с возвратом ключей в виде строк или чисел
 * --------------------------------------------------------------------------------
 * запрос на автокомплит всегда подстрока, параметр "q"
 */
export interface AutocompleteRequest {
  q: string;
  entityCodes: string[];
}

/** вариант с ключом - числом */
export interface AutocompleteOptionNumberResponse {
  options: AutocompleteOptionNumberResponse_AutocompleteOptionNumber[];
}

export interface AutocompleteOptionNumberResponse_AutocompleteOptionNumber {
  id: string;
  text: string;
  /** на случай если захотим в результатах автокомплита выводить еще и краткое описание */
  desc?:
    | string
    | undefined;
  /** на случай если захотим в результатах автокомплита выводить еще и картинку */
  image?: string | undefined;
}

/** вариант с ключом - строкой */
export interface AutocompleteOptionTextResponse {
  options: AutocompleteOptionTextResponse_AutocompleteOptionText[];
}

export interface AutocompleteOptionTextResponse_AutocompleteOptionText {
  id: string;
  text: string;
  /** на случай если захотим в результатах автокомплита выводить еще и краткое описание */
  desc?:
    | string
    | undefined;
  /** на случай если захотим в результатах автокомплита выводить еще и картинку */
  image?: string | undefined;
}

export interface SaveNamedQueryRequest {
  title: string;
  description: string;
  filters: GetListRequest_FilterGroup | undefined;
  configCode: string;
}

export interface DeleteNamedQueryRequest {
  id: string;
}

/** Токен для получения следующей порции данных */
export interface SearchAfter {
  token: string;
}

/**
 * Использовать для эффективной итерации данных на основе фильтров
 * Там где важно получить всю выборку данных не зависимо от сортировки
 * Первый запрос отправляется без SearchAfter
 * Метод ответит SearchAfter, который нужно указать в след. запросе
 * Таким образом можно последовательно обойти всю выборку данных
 * Вдохновение черпалось тут https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after
 */
export interface SearchAfterRequest {
  filters: GetListRequest_FilterGroup | undefined;
  searchAfter?: SearchAfter | undefined;
  limit: number;
}

/** Ответ содержит токен получения следующей порции данных */
export interface SearchAfterResponse {
  searchAfter: SearchAfter | undefined;
}

function createBaseGetListRequest(): GetListRequest {
  return { filters: undefined, sort: undefined, pagination: undefined, fulltextQuery: undefined, namedQueryIds: [] };
}

export const GetListRequest = {
  encode(message: GetListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filters !== undefined) {
      GetListRequest_FilterGroup.encode(message.filters, writer.uint32(10).fork()).ldelim();
    }
    if (message.sort !== undefined) {
      GetListRequest_Sort.encode(message.sort, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      GetListRequest_Pagination.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    if (message.fulltextQuery !== undefined) {
      writer.uint32(34).string(message.fulltextQuery);
    }
    writer.uint32(42).fork();
    for (const v of message.namedQueryIds) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filters = GetListRequest_FilterGroup.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sort = GetListRequest_Sort.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = GetListRequest_Pagination.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fulltextQuery = reader.string();
          continue;
        case 5:
          if (tag === 40) {
            message.namedQueryIds.push(longToString(reader.int64() as Long));

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.namedQueryIds.push(longToString(reader.int64() as Long));
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

  fromJSON(object: any): GetListRequest {
    return {
      filters: isSet(object.filters) ? GetListRequest_FilterGroup.fromJSON(object.filters) : undefined,
      sort: isSet(object.sort) ? GetListRequest_Sort.fromJSON(object.sort) : undefined,
      pagination: isSet(object.pagination) ? GetListRequest_Pagination.fromJSON(object.pagination) : undefined,
      fulltextQuery: isSet(object.fulltextQuery) ? globalThis.String(object.fulltextQuery) : undefined,
      namedQueryIds: globalThis.Array.isArray(object?.namedQueryIds)
        ? object.namedQueryIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GetListRequest): unknown {
    const obj: any = {};
    if (message.filters !== undefined) {
      obj.filters = GetListRequest_FilterGroup.toJSON(message.filters);
    }
    if (message.sort !== undefined) {
      obj.sort = GetListRequest_Sort.toJSON(message.sort);
    }
    if (message.pagination !== undefined) {
      obj.pagination = GetListRequest_Pagination.toJSON(message.pagination);
    }
    if (message.fulltextQuery !== undefined) {
      obj.fulltextQuery = message.fulltextQuery;
    }
    if (message.namedQueryIds?.length) {
      obj.namedQueryIds = message.namedQueryIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest>, I>>(base?: I): GetListRequest {
    return GetListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest>, I>>(object: I): GetListRequest {
    const message = createBaseGetListRequest();
    message.filters = (object.filters !== undefined && object.filters !== null)
      ? GetListRequest_FilterGroup.fromPartial(object.filters)
      : undefined;
    message.sort = (object.sort !== undefined && object.sort !== null)
      ? GetListRequest_Sort.fromPartial(object.sort)
      : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? GetListRequest_Pagination.fromPartial(object.pagination)
      : undefined;
    message.fulltextQuery = object.fulltextQuery ?? undefined;
    message.namedQueryIds = object.namedQueryIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetListRequest_FilterGroup(): GetListRequest_FilterGroup {
  return { operator: 0, filters: [], groups: [] };
}

export const GetListRequest_FilterGroup = {
  encode(message: GetListRequest_FilterGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    for (const v of message.filters) {
      GetListRequest_FilterGroup_FieldFilter.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.groups) {
      GetListRequest_FilterGroup.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filters.push(GetListRequest_FilterGroup_FieldFilter.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.groups.push(GetListRequest_FilterGroup.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup {
    return {
      operator: isSet(object.operator) ? getListRequest_FilterGroup_QueryOperatorFromJSON(object.operator) : 0,
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => GetListRequest_FilterGroup_FieldFilter.fromJSON(e))
        : [],
      groups: globalThis.Array.isArray(object?.groups)
        ? object.groups.map((e: any) => GetListRequest_FilterGroup.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetListRequest_FilterGroup): unknown {
    const obj: any = {};
    if (message.operator !== 0) {
      obj.operator = getListRequest_FilterGroup_QueryOperatorToJSON(message.operator);
    }
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => GetListRequest_FilterGroup_FieldFilter.toJSON(e));
    }
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => GetListRequest_FilterGroup.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup>, I>>(base?: I): GetListRequest_FilterGroup {
    return GetListRequest_FilterGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup>, I>>(object: I): GetListRequest_FilterGroup {
    const message = createBaseGetListRequest_FilterGroup();
    message.operator = object.operator ?? 0;
    message.filters = object.filters?.map((e) => GetListRequest_FilterGroup_FieldFilter.fromPartial(e)) || [];
    message.groups = object.groups?.map((e) => GetListRequest_FilterGroup.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter(): GetListRequest_FilterGroup_FieldFilter {
  return {
    field: "",
    filterTextStart: undefined,
    filterTextContains: undefined,
    filterTextEnd: undefined,
    filterTextEqual: undefined,
    filterTextIn: undefined,
    filterDateTimeBetween: undefined,
    filterNumericBetween: undefined,
    filterNumericIn: undefined,
    filterNumericNotIn: undefined,
    filterBoolean: undefined,
    filterNotEmpty: undefined,
    filterTextNotIn: undefined,
  };
}

export const GetListRequest_FilterGroup_FieldFilter = {
  encode(message: GetListRequest_FilterGroup_FieldFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.filterTextStart !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart.encode(
        message.filterTextStart,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.filterTextContains !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains.encode(
        message.filterTextContains,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.filterTextEnd !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd.encode(message.filterTextEnd, writer.uint32(34).fork())
        .ldelim();
    }
    if (message.filterTextEqual !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual.encode(
        message.filterTextEqual,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.filterTextIn !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn.encode(message.filterTextIn, writer.uint32(50).fork())
        .ldelim();
    }
    if (message.filterDateTimeBetween !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween.encode(
        message.filterDateTimeBetween,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.filterNumericBetween !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween.encode(
        message.filterNumericBetween,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.filterNumericIn !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn.encode(
        message.filterNumericIn,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.filterNumericNotIn !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn.encode(
        message.filterNumericNotIn,
        writer.uint32(82).fork(),
      ).ldelim();
    }
    if (message.filterBoolean !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean.encode(message.filterBoolean, writer.uint32(90).fork())
        .ldelim();
    }
    if (message.filterNotEmpty !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty.encode(message.filterNotEmpty, writer.uint32(98).fork())
        .ldelim();
    }
    if (message.filterTextNotIn !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn.encode(
        message.filterTextNotIn,
        writer.uint32(106).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filterTextStart = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filterTextContains = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filterTextEnd = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.filterTextEqual = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.filterTextIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.filterDateTimeBetween = GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.filterNumericBetween = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.filterNumericIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.filterNumericNotIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.filterBoolean = GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.filterNotEmpty = GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.filterTextNotIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      filterTextStart: isSet(object.filterTextStart)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart.fromJSON(object.filterTextStart)
        : undefined,
      filterTextContains: isSet(object.filterTextContains)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains.fromJSON(object.filterTextContains)
        : undefined,
      filterTextEnd: isSet(object.filterTextEnd)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd.fromJSON(object.filterTextEnd)
        : undefined,
      filterTextEqual: isSet(object.filterTextEqual)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual.fromJSON(object.filterTextEqual)
        : undefined,
      filterTextIn: isSet(object.filterTextIn)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn.fromJSON(object.filterTextIn)
        : undefined,
      filterDateTimeBetween: isSet(object.filterDateTimeBetween)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween.fromJSON(object.filterDateTimeBetween)
        : undefined,
      filterNumericBetween: isSet(object.filterNumericBetween)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween.fromJSON(object.filterNumericBetween)
        : undefined,
      filterNumericIn: isSet(object.filterNumericIn)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn.fromJSON(object.filterNumericIn)
        : undefined,
      filterNumericNotIn: isSet(object.filterNumericNotIn)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn.fromJSON(object.filterNumericNotIn)
        : undefined,
      filterBoolean: isSet(object.filterBoolean)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean.fromJSON(object.filterBoolean)
        : undefined,
      filterNotEmpty: isSet(object.filterNotEmpty)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty.fromJSON(object.filterNotEmpty)
        : undefined,
      filterTextNotIn: isSet(object.filterTextNotIn)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn.fromJSON(object.filterTextNotIn)
        : undefined,
    };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.filterTextStart !== undefined) {
      obj.filterTextStart = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart.toJSON(message.filterTextStart);
    }
    if (message.filterTextContains !== undefined) {
      obj.filterTextContains = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains.toJSON(
        message.filterTextContains,
      );
    }
    if (message.filterTextEnd !== undefined) {
      obj.filterTextEnd = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd.toJSON(message.filterTextEnd);
    }
    if (message.filterTextEqual !== undefined) {
      obj.filterTextEqual = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual.toJSON(message.filterTextEqual);
    }
    if (message.filterTextIn !== undefined) {
      obj.filterTextIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn.toJSON(message.filterTextIn);
    }
    if (message.filterDateTimeBetween !== undefined) {
      obj.filterDateTimeBetween = GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween.toJSON(
        message.filterDateTimeBetween,
      );
    }
    if (message.filterNumericBetween !== undefined) {
      obj.filterNumericBetween = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween.toJSON(
        message.filterNumericBetween,
      );
    }
    if (message.filterNumericIn !== undefined) {
      obj.filterNumericIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn.toJSON(message.filterNumericIn);
    }
    if (message.filterNumericNotIn !== undefined) {
      obj.filterNumericNotIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn.toJSON(
        message.filterNumericNotIn,
      );
    }
    if (message.filterBoolean !== undefined) {
      obj.filterBoolean = GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean.toJSON(message.filterBoolean);
    }
    if (message.filterNotEmpty !== undefined) {
      obj.filterNotEmpty = GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty.toJSON(message.filterNotEmpty);
    }
    if (message.filterTextNotIn !== undefined) {
      obj.filterTextNotIn = GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn.toJSON(message.filterTextNotIn);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter {
    return GetListRequest_FilterGroup_FieldFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter();
    message.field = object.field ?? "";
    message.filterTextStart = (object.filterTextStart !== undefined && object.filterTextStart !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart.fromPartial(object.filterTextStart)
      : undefined;
    message.filterTextContains = (object.filterTextContains !== undefined && object.filterTextContains !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains.fromPartial(object.filterTextContains)
      : undefined;
    message.filterTextEnd = (object.filterTextEnd !== undefined && object.filterTextEnd !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd.fromPartial(object.filterTextEnd)
      : undefined;
    message.filterTextEqual = (object.filterTextEqual !== undefined && object.filterTextEqual !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual.fromPartial(object.filterTextEqual)
      : undefined;
    message.filterTextIn = (object.filterTextIn !== undefined && object.filterTextIn !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn.fromPartial(object.filterTextIn)
      : undefined;
    message.filterDateTimeBetween =
      (object.filterDateTimeBetween !== undefined && object.filterDateTimeBetween !== null)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween.fromPartial(object.filterDateTimeBetween)
        : undefined;
    message.filterNumericBetween = (object.filterNumericBetween !== undefined && object.filterNumericBetween !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween.fromPartial(object.filterNumericBetween)
      : undefined;
    message.filterNumericIn = (object.filterNumericIn !== undefined && object.filterNumericIn !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn.fromPartial(object.filterNumericIn)
      : undefined;
    message.filterNumericNotIn = (object.filterNumericNotIn !== undefined && object.filterNumericNotIn !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn.fromPartial(object.filterNumericNotIn)
      : undefined;
    message.filterBoolean = (object.filterBoolean !== undefined && object.filterBoolean !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean.fromPartial(object.filterBoolean)
      : undefined;
    message.filterNotEmpty = (object.filterNotEmpty !== undefined && object.filterNotEmpty !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty.fromPartial(object.filterNotEmpty)
      : undefined;
    message.filterTextNotIn = (object.filterTextNotIn !== undefined && object.filterTextNotIn !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn.fromPartial(object.filterTextNotIn)
      : undefined;
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart(): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart {
  return { value: "" };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart {
    return { value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextStart();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains(): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains {
  return { value: "" };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains {
    return { value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextContains();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd(): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd {
  return { value: "" };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd {
    return { value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextEnd();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual(): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual {
  return { value: "" };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual {
    return { value: isSet(object.value) ? globalThis.String(object.value) : "" };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextEqual();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn(): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn {
  return { value: [] };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.value) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn {
    return { value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextIn();
    message.value = object.value?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn(): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn {
  return { value: [] };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.value) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn {
    return { value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeTextNotIn();
    message.value = object.value?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween(): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween {
  return { value: undefined };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value.encode(
        message.value,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween {
    return {
      value: isSet(object.value)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween();
    message.value = (object.value !== undefined && object.value !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value(): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value {
  return { from: undefined, to: undefined };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.from !== undefined) {
      Timestamp.encode(toTimestamp(message.from), writer.uint32(10).fork()).ldelim();
    }
    if (message.to !== undefined) {
      Timestamp.encode(toTimestamp(message.to), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.from = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.to = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value {
    return {
      from: isSet(object.from) ? fromJsonTimestamp(object.from) : undefined,
      to: isSet(object.to) ? fromJsonTimestamp(object.to) : undefined,
    };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value): unknown {
    const obj: any = {};
    if (message.from !== undefined) {
      obj.from = message.from.toISOString();
    }
    if (message.to !== undefined) {
      obj.to = message.to.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeDateTimeBetween_Value();
    message.from = object.from ?? undefined;
    message.to = object.to ?? undefined;
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween(): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween {
  return { value: undefined, strict: false };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value !== undefined) {
      GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value.encode(
        message.value,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.strict === true) {
      writer.uint32(16).bool(message.strict);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.strict = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween {
    return {
      value: isSet(object.value)
        ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value.fromJSON(object.value)
        : undefined,
      strict: isSet(object.strict) ? globalThis.Boolean(object.strict) : false,
    };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value.toJSON(message.value);
    }
    if (message.strict === true) {
      obj.strict = message.strict;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween();
    message.value = (object.value !== undefined && object.value !== null)
      ? GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value.fromPartial(object.value)
      : undefined;
    message.strict = object.strict ?? false;
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value(): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value {
  return { from: undefined, to: undefined };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.from !== undefined) {
      writer.uint32(9).double(message.from);
    }
    if (message.to !== undefined) {
      writer.uint32(17).double(message.to);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.from = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.to = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value {
    return {
      from: isSet(object.from) ? globalThis.Number(object.from) : undefined,
      to: isSet(object.to) ? globalThis.Number(object.to) : undefined,
    };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value): unknown {
    const obj: any = {};
    if (message.from !== undefined) {
      obj.from = message.from;
    }
    if (message.to !== undefined) {
      obj.to = message.to;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericBetween_Value();
    message.from = object.from ?? undefined;
    message.to = object.to ?? undefined;
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn(): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn {
  return { value: [] };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.value) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 9) {
            message.value.push(reader.double());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.value.push(reader.double());
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

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn {
    return { value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => globalThis.Number(e)) : [] };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericIn();
    message.value = object.value?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn(): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn {
  return { value: [] };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.value) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 9) {
            message.value.push(reader.double());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.value.push(reader.double());
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

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn {
    return { value: globalThis.Array.isArray(object?.value) ? object.value.map((e: any) => globalThis.Number(e)) : [] };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn): unknown {
    const obj: any = {};
    if (message.value?.length) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNumericNotIn();
    message.value = object.value?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean(): GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean {
  return { value: false };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value === true) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean {
    return { value: isSet(object.value) ? globalThis.Boolean(object.value) : false };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean): unknown {
    const obj: any = {};
    if (message.value === true) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeBoolean();
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty(): GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty {
  return { value: false };
}

export const GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty = {
  encode(
    message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.value === true) {
      writer.uint32(8).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty {
    return { value: isSet(object.value) ? globalThis.Boolean(object.value) : false };
  },

  toJSON(message: GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty): unknown {
    const obj: any = {};
    if (message.value === true) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty>, I>>(
    base?: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty {
    return GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty>, I>>(
    object: I,
  ): GetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty {
    const message = createBaseGetListRequest_FilterGroup_FieldFilter_FilterTypeNotEmpty();
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseGetListRequest_Sort(): GetListRequest_Sort {
  return { field: "", direction: 0 };
}

export const GetListRequest_Sort = {
  encode(message: GetListRequest_Sort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.direction !== 0) {
      writer.uint32(16).int32(message.direction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_Sort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_Sort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
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

  fromJSON(object: any): GetListRequest_Sort {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      direction: isSet(object.direction) ? sortDirectionFromJSON(object.direction) : 0,
    };
  },

  toJSON(message: GetListRequest_Sort): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.direction !== 0) {
      obj.direction = sortDirectionToJSON(message.direction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_Sort>, I>>(base?: I): GetListRequest_Sort {
    return GetListRequest_Sort.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_Sort>, I>>(object: I): GetListRequest_Sort {
    const message = createBaseGetListRequest_Sort();
    message.field = object.field ?? "";
    message.direction = object.direction ?? 0;
    return message;
  },
};

function createBaseGetListRequest_Pagination(): GetListRequest_Pagination {
  return { page: "0", perPage: 0 };
}

export const GetListRequest_Pagination = {
  encode(message: GetListRequest_Pagination, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== "0") {
      writer.uint32(8).int64(message.page);
    }
    if (message.perPage !== 0) {
      writer.uint32(16).uint32(message.perPage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_Pagination {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_Pagination();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.perPage = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_Pagination {
    return {
      page: isSet(object.page) ? globalThis.String(object.page) : "0",
      perPage: isSet(object.perPage) ? globalThis.Number(object.perPage) : 0,
    };
  },

  toJSON(message: GetListRequest_Pagination): unknown {
    const obj: any = {};
    if (message.page !== "0") {
      obj.page = message.page;
    }
    if (message.perPage !== 0) {
      obj.perPage = Math.round(message.perPage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_Pagination>, I>>(base?: I): GetListRequest_Pagination {
    return GetListRequest_Pagination.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_Pagination>, I>>(object: I): GetListRequest_Pagination {
    const message = createBaseGetListRequest_Pagination();
    message.page = object.page ?? "0";
    message.perPage = object.perPage ?? 0;
    return message;
  },
};

function createBaseGetListRequest_Filter(): GetListRequest_Filter {
  return { field: "", type: 0 };
}

export const GetListRequest_Filter = {
  encode(message: GetListRequest_Filter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListRequest_Filter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListRequest_Filter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListRequest_Filter {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      type: isSet(object.type) ? filterTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: GetListRequest_Filter): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.type !== 0) {
      obj.type = filterTypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListRequest_Filter>, I>>(base?: I): GetListRequest_Filter {
    return GetListRequest_Filter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListRequest_Filter>, I>>(object: I): GetListRequest_Filter {
    const message = createBaseGetListRequest_Filter();
    message.field = object.field ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseGetListConfigResponse(): GetListConfigResponse {
  return { filters: [], sort: undefined, perPage: [], fulltextSearch: undefined, namedQueries: [], code: "" };
}

export const GetListConfigResponse = {
  encode(message: GetListConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.filters) {
      GetListConfigResponse_Filter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.sort !== undefined) {
      GetListConfigResponse_Sort.encode(message.sort, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.perPage) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.fulltextSearch !== undefined) {
      GetListConfigResponse_FulltextSearch.encode(message.fulltextSearch, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.namedQueries) {
      GetListConfigResponse_NamedQuery.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.code !== "") {
      writer.uint32(50).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filters.push(GetListConfigResponse_Filter.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sort = GetListConfigResponse_Sort.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag === 24) {
            message.perPage.push(reader.uint32());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.perPage.push(reader.uint32());
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fulltextSearch = GetListConfigResponse_FulltextSearch.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.namedQueries.push(GetListConfigResponse_NamedQuery.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse {
    return {
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => GetListConfigResponse_Filter.fromJSON(e))
        : [],
      sort: isSet(object.sort) ? GetListConfigResponse_Sort.fromJSON(object.sort) : undefined,
      perPage: globalThis.Array.isArray(object?.perPage) ? object.perPage.map((e: any) => globalThis.Number(e)) : [],
      fulltextSearch: isSet(object.fulltextSearch)
        ? GetListConfigResponse_FulltextSearch.fromJSON(object.fulltextSearch)
        : undefined,
      namedQueries: globalThis.Array.isArray(object?.namedQueries)
        ? object.namedQueries.map((e: any) => GetListConfigResponse_NamedQuery.fromJSON(e))
        : [],
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: GetListConfigResponse): unknown {
    const obj: any = {};
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => GetListConfigResponse_Filter.toJSON(e));
    }
    if (message.sort !== undefined) {
      obj.sort = GetListConfigResponse_Sort.toJSON(message.sort);
    }
    if (message.perPage?.length) {
      obj.perPage = message.perPage.map((e) => Math.round(e));
    }
    if (message.fulltextSearch !== undefined) {
      obj.fulltextSearch = GetListConfigResponse_FulltextSearch.toJSON(message.fulltextSearch);
    }
    if (message.namedQueries?.length) {
      obj.namedQueries = message.namedQueries.map((e) => GetListConfigResponse_NamedQuery.toJSON(e));
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse>, I>>(base?: I): GetListConfigResponse {
    return GetListConfigResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse>, I>>(object: I): GetListConfigResponse {
    const message = createBaseGetListConfigResponse();
    message.filters = object.filters?.map((e) => GetListConfigResponse_Filter.fromPartial(e)) || [];
    message.sort = (object.sort !== undefined && object.sort !== null)
      ? GetListConfigResponse_Sort.fromPartial(object.sort)
      : undefined;
    message.perPage = object.perPage?.map((e) => e) || [];
    message.fulltextSearch = (object.fulltextSearch !== undefined && object.fulltextSearch !== null)
      ? GetListConfigResponse_FulltextSearch.fromPartial(object.fulltextSearch)
      : undefined;
    message.namedQueries = object.namedQueries?.map((e) => GetListConfigResponse_NamedQuery.fromPartial(e)) || [];
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseGetListConfigResponse_Autocomplete(): GetListConfigResponse_Autocomplete {
  return { request: undefined, response: undefined };
}

export const GetListConfigResponse_Autocomplete = {
  encode(message: GetListConfigResponse_Autocomplete, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.request !== undefined) {
      writer.uint32(10).string(message.request);
    }
    if (message.response !== undefined) {
      writer.uint32(18).string(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Autocomplete {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Autocomplete();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.request = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Autocomplete {
    return {
      request: isSet(object.request) ? globalThis.String(object.request) : undefined,
      response: isSet(object.response) ? globalThis.String(object.response) : undefined,
    };
  },

  toJSON(message: GetListConfigResponse_Autocomplete): unknown {
    const obj: any = {};
    if (message.request !== undefined) {
      obj.request = message.request;
    }
    if (message.response !== undefined) {
      obj.response = message.response;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Autocomplete>, I>>(
    base?: I,
  ): GetListConfigResponse_Autocomplete {
    return GetListConfigResponse_Autocomplete.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Autocomplete>, I>>(
    object: I,
  ): GetListConfigResponse_Autocomplete {
    const message = createBaseGetListConfigResponse_Autocomplete();
    message.request = object.request ?? undefined;
    message.response = object.response ?? undefined;
    return message;
  },
};

function createBaseGetListConfigResponse_FieldFilter(): GetListConfigResponse_FieldFilter {
  return { type: 0, options: [], autocomplete: undefined };
}

export const GetListConfigResponse_FieldFilter = {
  encode(message: GetListConfigResponse_FieldFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    for (const v of message.options) {
      GetListConfigResponse_FieldFilter_FieldOption.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.autocomplete !== undefined) {
      GetListConfigResponse_Autocomplete.encode(message.autocomplete, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_FieldFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_FieldFilter();
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

          message.options.push(GetListConfigResponse_FieldFilter_FieldOption.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.autocomplete = GetListConfigResponse_Autocomplete.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_FieldFilter {
    return {
      type: isSet(object.type) ? filterTypeFromJSON(object.type) : 0,
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => GetListConfigResponse_FieldFilter_FieldOption.fromJSON(e))
        : [],
      autocomplete: isSet(object.autocomplete)
        ? GetListConfigResponse_Autocomplete.fromJSON(object.autocomplete)
        : undefined,
    };
  },

  toJSON(message: GetListConfigResponse_FieldFilter): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = filterTypeToJSON(message.type);
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => GetListConfigResponse_FieldFilter_FieldOption.toJSON(e));
    }
    if (message.autocomplete !== undefined) {
      obj.autocomplete = GetListConfigResponse_Autocomplete.toJSON(message.autocomplete);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_FieldFilter>, I>>(
    base?: I,
  ): GetListConfigResponse_FieldFilter {
    return GetListConfigResponse_FieldFilter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_FieldFilter>, I>>(
    object: I,
  ): GetListConfigResponse_FieldFilter {
    const message = createBaseGetListConfigResponse_FieldFilter();
    message.type = object.type ?? 0;
    message.options = object.options?.map((e) => GetListConfigResponse_FieldFilter_FieldOption.fromPartial(e)) || [];
    message.autocomplete = (object.autocomplete !== undefined && object.autocomplete !== null)
      ? GetListConfigResponse_Autocomplete.fromPartial(object.autocomplete)
      : undefined;
    return message;
  },
};

function createBaseGetListConfigResponse_FieldFilter_FieldOption(): GetListConfigResponse_FieldFilter_FieldOption {
  return { id: "", text: "" };
}

export const GetListConfigResponse_FieldFilter_FieldOption = {
  encode(message: GetListConfigResponse_FieldFilter_FieldOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_FieldFilter_FieldOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_FieldFilter_FieldOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_FieldFilter_FieldOption {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      text: isSet(object.text) ? globalThis.String(object.text) : "",
    };
  },

  toJSON(message: GetListConfigResponse_FieldFilter_FieldOption): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.text !== "") {
      obj.text = message.text;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_FieldFilter_FieldOption>, I>>(
    base?: I,
  ): GetListConfigResponse_FieldFilter_FieldOption {
    return GetListConfigResponse_FieldFilter_FieldOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_FieldFilter_FieldOption>, I>>(
    object: I,
  ): GetListConfigResponse_FieldFilter_FieldOption {
    const message = createBaseGetListConfigResponse_FieldFilter_FieldOption();
    message.id = object.id ?? "";
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseGetListConfigResponse_Filter(): GetListConfigResponse_Filter {
  return { group: undefined, field: undefined };
}

export const GetListConfigResponse_Filter = {
  encode(message: GetListConfigResponse_Filter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group !== undefined) {
      GetListConfigResponse_Filter_Group.encode(message.group, writer.uint32(10).fork()).ldelim();
    }
    if (message.field !== undefined) {
      GetListConfigResponse_Filter_Field.encode(message.field, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Filter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Filter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group = GetListConfigResponse_Filter_Group.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.field = GetListConfigResponse_Filter_Field.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Filter {
    return {
      group: isSet(object.group) ? GetListConfigResponse_Filter_Group.fromJSON(object.group) : undefined,
      field: isSet(object.field) ? GetListConfigResponse_Filter_Field.fromJSON(object.field) : undefined,
    };
  },

  toJSON(message: GetListConfigResponse_Filter): unknown {
    const obj: any = {};
    if (message.group !== undefined) {
      obj.group = GetListConfigResponse_Filter_Group.toJSON(message.group);
    }
    if (message.field !== undefined) {
      obj.field = GetListConfigResponse_Filter_Field.toJSON(message.field);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Filter>, I>>(base?: I): GetListConfigResponse_Filter {
    return GetListConfigResponse_Filter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Filter>, I>>(object: I): GetListConfigResponse_Filter {
    const message = createBaseGetListConfigResponse_Filter();
    message.group = (object.group !== undefined && object.group !== null)
      ? GetListConfigResponse_Filter_Group.fromPartial(object.group)
      : undefined;
    message.field = (object.field !== undefined && object.field !== null)
      ? GetListConfigResponse_Filter_Field.fromPartial(object.field)
      : undefined;
    return message;
  },
};

function createBaseGetListConfigResponse_Filter_Group(): GetListConfigResponse_Filter_Group {
  return { label: "", fields: [] };
}

export const GetListConfigResponse_Filter_Group = {
  encode(message: GetListConfigResponse_Filter_Group, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    for (const v of message.fields) {
      GetListConfigResponse_Filter_Group_GroupField.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Filter_Group {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Filter_Group();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.label = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fields.push(GetListConfigResponse_Filter_Group_GroupField.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Filter_Group {
    return {
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      fields: globalThis.Array.isArray(object?.fields)
        ? object.fields.map((e: any) => GetListConfigResponse_Filter_Group_GroupField.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetListConfigResponse_Filter_Group): unknown {
    const obj: any = {};
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => GetListConfigResponse_Filter_Group_GroupField.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Filter_Group>, I>>(
    base?: I,
  ): GetListConfigResponse_Filter_Group {
    return GetListConfigResponse_Filter_Group.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Filter_Group>, I>>(
    object: I,
  ): GetListConfigResponse_Filter_Group {
    const message = createBaseGetListConfigResponse_Filter_Group();
    message.label = object.label ?? "";
    message.fields = object.fields?.map((e) => GetListConfigResponse_Filter_Group_GroupField.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetListConfigResponse_Filter_Group_GroupField(): GetListConfigResponse_Filter_Group_GroupField {
  return { label: "", fieldName: "", filter: undefined };
}

export const GetListConfigResponse_Filter_Group_GroupField = {
  encode(message: GetListConfigResponse_Filter_Group_GroupField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.fieldName !== "") {
      writer.uint32(18).string(message.fieldName);
    }
    if (message.filter !== undefined) {
      GetListConfigResponse_FieldFilter.encode(message.filter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Filter_Group_GroupField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Filter_Group_GroupField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.label = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = GetListConfigResponse_FieldFilter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Filter_Group_GroupField {
    return {
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      fieldName: isSet(object.fieldName) ? globalThis.String(object.fieldName) : "",
      filter: isSet(object.filter) ? GetListConfigResponse_FieldFilter.fromJSON(object.filter) : undefined,
    };
  },

  toJSON(message: GetListConfigResponse_Filter_Group_GroupField): unknown {
    const obj: any = {};
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.fieldName !== "") {
      obj.fieldName = message.fieldName;
    }
    if (message.filter !== undefined) {
      obj.filter = GetListConfigResponse_FieldFilter.toJSON(message.filter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Filter_Group_GroupField>, I>>(
    base?: I,
  ): GetListConfigResponse_Filter_Group_GroupField {
    return GetListConfigResponse_Filter_Group_GroupField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Filter_Group_GroupField>, I>>(
    object: I,
  ): GetListConfigResponse_Filter_Group_GroupField {
    const message = createBaseGetListConfigResponse_Filter_Group_GroupField();
    message.label = object.label ?? "";
    message.fieldName = object.fieldName ?? "";
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? GetListConfigResponse_FieldFilter.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

function createBaseGetListConfigResponse_Filter_Field(): GetListConfigResponse_Filter_Field {
  return { label: "", fieldName: "", filters: [] };
}

export const GetListConfigResponse_Filter_Field = {
  encode(message: GetListConfigResponse_Filter_Field, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.fieldName !== "") {
      writer.uint32(18).string(message.fieldName);
    }
    for (const v of message.filters) {
      GetListConfigResponse_FieldFilter.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Filter_Field {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Filter_Field();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.label = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fieldName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filters.push(GetListConfigResponse_FieldFilter.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Filter_Field {
    return {
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      fieldName: isSet(object.fieldName) ? globalThis.String(object.fieldName) : "",
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => GetListConfigResponse_FieldFilter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetListConfigResponse_Filter_Field): unknown {
    const obj: any = {};
    if (message.label !== "") {
      obj.label = message.label;
    }
    if (message.fieldName !== "") {
      obj.fieldName = message.fieldName;
    }
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => GetListConfigResponse_FieldFilter.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Filter_Field>, I>>(
    base?: I,
  ): GetListConfigResponse_Filter_Field {
    return GetListConfigResponse_Filter_Field.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Filter_Field>, I>>(
    object: I,
  ): GetListConfigResponse_Filter_Field {
    const message = createBaseGetListConfigResponse_Filter_Field();
    message.label = object.label ?? "";
    message.fieldName = object.fieldName ?? "";
    message.filters = object.filters?.map((e) => GetListConfigResponse_FieldFilter.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetListConfigResponse_Sort(): GetListConfigResponse_Sort {
  return { fields: [], default: undefined };
}

export const GetListConfigResponse_Sort = {
  encode(message: GetListConfigResponse_Sort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.fields) {
      GetListConfigResponse_Sort_SortField.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.default !== undefined) {
      GetListConfigResponse_Sort_SortDefault.encode(message.default, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Sort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Sort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields.push(GetListConfigResponse_Sort_SortField.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.default = GetListConfigResponse_Sort_SortDefault.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Sort {
    return {
      fields: globalThis.Array.isArray(object?.fields)
        ? object.fields.map((e: any) => GetListConfigResponse_Sort_SortField.fromJSON(e))
        : [],
      default: isSet(object.default) ? GetListConfigResponse_Sort_SortDefault.fromJSON(object.default) : undefined,
    };
  },

  toJSON(message: GetListConfigResponse_Sort): unknown {
    const obj: any = {};
    if (message.fields?.length) {
      obj.fields = message.fields.map((e) => GetListConfigResponse_Sort_SortField.toJSON(e));
    }
    if (message.default !== undefined) {
      obj.default = GetListConfigResponse_Sort_SortDefault.toJSON(message.default);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Sort>, I>>(base?: I): GetListConfigResponse_Sort {
    return GetListConfigResponse_Sort.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Sort>, I>>(object: I): GetListConfigResponse_Sort {
    const message = createBaseGetListConfigResponse_Sort();
    message.fields = object.fields?.map((e) => GetListConfigResponse_Sort_SortField.fromPartial(e)) || [];
    message.default = (object.default !== undefined && object.default !== null)
      ? GetListConfigResponse_Sort_SortDefault.fromPartial(object.default)
      : undefined;
    return message;
  },
};

function createBaseGetListConfigResponse_Sort_SortField(): GetListConfigResponse_Sort_SortField {
  return { field: "", label: "" };
}

export const GetListConfigResponse_Sort_SortField = {
  encode(message: GetListConfigResponse_Sort_SortField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Sort_SortField {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Sort_SortField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.label = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_Sort_SortField {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      label: isSet(object.label) ? globalThis.String(object.label) : "",
    };
  },

  toJSON(message: GetListConfigResponse_Sort_SortField): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Sort_SortField>, I>>(
    base?: I,
  ): GetListConfigResponse_Sort_SortField {
    return GetListConfigResponse_Sort_SortField.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Sort_SortField>, I>>(
    object: I,
  ): GetListConfigResponse_Sort_SortField {
    const message = createBaseGetListConfigResponse_Sort_SortField();
    message.field = object.field ?? "";
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseGetListConfigResponse_Sort_SortDefault(): GetListConfigResponse_Sort_SortDefault {
  return { field: "", direction: 0 };
}

export const GetListConfigResponse_Sort_SortDefault = {
  encode(message: GetListConfigResponse_Sort_SortDefault, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.direction !== 0) {
      writer.uint32(16).int32(message.direction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_Sort_SortDefault {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_Sort_SortDefault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
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

  fromJSON(object: any): GetListConfigResponse_Sort_SortDefault {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      direction: isSet(object.direction) ? sortDirectionFromJSON(object.direction) : 0,
    };
  },

  toJSON(message: GetListConfigResponse_Sort_SortDefault): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.direction !== 0) {
      obj.direction = sortDirectionToJSON(message.direction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_Sort_SortDefault>, I>>(
    base?: I,
  ): GetListConfigResponse_Sort_SortDefault {
    return GetListConfigResponse_Sort_SortDefault.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_Sort_SortDefault>, I>>(
    object: I,
  ): GetListConfigResponse_Sort_SortDefault {
    const message = createBaseGetListConfigResponse_Sort_SortDefault();
    message.field = object.field ?? "";
    message.direction = object.direction ?? 0;
    return message;
  },
};

function createBaseGetListConfigResponse_FulltextSearch(): GetListConfigResponse_FulltextSearch {
  return { enable: false, description: "" };
}

export const GetListConfigResponse_FulltextSearch = {
  encode(message: GetListConfigResponse_FulltextSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enable === true) {
      writer.uint32(8).bool(message.enable);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_FulltextSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_FulltextSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enable = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_FulltextSearch {
    return {
      enable: isSet(object.enable) ? globalThis.Boolean(object.enable) : false,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: GetListConfigResponse_FulltextSearch): unknown {
    const obj: any = {};
    if (message.enable === true) {
      obj.enable = message.enable;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_FulltextSearch>, I>>(
    base?: I,
  ): GetListConfigResponse_FulltextSearch {
    return GetListConfigResponse_FulltextSearch.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_FulltextSearch>, I>>(
    object: I,
  ): GetListConfigResponse_FulltextSearch {
    const message = createBaseGetListConfigResponse_FulltextSearch();
    message.enable = object.enable ?? false;
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseGetListConfigResponse_NamedQuery(): GetListConfigResponse_NamedQuery {
  return { id: "0", title: "", description: "" };
}

export const GetListConfigResponse_NamedQuery = {
  encode(message: GetListConfigResponse_NamedQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetListConfigResponse_NamedQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetListConfigResponse_NamedQuery();
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

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetListConfigResponse_NamedQuery {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: GetListConfigResponse_NamedQuery): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetListConfigResponse_NamedQuery>, I>>(
    base?: I,
  ): GetListConfigResponse_NamedQuery {
    return GetListConfigResponse_NamedQuery.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetListConfigResponse_NamedQuery>, I>>(
    object: I,
  ): GetListConfigResponse_NamedQuery {
    const message = createBaseGetListConfigResponse_NamedQuery();
    message.id = object.id ?? "0";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseSortInfo(): SortInfo {
  return { field: "", direction: 0 };
}

export const SortInfo = {
  encode(message: SortInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    if (message.direction !== 0) {
      writer.uint32(16).int32(message.direction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SortInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSortInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
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

  fromJSON(object: any): SortInfo {
    return {
      field: isSet(object.field) ? globalThis.String(object.field) : "",
      direction: isSet(object.direction) ? sortDirectionFromJSON(object.direction) : 0,
    };
  },

  toJSON(message: SortInfo): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    if (message.direction !== 0) {
      obj.direction = sortDirectionToJSON(message.direction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SortInfo>, I>>(base?: I): SortInfo {
    return SortInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SortInfo>, I>>(object: I): SortInfo {
    const message = createBaseSortInfo();
    message.field = object.field ?? "";
    message.direction = object.direction ?? 0;
    return message;
  },
};

function createBasePaginationInfo(): PaginationInfo {
  return { total: "0", perPage: 0, page: 0, pageCount: "0" };
}

export const PaginationInfo = {
  encode(message: PaginationInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== "0") {
      writer.uint32(8).int64(message.total);
    }
    if (message.perPage !== 0) {
      writer.uint32(16).uint32(message.perPage);
    }
    if (message.page !== 0) {
      writer.uint32(24).uint32(message.page);
    }
    if (message.pageCount !== "0") {
      writer.uint32(32).int64(message.pageCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaginationInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaginationInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.perPage = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.page = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pageCount = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PaginationInfo {
    return {
      total: isSet(object.total) ? globalThis.String(object.total) : "0",
      perPage: isSet(object.perPage) ? globalThis.Number(object.perPage) : 0,
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      pageCount: isSet(object.pageCount) ? globalThis.String(object.pageCount) : "0",
    };
  },

  toJSON(message: PaginationInfo): unknown {
    const obj: any = {};
    if (message.total !== "0") {
      obj.total = message.total;
    }
    if (message.perPage !== 0) {
      obj.perPage = Math.round(message.perPage);
    }
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.pageCount !== "0") {
      obj.pageCount = message.pageCount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PaginationInfo>, I>>(base?: I): PaginationInfo {
    return PaginationInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PaginationInfo>, I>>(object: I): PaginationInfo {
    const message = createBasePaginationInfo();
    message.total = object.total ?? "0";
    message.perPage = object.perPage ?? 0;
    message.page = object.page ?? 0;
    message.pageCount = object.pageCount ?? "0";
    return message;
  },
};

function createBaseResponseMeta(): ResponseMeta {
  return { sort: undefined, pagination: undefined };
}

export const ResponseMeta = {
  encode(message: ResponseMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sort !== undefined) {
      SortInfo.encode(message.sort, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PaginationInfo.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sort = SortInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PaginationInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseMeta {
    return {
      sort: isSet(object.sort) ? SortInfo.fromJSON(object.sort) : undefined,
      pagination: isSet(object.pagination) ? PaginationInfo.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ResponseMeta): unknown {
    const obj: any = {};
    if (message.sort !== undefined) {
      obj.sort = SortInfo.toJSON(message.sort);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PaginationInfo.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseMeta>, I>>(base?: I): ResponseMeta {
    return ResponseMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseMeta>, I>>(object: I): ResponseMeta {
    const message = createBaseResponseMeta();
    message.sort = (object.sort !== undefined && object.sort !== null) ? SortInfo.fromPartial(object.sort) : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PaginationInfo.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseAutocompleteRequest(): AutocompleteRequest {
  return { q: "", entityCodes: [] };
}

export const AutocompleteRequest = {
  encode(message: AutocompleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.q !== "") {
      writer.uint32(10).string(message.q);
    }
    for (const v of message.entityCodes) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutocompleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutocompleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.q = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.entityCodes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutocompleteRequest {
    return {
      q: isSet(object.q) ? globalThis.String(object.q) : "",
      entityCodes: globalThis.Array.isArray(object?.entityCodes)
        ? object.entityCodes.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: AutocompleteRequest): unknown {
    const obj: any = {};
    if (message.q !== "") {
      obj.q = message.q;
    }
    if (message.entityCodes?.length) {
      obj.entityCodes = message.entityCodes;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutocompleteRequest>, I>>(base?: I): AutocompleteRequest {
    return AutocompleteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutocompleteRequest>, I>>(object: I): AutocompleteRequest {
    const message = createBaseAutocompleteRequest();
    message.q = object.q ?? "";
    message.entityCodes = object.entityCodes?.map((e) => e) || [];
    return message;
  },
};

function createBaseAutocompleteOptionNumberResponse(): AutocompleteOptionNumberResponse {
  return { options: [] };
}

export const AutocompleteOptionNumberResponse = {
  encode(message: AutocompleteOptionNumberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.options) {
      AutocompleteOptionNumberResponse_AutocompleteOptionNumber.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutocompleteOptionNumberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutocompleteOptionNumberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.options.push(
            AutocompleteOptionNumberResponse_AutocompleteOptionNumber.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutocompleteOptionNumberResponse {
    return {
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => AutocompleteOptionNumberResponse_AutocompleteOptionNumber.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AutocompleteOptionNumberResponse): unknown {
    const obj: any = {};
    if (message.options?.length) {
      obj.options = message.options.map((e) => AutocompleteOptionNumberResponse_AutocompleteOptionNumber.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutocompleteOptionNumberResponse>, I>>(
    base?: I,
  ): AutocompleteOptionNumberResponse {
    return AutocompleteOptionNumberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutocompleteOptionNumberResponse>, I>>(
    object: I,
  ): AutocompleteOptionNumberResponse {
    const message = createBaseAutocompleteOptionNumberResponse();
    message.options =
      object.options?.map((e) => AutocompleteOptionNumberResponse_AutocompleteOptionNumber.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAutocompleteOptionNumberResponse_AutocompleteOptionNumber(): AutocompleteOptionNumberResponse_AutocompleteOptionNumber {
  return { id: "0", text: "", desc: undefined, image: undefined };
}

export const AutocompleteOptionNumberResponse_AutocompleteOptionNumber = {
  encode(
    message: AutocompleteOptionNumberResponse_AutocompleteOptionNumber,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    if (message.desc !== undefined) {
      writer.uint32(26).string(message.desc);
    }
    if (message.image !== undefined) {
      writer.uint32(34).string(message.image);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutocompleteOptionNumberResponse_AutocompleteOptionNumber {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutocompleteOptionNumberResponse_AutocompleteOptionNumber();
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

          message.text = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.desc = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.image = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutocompleteOptionNumberResponse_AutocompleteOptionNumber {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      desc: isSet(object.desc) ? globalThis.String(object.desc) : undefined,
      image: isSet(object.image) ? globalThis.String(object.image) : undefined,
    };
  },

  toJSON(message: AutocompleteOptionNumberResponse_AutocompleteOptionNumber): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.text !== "") {
      obj.text = message.text;
    }
    if (message.desc !== undefined) {
      obj.desc = message.desc;
    }
    if (message.image !== undefined) {
      obj.image = message.image;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutocompleteOptionNumberResponse_AutocompleteOptionNumber>, I>>(
    base?: I,
  ): AutocompleteOptionNumberResponse_AutocompleteOptionNumber {
    return AutocompleteOptionNumberResponse_AutocompleteOptionNumber.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutocompleteOptionNumberResponse_AutocompleteOptionNumber>, I>>(
    object: I,
  ): AutocompleteOptionNumberResponse_AutocompleteOptionNumber {
    const message = createBaseAutocompleteOptionNumberResponse_AutocompleteOptionNumber();
    message.id = object.id ?? "0";
    message.text = object.text ?? "";
    message.desc = object.desc ?? undefined;
    message.image = object.image ?? undefined;
    return message;
  },
};

function createBaseAutocompleteOptionTextResponse(): AutocompleteOptionTextResponse {
  return { options: [] };
}

export const AutocompleteOptionTextResponse = {
  encode(message: AutocompleteOptionTextResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.options) {
      AutocompleteOptionTextResponse_AutocompleteOptionText.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutocompleteOptionTextResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutocompleteOptionTextResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.options.push(AutocompleteOptionTextResponse_AutocompleteOptionText.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutocompleteOptionTextResponse {
    return {
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => AutocompleteOptionTextResponse_AutocompleteOptionText.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AutocompleteOptionTextResponse): unknown {
    const obj: any = {};
    if (message.options?.length) {
      obj.options = message.options.map((e) => AutocompleteOptionTextResponse_AutocompleteOptionText.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutocompleteOptionTextResponse>, I>>(base?: I): AutocompleteOptionTextResponse {
    return AutocompleteOptionTextResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutocompleteOptionTextResponse>, I>>(
    object: I,
  ): AutocompleteOptionTextResponse {
    const message = createBaseAutocompleteOptionTextResponse();
    message.options =
      object.options?.map((e) => AutocompleteOptionTextResponse_AutocompleteOptionText.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAutocompleteOptionTextResponse_AutocompleteOptionText(): AutocompleteOptionTextResponse_AutocompleteOptionText {
  return { id: "", text: "", desc: undefined, image: undefined };
}

export const AutocompleteOptionTextResponse_AutocompleteOptionText = {
  encode(
    message: AutocompleteOptionTextResponse_AutocompleteOptionText,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.text !== "") {
      writer.uint32(18).string(message.text);
    }
    if (message.desc !== undefined) {
      writer.uint32(26).string(message.desc);
    }
    if (message.image !== undefined) {
      writer.uint32(34).string(message.image);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutocompleteOptionTextResponse_AutocompleteOptionText {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutocompleteOptionTextResponse_AutocompleteOptionText();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.desc = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.image = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AutocompleteOptionTextResponse_AutocompleteOptionText {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      text: isSet(object.text) ? globalThis.String(object.text) : "",
      desc: isSet(object.desc) ? globalThis.String(object.desc) : undefined,
      image: isSet(object.image) ? globalThis.String(object.image) : undefined,
    };
  },

  toJSON(message: AutocompleteOptionTextResponse_AutocompleteOptionText): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.text !== "") {
      obj.text = message.text;
    }
    if (message.desc !== undefined) {
      obj.desc = message.desc;
    }
    if (message.image !== undefined) {
      obj.image = message.image;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AutocompleteOptionTextResponse_AutocompleteOptionText>, I>>(
    base?: I,
  ): AutocompleteOptionTextResponse_AutocompleteOptionText {
    return AutocompleteOptionTextResponse_AutocompleteOptionText.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AutocompleteOptionTextResponse_AutocompleteOptionText>, I>>(
    object: I,
  ): AutocompleteOptionTextResponse_AutocompleteOptionText {
    const message = createBaseAutocompleteOptionTextResponse_AutocompleteOptionText();
    message.id = object.id ?? "";
    message.text = object.text ?? "";
    message.desc = object.desc ?? undefined;
    message.image = object.image ?? undefined;
    return message;
  },
};

function createBaseSaveNamedQueryRequest(): SaveNamedQueryRequest {
  return { title: "", description: "", filters: undefined, configCode: "" };
}

export const SaveNamedQueryRequest = {
  encode(message: SaveNamedQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.filters !== undefined) {
      GetListRequest_FilterGroup.encode(message.filters, writer.uint32(26).fork()).ldelim();
    }
    if (message.configCode !== "") {
      writer.uint32(34).string(message.configCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveNamedQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveNamedQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
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

          message.filters = GetListRequest_FilterGroup.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.configCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveNamedQueryRequest {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      filters: isSet(object.filters) ? GetListRequest_FilterGroup.fromJSON(object.filters) : undefined,
      configCode: isSet(object.configCode) ? globalThis.String(object.configCode) : "",
    };
  },

  toJSON(message: SaveNamedQueryRequest): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.filters !== undefined) {
      obj.filters = GetListRequest_FilterGroup.toJSON(message.filters);
    }
    if (message.configCode !== "") {
      obj.configCode = message.configCode;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveNamedQueryRequest>, I>>(base?: I): SaveNamedQueryRequest {
    return SaveNamedQueryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveNamedQueryRequest>, I>>(object: I): SaveNamedQueryRequest {
    const message = createBaseSaveNamedQueryRequest();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.filters = (object.filters !== undefined && object.filters !== null)
      ? GetListRequest_FilterGroup.fromPartial(object.filters)
      : undefined;
    message.configCode = object.configCode ?? "";
    return message;
  },
};

function createBaseDeleteNamedQueryRequest(): DeleteNamedQueryRequest {
  return { id: "0" };
}

export const DeleteNamedQueryRequest = {
  encode(message: DeleteNamedQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNamedQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteNamedQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteNamedQueryRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "0" };
  },

  toJSON(message: DeleteNamedQueryRequest): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteNamedQueryRequest>, I>>(base?: I): DeleteNamedQueryRequest {
    return DeleteNamedQueryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteNamedQueryRequest>, I>>(object: I): DeleteNamedQueryRequest {
    const message = createBaseDeleteNamedQueryRequest();
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseSearchAfter(): SearchAfter {
  return { token: "" };
}

export const SearchAfter = {
  encode(message: SearchAfter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchAfter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchAfter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchAfter {
    return { token: isSet(object.token) ? globalThis.String(object.token) : "" };
  },

  toJSON(message: SearchAfter): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchAfter>, I>>(base?: I): SearchAfter {
    return SearchAfter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchAfter>, I>>(object: I): SearchAfter {
    const message = createBaseSearchAfter();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseSearchAfterRequest(): SearchAfterRequest {
  return { filters: undefined, searchAfter: undefined, limit: 0 };
}

export const SearchAfterRequest = {
  encode(message: SearchAfterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filters !== undefined) {
      GetListRequest_FilterGroup.encode(message.filters, writer.uint32(10).fork()).ldelim();
    }
    if (message.searchAfter !== undefined) {
      SearchAfter.encode(message.searchAfter, writer.uint32(18).fork()).ldelim();
    }
    if (message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchAfterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchAfterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filters = GetListRequest_FilterGroup.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.searchAfter = SearchAfter.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchAfterRequest {
    return {
      filters: isSet(object.filters) ? GetListRequest_FilterGroup.fromJSON(object.filters) : undefined,
      searchAfter: isSet(object.searchAfter) ? SearchAfter.fromJSON(object.searchAfter) : undefined,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
    };
  },

  toJSON(message: SearchAfterRequest): unknown {
    const obj: any = {};
    if (message.filters !== undefined) {
      obj.filters = GetListRequest_FilterGroup.toJSON(message.filters);
    }
    if (message.searchAfter !== undefined) {
      obj.searchAfter = SearchAfter.toJSON(message.searchAfter);
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchAfterRequest>, I>>(base?: I): SearchAfterRequest {
    return SearchAfterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchAfterRequest>, I>>(object: I): SearchAfterRequest {
    const message = createBaseSearchAfterRequest();
    message.filters = (object.filters !== undefined && object.filters !== null)
      ? GetListRequest_FilterGroup.fromPartial(object.filters)
      : undefined;
    message.searchAfter = (object.searchAfter !== undefined && object.searchAfter !== null)
      ? SearchAfter.fromPartial(object.searchAfter)
      : undefined;
    message.limit = object.limit ?? 0;
    return message;
  },
};

function createBaseSearchAfterResponse(): SearchAfterResponse {
  return { searchAfter: undefined };
}

export const SearchAfterResponse = {
  encode(message: SearchAfterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.searchAfter !== undefined) {
      SearchAfter.encode(message.searchAfter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchAfterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchAfterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.searchAfter = SearchAfter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchAfterResponse {
    return { searchAfter: isSet(object.searchAfter) ? SearchAfter.fromJSON(object.searchAfter) : undefined };
  },

  toJSON(message: SearchAfterResponse): unknown {
    const obj: any = {};
    if (message.searchAfter !== undefined) {
      obj.searchAfter = SearchAfter.toJSON(message.searchAfter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchAfterResponse>, I>>(base?: I): SearchAfterResponse {
    return SearchAfterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchAfterResponse>, I>>(object: I): SearchAfterResponse {
    const message = createBaseSearchAfterResponse();
    message.searchAfter = (object.searchAfter !== undefined && object.searchAfter !== null)
      ? SearchAfter.fromPartial(object.searchAfter)
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
