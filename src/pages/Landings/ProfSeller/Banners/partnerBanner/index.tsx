import { Link } from 'react-router-dom';

import { Button } from '@/ui/index';
import { Typography } from '@/ui/Typography';

import { formLink } from '../../constants';

import st from './styles.module.scss';

export function PartnerBanner() {
  return (
    <div className={st.partnerBanner}>
      <div className={st.profSellerBanner} />
      <div className={st.content}>
        <Typography.Paragraph className={st.title}>TSUM COLLECT - ВАШ НАДЕЖНЫЙ ПАРТНЕР</Typography.Paragraph>
        <Typography.Paragraph className={st.description}>
          Получите возможность для быстрого роста за счет большой и лояльной к бренду TSUM Collect клиентской базы.
        </Typography.Paragraph>
        <Link to={formLink}>
          <Button size="L" className={st.button}>
            Начать продавать
          </Button>
        </Link>
      </div>
    </div>
  );
}
