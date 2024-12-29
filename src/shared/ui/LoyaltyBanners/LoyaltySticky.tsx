import { useUnit } from 'effector-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { ActionMechanicsType } from '@/generated/customer_hub/enums/action_mechanics_type.v1';
import { $mappedStrings } from '@/shared/configs';

import { usePopupState } from '@/lib/hooks';

import { Typography } from '@/ui/index';

import { Checked, CopyIcon } from '@/ui/assets/icons';

import { Tooltip } from '../Tooltip';

import { hasFullDescription } from './lib';
import { FullDescriptionModal } from './LoyaltyBody';

import st from './loyalty.module.scss';

type Props = {
  loyalty: Loyalty;
};

export function LoyaltySticky({ loyalty }: Props) {
  const texts = useUnit($mappedStrings);

  const popup = usePopupState();
  const mechanics = loyalty.actionMechanics;

  return (
    <>
      <Typography.Paragraph>
        {loyalty.stickyBanners[0]}
        {hasFullDescription(loyalty) && (
          <span className={st.moreLink} onClick={popup.openPopup}>
            {texts.loyalty.button.title}
          </span>
        )}
      </Typography.Paragraph>

      {mechanics && mechanics.type === ActionMechanicsType.ACTION_MECHANICS_TYPE_COUPON && mechanics.value && (
        <Tooltip
          popoverOnly
          tag={({ openPopup }) => (
            <div className={st.copyIconWrapper}>
              <CopyToClipboard text={mechanics.value ?? ''} onCopy={openPopup}>
                <CopyIcon className={st.copyIcon} />
              </CopyToClipboard>
            </div>
          )}
          label=""
        >
          <div className={st.copiedText}>
            <Checked /> {texts.loyalty.copyAlert.title}
          </div>
        </Tooltip>
      )}

      <FullDescriptionModal popup={popup} description={loyalty.fullDescriptions[0]} link={loyalty.regulationUrls[0]} />
    </>
  );
}
