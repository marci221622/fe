import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  node?: string;
  children: ReactNode;
}

// Не использовать в SSR
export const Portal = ({ node = '#app-root', children }: PortalProps) => {
  const target = document.querySelector(node);

  return createPortal(children, target ?? document.body);
};
