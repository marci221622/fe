import { Link } from 'react-router-dom';

import { Button } from '@/ui/Button';
import { Typography } from '@/ui/Typography';

import { formLink } from '../../constants';

import st from './styles.module.scss';

export const BottomBanner = () => {
  return (
    <div className={st.bottomBanner}>
      <div className={st.bannerImg} />
      <div className={st.content}>
        <Typography.Title className={st.title}>Спланируйте свою первую поставку уже сейчас!</Typography.Title>
        <Typography.Paragraph className={st.description}>
          Заполните короткую анкету <br /> и менеджер TSUM Collect свяжется с вами
        </Typography.Paragraph>
        <Link to={formLink}>
          <Button className={st.button}>
            <Typography.Paragraph className={st.buttonText}>Начать продавать</Typography.Paragraph>
          </Button>
        </Link>
      </div>
    </div>
  );
};
