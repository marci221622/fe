import { Chevron } from '@/ui/assets/icons';

type Props = {
  onClick?: () => void;
  direction?: 'top' | 'left' | 'right' | 'bottom';
};

export function Arrow({ onClick, direction }: Props) {
  return (
    <Chevron
      direction={direction}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.();
      }}
    />
  );
}
