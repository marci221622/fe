import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/index';

import { CarouselArrow } from './View';

const meta = {
  title: '@/ui/CarouselArrow',
  component: CarouselArrow,
  args: {},
} satisfies Meta<typeof CarouselArrow>;

export default meta;

export const Default: StoryFn<typeof meta> = () => (
  <Space size="large">
    <CarouselArrow direction="left" />
    <CarouselArrow direction="right" />
  </Space>
);
