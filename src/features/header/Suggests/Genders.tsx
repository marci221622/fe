import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { Section, sectionFromJSON, sectionToJSON } from '@/generated/customer_hub/enums/section';
import { $mappedStrings } from '@/shared/configs';

import { TabLinks } from '@/ui/index';

import { suggestGender, syncLocalWithGlobalGender } from '../models';

import st from './styles.module.scss';

export function GenderActions() {
  const texts = useUnit($mappedStrings);
  const { value, onChange } = useUnit(suggestGender);
  const sync = useUnit(syncLocalWithGlobalGender);

  const tabs = [
    {
      label: texts.genderPanel.female,
      to: sectionToJSON(Section.SECTION_FEMALE),
    },
    {
      label: texts.genderPanel.male,
      to: sectionToJSON(Section.SECTION_MALE),
    },
  ];

  useEffect(() => {
    return () => {
      sync();
    };
  }, [sync]);

  return (
    <TabLinks
      tabs={tabs}
      classname={cn(st.searchGenders)}
      active={sectionToJSON(value)}
      onClick={(path, event) => {
        event.preventDefault();
        onChange(sectionFromJSON(path));
      }}
    />
  );
}
