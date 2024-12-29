import bagReversed from './assets/bag-reversed.jpg';
import bagReversed_webp from './assets/bag-reversed.webp';
import bagReversed_2x from './assets/bag-reversed@2x.jpg';
import bagReversed_2x_webp from './assets/bag-reversed@2x.webp';
import bag from './assets/bag.jpg';
import bag_webp from './assets/bag.webp';
import bag_2x from './assets/bag@2x.jpg';
import bag_2x_webp from './assets/bag@2x.webp';
import details1 from './assets/details-1.jpg';
import details1_webp from './assets/details-1.webp';
import details1_2x from './assets/details-1@2x.jpg';
import details1_2x_webp from './assets/details-1@2x.webp';
import details2 from './assets/details-2.jpg';
import details2_webp from './assets/details-2.webp';
import details2_2x from './assets/details-2@2x.jpg';
import details2_2x_webp from './assets/details-2@2x.webp';
import details3 from './assets/details-3.jpg';
import details3_webp from './assets/details-3.webp';
import details3_2x from './assets/details-3@2x.jpg';
import details3_2x_webp from './assets/details-3@2x.webp';
import dressReversed from './assets/dress-reversed.jpg';
import dressReversed_webp from './assets/dress-reversed.webp';
import dressReversed_2x from './assets/dress-reversed@2x.jpg';
import dressReversed_2x_webp from './assets/dress-reversed@2x.webp';
import dress from './assets/dress.jpg';
import dress_webp from './assets/dress.webp';
import dress_2x from './assets/dress@2x.jpg';
import dress_2x_webp from './assets/dress@2x.webp';
import label1 from './assets/label-1.jpg';
import label1_webp from './assets/label-1.webp';
import label1_2x from './assets/label-1@2x.jpg';
import label1_2x_webp from './assets/label-1@2x.webp';
import label2 from './assets/label-2.jpg';
import label2_webp from './assets/label-2.webp';
import label2_2x from './assets/label-2@2x.jpg';
import label2_2x_webp from './assets/label-2@2x.webp';
import label3 from './assets/label-3.jpg';
import label3_webp from './assets/label-3.webp';
import label3_2x from './assets/label-3@2x.jpg';
import label3_2x_webp from './assets/label-3@2x.webp';
import shoesReversed from './assets/shoes-reversed.jpg';
import shoesReversed_webp from './assets/shoes-reversed.webp';
import shoesReversed_2x from './assets/shoes-reversed@2x.jpg';
import shoesReversed_2x_webp from './assets/shoes-reversed@2x.webp';
import shoes from './assets/shoes.jpg';
import shoes_webp from './assets/shoes.webp';
import shoes_2x from './assets/shoes@2x.jpg';
import shoes_2x_webp from './assets/shoes@2x.webp';
import tag1 from './assets/tag-1.jpg';
import tag1_webp from './assets/tag-1.webp';
import tag1_2x from './assets/tag-1@2x.jpg';
import tag1_2x_webp from './assets/tag-1@2x.webp';
import tag2 from './assets/tag-2.jpg';
import tag2_webp from './assets/tag-2.webp';
import tag2_2x from './assets/tag-2@2x.jpg';
import tag2_2x_webp from './assets/tag-2@2x.webp';
import tag3 from './assets/tag-3.jpg';
import tag3_webp from './assets/tag-3.webp';
import tag3_2x from './assets/tag-3@2x.jpg';
import tag3_2x_webp from './assets/tag-3@2x.webp';
import { OverallPlan } from './types';

export const OVERALL_PLAN: OverallPlan[] = [
  {
    title: 'Общий план',
    content: [
      {
        text: 'Чтобы сфотографировать, положите вещь на ровную поверхность. Сделайте фото, переверните вещь, сделайте еще одно.',
        photos: [
          {
            main: dress,
            main2x: dress_2x,
            mainwebp: dress_webp,
            mainwebp2x: dress_2x_webp,
          },
          {
            main: dressReversed,
            main2x: dressReversed_2x,
            mainwebp: dressReversed_webp,
            mainwebp2x: dressReversed_2x_webp,
          },
        ],
      },
      {
        text: 'При съемке обуви фотографируйте пару. Выберите ракурс, при котором полностью видно изделие и его внешнее состояние.',
        photos: [
          {
            main: shoes,
            main2x: shoes_2x,
            mainwebp: shoes_webp,
            mainwebp2x: shoes_2x_webp,
          },
          {
            main: shoesReversed,
            main2x: shoesReversed_2x,
            mainwebp: shoesReversed_webp,
            mainwebp2x: shoesReversed_2x_webp,
          },
        ],
      },
      {
        text: 'Сумки можно фотографировать в вертикальном и горизонтальном положениях.',
        photos: [
          {
            main: bag,
            main2x: bag_2x,
            mainwebp: bag_webp,
            mainwebp2x: bag_2x_webp,
          },
          {
            main: bagReversed,
            main2x: bagReversed_2x,
            mainwebp: bagReversed_webp,
            mainwebp2x: bagReversed_2x_webp,
          },
        ],
      },
    ],
  },
  {
    title: 'Детали',
    content: [
      {
        text: 'Выберите крупные и четкие фотографии декора, фурнитуры, материала.',
        photos: [
          {
            main: details1,
            main2x: details1_2x,
            mainwebp: details1_webp,
            mainwebp2x: details1_2x_webp,
          },
          {
            main: details2,
            main2x: details2_2x,
            mainwebp: details2_webp,
            mainwebp2x: details2_2x_webp,
          },
          {
            main: details3,
            main2x: details3_2x,
            mainwebp: details3_webp,
            mainwebp2x: details3_2x_webp,
          },
        ],
      },
    ],
  },
  {
    title: 'Фирменный лейбл',
    content: [
      {
        text: 'Обычно на нём изображен логотип бренда, и указан размер. У обуви логотип часто указывают на стельке.',
        photos: [
          {
            main: label1,
            main2x: label1_2x,
            mainwebp: label1_webp,
            mainwebp2x: label1_2x_webp,
          },
          {
            main: label2,
            main2x: label2_2x,
            mainwebp: label2_webp,
            mainwebp2x: label2_2x_webp,
          },
          {
            main: label3,
            main2x: label3_2x,
            mainwebp: label3_webp,
            mainwebp2x: label3_2x_webp,
          },
        ],
      },
    ],
  },
  {
    title: 'Вшивной ярлык',
    content: [
      {
        text: 'Достаточно фотографии первой страницы ярлыка. Если вы фотографируете сумку или обувь, оставьте поле пустым.',
        photos: [
          {
            main: tag1,
            main2x: tag1_2x,
            mainwebp: tag1_webp,
            mainwebp2x: tag1_2x_webp,
          },
          {
            main: tag2,
            main2x: tag2_2x,
            mainwebp: tag2_webp,
            mainwebp2x: tag2_2x_webp,
          },
          {
            main: tag3,
            main2x: tag3_2x,
            mainwebp: tag3_webp,
            mainwebp2x: tag3_2x_webp,
          },
        ],
      },
    ],
  },
];
