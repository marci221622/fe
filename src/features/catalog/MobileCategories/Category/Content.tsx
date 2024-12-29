import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { uniq } from 'lodash';
import { FC, useState } from 'react';

import { Category } from '@/generated/customer_hub/entities/category.v1';
import { $mappedStrings } from '@/shared/configs';

import { filtersCodes } from '@/constants/hardcode';

import { Button } from '@/ui/index';

import { CloseIcon, ArrowRightIcon } from '@/ui/assets/icons';

import { useLocalFilters } from '../../Filters/ControllProvider';
import { getKeyFromCategory } from '../../Filters/helpers';
import { restoreParent } from '../../Filters/tree';
import { catalogAnalytics } from '../../models';

import st from './styles.module.scss';

export const Content: FC<{ category: Category; closePopup: () => void }> = ({ category, closePopup }) => {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { actions } = useLocalFilters(filtersCodes.collections);
  const showAllCategoriesGtm = useUnit(catalogAnalytics.showAllCategories);
  const resetCategoriesGtm = useUnit(catalogAnalytics.resetSingleFilter);

  // Функционал проваливания по категориям
  const [activeCategory, setCategory] = useState<Category & { index: number }>({
    ...category,
    index: 0,
  });

  const [prevCategories, setPrevCategories] = useState<(typeof activeCategory)[]>([]);

  const onCategoryClick = (clickedCategory: Category, index: number) => (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (clickedCategory.categories.length > 0) {
      setCategory({ ...clickedCategory, index });
      setPrevCategories(prev => [...prev, activeCategory]);
    } else {
      actions.apply([getKeyFromCategory(clickedCategory)], filtersCodes.collections);
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
    actions.apply([], filtersCodes.collections);
    resetCategoriesGtm({
      ctx: 'button',
      content: category.title,
    });
    closePopup();
  };

  const showAll = () => {
    actions.apply([getKeyFromCategory(activeCategory)], filtersCodes.collections);
    showAllCategoriesGtm({ category: uniq(restoreParent(category, activeCategory)).join('|') });
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
          {activeCategory.title}
        </p>

        {activeCategory.selected && (
          <Button className={st.reset} onClick={handleReset} asText>
            {texts.reset}
          </Button>
        )}
      </div>

      <div className={st.categories} data-scroll="allow">
        {activeCategory.categories.map((category, idx) => {
          return (
            <div
              key={getKeyFromCategory(category)}
              className={cn(st.category, {
                [st.active]: category.selected,
              })}
              onClick={onCategoryClick(category, idx)}
            >
              <img src={category.image?.src} alt={category.title} />
              <p>{category.title}</p>
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
