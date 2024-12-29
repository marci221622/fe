import { useLingui } from '@lingui/react';

import { Responsive } from '@/ui/index';

import { DesktopCategories } from './Desktop';
import { MobileCategories } from './Mobile';

export default function RootCategoriesPage() {
  const { i18n } = useLingui();

  return (
    <>
      <Responsive.TabletAndBelow>
        <MobileCategories />
      </Responsive.TabletAndBelow>

      <Responsive.Desktop>
        <DesktopCategories />
      </Responsive.Desktop>
    </>
  );
}
