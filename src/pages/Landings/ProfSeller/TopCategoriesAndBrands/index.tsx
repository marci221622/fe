import { Link } from 'react-router-dom';

import { formLink } from '@/pages/Landings/ProfSeller/constants';

import { Button } from '@/ui/Button';
import { Typography } from '@/ui/Typography';

import {
  bags,
  jackets,
  sneakers,
  cardigan,
  accessories,
  downJacket,
  lightJackets,
  coat,
  furCoat,
  shoes,
  hermes,
  dior,
  chanel,
  brunelloCucinelli,
  rolex,
  prada,
  gucci,
  celine,
  fendi,
  loroPiana,
  bottegaVeneta,
  valentino,
  moncler,
  louisVuitton,
  saintLaurent,
} from './assets';

import st from './styles.module.scss';

export const TopCategoriesAndBrands = () => {
  return (
    <div className={st.topCategoriesAndBrands}>
      <Typography.Title className={st.title}>Мы принимаем вещи 300 luxury & fashion брендов</Typography.Title>
      <Typography.Paragraph className={st.description}>В новом и отличном состояниях</Typography.Paragraph>
      <Typography.Paragraph className={st.subtitle}>топ категории</Typography.Paragraph>
      <div className={st.row}>
        <div className={st.plate}>
          <img className={st.clothBigImage} src={bags} alt="" />
          <Typography.Paragraph className={st.plateName}>Сумки, Рюкзаки, Портфлели, Тоут</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothBigImage} src={jackets} alt="" />
          <Typography.Paragraph className={st.plateName}>Жакеты</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothBigImage} src={sneakers} alt="" />
          <Typography.Paragraph className={st.plateName}>Кеды, Кроссовки, Шлепанцы</Typography.Paragraph>
        </div>
      </div>
      <div className={st.row}>
        <div className={st.plate}>
          <img className={st.clothImage} src={coat} alt="" />
          <Typography.Paragraph className={st.plateName}>Пальто</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothImage} src={downJacket} alt="" />
          <Typography.Paragraph className={st.plateName}>Пуховики</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothImage} src={lightJackets} alt="" />
          <Typography.Paragraph className={st.plateName}>Легкие куртки</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothImage} src={accessories} alt="" />
          <Typography.Paragraph className={st.plateName}>Аксессуары, платки, украшения</Typography.Paragraph>
        </div>
      </div>
      <div className={st.row}>
        <div className={st.plate}>
          <img className={st.clothBigImage} src={shoes} alt="" />
          <Typography.Paragraph className={st.plateName}>Ботинки</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothBigImage} src={furCoat} alt="" />
          <Typography.Paragraph className={st.plateName}>Шубы</Typography.Paragraph>
        </div>
        <div className={st.plate}>
          <img className={st.clothBigImage} src={cardigan} alt="" />
          <Typography.Paragraph className={st.plateName}>Кардиганы</Typography.Paragraph>
        </div>
      </div>
      <Typography.Paragraph className={st.subtitle}>топ бренды</Typography.Paragraph>
      <div className={st.row}>
        <div className={st.brandPlate}>
          <img className={st.brandImage} src={hermes} alt="" />
        </div>
        <div className={st.brandPlate}>
          <img className={st.brandImage} src={chanel} alt="" />
        </div>
        <div className={st.brandPlate}>
          <img className={st.brandImage} src={louisVuitton} alt="" />
        </div>
      </div>
      <div className={st.row}>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={dior} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={gucci} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={loroPiana} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={bottegaVeneta} alt="" />
        </div>
      </div>
      <div className={st.row}>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={brunelloCucinelli} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={saintLaurent} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={prada} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={valentino} alt="" />
        </div>
      </div>
      <div className={st.row}>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={fendi} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={celine} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={moncler} alt="" />
        </div>
        <div className={st.smallBrandPlate}>
          <img className={st.brandImage} src={rolex} alt="" />
        </div>
      </div>
      <Link to={formLink}>
        <Button className={st.button}>
          <Typography.Paragraph className={st.buttonText}>Начать продавать</Typography.Paragraph>
        </Button>
      </Link>
    </div>
  );
};
