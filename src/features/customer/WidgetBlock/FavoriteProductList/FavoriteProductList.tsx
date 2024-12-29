import { plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Item } from '@/generated/customer_hub/entities/item.v1';

import { useLastFavoriteLink } from '@/features/favorites';

import { Typography, BlurCounter, Space } from '@/ui/index';

import st from './styles.module.scss';

const MAX_VIEW = 4;

type Props = {
  list: Item[];
  allCounter: number;
  inStockCounter: number;
};

export function FavoriteProductList({ list, allCounter, inStockCounter }: Props) {
  const { i18n } = useLingui();
  const favoritePath = useLastFavoriteLink();
  const counter = +allCounter > MAX_VIEW ? allCounter - MAX_VIEW : 0;

  return (
    <Link className={st.item} to={favoritePath}>
      <Space direction="vertical">
        <Typography.Paragraph className={st.title}>
          {plural(allCounter, {
            one: '# вещь',
            few: '# вещи',
            other: '# вещей',
          })}
        </Typography.Paragraph>
        <Typography.Paragraph>{inStockCounter} в наличии</Typography.Paragraph>
      </Space>

      <div
        className={cn(st.products, {
          [st.smallType]: true,
        })}
      >
        {list.slice(0, MAX_VIEW).map((item, idx, arr) => (
          <div className={st.imageContainer} key={item.code}>
            <img src={item.imagesSmall[0]?.src} alt={item.title} className={st.produtImage} key={item.code} />

            {counter > 0 && idx === arr.length - 1 && <BlurCounter counter={counter} />}
          </div>
        ))}
      </div>
    </Link>
  );
}
