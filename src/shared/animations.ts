import cn from 'classnames';
import { useUnit } from 'effector-react';

import { createField } from '@/lib/createField';

import st from './animations.module.scss';

export const headerStuckedField = createField(false);
export const headerSearchField = createField(false);

// Иденпотентные анимации по всему приложению
// учитывает хедер стакед
// банер
// стики
export function useStickyClassnames({ stuckedCn = '' }: { stuckedCn?: string; withBannerCn?: string }) {
  const stucked = useUnit(headerStuckedField.$value);
  // Если стики будут - нужно будет это учитывать в анимациях
  // const hasBanner = useUnit(visibleField.$value);

  return cn(st.wrapper, {
    [st.stucked]: stucked,
    [stuckedCn]: stucked,
    // [withBannerCn ?? st.withBanner]: hasBanner,
  });
}

// тоже что и сверху
// только от нуля
// подходит для чегото типа хедера
export function useStickyHeaderClassnames() {
  // const hasBanner = useUnit(visibleField.$value);

  return cn(st.header, {
    // [st.withBanner]: hasBanner,
  });
}
