import type { Meta, StoryFn } from '@storybook/react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { ItemsBlock } from '@/generated/customer_hub/entities/items_block.v1';
import { SlugType } from '@/generated/customer_hub/entities/slug.v1';

import { Items } from './View';

const meta = {
  title: 'Home/Products',
  args: {},
} satisfies Meta<unknown>;

export default meta;

// TODO: в утилиты для тестов
function createBlockItem(): Item {
  // TODO: fix types
  // @ts-ignore
  return {
    code: 'ITEM39621',
    article: '',
    sectionId: '0',
    articleProducer: '',
    designCountry: '',
    madeCountry: '',
    technicalInformation: 'Высота 26 см, ширина 37 см, глубина 19 см, длина ручек 29 см. ',
    composition: 'Кожа крокодила',
    inStock: true,
    title: 'Сумка Birkin из кожи крокодила',
    description: '',
    brand: {
      id: '0',
      code: '5239',
      title: 'Hermes',
      infoLink: '',
      sections: ['male', 'female'],
      sectionsTop: ['female', 'male'],
      logoLink: {
        src: 'https://st-preown-stable.tsum.com/sig/9ea5efcd11f09a59833b62ce529daa8e/width/0/document-hub/01GD2G15RJ4KS15E54WAD3FWFW.png',
        mime: '',
        width: 0,
        height: 0,
        cases: [4],
      },
      collectionCode: 'COLL-2537',
    } as Brand,
    color: {
      id: '0',
      title: 'Синий',
      hex: '0047bb',
      image: {
        src: '',
        mime: '',
        width: 0,
        height: 0,
        cases: [],
      },
    },
    novelty: false,
    imagesSmall: [
      {
        src: 'https://st-preown-stable.tsum.com/sig/d11e8d2aede1f82e685fa8bc6f9331d8/height/434/document-hub/01GXE5AFRAYRBPAJT6HEGWXW0K.jpg',
        mime: '',
        width: 282,
        height: 434,
        cases: [1],
      },
      {
        src: 'https://st-preown-stable.tsum.com/sig/dc8cbb30b97516a9fa8c4b89fb69c836/height/434/document-hub/01GXE5AFW5ZCVR0DW5MQ4DXMHD.jpg',
        mime: '',
        width: 282,
        height: 434,
        cases: [1],
      },
    ],
    imagesMiddle: [
      {
        src: 'https://st-preown-stable.tsum.com/sig/c242dc8174b99e327febc05583c4dd12/height/808/document-hub/01GXE5AFRAYRBPAJT6HEGWXW0K.jpg',
        mime: '',
        width: 524,
        height: 808,
        cases: [2],
      },
      {
        src: 'https://st-preown-stable.tsum.com/sig/52355b619e61c5255d1c924a3f91e43c/height/808/document-hub/01GXE5AFW5ZCVR0DW5MQ4DXMHD.jpg',
        mime: '',
        width: 524,
        height: 808,
        cases: [2],
      },
    ],
    imagesLarge: [
      {
        src: 'https://st-preown-stable.tsum.com/sig/915854774c62da038dcadc839544fc6a/height/1526/document-hub/01GXE5AFRAYRBPAJT6HEGWXW0K.jpg',
        mime: '',
        width: 990,
        height: 1526,
        cases: [3],
      },
      {
        src: 'https://st-preown-stable.tsum.com/sig/e16721c80aed795386c1d523d6e2d24e/height/1526/document-hub/01GXE5AFW5ZCVR0DW5MQ4DXMHD.jpg',
        mime: '',
        width: 990,
        height: 1526,
        cases: [3],
      },
    ],
    absoluteLink: '',
    labels: [
      {
        id: '3',
        value: 'Доступно в шоуруме',
        description: '',
      },
    ],
    itemOffers: [
      {
        offerCode: '0000715FR122638',
        price: {
          currencyCode: 'RUB',
          units: '400000000',
        },
        sellerData: undefined,
        finalPrice: undefined,
      },
    ],
    favorite: false,
    inCart: false,
    size: {
      russianSize: '',
      russianLabel: '',
      vendorSize: '',
      vendorLabel: '',
    },
    condition: {
      state: 3,
      description: 'Незначительные следы носки',
      link: '',
    },
    quantity: '1',
    collection: {
      gender: 'female',
      code: 'COLL-83',
      title: 'сумки с ручками',
      slug: 'slug',
    },
    tsumPrice: {
      currencyCode: 'RUB',
      units: '477500000',
    },
    discountPercent: 10,
    kit: 'Фирменный пыльник, замок с двумя ключами',
    isUsed: true,
    availableToCollect: true,
    sections: ['female'],
    fromTsum: false,
    isCollected: false,
    isVisible: true,
  };
}

const makeSmallPrice = (item: Item): Item => {
  return {
    ...item,
    tsumPrice: { currencyCode: 'RUB', units: '4775000' },
    itemOffers: [
      {
        offerCode: '0000715FR122638',
        price: {
          currencyCode: 'RUB',
          units: '40000',
        },
        sellerData: undefined,
        finalPrice: undefined,
      },
    ],
  };
};

const removeDiscountPrice = (item: Item): Item => {
  return {
    ...item,
    itemOffers: [
      {
        offerCode: '0000715FR122638',
        price: undefined,
        sellerData: undefined,
        finalPrice: undefined,
      },
    ],
  };
};

function createItems(): ItemsBlock {
  return {
    id: '1',
    title: 'Лучшие сумки для ценителей',
    items: [],
    scrollType: 0,
    button: {
      title: 'Смотреть все',
      payload: {
        title: '',
        type: 4,
        value: 'COLL2900',
        menuCode: '',
        slug: {
          type: SlugType.SLUG_TYPE_UNSPECIFIED,
          slug: '',
        },
      },
    },
    position: '5',
    itemsList: [createBlockItem(), removeDiscountPrice(createBlockItem()), createBlockItem(), createBlockItem()],
  };
}
function createItemsWithSmallPrice(): ItemsBlock {
  return {
    id: '1',
    title: 'Лучшие сумки для ценителей',
    items: [],
    scrollType: 0,
    button: {
      title: 'Смотреть все',
      payload: {
        title: '',
        type: 4,
        value: 'COLL2900',
        menuCode: '',
        slug: {
          type: SlugType.SLUG_TYPE_UNSPECIFIED,
          slug: '',
        },
      },
    },
    position: '5',
    itemsList: [
      makeSmallPrice(createBlockItem()),
      removeDiscountPrice(createBlockItem()),
      makeSmallPrice(createBlockItem()),
      makeSmallPrice(createBlockItem()),
    ],
  };
}

export const Default: StoryFn<typeof Items> = () => {
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Items device="mobile" verticalPriceAlignment item={createItems()} onProductClicked={console.log} />
      </div>
      <Items device="mobile" item={createItemsWithSmallPrice()} onProductClicked={console.log} />
    </>
  );
};
