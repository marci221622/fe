import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { uniq } from 'lodash';
import { FC, useState } from 'react';

import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';
import { $mappedStrings } from '@/shared/configs';

import { filtersCodes } from '@/constants/hardcode';

import { Button } from '@/ui/index';

import { CloseIcon, ArrowRightIcon } from '@/ui/assets/icons';

import { useLocalFilters } from '../../Filters/ControllProvider';
import { restoreParentFromFilter } from '../../Filters/tree';
import { catalogAnalytics } from '../../models';

import st from './styles.module.scss';

export const Content: FC<{ value: CatalogFilter_Value; closePopup: () => void }> = ({ value, closePopup }) => {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { actions } = useLocalFilters(filtersCodes.categoryFilter);
  const showAllCategoriesGtm = useUnit(catalogAnalytics.showAllCategories);
  const resetCategoriesGtm = useUnit(catalogAnalytics.resetSingleFilter);

  // Функционал проваливания по категориям
  const [activeCategory, setCategory] = useState<CatalogFilter_Value & { index: number }>({
    ...value,
    index: 0,
  });

  const [prevCategories, setPrevCategories] = useState<(typeof activeCategory)[]>([]);

  const onCategoryClick =
    (clickedCategory: CatalogFilter_Value, index: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (clickedCategory.children.length > 0) {
        setCategory({ ...clickedCategory, index });
        setPrevCategories(prev => [...prev, activeCategory]);
      } else {
        actions.apply([clickedCategory], filtersCodes.categoryFilter);
        closePopup();
      }
    };

  const onBack = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    if (prevCategories.length > 0) {
      setCategory(prevCategories[prevCategories.length - 1]);
      setPrevCategories(prevCategories.slice(0, -1));
    } else {
      closePopup();
    }
  };

  const handleReset = () => {
    actions.apply([], filtersCodes.categoryFilter);
    resetCategoriesGtm({
      ctx: 'button',
      content: value.label,
    });
    closePopup();
  };

  const showAll = () => {
    actions.apply([activeCategory], filtersCodes.categoryFilter);
    showAllCategoriesGtm({ category: uniq(restoreParentFromFilter(value, activeCategory)).join('|') });
    closePopup();
  };

  return (
    <div className={st.wrapper}>
      <div className={cn(st.header, { [st.withReset]: activeCategory.selected })}>
        {prevCategories.length > 0 ? (
          <ArrowRightIcon className={st.back} color="black" onClick={onBack} />
        ) : (
          <CloseIcon className={st.close} color="black" onClick={onBack} />
        )}

        <p onClick={showAll} className={st.tilte} role="presentation">
          {activeCategory.label}
        </p>

        {activeCategory.selected && (
          <Button className={st.reset} onClick={handleReset} asText>
            {texts.reset}
          </Button>
        )}
      </div>

      <div className={st.categories} data-scroll="allow">
        {activeCategory.children.map((category, idx) => {
          return (
            <div
              key={category.code}
              className={cn(st.category, {
                [st.active]: category.selected,
              })}
              onClick={onCategoryClick(category, idx)}
            >
              {category.image ? (
                <img src={category.image?.src} alt={category.label} />
              ) : (
                <div className={st.imageStub} />
              )}
              <p>{category.label}</p>
            </div>
          );
        })}
      </div>

      <div className={st.footer}>
        <Button className={st.counterButton} stretch onClick={showAll}>
          {texts.web.revealAll}
        </Button>
      </div>
    </div>
  );
};
