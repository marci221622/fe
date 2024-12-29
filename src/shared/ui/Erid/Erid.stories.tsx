import type { Meta, StoryFn } from '@storybook/react';

import { ERID } from '@/generated/customer_hub/entities/erid.v1';

import { Space } from '@/ui/Space';

import { EridAlert } from './Erid';

const meta = {
  title: '@/shared/Erid',
  component: EridAlert,
  args: {
    erid: ERID.create({ legalEntityName: 'OOO Moda', token: 'erid token' }),
  },
} satisfies Meta<typeof EridAlert>;

export default meta;

type Story = StoryFn<typeof EridAlert>;

export const Default: Story = ({ erid }) => {
  return (
    <Space stretch align="center">
      <EridAlert erid={erid} />
    </Space>
  );
};