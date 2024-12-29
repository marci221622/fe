import cn from 'classnames';
import { useContext, ReactNode } from 'react';

import { EmptyCatalog } from '../Empty';

import { catalogCtx } from './ContentWrapper';

import st from './styles.module.scss';

type Props = { children: ReactNode; emptyText?: string; withCatalogLink?: boolean };

export function ContentWithFiltersWrapper({ children, emptyText, withCatalogLink }: Props) {
  const { nosidebar, isEmpty, pageType } = useContext(catalogCtx);

  return (
    <div className={cn(st.contentWithFilters, { [st.nosidebar]: nosidebar, [st.empty]: isEmpty })}>
      {isEmpty ? (
        <EmptyCatalog isSearchCatalog={pageType === 'search'} text={emptyText} withCatalogLink={withCatalogLink} />
      ) : (
        children
      )}
    </div>
  );
}
