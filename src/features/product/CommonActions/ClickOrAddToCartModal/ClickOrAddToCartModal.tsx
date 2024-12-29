import { useUnit } from 'effector-react';

import { $appIsShort, $mappedStrings } from '@/shared/configs';
import { AB_TESTS, isVariationB } from '@/shared/configs/abTests';
import { Modal } from '@/shared/ui';

import { PRODUCT_ACTION_VARIANT_DISLAMER_COUNTER } from '@/constants/localStorageKeys';

import { AddedToCartParams, addToCardMutation, oneClickMutation } from '@/features/basket';

import { useOnboardingTrigger, usePopupState } from '@/lib/hooks';

import { Button, Space, Typography } from '@/ui/index';

import { BasketIconV2, Checked } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  popup: ReturnType<typeof usePopupState>;
  incrementCounterToMax: () => void;
};

type HookProps = {
  addToCartParams: AddedToCartParams;
  inCart: boolean;
};

const MAX_SHOWN_SERIES_COUNT = 13;
const SHOWN_NUMBERS = [1, 2, 3, 5, 8, MAX_SHOWN_SERIES_COUNT];

function ClickOrAddToCartModal({ popup, addToCartParams, inCart, incrementCounterToMax }: Props & HookProps) {
  const texts = useUnit($mappedStrings);
  const clickAndCollect = useUnit(oneClickMutation);
  const onAddedToCart = useUnit(addToCardMutation.start);

  return (
    <Modal
      header={<span>{texts.clickAndCollectCheckout.reserveItem}</span>}
      open={popup.isOpen}
      onChange={popup.closePopup}
      onActionClick={popup.closePopup}
    >
      <Space direction="vertical" stretch size="large">
        <Typography.Paragraph center>{texts.itemDetails.addToClickAndCollectPopup.text}</Typography.Paragraph>
        <Space direction="vertical" stretch className={st.actions} size="large">
          <Button
            bold
            stretch
            size="M"
            colored
            onClick={() => {
              if (!inCart) {
                // Показываем modal onboarding 1 раз и если нажали в корзину - больше не нужно
                incrementCounterToMax();
                onAddedToCart(addToCartParams);
                popup.closePopup();
              }
            }}
          >
            {inCart ? (
              <>
                <Checked className={st.checkedIcon} /> {texts.web.inCart}
              </>
            ) : (
              <>
                <BasketIconV2 /> {texts.itemDetails.purchasePanel.addToCart}
              </>
            )}
          </Button>

          <Button
            bold
            stretch
            size="M"
            reverse
            pending={clickAndCollect.pending}
            withVisibleTransition
            visibled={!!texts.itemDetails.addToClickAndCollectPopup.title}
            onClick={() => {
              // Показываем modal onboarding 1 раз и если нажали в корзину - больше не нужно
              incrementCounterToMax();
              clickAndCollect.start(addToCartParams);
              popup.closePopup();
            }}
          >
            {texts.itemDetails.addToClickAndCollectPopup.title}
          </Button>
        </Space>
      </Space>
    </Modal>
  );
}

export function useClickOrAddToCart({ hasCartAction, ...props }: HookProps & { hasCartAction: boolean }) {
  const popup = usePopupState();
  const onboarding = useOnboardingTrigger({
    key: PRODUCT_ACTION_VARIANT_DISLAMER_COUNTER,
    counter: MAX_SHOWN_SERIES_COUNT,
  });
  const needToShowVariants = SHOWN_NUMBERS.includes(onboarding.times);
  const appIsShort = useUnit($appIsShort);
  const variation = useUnit(AB_TESTS.$multiClickAndCollect);

  const incrementCounter = () => {
    if (isVariationB(variation)) {
      onboarding.incrementCounter();
    }
  };

  const incrementCounterToMax = () => {
    if (isVariationB(variation)) {
      onboarding.incrementCounterToMax();
    }
  };

  return {
    modal: isVariationB(variation) ? (
      <ClickOrAddToCartModal popup={popup} {...props} incrementCounterToMax={incrementCounterToMax} />
    ) : null,
    popup,
    needToShowVariants: isVariationB(variation) && (!hasCartAction || appIsShort ? false : needToShowVariants),
    incrementCounter,
  };
}
