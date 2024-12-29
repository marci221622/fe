import cn from 'classnames';

import st from './styles.module.scss';

// FROM_TSUM_APP

type Props = {
  size?: 'medium' | 'large';
  className?: string;
};

const spinnerChildren = Array.from({ length: 8 }).map((_, index) => (
  /* eslint-disable-next-line */
  <div key={index} className={st['ispinner-blade']} />
));

export function Spinner({ size = 'medium', className }: Props) {
  return <div className={cn(st.ispinner, className, { [st.large]: size === 'large' })}>{spinnerChildren}</div>;
}
