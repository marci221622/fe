import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';

import { paths } from '@/constants/paths';

import { useClickedLinkAnalytics } from '@/features/customer';

import { List } from '@/ui/index';

import { BasketIconV2, PaperIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export function ProfilePopup({ className }: { className?: string }) {
  const texts = useUnit($mappedStrings);
  const navigate = useNavigate();
  const clickHandler = useClickedLinkAnalytics({ place: 'popup' });

  const handleLink = (path: string) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    clickHandler(path);
    navigate(path);
  };

  return (
    <div className={cn(st.popupContainer, className)}>
      <div className={cn(st.inner)}>
        <List
          items={[
            {
              label: texts.profile.myData,
              icon: <PaperIcon />,
              command: handleLink(paths.profile.contacts()),
            },
            {
              label: texts.profile.myOrders,
              icon: <BasketIconV2 color="currentColor" />,
              command: handleLink(paths.profile.orders()),
            },
          ]}
        />
      </div>
    </div>
  );
}
