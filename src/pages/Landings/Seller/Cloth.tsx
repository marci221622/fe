import cn from 'classnames';
import { useContext } from 'react';

import { templateCtx } from '@/shared/ui';

import { Responsive, Space, Typography } from '@/ui/index';

import st from './styles.module.scss';

export function Cloth() {
  const template = useContext(templateCtx);

  const onImgClick = () => {
    const target = document.querySelector('#appForm');

    if (target) {
      const headerHeight = template?.getBoundingClientRect()?.height;
      const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight ?? 0);

      window.scrollTo({
        behavior: 'smooth',
        top,
      });
    }
  };

  return (
    <>
      <Responsive.Desktop>
        <section className={st.categories}>
          <div className={cn(st.category, st.large)} onClick={onImgClick}>
            <div className={cn(st.imageWrapper, st.bug)} />

            <Typography.Paragraph>Сумки</Typography.Paragraph>
          </div>

          <Space size="large" direction="vertical" wrap className={cn(st.space, st.group)} stretch>
            <Space size="large" className={cn(st.space)} stretch>
              <div className={cn(st.category)} onClick={onImgClick}>
                <div className={cn(st.imageWrapper, st.cloth)} />

                <Typography.Paragraph>Одежда</Typography.Paragraph>
              </div>
              <div className={cn(st.category, st.long)} onClick={onImgClick}>
                <div className={cn(st.imageWrapper, st.glasses)} />

                <Typography.Paragraph>Очки</Typography.Paragraph>
              </div>
            </Space>
            <Space size="large" className={cn(st.space)} stretch>
              <div className={cn(st.category, st.long)} onClick={onImgClick}>
                <div className={cn(st.imageWrapper, st.shoes)} />

                <Typography.Paragraph>Обувь</Typography.Paragraph>
              </div>
              <div className={st.category} onClick={onImgClick}>
                <div className={cn(st.imageWrapper, st.clock)} />

                <Typography.Paragraph>Аксессуары</Typography.Paragraph>
              </div>
            </Space>
          </Space>
        </section>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <section className={st.categories}>
          <div className={cn(st.category)} onClick={onImgClick}>
            <div className={cn(st.imageWrapper, st.bug)} />

            <Typography.Paragraph>Сумки</Typography.Paragraph>
          </div>

          <div className={cn(st.category)} onClick={onImgClick}>
            <div className={cn(st.imageWrapper, st.cloth)} />

            <Typography.Paragraph>Одежда</Typography.Paragraph>
          </div>
          <div className={cn(st.category)} onClick={onImgClick}>
            <div className={cn(st.imageWrapper, st.glasses)} />

            <Typography.Paragraph>Очки</Typography.Paragraph>
          </div>

          <div className={cn(st.category)} onClick={onImgClick}>
            <div className={cn(st.imageWrapper, st.shoes)} />

            <Typography.Paragraph>Обувь</Typography.Paragraph>
          </div>
          <div className={st.category} onClick={onImgClick}>
            <div className={cn(st.imageWrapper, st.clock)} />

            <Typography.Paragraph>Аксессуары</Typography.Paragraph>
          </div>
        </section>
      </Responsive.TabletAndBelow>
    </>
  );
}
