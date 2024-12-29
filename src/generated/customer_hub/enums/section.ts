/* eslint-disable */

export const protobufPackage = "utp.customer_hub_service.v1";

/** Секция */
export enum Section {
  /** SECTION_FEMALE - Женское */
  SECTION_FEMALE = 0,
  /** SECTION_MALE - Мужское */
  SECTION_MALE = 1,
  UNRECOGNIZED = -1,
}

export function sectionFromJSON(object: any): Section {
  switch (object) {
    case 0:
    case "SECTION_FEMALE":
      return Section.SECTION_FEMALE;
    case 1:
    case "SECTION_MALE":
      return Section.SECTION_MALE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Section.UNRECOGNIZED;
  }
}

export function sectionToJSON(object: Section): string {
  switch (object) {
    case Section.SECTION_FEMALE:
      return "SECTION_FEMALE";
    case Section.SECTION_MALE:
      return "SECTION_MALE";
    case Section.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
