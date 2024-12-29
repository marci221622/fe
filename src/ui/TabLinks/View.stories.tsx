import type { StoryFn, StoryObj } from '@storybook/react';

import { TabLinks } from './View';

export default {
  title: '@/ui/TabLinks',
  component: TabLinks,
  args: {
    tabs: [
      { label: 'Мужское', to: '/value1' },
      { label: 'Женское', to: '/value2' },
      { label: 'Детское', to: '/value3' },
    ],
    active: '/value1',
  },
} as StoryObj<typeof TabLinks>;

const Template: StoryFn<typeof TabLinks> = args => {
  return <TabLinks {...args} />;
};

export const Default = Template.bind({});
