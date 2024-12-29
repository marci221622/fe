import type { Meta, StoryObj } from '@storybook/react';

import { checkout } from '../models';

import { Summary } from './View';

function Wrapper(props: any) {
  return <Summary checkout={checkout} {...props} />;
}

const meta = {
  title: 'Basket/Sammary',
  component: Wrapper,
} satisfies Meta<typeof Summary>;

export default meta;

type Story = StoryObj<typeof Summary>;

export const Default: Story = {
  args: {
    shortVarriant: false,
    isClickAndCollect: false,
    priceByRequestDescription: '',
    isQuickBy: false,
  },
};
