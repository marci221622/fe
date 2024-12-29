import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import VerificationInput from 'react-verification-input';

import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { $mappedStrings } from '@/shared/configs';
import { OrderAgreement } from '@/shared/ui';

import { createField } from '@/lib/createField';
import { formatWithRULocale } from '@/lib/format';
import { digestPhone, formatPhone } from '@/lib/string';

import { Button, OverlayLoader, Typography } from '@/ui/index';

import { authCodeMutation, checkAuthCodeMutation, codeNumber, $expiredTimer, resetTimer } from '../models';

import st from './styles.module.scss';

const CODE_LEN = 4;

export function CodeIputStep({ phoneField }: { phoneField: ReturnType<typeof createField<string>> }) {
  const { i18n } = useLingui();
  const codeMutation = useUnit(authCodeMutation);
  const checkMutation = useUnit(checkAuthCodeMutation);
  const expiredTime = useUnit($expiredTimer);
  const phone = useUnit(phoneField);
  const code = useUnit(codeNumber);
  const onResetTimer = useUnit(resetTimer);
  const texts = useUnit($mappedStrings);
  const digestValue = digestPhone(phone.value);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (code.value.length === CODE_LEN) {
      checkMutation.start({
        code: code.value,
        value: `+${digestValue}`,
      });

      return () => {
        checkMutation.reset();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- checkMutation добавлять не нужно, приводит к зацикливаниям
  }, [checkMutation.reset, checkMutation.start, code.value, digestValue]);

  useEffect(() => {
    return () => {
      onResetTimer();
    };
  }, [onResetTimer]);

  return (
    <OverlayLoader isLoading={checkMutation.pending}>
      <div className={st.overlay}>
        <VerificationInput
          autoFocus
          length={CODE_LEN}
          value={code.value}
          onChange={code.onChange}
          placeholder=""
          validChars="0-9"
          inputProps={{
            inputMode: 'numeric',
            autoComplete: 'one-time-code',
            type: 'text',
          }}
          classNames={{
            container: st.verificationContainer,
            character: st.character,
          }}
        />
      </div>

      <Typography.Paragraph
        center
        className={cn(st.error, {
          [st.hasError]: !!checkMutation.error,
        })}
      >
        <Trans>{texts.login.codeInput.wrongCode}</Trans>
      </Typography.Paragraph>

      <Typography.Paragraph center>
        <Trans>
          {texts.web.sendSMS} <br /> {texts.web.smsNumber} <b>{formatPhone(digestValue)}</b>
        </Trans>
        <br />
        {expiredTime > 0 && (
          <Trans>
            {texts.login.codeInput.counter}{' '}
            <b>
              {formatWithRULocale({
                date: expiredTime * 1000,
                template: 'mm:ss',
              })}
            </b>
          </Trans>
        )}
      </Typography.Paragraph>

      {expiredTime === 0 && (
        <Button
          reverse
          size="XS"
          disabled={codeMutation.pending}
          onClick={() => {
            codeMutation.start({
              type: ContactType.CONTACT_TYPE_PHONE,
              value: `+${digestValue}`,
              isResend: true,
            });
          }}
        >
          {texts.login.codeInput.button}
        </Button>
      )}

      <OrderAgreement isPrivacy hasMargin={false} />
    </OverlayLoader>
  );
}
