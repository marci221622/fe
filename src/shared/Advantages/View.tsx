import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $advantagesDataList, $mappedStrings } from '@/shared/configs';

import { List, Typography } from '@/ui/index';

import { clickAndCollectIcons, PackingIcon, DeliveryIcon, GarantiIcon } from '@/ui/assets/icons';

import { DescriptionModals, useDescriptionModals } from '../description-modals';

import st from './styles.module.scss';

type Props = {
  className?: string;
  titleVisible?: boolean;
  titleColored?: boolean;
};

const LINK_RGXP = /<u>\[(.*)\]\((.*)\)<\/u>/gi;

const icons: Record<string, React.JSX.Element> = {
  'best-choice-small': <GarantiIcon />,
  Box: <PackingIcon />,
  delivery: <DeliveryIcon />,
  hanger: <clickAndCollectIcons.PackingIcon />,
};

export function CompanyAdvantages({ className, titleVisible = true, titleColored }: Props) {
  const descriptionModals = useDescriptionModals();
  const list = useUnit($advantagesDataList);
  const texts = useUnit($mappedStrings);
  const onMoreAction = (content: string) => {
    const [, title, link] = LINK_RGXP.exec(content) ?? [];

    if (title && link) {
      return (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (link.endsWith('/guarantee')) {
          descriptionModals.setCurrentModal(DescriptionModals.Garantie);
        }

        if (link.endsWith('/delivery')) {
          descriptionModals.setCurrentModal(DescriptionModals.Delivery);
        }

        if (link.endsWith('/fitting')) {
          descriptionModals.setCurrentModal(DescriptionModals.Room);
        }
      };
    }

    return undefined;
  };

  return (
    <div className={cn(st.wrapper, className)}>
      {titleVisible && (
        <Typography.Title className={cn(st.title, { [st.colored]: titleColored })}>
          {texts.advantages.title}
        </Typography.Title>
      )}

      <List
        subtitleClassName={st.subtitle}
        labelClassName={st.label}
        className={cn(st.shortInfoList, st.smallGap)}
        items={list.map(item => ({
          ...item,
          icon: icons[item.icon],
          subtitle: item.subtitle.replace(LINK_RGXP, ''),
          onMoreAction: onMoreAction(item.subtitle),
        }))}
      />
    </div>
  );
}
