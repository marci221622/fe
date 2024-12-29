import { Responsive } from '@/ui/index';

import { MobileTemplate } from './MobileTemplate';

export default function InfoPage() {
  return (
    <Responsive.TabletAndBelow>
      <MobileTemplate />
    </Responsive.TabletAndBelow>
  );
}
