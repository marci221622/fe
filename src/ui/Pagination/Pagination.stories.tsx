import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta = {
  title: '@/ui/Pagination',
  component: Pagination,
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    current: 2,
    total: 300,
    pageSize: 30,
  },
};
