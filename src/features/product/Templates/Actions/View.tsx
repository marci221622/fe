import cn from 'classnames';
import { forwardRef } from 'react';

import { Item } from '@/generated/customer_hub/entities/item.v1';

import { ActionSize } from '@/ui/Button';

import { CommonActions } from '../../CommonActions';

import st from './styles.module.scss';

type Props = {
  product: Item;
  notExists: boolean;
  className?: string;
  actionsSize?: ActionSize;
};

export const Actions = forwardRef<HTMLDivElement, Props>(({ className, product, notExists, actionsSize }, ref) => {
  return (
    <div className={cn(st.actions, className)} ref={ref}>
      {/* Заглушка */}
      {/* <div /> */}
      {/* <BreadcrumbsUI className={st.breadcrumbs} breadcrumbs={breadcrumbs} /> */}

      <CommonActions product={product} notExists={notExists} actionSize={actionsSize} />
    </div>
  );
});
