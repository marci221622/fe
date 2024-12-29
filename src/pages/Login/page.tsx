import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getDYSelector } from '@/shared/analytics';
import { $mappedStrings } from '@/shared/configs';
import { $isAuthorized } from '@/shared/session';

import { paths } from '@/constants/paths';

import { AuthFlow } from '@/features/auth';

import { setRedirect } from '@/lib/redirect';
import { usePrevious } from '@/lib/usePrevious';

import { BreadcrumbsUI, Space, Typography } from '@/ui/index';

import st from './styles.module.scss';

export default function LoginPage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const isAuth = useUnit($isAuthorized);
  const prevIsAuth = usePrevious(isAuth);
  const onRedirected = useUnit(setRedirect);
  const [params] = useSearchParams();

  const backurl = params.get('backurl');
  const backIsFavoritePage = backurl && backurl.startsWith(paths.favorites.main());

  useEffect(() => {
    if (!prevIsAuth && isAuth) {
      onRedirected(backurl ?? paths.profile.main());
    }
  }, [backurl, isAuth, onRedirected, prevIsAuth]);

  return (
    <section {...getDYSelector({ type: 'pageType', page: 'login' })}>
      <BreadcrumbsUI breadcrumbs={[]} />
      <Typography.PageTitle className={st.pageTitle}>{texts.login.phoneInput.title}</Typography.PageTitle>

      <Space align="center" stretch direction="vertical" className={st.space}>
        <AuthFlow confirmationAsModal source={backIsFavoritePage ? 'favorites' : 'any'} />
      </Space>
    </section>
  );
}
