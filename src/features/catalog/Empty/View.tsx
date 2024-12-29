import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';
import { useLinkBuilder } from '@/shared/pageRouting';

import { paths } from '@/constants/paths';

import { Button } from '@/ui/Button';
import { Responsive } from '@/ui/Responsive';

import st from './styles.module.scss';

type Props = { isSearchCatalog?: boolean; text?: string; withCatalogLink?: boolean };

export function EmptyCatalog({ isSearchCatalog, text, withCatalogLink }: Props) {
  const texts = useUnit($mappedStrings);
  const navigate = useNavigate();
  const builder = useLinkBuilder();

  const onCatalog = () => navigate(builder(paths.categories.root()));

  if (text) {
    return (
      <div className={cn(st.catalogEmptyText, st.withCatalogLink)}>
        {text}
        {withCatalogLink && (
          // TODO: двойная кнопка
          <>
            <Responsive.Desktop>
              <Button onClick={onCatalog} size="M" bold>
                {texts.itemDetails.purchasePanel.showCatalog}
              </Button>
            </Responsive.Desktop>

            <Responsive.TabletAndBelow>
              <Button colored onClick={onCatalog} size="XS">
                {texts.itemDetails.purchasePanel.showCatalog}
              </Button>
            </Responsive.TabletAndBelow>
          </>
        )}
      </div>
    );
  }

  return <div className={st.catalogEmptyText}>{isSearchCatalog ? texts.itemsList.empty : texts.web.noItems}</div>;
}
