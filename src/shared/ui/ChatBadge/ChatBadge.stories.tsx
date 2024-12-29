import type { Meta, StoryObj } from '@storybook/react';

import { ChatBadge } from './View';

const meta = {
  title: '@/ui/ChatBadge',
  component: ChatBadge,
  args: {},
} satisfies Meta<typeof ChatBadge>;

export default meta;

type Story = StoryObj<typeof ChatBadge>;

export const Default: Story = {
  args: {},
};
