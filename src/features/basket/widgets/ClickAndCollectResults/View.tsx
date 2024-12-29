import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import React from 'react';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { $clickAndCollectGrpcErrorMessages, $appIsShort, $mappedStrings } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';

import { modal } from '@/features/auth';

import { Responsive } from '@/ui/index';

import { Logo } from '@/ui/assets/Logo';

import { $collectedResult, $clickAndCollectDetailsError } from '../../models';

import { FailedContent } from './FailedContent';
import { ThanksContent } from './ThanksContent';

import st from './styles.module.scss';

export function ClickAndCollectHeader() {
  const modalField = useUnit(modal);
  const collectedResult = useUnit($collectedResult);
  const isAuth = useUnit($isAuthorized);
  const appIsShort = useUnit($appIsShort);
  const clickAndCollectDetailsError = useUnit($clickAndCollectDetailsError);
  const texts = useUnit($mappedStrings);

  const header = (
    <div className={st.header}>
      {collectedResult ? (
        <>
          <Responsive.TabletAndBelow>
            <Logo />
          </Responsive.TabletAndBelow>
          <Responsive.Desktop>
            <span>{!collectedResult ? texts.clickAndCollectCheckout.reserveItem : texts.successCheckout.title}</span>
          </Responsive.Desktop>
        </>
      ) : (
        <>
          <span>{texts.clickAndCollectCheckout.reserveItem}</span>
          {!isAuth && !appIsShort && (
            <div className={st.shortLogin} onClick={() => modalField.onChange('any')}>
              {texts.navBar.login}
            </div>
          )}
        </>
      )}
    </div>
  );

  return clickAndCollectDetailsError ? texts.clickAndCollectCheckout.reserve : header;
}

export function ClickAndCollectResults({
  children,
  closePopup,
  products,
  isOneClick,
}: {
  children: React.ReactNode;
  closePopup?: () => void;
  products?: CartItem[];
  // для ван клика и мульти могут быть разные ошибки
  isOneClick?: boolean;
}) {
  const { i18n } = useLingui();
  const errors = useUnit($clickAndCollectDetailsError);
  const collectedResult = useUnit($collectedResult);
  const messages = useUnit($clickAndCollectGrpcErrorMessages);

  const currentMessages = isOneClick ? messages.oneClickAndCollect : messages.multyClickAndCollect;

  const message = errors ? currentMessages[errors.subject] : '';

  if (errors) {
    return (
      <FailedContent
        message={message.replace('%@', errors.limit)}
        productIds={errors.productIds}
        closePopup={closePopup}
        products={products}
      />
    );
  }

  if (collectedResult) {
    return <ThanksContent order={collectedResult} />;
  }

  return children;
}
