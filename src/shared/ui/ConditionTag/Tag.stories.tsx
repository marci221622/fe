import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/index';

import { ConditionTag } from './Tag';

const meta = {
  title: '@/shared/ConditionTag',
  component: ConditionTag,
  args: {
    tag: 'Условный тег: исчезает при пустом тексте',
  },
} satisfies Meta<typeof ConditionTag>;

export default meta;

export const Default: StoryFn<typeof ConditionTag> = props => {
  return (
    <>
      <div>внутри Space direction=vertical</div>
      <Space direction="vertical">
        <ConditionTag {...props} />
      </Space>
      <hr />
      <div>внутри Space direction=vertical stretch</div>
      <Space direction="vertical" stretch>
        <ConditionTag {...props} />
      </Space>
      <hr />
      внутри P
      <p>
        <ConditionTag {...props} />
      </p>
      <hr />
      <div>без обёртки</div>
      <ConditionTag {...props} />
    </>
  );
};
