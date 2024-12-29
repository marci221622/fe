import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Section } from '@/generated/customer_hub/enums/section';
import { $brandsListScheme, BrandsCard } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { $currentGender } from '@/shared/session';

import { FavoriteBrandsModal, GenderTabs } from '@/features/brands';
import { FavoriteLinks } from '@/features/favorites';

import { usePopupState, useVirtualPagination } from '@/lib/hooks';

import { Button, Responsive, Typography } from '@/ui/index';

import { itemsByBrandsQuery } from './model';

import st from './styles.module.scss';

export default function FavoriteBrandsPage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const modalPopup = usePopupState();
  const gender = useUnit($currentGender);
  const brandsScheme = useUnit($brandsListScheme);
  const result = useUnit(itemsByBrandsQuery.$result);
  const [activeGender, setActiveGender] = useState(gender);

  const items = {
    women: result ? result[Section.SECTION_FEMALE].items : [],
    men: result ? result[Section.SECTION_MALE].items : [],
  };

  const femaleOrMale = items.women.length > 0 ? items.women : items.men;
  const maleOrFemale = items.men.length > 0 ? items.men : items.women;

  const activeItems = activeGender === Section.SECTION_FEMALE ? femaleOrMale : maleOrFemale;
  const hasTabs = items.men.length > 0 && items.women.length > 0;
  const activeItemsIsEmpty = activeItems.length === 0;

  const virtualItems = useVirtualPagination({ data: activeItems, pageSize: 10 });

  const changeTab = (tab: Section) => {
    window.scrollTo(0, 0);
    setActiveGender(tab);
  };

  return (
    <>
      <Typography.PageTitle
        className={cn(st.pageTitle, {
          [st.hasTabs]: hasTabs,
        })}
      >
        {texts.tabs.favorites}
      </Typography.PageTitle>

      <div
        className={cn(st.favoritePageWrapper, {
          [st.notabs]: !hasTabs,
        })}
      >
        <FavoriteLinks className={st.links} />

        {hasTabs && <GenderTabs className={st.sidebar} activeTab={activeGender} onChange={changeTab} />}

        <div
          className={cn(st.catalog, {
            [st.isEmpty]: activeItemsIsEmpty,
          })}
        >
          {activeItemsIsEmpty ? (
            <>
              <Typography.Paragraph center className={st.emptyText}>
                {texts.web.noFavoriteItemsMessage}
              </Typography.Paragraph>

              <Responsive.Desktop>
                <Button onClick={modalPopup.openPopup} size="M" bold>
                  {texts.favorite.tab.brands.emptyListPlaceholder.button}
                </Button>
              </Responsive.Desktop>

              <Responsive.TabletAndBelow>
                <Button onClick={modalPopup.openPopup} size="XS">
                  {texts.favorite.tab.brands.emptyListPlaceholder.button}
                </Button>
              </Responsive.TabletAndBelow>

              <FavoriteBrandsModal popup={modalPopup} />
            </>
          ) : (
            <InfiniteScroll
              dataLength={virtualItems.dataLength}
              next={virtualItems.onLoadMore}
              hasMore={virtualItems.hasMore}
              loader={null}
            >
              {virtualItems.data.map(item =>
                brandsScheme[item.brandCode] ? (
                  <BrandsCard
                    hasSidebar={hasTabs}
                    key={item.brandCode}
                    brand={brandsScheme[item.brandCode]}
                    items={item.items}
                    activeGender={activeGender}
                  />
                ) : null,
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
}
