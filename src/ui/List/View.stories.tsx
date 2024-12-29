import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/index';

import { ProfileIcon } from '@/ui/assets/icons';

import { List } from './View';

const meta = {
  title: '@/ui/List',
  component: List,
  args: {},
} satisfies Meta<typeof List>;

export default meta;

export const Default: StoryFn<typeof meta> = () => (
  <Space size="large">
    <List
      items={[
        {
          icon: <ProfileIcon />,
          label: 'item 1',
          to: '/',
          subtitle: 'Профиль саб тайтл',
        },
        {
          icon: <ProfileIcon />,
          label: 'item 2',
          to: '/1',
        },
        {
          icon: <ProfileIcon />,
          label: 'item 3',
          to: '/2',
        },
        {
          icon: <ProfileIcon />,
          label: 'item 4',
          to: '/3',
          subtitle: 'Профиль саб тайтл',
        },
      ]}
    />
  </Space>
);
