import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useGate, useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';

import { Place } from '@/generated/customer_hub/enums/place';
import { getDYSelector } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { AB_TESTS, isVariationA } from '@/shared/configs/abTests';
import { LoyaltyBody, hasBodyLoyalty } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import {
  $checkoutPopupOpenedCounter,
  $someChekoutActionInProgress,
  fullReset,
  checkout,
  cardPayment,
  paymentStepField,
  initiatePayment,
  CartActions,
  CheckoutAsModal,
  CheckoutRequiredFieldsModal,
  CollectRequiredFieldsModal,
  SavedCardsGate,
  checkoutPopupField,
  collectStepField,
  initiateCollect,
} from '@/features/basket';

import { Typography, BreadcrumbsPane, Responsive } from '@/ui/index';

import { DesktopTemplate } from './Desktop';
import { MobileTemplate } from './MobileTemplate';

import st from './styles.module.scss';

const state = {
  stackCounter: $checkoutPopupOpenedCounter,
  notExistedItems: checkout.$notExistedProducts,
  existedItems: checkout.$existedProducts,
  notSelectedItems: checkout.$notSelectedProducts,
};

export default function BasketPage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const onReset = useUnit(fullReset);
  const initiator = useUnit(initiatePayment);
  const initiateCollectHandler = useUnit(initiateCollect);
  const { notExistedItems, existedItems } = useUnit(state);
  const loyalty = useLoyalty({
    place: Place.PLACE_CART,
    needUpdateShared: true,
    itemCodes: useMemo(
      () => existedItems.map(product => product.item?.code).filter(Boolean) as string[],
      [existedItems],
    ),
  });
  // const breadcrumbs = useFixedBreadcrumbs();
  const popup = useUnit(checkoutPopupField);
  const multiClickAndCollectvariation = useUnit(AB_TESTS.$multiClickAndCollect);

  const cartIsEmpty = existedItems.length === 0 && notExistedItems.length === 0;
  const noExistedItems = existedItems.length === 0;

  let modals = null;

  if (popup.value === 'checkout' || isVariationA(multiClickAndCollectvariation)) {
    modals = (
      <>
        <cardPayment.Content needOverlay={false} />
        <CheckoutRequiredFieldsModal
          stepField={paymentStepField}
          initiator={initiator}
          $pending={$someChekoutActionInProgress}
        />
      </>
    );
  }

  if (popup.value === 'multyClickAndCollect') {
    modals = (
      <CollectRequiredFieldsModal
        stepField={collectStepField}
        initiator={initiateCollectHandler}
        $pending={$someChekoutActionInProgress}
      />
    );
  }

  useGate(SavedCardsGate);

  useEffect(() => {
    return () => {
      onReset();
    };
  }, [onReset]);

  return (
    <section {...getDYSelector({ type: 'pageType', page: 'cartOrEmptyCart' })}>
      {!cartIsEmpty && hasBodyLoyalty(loyalty?.loyalty) && (
        <Responsive.Desktop className={st.loyaltyBody}>
          <LoyaltyBody loyalty={loyalty?.loyalty} place="cart" />
        </Responsive.Desktop>
      )}
      <Typography.PageTitle className={st.pageTitle}>{texts.web.cart}</Typography.PageTitle>

      <Responsive.TabletAndBelow>
        <MobileTemplate
          state={state}
          loyalty={loyalty?.loyalty}
          hasBodyLoyalty={hasBodyLoyalty(loyalty?.loyalty)}
          cartIsEmpty={cartIsEmpty}
          noExistedItems={noExistedItems}
        />
      </Responsive.TabletAndBelow>

      <Responsive.Desktop>
        <DesktopTemplate
          state={state}
          cartIsEmpty={cartIsEmpty}
          noExistedItems={noExistedItems}
          loyalty={loyalty?.loyalty}
        />
      </Responsive.Desktop>

      {isVariationA(multiClickAndCollectvariation) && (
        <BreadcrumbsPane
          noMargin
          noPadding
          className={cn(st.pane, {
            [st.visibility]: !cartIsEmpty,
          })}
        >
          {!noExistedItems && (
            <div className={st.actions}>
              <CartActions />
            </div>
          )}
        </BreadcrumbsPane>
      )}

      <CheckoutAsModal />
      {modals}
    </section>
  );
}
