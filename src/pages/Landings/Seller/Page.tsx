import cn from 'classnames';
import { useUnit } from 'effector-react';
import { QRCodeSVG } from 'qrcode.react';

import { $sellItemsRequestEnabled, useMobileAppDownloadLinks } from '@/shared/configs';
import { OrderAgreement } from '@/shared/ui';

import { Faq, landingSeo } from '@/features/landings';

import { Button, Field, FieldMasked, List, Responsive, Space, Typography } from '@/ui/index';

import { AppleBadge, GoogleBadge } from '@/ui/assets/Bagges';
import { ClockIcon, PackingIcon, StuffIcon } from '@/ui/assets/icons';

import { assets } from './assets';
import { Cloth } from './Cloth';
import { useSellerForm } from './Form/useForm';
import { ServiceInfo } from './ServiceInfo';
import { SuccessModal } from './SuccessModal';

import st from './styles.module.scss';

function Step({ step }: { step: number }) {
  return <span className={st.step}>{step}</span>;
}

const descriptions = {
  mobile: 'Доступно',
  desktop: 'Отсканируйте QR-код, чтобы установить приложение',
};

const productsItems = [
  {
    icon: <StuffIcon />,
    label: 'Подлинность',
    subtitle: 'Принимаем только подлинные брендовые товары: женскую и мужскую одежду, обувь, сумки и аксессуары',
  },
  {
    icon: <PackingIcon />,
    label: 'Бережное отношение',
    subtitle: `Аккуратно относимся к вещам 
        на всех этапах - от подготовки 
        до доставки.`,
  },
  {
    icon: <ClockIcon />,
    label: 'Экономия времени',
    subtitle: `Заботимся о вашем комфорте - возьмем подготовку вещей и взаимодействие 
      с покупателем на себя`,
  },
];

const sellQuestions = [
  {
    icon: <Step step={1} />,
    label: 'Установите приложение TSUM Collect и оставьте заявку',
    subtitle: `Менеджер позвонит вам в течение дня`,
  },
  {
    icon: <Step step={2} />,
    label: 'Привезите вещи',
    subtitle: `г. Москва, ул. Петровка, д. 2, 5-й этаж`,
  },
  {
    icon: <Step step={3} />,
    label: 'Отслеживайте вещи в личном кабинете продавца',
    subtitle: `Cделаем фото, добавим описание  и доставим вещь покупателю`,
  },
  {
    icon: <Step step={4} />,
    label: 'Получите деньги после продажи вещей',
    subtitle: `Мы оповестим о продаже вещи и переведем деньги на вашу карту`,
  },
];

function Form({ form, isDark }: { form: ReturnType<typeof useSellerForm>; isDark?: boolean }) {
  return (
    <form className={st.actionForm} onSubmit={form.onSubmit()}>
      <Space direction="vertical" stretch size="large">
        <Field
          placeholder="Имя"
          variant={isDark ? 'dark' : 'light'}
          {...form.register('name')}
          error={form.formState.errors.name?.message}
          withShadow={!isDark}
        />
        <FieldMasked
          type="tel"
          maskProps={{
            mask: '+7 (999) 999-99-99',
          }}
          placeholder="Номер телефона"
          variant={isDark ? 'dark' : 'light'}
          error={form.formState.errors.phone?.message}
          {...form.register('phone')}
          withShadow={!isDark}
        />

        <Button stretch outline={isDark} bold size="L" type="submit" pending={form.pending}>
          Отправить заявку
        </Button>

        <OrderAgreement isPrivacy className={st.agreement} hasMargin={false} />
      </Space>
    </form>
  );
}

export default function SellerPage() {
  const mobileAppLinks = useMobileAppDownloadLinks();
  const form = useSellerForm();
  const isV2 = useUnit($sellItemsRequestEnabled);

  const v2Picture = (
    <picture>
      <source media="(min-width: 1024px)" srcSet={`${assets.appbgv2.main}`} />
      <img src={assets.appbgv2.mainMobile} role="presentation" alt="" />
    </picture>
  );

  const contentv1 = (
    <section className={cn(st.head, st.appbg)} id="appForm">
      <Space size="large" className={st.space} stretch>
        <div className={st.appbgImage}>
          {isV2 ? (
            v2Picture
          ) : (
            <picture>
              <source media="(min-width: 1024px)" srcSet={`${assets.appbg.main} 1x, ${assets.appbg.x2} 2x`} />
              <img src={assets.appbg.mainMobile} srcSet={`${assets.appbg.x2Mobile} 2x`} role="presentation" alt="" />
            </picture>
          )}
        </div>

        <Space direction="vertical" className={st.info}>
          <Typography.Title id="appForm">продавайте вещи в&nbsp;нашем приложении</Typography.Title>
          <Typography.Paragraph className={st.text}>
            <span className={st.desktop}>{descriptions.desktop}</span>
          </Typography.Paragraph>

          <div className={st.appsWithQr}>
            <QRCodeSVG value={mobileAppLinks.qr} className={st.qrCode} includeMargin size={84} />

            <div className={st.appLinks}>
              <a href={mobileAppLinks.ios} aria-label="apple">
                <AppleBadge />
              </a>
              <a href={mobileAppLinks.android} aria-label="android">
                <GoogleBadge />
              </a>
            </div>
          </div>
        </Space>
      </Space>
    </section>
  );

  return (
    <>
      <landingSeo.Seo />

      <section className={cn(st.head, st.mainHead)}>
        <Responsive.Desktop>
          <ServiceInfo />
        </Responsive.Desktop>
      </section>

      <Responsive.TabletAndBelow>
        <ServiceInfo />
      </Responsive.TabletAndBelow>

      <List subtitleClassName={st.subtitle} className={st.shortInfoList} items={productsItems} />

      <Typography.Title className={st.title}>Что можно продать</Typography.Title>

      <Cloth />

      <Typography.Title className={st.title} id="howToSellTitle">
        Как продать
      </Typography.Title>

      <List subtitleClassName={st.subtitle} className={cn(st.shortInfoList, st.smallGap)} items={sellQuestions} />
      {isV2 ? (
        <Responsive.TabletAndBelow>
          <Space size="large" direction="vertical" stretch className={st.tabletSpace}>
            {contentv1}
            <Typography.Title className={st.formTitle}>Оставьте заявку</Typography.Title>
            <Typography.Paragraph center>
              Дождитесь звонка менеджера. Мы&nbsp;уточним информацию о&nbsp;товарах и&nbsp;предложим удобное время для
              их&nbsp;передачи.
            </Typography.Paragraph>
            <Form form={form} />
          </Space>
        </Responsive.TabletAndBelow>
      ) : (
        contentv1
      )}

      {isV2 && (
        <Responsive.Desktop>
          <section className={cn(st.head, st.appbg)} id="appForm">
            <Space size="large" className={st.space} stretch>
              <Space className={cn(st.info, st.v2)}>
                <Space direction="vertical" className={cn(st.col, st.leftSide)}>
                  <Typography.Title>продавайте вещи в&nbsp;нашем приложении</Typography.Title>
                  <Typography.Paragraph className={st.text}>
                    <span className={st.desktop}>{descriptions.desktop}</span>
                  </Typography.Paragraph>

                  <div className={st.appsWithQr}>
                    <QRCodeSVG value={mobileAppLinks.qr} className={st.qrCode} includeMargin size={84} />

                    <div className={st.appLinks}>
                      <a href={mobileAppLinks.ios} aria-label="apple">
                        <AppleBadge />
                      </a>
                      <a href={mobileAppLinks.android} aria-label="android">
                        <GoogleBadge />
                      </a>
                    </div>
                  </div>
                </Space>

                <div className={cn(st.appbgImage, st.v2)}>{v2Picture}</div>

                <Space direction="vertical" className={st.col}>
                  <Typography.Title>или оставьте заявку на&nbsp;продажу</Typography.Title>
                  <Typography.Paragraph className={st.text}>
                    Дождитесь звонка менеджера. Мы&nbsp;уточним информацию и&nbsp;вы&nbsp;сможете передать товары.
                  </Typography.Paragraph>

                  <Form form={form} isDark />
                </Space>
              </Space>
            </Space>
          </section>
        </Responsive.Desktop>
      )}

      <section className={st.faq}>
        <Faq hideListTitles onlyTab="sell" titleClassName={st.title} />
      </section>

      <SuccessModal opened={form.saleReceived} onClose={form.handleModalChange} />
    </>
  );
}
