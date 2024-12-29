import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { BreadcrumbsUI, BreadcrumbsPane } from './View';

const Example: StoryFn<typeof BreadcrumbsUI> = props => {
  return (
    <BreadcrumbsPane>
      <BreadcrumbsUI {...props} />
    </BreadcrumbsPane>
  );
};

const meta = {
  title: '@/ui/Breadcrumbs',
  component: BreadcrumbsUI,
  args: {
    breadcrumbs: [
      {
        title: 'Главная',
        to: '/',
      },
      {
        title: 'Каталог',
        to: '/catalog',
      },
    ],
  },
} satisfies Meta<typeof BreadcrumbsUI>;

export default meta;

type Story = StoryObj<typeof BreadcrumbsUI>;

export const Default: Story = {
  args: {},
};

export const withPane: Story = Example.bind({});
