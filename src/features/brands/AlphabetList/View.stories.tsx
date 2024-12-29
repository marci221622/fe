import type { Meta, StoryFn } from '@storybook/react';

import { AlphabetList } from './View';

const meta = {
  title: 'Brands/AlphabetList',
  args: {},
} satisfies Meta<unknown>;

export default meta;

export const Default: StoryFn<typeof AlphabetList> = () => {
  return <AlphabetList alphabetGroup={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'ru', '#']} />;
};
