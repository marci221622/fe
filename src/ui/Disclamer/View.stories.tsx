import type { Meta, StoryObj } from '@storybook/react';

import { Disclamer } from './View';

const meta = {
  title: '@/ui/Disclamer',
  component: Disclamer,
  args: {
    children: <p>Ваш заказ будет доставлен 13 апреля с 10:00 до 18:00 курьерской службой ЦУМ</p>,
  },
} satisfies Meta<typeof Disclamer>;

export default meta;

type Story = StoryObj<typeof Disclamer>;

export const Default: Story = {
  args: {},
};
