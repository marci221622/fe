import cn from 'classnames';
import { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react';

import { CloseIcon } from '@/ui/assets/icons';

import st from './style.module.scss';

interface Props extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  headerContent?: React.JSX.Element;
  closePopup?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  title?: string;
  withHeader?: boolean;
  children?: ReactNode;
  headerClassName?: string;
}

export const PopupMenu = forwardRef<HTMLDivElement, Props>(
  ({ className, children, title, headerContent, withHeader = true, closePopup, headerClassName, ...props }, ref) => {
    return (
      <div className={cn(st.container, className)} {...props} ref={ref}>
        {withHeader && (
          <div className={cn(st.header, headerClassName)}>
            {headerContent ?? (
              <>
                <CloseIcon className={st.close} onClick={closePopup} />

                {title && <p>{title}</p>}
              </>
            )}
          </div>
        )}

        {children}
      </div>
    );
  },
);
