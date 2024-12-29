import cn from 'classnames';
import { useUnit } from 'effector-react';

import { ERID } from '@/generated/customer_hub/entities/erid.v1';
import { $mappedStrings } from '@/shared/configs';

import { Typography } from '@/ui/index';

import { Tooltip } from '../Tooltip';

import st from './Erid.module.scss';

type Props = {
  className?: string;
  erid?: ERID | null;
};

export function eridToLink(link: string, erid?: ERID | null) {
  if (erid) {
    return `${link}?erid=${erid.token}`;
  }

  return link;
}

export function EridAlert({ className, erid }: Props) {
  const texts = useUnit($mappedStrings);

  if (!erid) {
    return null;
  }

  return (
    <Tooltip
      withPopoverHeader
      popoverAlign="end"
      tag={({ openPopup }) => (
        <div className={cn(st.erid, className)} onClick={openPopup}>
          {texts.homeScreen.ads.title}
        </div>
      )}
      label={texts.homeScreen.ads.title}
    >
      <div className={st.content}>
        {erid.legalEntityName && (
          <div className={st.group}>
            <Typography.Paragraph>
              <strong>{texts.homeScreen.ads.legal.title}</strong>
            </Typography.Paragraph>
            <Typography.Paragraph>{erid.legalEntityName}</Typography.Paragraph>
          </div>
        )}

        <div className={st.group}>
          <Typography.Paragraph>
            <strong>{texts.homeScreen.ads.erid.title}</strong>
          </Typography.Paragraph>
          <Typography.Paragraph>{erid.token}</Typography.Paragraph>
        </div>
      </div>
    </Tooltip>
  );
}
