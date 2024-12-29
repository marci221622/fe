import { useUnit } from 'effector-react';

import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { $mappedStrings } from '@/shared/configs';

import { Button, Space, Typography } from '@/ui/index';

import { toggleSelectMutation } from '../../cart';

import st from './styles.module.scss';

type Props = {
  message?: string;
  productIds?: string[];
  products?: CartItem[];
  closePopup?: () => void;
};

export function FailedContent({ message, productIds, products, closePopup }: Props) {
  const toggleSelect = useUnit(toggleSelectMutation);
  const texts = useUnit($mappedStrings);
  const itemsToRemoval =
    productIds && productIds.length > 0 ? products?.filter(item => productIds.includes(item.id)) ?? [] : [];

  if (!message) {
    return null;
  }

  return (
    <Space direction="vertical" className={st.failedContent}>
      <Typography.Paragraph>{message}</Typography.Paragraph>

      {itemsToRemoval.length > 0 && (
        <Button
          stretch
          reverse
          bold
          onClick={() => {
            toggleSelect.start({
              items: itemsToRemoval,
              selected: true,
            });
            closePopup?.();
          }}
        >
          {texts.error.clickAndCollectMultiitems.notAvailableToCollect.button}
        </Button>
      )}
    </Space>
  );
}
