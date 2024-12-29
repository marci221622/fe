import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { buildDataAttrsFromItem } from '@/shared/analytics/diginetics';
import { OnlyFullVariant } from '@/shared/configs';
import { BrandLogo, templateCtx } from '@/shared/ui';

import { useCategoryFromCatalog } from '@/features/header';

import { Breadcrumbs, BreadcrumbsPane, BreadcrumbsUI, Space } from '@/ui/index';

import { ArrowRightIcon } from '@/ui/assets/icons';

import { productImagesProps } from '../../lib';
import { StickyPanel } from '../../StickyPane';
import { Actions } from '../Actions';
import { useAdditionalActions } from '../useAdditionalActions';

import { FullInfo } from './FullInfo';
import { ShortInfo } from './ShortInfo';

// TODO: lazy styles
import st from '../styles.module.scss';

type Props = {
  product: Item;
  openGallery: (idx: number) => void;
  closeGallery: () => void;
  galleryOpened?: boolean;
  notExists: boolean;
  loyalty?: Loyalty | null;
  breadcrumbs: Breadcrumbs;
};

export function DesktopProduct({
  product,
  openGallery,
  closeGallery,
  galleryOpened,
  notExists,
  loyalty,
  breadcrumbs,
}: Props) {
  const { i18n } = useLingui();
  const fullInfoRef = useRef<HTMLDivElement | null>(null);
  const additional = useAdditionalActions(product);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const collection = useCategoryFromCatalog(product.collection?.code);
  const header = useContext(templateCtx);

  const collectionImage = collection?.filterDocumentImage?.src ?? collection?.image?.src;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ((galleryOpened || (!!entry && !inView)) && header) {
      header.style.opacity = '0';

      return () => {
        header.style.opacity = '1';
      };
    }
  }, [entry, galleryOpened, header, inView]);

  return (
    <>
      <StickyPanel
        inView={inView}
        loaded={!!entry}
        product={product}
        galleryOpened={galleryOpened}
        closeGallery={closeGallery}
        notExists={notExists}
      />

      <div className={st.pageWrapper} {...buildDataAttrsFromItem(product)}>
        <div className={st.photosWithShortInfo}>
          <div className={st.photoWithBreadcrumbs}>
            <div className={st.photoContainer}>
              {product.imagesLarge.map((photo, idx) => (
                <div key={photo.src} className={st.photo} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                  <img
                    src={photo.src}
                    loading="lazy"
                    onClick={() => openGallery(idx)}
                    role="presentation"
                    {...productImagesProps(product, idx)}
                  />
                </div>
              ))}
            </div>
          </div>

          <ShortInfo product={product} notExists={notExists} loyalty={loyalty} targetRef={fullInfoRef} />
        </div>

        <FullInfo product={product} openGallery={openGallery} pointRef={fullInfoRef} />

        {breadcrumbs.length > 0 && (
          <OnlyFullVariant>
            <BreadcrumbsPane nosticky className={st.breadcrumbs} compact>
              <BreadcrumbsUI breadcrumbs={breadcrumbs} />
            </BreadcrumbsPane>
          </OnlyFullVariant>
        )}

        {!galleryOpened && (
          <Actions product={product} ref={ref} notExists={notExists} className={st.actions} actionsSize="M" />
        )}

        <OnlyFullVariant>
          {additional && (
            <div className={st.showInCatalog}>
              <Link
                to={additional.brand.link}
                className={cn({
                  [st.active]: !!additional.brand.link,
                })}
              >
                <div className={st.additionalInner}>
                  <BrandLogo brand={product.brand} />
                  {additional.brand.title}
                </div>
                <ArrowRightIcon />
              </Link>

              <Link
                to={additional.collection.link}
                className={cn(st.collection, {
                  [st.active]: !!additional.collection.link,
                })}
              >
                {collectionImage && <img src={collectionImage} alt="" />}
                <Space align="between" stretch>
                  <div className={st.additionalInner}>{additional.collection.title}</div>
                  <ArrowRightIcon />
                </Space>
              </Link>
            </div>
          )}
        </OnlyFullVariant>
      </div>
    </>
  );
}
