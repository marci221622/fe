/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Image } from "../common/image.v1";
import { Money } from "../common/money.v1";
import { PaginationInfo, ResponseMeta } from "../common/search_kit.v1";
import { Timestamp } from "../google/protobuf/timestamp";
import { Address } from "./entities/address.v1";
import { Contact } from "./entities/contact.v1";
import { Item } from "./entities/item.v1";
import { Seller } from "./entities/seller.v1";
import { SessionData } from "./entities/session_data.v1";
import { Sort, sortFromJSON, sortToJSON } from "./enums/sort";

export const protobufPackage = "utp.customer_hub_service.v1";

/** @deprecated */
export interface CustomerData {
  userId: string;
  parentId?: string | undefined;
  preferredAddressId: string;
}

/** @deprecated */
export interface Customer {
  id: string;
  data: CustomerData | undefined;
}

/** @deprecated */
export interface GetCustomerRequest {
  id: string;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface GetCustomerResponse {
  customer: Customer | undefined;
}

/** @deprecated */
export interface CreateCustomerRequest {
  data: CustomerData | undefined;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface CreateCustomerResponse {
  customer: Customer | undefined;
}

/** @deprecated */
export interface UpdateCustomerRequest {
  customer: Customer | undefined;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface UpdateCustomerResponse {
  customer: Customer | undefined;
}

export interface CustomerAddressData {
  customerId: string;
  addressId: string;
}

export interface CustomerAddress {
  id: string;
  data: CustomerAddressData | undefined;
}

/** @deprecated */
export interface GetCustomerAddressRequest {
  id: string;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface GetCustomerAddressResponse {
  customerAddress: CustomerAddress | undefined;
}

/** @deprecated */
export interface ListCustomerAddressesRequest {
  customerId: string;
  pagination: PaginationInfo | undefined;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface ListCustomerAddressesResponse {
  customerAddress: CustomerAddress[];
}

/** @deprecated */
export interface CreateCustomerAddressRequest {
  data: CustomerAddressData | undefined;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface CreateCustomerAddressResponse {
  customerAddress: CustomerAddress | undefined;
}

/** @deprecated */
export interface UpdateCustomerAddressRequest {
  customerAddress: CustomerAddress | undefined;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface UpdateCustomerAddressResponse {
  customerAddress: CustomerAddress | undefined;
}

/** @deprecated */
export interface DeleteCustomerAddressRequest {
  id: string;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface UpdateCustomerProfileRequest {
  customerId: string;
  firstName: string;
  secondName: string;
  lastName: string;
  login: string;
  preferredContactId: string;
  contacts: Contact[];
  sessionData?: SessionData | undefined;
}

/** @deprecated */
export interface GetFavoriteBrandsRequest {
  customerId: string;
  sessionData?: SessionData | undefined;
}

/** @deprecated */
export interface FavoriteBrandsResponse {
  brands: BrandID[];
}

export interface BrandID {
  id: string;
}

/** @deprecated */
export interface GetOffersByBidIdRequest {
  accessToken: string;
  bidId: string;
  sessionData: SessionData | undefined;
}

/** @deprecated */
export interface GetOffersByBidIdResponse {
  offers: Offer[];
}

/** @deprecated */
export interface Offer {
  id: string;
  offerCode: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  price: Money | undefined;
  sellerId: string;
  itemId: string;
}

/** @deprecated */
export interface OfferItem {
  title: string;
  categoryId: string;
  brandId: string;
  description: string;
  photoIds: string[];
  seller: Seller | undefined;
}

/** @deprecated */
export interface CreateOfferRequest {
  bidId: string;
  itemId: string;
  sessionData:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/** @deprecated */
export interface CreateOfferResponse {
  offerId: string;
  sessionData?: SessionData | undefined;
}

/** @deprecated */
export interface CheckTokenRequest {
  sessionData?:
    | SessionData
    | undefined;
  /** @deprecated */
  accessToken: string;
}

/**
 * ====Models for Deprecated API (getItemsList, getItemsListConfig). TODO remove someday
 *
 * @deprecated
 */
export interface GetItemListConfigResponse {
  brands: ItemTagInfo[];
  collections: ItemTagInfo[];
  colors: ItemTagInfo[];
  sizes: ItemTagInfo[];
  filters: FilterGetItemListResponse[];
  fulltext?: string | undefined;
  sort: SortTagInfo[];
}

/** @deprecated */
export interface ItemTagInfo {
  code: string;
  title: string;
  selected: boolean;
  /** только для colors */
  hex?: string | undefined;
  images?: Image | undefined;
}

/** @deprecated */
export interface SortTagInfo {
  code: Sort;
  title: string;
  selected: boolean;
}

/** @deprecated */
export interface FilterGetItemListResponse {
  code: string;
  title: string;
  domainValues: DomainValues[];
}

/** @deprecated */
export interface DomainValues {
  value: string;
  selected: boolean;
}

/** @deprecated */
export interface GetItemListRequest {
  brands: string[];
  collections: string[];
  colors: string[];
  sizes: string[];
  filters: FilterGetItemListRequest[];
  fulltext?: string | undefined;
  sort?: Sort | undefined;
  sessionData: SessionData | undefined;
  pagination:
    | GetItemListRequest_Pagination
    | undefined;
  /** @deprecated */
  accessToken?: string | undefined;
}

/** @deprecated */
export interface GetItemListRequest_Pagination {
  page: string;
  perPage: number;
}

/** @deprecated */
export interface FilterGetItemListRequest {
  code: string;
  domainValues: string[];
}

/** @deprecated */
export interface GetItemListResponse {
  searchkitMeta: ResponseMeta | undefined;
  data: Item[];
}

/** @deprecated */
export interface GetAddressRequest {
  id: string;
  sessionData?: SessionData | undefined;
}

/** @deprecated */
export interface GetAddressResponse {
  address: Address | undefined;
}

/** @deprecated */
export interface ListAddressesRequest {
  accessToken: string;
  ids: string[];
  limit: string;
  offset: string;
  sessionData: SessionData | undefined;
}

/** @deprecated */
export interface ListAddressesResponse {
  addresses: Address[];
}

function createBaseCustomerData(): CustomerData {
  return { userId: "0", parentId: undefined, preferredAddressId: "0" };
}

export const CustomerData = {
  encode(message: CustomerData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).int64(message.userId);
    }
    if (message.parentId !== undefined) {
      writer.uint32(16).int64(message.parentId);
    }
    if (message.preferredAddressId !== "0") {
      writer.uint32(24).int64(message.preferredAddressId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.parentId = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.preferredAddressId = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerData {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "0",
      parentId: isSet(object.parentId) ? globalThis.String(object.parentId) : undefined,
      preferredAddressId: isSet(object.preferredAddressId) ? globalThis.String(object.preferredAddressId) : "0",
    };
  },

  toJSON(message: CustomerData): unknown {
    const obj: any = {};
    if (message.userId !== "0") {
      obj.userId = message.userId;
    }
    if (message.parentId !== undefined) {
      obj.parentId = message.parentId;
    }
    if (message.preferredAddressId !== "0") {
      obj.preferredAddressId = message.preferredAddressId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerData>, I>>(base?: I): CustomerData {
    return CustomerData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerData>, I>>(object: I): CustomerData {
    const message = createBaseCustomerData();
    message.userId = object.userId ?? "0";
    message.parentId = object.parentId ?? undefined;
    message.preferredAddressId = object.preferredAddressId ?? "0";
    return message;
  },
};

function createBaseCustomer(): Customer {
  return { id: "0", data: undefined };
}

export const Customer = {
  encode(message: Customer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.data !== undefined) {
      CustomerData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Customer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomer();
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

          message.data = CustomerData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Customer {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      data: isSet(object.data) ? CustomerData.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: Customer): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.data !== undefined) {
      obj.data = CustomerData.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Customer>, I>>(base?: I): Customer {
    return Customer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Customer>, I>>(object: I): Customer {
    const message = createBaseCustomer();
    message.id = object.id ?? "0";
    message.data = (object.data !== undefined && object.data !== null)
      ? CustomerData.fromPartial(object.data)
      : undefined;
    return message;
  },
};

function createBaseGetCustomerRequest(): GetCustomerRequest {
  return { id: "0", sessionData: undefined, accessToken: "" };
}

export const GetCustomerRequest = {
  encode(message: GetCustomerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(16).int64(message.id);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: GetCustomerRequest): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerRequest>, I>>(base?: I): GetCustomerRequest {
    return GetCustomerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerRequest>, I>>(object: I): GetCustomerRequest {
    const message = createBaseGetCustomerRequest();
    message.id = object.id ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseGetCustomerResponse(): GetCustomerResponse {
  return { customer: undefined };
}

export const GetCustomerResponse = {
  encode(message: GetCustomerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customer !== undefined) {
      Customer.encode(message.customer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customer = Customer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerResponse {
    return { customer: isSet(object.customer) ? Customer.fromJSON(object.customer) : undefined };
  },

  toJSON(message: GetCustomerResponse): unknown {
    const obj: any = {};
    if (message.customer !== undefined) {
      obj.customer = Customer.toJSON(message.customer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerResponse>, I>>(base?: I): GetCustomerResponse {
    return GetCustomerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerResponse>, I>>(object: I): GetCustomerResponse {
    const message = createBaseGetCustomerResponse();
    message.customer = (object.customer !== undefined && object.customer !== null)
      ? Customer.fromPartial(object.customer)
      : undefined;
    return message;
  },
};

function createBaseCreateCustomerRequest(): CreateCustomerRequest {
  return { data: undefined, sessionData: undefined, accessToken: "" };
}

export const CreateCustomerRequest = {
  encode(message: CreateCustomerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== undefined) {
      CustomerData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCustomerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCustomerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = CustomerData.decode(reader, reader.uint32());
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCustomerRequest {
    return {
      data: isSet(object.data) ? CustomerData.fromJSON(object.data) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: CreateCustomerRequest): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = CustomerData.toJSON(message.data);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCustomerRequest>, I>>(base?: I): CreateCustomerRequest {
    return CreateCustomerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCustomerRequest>, I>>(object: I): CreateCustomerRequest {
    const message = createBaseCreateCustomerRequest();
    message.data = (object.data !== undefined && object.data !== null)
      ? CustomerData.fromPartial(object.data)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseCreateCustomerResponse(): CreateCustomerResponse {
  return { customer: undefined };
}

export const CreateCustomerResponse = {
  encode(message: CreateCustomerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customer !== undefined) {
      Customer.encode(message.customer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCustomerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCustomerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customer = Customer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCustomerResponse {
    return { customer: isSet(object.customer) ? Customer.fromJSON(object.customer) : undefined };
  },

  toJSON(message: CreateCustomerResponse): unknown {
    const obj: any = {};
    if (message.customer !== undefined) {
      obj.customer = Customer.toJSON(message.customer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCustomerResponse>, I>>(base?: I): CreateCustomerResponse {
    return CreateCustomerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCustomerResponse>, I>>(object: I): CreateCustomerResponse {
    const message = createBaseCreateCustomerResponse();
    message.customer = (object.customer !== undefined && object.customer !== null)
      ? Customer.fromPartial(object.customer)
      : undefined;
    return message;
  },
};

function createBaseUpdateCustomerRequest(): UpdateCustomerRequest {
  return { customer: undefined, sessionData: undefined, accessToken: "" };
}

export const UpdateCustomerRequest = {
  encode(message: UpdateCustomerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customer !== undefined) {
      Customer.encode(message.customer, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCustomerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCustomerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.customer = Customer.decode(reader, reader.uint32());
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCustomerRequest {
    return {
      customer: isSet(object.customer) ? Customer.fromJSON(object.customer) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: UpdateCustomerRequest): unknown {
    const obj: any = {};
    if (message.customer !== undefined) {
      obj.customer = Customer.toJSON(message.customer);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCustomerRequest>, I>>(base?: I): UpdateCustomerRequest {
    return UpdateCustomerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCustomerRequest>, I>>(object: I): UpdateCustomerRequest {
    const message = createBaseUpdateCustomerRequest();
    message.customer = (object.customer !== undefined && object.customer !== null)
      ? Customer.fromPartial(object.customer)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseUpdateCustomerResponse(): UpdateCustomerResponse {
  return { customer: undefined };
}

export const UpdateCustomerResponse = {
  encode(message: UpdateCustomerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customer !== undefined) {
      Customer.encode(message.customer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCustomerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCustomerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customer = Customer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCustomerResponse {
    return { customer: isSet(object.customer) ? Customer.fromJSON(object.customer) : undefined };
  },

  toJSON(message: UpdateCustomerResponse): unknown {
    const obj: any = {};
    if (message.customer !== undefined) {
      obj.customer = Customer.toJSON(message.customer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCustomerResponse>, I>>(base?: I): UpdateCustomerResponse {
    return UpdateCustomerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCustomerResponse>, I>>(object: I): UpdateCustomerResponse {
    const message = createBaseUpdateCustomerResponse();
    message.customer = (object.customer !== undefined && object.customer !== null)
      ? Customer.fromPartial(object.customer)
      : undefined;
    return message;
  },
};

function createBaseCustomerAddressData(): CustomerAddressData {
  return { customerId: "0", addressId: "0" };
}

export const CustomerAddressData = {
  encode(message: CustomerAddressData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerId !== "0") {
      writer.uint32(8).int64(message.customerId);
    }
    if (message.addressId !== "0") {
      writer.uint32(16).int64(message.addressId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerAddressData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerAddressData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.customerId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.addressId = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerAddressData {
    return {
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : "0",
      addressId: isSet(object.addressId) ? globalThis.String(object.addressId) : "0",
    };
  },

  toJSON(message: CustomerAddressData): unknown {
    const obj: any = {};
    if (message.customerId !== "0") {
      obj.customerId = message.customerId;
    }
    if (message.addressId !== "0") {
      obj.addressId = message.addressId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerAddressData>, I>>(base?: I): CustomerAddressData {
    return CustomerAddressData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerAddressData>, I>>(object: I): CustomerAddressData {
    const message = createBaseCustomerAddressData();
    message.customerId = object.customerId ?? "0";
    message.addressId = object.addressId ?? "0";
    return message;
  },
};

function createBaseCustomerAddress(): CustomerAddress {
  return { id: "0", data: undefined };
}

export const CustomerAddress = {
  encode(message: CustomerAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.data !== undefined) {
      CustomerAddressData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CustomerAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCustomerAddress();
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

          message.data = CustomerAddressData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CustomerAddress {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      data: isSet(object.data) ? CustomerAddressData.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: CustomerAddress): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.data !== undefined) {
      obj.data = CustomerAddressData.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CustomerAddress>, I>>(base?: I): CustomerAddress {
    return CustomerAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CustomerAddress>, I>>(object: I): CustomerAddress {
    const message = createBaseCustomerAddress();
    message.id = object.id ?? "0";
    message.data = (object.data !== undefined && object.data !== null)
      ? CustomerAddressData.fromPartial(object.data)
      : undefined;
    return message;
  },
};

function createBaseGetCustomerAddressRequest(): GetCustomerAddressRequest {
  return { id: "0", sessionData: undefined, accessToken: "" };
}

export const GetCustomerAddressRequest = {
  encode(message: GetCustomerAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(16).int64(message.id);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerAddressRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: GetCustomerAddressRequest): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerAddressRequest>, I>>(base?: I): GetCustomerAddressRequest {
    return GetCustomerAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerAddressRequest>, I>>(object: I): GetCustomerAddressRequest {
    const message = createBaseGetCustomerAddressRequest();
    message.id = object.id ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseGetCustomerAddressResponse(): GetCustomerAddressResponse {
  return { customerAddress: undefined };
}

export const GetCustomerAddressResponse = {
  encode(message: GetCustomerAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerAddress !== undefined) {
      CustomerAddress.encode(message.customerAddress, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCustomerAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCustomerAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customerAddress = CustomerAddress.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCustomerAddressResponse {
    return {
      customerAddress: isSet(object.customerAddress) ? CustomerAddress.fromJSON(object.customerAddress) : undefined,
    };
  },

  toJSON(message: GetCustomerAddressResponse): unknown {
    const obj: any = {};
    if (message.customerAddress !== undefined) {
      obj.customerAddress = CustomerAddress.toJSON(message.customerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCustomerAddressResponse>, I>>(base?: I): GetCustomerAddressResponse {
    return GetCustomerAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCustomerAddressResponse>, I>>(object: I): GetCustomerAddressResponse {
    const message = createBaseGetCustomerAddressResponse();
    message.customerAddress = (object.customerAddress !== undefined && object.customerAddress !== null)
      ? CustomerAddress.fromPartial(object.customerAddress)
      : undefined;
    return message;
  },
};

function createBaseListCustomerAddressesRequest(): ListCustomerAddressesRequest {
  return { customerId: "", pagination: undefined, sessionData: undefined, accessToken: "" };
}

export const ListCustomerAddressesRequest = {
  encode(message: ListCustomerAddressesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerId !== "") {
      writer.uint32(18).string(message.customerId);
    }
    if (message.pagination !== undefined) {
      PaginationInfo.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCustomerAddressesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCustomerAddressesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.customerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = PaginationInfo.decode(reader, reader.uint32());
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListCustomerAddressesRequest {
    return {
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : "",
      pagination: isSet(object.pagination) ? PaginationInfo.fromJSON(object.pagination) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: ListCustomerAddressesRequest): unknown {
    const obj: any = {};
    if (message.customerId !== "") {
      obj.customerId = message.customerId;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PaginationInfo.toJSON(message.pagination);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListCustomerAddressesRequest>, I>>(base?: I): ListCustomerAddressesRequest {
    return ListCustomerAddressesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListCustomerAddressesRequest>, I>>(object: I): ListCustomerAddressesRequest {
    const message = createBaseListCustomerAddressesRequest();
    message.customerId = object.customerId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PaginationInfo.fromPartial(object.pagination)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseListCustomerAddressesResponse(): ListCustomerAddressesResponse {
  return { customerAddress: [] };
}

export const ListCustomerAddressesResponse = {
  encode(message: ListCustomerAddressesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.customerAddress) {
      CustomerAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCustomerAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCustomerAddressesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customerAddress.push(CustomerAddress.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListCustomerAddressesResponse {
    return {
      customerAddress: globalThis.Array.isArray(object?.customerAddress)
        ? object.customerAddress.map((e: any) => CustomerAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListCustomerAddressesResponse): unknown {
    const obj: any = {};
    if (message.customerAddress?.length) {
      obj.customerAddress = message.customerAddress.map((e) => CustomerAddress.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListCustomerAddressesResponse>, I>>(base?: I): ListCustomerAddressesResponse {
    return ListCustomerAddressesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListCustomerAddressesResponse>, I>>(
    object: I,
  ): ListCustomerAddressesResponse {
    const message = createBaseListCustomerAddressesResponse();
    message.customerAddress = object.customerAddress?.map((e) => CustomerAddress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateCustomerAddressRequest(): CreateCustomerAddressRequest {
  return { data: undefined, sessionData: undefined, accessToken: "" };
}

export const CreateCustomerAddressRequest = {
  encode(message: CreateCustomerAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== undefined) {
      CustomerAddressData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCustomerAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCustomerAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = CustomerAddressData.decode(reader, reader.uint32());
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCustomerAddressRequest {
    return {
      data: isSet(object.data) ? CustomerAddressData.fromJSON(object.data) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: CreateCustomerAddressRequest): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = CustomerAddressData.toJSON(message.data);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCustomerAddressRequest>, I>>(base?: I): CreateCustomerAddressRequest {
    return CreateCustomerAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCustomerAddressRequest>, I>>(object: I): CreateCustomerAddressRequest {
    const message = createBaseCreateCustomerAddressRequest();
    message.data = (object.data !== undefined && object.data !== null)
      ? CustomerAddressData.fromPartial(object.data)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseCreateCustomerAddressResponse(): CreateCustomerAddressResponse {
  return { customerAddress: undefined };
}

export const CreateCustomerAddressResponse = {
  encode(message: CreateCustomerAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerAddress !== undefined) {
      CustomerAddress.encode(message.customerAddress, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCustomerAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCustomerAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customerAddress = CustomerAddress.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCustomerAddressResponse {
    return {
      customerAddress: isSet(object.customerAddress) ? CustomerAddress.fromJSON(object.customerAddress) : undefined,
    };
  },

  toJSON(message: CreateCustomerAddressResponse): unknown {
    const obj: any = {};
    if (message.customerAddress !== undefined) {
      obj.customerAddress = CustomerAddress.toJSON(message.customerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCustomerAddressResponse>, I>>(base?: I): CreateCustomerAddressResponse {
    return CreateCustomerAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCustomerAddressResponse>, I>>(
    object: I,
  ): CreateCustomerAddressResponse {
    const message = createBaseCreateCustomerAddressResponse();
    message.customerAddress = (object.customerAddress !== undefined && object.customerAddress !== null)
      ? CustomerAddress.fromPartial(object.customerAddress)
      : undefined;
    return message;
  },
};

function createBaseUpdateCustomerAddressRequest(): UpdateCustomerAddressRequest {
  return { customerAddress: undefined, sessionData: undefined, accessToken: "" };
}

export const UpdateCustomerAddressRequest = {
  encode(message: UpdateCustomerAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerAddress !== undefined) {
      CustomerAddress.encode(message.customerAddress, writer.uint32(18).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCustomerAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCustomerAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.customerAddress = CustomerAddress.decode(reader, reader.uint32());
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCustomerAddressRequest {
    return {
      customerAddress: isSet(object.customerAddress) ? CustomerAddress.fromJSON(object.customerAddress) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: UpdateCustomerAddressRequest): unknown {
    const obj: any = {};
    if (message.customerAddress !== undefined) {
      obj.customerAddress = CustomerAddress.toJSON(message.customerAddress);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCustomerAddressRequest>, I>>(base?: I): UpdateCustomerAddressRequest {
    return UpdateCustomerAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCustomerAddressRequest>, I>>(object: I): UpdateCustomerAddressRequest {
    const message = createBaseUpdateCustomerAddressRequest();
    message.customerAddress = (object.customerAddress !== undefined && object.customerAddress !== null)
      ? CustomerAddress.fromPartial(object.customerAddress)
      : undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseUpdateCustomerAddressResponse(): UpdateCustomerAddressResponse {
  return { customerAddress: undefined };
}

export const UpdateCustomerAddressResponse = {
  encode(message: UpdateCustomerAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerAddress !== undefined) {
      CustomerAddress.encode(message.customerAddress, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCustomerAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCustomerAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.customerAddress = CustomerAddress.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCustomerAddressResponse {
    return {
      customerAddress: isSet(object.customerAddress) ? CustomerAddress.fromJSON(object.customerAddress) : undefined,
    };
  },

  toJSON(message: UpdateCustomerAddressResponse): unknown {
    const obj: any = {};
    if (message.customerAddress !== undefined) {
      obj.customerAddress = CustomerAddress.toJSON(message.customerAddress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCustomerAddressResponse>, I>>(base?: I): UpdateCustomerAddressResponse {
    return UpdateCustomerAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCustomerAddressResponse>, I>>(
    object: I,
  ): UpdateCustomerAddressResponse {
    const message = createBaseUpdateCustomerAddressResponse();
    message.customerAddress = (object.customerAddress !== undefined && object.customerAddress !== null)
      ? CustomerAddress.fromPartial(object.customerAddress)
      : undefined;
    return message;
  },
};

function createBaseDeleteCustomerAddressRequest(): DeleteCustomerAddressRequest {
  return { id: "0", sessionData: undefined, accessToken: "" };
}

export const DeleteCustomerAddressRequest = {
  encode(message: DeleteCustomerAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(16).int64(message.id);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCustomerAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCustomerAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = longToString(reader.int64() as Long);
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteCustomerAddressRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: DeleteCustomerAddressRequest): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCustomerAddressRequest>, I>>(base?: I): DeleteCustomerAddressRequest {
    return DeleteCustomerAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteCustomerAddressRequest>, I>>(object: I): DeleteCustomerAddressRequest {
    const message = createBaseDeleteCustomerAddressRequest();
    message.id = object.id ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseUpdateCustomerProfileRequest(): UpdateCustomerProfileRequest {
  return {
    customerId: "0",
    firstName: "",
    secondName: "",
    lastName: "",
    login: "",
    preferredContactId: "0",
    contacts: [],
    sessionData: undefined,
  };
}

export const UpdateCustomerProfileRequest = {
  encode(message: UpdateCustomerProfileRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerId !== "0") {
      writer.uint32(8).int64(message.customerId);
    }
    if (message.firstName !== "") {
      writer.uint32(18).string(message.firstName);
    }
    if (message.secondName !== "") {
      writer.uint32(26).string(message.secondName);
    }
    if (message.lastName !== "") {
      writer.uint32(34).string(message.lastName);
    }
    if (message.login !== "") {
      writer.uint32(42).string(message.login);
    }
    if (message.preferredContactId !== "0") {
      writer.uint32(48).int64(message.preferredContactId);
    }
    for (const v of message.contacts) {
      Contact.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCustomerProfileRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCustomerProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.customerId = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.secondName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.login = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.preferredContactId = longToString(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.contacts.push(Contact.decode(reader, reader.uint32()));
          continue;
        case 1024:
          if (tag !== 8194) {
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

  fromJSON(object: any): UpdateCustomerProfileRequest {
    return {
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : "0",
      firstName: isSet(object.firstName) ? globalThis.String(object.firstName) : "",
      secondName: isSet(object.secondName) ? globalThis.String(object.secondName) : "",
      lastName: isSet(object.lastName) ? globalThis.String(object.lastName) : "",
      login: isSet(object.login) ? globalThis.String(object.login) : "",
      preferredContactId: isSet(object.preferredContactId) ? globalThis.String(object.preferredContactId) : "0",
      contacts: globalThis.Array.isArray(object?.contacts) ? object.contacts.map((e: any) => Contact.fromJSON(e)) : [],
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: UpdateCustomerProfileRequest): unknown {
    const obj: any = {};
    if (message.customerId !== "0") {
      obj.customerId = message.customerId;
    }
    if (message.firstName !== "") {
      obj.firstName = message.firstName;
    }
    if (message.secondName !== "") {
      obj.secondName = message.secondName;
    }
    if (message.lastName !== "") {
      obj.lastName = message.lastName;
    }
    if (message.login !== "") {
      obj.login = message.login;
    }
    if (message.preferredContactId !== "0") {
      obj.preferredContactId = message.preferredContactId;
    }
    if (message.contacts?.length) {
      obj.contacts = message.contacts.map((e) => Contact.toJSON(e));
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCustomerProfileRequest>, I>>(base?: I): UpdateCustomerProfileRequest {
    return UpdateCustomerProfileRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCustomerProfileRequest>, I>>(object: I): UpdateCustomerProfileRequest {
    const message = createBaseUpdateCustomerProfileRequest();
    message.customerId = object.customerId ?? "0";
    message.firstName = object.firstName ?? "";
    message.secondName = object.secondName ?? "";
    message.lastName = object.lastName ?? "";
    message.login = object.login ?? "";
    message.preferredContactId = object.preferredContactId ?? "0";
    message.contacts = object.contacts?.map((e) => Contact.fromPartial(e)) || [];
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetFavoriteBrandsRequest(): GetFavoriteBrandsRequest {
  return { customerId: "0", sessionData: undefined };
}

export const GetFavoriteBrandsRequest = {
  encode(message: GetFavoriteBrandsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.customerId !== "0") {
      writer.uint32(8).int64(message.customerId);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFavoriteBrandsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFavoriteBrandsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.customerId = longToString(reader.int64() as Long);
          continue;
        case 1024:
          if (tag !== 8194) {
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

  fromJSON(object: any): GetFavoriteBrandsRequest {
    return {
      customerId: isSet(object.customerId) ? globalThis.String(object.customerId) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetFavoriteBrandsRequest): unknown {
    const obj: any = {};
    if (message.customerId !== "0") {
      obj.customerId = message.customerId;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFavoriteBrandsRequest>, I>>(base?: I): GetFavoriteBrandsRequest {
    return GetFavoriteBrandsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFavoriteBrandsRequest>, I>>(object: I): GetFavoriteBrandsRequest {
    const message = createBaseGetFavoriteBrandsRequest();
    message.customerId = object.customerId ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseFavoriteBrandsResponse(): FavoriteBrandsResponse {
  return { brands: [] };
}

export const FavoriteBrandsResponse = {
  encode(message: FavoriteBrandsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.brands) {
      BrandID.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FavoriteBrandsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFavoriteBrandsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brands.push(BrandID.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FavoriteBrandsResponse {
    return {
      brands: globalThis.Array.isArray(object?.brands) ? object.brands.map((e: any) => BrandID.fromJSON(e)) : [],
    };
  },

  toJSON(message: FavoriteBrandsResponse): unknown {
    const obj: any = {};
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => BrandID.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FavoriteBrandsResponse>, I>>(base?: I): FavoriteBrandsResponse {
    return FavoriteBrandsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FavoriteBrandsResponse>, I>>(object: I): FavoriteBrandsResponse {
    const message = createBaseFavoriteBrandsResponse();
    message.brands = object.brands?.map((e) => BrandID.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBrandID(): BrandID {
  return { id: "0" };
}

export const BrandID = {
  encode(message: BrandID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BrandID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBrandID();
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

  fromJSON(object: any): BrandID {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "0" };
  },

  toJSON(message: BrandID): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BrandID>, I>>(base?: I): BrandID {
    return BrandID.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BrandID>, I>>(object: I): BrandID {
    const message = createBaseBrandID();
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseGetOffersByBidIdRequest(): GetOffersByBidIdRequest {
  return { accessToken: "", bidId: "0", sessionData: undefined };
}

export const GetOffersByBidIdRequest = {
  encode(message: GetOffersByBidIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.bidId !== "0") {
      writer.uint32(16).int64(message.bidId);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOffersByBidIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOffersByBidIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bidId = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): GetOffersByBidIdRequest {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      bidId: isSet(object.bidId) ? globalThis.String(object.bidId) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetOffersByBidIdRequest): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.bidId !== "0") {
      obj.bidId = message.bidId;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOffersByBidIdRequest>, I>>(base?: I): GetOffersByBidIdRequest {
    return GetOffersByBidIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOffersByBidIdRequest>, I>>(object: I): GetOffersByBidIdRequest {
    const message = createBaseGetOffersByBidIdRequest();
    message.accessToken = object.accessToken ?? "";
    message.bidId = object.bidId ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetOffersByBidIdResponse(): GetOffersByBidIdResponse {
  return { offers: [] };
}

export const GetOffersByBidIdResponse = {
  encode(message: GetOffersByBidIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.offers) {
      Offer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOffersByBidIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOffersByBidIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.offers.push(Offer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOffersByBidIdResponse {
    return { offers: globalThis.Array.isArray(object?.offers) ? object.offers.map((e: any) => Offer.fromJSON(e)) : [] };
  },

  toJSON(message: GetOffersByBidIdResponse): unknown {
    const obj: any = {};
    if (message.offers?.length) {
      obj.offers = message.offers.map((e) => Offer.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOffersByBidIdResponse>, I>>(base?: I): GetOffersByBidIdResponse {
    return GetOffersByBidIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOffersByBidIdResponse>, I>>(object: I): GetOffersByBidIdResponse {
    const message = createBaseGetOffersByBidIdResponse();
    message.offers = object.offers?.map((e) => Offer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOffer(): Offer {
  return {
    id: "0",
    offerCode: "",
    dateFrom: undefined,
    dateTo: undefined,
    price: undefined,
    sellerId: "0",
    itemId: "0",
  };
}

export const Offer = {
  encode(message: Offer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.offerCode !== "") {
      writer.uint32(18).string(message.offerCode);
    }
    if (message.dateFrom !== undefined) {
      Timestamp.encode(toTimestamp(message.dateFrom), writer.uint32(26).fork()).ldelim();
    }
    if (message.dateTo !== undefined) {
      Timestamp.encode(toTimestamp(message.dateTo), writer.uint32(34).fork()).ldelim();
    }
    if (message.price !== undefined) {
      Money.encode(message.price, writer.uint32(42).fork()).ldelim();
    }
    if (message.sellerId !== "0") {
      writer.uint32(48).int64(message.sellerId);
    }
    if (message.itemId !== "0") {
      writer.uint32(56).int64(message.itemId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Offer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOffer();
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

          message.offerCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dateFrom = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.dateTo = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.price = Money.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.sellerId = longToString(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.itemId = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Offer {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      offerCode: isSet(object.offerCode) ? globalThis.String(object.offerCode) : "",
      dateFrom: isSet(object.dateFrom) ? fromJsonTimestamp(object.dateFrom) : undefined,
      dateTo: isSet(object.dateTo) ? fromJsonTimestamp(object.dateTo) : undefined,
      price: isSet(object.price) ? Money.fromJSON(object.price) : undefined,
      sellerId: isSet(object.sellerId) ? globalThis.String(object.sellerId) : "0",
      itemId: isSet(object.itemId) ? globalThis.String(object.itemId) : "0",
    };
  },

  toJSON(message: Offer): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.offerCode !== "") {
      obj.offerCode = message.offerCode;
    }
    if (message.dateFrom !== undefined) {
      obj.dateFrom = message.dateFrom.toISOString();
    }
    if (message.dateTo !== undefined) {
      obj.dateTo = message.dateTo.toISOString();
    }
    if (message.price !== undefined) {
      obj.price = Money.toJSON(message.price);
    }
    if (message.sellerId !== "0") {
      obj.sellerId = message.sellerId;
    }
    if (message.itemId !== "0") {
      obj.itemId = message.itemId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Offer>, I>>(base?: I): Offer {
    return Offer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Offer>, I>>(object: I): Offer {
    const message = createBaseOffer();
    message.id = object.id ?? "0";
    message.offerCode = object.offerCode ?? "";
    message.dateFrom = object.dateFrom ?? undefined;
    message.dateTo = object.dateTo ?? undefined;
    message.price = (object.price !== undefined && object.price !== null) ? Money.fromPartial(object.price) : undefined;
    message.sellerId = object.sellerId ?? "0";
    message.itemId = object.itemId ?? "0";
    return message;
  },
};

function createBaseOfferItem(): OfferItem {
  return { title: "", categoryId: "0", brandId: "0", description: "", photoIds: [], seller: undefined };
}

export const OfferItem = {
  encode(message: OfferItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.categoryId !== "0") {
      writer.uint32(16).int64(message.categoryId);
    }
    if (message.brandId !== "0") {
      writer.uint32(24).int64(message.brandId);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    writer.uint32(42).fork();
    for (const v of message.photoIds) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.seller !== undefined) {
      Seller.encode(message.seller, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OfferItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOfferItem();
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
          if (tag !== 16) {
            break;
          }

          message.categoryId = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.brandId = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag === 40) {
            message.photoIds.push(longToString(reader.int64() as Long));

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.photoIds.push(longToString(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.seller = Seller.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OfferItem {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      categoryId: isSet(object.categoryId) ? globalThis.String(object.categoryId) : "0",
      brandId: isSet(object.brandId) ? globalThis.String(object.brandId) : "0",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      photoIds: globalThis.Array.isArray(object?.photoIds) ? object.photoIds.map((e: any) => globalThis.String(e)) : [],
      seller: isSet(object.seller) ? Seller.fromJSON(object.seller) : undefined,
    };
  },

  toJSON(message: OfferItem): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.categoryId !== "0") {
      obj.categoryId = message.categoryId;
    }
    if (message.brandId !== "0") {
      obj.brandId = message.brandId;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.photoIds?.length) {
      obj.photoIds = message.photoIds;
    }
    if (message.seller !== undefined) {
      obj.seller = Seller.toJSON(message.seller);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OfferItem>, I>>(base?: I): OfferItem {
    return OfferItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OfferItem>, I>>(object: I): OfferItem {
    const message = createBaseOfferItem();
    message.title = object.title ?? "";
    message.categoryId = object.categoryId ?? "0";
    message.brandId = object.brandId ?? "0";
    message.description = object.description ?? "";
    message.photoIds = object.photoIds?.map((e) => e) || [];
    message.seller = (object.seller !== undefined && object.seller !== null)
      ? Seller.fromPartial(object.seller)
      : undefined;
    return message;
  },
};

function createBaseCreateOfferRequest(): CreateOfferRequest {
  return { bidId: "0", itemId: "0", sessionData: undefined, accessToken: "" };
}

export const CreateOfferRequest = {
  encode(message: CreateOfferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bidId !== "0") {
      writer.uint32(16).int64(message.bidId);
    }
    if (message.itemId !== "0") {
      writer.uint32(24).int64(message.itemId);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOfferRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOfferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bidId = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.itemId = longToString(reader.int64() as Long);
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOfferRequest {
    return {
      bidId: isSet(object.bidId) ? globalThis.String(object.bidId) : "0",
      itemId: isSet(object.itemId) ? globalThis.String(object.itemId) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: CreateOfferRequest): unknown {
    const obj: any = {};
    if (message.bidId !== "0") {
      obj.bidId = message.bidId;
    }
    if (message.itemId !== "0") {
      obj.itemId = message.itemId;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOfferRequest>, I>>(base?: I): CreateOfferRequest {
    return CreateOfferRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOfferRequest>, I>>(object: I): CreateOfferRequest {
    const message = createBaseCreateOfferRequest();
    message.bidId = object.bidId ?? "0";
    message.itemId = object.itemId ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseCreateOfferResponse(): CreateOfferResponse {
  return { offerId: "0", sessionData: undefined };
}

export const CreateOfferResponse = {
  encode(message: CreateOfferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offerId !== "0") {
      writer.uint32(8).int64(message.offerId);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOfferResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOfferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offerId = longToString(reader.int64() as Long);
          continue;
        case 1024:
          if (tag !== 8194) {
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

  fromJSON(object: any): CreateOfferResponse {
    return {
      offerId: isSet(object.offerId) ? globalThis.String(object.offerId) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: CreateOfferResponse): unknown {
    const obj: any = {};
    if (message.offerId !== "0") {
      obj.offerId = message.offerId;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOfferResponse>, I>>(base?: I): CreateOfferResponse {
    return CreateOfferResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOfferResponse>, I>>(object: I): CreateOfferResponse {
    const message = createBaseCreateOfferResponse();
    message.offerId = object.offerId ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseCheckTokenRequest(): CheckTokenRequest {
  return { sessionData: undefined, accessToken: "" };
}

export const CheckTokenRequest = {
  encode(message: CheckTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(18).fork()).ldelim();
    }
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckTokenRequest {
    return {
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
    };
  },

  toJSON(message: CheckTokenRequest): unknown {
    const obj: any = {};
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckTokenRequest>, I>>(base?: I): CheckTokenRequest {
    return CheckTokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckTokenRequest>, I>>(object: I): CheckTokenRequest {
    const message = createBaseCheckTokenRequest();
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.accessToken = object.accessToken ?? "";
    return message;
  },
};

function createBaseGetItemListConfigResponse(): GetItemListConfigResponse {
  return { brands: [], collections: [], colors: [], sizes: [], filters: [], fulltext: undefined, sort: [] };
}

export const GetItemListConfigResponse = {
  encode(message: GetItemListConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.brands) {
      ItemTagInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.collections) {
      ItemTagInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.colors) {
      ItemTagInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sizes) {
      ItemTagInfo.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.filters) {
      FilterGetItemListResponse.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.fulltext !== undefined) {
      writer.uint32(50).string(message.fulltext);
    }
    for (const v of message.sort) {
      SortTagInfo.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemListConfigResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemListConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brands.push(ItemTagInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.collections.push(ItemTagInfo.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.colors.push(ItemTagInfo.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sizes.push(ItemTagInfo.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.filters.push(FilterGetItemListResponse.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.fulltext = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sort.push(SortTagInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemListConfigResponse {
    return {
      brands: globalThis.Array.isArray(object?.brands) ? object.brands.map((e: any) => ItemTagInfo.fromJSON(e)) : [],
      collections: globalThis.Array.isArray(object?.collections)
        ? object.collections.map((e: any) => ItemTagInfo.fromJSON(e))
        : [],
      colors: globalThis.Array.isArray(object?.colors) ? object.colors.map((e: any) => ItemTagInfo.fromJSON(e)) : [],
      sizes: globalThis.Array.isArray(object?.sizes) ? object.sizes.map((e: any) => ItemTagInfo.fromJSON(e)) : [],
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => FilterGetItemListResponse.fromJSON(e))
        : [],
      fulltext: isSet(object.fulltext) ? globalThis.String(object.fulltext) : undefined,
      sort: globalThis.Array.isArray(object?.sort) ? object.sort.map((e: any) => SortTagInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetItemListConfigResponse): unknown {
    const obj: any = {};
    if (message.brands?.length) {
      obj.brands = message.brands.map((e) => ItemTagInfo.toJSON(e));
    }
    if (message.collections?.length) {
      obj.collections = message.collections.map((e) => ItemTagInfo.toJSON(e));
    }
    if (message.colors?.length) {
      obj.colors = message.colors.map((e) => ItemTagInfo.toJSON(e));
    }
    if (message.sizes?.length) {
      obj.sizes = message.sizes.map((e) => ItemTagInfo.toJSON(e));
    }
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => FilterGetItemListResponse.toJSON(e));
    }
    if (message.fulltext !== undefined) {
      obj.fulltext = message.fulltext;
    }
    if (message.sort?.length) {
      obj.sort = message.sort.map((e) => SortTagInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemListConfigResponse>, I>>(base?: I): GetItemListConfigResponse {
    return GetItemListConfigResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemListConfigResponse>, I>>(object: I): GetItemListConfigResponse {
    const message = createBaseGetItemListConfigResponse();
    message.brands = object.brands?.map((e) => ItemTagInfo.fromPartial(e)) || [];
    message.collections = object.collections?.map((e) => ItemTagInfo.fromPartial(e)) || [];
    message.colors = object.colors?.map((e) => ItemTagInfo.fromPartial(e)) || [];
    message.sizes = object.sizes?.map((e) => ItemTagInfo.fromPartial(e)) || [];
    message.filters = object.filters?.map((e) => FilterGetItemListResponse.fromPartial(e)) || [];
    message.fulltext = object.fulltext ?? undefined;
    message.sort = object.sort?.map((e) => SortTagInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseItemTagInfo(): ItemTagInfo {
  return { code: "", title: "", selected: false, hex: undefined, images: undefined };
}

export const ItemTagInfo = {
  encode(message: ItemTagInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.selected === true) {
      writer.uint32(24).bool(message.selected);
    }
    if (message.hex !== undefined) {
      writer.uint32(34).string(message.hex);
    }
    if (message.images !== undefined) {
      Image.encode(message.images, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemTagInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemTagInfo();
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

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.selected = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hex = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.images = Image.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ItemTagInfo {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
      hex: isSet(object.hex) ? globalThis.String(object.hex) : undefined,
      images: isSet(object.images) ? Image.fromJSON(object.images) : undefined,
    };
  },

  toJSON(message: ItemTagInfo): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.selected === true) {
      obj.selected = message.selected;
    }
    if (message.hex !== undefined) {
      obj.hex = message.hex;
    }
    if (message.images !== undefined) {
      obj.images = Image.toJSON(message.images);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ItemTagInfo>, I>>(base?: I): ItemTagInfo {
    return ItemTagInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ItemTagInfo>, I>>(object: I): ItemTagInfo {
    const message = createBaseItemTagInfo();
    message.code = object.code ?? "";
    message.title = object.title ?? "";
    message.selected = object.selected ?? false;
    message.hex = object.hex ?? undefined;
    message.images = (object.images !== undefined && object.images !== null)
      ? Image.fromPartial(object.images)
      : undefined;
    return message;
  },
};

function createBaseSortTagInfo(): SortTagInfo {
  return { code: 0, title: "", selected: false };
}

export const SortTagInfo = {
  encode(message: SortTagInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SortTagInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSortTagInfo();
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

  fromJSON(object: any): SortTagInfo {
    return {
      code: isSet(object.code) ? sortFromJSON(object.code) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
    };
  },

  toJSON(message: SortTagInfo): unknown {
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

  create<I extends Exact<DeepPartial<SortTagInfo>, I>>(base?: I): SortTagInfo {
    return SortTagInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SortTagInfo>, I>>(object: I): SortTagInfo {
    const message = createBaseSortTagInfo();
    message.code = object.code ?? 0;
    message.title = object.title ?? "";
    message.selected = object.selected ?? false;
    return message;
  },
};

function createBaseFilterGetItemListResponse(): FilterGetItemListResponse {
  return { code: "", title: "", domainValues: [] };
}

export const FilterGetItemListResponse = {
  encode(message: FilterGetItemListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    for (const v of message.domainValues) {
      DomainValues.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilterGetItemListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilterGetItemListResponse();
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

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.domainValues.push(DomainValues.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilterGetItemListResponse {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      domainValues: globalThis.Array.isArray(object?.domainValues)
        ? object.domainValues.map((e: any) => DomainValues.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FilterGetItemListResponse): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.domainValues?.length) {
      obj.domainValues = message.domainValues.map((e) => DomainValues.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilterGetItemListResponse>, I>>(base?: I): FilterGetItemListResponse {
    return FilterGetItemListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilterGetItemListResponse>, I>>(object: I): FilterGetItemListResponse {
    const message = createBaseFilterGetItemListResponse();
    message.code = object.code ?? "";
    message.title = object.title ?? "";
    message.domainValues = object.domainValues?.map((e) => DomainValues.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDomainValues(): DomainValues {
  return { value: "", selected: false };
}

export const DomainValues = {
  encode(message: DomainValues, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    if (message.selected === true) {
      writer.uint32(16).bool(message.selected);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DomainValues {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDomainValues();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): DomainValues {
    return {
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      selected: isSet(object.selected) ? globalThis.Boolean(object.selected) : false,
    };
  },

  toJSON(message: DomainValues): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.selected === true) {
      obj.selected = message.selected;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DomainValues>, I>>(base?: I): DomainValues {
    return DomainValues.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DomainValues>, I>>(object: I): DomainValues {
    const message = createBaseDomainValues();
    message.value = object.value ?? "";
    message.selected = object.selected ?? false;
    return message;
  },
};

function createBaseGetItemListRequest(): GetItemListRequest {
  return {
    brands: [],
    collections: [],
    colors: [],
    sizes: [],
    filters: [],
    fulltext: undefined,
    sort: undefined,
    sessionData: undefined,
    pagination: undefined,
    accessToken: undefined,
  };
}

export const GetItemListRequest = {
  encode(message: GetItemListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.brands) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.collections) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.colors) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.sizes) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.filters) {
      FilterGetItemListRequest.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.fulltext !== undefined) {
      writer.uint32(50).string(message.fulltext);
    }
    if (message.sort !== undefined) {
      writer.uint32(56).int32(message.sort);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(8194).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      GetItemListRequest_Pagination.encode(message.pagination, writer.uint32(74).fork()).ldelim();
    }
    if (message.accessToken !== undefined) {
      writer.uint32(66).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brands.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.collections.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.colors.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sizes.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.filters.push(FilterGetItemListRequest.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.fulltext = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.sort = reader.int32() as any;
          continue;
        case 1024:
          if (tag !== 8194) {
            break;
          }

          message.sessionData = SessionData.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.pagination = GetItemListRequest_Pagination.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemListRequest {
    return {
      brands: globalThis.Array.isArray(object?.brands) ? object.brands.map((e: any) => globalThis.String(e)) : [],
      collections: globalThis.Array.isArray(object?.collections)
        ? object.collections.map((e: any) => globalThis.String(e))
        : [],
      colors: globalThis.Array.isArray(object?.colors) ? object.colors.map((e: any) => globalThis.String(e)) : [],
      sizes: globalThis.Array.isArray(object?.sizes) ? object.sizes.map((e: any) => globalThis.String(e)) : [],
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => FilterGetItemListRequest.fromJSON(e))
        : [],
      fulltext: isSet(object.fulltext) ? globalThis.String(object.fulltext) : undefined,
      sort: isSet(object.sort) ? sortFromJSON(object.sort) : undefined,
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
      pagination: isSet(object.pagination) ? GetItemListRequest_Pagination.fromJSON(object.pagination) : undefined,
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : undefined,
    };
  },

  toJSON(message: GetItemListRequest): unknown {
    const obj: any = {};
    if (message.brands?.length) {
      obj.brands = message.brands;
    }
    if (message.collections?.length) {
      obj.collections = message.collections;
    }
    if (message.colors?.length) {
      obj.colors = message.colors;
    }
    if (message.sizes?.length) {
      obj.sizes = message.sizes;
    }
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) => FilterGetItemListRequest.toJSON(e));
    }
    if (message.fulltext !== undefined) {
      obj.fulltext = message.fulltext;
    }
    if (message.sort !== undefined) {
      obj.sort = sortToJSON(message.sort);
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    if (message.pagination !== undefined) {
      obj.pagination = GetItemListRequest_Pagination.toJSON(message.pagination);
    }
    if (message.accessToken !== undefined) {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemListRequest>, I>>(base?: I): GetItemListRequest {
    return GetItemListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemListRequest>, I>>(object: I): GetItemListRequest {
    const message = createBaseGetItemListRequest();
    message.brands = object.brands?.map((e) => e) || [];
    message.collections = object.collections?.map((e) => e) || [];
    message.colors = object.colors?.map((e) => e) || [];
    message.sizes = object.sizes?.map((e) => e) || [];
    message.filters = object.filters?.map((e) => FilterGetItemListRequest.fromPartial(e)) || [];
    message.fulltext = object.fulltext ?? undefined;
    message.sort = object.sort ?? undefined;
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? GetItemListRequest_Pagination.fromPartial(object.pagination)
      : undefined;
    message.accessToken = object.accessToken ?? undefined;
    return message;
  },
};

function createBaseGetItemListRequest_Pagination(): GetItemListRequest_Pagination {
  return { page: "0", perPage: 0 };
}

export const GetItemListRequest_Pagination = {
  encode(message: GetItemListRequest_Pagination, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== "0") {
      writer.uint32(8).int64(message.page);
    }
    if (message.perPage !== 0) {
      writer.uint32(16).uint32(message.perPage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemListRequest_Pagination {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemListRequest_Pagination();
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

  fromJSON(object: any): GetItemListRequest_Pagination {
    return {
      page: isSet(object.page) ? globalThis.String(object.page) : "0",
      perPage: isSet(object.perPage) ? globalThis.Number(object.perPage) : 0,
    };
  },

  toJSON(message: GetItemListRequest_Pagination): unknown {
    const obj: any = {};
    if (message.page !== "0") {
      obj.page = message.page;
    }
    if (message.perPage !== 0) {
      obj.perPage = Math.round(message.perPage);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemListRequest_Pagination>, I>>(base?: I): GetItemListRequest_Pagination {
    return GetItemListRequest_Pagination.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemListRequest_Pagination>, I>>(
    object: I,
  ): GetItemListRequest_Pagination {
    const message = createBaseGetItemListRequest_Pagination();
    message.page = object.page ?? "0";
    message.perPage = object.perPage ?? 0;
    return message;
  },
};

function createBaseFilterGetItemListRequest(): FilterGetItemListRequest {
  return { code: "", domainValues: [] };
}

export const FilterGetItemListRequest = {
  encode(message: FilterGetItemListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    for (const v of message.domainValues) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilterGetItemListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilterGetItemListRequest();
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

          message.domainValues.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilterGetItemListRequest {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      domainValues: globalThis.Array.isArray(object?.domainValues)
        ? object.domainValues.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: FilterGetItemListRequest): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.domainValues?.length) {
      obj.domainValues = message.domainValues;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilterGetItemListRequest>, I>>(base?: I): FilterGetItemListRequest {
    return FilterGetItemListRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FilterGetItemListRequest>, I>>(object: I): FilterGetItemListRequest {
    const message = createBaseFilterGetItemListRequest();
    message.code = object.code ?? "";
    message.domainValues = object.domainValues?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetItemListResponse(): GetItemListResponse {
  return { searchkitMeta: undefined, data: [] };
}

export const GetItemListResponse = {
  encode(message: GetItemListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.searchkitMeta !== undefined) {
      ResponseMeta.encode(message.searchkitMeta, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.data) {
      Item.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetItemListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.searchkitMeta = ResponseMeta.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data.push(Item.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetItemListResponse {
    return {
      searchkitMeta: isSet(object.searchkitMeta) ? ResponseMeta.fromJSON(object.searchkitMeta) : undefined,
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Item.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetItemListResponse): unknown {
    const obj: any = {};
    if (message.searchkitMeta !== undefined) {
      obj.searchkitMeta = ResponseMeta.toJSON(message.searchkitMeta);
    }
    if (message.data?.length) {
      obj.data = message.data.map((e) => Item.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemListResponse>, I>>(base?: I): GetItemListResponse {
    return GetItemListResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemListResponse>, I>>(object: I): GetItemListResponse {
    const message = createBaseGetItemListResponse();
    message.searchkitMeta = (object.searchkitMeta !== undefined && object.searchkitMeta !== null)
      ? ResponseMeta.fromPartial(object.searchkitMeta)
      : undefined;
    message.data = object.data?.map((e) => Item.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetAddressRequest(): GetAddressRequest {
  return { id: "0", sessionData: undefined };
}

export const GetAddressRequest = {
  encode(message: GetAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAddressRequest();
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

  fromJSON(object: any): GetAddressRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: GetAddressRequest): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAddressRequest>, I>>(base?: I): GetAddressRequest {
    return GetAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAddressRequest>, I>>(object: I): GetAddressRequest {
    const message = createBaseGetAddressRequest();
    message.id = object.id ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseGetAddressResponse(): GetAddressResponse {
  return { address: undefined };
}

export const GetAddressResponse = {
  encode(message: GetAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = Address.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAddressResponse {
    return { address: isSet(object.address) ? Address.fromJSON(object.address) : undefined };
  },

  toJSON(message: GetAddressResponse): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = Address.toJSON(message.address);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAddressResponse>, I>>(base?: I): GetAddressResponse {
    return GetAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetAddressResponse>, I>>(object: I): GetAddressResponse {
    const message = createBaseGetAddressResponse();
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    return message;
  },
};

function createBaseListAddressesRequest(): ListAddressesRequest {
  return { accessToken: "", ids: [], limit: "0", offset: "0", sessionData: undefined };
}

export const ListAddressesRequest = {
  encode(message: ListAddressesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    writer.uint32(18).fork();
    for (const v of message.ids) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.limit !== "0") {
      writer.uint32(24).int64(message.limit);
    }
    if (message.offset !== "0") {
      writer.uint32(32).int64(message.offset);
    }
    if (message.sessionData !== undefined) {
      SessionData.encode(message.sessionData, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAddressesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAddressesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.ids.push(longToString(reader.int64() as Long));

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(longToString(reader.int64() as Long));
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.limit = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.offset = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): ListAddressesRequest {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => globalThis.String(e)) : [],
      limit: isSet(object.limit) ? globalThis.String(object.limit) : "0",
      offset: isSet(object.offset) ? globalThis.String(object.offset) : "0",
      sessionData: isSet(object.sessionData) ? SessionData.fromJSON(object.sessionData) : undefined,
    };
  },

  toJSON(message: ListAddressesRequest): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    if (message.limit !== "0") {
      obj.limit = message.limit;
    }
    if (message.offset !== "0") {
      obj.offset = message.offset;
    }
    if (message.sessionData !== undefined) {
      obj.sessionData = SessionData.toJSON(message.sessionData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListAddressesRequest>, I>>(base?: I): ListAddressesRequest {
    return ListAddressesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListAddressesRequest>, I>>(object: I): ListAddressesRequest {
    const message = createBaseListAddressesRequest();
    message.accessToken = object.accessToken ?? "";
    message.ids = object.ids?.map((e) => e) || [];
    message.limit = object.limit ?? "0";
    message.offset = object.offset ?? "0";
    message.sessionData = (object.sessionData !== undefined && object.sessionData !== null)
      ? SessionData.fromPartial(object.sessionData)
      : undefined;
    return message;
  },
};

function createBaseListAddressesResponse(): ListAddressesResponse {
  return { addresses: [] };
}

export const ListAddressesResponse = {
  encode(message: ListAddressesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.addresses) {
      Address.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAddressesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.addresses.push(Address.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListAddressesResponse {
    return {
      addresses: globalThis.Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => Address.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListAddressesResponse): unknown {
    const obj: any = {};
    if (message.addresses?.length) {
      obj.addresses = message.addresses.map((e) => Address.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListAddressesResponse>, I>>(base?: I): ListAddressesResponse {
    return ListAddressesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListAddressesResponse>, I>>(object: I): ListAddressesResponse {
    const message = createBaseListAddressesResponse();
    message.addresses = object.addresses?.map((e) => Address.fromPartial(e)) || [];
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
