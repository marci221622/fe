import parsePhoneNumber from 'libphonenumber-js';
import { mapValues } from 'lodash';

import { COIN_WEIGHT } from '@/constants/hardcode';

// FROM_TSUM_APP
export function removeParameterFromUrl(url: string, parameter: string) {
  return url
    .replace(new RegExp(`[?&]${parameter}=[^&#]*(#.*)?$`), '$1')
    .replace(new RegExp(`([?&])${parameter}=[^&]*&`), '$1');
}

type Props<T> = { list: T[]; textExtractor: (item: T) => string; search: string };

export function searchByWord<T>({ list, textExtractor, search }: Props<T>) {
  return list.filter(item => {
    const splittedSearch = search.toLocaleLowerCase().split(' ');
    const splittedText = textExtractor(item).toLocaleLowerCase().split(' ');

    return splittedSearch.every(searchWord => splittedText.some(word => word.startsWith(searchWord)));
  });
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFirstLetter(string: string) {
  return string.charAt(0);
}

export function phoneIsValid(digestValue: string) {
  const parsedPhone = parsePhoneNumber(digestValue, 'RU');

  return Boolean(parsedPhone?.country === 'RU' && parsedPhone?.isValid());
}

export function digestPhone(phone: string) {
  return phone.replace(/\D/g, '').trim();
}

export function escapeChars(str: string) {
  const entityMap: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '&': '&',
  };

  return str.replace(/[&<>"']/g, s => entityMap[s] ?? '');
}

export function formatPhone(phone: string) {
  return parsePhoneNumber(phone, 'RU')?.formatInternational() ?? phone;
}

const getFirstChar = (brand: { label: string }) => brand.label.slice(0, 1).toLocaleLowerCase();

const sortNumbersAndSymbols = <T extends { label: string }>(brands: T[]) => {
  const numbers = brands.filter(brand => /\d/.test(getFirstChar(brand)));
  const symbols = brands.filter(brand => /\W/.test(getFirstChar(brand)));

  const sortedNumbers = numbers.sort((a, b) => +getFirstChar(a) - +getFirstChar(b));
  const sortedSymbols = symbols.sort((a, b) => +getFirstChar(a) - +getFirstChar(b));

  return [...sortedNumbers, ...sortedSymbols];
};

const sortBrands = <T extends { label: string }>(list: Record<string, T[]>) => {
  const sortedList = mapValues(list, brands => brands.slice().sort((a, b) => a.label.localeCompare(b.label)));

  if (sortedList['#']) {
    return {
      ...sortedList,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '#': sortNumbersAndSymbols(sortedList['#']),
    };
  }

  return sortedList;
};

export const filtersToAlphabetList = <T extends { label: string }>(items: T[]) => {
  const list = items.reduce((acc, brand) => {
    const firstChar = getFirstChar(brand);
    const isRU = /[ЁёА-я]/.test(firstChar);
    const isNUM = /\d/.test(firstChar);
    const isSymbol = /\W/.test(firstChar);

    if (!brand.label) {
      return acc;
    }

    if (isRU) {
      if (!acc.ru) {
        acc.ru = [];
      }

      acc.ru.push(brand);

      return acc;
    }

    if (isNUM || isSymbol) {
      if (!acc['#']) {
        acc['#'] = [];
      }

      acc['#'].push(brand);

      return acc;
    }

    if (!acc[firstChar]) {
      acc[firstChar] = [];
    }

    acc[firstChar].push(brand);

    return acc;
  }, {} as Record<string, T[]>);

  return sortBrands(list);
};

export const sortAlphabet = (x: string, y: string) => {
  if (x === '#' && y === 'ru') {
    return 1;
  }

  if (x === 'ru' && y === '#') {
    return -1;
  }

  if (x === '#' || x === 'ru') {
    return 1;
  }

  if (y === '#' || y === 'ru') {
    return -1;
  }

  return x.localeCompare(y);
};

export function toNumber(value?: string) {
  return value ? Number.parseInt(value.replace(/[^\d.-]+/g, ''), 10) : 0;
}

const config = {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

export function moneyToPrice(priceToShow: string | number, currency?: string) {
  return ((Number(priceToShow) ?? 0) / COIN_WEIGHT).toLocaleString('ru-RU', { ...config, currency: currency ?? 'RUB' });
}

export function createRangeLabel({
  title,
  maxRange,
  selectedRange,
}: {
  title: string;
  maxRange: { min?: string; max?: string };
  selectedRange: { min?: string; max?: string };
}) {
  const selectedMax = toNumber(selectedRange.max);
  const selectedMin = toNumber(selectedRange.min);

  const rangeMax = toNumber(maxRange.max);
  const rangeMin = toNumber(maxRange.min);

  if (!!selectedMax && !!selectedMin && selectedMax === selectedMin) {
    return `${moneyToPrice(selectedMin)}`;
  }

  if (rangeMax !== selectedMax && rangeMin !== selectedMin) {
    return `${moneyToPrice(selectedMin)} - ${moneyToPrice(selectedMax)}`;
  }

  if (!!selectedMax && rangeMax !== selectedMax) {
    return `до ${moneyToPrice(selectedMax)}`;
  }

  if (!!rangeMin && rangeMax !== selectedMin) {
    return `от ${moneyToPrice(selectedMin)}`;
  }

  return title;
}
