import { Typography } from '@/ui/Typography';

import { clickAndCollectIcons, ClothIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export const StartToSell = () => {
  return (
    <div className={st.startToSell}>
      <Typography.Title className={st.title}>НАЧНИТЕ ПРОДАВАТЬ - ЭТО ПРОСТО!</Typography.Title>
      <div className={st.row}>
        <div className={st.plate}>
          <clickAndCollectIcons.ReadyIcon className={st.icon} />
          <Typography.Paragraph className={st.description}>
            Наша программа для профессиональных продавцов позволяет запустить продажи товаров быстро и безопасно
          </Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <ClothIcon className={st.icon} />
          <Typography.Paragraph className={st.description}>
            Мы сами сделаем фото, добавим описание, опубликуем на витрине и доставим товары покупателю
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};
