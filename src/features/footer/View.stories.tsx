import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './View';

const meta = {
  title: 'Features/Footer',
  component: Footer,
  args: {},
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
