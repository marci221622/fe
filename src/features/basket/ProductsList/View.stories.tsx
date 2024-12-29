import type { Meta, StoryFn } from '@storybook/react';
import { fork } from 'effector';
import { Provider, useUnit } from 'effector-react';
import React from 'react';

import { checkout } from '../models';
import { createBaseCartData } from '../tests';

import { ProductsList } from './View';

const meta = {
  title: 'Basket/ProductList',
  args: {},
} satisfies Meta<unknown>;

export default meta;

const scope = fork({
  values: new Map().set(checkout.cartQuery.$result, {
    cartData: createBaseCartData({ count: 10 }),
  }),
});

function withProvider(Component: React.FC) {
  return () => {
    return (
      <Provider value={scope}>
        <Component />
      </Provider>
    );
  };
}

export const Default: StoryFn<typeof ProductsList> = withProvider(() => {
  const data = useUnit(checkout.cartQuery.$result)!;

  return <ProductsList items={data.cartData?.items ?? []} />;
});
