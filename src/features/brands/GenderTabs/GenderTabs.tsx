import cn from 'classnames';
import { useUnit } from 'effector-react';

import { Section, sectionFromJSON, sectionToJSON } from '@/generated/customer_hub/enums/section';
import { useStickyClassnames } from '@/shared/animations';
import { $mappedStrings } from '@/shared/configs';

import { Menu, Responsive, Segments } from '@/ui/index';

import st from './favorites.module.scss';

type Props = {
  activeTab: Section;
  onChange: (tab: Section) => void;
  className?: string;
};

export function GenderTabs({ activeTab, onChange, className }: Props) {
  const texts = useUnit($mappedStrings);
  const sticky = useStickyClassnames({});

  const segmentOptions = [
    { label: texts.genderPanel.female, value: sectionToJSON(Section.SECTION_FEMALE) },
    { label: texts.genderPanel.male, value: sectionToJSON(Section.SECTION_MALE) },
  ];

  return (
    <>
      <Responsive.Desktop className={cn(st.filters, className, sticky)}>
        <Menu
          list={[
            {
              title: texts.genderPanel.female,
              checked: activeTab === Section.SECTION_FEMALE,
              onChange: () => onChange(Section.SECTION_FEMALE),
              value: 'inStock',
            },
            {
              title: texts.genderPanel.male,
              checked: activeTab === Section.SECTION_MALE,
              onChange: () => onChange(Section.SECTION_MALE),
              value: 'outOfStock',
            },
          ]}
        />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow className={cn(st.filters, st.mobile, className)}>
        <Segments
          className={st.segments}
          name="brands"
          onChange={event => onChange(sectionFromJSON(event.target.value))}
          value={sectionToJSON(activeTab)}
          options={segmentOptions}
        />
      </Responsive.TabletAndBelow>
    </>
  );
}
