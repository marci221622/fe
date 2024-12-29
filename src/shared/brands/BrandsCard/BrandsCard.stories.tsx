import type { Meta, StoryFn } from '@storybook/react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Section } from '@/generated/customer_hub/enums/section';

import { Space } from '@/ui/Space';

import { BrandsCard } from './BrandsCard';

const meta = {
  title: '@/shared/BrandsCard',
  component: BrandsCard,
  args: {},
} satisfies Meta<typeof BrandsCard>;

export default meta;

const itemImage =
  'https://preowned-cdn.tsum.com/sig/c7136393abb539a971caf1a783621309/fit/282x434/document-hub/01HDP6MZP9XBNVYD8CWYEX1XDR.jpg';
const brandImage =
  'https://preowned-cdn.tsum.com/sig/628ee1d0b9d4844d0360c20ccc2de0b1/width/0/document-hub/01GD2G12CPC8GBKGD3JT8541XW.png';

const item = Item.create({
  title: 'товар х',
  imagesMiddle: [{ src: itemImage }],
  imagesSmall: [{ src: itemImage }],
});

const brand = Brand.create({
  title: 'moncler',
  id: '1',
  code: 'code',
  logoLink: { src: brandImage },
});

export const Default: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical" stretch>
      <BrandsCard
        items={[item, item, item, item, item, item, item, item, item]}
        brand={brand}
        activeGender={Section.SECTION_FEMALE}
      />
      <BrandsCard items={[item]} brand={brand} activeGender={Section.SECTION_FEMALE} />
      <BrandsCard items={[item]} brand={brand} activeGender={Section.SECTION_FEMALE} />
    </Space>
  );
};
