import type { Meta, StoryFn } from '@storybook/react';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';

import { Space } from '@/ui/Space';

import { BrandsList } from './BrandsList';

const meta = {
  title: 'Brands/BrandsList',
  component: BrandsList,
  args: {},
} satisfies Meta<typeof BrandsList>;

export default meta;

const alphabet = Array.from({ length: 12 }).map((_, i) => String(i));
const group = alphabet.reduce(
  (acc, symbol) => ({
    ...acc,
    [symbol]: Array.from({ length: 10 }).map((_, i) => {
      const brand = Brand.create({ title: `Brand-${i}`, code: `code-${i}` });

      return {
        code: brand.code,
        title: brand.title,
      };
    }),
  }),
  {},
);

export const Default: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical" stretch>
      <BrandsList alphabetGroup={alphabet} brandsGroup={group} />
    </Space>
  );
};
