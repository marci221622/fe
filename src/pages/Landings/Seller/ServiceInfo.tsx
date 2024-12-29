import cn from 'classnames';
import { useContext } from 'react';

import { templateCtx } from '@/shared/ui';

import { Button, Space, Typography } from '@/ui/index';

import st from './styles.module.scss';

export function ServiceInfo() {
  const template = useContext(templateCtx);

  return (
    <Space direction="vertical" size="large" className={cn(st.space, st.serviceInfo)} stretch>
      <Typography.Title className={st.title}>ПОДАРИТЕ ВЕЩАМ НОВУЮ ЖИЗНЬ</Typography.Title>
      <Typography.Paragraph className={st.text}>
        TSUM Collect — платформа ЦУМа для покупки <br /> и продажи товаров класса люкс.
      </Typography.Paragraph>

      <Typography.Paragraph className={st.text}>
        Здесь покупатели могут приобрести коллекционные вещи, а продавцы — быстро и легко освободить гардероб.
      </Typography.Paragraph>

      <Button
        size="S"
        className={st.button}
        onClick={() => {
          const target = document.querySelector('#howToSellTitle');

          if (target) {
            const headerHeight = template?.getBoundingClientRect()?.height;
            const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight ?? 0);

            window.scrollTo({
              behavior: 'smooth',
              top,
            });
          }
        }}
      >
        <Typography.Paragraph className={st.buttonText}>Начать продавать</Typography.Paragraph>
      </Button>
    </Space>
  );
}
