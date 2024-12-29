import cn from 'classnames';
import { ReactNode } from 'react';

import st from './styles.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  noMargin?: boolean;
  asBlock?: boolean;
};

export function PageTitle({ children, className, noMargin, asBlock }: Props) {
  return asBlock ? (
    <div
      className={cn(st.pageTitle, className, {
        [st.noMargin]: true,
      })}
    >
      {children}
    </div>
  ) : (
    <h1
      className={cn(st.pageTitle, className, {
        [st.noMargin]: noMargin,
      })}
    >
      {children}
    </h1>
  );
}

// Для сео тайтлов
// На пример на каталоге по бренду лого картинкой
// Там будет скрытый тайтл
export function HiddenPageTitle(props: Props) {
  return <PageTitle {...props} noMargin className={st.hidden} />;
}
