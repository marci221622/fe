import { sample } from 'effector';

import { createField } from '@/lib/createField';

import { AddedToCartParams } from '../../types';

import { addToCardMutation } from './actions';

export const cartNotification = createField<AddedToCartParams | null>(null);

sample({
  clock: addToCardMutation.fx.done,
  fn: ({ params }) => params[0],
  target: cartNotification.change,
});
