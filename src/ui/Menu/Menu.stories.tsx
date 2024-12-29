import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/index';

import { Menu } from './Menu';

const meta = {
  title: '@/ui/Menu',
  component: Menu,
  args: {},
} satisfies Meta<typeof Menu>;

export default meta;

export const Default: StoryFn<typeof meta> = () => (
  <Space size="large" stretch>
    <Menu
      list={[
        {
          title: 'Активно',
          value: 'active',
          checked: true,
          onChange: console.log,
        },
        {
          title: 'Не активно',
          value: 'inactive',
          checked: false,
          onChange: console.log,
        },
      ]}
    />
  </Space>
);
