import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from 'react-spring';

import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { $mappedStrings } from '@/shared/configs';
import { Modal } from '@/shared/ui';

import { createField } from '@/lib/createField';
import { digestPhone, phoneIsValid } from '@/lib/string';

import { Button, MaskedInput, Space, Typography } from '@/ui/index';

import { authCodeMutation, authStep, Steps, phoneNumber, resetAuthFlow } from '../models';

import { CodeIputStep } from './CodeInput';
import { AuthFlowHeader } from './Header';

import st from './styles.module.scss';

type Props = {
  direct?: boolean;
  confirmationAsModal?: boolean;
  source?: 'favorites' | 'any' | 'clickAndCollect' | 'brands' | null;
  phoneField?: ReturnType<typeof createField<string>>;
  // Открыть сразу с инпутом ввода кода
  smsCodeOnly?: boolean;
};

export function AuthFlow({ direct, source, confirmationAsModal, phoneField = phoneNumber, smsCodeOnly }: Props) {
  const { i18n } = useLingui();
  const codeMutation = useUnit(authCodeMutation);
  const stepField = useUnit(authStep);
  const phone = useUnit(phoneField);
  const onResetFlow = useUnit(resetAuthFlow);
  const texts = useUnit($mappedStrings);
  const digestValue = digestPhone(phone.value);
  const phoneValidate = phoneIsValid(digestValue);

  const descriptions = {
    favorites: texts.login.phoneInput.favoritesScreen.description,
    brands: texts.login.web.phoneInput.favoriteBrandAction.description,
    any: texts.login.phoneInput.description,
    clickAndCollect: texts.web.enterPhoneToBorrow,
  };

  useIsomorphicLayoutEffect(() => {
    if (smsCodeOnly) {
      stepField.onChange(Steps.check);
    }
    // Только при маунте проверить
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepField]);

  useEffect(() => {
    return () => {
      onResetFlow();
    };
  }, [onResetFlow]);

  return (
    <Space direction="vertical" size="large" stretch className={cn(st.space)}>
      <>
        {(stepField.value === Steps.set || direct || confirmationAsModal) && (
          <>
            {direct && <AuthFlowHeader direct />}

            <Typography.Paragraph center className={st.subtitle}>
              {descriptions[source ?? 'any']}
            </Typography.Paragraph>

            <MaskedInput
              data-test="phoneInput"
              isTelInput
              closable={phone.value.length > 3}
              bordered={!direct}
              className={st.field}
              maskProps={{
                mask: '+7 999 999-99-99',
              }}
              placeholder="+7"
              inputMode="tel"
              value={phone.value}
              onChange={e => phone.onChange(e.target.value)}
              onKeyUp={event => {
                if (event.key === 'Enter' && !codeMutation.pending && phoneValidate) {
                  codeMutation.start({
                    type: ContactType.CONTACT_TYPE_PHONE,
                    value: `+${digestValue}`,
                  });
                }
              }}
            />

            <Button
              data-test="submit"
              stretch
              className={st.applyPhone}
              size="L"
              bold
              disabled={codeMutation.pending || !phoneValidate}
              onClick={() =>
                codeMutation.start({
                  type: ContactType.CONTACT_TYPE_PHONE,
                  value: `+${digestValue}`,
                })
              }
            >
              {texts.web.confirmPhone}
            </Button>

            {!direct && <Typography.Paragraph center>{texts.web.sendingSMS}</Typography.Paragraph>}
          </>
        )}

        {stepField.value === Steps.check &&
          (direct || confirmationAsModal ? (
            <Modal
              mobileFullScreen
              open
              header={texts.login.codeInput.title}
              onChange={() => stepField.onChange(Steps.set)}
              modalSwipeableProps={{ fullScreenHeight: 100 }}
            >
              <Space direction="vertical" stretch align="center">
                <CodeIputStep phoneField={phoneField} />
              </Space>
            </Modal>
          ) : (
            <CodeIputStep phoneField={phoneField} />
          ))}

        {codeMutation.error && (
          <Typography.Paragraph center className={st.failedMessage}>
            {texts.web.errorRetry}
          </Typography.Paragraph>
        )}
      </>
    </Space>
  );
}
