import { createEvent, sample } from 'effector';
import { debounce } from 'patronum/macro';

import { Section } from '@/generated/customer_hub/enums/section';
import { $currentGender, changedGender } from '@/shared/session';

import { createField } from '@/lib/createField';
import { createQuery, FxParams } from '@/lib/createQuery';

import { fetchSuggests } from '../api';

export const MINIMAL_QUERY_LEN = 1;

export const syncLocalWithGlobalGender = createEvent();
export const suggestField = createField('');
export const suggestGender = createField(Section.SECTION_MALE);

const changeFieldDebouced = debounce({ source: suggestField.change, timeout: 300 });

export const suggestsQuery = createQuery({
  initialData: {
    data: [],
  },
  handler: async ([{ query, section }, ctrl]: FxParams<{ query: string; section: Section }>) => {
    const rs = await fetchSuggests({
      body: { query, section },
      signal: ctrl.signal,
    });

    return rs;
  },
});

sample({
  source: suggestGender.$value,
  clock: changeFieldDebouced,
  fn: (section, query) => ({ query, section }),
  filter: (_, query) => query.length >= MINIMAL_QUERY_LEN,
  target: suggestsQuery.start,
});

// В поиске гендер локальный
// По поиску потом перейдет в глобальный
sample({ clock: changedGender, target: suggestGender.change });

sample({ source: $currentGender, clock: syncLocalWithGlobalGender, target: suggestGender.$value });
