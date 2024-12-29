import { defineMessage } from '@lingui/macro';
import cn from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Tooltip } from '@/shared/ui';

import { createReaddableSize, getReaddableCondition, hasSize } from '@/lib/transformers';

import { Checked } from '@/ui/assets/icons';

import st from './styles.module.scss';

export const baseScheme = [
  {
    title: defineMessage({ message: 'Состояние' }),
    field: (product: Item) => getReaddableCondition(product.condition?.state),
    inShort: true,
    noVisibledInAppShort: false,
    isConditionalState: true,
  },
  {
    title: defineMessage({ message: 'Особенности' }),
    field: (product: Item) => product.condition?.description,
    inShort: true,
  },
  {
    title: defineMessage({ message: 'Размер' }),
    field: (product: Item) =>
      hasSize(product.size) || !!product.technicalInformation
        ? [createReaddableSize(product.size), product.technicalInformation]
        : '',
    inShort: true,
  },
  {
    title: defineMessage({ message: 'Комплект' }),
    field: (product: Item) => product.kit,
  },
  {
    title: defineMessage({ message: 'Состав' }),
    field: (product: Item) => product.composition,
  },
  {
    title: defineMessage({ message: 'Цвет' }),
    field: (product: Item) => product.color?.title,
  },
  {
    title: defineMessage({ message: 'Страна производства' }),
    // TODO: deprecation
    // eslint-disable-next-line deprecation/deprecation
    field: (product: Item) => product.madeCountry,
  },
  {
    title: defineMessage({ message: 'Страна дизайна' }),
    // TODO: deprecation
    // eslint-disable-next-line deprecation/deprecation
    field: (product: Item) => product.designCountry,
  },
  {
    title: defineMessage({ message: 'Артикул' }),
    field: (product: Item) => (
      <Tooltip
        popoverOnly
        tag={({ openPopup }) => (
          <span className={cn(st.article, st.nobold)}>
            <CopyToClipboard text={product.code} onCopy={openPopup}>
              <span className={cn(st.article, st.nobold)}>{product.code}</span>
            </CopyToClipboard>
          </span>
        )}
        label=""
      >
        <div className={st.copiedText}>
          <Checked /> Артикул скопирован
        </div>
      </Tooltip>
    ),
  },
];

export const additionalScheme = [
  // {
  //   visibility: 'always',
  //   key: 'delivery',
  //   title: defineMessage({ message: 'Доставка' }),
  // },
  {
    visibility: 'tsum_seller',
    key: 'returns',
    title: defineMessage({ message: 'Возврат' }),
  },
  {
    visibility: 'private_seller',
    key: 'privateReturns',
    title: defineMessage({ message: 'Возврат' }),
  },
];

export const additionalSchemeWatches = [
  {
    visibility: 'tsum_seller',
    key: 'watchesReturns',
    title: defineMessage({ message: 'Возврат' }),
  },
  {
    visibility: 'private_seller',
    key: 'privateWatchesReturns',
    title: defineMessage({ message: 'Возврат' }),
  },
];

export function createFromScheme(
  product: Item,
  { shortVariant, appIsShort }: { shortVariant?: boolean; appIsShort?: boolean },
) {
  const rs = baseScheme
    .map(it => {
      const result = it.field(product);

      return {
        noVisibledInAppShort: it.noVisibledInAppShort,
        short: it.inShort,
        title: it.title,
        isConditionalState: it.isConditionalState ?? false,
        children: Array.isArray(result) ? (
          <>
            {result[0]}
            {result[0] && <br />}
            {result[1]}
          </>
        ) : (
          result
        ),
      };
    })
    .filter(it => !!it.children)
    .filter(it => (appIsShort ? !it.noVisibledInAppShort : true));

  if (shortVariant) {
    return rs.filter(it => it.short);
  }

  return rs;
}
