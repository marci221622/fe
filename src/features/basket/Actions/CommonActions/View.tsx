import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { Button, Responsive } from '@/ui/index';

import { paymentIcons } from '@/ui/assets/icons';

import { $someCartActionInProgress, toggleSelectMutation } from '../../cart';
import { $allFieldSettled, $deliveriesAreAvailable } from '../../checkout';
import {
  $hasAloneSelected,
  $everyNotSelected,
  $someChekoutActionInProgress,
  basketAnalytics,
  checkout,
  initiatePayment,
  checkoutPopupField,
} from '../../models';

import st from './styles.module.scss';

const state = {
  everyNotSelected: $everyNotSelected,
  someChekoutActionInProgress: $someChekoutActionInProgress,
  someCartActionInProgress: $someCartActionInProgress,
  notExistedItems: checkout.$notExistedProducts,
  existedItems: checkout.$existedProducts,
  allFieldSettled: $allFieldSettled,
  hasDeliveries: $deliveriesAreAvailable,
  hasNoSelectedItems: checkout.$hasNoSelectedItems,
  hasAloneSelected: $hasAloneSelected,
};

export function CartActions({ isTablet }: { isTablet?: boolean }) {
  const { i18n } = useLingui();
  const toggleSelect = useUnit(toggleSelectMutation);
  const paymentRun = useUnit(initiatePayment);
  const beginCheckoutAnalytic = useUnit(basketAnalytics.checkoutBegin);
  const popup = useUnit(checkoutPopupField);
  const texts = useUnit($mappedStrings);

  const {
    everyNotSelected,
    someCartActionInProgress,
    someChekoutActionInProgress,
    existedItems,
    allFieldSettled,
    hasDeliveries,
    hasNoSelectedItems,
    hasAloneSelected,
  } = useUnit(state);

  const pending = someCartActionInProgress || someChekoutActionInProgress;
  const actionDisabled = !hasDeliveries || !allFieldSettled;

  const selectAll = () => {
    toggleSelect.start({
      items: existedItems,
      selected: false,
    });
  };

  const action = () => {
    beginCheckoutAnalytic({ items: existedItems, partial: hasNoSelectedItems });

    if (isTablet) {
      return popup.onChange('checkout');
    }

    return paymentRun({ guarded: false });
  };

  return everyNotSelected ? (
    <Button size="L" colored pending={pending} onClick={selectAll} bold>
      {texts.filters.favoriteBrands.select.all}
    </Button>
  ) : (
    <Button size="L" colored pending={pending} onClick={action} disabled={!isTablet && actionDisabled} bold>
      <Responsive.TabletAndBelow className={st.responsive}>
        {hasNoSelectedItems
          ? hasAloneSelected
            ? texts.web.buySelectedItem
            : texts.web.buySelectedItems
          : existedItems.length > 1
          ? texts.cart.buyButton.buyAll
          : texts.cart.buyButton.title}
      </Responsive.TabletAndBelow>

      <Responsive.Desktop className={st.responsive}>
        <paymentIcons.DefaultIcon /> {texts.web.payByCard}
      </Responsive.Desktop>
    </Button>
  );
}
