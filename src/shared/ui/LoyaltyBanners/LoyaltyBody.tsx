import cn from 'classnames';
import { useUnit } from 'effector-react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';
import { ActionMechanicsType } from '@/generated/customer_hub/enums/action_mechanics_type.v1';
import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui/Modal';

import { usePopupState } from '@/lib/hooks';

import { Typography, Disclamer, Space, Button } from '@/ui/index';

import { Checked, CopyIcon } from '@/ui/assets/icons';

import { Tooltip } from '../Tooltip';

import { hasBodyLoyalty, hasFullDescription } from './lib';

import st from './loyalty.module.scss';

type Props = {
  place: 'home' | 'product' | 'cart' | 'checkout' | 'addedToCart' | 'catalog';
  loyalty?: Loyalty | null;
};

// Подробнее об акции
export function FullDescriptionModal({
  popup,
  description,
  link,
}: {
  popup: ReturnType<typeof usePopupState>;
  description?: string;
  link?: string;
}) {
  const texts = useUnit($mappedStrings);

  if (!description) {
    return null;
  }

  return (
    <Modal open={popup.isOpen} onChange={popup.closePopup}>
      04лщ
      <Space direction="vertical">
        <Typography.Paragraph className={st.fullDescription}>{description}</Typography.Paragraph>

        {link && (
          <Button
            bold
            stretch
            colored
            onClick={() => {
              window.open(link, '_blank');
            }}
          >
            {texts.loyalty.button.title}
          </Button>
        )}
      </Space>
    </Modal>
  );
}

export function LoyaltyBody({ place, loyalty }: Props) {
  const popup = usePopupState();
  const texts = useUnit($mappedStrings);

  if (!loyalty || !hasBodyLoyalty(loyalty)) {
    return null;
  }

  const mechanics = loyalty.actionMechanics;

  return (
    <Disclamer
      className={cn(st.body, st.notSticky, st[place])}
      rightIcon={
        mechanics &&
        mechanics.type === ActionMechanicsType.ACTION_MECHANICS_TYPE_COUPON &&
        mechanics.value && (
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
        )
      }
    >
      <Typography.Paragraph>
        {loyalty.shortDescriptions[0]}
        {hasFullDescription(loyalty) && (
          <span className={st.moreLink} onClick={popup.openPopup}>
            {texts.loyalty.button.title}
          </span>
        )}
      </Typography.Paragraph>
      <FullDescriptionModal popup={popup} description={loyalty.fullDescriptions[0]} link={loyalty.regulationUrls[0]} />
    </Disclamer>
  );
}
