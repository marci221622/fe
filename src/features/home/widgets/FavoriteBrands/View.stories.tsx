import type { Meta, StoryFn } from '@storybook/react';

import { FavoriteBrandsBannersBlock } from '@/generated/customer_hub/entities/banners_block.v1';
import { BrandItems } from '@/generated/customer_hub/entities/brand_items.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';

import { FavoriteBrands } from './FavoriteBrands';

const meta = {
  title: 'Home/FavoriteBrands',
  args: {},
} satisfies Meta<unknown>;

export default meta;

const baseItems = Array.from({ length: 2 }).map((_, i) =>
  Item.create({
    imagesMiddle: [{ src: 'https://placehold.co/400x600', width: 400, height: 600 }],
    title: `Product - ${i}`,
  }),
);

function createBanner() {
  return FavoriteBrandsBannersBlock.create({
    title: 'Новинки в любимых брендах',
    brandsItems: [
      BrandItems.create({ brandCode: 'adidas', items: baseItems }),
      BrandItems.create({ brandCode: 'must', items: baseItems }),
      BrandItems.create({ brandCode: 'puma', items: baseItems }),
    ],
  });
}

export const Desktop: StoryFn<typeof FavoriteBrands> = () => {
  return (
    <div style={{ maxWidth: '1184px', margin: '0 auto' }}>
      <FavoriteBrands device="desktop" block={createBanner()} />
    </div>
  );
};

export const Mobile: StoryFn<typeof FavoriteBrands> = () => {
  return (
    <div style={{ maxWidth: '1184px', margin: '0 auto' }}>
      <FavoriteBrands device="mobile" block={createBanner()} />
    </div>
  );
};
