import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Place } from '@/generated/customer_hub/enums/place';
import { $mappedStrings } from '@/shared/configs';
import { BrandLogo } from '@/shared/ui';
import { LoyaltyBody } from '@/shared/ui/LoyaltyBanners';
import { useLoyalty } from '@/shared/ui/StickyBanner';

import { paths } from '@/constants/paths';

import { cartNotification } from '@/features/basket';

import { createReaddableSize, getPriceFromFinal } from '@/lib/transformers';

import { Button, Price, Responsive, Space, Typography } from '@/ui/index';

import { Popup } from './Popup';

import st from './styles.module.scss';

export function AddedToCartModal({ children }: { children: React.JSX.Element }) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const notification = useUnit(cartNotification);
  const navigate = useNavigate();
  const loyalty = useLoyalty({
    place: Place.PLACE_ADD_TO_CART_RESULTS,
    condition: !!notification.value,
    itemCodes: useMemo(() => (notification.value ? [notification.value.itemCode] : []), [notification.value]),
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (notification.value) {
      const timeoutId = setTimeout(() => {
        notification.onChange(null);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  return (
    <Popup
      align="end"
      padding={24}
      withArrow={false}
      isOpen={!!notification.value}
      closePopup={() => {
        notification.onChange(null);
      }}
      icon={children}
    >
      <div className={st.popupContainer}>
        {notification.value && (
          <>
            <BrandLogo brand={notification.value.brand} />
            <Typography.Paragraph center className={st.text}>
              {notification.value.title}
            </Typography.Paragraph>
            <Typography.Paragraph center className={st.text}>
              {createReaddableSize(notification.value.size)}
            </Typography.Paragraph>
            <Price
              {...getPriceFromFinal(notification.value)}
              revert
              discountPercent={notification.value.discountPercent}
            />

            <LoyaltyBody loyalty={loyalty?.loyalty} place="addedToCart" />

            <Space direction="vertical" stretch className={st.space}>
              <Responsive.TabletAndBelow className={st.continue}>
                <Button
                  stretch
                  reverse
                  bold
                  onClick={e => {
                    e.stopPropagation();
                    notification.onChange(null);
                  }}
                  size="L"
                >
                  {texts.itemDetails.subscribeGoods.button}
                </Button>
              </Responsive.TabletAndBelow>
              <Button
                stretch
                colored
                bold
                onClick={e => {
                  e.stopPropagation();
                  notification.onChange(null);
                  navigate(paths.basket());
                }}
                size="L"
              >
                {texts.itemDetails.addToCartResult.button.title}
              </Button>
            </Space>
          </>
        )}
      </div>
    </Popup>
  );
}
