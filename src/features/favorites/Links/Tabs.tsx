import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useLocation } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';

import { paths } from '@/constants/paths';

import { TabLinks } from '@/ui/index';

import st from './styles.module.scss';

type Props = {
  className?: string;
};

export function FavoriteLinks({ className }: Props) {
  const texts = useUnit($mappedStrings);
  const { pathname } = useLocation();

  return (
    <TabLinks
      classname={cn(st.links, className)}
      active={pathname}
      tabs={[
        {
          label: texts.favorite.tab.items.title,
          to: paths.favorites.main(),
        },
        {
          label: texts.tabs.brands,
          to: paths.favorites.brands(),
        },
      ]}
    />
  );
}
