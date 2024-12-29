import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { getDYSelector } from '@/shared/analytics';
import { $mappedStrings, OnlyFullVariant } from '@/shared/configs';

import { useHomeLink } from '@/features/home';

import st from './styles.module.scss';

export default function Page404() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const link = useHomeLink();

  return (
    <div className={st.wrap} {...getDYSelector({ type: 'pageType', page: 'notFoundPage' })}>
      <h4 className={st.title}>{texts.web.pageNotFound}</h4>
      <p className={st.code}>{texts.web.pageNotFoundStatus}</p>
      <p className={st.description}>{texts.web.wrongLink} </p>

      <OnlyFullVariant>
        <Link to={link} className={st.link}>
          {texts.web.backToMain}
        </Link>
      </OnlyFullVariant>
    </div>
  );
}
