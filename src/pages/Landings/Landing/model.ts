import { createEvent, sample } from 'effector';

import { sendOrderRequest } from '@/features/landings';

import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';

import { Form } from './SellerForm/schema';

const resetSellerForm = createEvent();

export const sellerModal = createField(false);

const phoneKey = 'contact';
const nameKey = 'name';
const offerDescriptionKey = 'offer_description';

export const sendOrderForSaleMutation = createMutation({
  handler: ([{ name, phone }]: FxParams<Form>) =>
    sendOrderRequest({
      body: {
        placeholderToValue: [
          { key: nameKey, value: name },
          { key: phoneKey, value: phone },
          // TODO: реализовать функционал ввода описания? вместо этого хардкода
          { key: offerDescriptionKey, value: 'Заявка на продажу с Лендинга collect.tsum.ru' },
        ],
      },
    }),
});

sample({
  source: sendOrderForSaleMutation.fx.done,
  fn: () => true,
  target: sellerModal.change,
});

sample({
  clock: resetSellerForm,
  target: [sendOrderForSaleMutation.reset, sellerModal.reset],
});
