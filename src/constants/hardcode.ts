import { Section } from '@/generated/customer_hub/enums/section';

// в каталоге поиска если сделать ns=1
// тогда слово поиск пропадет в каталоге
export const NO_SEARCH_TITLE_KEY = 'ns';
export const ADDITIONAL_SEARCH_TITLE = 'Поиск: ';

export const filtersCodes = {
  size: 'FILTER-SIZE',
  color: 'FILTER-COLOR',
  brands: 'FILTER-BRAND',
  state: 'FILTER-CONDITION-GRADE',
  sort: 'sort',
  search: 'q',
  collections: 'collections' as const,
  toggles: 'switchable',
  page: 'page',
  price: 'FILTER-PRICE',
  // Чисто что бы поймать именно этот фильтр
  // и по особенному обработать и показать
  categoryFilter: 'FILTER-CATEGORY',
  // Это фильтр switchable
  filterNovetly: 'FILTER-IS-NEW',
};

export const filterCodeToReaddableCode: Record<string, string> = {
  [filtersCodes.size]: 'size',
  [filtersCodes.color]: 'color',
  [filtersCodes.brands]: 'brands',
  [filtersCodes.state]: 'state',
  [filtersCodes.sort]: 'sort',
};

export const CATALOG_SIZE = '36';

export const SHOWROOM_LABEL_ID = '3';

export const URLS_BY_SECTION: Record<Section, string> = {
  [Section.SECTION_FEMALE]: 'women',
  [Section.SECTION_MALE]: 'men',
  [Section.UNRECOGNIZED]: 'women',
};

export const TELEGRAMM_LINK = 'https://t.me/tsumcollect';
export const TELEGRAMM_LINK_BOT = 'https://t.me/TSUMcollectBot';
export const WHATSAPP_LINK = 'https://wa.me/79778008002';

// https://jira.int.tsum.com/browse/POWEB-340
export const TITLE_TO_REMOVALE = '.';

export const SECTION_TO_STRING: Record<Section, string> = {
  [Section.SECTION_FEMALE]: 'female',
  [Section.SECTION_MALE]: 'male',
  [Section.UNRECOGNIZED]: 'female',
};

export const READDABLE_GENDER_TO_SECTION: Record<string, Section> = {
  female: Section.SECTION_FEMALE,
  male: Section.SECTION_MALE,
};

export const ROOT_SLUG = {
  men: 'muzhskoe-139',
  women: 'zhenskoe-1',
};

export const ITEMS_BY_BRANDS_LENGTH = '10';

export const COIN_WEIGHT = 100;

// Для цены min;max
export const PRICE_SEPARATOR = ';';
// Для групп по фильтрам которые нужно оставить после ресета
// - key1, key2
// - key1:val1,val2,key2
export const EXPECTED_FILTERS_GROUP_SEPARATOR = ':';

export const ROOT_COLLECTIONS = {
  [Section.SECTION_MALE]: 'COLL-139',
  [Section.SECTION_FEMALE]: 'COLL-1',
};

export const SHORT_VERSION_TAG = 'tsum collect';
