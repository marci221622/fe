import type { StoryFn, StoryObj } from '@storybook/react';

import { Space } from '@/ui/Space';

import { PageTitle } from './PageTitle';
import { Paragraph } from './Paragraph';
import { Title } from './Title';

export default {
  title: '@/ui/Typography',
} as StoryObj<unknown>;

const Template: StoryFn<unknown> = () => {
  return (
    <Space size="large" direction="vertical">
      <Title>Title component</Title>
      <PageTitle>PageTitle component</PageTitle>
      <Paragraph>Paragraph component</Paragraph>
      <Paragraph bold>Paragraph component bold</Paragraph>
    </Space>
  );
};

export const Default = Template.bind({});
