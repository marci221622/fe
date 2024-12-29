import { useUnit } from 'effector-react';
import { cloneElement, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { Item } from '@/generated/customer_hub/entities/item.v1';

import { productVisibled } from './queue';

type Props = {
  children: React.JSX.Element;
  item: Item;
  list: string;
  page?: number;
  // Что бы отправить или не отправить аналитику*
  // На пример не отправлять товары которые просмотрели* с SSR
  condition?: boolean;
};

export function WithProductShowAnalytic({ children, item, list, page, condition }: Props) {
  const visibled = useUnit(productVisibled);
  const wasViewed = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !wasViewed.current && condition) {
      wasViewed.current = true;
      visibled({ list, item, page });
    }
  }, [inView, visibled, item, list, page, condition]);

  return cloneElement(children, { ref });
}
