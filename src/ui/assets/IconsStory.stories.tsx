import type { Meta, StoryFn } from '@storybook/react';
import React, { createElement } from 'react';

import { Space, Typography } from '@/ui/index';

import * as Icons from './icons';

const meta = {
  title: '@/ui/Icons',
  args: {},
} satisfies Meta<unknown>;

export default meta;

function sort(x: string, y: string) {
  if (x < y) {
    return -1;
  }

  if (x > y) {
    return 1;
  }

  return 0;
}

type IconType = React.FunctionComponent<{ color?: string }>;

function isIcon(something: unknown): something is IconType {
  const isFunction = typeof something === 'function';
  const hasTypeOf =
    typeof something === 'object' && !!something && '$$typeof' in something && something.$$typeof !== 'undefined';

  // typeof something?.$$typeof !== 'undefined'
  return isFunction || hasTypeOf;
}

function getIcon<T>(icons: T, name: string): IconType | null {
  const icon = (icons as T & Record<string, unknown>)[name];

  return isIcon(icon) ? icon : null;
}

export const Default: StoryFn<typeof meta> = () => {
  return (
    <Space size="large" direction="vertical">
      <Typography.Title>Все иконки</Typography.Title>
      <Space size="large" wrap>
        {Object.keys(Icons)
          .sort((x, y) => sort(x, y))
          .map(key => {
            const icon = getIcon(Icons, key);

            return icon ? (
              <Space direction="vertical" align="center">
                {createElement(icon, {
                  color: 'black',
                })}

                <Typography.Paragraph>{key}</Typography.Paragraph>
              </Space>
            ) : null;
          })
          .filter(Boolean)}
      </Space>
      <br />
      <Typography.Title>Иконки оплаты</Typography.Title>
      aka paymentIcons
      <Space size="large" wrap align="center">
        {Object.keys(Icons.paymentIcons)
          .sort((x, y) => sort(x, y))
          .map(key => {
            const icon = getIcon(Icons.paymentIcons, key);

            return icon ? (
              <Space direction="vertical" align="center">
                {createElement(icon, {})}

                <Typography.Paragraph>{key}</Typography.Paragraph>
              </Space>
            ) : null;
          })
          .filter(Boolean)}
      </Space>
      <br />
      <Typography.Title>Иконки Click and Collect</Typography.Title>
      aka clickAndCollectIcons
      <Space size="large" wrap align="center">
        {Object.keys(Icons.clickAndCollectIcons)
          .sort((x, y) => sort(x, y))
          .map(key => {
            const icon = getIcon(Icons.clickAndCollectIcons, key);

            return icon ? (
              <Space direction="vertical" align="center">
                {createElement(icon, {})}

                <Typography.Paragraph>{key}</Typography.Paragraph>
              </Space>
            ) : null;
          })
          .filter(Boolean)}
      </Space>
    </Space>
  );
};

