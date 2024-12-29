import type { Meta, StoryObj } from '@storybook/react';

import { BannersBlock } from '@/generated/customer_hub/entities/banners_block.v1';
import { Type } from '@/generated/customer_hub/enums/type';

import { Banner } from './View';

const meta = {
  title: 'Home/Banner',
  component: Banner,
  args: {
    banner: BannersBlock.create({
      id: 'id',
      title: 'Banner title 1',
      banners: [
        {
          image: {
            src: 'https://placehold.jp/3d4070/ffffff/961x1120.png',
            width: 961,
            height: 1120,
            mime: '',
            cases: [],
          },
          payload: {
            type: Type.BRAND,
            value: '203',
            menuCode: 'menu',
          },
          id: 'id',
        },
        {
          image: {
            src: 'https://placehold.jp/3d4070/ffffff/961x1120.png',
            width: 961,
            height: 1120,
            mime: '',
            cases: [],
          },
          payload: {
            type: Type.BRAND,
            value: '203',
            menuCode: 'menu',
          },
          id: 'id1',
        },
      ],
    }),
  },
  argTypes: {
    device: {
      options: ['desktop', 'mobile'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

export const Default: StoryObj<typeof Banner> = {};
