import cn from 'classnames';
import { Link } from 'react-router-dom';

import { RelatedItem } from '@/generated/customer_hub/entities/item.v1';

import { paths } from '@/constants/paths';

import st from './sizes.module.scss';

type Props = {
  relatedItemSizes: RelatedItem[];
};

export function Sizes({ relatedItemSizes }: Props) {
  if (relatedItemSizes.length === 0) {
    return null;
  }

  const labelRu = relatedItemSizes[0].size?.russianLabel;
  const labelVendor = relatedItemSizes[0].size?.vendorLabel;

  return (
    <ul className={st.dates} data-scroll="allow">
      <li role="presentation" className={cn(st.outline)}>
        {labelVendor && <b>{labelVendor}</b>}
        {labelRu && <span>{labelRu}</span>}
      </li>

      {relatedItemSizes.map(size => (
        <li
          role="presentation"
          key={size.code}
          className={cn({
            [st.active]: size.isSelected,
            [st.disabled]: size.isCollected,
          })}
        >
          <Link to={paths.product(size.code)}>
            {size.size?.vendorSize && <b>{size.size?.vendorSize}</b>}
            {size.size?.russianSize && <span>{size.size?.russianSize}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
