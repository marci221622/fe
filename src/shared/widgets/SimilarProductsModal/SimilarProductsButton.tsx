import cn from 'classnames';
import { useUnit } from 'effector-react';
import React from 'react';

import { $mappedStrings } from '@/shared/configs';

import { Button } from '@/ui/index';

import { modalField } from './model';

import st from './styles.module.scss';

type PropsType = {
  codes: string[];
  className?: string;
};

export const SimilarProductsButton: React.FC<PropsType> = ({ codes, className }) => {
  const texts = useUnit($mappedStrings);
  const modal = useUnit(modalField);

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    modal.onChange(codes);
  };

  if (!codes.length) {
    return null;
  }

  return (
    <Button className={cn(className, st.button)} onClick={handleClick} size="XS" reverse>
      {texts.relevantItems.item.title}
    </Button>
  );
};
