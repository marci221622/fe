/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Image } from "../../common/image.v1";
import { CustomerInfo } from "./customer_info.v1";
import { FavoriteListItem } from "./favorite_list_item.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** FavoriteItemsList список избранных товаров */
export interface FavoriteItemsList {
  /** Идентификатор */
  id: string;
  /** Данные по покупателю */
  owner:
    | CustomerInfo
    | undefined;
  /** Заголовок */
  title?:
    | string
    | undefined;
  /** Описание */
  description?:
    | string
    | undefined;
  /** Изображение */
  image?:
    | Image
    | undefined;
  /** Список товаров в списке избранного */
  items: FavoriteListItem[];
}

function createBaseFavoriteItemsList(): FavoriteItemsList {
  return { id: "", owner: undefined, title: undefined, description: undefined, image: undefined, items: [] };
}

export const FavoriteItemsList = {
  encode(message: FavoriteItemsList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.owner !== undefined) {
      CustomerInfo.encode(message.owner, writer.uint32(18).fork()).ldelim();
    }
    if (message.title !== undefined) {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== undefined) {
      writer.uint32(34).string(message.description);
    }
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.items) {
      FavoriteListItem.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FavoriteItemsList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFavoriteItemsList();
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

          message.owner = CustomerInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.items.push(FavoriteListItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FavoriteItemsList {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      owner: isSet(object.owner) ? CustomerInfo.fromJSON(object.owner) : undefined,
      title: isSet(object.title) ? globalThis.String(object.title) : undefined,
      description: isSet(object.description) ? globalThis.String(object.description) : undefined,
      image: isSet(object.image) ? Image.fromJSON(object.image) : undefined,
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => FavoriteListItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: FavoriteItemsList): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.owner !== undefined) {
      obj.owner = CustomerInfo.toJSON(message.owner);
    }
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.image !== undefined) {
      obj.image = Image.toJSON(message.image);
    }
    if (message.items?.length) {
      obj.items = message.items.map((e) => FavoriteListItem.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FavoriteItemsList>, I>>(base?: I): FavoriteItemsList {
    return FavoriteItemsList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FavoriteItemsList>, I>>(object: I): FavoriteItemsList {
    const message = createBaseFavoriteItemsList();
    message.id = object.id ?? "";
    message.owner = (object.owner !== undefined && object.owner !== null)
      ? CustomerInfo.fromPartial(object.owner)
      : undefined;
    message.title = object.title ?? undefined;
    message.description = object.description ?? undefined;
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.items = object.items?.map((e) => FavoriteListItem.fromPartial(e)) || [];
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
