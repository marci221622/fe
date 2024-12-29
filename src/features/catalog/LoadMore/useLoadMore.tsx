import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { useViewport } from '@/lib/hooks';

import { Spinner } from '@/ui/index';

import st from './styles.module.scss';

type Props = {
  nextPage?: string | null;
  onLoadMore: (params: { nextPage?: string }) => void;
};

export function LoadMoreSpinner() {
  return <Spinner className={st.loadMoreSpinner} />;
}

export function useLoadMore({ nextPage, onLoadMore }: Props) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);
  const { isTabletAndBelow } = useViewport();

  const loadMoreInfinity = () => {
    if (nextPage && isTabletAndBelow) {
      onLoadMore({ nextPage });
    }
  };

  const loadMoreByAction = () => {
    if (nextPage) {
      onLoadMore({ nextPage });
    }
  };

  const btn = nextPage ? (
    <div className={st.pagination}>
      <p role="presentation" className={st.loadMore} onClick={loadMoreByAction}>
        {texts.web.revealMoreItems}
      </p>
    </div>
  ) : null;

  return {
    hasMore: !!nextPage,
    hasMoreForInfinity: !!nextPage && isTabletAndBelow,
    loadMoreBtn: btn,
    onLoadMore: loadMoreInfinity,
  };
}
