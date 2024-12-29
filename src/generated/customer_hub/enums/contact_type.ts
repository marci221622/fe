/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Тип контакта */
export enum ContactType {
  /** CONTACT_TYPE_UNSPECIFIED - Не установлен */
  CONTACT_TYPE_UNSPECIFIED = 0,
  /** CONTACT_TYPE_PHONE - Телефон */
  CONTACT_TYPE_PHONE = 1,
  /** CONTACT_TYPE_EMAIL - Email */
  CONTACT_TYPE_EMAIL = 2,
  UNRECOGNIZED = -1,
}

export function contactTypeFromJSON(object: any): ContactType {
  switch (object) {
    case 0:
    case "CONTACT_TYPE_UNSPECIFIED":
      return ContactType.CONTACT_TYPE_UNSPECIFIED;
    case 1:
    case "CONTACT_TYPE_PHONE":
      return ContactType.CONTACT_TYPE_PHONE;
    case 2:
    case "CONTACT_TYPE_EMAIL":
      return ContactType.CONTACT_TYPE_EMAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContactType.UNRECOGNIZED;
  }
}

export function contactTypeToJSON(object: ContactType): string {
  switch (object) {
    case ContactType.CONTACT_TYPE_UNSPECIFIED:
      return "CONTACT_TYPE_UNSPECIFIED";
    case ContactType.CONTACT_TYPE_PHONE:
      return "CONTACT_TYPE_PHONE";
    case ContactType.CONTACT_TYPE_EMAIL:
      return "CONTACT_TYPE_EMAIL";
    case ContactType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
