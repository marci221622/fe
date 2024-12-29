import { BuyerInfo, SellerInfo } from '../types';

import st from './style.module.scss';

type Props = {
  data: BuyerInfo | SellerInfo;
};

export function InfoList({ data }: Props) {
  return (
    <ul className={st.infoList}>
      {data.infoList.map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <div className={st.infoItemIcon}>{item.icon}</div>
            <p>{item.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
