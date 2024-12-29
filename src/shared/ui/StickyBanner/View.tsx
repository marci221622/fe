import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { $appIsShort, $stickyBannerSettings } from '@/shared/configs';

import { Typography } from '@/ui/index';

import { LoyaltySticky, hasStickyLoyalty } from '../LoyaltyBanners';

import { visibleField, $sharedLoyalty } from './model';
import { codesToUrls, loyaltyTypesToUrls } from './scheme';

import st from './styles.module.scss';

export function StickyBanner({ className }: { className?: string }) {
  const visible = useUnit(visibleField.$value);
  const settings = useUnit($stickyBannerSettings);
  const field = useUnit(visibleField);
  const { pathname } = useLocation();
  const appIsShort = useUnit($appIsShort);
  const loyalty = useUnit($sharedLoyalty);

  const notice = useMemo(() => {
    const code = codesToUrls.find(it => matchPath(it.path, pathname))?.code;

    if (code && settings.enabled && settings.notices.length > 0) {
      return settings.notices.find(it => it.screenCodes.includes(code));
    }

    return undefined;
  }, [pathname, settings.enabled, settings.notices]);

  const currentLoyalty = useMemo(() => {
    const type = loyaltyTypesToUrls.find(it => matchPath(it.path, pathname))?.type;

    return type ? loyalty[type] : null;
  }, [loyalty, pathname]);

  const hasLoyalty = hasStickyLoyalty(currentLoyalty);

  const needToShowBanner = !!notice || hasLoyalty;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (needToShowBanner) {
      field.onChange(true);

      return () => {
        field.onChange(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- field зависимость напрямую не нужна
  }, [field.onChange, needToShowBanner]);

  let content = notice && <Typography.Paragraph>{notice.description}</Typography.Paragraph>;

  if (hasLoyalty) {
    content = (
      <div className={st.loyaltyWrapper}>
        <LoyaltySticky loyalty={currentLoyalty} />
      </div>
    );
  }

  if (appIsShort || !content) {
    return null;
  }

  return (
    <div
      data-id="stickyBanner"
      className={cn(st.wrapper, className, {
        [st.visible]: visible,
        [st.isLoyalty]: hasLoyalty,
      })}
    >
      {content}
    </div>
  );
}
