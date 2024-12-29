import { Item } from '@/generated/customer_hub/entities/item.v1';

import { getPrice } from './transformers';

// в копейках, до миллиона (на 2 цены, обычная - скидка)
const MAXIMUM_PRICE_LENGTH = 18;
const MAXIMUM_PRICE_LENGTH_SMALL_CARD = 14;

type Props = {
  items: Item[];
  noGroup?: boolean;
  needToFullListPreparation?: boolean;
  // Что бы просчитать цену по карточке которая меньше чем обычно
  smallCard?: boolean;
  sizeVisibility?: boolean;
};

export type Scheme = {
  tagsVisibility: boolean;
  sizeVisibility: boolean;
  hasDiscountInRow: boolean;
  // Товар в резерве или не в наличии
  hasComments: boolean;
  // Что бы в ряду цены сделать вертикальными
  priceVertical: boolean;
  // Если есть размер - тайтл в одну строку
  titleOnlyOneRow: boolean;
  // Если в ряду карточек есть у коголибо цена
  // Место оставляем для всех (Иначе криво будет с + в резерве (без цены))
  hasPriceInRow: boolean;
};

export type RowSchemeResult = ReturnType<typeof createRowScheme>;

export function hasSizeInProduct(item: Item) {
  return (
    item.size && ((item.size.russianLabel && item.size.russianSize) || (item.size.vendorLabel && item.size.vendorSize))
  );
}

function prepareRow(row: Item[][], { smallCard, sizeVisibility }: { smallCard?: boolean; sizeVisibility?: boolean }) {
  const acc = {} as Record<string, Scheme>;

  for (let i = 0; i < row.length; i++) {
    const tagsVisibility = row[i].some(item => item.labels.length > 0);
    const hasSizeInRow = sizeVisibility ? row[i].some(hasSizeInProduct) : false;
    const hasDiscountInRow = row[i].some(item => !!item.discountPercent && +item.quantity > 0);
    const someIsCollectedOrNotExtsts = row[i].some(item => +item.quantity === 0 || !!item.isCollected);
    const priceVertical = row[i].some(item => {
      const price = getPrice({ tsumPrice: item.tsumPrice, itemOffers: item.itemOffers });
      const asString = `${price.original ?? ''} ${price.withDiscount ?? ''}`;

      return asString.length > (smallCard ? MAXIMUM_PRICE_LENGTH_SMALL_CARD : MAXIMUM_PRICE_LENGTH);
    });
    const hasPriceInRow = row[i].some(item => +item.quantity > 0 || item.isCollected);

    for (let j = 0; j < row[i].length; j++) {
      acc[row[i][j].code] = {
        tagsVisibility,
        sizeVisibility: hasSizeInRow,
        hasDiscountInRow,
        hasComments: someIsCollectedOrNotExtsts,
        priceVertical,
        titleOnlyOneRow: hasSizeInRow,
        hasPriceInRow,
      };
    }
  }

  return acc;
}

export function mergeSchemes(prev: RowSchemeResult, next: RowSchemeResult) {
  return {
    perRow2: { ...prev.perRow2, ...next.perRow2 },
    perRow3: { ...prev.perRow3, ...next.perRow3 },
    perRow4: { ...prev.perRow4, ...next.perRow4 },
    __: { ...prev.__, ...next.__ },
  };
}

// Создать групп для расчета строки в каталоге (рутовая функция)
export function createRowScheme({
  items,
  noGroup = false,
  needToFullListPreparation = false,
  smallCard,
  sizeVisibility = true,
}: Props) {
  const products = {
    perRow2: [] as Item[][],
    perRow3: [] as Item[][],
    perRow4: [] as Item[][],
    __: !needToFullListPreparation ? [] : items,
  };

  if (!noGroup) {
    for (let i = 0; i < items.length; i++) {
      const chunk2 = Math.floor(i / 2);
      const chunk3 = Math.floor(i / 3);
      const chunk4 = Math.floor(i / 4);

      if (!products.perRow2[chunk2]) {
        products.perRow2[chunk2] = [];
      }

      if (!products.perRow3[chunk3]) {
        products.perRow3[chunk3] = [];
      }

      if (!products.perRow4[chunk4]) {
        products.perRow4[chunk4] = [];
      }

      products.perRow2[chunk2].push(items[i]);
      products.perRow3[chunk3].push(items[i]);
      products.perRow4[chunk4].push(items[i]);
    }
  }

  const scheme = {
    perRow2: prepareRow(products.perRow2, { smallCard, sizeVisibility }),
    perRow3: prepareRow(products.perRow3, { smallCard, sizeVisibility }),
    perRow4: prepareRow(products.perRow4, { smallCard, sizeVisibility }),
    // Расчет для всего списка товаров
    __: !needToFullListPreparation ? {} : prepareRow([items], { smallCard, sizeVisibility }),
  };

  return scheme;
}

export const DEFAUTL_EMPTY_SCHEME = createRowScheme({ items: [], needToFullListPreparation: false });
