import { defineMessage } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import cTypes from 'creditcards-types';
import mirType from 'creditcards-types/types/mir';
import { Store } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

import {
  ProcessCheckoutResponse,
  ProcessCheckoutResponse_Result,
} from '@/generated/customer_hub/methods/checkout/process_checkout.v1';
import { ListSavedCardsResponse_SavedCardData } from '@/generated/customer_hub/methods/customer/list_saved_cards.v1';
import { $mappedStrings } from '@/shared/configs';

import { runtimeConfig } from '@/constants/runtimeConfig';

import { FieldType } from '@/lib/createField';

import { Button, Input, MaskedInput, Space, Typography } from '@/ui/index';

import { ExeptionIcon, paymentIcons, iconsScheme } from '@/ui/assets/icons';

import { IFrame } from './IFrame';
import { getCardNumberFromSavedCard } from './lib';
import { resolver, Form, DEFAULT_FORM_VALUES } from './scheme';
import { SilentForm } from './SilentForm';

import st from './styles.module.scss';

type Props = {
  startProcess: (form: Form & { mode?: string; cardId?: string }) => void;
  processResult: ProcessCheckoutResponse | null;
  someInProgress: boolean;
  receivedField: FieldType<{ paRes: string; transactionId: string } | null>;
  savedCard: ListSavedCardsResponse_SavedCardData | null;
  $cryptogramErrors: Store<CPCreptogramCreateError | null>;
  $paymentError: Store<boolean>;
  onReset: () => void;
};

const getErrorMessage = (error: CPCreptogramCreateError | null) => {
  if (error) {
    return defineMessage({ message: 'Данные карты указаны неверно' });
  }

  return null;
};

export function CloudPaymentsWidget({
  startProcess,
  processResult,
  someInProgress,
  receivedField,
  savedCard,
  $cryptogramErrors,
  $paymentError,
  onReset: paymentReset,
}: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit, watch } = useForm<Form>({
    resolver,
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onBlur',
  });
  const received = useUnit(receivedField);
  const cryptogramErrors = useUnit($cryptogramErrors);
  const paymentError = useUnit($paymentError);

  const cardNumber = watch('cardNumber');

  const type = useMemo(() => [...cTypes, mirType].find(it => it.test(cardNumber ?? '', true)), [cardNumber]);
  const icon = iconsScheme[type?.name ?? ''] ?? <paymentIcons.DefaultIcon />;
  const need3ds = processResult?.result === ProcessCheckoutResponse_Result.PROCESS_RESULT_3DS_PENDING;
  const needShowIframe = need3ds && !received.value;

  useEffect(() => {
    const cb = (event: MessageEvent<{ paRes?: string; transactionId?: string }>) => {
      if (event.origin === `${runtimeConfig.HOSTNAME}` && event.data.paRes && event.data.transactionId) {
        // @ts-ignore
        received.onChange(event.data);
      }
    };

    window.addEventListener('message', cb, false);

    return () => {
      window.removeEventListener('message', cb);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- зависимость received напрямую не нужна
  }, [received.onChange]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (need3ds) {
      formRef.current?.submit();
    }
  }, [processResult, need3ds]);

  useEffect(() => {
    return () => {
      paymentReset();
    };
  }, [paymentReset]);

  const errors = (
    <>
      {getErrorMessage(cryptogramErrors) && (
        <Typography.Paragraph center className={st.exeption}>
          {i18n._(getErrorMessage(cryptogramErrors) ?? '')}
        </Typography.Paragraph>
      )}

      {paymentError && (
        <Typography.Paragraph center className={st.exeption}>
          {texts.web.failedToOrderTryAgain}
        </Typography.Paragraph>
      )}
    </>
  );

  if (savedCard) {
    const typeFromSavedCard = [...cTypes, mirType].find(it => it.test(getCardNumberFromSavedCard(savedCard), false));
    const icon = iconsScheme[typeFromSavedCard?.name ?? ''] || <paymentIcons.DefaultIcon />;

    return (
      <form
        className={cn(st.form, {
          [st.secureActivated]: needShowIframe,
        })}
        onSubmit={handleSubmit(form =>
          startProcess({
            cvv: form.cvv,
            mode: 'cvv',
            cardId: savedCard.id,
          }),
        )}
      >
        <div>
          <Space direction="vertical" stretch align="center" className={st.shortCard}>
            {icon}
            <Typography.Paragraph center className={st.panCard}>
              {savedCard.pan.slice(-8)}
            </Typography.Paragraph>
          </Space>

          <Typography.Paragraph center className={st.cvvDescription}>
            {texts.web.placeholders.enterCVV}
          </Typography.Paragraph>

          <Space direction="vertical" size="large" className={st.card} stretch>
            <Input withShadow placeholder={texts.web.placeholders.enterCVV} {...register('cvv')} type="password" />
          </Space>
        </div>

        {errors}

        <Button type="submit" stretch size="L" className={st.action} pending={someInProgress} colored>
          {texts.web.pay}
        </Button>

        <SilentForm ref={formRef} processResult={processResult} />
        <IFrame displayed={needShowIframe} />
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(startProcess)}
      className={cn(st.form, st.cardsList, {
        [st.secureActivated]: needShowIframe,
      })}
    >
      <Space direction="vertical" size="large" className={st.card}>
        <MaskedInput
          maskProps={{
            mask: '9999 9999 9999 9999',
          }}
          placeholder={texts.bankCard.input.number.placeholder}
          withShadow
          Prefix={icon ?? null}
          {...register('cardNumber')}
          suffix={cryptogramErrors?.cardNumber ? <ExeptionIcon /> : null}
        />
        <Space size="large" stretch className={st.pairInputs}>
          <MaskedInput
            maskProps={{
              mask: '99 / 99',
            }}
            withShadow
            placeholder={texts.bankCard.input.date.placeholder}
            {...register('date')}
            suffix={cryptogramErrors?.expDateMonth || cryptogramErrors?.expDateYear ? <ExeptionIcon /> : null}
          />
          <Input
            withShadow
            placeholder={texts.bankCard.input.cvv.placeholder}
            {...register('cvv')}
            type="password"
            suffix={cryptogramErrors?.cvv ? <ExeptionIcon /> : null}
          />
        </Space>
      </Space>
      {errors}

      <Button type="submit" stretch size="L" className={st.action} pending={someInProgress} colored>
        {texts.web.pay}
      </Button>

      <SilentForm ref={formRef} processResult={processResult} />
      <IFrame displayed={needShowIframe} />
    </form>
  );
}
