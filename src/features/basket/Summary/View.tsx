import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';

import { Loyalty } from '@/generated/customer_hub/entities/loyalty.v1';

import { Responsive } from '@/ui/index';

import { createBaseCart } from '../cart';

import { DesktopSummary } from './Desktop';
import { MobileSummary } from './Mobile';

type Props = {
  shortVarriant?: boolean;
  checkout: ReturnType<typeof createBaseCart>;
  isClickAndCollect?: boolean;
  isQuickBy?: boolean;
  priceByRequestDescription?: string;
  loyalty?: Loyalty | null;
  isVariationB?: boolean;
};

export function Summary({
  shortVarriant,
  checkout,
  isClickAndCollect,
  priceByRequestDescription,
  isQuickBy,
  loyalty,
  isVariationB,
}: Props) {
  const { i18n } = useLingui();
  const totalPrice = useUnit(checkout.$totalPayable);

  if (totalPrice === 0) {
    return null;
  }

  return (
    <>
      <Responsive.Desktop>
        <DesktopSummary
          checkout={checkout}
          isClickAndCollect={isClickAndCollect}
          priceByRequestDescription={priceByRequestDescription}
          isQuickBy={isQuickBy}
          isVariationB={isVariationB}
        />
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <MobileSummary
          loyalty={loyalty}
          shortVarriant={shortVarriant}
          checkout={checkout}
          isClickAndCollect={isClickAndCollect}
          priceByRequestDescription={priceByRequestDescription}
          isQuickBy={isQuickBy}
        />
      </Responsive.TabletAndBelow>
    </>
  );
}
