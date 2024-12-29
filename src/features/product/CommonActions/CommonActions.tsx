import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { AvailableAction } from '@/generated/customer_hub/enums/item';
import { $appIsShort, $mappedStrings, $quickBySettings, OnlyFullVariant, OnlyShortVariant } from '@/shared/configs';
import { useMultyClickAndCollect, ClickCollectOnboarding, OnboardingContent } from '@/shared/onboardings';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import {
  addToCardMutation,
  $someCartActionInProgress,
  oneClickMutation,
  useInCart,
  quickByMutation,
} from '@/features/basket';

import { ActionSize, Button, Space } from '@/ui/index';

import { BasketIconV2, Checked } from '@/ui/assets/icons';

import { useClickOrAddToCart } from './ClickOrAddToCartModal';

import st from './actions.module.scss';

type Props = {
  product: Item;
  notExists: boolean;
  actionSize?: ActionSize;
  actionsStretch?: boolean;
  onAction?: (type: 'click' | 'cart' | 'catalog' | 'quickBy') => void;
};

export function CommonActions({ product, notExists, actionSize = 'L', actionsStretch = true, onAction }: Props) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);
  const onAddedToCart = useUnit(addToCardMutation.start);
  const quickBy = useUnit(quickByMutation);
  const pending = useUnit($someCartActionInProgress);
  const navigate = useNavigate();
  const builder = useLinkBuilder();
  const clickAndCollect = useUnit(oneClickMutation);
  const quickBySettings = useUnit($quickBySettings);
  const onboardings = useMultyClickAndCollect({ page: 'ProductPage' });
  const appIsShort = useUnit($appIsShort);
  const inCart = useInCart();

  const { isCollected } = product;

  const price = product.itemOffers[0]?.finalPrice ?? product.itemOffers[0]?.price;

  const isShowClickCollectOnboardingButton = product.availableActions.includes(
    AvailableAction.AVAILABLE_ACTION_COLLECT,
  );
  const isShowGoToCatalogButton = product.availableActions.includes(AvailableAction.AVAILABLE_ACTION_UNSPECIFIED);
  const isShowGoToCartButton = product.availableActions.includes(AvailableAction.AVAILABLE_ACTION_BUY);

  const onlyGoCatalogActionVisibility = notExists || isCollected || isShowGoToCatalogButton;

  const onlyClickCollectAvailable = isShowClickCollectOnboardingButton && !isShowGoToCartButton;

  const addToCartParams = {
    discountPercent: product.discountPercent,
    itemCode: product.code,
    place: 'ProductPage',
    offerCodes: product.itemOffers.map(it => it.offerCode),
    title: product.title,
    brand: product.brand,
    tsumPrice: product.tsumPrice,
    size: product.size,
    finalPrice: price && {
      units: price.units,
      currencyCode: price.currencyCode,
    },
  };

  const goToCatalog = () => {
    if (appIsShort) {
      onAction?.('catalog');
      return navigate(-1);
    }

    onAction?.('catalog');
    return navigate(builder(paths.categories.root()));
  };

  const clickOrCart = useClickOrAddToCart({
    addToCartParams,
    inCart: inCart(product.code),
    hasCartAction: isShowGoToCartButton,
  });

  const clickCollectAction = (
    <ClickCollectOnboarding
      isOpen={!!onboardings.text && onboardings.onboarding.popup.isOpen}
      closePopup={onboardings.onboarding.closePopup}
      onAction={() => {
        onAction?.('click');

        // На короткой версии ничего не считаем
        // Модалки не будет
        if (!appIsShort && isShowGoToCartButton) {
          clickOrCart.incrementCounter();
        }

        if (!clickOrCart.needToShowVariants) {
          return clickAndCollect.start(addToCartParams);
        }

        return clickOrCart.popup.openPopup();
      }}
      icon={onAction => (
        <Button
          bold
          stretch={actionsStretch}
          size={actionSize}
          reverse={!onlyClickCollectAvailable}
          colored={onlyClickCollectAvailable}
          pending={clickAndCollect.pending}
          withVisibleTransition
          visibled={!!texts.itemDetails.purchasePanel.showroom}
          onClick={onAction}
        >
          {texts.itemDetails.purchasePanel.showroom}
        </Button>
      )}
    >
      <OnboardingContent closePopup={onboardings.onboarding.closePopup} text={onboardings.text} />
    </ClickCollectOnboarding>
  );

  const quickByControl = (props: { reverse?: boolean; colored?: boolean }) => (
    <Button
      bold
      {...props}
      pending={quickBy.pending}
      stretch={actionsStretch}
      size={actionSize}
      onClick={() => {
        onAction?.('quickBy');
        quickBy.start(addToCartParams);
      }}
    >
      {appIsShort ? texts.cart.buyButton.title : texts.itemDetails.purchasePanel.quickPurchase}
    </Button>
  );

  const gotoCatalogAction = (
    <Button bold reverse stretch={actionsStretch} size={actionSize} onClick={goToCatalog}>
      {texts.itemDetails.purchasePanel.showCatalog}
    </Button>
  );

  const clickOrQuickByActions =
    [
      // клик в приоритете
      isShowClickCollectOnboardingButton ? clickCollectAction : null,
      isShowGoToCartButton && quickBySettings.enabled.onFullApp ? quickByControl({ reverse: true }) : null,
    ].filter(Boolean)[0] ?? null;

  return (
    <>
      <OnlyFullVariant>
        <div className={st.actionsInner}>
          {onlyGoCatalogActionVisibility ? (
            gotoCatalogAction
          ) : (
            <Space stretch={actionsStretch} className={st.actionsSpace}>
              {clickOrQuickByActions}

              {isShowGoToCartButton && (
                <Button
                  bold
                  colored
                  size={actionSize}
                  pending={pending}
                  stretch={actionsStretch}
                  onClick={() => {
                    if (!inCart(product.code)) {
                      onAction?.('cart');
                      onAddedToCart(addToCartParams);
                    }
                  }}
                >
                  {inCart(product.code) ? (
                    <>
                      <Checked className={st.checkedIcon} /> {texts.web.inCart}
                    </>
                  ) : (
                    <>
                      <BasketIconV2 /> {texts.itemDetails.purchasePanel.addToCart}
                    </>
                  )}
                </Button>
              )}
            </Space>
          )}
        </div>
      </OnlyFullVariant>

      <OnlyShortVariant>
        <div className={st.actionsInner}>
          {onlyGoCatalogActionVisibility ? (
            gotoCatalogAction
          ) : (
            <Space stretch={actionsStretch} className={st.actionsSpace}>
              {isShowClickCollectOnboardingButton ? clickCollectAction : null}
              {isShowGoToCartButton && quickBySettings.enabled.onShortApp
                ? quickByControl({
                    reverse: false,
                    colored: true,
                  })
                : null}
            </Space>
          )}
        </div>
      </OnlyShortVariant>

      <OnlyFullVariant>{clickOrCart.modal}</OnlyFullVariant>
    </>
  );
}
