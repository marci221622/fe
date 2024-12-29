import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { sendOrderForSaleMutation, sellerModal, resetSellerForm } from './model';
import { DEFAULT_FORM_VALUES, Form, resolver } from './schema';

export function useSellerForm() {
  const saleMutation = useUnit(sendOrderForSaleMutation);
  const saleModal = useUnit(sellerModal);
  const onReset = useUnit(resetSellerForm);

  const { register, handleSubmit, resetField, getValues, formState } = useForm<Form>({
    resolver,
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'all',
  });

  const resetName = () => resetField('name', { defaultValue: DEFAULT_FORM_VALUES.name });
  const resetPhone = () => resetField('phone', { defaultValue: DEFAULT_FORM_VALUES.phone });

  const handleModalChange = () => {
    saleModal.onChange(false);
    resetName();
    resetPhone();
  };

  const onSubmit = () => handleSubmit(saleMutation.start);

  const formValues = getValues();

  useEffect(() => {
    return () => {
      onReset();
    };
  }, [onReset]);

  return {
    register,
    handleSubmit,
    formState,
    handleModalChange,
    formValues,
    onSubmit,
    resetName,
    resetPhone,
    pending: saleMutation.pending,
    saleReceived: saleModal.value,
  };
}
