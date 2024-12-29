import { Link } from 'react-router-dom';

import { Button } from '@/ui/Button';
import { Typography } from '@/ui/Typography';

import { formLink } from '../constants';

import st from './styles.module.scss';

export function HowDoesItWorkMobile() {
  return (
    <div className={st.howDoesItWork}>
      <Typography.Title className={st.title}>КАК ЭТО РАБОТАЕТ?</Typography.Title>
      <div className={st.row}>
        <div className={st.plate}>
          <Typography.Paragraph className={st.number}>1</Typography.Paragraph>
          <Typography.Paragraph className={st.subtitle}>Заявка</Typography.Paragraph>
          <Typography.Paragraph className={st.description}>
            Создайте заявку на поставку на сайте или в мобильном приложении
          </Typography.Paragraph>
        </div>
        <div className={st.separator} />
        <div className={st.plate}>
          <Typography.Paragraph className={st.number}>2</Typography.Paragraph>
          <Typography.Paragraph className={st.subtitle}>Планирование поставки</Typography.Paragraph>
          <Typography.Paragraph className={st.description}>
            Персональный менеджер поможет вам подобрать ассортимент и будет сопровождать на каждом этапе
          </Typography.Paragraph>
        </div>
        <div className={st.separator} />
        <div className={st.plate}>
          <Typography.Paragraph className={st.number}>3</Typography.Paragraph>
          <Typography.Paragraph className={st.subtitle}>Продажа</Typography.Paragraph>
          <Typography.Paragraph className={st.description}>
            Отслеживайте статус продаж в личном кабинете 24/7
          </Typography.Paragraph>
        </div>
        <div className={st.separator} />
        <div className={st.plate}>
          <Typography.Paragraph className={st.lastNumber}>4</Typography.Paragraph>
          <Typography.Paragraph className={st.subtitle}>Выплата</Typography.Paragraph>
          <Typography.Paragraph className={st.description}>
            После продажи деньги поступают на ваш счет
          </Typography.Paragraph>
        </div>
      </div>
      <Link to={formLink} className={st.linkWrapper}>
        <Button className={st.button} size="L">
          Начать продавать
        </Button>
      </Link>
    </div>
  );
}
