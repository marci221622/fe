/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип ссылки */
export enum Type {
  /** UNIVERSAL_LINK - Универсальная */
  UNIVERSAL_LINK = 0,
  /** BRAND - На бренд */
  BRAND = 1,
  /** CATEGORY - На категорию */
  CATEGORY = 2,
  /** ITEM - На товар */
  ITEM = 3,
  /** COLLECTION - На коллекцию */
  COLLECTION = 4,
  UNRECOGNIZED = -1,
}

export function typeFromJSON(object: any): Type {
  switch (object) {
    case 0:
    case "UNIVERSAL_LINK":
      return Type.UNIVERSAL_LINK;
    case 1:
    case "BRAND":
      return Type.BRAND;
    case 2:
    case "CATEGORY":
      return Type.CATEGORY;
    case 3:
    case "ITEM":
      return Type.ITEM;
    case 4:
    case "COLLECTION":
      return Type.COLLECTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Type.UNRECOGNIZED;
  }
}

export function typeToJSON(object: Type): string {
  switch (object) {
    case Type.UNIVERSAL_LINK:
      return "UNIVERSAL_LINK";
    case Type.BRAND:
      return "BRAND";
    case Type.CATEGORY:
      return "CATEGORY";
    case Type.ITEM:
      return "ITEM";
    case Type.COLLECTION:
      return "COLLECTION";
    case Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
