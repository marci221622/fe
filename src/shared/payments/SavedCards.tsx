import { useLingui } from '@lingui/react';
import cn from 'classnames';
import cTypes from 'creditcards-types';
import mirType from 'creditcards-types/types/mir';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { ListSavedCardsResponse_SavedCardData } from '@/generated/customer_hub/methods/customer/list_saved_cards.v1';
import { $mappedStrings } from '@/shared/configs';

import { Button, Typography } from '@/ui/index';

import { CheckedWithContainer, CommonBankIcon, iconsScheme, paymentIcons } from '@/ui/assets/icons';

import { getCardNumberFromSavedCard } from './lib';

import st from './styles.module.scss';

type Props = {
  setSelectedCard: (card: ListSavedCardsResponse_SavedCardData | null) => void;
  savedCards: ListSavedCardsResponse_SavedCardData[];
  savedCard: ListSavedCardsResponse_SavedCardData | null;
  processPayment: (step: 'widget' | 'selectCard') => void;
};

export function SavedCardsList({ savedCards, savedCard, setSelectedCard, processPayment }: Props) {
  const { i18n } = useLingui();
  const texts = useUnit($mappedStrings);

  useEffect(() => {
    if (!savedCard && savedCards.length > 0) {
      setSelectedCard(savedCards[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- намеренно одноразовый эффект
  }, []);

  return (
    <div className={st.savedCards}>
      <ul data-scroll="allow">
        {savedCards.map(card => {
          const type = [...cTypes, mirType].find(it => it.test(getCardNumberFromSavedCard(card), false));
          const icon = iconsScheme[type?.name ?? ''] || <paymentIcons.DefaultIcon />;

          return (
            <li key={card.id}>
              <Typography.Paragraph
                className={cn({
                  [st.noIcon]: savedCard?.id !== card.id,
                })}
                onClick={() => setSelectedCard(card)}
              >
                {icon} {card.pan.slice(-8)}
              </Typography.Paragraph>

              {savedCard?.id === card.id && <CheckedWithContainer className={st.checkedIcon} />}
            </li>
          );
        })}

        <li key="another">
          <Typography.Paragraph
            onClick={() => {
              setSelectedCard(null);
              processPayment('widget');
            }}
          >
            <CommonBankIcon />
            {texts.web.newCard}
          </Typography.Paragraph>
        </li>
      </ul>

      <Button size="L" colored stretch disabled={!savedCard} onClick={() => processPayment('widget')}>
        {texts.bankCard.list.confirm}
      </Button>
    </div>
  );
}
