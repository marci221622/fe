import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

const meta = {
  title: 'Features/Header',
  component: Header,
  args: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoOnly: false,
    isLoginPage: false,
    isCartPage: false,
    needMobileHeader: true,
    searchable: true,
  },
};
