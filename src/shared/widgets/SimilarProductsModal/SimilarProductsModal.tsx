import { useUnit } from 'effector-react';
import React, { useEffect, useMemo } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { RowSchemeResult, createRowScheme, DEFAUTL_EMPTY_SCHEME } from '@/lib/product';

import { Loading } from '@/ui/Spinner';
import { Typography } from '@/ui/Typography';

import { $isOpenSimilarProductsModal, modalField, similarModalQuery } from './model';

import st from './styles.module.scss';

type PropsType = {
  children: (items: Item[], scheme: RowSchemeResult) => React.ReactNode;
};

export function SimilarProductsModal({ children }: PropsType) {
  const texts = useUnit($mappedStrings);
  const { result, pending } = useUnit(similarModalQuery);
  const isOpen = useUnit($isOpenSimilarProductsModal);
  const modal = useUnit(modalField);

  const scheme = useMemo(
    () => (isOpen ? createRowScheme({ items: result ?? [], needToFullListPreparation: false }) : DEFAUTL_EMPTY_SCHEME),
    [isOpen, result],
  );

  useEffect(() => {
    return () => {
      modal.onChange([]);
    };
  }, [modal.onChange]);

  return (
    <Modal
      headerClassName={st.header}
      iconClassName={st.icon}
      className={st.SimilarProductsModal}
      bodyClassName={st.body}
      open={isOpen}
      onChange={() => modal.onChange([])}
      header={<Typography.Title className={st.title}>{texts.relevantItems.item.button}</Typography.Title>}
    >
      <Loading center isLoading={pending} className={st.loader}>
        {children(result ?? [], scheme)}
      </Loading>
    </Modal>
  );
}
