import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { ProductList } from '@/features/catalog';

import { usePopupState } from '@/lib/hooks';
import { createRowScheme, DEFAUTL_EMPTY_SCHEME } from '@/lib/product';

import { Typography } from '@/ui/Typography';

import st from './styles.module.scss';

type PropsType = {
  popup: ReturnType<typeof usePopupState>;
  items: Item[];
};

export function ProductsModal({ popup, items }: PropsType) {
  const texts = useUnit($mappedStrings);

  const scheme = useMemo(
    () => (popup.isOpen ? createRowScheme({ items, needToFullListPreparation: false }) : DEFAUTL_EMPTY_SCHEME),
    [items, popup.isOpen],
  );

  return (
    <Modal
      headerClassName={st.header}
      iconClassName={st.icon}
      className={st.SimilarProductsModal}
      bodyClassName={st.body}
      open={popup.isOpen}
      onChange={popup.closePopup}
      header={<Typography.Title className={st.title}>{texts.relevantItems.item.button}</Typography.Title>}
    >
      {popup.isOpen ? (
        <ProductList
          openInNewTab
          products={items}
          pageType="ProductPage"
          list={texts.relevantItems.item.button}
          rowScheme={scheme}
        />
      ) : null}
    </Modal>
  );
}
