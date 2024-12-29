import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import st from './styles.module.scss';

export function ProductCounter({ counter }: { counter: number }) {
  const { i18n } = useLingui();

  return (
    <p className={st.counter}>
      {plural(counter, {
        one: '# товар',
        few: '# товара',
        other: '# товаров',
      })}
    </p>
  );
}
