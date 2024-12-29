import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { CheckoutType } from '@/generated/customer_hub/enums/checkout_type';
import { $mappedStrings } from '@/shared/configs';
import { ClickCollectOnboarding, OnboardingContent, useMultyClickAndCollect } from '@/shared/onboardings';

import { useViewport } from '@/lib/hooks';

import { Button, OverlayLoader, Responsive, Space } from '@/ui/index';

import { DeliveryIcon } from '@/ui/assets/icons';

import { $someCartActionInProgress, toggleSelectMutation } from '../../cart';
import {
  $everyNotSelected,
  $someChekoutActionInProgress,
  $someClickCollectInProgress,
  basketAnalytics,
  checkout,
  switchCheckoutTypeMutation,
} from '../../models';

import st from './styles.module.scss';

const state = {
  someCartActionInProgress: $someCartActionInProgress,
  someClickCollectInProgress: $someClickCollectInProgress,
  someChekoutActionInProgress: $someChekoutActionInProgress,
  existedItems: checkout.$existedProducts,
  hasNoSelectedItems: checkout.$hasNoSelectedItems,
  selectedProductsCounter: checkout.$selectedProductsCounter,
  everyNotSelected: $everyNotSelected,
};

export function MultyClickAndCollectActions() {
  const { i18n } = useLingui();
  const beginCheckoutAnalytic = useUnit(basketAnalytics.checkoutBegin);
  const switchType = useUnit(switchCheckoutTypeMutation);
  const toggleSelect = useUnit(toggleSelectMutation);
  const texts = useUnit($mappedStrings);
  const onboardings = useMultyClickAndCollect({ page: 'Cart' });
  const { isTabletAndBelow } = useViewport();
  const {
    someCartActionInProgress,
    someClickCollectInProgress,
    someChekoutActionInProgress,
    existedItems,
    hasNoSelectedItems,
    selectedProductsCounter,
    everyNotSelected,
  } = useUnit(state);

  const pending =
    someCartActionInProgress || someChekoutActionInProgress || someClickCollectInProgress || switchType.pending;

  const selectAll = () => {
    toggleSelect.start({
      items: existedItems,
      selected: false,
    });
  };

  const action = (type: CheckoutType) => {
    beginCheckoutAnalytic({ items: existedItems, partial: hasNoSelectedItems });
    switchType.start({ type });
  };

  const clickCollectAction = (
    <ClickCollectOnboarding
      positions={isTabletAndBelow ? 'top' : 'bottom'}
      isOpen={!!onboardings.text && onboardings.onboarding.popup.isOpen}
      closePopup={onboardings.onboarding.closePopup}
      onAction={() => {
        onboardings.onboarding.closePopup();
        action(CheckoutType.CHECKOUT_TYPE_CLICK_AND_COLLECT);
      }}
      icon={onAction => (
        <Button
          bold
          stretch
          reverse
          size="M"
          disabled={selectedProductsCounter === 0}
          onClick={onAction}
          withVisibleTransition
          visibled={!!texts.itemDetails.purchasePanel.showroom}
        >
          {texts.itemDetails.purchasePanel.showroom}
        </Button>
      )}
    >
      <OnboardingContent closePopup={onboardings.onboarding.closePopup} text={onboardings.text} />
    </ClickCollectOnboarding>
  );

  return (
    <Space className={st.space} stretch size="large">
      <OverlayLoader isLoading={pending}>
        {everyNotSelected ? (
          <Button size="M" colored pending={pending} onClick={selectAll} bold>
            {texts.cart.buyButton.chooseAll}
          </Button>
        ) : (
          <>
            <Button
              bold
              colored
              stretch
              size="M"
              disabled={selectedProductsCounter === 0}
              onClick={() => {
                action(CheckoutType.CHECKOUT_TYPE_USUAL_UNSPECIFIED);
              }}
            >
              <Responsive.TabletAndBelow>{texts.cart.buyButton.title}</Responsive.TabletAndBelow>
              <Responsive.Desktop>
                <Space stretch align="center">
                  <DeliveryIcon /> {texts.web.buyWithDelivery}
                </Space>
              </Responsive.Desktop>
            </Button>

            {clickCollectAction}
          </>
        )}
      </OverlayLoader>
    </Space>
  );
}
