import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $mappedStrings } from '@/shared/configs';

import { Typography } from '@/ui/index';

import { authStep, Steps } from '../models';

import st from './styles.module.scss';

export function AuthFlowHeader({ direct }: { direct?: boolean }) {
  const { i18n } = useLingui();
  const stepField = useUnit(authStep);
  const texts = useUnit($mappedStrings);

  if (direct) {
    return (
      <Typography.Paragraph className={cn(st.title, st.directFlow)}>
        {texts.login.phoneInput.title}
      </Typography.Paragraph>
    );
  }

  switch (stepField.value) {
    case Steps.set:
      return <Typography.Paragraph className={st.title}>{texts.login.phoneInput.title}</Typography.Paragraph>;
    default:
      return <Typography.Paragraph className={st.title}>{texts.login.codeInput.title}</Typography.Paragraph>;
  }
}
