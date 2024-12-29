import { useLingui } from '@lingui/react';

import { Responsive } from '@/ui/index';

import { DesktopTemplate } from './DesktopTemplate';
import { MobileTemplate } from './MobileTemplate';

export default function ProfilePage() {
  const { i18n } = useLingui();

  return (
    <>
      <Responsive.Desktop>
        <DesktopTemplate />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <MobileTemplate />
      </Responsive.TabletAndBelow>
    </>
  );
}
