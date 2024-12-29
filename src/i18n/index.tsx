import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useUnit } from 'effector-react';
import { en, ru } from 'make-plural';
import { ReactNode, useEffect, useState } from 'react';

import { $locale, $messages } from './model';

type Props = {
  children: ReactNode;
};

export function LocaleProvider({ children }: Props) {
  const locale = useUnit($locale);
  const messages = useUnit($messages);

  const [i18n] = useState(() =>
    setupI18n({
      messages: {
        [locale]: { ...messages },
      },
      localeData: {
        en: { plurals: en },
        ru: { plurals: ru },
      },
      locale,
    }),
  );

  useEffect(() => {
    i18n.load(locale, { ...messages });
    i18n.activate(locale);
  }, [i18n, locale, messages]);

  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      {children}
    </I18nProvider>
  );
}
