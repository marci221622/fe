import { combine, createEffect, createEvent, createStore, sample, Store } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';

import { CheckoutData } from '@/generated/customer_hub/entities/checkout_data.v1';
import {
  ProcessCheckoutResponse,
  ProcessCheckoutResponse_Result,
} from '@/generated/customer_hub/methods/checkout/process_checkout.v1';
import { ListSavedCardsResponse_SavedCardData } from '@/generated/customer_hub/methods/customer/list_saved_cards.v1';
import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { bridge } from '@/lib/bridge';
import { createField } from '@/lib/createField';
import { createMutation, FxParams } from '@/lib/createMutation';

import { OverlayLoader } from '@/ui/index';

import { processCheckoutFx, setPaymentResultFx } from './api';
import { createCryptogram } from './createCryptogram';
import { SavedCardsList } from './SavedCards';
import { Form } from './scheme';
import { CloudPaymentsWidget } from './Widget';

import st from './styles.module.scss';

export function createCardPayments({
  $savedCards,
  $temporaryCartCode,
}: {
  $savedCards: Store<ListSavedCardsResponse_SavedCardData[]>;
  $temporaryCartCode: Store<string>;
}) {
  const paymentPopup = createField(false);

  const initiatePayment = createEvent<Form & { mode?: string; cardId?: string }>();
  const processResultField = createField<ProcessCheckoutResponse | null>(null);
  const reset = createEvent();
  const $cryptogramErrors = createStore<CPCreptogramCreateError | null>(null);
  // Получить из фрейма событие в message
  const receivedField = createField<{ paRes: string; transactionId: string } | null>(null);
  const paymentSuccess = createEvent<{ data: CheckoutData; orderCode?: string }>();

  // Получить криптограмму из клауд пеймент сдк
  const createCryptogramFx = createEffect<
    CPCryptogramParams & { mode?: string; cardId?: string },
    string,
    CPCreptogramCreateError
  >(async ({ mode, cardId: _, ...form }) => {
    return createCryptogram(form, mode)
      .then(crypto => {
        if (process?.env?.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('createCryptogramFx-done', { crypto, form, mode });
        }

        return crypto;
      })
      .catch(error => {
        if (process?.env?.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('createCryptogramFx-fail', { error, form, mode });
        }

        throw error;
      });
  });

  // Запроцессить платежку (в ответе pareq и тд)
  // cartCode для оплаты разных типов чекаута
  const processMutation = createMutation({
    handler: async ([params]: FxParams<{ cryptogram: string; cardId?: string; cartCode?: string }>) => {
      const rs = await processCheckoutFx({
        body: { ...params },
      });

      return rs;
    },
  });

  // Подтвердить 3дс
  // cartCode для оплаты разных типов чекаута
  const setPaymentResult = createMutation({
    handler: async ([params]: FxParams<{ paRes: string; cartCode?: string }>) => {
      const rs = await setPaymentResultFx({
        body: { ...params },
      });

      return rs;
    },
  });

  const $paymentError = combine([setPaymentResult.$error, processMutation.$error]).map(errors => errors.some(Boolean));

  $cryptogramErrors.on(createCryptogramFx.failData, (_, errors) => errors).reset(createCryptogramFx);

  // инициируем платеж (получить криптограму)
  sample({
    clock: initiatePayment,
    fn: form => {
      const slice: CPCryptogramParams & { mode?: string; cardId?: string } = {
        cvv: form.cvv,
        cardNumber: form.cardNumber,
        expDateMonth: undefined,
        expDateYear: undefined,
        mode: form.mode,
        cardId: form.cardId,
      };

      if (form.date) {
        const [month = '', year = ''] = form.date.split(' / ');

        slice.expDateMonth = month;
        slice.expDateYear = year;
      }

      return slice;
    },
    target: [createCryptogramFx, processMutation.reset, setPaymentResult.reset],
  });

  // старт транзакции с криптограмой
  bridge(() => {
    sample({
      source: $temporaryCartCode,
      clock: createCryptogramFx.done,
      fn: (code, { params, result }) => ({ cryptogram: result, cardId: params.cardId, cartCode: code }),
      target: processMutation.start,
    });

    sample({
      clock: processMutation.fx.doneData,
      target: processResultField.change,
    });
  });

  // проверка 3дс завершилась - все закрыть
  bridge(() => {
    sample({
      clock: processMutation.fx.doneData,
      filter: rs =>
        [
          ProcessCheckoutResponse_Result.PROCESS_RESULT_SUCCESS,
          ProcessCheckoutResponse_Result.PROCESS_RESULT_PAYMENT_PENDING,
        ].includes(rs.result) && !!rs.checkoutState,
      fn: rs => ({ data: rs.checkoutState as CheckoutData, orderCode: rs.orderCode }),
      target: [paymentSuccess, paymentPopup.change.prepend(() => false)],
    });

    sample({
      clock: [setPaymentResult.fx.failData, processMutation.fx.failData],
      target: [processResultField.reset, receivedField.reset],
    });

    sample({
      clock: setPaymentResult.fx.doneData,
      filter: rs => !!rs.checkoutData,
      fn: rs => ({ data: rs.checkoutData as CheckoutData, orderCode: rs.orderCode }),
      target: [paymentSuccess, paymentPopup.change.prepend(() => false)],
    });

    sample({
      source: $temporaryCartCode,
      clock: receivedField.change,
      filter: (_, rs) => !!rs,
      fn: (code, rs) =>
        ({ paRes: rs?.paRes, cartCode: code } as {
          paRes: string;
          cartCode?: string;
        }),
      target: setPaymentResult.start,
    });

    sample({
      clock: paymentPopup.change,
      filter: it => it === false,
      target: reset,
    });

    sample({
      clock: reset,
      target: [
        setPaymentResult.reset,
        $cryptogramErrors.reinit!,
        processMutation.reset,
        processResultField.reset,
        receivedField.reset,
      ],
    });
  });

  function Content({
    needOverlay,
    shouldCloseOnOverlayClick,
  }: {
    needOverlay: boolean;
    shouldCloseOnOverlayClick?: boolean;
  }) {
    const [selectedCard, setSelectedCard] = useState<ListSavedCardsResponse_SavedCardData | null>(null);
    const savedCards = useUnit($savedCards);
    const popup = useUnit(paymentPopup);
    const process = useUnit(initiatePayment);
    const texts = useUnit($mappedStrings);
    const processResult = useUnit(processResultField.$value);
    const pendings = useUnit([processMutation.fx.pending, createCryptogramFx.pending, setPaymentResult.$pending]);
    const [step, setStep] = useState<'widget' | 'selectCard'>('selectCard');
    const onReset = useUnit(reset);

    const isSelectedCardStep = savedCards.length > 0 && step === 'selectCard';
    const canGoBacktoSelectCard = savedCards.length > 0 && step === 'widget';
    const someInProgress = pendings.some(Boolean);

    const header = isSelectedCardStep ? texts.orderDetails.info.paymentMethod.title : texts.bankCard.input.title;
    const content = isSelectedCardStep ? (
      <SavedCardsList
        savedCards={savedCards}
        setSelectedCard={setSelectedCard}
        savedCard={selectedCard}
        processPayment={setStep}
      />
    ) : (
      <CloudPaymentsWidget
        savedCard={selectedCard}
        startProcess={process}
        processResult={processResult}
        someInProgress={someInProgress}
        receivedField={receivedField}
        $cryptogramErrors={$cryptogramErrors}
        $paymentError={$paymentError}
        onReset={onReset}
      />
    );

    // eslint-disable-next-line consistent-return
    useEffect(() => {
      if (popup.value) {
        return () => {
          setSelectedCard(null);
          setStep('selectCard');
        };
      }
    }, [popup.value]);

    return (
      <Modal
        mobileFullScreen
        open={popup.value}
        header={header}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        backActionType={canGoBacktoSelectCard ? 'back' : 'close'}
        onActionClick={type => {
          if (type === 'close') {
            popup.onChange(false);
          }

          if (type === 'back' && canGoBacktoSelectCard) {
            setStep('selectCard');
          }
        }}
        wrapClassName={st.modalWrapper}
        bodyClassName={st.bodyClassName}
        onChange={() => {
          if (!someInProgress) {
            popup.onChange(false);
          }
        }}
      >
        <OverlayLoader isLoading={needOverlay}>{content}</OverlayLoader>
      </Modal>
    );
  }

  return {
    initiatePayment,
    onReceivedResult: sample({ clock: receivedField.$value, filter: Boolean }),
    paymentSuccess,
    paymentPopup,
    Content,
  };
}
