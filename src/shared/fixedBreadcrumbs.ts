import { useUnit } from 'effector-react';

import { Section } from '@/generated/customer_hub/enums/section';

import { paths } from '@/constants/paths';

import { useLinkBuilder } from './pageRouting';
import { $currentGender } from './session';

export function useHomeLink() {
  const gender = useUnit($currentGender);

  return gender === Section.SECTION_MALE ? paths.home.men() : paths.home.women();
}

export function useFixedBreadcrumbs() {
  const builder = useLinkBuilder();
  const home = useHomeLink();

  return [
    {
      title: 'Главная',
      to: home,
    },
    {
      title: 'Каталог',
      to: builder(paths.categories.root()),
    },
  ];
}

export function useOrderBreadcrumbs() {
  const home = useHomeLink();

  return [
    {
      title: 'Главная',
      to: home,
    },
    {
      title: 'Личный кабинет',
      to: paths.profile.main(),
    },
    {
      title: 'Мои заказы',
      to: paths.profile.orders(),
    },
  ];
}
