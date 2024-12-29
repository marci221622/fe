import type { Meta, StoryFn } from '@storybook/react';

import { Space } from '@/ui/Space';
import { Typography } from '@/ui/Typography';

import { Accordion } from './Accordion';
import { useAccordionTrigger } from './hooks';

const meta = {
  title: '@/ui/Accordion',
  args: {},
} satisfies Meta<unknown>;

export default meta;

const INFO = [
  {
    title: 'title 1',
    links: [
      { text: 'paragraph 1', href: '' },
      { text: 'paragraph 2', href: '' },
    ],
  },
  {
    title: 'title 2',
    links: [
      { text: 'paragraph 1', href: '' },
      { text: 'paragraph 2', href: '' },
    ],
  },
  {
    title: 'title 3',
    links: [
      { text: 'paragraph 1', href: '' },
      { text: 'paragraph 2', href: '' },
    ],
  },
];

export const Default: StoryFn<typeof meta> = () => {
  const [activePanels, { changePanels }] = useAccordionTrigger({
    isMultiply: true,
    initialKey: INFO[0].title,
  });

  return (
    <Space size="large" stretch>
      <Accordion activePanels={activePanels} onChange={changePanels}>
        {INFO.map(it => (
          <Accordion.Panel key={it.title} title={() => it.title}>
            {it.links.map((link, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Typography.Paragraph key={idx}>{link.text}</Typography.Paragraph>
            ))}
          </Accordion.Panel>
        ))}
      </Accordion>
    </Space>
  );
};
