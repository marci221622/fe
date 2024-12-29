import { ListSavedCardsResponse_SavedCardData } from '@/generated/customer_hub/methods/customer/list_saved_cards.v1';

export function getCardNumberFromSavedCard(card: ListSavedCardsResponse_SavedCardData) {
  return card.pan.substring(0, 6) + '0'.repeat(6) + card.pan.substring(card.pan.length - 4);
}
