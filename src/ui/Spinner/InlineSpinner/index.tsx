import { Spinner } from '../Indicator';

import st from './style.module.scss';

type Props = {
  size: 'medium' | 'large';
  text?: string;
  withDots?: boolean;
};

export function InlineSpinner({ size, text, withDots }: Props) {
  return (
    <div className={st.wrapper}>
      <Spinner size={size} />
      <span>
        {text}
        {withDots ? '…' : ''}
      </span>
    </div>
  );
}
