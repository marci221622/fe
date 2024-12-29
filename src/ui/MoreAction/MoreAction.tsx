import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Button } from '../Button';

import st from './styles.module.scss';

type Props = {
  to: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | { pathname: string; search?: string } | string;
  reloadDocument?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  title: string;
  centered?: boolean;
  className?: string;
};

export function MoreAction({ title, centered, className, onClick, to, ...props }: Props) {
  const link = typeof to === 'function' ? '#' : to;

  return (
    <Link
      {...props}
      to={link}
      className={className}
      onClick={e => {
        onClick?.(e);

        if (typeof to === 'function') {
          to(e);
        }
      }}
    >
      <Button
        className={cn(st.action, st.wrapper, {
          [st.centered]: centered,
        })}
        reverse
      >
        {title}
      </Button>
    </Link>
  );
}
