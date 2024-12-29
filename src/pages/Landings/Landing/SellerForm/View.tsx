import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';

import { Modal } from '@/shared/ui';

import { Button, FieldMasked, Field } from '@/ui/index';

import { sellerModal, sendOrderForSaleMutation } from '../model';

import { DEFAULT_FORM_VALUES, Form, resolver } from './schema';

import st from './style.module.scss';

type Props = {
  form: {
    inputNamePlaceholder: string;
    inputPhonePlaceholder: string;
    errorMessage: string;
    buttonFormText: string;
  };
  description: string[];
};

export function SellerForm({ form, description }: Props) {
  const { i18n } = useLingui();
  const { inputNamePlaceholder, inputPhonePlaceholder, buttonFormText } = form;

  const saleMutation = useUnit(sendOrderForSaleMutation);
  const saleModal = useUnit(sellerModal);

  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<Form>({
    resolver,
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'all',
  });

  const resetName = () => resetField('name', { defaultValue: DEFAULT_FORM_VALUES.name });
  const resetPhone = () => resetField('phone', { defaultValue: DEFAULT_FORM_VALUES.phone });

  const handleModalChange = (isOpen: boolean) => {
    saleModal.onChange(isOpen);
    if (!isOpen) {
      resetName();
      resetPhone();
    }
  };

  const formValues = getValues();

  return (
    <form className={st.sellerForm} id="startSelling" onSubmit={handleSubmit(saleMutation.start)}>
      <fieldset>
        <div className={st.sellerFormDescription}>
          {description.map((text, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={idx}>{text}</p>
          ))}
        </div>
        <div className={st.formFields}>
          <Field
            {...register('name')}
            className={cn(st.input, { [st.errorField]: errors.name })}
            type="text"
            placeholder={inputNamePlaceholder}
            autoComplete="on"
            error={errors.name?.message}
            closable={formValues.name?.length > 0}
            onCloseClick={resetName}
          />
          <FieldMasked
            {...register('phone')}
            className={cn(st.input, { [st.errorField]: errors.phone })}
            type="tel"
            inputMode="tel"
            placeholder={inputPhonePlaceholder}
            autoComplete="tel"
            maskProps={{
              mask: '+7 (999) 999-99-99',
            }}
            error={errors.phone?.message}
            closable={formValues.phone?.length > 0}
            onCloseClick={resetPhone}
          />
        </div>
      </fieldset>
      <Button
        className={cn(st.sellerFormSubmit)}
        disabled={!isValid || !isDirty}
        type="submit"
        pending={saleMutation.pending}
        reverse
      >
        {buttonFormText}
      </Button>

      <Modal open={!!saleModal.value} header={t`Спасибо за заявку`} onChange={handleModalChange}>
        <p>В ближайшее время с Вами свяжется менеджер и согласует детали.</p>
      </Modal>
    </form>
  );
}
