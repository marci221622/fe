import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Section } from '@/generated/customer_hub/enums/section';
import { Sort } from '@/generated/customer_hub/enums/sort';
import { useLinkBuilder } from '@/shared/pageRouting';
import { BrandLogo } from '@/shared/ui';
// TODO: сомнительный импорт
import { BaseProductsWidgetList } from '@/shared/widgets/Products';

import { ITEMS_BY_BRANDS_LENGTH, filtersCodes } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { Responsive } from '@/ui/index';

import { EmptyBrands } from './EmptyBrands';

import st from './styles.module.scss';

type Props = { brand: Brand; items: Item[]; activeGender: Section; hasSidebar?: boolean };

export function BrandsCard({ brand, items, activeGender, hasSidebar }: Props) {
  const builder = useLinkBuilder(activeGender);

  const brandsLink = `${builder(paths.catalog.withSlug.brand({ slug: brand.slug }))}?${filtersCodes.sort}=${
    Sort.SORT_NOVELTY
  }`;

  const props = {
    items: items ?? [],
    needAdditionalAction: items.length === +ITEMS_BY_BRANDS_LENGTH,
    brandVisibility: true,
    link: brandsLink,
    pageType: 'BrandPage' as PageType,
    nomargin: true,
    itemsPerSlide: {
      desktop: hasSidebar ? 4 : 5,
      mobile: 2,
    },
  };

  return (
    <div
      className={cn(st.brandsCardWrapper, {
        [st.bordered]: items.length === 0,
      })}
    >
      <Link className={cn(st.header)} to={brandsLink}>
        <BrandLogo brand={brand} className={st.brandLogo} />
      </Link>

      {items.length === 0 ? (
        <EmptyBrands />
      ) : (
        <>
          <Responsive.Desktop>
            <BaseProductsWidgetList {...props} device="desktop" cardType="desktopOnlyMinimal" />
          </Responsive.Desktop>

          <Responsive.TabletAndBelow>
            <BaseProductsWidgetList {...props} device="mobile" cardType="middle" />
          </Responsive.TabletAndBelow>
        </>
      )}
    </div>
  );
}
