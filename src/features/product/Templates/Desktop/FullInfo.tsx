import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import React from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { $mappedStrings, $productInfo } from '@/shared/configs';
import { DescriptionModals, useDescriptionModals } from '@/shared/description-modals';

import { isPrivateSeller } from '../../lib';
import { BaseInfoList } from '../InfoList';
import { additionalScheme, additionalSchemeWatches } from '../InfoList/transformers';
import { useWatches } from '../useWatches';

import st from '../styles.module.scss';

type Props = {
  product: Item;
  openGallery: (idx: number) => void;
  pointRef: React.MutableRefObject<HTMLDivElement | null>;
};

export function FullInfo({ product, openGallery, pointRef }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const fixedInfo = useUnit($productInfo);
  const modals = useDescriptionModals();
  const watches = useWatches(product);

  return (
    <div className={st.fullInfo} ref={pointRef}>
      <BaseInfoList product={product} title={texts.itemDetails.infoBlock.title} />

      <ul className={cn(st.infoList, st.full)}>
        {!!product.description && (
          <li key="description">
            <span>{texts.web.description}</span>
            <span>{product.description}</span>
          </li>
        )}

        {(watches.isClock ? additionalSchemeWatches : additionalScheme)
          .filter(it => {
            if (isPrivateSeller(product)) {
              return it.visibility === 'always' || it.visibility === 'private_seller';
            }

            return it.visibility === 'always' || it.visibility === 'tsum_seller';
          })
          .map(it => (
            <li key={it.key}>
              <span>{i18n._(it.title)}</span>
              <span>
                {fixedInfo[it.key]}{' '}
                <span className={st.garantieLink} onClick={() => modals?.setCurrentModal(it.key)}>
                  {texts.itemDetails.infoBlock.condition.linkTitle}
                </span>
              </span>
            </li>
          ))}

        <li key="garantie">
          <span>{fixedInfo.garantieTitle}</span>
          <span>
            {fixedInfo.garantie}{' '}
            <span className={st.garantieLink} onClick={() => modals?.setCurrentModal(DescriptionModals.Garantie)}>
              {texts.itemDetails.infoBlock.condition.linkTitle}
            </span>
          </span>
        </li>
      </ul>

      {product.imagesLarge[0] && (
        <div
          onClick={() => openGallery(0)}
          className={st.imagePreview}
          style={{
            aspectRatio: `${product.imagesLarge[0]?.width} / ${product.imagesLarge[0]?.height}`,
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(${product.imagesLarge[0].src})`,
          }}
        />
      )}
    </div>
  );
}
