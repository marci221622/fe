import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { Store } from 'effector';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { $mappedStrings } from '@/shared/configs';
import { AB_TESTS, isVariationA } from '@/shared/configs/abTests';
import { ChatBadge } from '@/shared/ui';

import { paths } from '@/constants/paths';

import {
  checkout,
  ProductsList,
  Summary,
  Promocode,
  CartActions,
  basketAnalytics,
  MultyClickAndCollectActions,
} from '@/features/basket';

import { useViewport } from '@/lib/hooks';
import { usePrevious } from '@/lib/usePrevious';

import { Typography, Segments, Button } from '@/ui/index';

import { ViewedWidget } from './Widget';

import st from './styles.module.scss';

type Props = {
  cartIsEmpty: boolean;
  noExistedItems: boolean;
  hasBodyLoyalty: boolean;
  loyalty?: Loyalty | null;
  state: {
    stackCounter: Store<number>;
    notExistedItems: Store<CartItem[]>;
    existedItems: Store<CartItem[]>;
  };
};

const getInitialTab = (existed: CartItem[]) => {
  if (existed.length > 0) {
    return 'existed';
  }

  return 'noexisted';
};

export function MobileTemplate({ cartIsEmpty, noExistedItems, state, hasBodyLoyalty, loyalty }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { existedItems, notExistedItems } = useUnit(state);
  const [activeTab, setActiveTab] = useState(() => getInitialTab(existedItems));
  const prevTab = usePrevious(activeTab);
  const { isTabletAndBelow } = useViewport();
  const onTabChanged = useUnit(basketAnalytics.changeCartTabs);
  const navigate = useNavigate();
  const multiClickAndCollectvariation = useUnit(AB_TESTS.$multiClickAndCollect);

  const handleNoExistedItemsClick = useCallback(
    (arg: 'favorite' | 'catalog') => {
      return () => navigate(arg === 'favorite' ? paths.favorites.main() : paths.categories.root());
    },
    [navigate],
  );

  useEffect(() => {
    if (prevTab !== activeTab) {
      window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
    }
  }, [activeTab, prevTab]);

  useEffect(() => {
    if (notExistedItems.length === 0 && activeTab === 'noexisted') {
      setActiveTab('existed');
    }
  }, [activeTab, notExistedItems.length]);

  return (
    <>
      {notExistedItems.length > 0 && (
        <Segments
          name="cart"
          className={st.tabs}
          onChange={it => {
            setActiveTab(it.target.value);
            onTabChanged({ type: it.target.value === 'existed' ? 'in' : 'out' });
          }}
          value={activeTab}
          options={[
            {
              label: texts.favorite.selectPanel.available.replace('%@', String(existedItems.length)),
              value: 'existed',
            },
            {
              label: texts.favorite.selectPanel.available.replace('%@', String(notExistedItems.length)),
              value: 'noexisted',
            },
          ]}
        />
      )}

      <div
        className={cn(st.cart, st.mobileCart, {
          [st.isExistedTab]: activeTab === 'existed',
          [st.noExistedItems]: noExistedItems,
          [st.noItems]: activeTab === 'existed' ? noExistedItems : notExistedItems.length === 0,
        })}
      >
        {cartIsEmpty ? (
          <>
            <Typography.Paragraph center className={st.emptyText}>
              {texts.web.emptyCartDescription}
            </Typography.Paragraph>

            <ViewedWidget condition={isTabletAndBelow} />

            <ChatBadge context="custom" className={st.emptyChatBadge} />
          </>
        ) : (
          <>
            {activeTab === 'existed' ? (
              !noExistedItems ? (
                <ProductsList className={st.itemsList} items={existedItems} />
              ) : (
                <div className={st.existedEmptyTab}>
                  <Typography.Paragraph center className={st.emptyText}>
                    {texts.cart.emptyScreen.allOutOfStock}
                  </Typography.Paragraph>

                  <Button
                    className={st.goToFavoriteButton}
                    size="S"
                    colored
                    onClick={handleNoExistedItemsClick('catalog')}
                  >
                    {texts.itemDetails.purchasePanel.showCatalog}
                  </Button>

                  <ViewedWidget condition={isTabletAndBelow} />
                </div>
              )
            ) : notExistedItems.length > 0 ? (
              <ProductsList className={st.itemsList} items={notExistedItems} notExisted />
            ) : (
              <Typography.Paragraph center className={st.emptyText}>
                {texts.web.noAvailableItemsInCart}
              </Typography.Paragraph>
            )}

            <ChatBadge
              context="custom"
              className={cn(st.chatBadge, { [st.hasLoyalty]: hasBodyLoyalty, [st.noItemsCustomBadge]: noExistedItems })}
            />

            {!noExistedItems && activeTab === 'existed' && (
              <>
                <div className={st.promocodeMobile}>
                  <Promocode checkout={checkout} />
                </div>

                <div className={st.mobileSummary}>
                  <div className={st.info}>
                    <Summary shortVarriant checkout={checkout} loyalty={loyalty} />
                    <div className={st.actions}>
                      {isVariationA(multiClickAndCollectvariation) ? (
                        <CartActions isTablet />
                      ) : (
                        <MultyClickAndCollectActions />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
