import type { Meta, StoryFn } from '@storybook/react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { ItemOffer } from '@/generated/customer_hub/entities/item_offer.v1';

import { Space } from '@/ui/index';

import { ProductCard } from './ProductCard';

function Stub() {
  return null;
}

const meta = {
  title: '@/shared/ProductCard',
  component: Stub,
  args: { tagsVisibility: false, sizeVisibility: false },
} satisfies Meta<typeof ProductCard>;

export default meta;

const baseProduct = Item.create({
  title: 'Product large some title',
  imagesLarge: [{ src: 'https://placehold.jp/524x800.png' }],
  imagesMiddle: [{ src: 'https://placehold.jp/524x800.png' }],
  imagesSmall: [{ src: 'https://placehold.jp/524x800.png' }],
  labels: [{ id: 'label', value: 'label' }],
  size: { russianLabel: 'RU', russianSize: '45', vendorLabel: 'EN', vendorSize: '35' },
  tsumPrice: { currencyCode: 'RUB', units: '35000000' },
  itemOffers: [ItemOffer.create({ price: { currencyCode: 'RUB', units: '30500000' } })],
  brand: Brand.create({
    title: 'Balenciaga',
    logoLink: { src: 'https://placehold.jp/3d4070/ffffff/210x96.png?text=Balenciaga' },
  }),
});

const props = {
  priceVisibility: true,
  product: baseProduct,
  hasItem: true,
  isCollected: false,
};

const tagsVisibility = true;
const sizeVisibility = true;

export const FullVariant: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical" stretch>
      <Space size="large">
        <ProductCard
          {...props}
          type="large"
          tagsVisibility={tagsVisibility}
          sizeVisibility={sizeVisibility}
          product={{ ...props.product, discountPercent: undefined, labels: [], size: undefined }}
        />
        <ProductCard
          {...props}
          type="large"
          tagsVisibility={tagsVisibility}
          sizeVisibility={sizeVisibility}
          product={{ ...props.product, discountPercent: undefined }}
        />
        <ProductCard
          {...props}
          type="large"
          tagsVisibility={tagsVisibility}
          sizeVisibility={sizeVisibility}
          product={{ ...props.product, discountPercent: undefined, labels: [], size: undefined }}
        />
        <ProductCard
          {...props}
          type="large"
          isCollected
          tagsVisibility={tagsVisibility}
          sizeVisibility={sizeVisibility}
          product={{ ...props.product, discountPercent: undefined, labels: [], size: undefined }}
        />
      </Space>
    </Space>
  );
};

export const NoTagsVariant: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical" stretch>
      <Space size="large">
        <ProductCard {...props} type="large" product={{ ...props.product, labels: [], size: undefined }} />
        <ProductCard {...props} type="large" product={{ ...props.product, discountPercent: 99, labels: [] }} />
        <ProductCard {...props} type="large" hasItem={false} product={{ ...props.product, labels: [] }} />
        <ProductCard {...props} type="large" isCollected product={{ ...props.product, labels: [] }} />
      </Space>
    </Space>
  );
};

export const Middle: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <ProductCard {...props} type="middle" />
        <ProductCard {...props} type="middle" />
        <ProductCard {...props} hasItem={false} type="middle" />
        <ProductCard {...props} isCollected type="middle" />
      </Space>
    </Space>
  );
};

export const Minimal: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <ProductCard {...props} type="minimal" />
        <ProductCard {...props} type="minimal" />
        <ProductCard {...props} hasItem={false} type="minimal" />
        <ProductCard {...props} isCollected type="minimal" />
      </Space>
    </Space>
  );
};

export const WidgetMinimal: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <ProductCard
          {...props}
          sizeVisibility={false}
          tagsVisibility={false}
          type="minimal"
          handleFavorite={undefined}
        />
        <ProductCard
          {...props}
          sizeVisibility={false}
          tagsVisibility={false}
          type="minimal"
          handleFavorite={undefined}
        />
        <ProductCard
          {...props}
          sizeVisibility={false}
          tagsVisibility={false}
          hasItem={false}
          type="minimal"
          handleFavorite={undefined}
        />
        <ProductCard
          {...props}
          sizeVisibility={false}
          tagsVisibility={false}
          isCollected
          type="minimal"
          handleFavorite={undefined}
        />
      </Space>
    </Space>
  );
};

export const Alone: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <ProductCard {...props} />
      </Space>
    </Space>
  );
};
