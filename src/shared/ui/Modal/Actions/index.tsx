import cn from 'classnames';

import { ArrowRightIcon, CloseIcon } from '@/ui/assets/icons';

import st from './style.module.scss';

export interface CloseModalButtonProps {
  iconName?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const CloseModalButton = ({ className, ...props }: CloseModalButtonProps) => (
  <CloseIcon className={cn(st.button, className)} color="black" {...props} />
);

export const BackModalButton = ({ className, ...props }: CloseModalButtonProps) => (
  <ArrowRightIcon className={cn(st.button, st.backBtn, className)} color="black" {...props} />
);
