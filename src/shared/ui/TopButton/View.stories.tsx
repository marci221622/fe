import type { Meta, StoryObj } from '@storybook/react';

import { TopButton } from './View';

const meta = {
  title: '@/shared/TopButton',
  component: TopButton,
  args: {},
} satisfies Meta<typeof TopButton>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    hardVisible: true,
  },
};
