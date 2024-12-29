import { useUnit } from 'effector-react';

import { Section } from '@/generated/customer_hub/enums/section';
import { $currentGender } from '@/shared/session';

import { paths } from '@/constants/paths';

export function useHomeLink() {
  const gender = useUnit($currentGender);

  return gender === Section.SECTION_MALE ? paths.home.men() : paths.home.women();
}
