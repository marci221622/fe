import { DeliveryIcon, FaqIcon, GarantiIcon, LockIcon, PolicyIcon } from '@/ui/assets/icons';

import mobileApp from './assets/mobileApp/mobileApp.png';
import mobileAppWebp from './assets/mobileApp/mobileApp.webp';
import mobileApp2x from './assets/mobileApp/mobileApp@2x.png';
import mobileAppWebp2x from './assets/mobileApp/mobileApp@2x.webp';
import phoneThumb from './assets/mobileApp/phoneThumb.png';
import phoneThumbWebp from './assets/mobileApp/phoneThumb.webp';
import phoneThumb2x from './assets/mobileApp/phoneThumb@2x.png';
import phoneThumbWebp2x from './assets/mobileApp/phoneThumb@2x.webp';
import qrCode from './assets/mobileApp/qrCode.png';
import qrCodeWebp from './assets/mobileApp/qrCode.webp';
import qrCode2x from './assets/mobileApp/qrCode@2x.png';
import qrCodeWebp2x from './assets/mobileApp/qrCode@2x.webp';
import placeholder from './assets/placeholder.jpg';
import tsumCollect from './assets/tsumCollect.png';
import { CollectLandingData } from './types';

export const DATA: CollectLandingData = {
  pageTitle: 'TSUM Collect — платформа ЦУМа для покупки и продажи товаров класса люкс. ',
  pageDescription:
    'Здесь покупатели могут приобрести коллекционные вещи, а продавцы — быстро и легко освободить гардероб.',
  features: {
    title: 'Наши преимущества',
    mobileTitle: 'Преимущества Tsum Collect',
    content: [
      {
        picture: placeholder,
        mobilePicture: 'Validity',
        text: 'Многолетний опыт и лучшая экспертиза по работе с модными брендами',
      },
      {
        picture: placeholder,
        mobilePicture: 'Avatar',
        text: 'Кураторский подход к ассортименту',
      },
      {
        picture: placeholder,
        mobilePicture: 'Medal',
        text: 'Безупречный сервис, к которому привыкли клиенты ЦУМа',
      },
    ],
  },
  tsumCollectLogo: {
    logo: tsumCollect,
    alt: 'Логотип ЦУМ Collect',
  },
  buyer: {
    title: 'Купить',
    titleWide: '\u00A0\u00A0\u00A0\u00A0Купить\u00A0\u00A0\u00A0\u00A0',
    qr: {
      picture: qrCode,
      picture2x: qrCode2x,
      pictureWebp: qrCodeWebp,
      pictureWebp2x: qrCodeWebp2x,
      text: (
        <span>
          Отсканируйте QR-код, чтобы
          <br />
          установить приложение
        </span>
      ),
      note: '',
    },
    desktopPhonePicture: phoneThumb,
    desktopPhonePicture2x: phoneThumb2x,
    desktopPhonePictureWebp: phoneThumbWebp,
    desktopPhonePictureWebp2x: phoneThumbWebp2x,
    mobilePhonePicture: mobileApp,
    mobilePhonePicture2x: mobileApp2x,
    mobilePhonePictureWebp: mobileAppWebp,
    mobilePhonePictureWebp2x: mobileAppWebp2x,
    downloadAppText: 'Скачайте приложение, чтобы начать шопинг',
    downloadAppButton: {
      text: 'Скачать',
      // link: downloadLink,
      link: '',
    },
    infoList: [
      {
        text:
          'В ассортименте TSUM Collect представлены только подлинные вещи в новом и отличном состоянии. ' +
          'Каждый товар проходит многоэтапную проверку нашими экспертами с большим опытом работы в сегменте люкс.',
        icon: <GarantiIcon />,
      },
      {
        text: 'Мы гарантируем быструю доставку от 2 дней с момента оформления заказа.',
        icon: <DeliveryIcon />,
      },
      {
        text: 'Вы можете примерить вещи в пространстве TSUM Collect на третьем этаже ТД ЦУМ по адресу: г. Москва, ул. Петровка, д. 2.',
        icon: <FaqIcon />,
      },
    ],
  },
  seller: {
    title: 'Продать',
    titleWide: '\u00A0\u00A0\u00A0\u00A0Продать\u00A0\u00A0\u00A0\u00A0',
    description: [
      'Оставьте заявку и дождитесь звонка менеджера, который уточнит информацию о товарах и предложит удобное время для их передачи. ',
      'Привезите вещи в TSUM Collect по адресу: г. Москва, ул. Петровка, д. 2, 5-й этаж (рядом с зонами возврата и упаковки).',
    ],
    infoList: [
      {
        text: 'TSUM Collect принимает только подлинные брендовые товары: женскую и мужскую одежду, обувь, сумки и аксессуары. Вещи должны быть новыми с этикетками или в отличном состоянии (без следов эксплуатации, не требующие ремонта и химчистки).',
        icon: <FaqIcon />,
      },
      {
        text: 'Мы гарантируем сохранность вещей и бережное отношение к ним на всех этапах предпродажной подготовки.',
        icon: <PolicyIcon />,
      },
      {
        text: 'Мы заботимся о комфорте продавцов: вы не взаимодействуете с покупателем.',
        icon: <LockIcon />,
      },
    ],
  },
  form: {
    inputNamePlaceholder: 'Ваше имя',
    inputPhonePlaceholder: 'Ваш номер телефона',
    textareaCommentPlaceholder: 'Укажите вещи, которые хотите продать',
    errorMessage: 'Неправильный номер телефона',
    buttonFormText: 'Отправить заявку',
  },
};

