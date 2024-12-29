import { useContext } from 'react';

import { templateCtx } from '@/shared/ui';

import { useViewport } from '@/lib/hooks';

import st from './styles.module.scss';

const mobileBannerHeight = 100;

export function DesktopList({ alphabetGroup }: { alphabetGroup: string[] }) {
  const template = useContext(templateCtx);
  const { isMobile } = useViewport();

  return (
    <ul className={st.list}>
      {alphabetGroup.map(char => (
        <li
          key={char}
          role="presentation"
          onClick={() => {
            const sectionEl = document.getElementById(`brand-${char.toLocaleLowerCase()}`);
            const headerHeight = template?.getBoundingClientRect()?.height;

            if (sectionEl) {
              const top =
                sectionEl.getBoundingClientRect().top +
                window.scrollY -
                (headerHeight ?? 0) -
                (isMobile ? mobileBannerHeight : 0);

              window.scrollTo({
                behavior: 'smooth',
                top,
              });
            }
          }}
        >
          {char}
        </li>
      ))}
    </ul>
  );
}
