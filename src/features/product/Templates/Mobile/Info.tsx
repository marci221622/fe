import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $appIsShort, $productInfo } from '@/shared/configs';
import { useDescriptionModals } from '@/shared/description-modals';

import { isPrivateSeller } from '../../lib';
import { additionalScheme, additionalSchemeWatches, BaseInfoList } from '../InfoList';
import { useWatches } from '../useWatches';

import st from '../styles.module.scss';

type Props = {
  product: Item;
};

export function ProductInfo({ product }: Props) {
  const { i18n } = useLingui();
  const fixedInfo = useUnit($productInfo);
  const modals = useDescriptionModals();
  const appIsShort = useUnit($appIsShort);
  const watches = useWatches(product);

  const additionalItems = (watches.isClock ? additionalSchemeWatches : additionalScheme)
    .filter(it => {
      if (isPrivateSeller(product)) {
        return it.visibility === 'always' || it.visibility === 'private_seller';
      }

      return it.visibility === 'always' || it.visibility === 'tsum_seller';
    })
    .map(item => {
      if (fixedInfo[item.key]) {
        return {
          title: i18n._(item.title),
          content: (
            <>
              {fixedInfo[item.key]}{' '}
              <span className={cn(st.garantieLink)} onClick={() => modals?.setCurrentModal(item.key)}>
                {t`Подробнее`}
              </span>
            </>
          ),
        };
      }

      return { title: i18n._(item.title), content: null };
    });

  const aboutProductPane = <BaseInfoList product={product} additionalItems={additionalItems} />;

  return appIsShort ? aboutProductPane : <div className={st.accordionWrapper}>{aboutProductPane}</div>;
}
