import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/index';

import { Button } from './View';

const meta = {
  title: '@/ui/Button',
  component: Button,
  args: {
    reverse: false,
    colored: false,
    bold: false,
    stretch: false,
    disabled: false,
    pending: false,
    outline: false,
    asText: false,
  },
  argTypes: {
    size: {
      options: ['XS', 'S', 'L', 'M'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default: StoryFn<typeof Button> = props => {
  return (
    <Space stretch>
      <Button {...props}>Click me!</Button>
    </Space>
  );
};
