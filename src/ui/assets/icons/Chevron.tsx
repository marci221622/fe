import { forwardRef } from 'react';

const styles = {
  bottom: 'rotate(90deg)',
  right: 'rotate(0deg)',
  top: 'rotate(-90deg)',
  left: 'rotate(180deg)',
};

type Props = {
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  color?: string;
  direction?: 'top' | 'left' | 'right' | 'bottom';
};

export const Chevron = forwardRef<HTMLElement, Props>(
  ({ className, onClick, color = 'currentColor', direction = 'right' }, ref) => {
    return (
      <svg
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
        // @ts-ignore
        ref={ref}
        style={{ transform: styles[direction] }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2646 21.8483L18.6285 15.4844L12.2646 9.12039C11.874 8.72987 11.874 8.0967 12.2646 7.70617C12.6551 7.31565 13.2883 7.31565 13.6788 7.70617L20.7499 14.7772C21.1404 15.1678 21.1404 15.8009 20.7499 16.1915L13.6788 23.2625C13.2883 23.6531 12.6551 23.6531 12.2646 23.2625C11.874 22.872 11.874 22.2388 12.2646 21.8483Z"
          fill={color}
        />
      </svg>
    );
  },
);
