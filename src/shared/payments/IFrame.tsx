import cn from 'classnames';

import { FRAME_PAYMEN_NAME } from '@/constants/runtimeConfig';

import st from './styles.module.scss';

export function IFrame({ displayed }: { displayed: boolean }) {
  return (
    <iframe
      title="payment"
      name={FRAME_PAYMEN_NAME}
      className={cn(st.frame, {
        [st.loaded]: displayed,
      })}
    />
  );
}
