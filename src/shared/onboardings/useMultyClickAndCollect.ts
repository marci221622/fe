import { useUnit } from 'effector-react';

import { CLICK_AND_COLLECT } from '@/constants/localStorageKeys';

import { useOnboarding, useOnboardingByTimes } from '@/lib/hooks';

import { $appIsShort, $mappedStrings } from '../configs';
import { AB_TESTS, isVariationA, isVariationB } from '../configs/abTests';

const CART_POPUP_INBOARDING_SHOW_COUNT = 2;

type Props = {
  page: PageType;
};

export function useMultyClickAndCollect({ page }: Props) {
  const appIsShort = useUnit($appIsShort);

  const KEY =
    page === 'ProductPage'
      ? CLICK_AND_COLLECT.multyClickAndCollect.product
      : CLICK_AND_COLLECT.multyClickAndCollect.basket;

  const variant = useUnit(AB_TESTS.$multiClickAndCollect);
  const texts = useUnit($mappedStrings);

  const oneClickOnboarding = useOnboarding({ key: CLICK_AND_COLLECT.oneClickOld, condition: isVariationA(variant) });
  const multyClickOnboarding = useOnboardingByTimes({
    key: KEY,
    condition: isVariationB(variant),
    counter: CART_POPUP_INBOARDING_SHOW_COUNT,
  });

  return isVariationA(variant) || appIsShort
    ? { onboarding: oneClickOnboarding, text: texts.itemDetails.showroom.onboarding.title }
    : { onboarding: multyClickOnboarding, text: texts.cart.clickAndCollectOnboarding.text };
}
