import { createField } from '@/lib/createField';

// Последняя ссылка на которую заходил клиент
// Что бы потом по ссылке на избранное открывать или товары или бренды
export const lastFavoriteLinkField = createField<'items' | 'brands'>('items');
