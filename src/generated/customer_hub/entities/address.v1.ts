/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { AddressType, addressTypeFromJSON, addressTypeToJSON } from "../enums/address_type";

export const protobufPackage = "utp.customer_hub_service.v1";

/** Описывает данные адреса */
export interface AddressData {
  /** Код адреса */
  code: string;
  /** Широта */
  latitude: number;
  /** Долгота */
  longitude: number;
  /** Страна */
  country?:
    | string
    | undefined;
  /** Регион */
  region?:
    | string
    | undefined;
  /** Город */
  city?:
    | string
    | undefined;
  /** Улица */
  street?:
    | string
    | undefined;
  /** Дом */
  house?:
    | string
    | undefined;
  /** Корпус */
  corps?:
    | string
    | undefined;
  /** Квартира */
  apartment?:
    | string
    | undefined;
  /** Район */
  area?:
    | string
    | undefined;
  /** Почтовый индекс */
  zip?:
    | string
    | undefined;
  /** Строковое представление адреса */
  description?:
    | string
    | undefined;
  /** Идентификатор ФИАС */
  fiasId?:
    | string
    | undefined;
  /** Тип адреса */
  type?:
    | AddressType
    | undefined;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  construction?:
    | string
    | undefined;
  /** @deprecated */
  office?: string | undefined;
}

/** Описывает адрес */
export interface Address {
  /** Идентификатор адреса */
  id: string;
  /** Данные адреса */
  data: AddressData | undefined;
}

function createBaseAddressData(): AddressData {
  return {
    code: "",
    latitude: 0,
    longitude: 0,
    country: undefined,
    region: undefined,
    city: undefined,
    street: undefined,
    house: undefined,
    corps: undefined,
    apartment: undefined,
    area: undefined,
    zip: undefined,
    description: undefined,
    fiasId: undefined,
    type: undefined,
    construction: undefined,
    office: undefined,
  };
}

export const AddressData = {
  encode(message: AddressData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.latitude !== 0) {
      writer.uint32(17).double(message.latitude);
    }
    if (message.longitude !== 0) {
      writer.uint32(25).double(message.longitude);
    }
    if (message.country !== undefined) {
      writer.uint32(34).string(message.country);
    }
    if (message.region !== undefined) {
      writer.uint32(42).string(message.region);
    }
    if (message.city !== undefined) {
      writer.uint32(50).string(message.city);
    }
    if (message.street !== undefined) {
      writer.uint32(58).string(message.street);
    }
    if (message.house !== undefined) {
      writer.uint32(66).string(message.house);
    }
    if (message.corps !== undefined) {
      writer.uint32(74).string(message.corps);
    }
    if (message.apartment !== undefined) {
      writer.uint32(82).string(message.apartment);
    }
    if (message.area !== undefined) {
      writer.uint32(90).string(message.area);
    }
    if (message.zip !== undefined) {
      writer.uint32(98).string(message.zip);
    }
    if (message.description !== undefined) {
      writer.uint32(106).string(message.description);
    }
    if (message.fiasId !== undefined) {
      writer.uint32(114).string(message.fiasId);
    }
    if (message.type !== undefined) {
      writer.uint32(136).int32(message.type);
    }
    if (message.construction !== undefined) {
      writer.uint32(122).string(message.construction);
    }
    if (message.office !== undefined) {
      writer.uint32(130).string(message.office);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddressData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressData();
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
          if (tag !== 17) {
            break;
          }

          message.latitude = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.longitude = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.country = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.region = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.city = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.street = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.house = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.corps = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.apartment = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.area = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.zip = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.description = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.fiasId = reader.string();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.construction = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.office = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddressData {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : "",
      latitude: isSet(object.latitude) ? globalThis.Number(object.latitude) : 0,
      longitude: isSet(object.longitude) ? globalThis.Number(object.longitude) : 0,
      country: isSet(object.country) ? globalThis.String(object.country) : undefined,
      region: isSet(object.region) ? globalThis.String(object.region) : undefined,
      city: isSet(object.city) ? globalThis.String(object.city) : undefined,
      street: isSet(object.street) ? globalThis.String(object.street) : undefined,
      house: isSet(object.house) ? globalThis.String(object.house) : undefined,
      corps: isSet(object.corps) ? globalThis.String(object.corps) : undefined,
      apartment: isSet(object.apartment) ? globalThis.String(object.apartment) : undefined,
      area: isSet(object.area) ? globalThis.String(object.area) : undefined,
      zip: isSet(object.zip) ? globalThis.String(object.zip) : undefined,
      description: isSet(object.description) ? globalThis.String(object.description) : undefined,
      fiasId: isSet(object.fiasId) ? globalThis.String(object.fiasId) : undefined,
      type: isSet(object.type) ? addressTypeFromJSON(object.type) : undefined,
      construction: isSet(object.construction) ? globalThis.String(object.construction) : undefined,
      office: isSet(object.office) ? globalThis.String(object.office) : undefined,
    };
  },

  toJSON(message: AddressData): unknown {
    const obj: any = {};
    if (message.code !== "") {
      obj.code = message.code;
    }
    if (message.latitude !== 0) {
      obj.latitude = message.latitude;
    }
    if (message.longitude !== 0) {
      obj.longitude = message.longitude;
    }
    if (message.country !== undefined) {
      obj.country = message.country;
    }
    if (message.region !== undefined) {
      obj.region = message.region;
    }
    if (message.city !== undefined) {
      obj.city = message.city;
    }
    if (message.street !== undefined) {
      obj.street = message.street;
    }
    if (message.house !== undefined) {
      obj.house = message.house;
    }
    if (message.corps !== undefined) {
      obj.corps = message.corps;
    }
    if (message.apartment !== undefined) {
      obj.apartment = message.apartment;
    }
    if (message.area !== undefined) {
      obj.area = message.area;
    }
    if (message.zip !== undefined) {
      obj.zip = message.zip;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.fiasId !== undefined) {
      obj.fiasId = message.fiasId;
    }
    if (message.type !== undefined) {
      obj.type = addressTypeToJSON(message.type);
    }
    if (message.construction !== undefined) {
      obj.construction = message.construction;
    }
    if (message.office !== undefined) {
      obj.office = message.office;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddressData>, I>>(base?: I): AddressData {
    return AddressData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddressData>, I>>(object: I): AddressData {
    const message = createBaseAddressData();
    message.code = object.code ?? "";
    message.latitude = object.latitude ?? 0;
    message.longitude = object.longitude ?? 0;
    message.country = object.country ?? undefined;
    message.region = object.region ?? undefined;
    message.city = object.city ?? undefined;
    message.street = object.street ?? undefined;
    message.house = object.house ?? undefined;
    message.corps = object.corps ?? undefined;
    message.apartment = object.apartment ?? undefined;
    message.area = object.area ?? undefined;
    message.zip = object.zip ?? undefined;
    message.description = object.description ?? undefined;
    message.fiasId = object.fiasId ?? undefined;
    message.type = object.type ?? undefined;
    message.construction = object.construction ?? undefined;
    message.office = object.office ?? undefined;
    return message;
  },
};

function createBaseAddress(): Address {
  return { id: "0", data: undefined };
}

export const Address = {
  encode(message: Address, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).int64(message.id);
    }
    if (message.data !== undefined) {
      AddressData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Address {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddress();
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

          message.data = AddressData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Address {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "0",
      data: isSet(object.data) ? AddressData.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: Address): unknown {
    const obj: any = {};
    if (message.id !== "0") {
      obj.id = message.id;
    }
    if (message.data !== undefined) {
      obj.data = AddressData.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Address>, I>>(base?: I): Address {
    return Address.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Address>, I>>(object: I): Address {
    const message = createBaseAddress();
    message.id = object.id ?? "0";
    message.data = (object.data !== undefined && object.data !== null)
      ? AddressData.fromPartial(object.data)
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
