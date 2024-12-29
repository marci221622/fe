import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/index';

import { StarIcon } from '@/ui/assets/icons';

import { FavoritesWidget } from './Favorites';
import { OrdersWidget } from './Orders';
import { WidgetBlock } from './View';

const meta = {
  title: 'Customer/Widgets',
  args: {},
} satisfies Meta<typeof WidgetBlock>;

export default meta;

export const Default: StoryFn<typeof WidgetBlock> = () => {
  return (
    <Space stretch>
      <WidgetBlock headerTitle="widget title" icon={<StarIcon />} navLink="/to">
        <p>content</p>
      </WidgetBlock>
    </Space>
  );
};

export const Orders: StoryFn<typeof WidgetBlock> = () => {
  return (
    <Space stretch>
      <OrdersWidget />
    </Space>
  );
};

export const Favorites: StoryFn<typeof WidgetBlock> = () => {
  return (
    <Space stretch>
      {' '}
      <FavoritesWidget />
    </Space>
  );
};
