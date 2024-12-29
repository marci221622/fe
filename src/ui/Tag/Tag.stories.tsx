import type { StoryObj } from '@storybook/react';

import { Tag } from './Tag';

type Story = StoryObj<typeof Tag>;

export default {
  title: '@/ui/Tag',
  component: Tag,
} as Story;

export const Default: Story = {
  args: { title: 'Tag title', active: true, isToggle: true, isSortable: false },
};
