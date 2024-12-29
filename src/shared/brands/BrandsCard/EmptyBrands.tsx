import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export function EmptyBrands() {
  return (
    <Typography.Paragraph className={st.emptyText}>
      Дисклеймер!! Алярма! Товары бренда закончились, задите позже
    </Typography.Paragraph>
  );
}
