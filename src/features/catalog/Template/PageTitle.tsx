import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $appIsShort } from '@/shared/configs';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export function PageTitle({ title, asBlock }: { title: string; asBlock?: boolean }) {
  const appIsShort = useUnit($appIsShort);

  return (
    <Typography.PageTitle
      asBlock={asBlock}
      noMargin
      className={cn({
        [st.pageTitleShort]: appIsShort,
      })}
    >
      {title}
    </Typography.PageTitle>
  );
}
