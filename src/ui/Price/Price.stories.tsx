import type { Meta, StoryObj } from '@storybook/react';

import { Price } from './View';

const meta = {
  title: '@/ui/Price',
  component: Price,
  args: {
    original: 100000,
    withDiscount: 90000,
    revert: false,
    currency: 'RUB',
    discountPercent: 10,
    discountBelow: false,
    discountBelowOnMobile: false,
    bold: false,
    withLineThrought: false,
  },
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'normal'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Price>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
