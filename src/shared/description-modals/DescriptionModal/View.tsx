import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $mappedStrings, $ongoingModal } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { Typography } from '@/ui/index';

import { paymentIcons } from '@/ui/assets/icons';

import { DescriptionModals } from '../constants';

import { getRenderedIconWithFallback } from './icons';

import st from './styles.module.scss';

type TabItem = {
  key: string[];
  text: string;
};

const tabs: TabItem[] = [
  {
    key: [DescriptionModals.Delivery],
    text: 'доставка',
  },
  {
    key: [DescriptionModals.Payment],
    text: 'оплата',
  },
  {
    key: [
      DescriptionModals.Returns,
      DescriptionModals.PrivateReturns,
      DescriptionModals.WatchesReturns,
      DescriptionModals.PrivateWatchesReturns,
    ],
    text: 'возврат',
  },
];

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  type: DescriptionModals | string;
  changeModal: (type: string) => void;
};

type BaseScheme = {
  icon: string;
  text: string;
};

function Delivery({ items }: { items: BaseScheme[] }) {
  return (
    <ul className={st.list}>
      {items.map((row, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={idx}>
          {getRenderedIconWithFallback(row.icon)}
          <span className={st.rowText}>
            <Typography.Paragraph className={st.text}>{row.text}</Typography.Paragraph>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Returns({ items }: { items: BaseScheme[] }) {
  return (
    <ul className={st.list}>
      {items.map((row, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={idx}>
          {getRenderedIconWithFallback(row.icon)}
          <span className={st.rowText}>
            <Typography.Paragraph className={st.text}>{row.text}</Typography.Paragraph>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Payment({ items }: { items: string[] }) {
  return (
    <div className={st.payment}>
      <div className={st.icons}>
        <paymentIcons.VisaIcon />
        <paymentIcons.MasterCardIcon />
        <paymentIcons.MaestroCardIcon />
        <paymentIcons.MirCardIcon />
      </div>

      {items.map((text, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <Typography.Paragraph key={id} className={st.rowText}>
          {text}
        </Typography.Paragraph>
      ))}
    </div>
  );
}

function Content({ type }: { type: string }) {
  const modalContent = useUnit($ongoingModal);

  switch (type) {
    case DescriptionModals.Delivery:
      return <Delivery items={modalContent[type]} />;
    case DescriptionModals.Payment:
      return <Payment items={modalContent[type]} />;
    case DescriptionModals.Returns:
    case DescriptionModals.PrivateReturns:
    case DescriptionModals.WatchesReturns:
    case DescriptionModals.PrivateWatchesReturns:
      return <Returns items={modalContent[type]} />;
    default:
      return null;
  }
}

export function DescriptionModal({ closeModal, isOpen, type, changeModal }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();

  return (
    <Modal
      open={isOpen}
      onChange={closeModal}
      header={texts.profile.info}
      bodyClassName={st.body}
      wrapClassName={st.container}
      modalSwipeableProps={{ autHeight: true }}
    >
      <div className={st.tabs}>
        {tabs.map(tab => (
          <p
            role="presentation"
            key={tab.key[0]}
            className={cn({
              [st.active]: tab.key.includes(type),
            })}
            onClick={() => changeModal(tab.key[0])}
          >
            {tab.text}
          </p>
        ))}
      </div>

      {type && <Content type={type} />}
    </Modal>
  );
}
