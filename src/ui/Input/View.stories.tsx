import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '../Space';

import { MaskedInput } from './Masked';
import { Input } from './View';

const meta = {
  title: '@/ui/Input',
  component: Input,
  args: {
    outline: false,
    closable: false,
    bordered: false,
    withShadow: false,
    showStab: false,
    simple: false,
    disabled: false,
    stretch: false,
  },
  argTypes: {
    closeIcon: {
      options: ['default', 'stroked'],
      control: { type: 'select' },
    },
    variant: {
      options: ['light', 'dark'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Default: StoryFn<typeof Input> = props => {
  return <Input {...props} placeholder="Placeholder" />;
};

export const Masked: StoryFn<typeof MaskedInput> = props => {
  return (
    <Space stretch direction="vertical" size="large">
      <MaskedInput {...props} placeholder="" Prefix="От" maskProps={{ mask: { type: 'currency' } }} closable />
    </Space>
  );
};

