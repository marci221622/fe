import cn from 'classnames';

import st from './styles.module.scss';

export function BlurCounter({ counter }: { counter: number }) {
  return <div className={st.counter}>+ {counter}</div>;
}

export function BadgeCounter({ counter, className }: { counter: string; className?: string }) {
  return (
    <div className={cn(st.badge, className)}>
      <p>{counter}</p>
    </div>
  );
}
