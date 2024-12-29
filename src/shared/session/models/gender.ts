import { createEvent, createStore, sample } from 'effector';

import { Section, sectionToJSON } from '@/generated/customer_hub/enums/section';

import { currentGenderCookieName } from '@/constants/cookies';
import { DAYS365 } from '@/constants/days';

import { createFx } from '@/lib/services';

export const gendersReaddable = {
  [Section.SECTION_FEMALE]: 'Женщин',
  [Section.SECTION_MALE]: 'Мужчин',
  [Section.UNRECOGNIZED]: 'Женщин',
};

export const $currentGender = createStore(Section.SECTION_MALE);
export const $readdableGender = $currentGender.map(
  gender => gendersReaddable[gender] ?? gendersReaddable[Section.SECTION_FEMALE],
);

export const changedGender = createEvent<Section>();

const changeGenderFx = createFx<Section, void>((section, { cookies }) => {
  cookies.set(currentGenderCookieName, sectionToJSON(section), {
    expires: DAYS365,
  });
});

$currentGender.on(changedGender, (_, next) => next);

sample({ clock: changedGender, target: changeGenderFx });

export function revertGender(gender: Section) {
  if (gender === Section.SECTION_FEMALE) {
    return Section.SECTION_MALE;
  }

  return Section.SECTION_FEMALE;
}
