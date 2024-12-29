import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { Store } from 'effector';
import { useUnit } from 'effector-react';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { useStickyClassnames } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';
import { AB_TESTS, isVariationA, isVariationB } from '@/shared/configs/abTests';

import {
  checkout,
  AddressSuggests,
  Recipient,
  Delivery,
  Summary,
  DeliveryDetails,
  $deliveryNotAvailableDisclamer,
  MultyClickAndCollectActions,
} from '@/features/basket';

import { useViewport } from '@/lib/hooks';

import { Typography } from '@/ui/index';

import { ViewedWidget } from '../Widget';

import { Products } from './Products';

import st from '../styles.module.scss';

type Props = {
  cartIsEmpty: boolean;
  noExistedItems: boolean;
  loyalty?: Loyalty | null;
  state: {
    stackCounter: Store<number>;
    notExistedItems: Store<CartItem[]>;
    existedItems: Store<CartItem[]>;
    notSelectedItems: Store<CartItem[]>;
  };
};

export function DesktopTemplate({ state, cartIsEmpty, noExistedItems, loyalty }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { stackCounter, notExistedItems, existedItems } = useUnit(state);
  const { isDesktop } = useViewport();
  const deliveryNotAvailableDisclamer = useUnit($deliveryNotAvailableDisclamer);
  const classnames = useStickyClassnames({
    stuckedCn: st.stucked,
  });
  const multiClickAndCollectvariation = useUnit(AB_TESTS.$multiClickAndCollect);

  return (
    <div
      className={cn(st.cart, {
        [st.hasNotExistedItems]: notExistedItems.length > 0,
        [st.hasExistedItems]: existedItems.length > 0,
        [st.noItems]: cartIsEmpty,
      })}
    >
      {cartIsEmpty ? (
        <>
          <Typography.Paragraph center className={st.emptyText}>
            {texts.web.emptyCartDescription}
          </Typography.Paragraph>

          <ViewedWidget condition={isDesktop} />
        </>
      ) : (
        <>
          <div className={st.content}>
            <Products state={state} noExistedItems={noExistedItems} />
          </div>

          {!noExistedItems && (
            <div
              className={cn(st.checkout, {
                [st.active]: stackCounter > 0,
              })}
            >
              {isVariationA(multiClickAndCollectvariation) && (
                <div className={cn(st.form, classnames)}>
                  <AddressSuggests device="desktop" isRelativePosition={false} />
                  <Delivery device="desktop" />
                  <Recipient device="desktop" />
                  <DeliveryDetails
                    checkout={checkout}
                    deliveryNotAvailableDescription={deliveryNotAvailableDisclamer}
                  />
                </div>
              )}

              <div className={st.info}>
                <Summary
                  checkout={checkout}
                  isVariationB={!isVariationA(multiClickAndCollectvariation)}
                  loyalty={loyalty}
                />
              </div>

              {isVariationB(multiClickAndCollectvariation) && (
                <div className={st.multyClickAndColelctActions}>
                  <MultyClickAndCollectActions />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
