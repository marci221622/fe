import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import type { StoryFn, StoryObj } from '@storybook/react';

import { Segments } from './View';

export default {
  title: '@/ui/Segments',
  component: Segments,
  args: {
    options: [
      { label: 'label1', value: 'value1' },
      { label: 'label2', value: 'value2' },
    ],
    value: 'value1',
    name: 'text',
    onChange: action('onChange'),
  },
  argTypes: {
    options: {
      description: 'Массив принимающий объект с данными вкладок.',
    },
    value: {
      description: 'Активный элемент.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: 'Атрибут name для input.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as StoryObj<typeof Segments>;

const Template: StoryFn<typeof Segments> = ({ onChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => updateArgs({ value: event.target.value });

  return <Segments onChange={handleCheck} {...args} />;
};

export const Default = Template.bind({});
