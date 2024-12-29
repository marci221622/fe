import { useUnit } from 'effector-react';

import { Disclamer, Typography } from '@/ui/index';

import { createBaseCart } from '../../cart';

import st from './styles.module.scss';

type Props = {
  checkout: ReturnType<typeof createBaseCart>;
  className?: string;
  deliveryNotAvailableDescription?: string;
  additionalAction?: React.JSX.Element;
  withEmptyStub?: boolean;
};

export function DeliveryDetails({
  checkout,
  className,
  deliveryNotAvailableDescription,
  additionalAction,
  withEmptyStub,
}: Props) {
  const data = useUnit(checkout.$deliveryData);

  if (deliveryNotAvailableDescription) {
    return (
      <Disclamer className={className} stretch>
        <Typography.Paragraph className={st.deliveryDescriptionText}>
          {deliveryNotAvailableDescription}
        </Typography.Paragraph>
      </Disclamer>
    );
  }

  if (data?.description) {
    return (
      <Disclamer className={className} stretch>
        <Typography.Paragraph className={st.deliveryDescriptionText}>{data.description}</Typography.Paragraph>

        {additionalAction}
      </Disclamer>
    );
  }

  if (withEmptyStub) {
    return <div className={st.deliveryDisclamerStub} />;
  }

  return null;
}
