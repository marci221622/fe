import cn from 'classnames';
import { useUnit } from 'effector-react';

import { useStickyClassnames } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';

import { Menu, Responsive, Segments } from '@/ui/index';

import { FavoriteTabs } from '../types';

import st from './favorites.module.scss';

type Props = {
  inStockCounter: number;
  outOfStockCounter: number;
  activeTab: FavoriteTabs;
  onChange: (tab: FavoriteTabs) => void;
  className?: string;
};

export function FavoriteFilters({ inStockCounter, outOfStockCounter, activeTab, onChange, className }: Props) {
  const texts = useUnit($mappedStrings);
  const sticky = useStickyClassnames({});

  return (
    <>
      <Responsive.Desktop className={cn(st.filters, className, sticky)}>
        <Menu
          list={[
            {
              title: `${texts.cart.inStockPicker.inStock} (${inStockCounter})`,
              checked: activeTab === FavoriteTabs.inStock,
              onChange: () => onChange(FavoriteTabs.inStock),
              value: 'inStock',
            },
            {
              title: `${texts.cart.inStockPicker.outOfStock} (${outOfStockCounter})`,
              checked: activeTab === FavoriteTabs.outOfStock,
              onChange: () => onChange(FavoriteTabs.outOfStock),
              value: 'outOfStock',
            },
          ]}
        />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow className={cn(st.filters, st.mobile, className)}>
        <Segments
          className={st.segments}
          name="favorites"
          onChange={event => onChange(event.target.value as FavoriteTabs)}
          value={activeTab}
          options={[
            { label: `${texts.cart.inStockPicker.inStock} (${inStockCounter})`, value: FavoriteTabs.inStock },
            { label: `${texts.cart.inStockPicker.outOfStock} (${outOfStockCounter})`, value: FavoriteTabs.outOfStock },
          ]}
        />
      </Responsive.TabletAndBelow>
    </>
  );
}
