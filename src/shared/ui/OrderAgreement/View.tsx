import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';

import { paths } from '@/constants/paths';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export function OrderAgreement({
  hasMargin = true,
  isPrivacy,
  className,
}: {
  hasMargin?: boolean;
  isPrivacy?: boolean;
  className?: string;
}) {
  const texts = useUnit($mappedStrings);

  return (
    <Typography.Paragraph
      className={cn(st.wrapper, className, {
        [st.hasMargin]: hasMargin,
      })}
    >
      {isPrivacy ? (
        texts.login.codeInput.privacyPolicy
      ) : (
        <>
          {texts.web.acceptOffer}{' '}
          <Link to={paths.landings.terms()} target="_blank">
            {texts.web.acceptOfferLink}
          </Link>
        </>
      )}
    </Typography.Paragraph>
  );
}
