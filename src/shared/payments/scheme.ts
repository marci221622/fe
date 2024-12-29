import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type Form = {
  cvv: string;
  cardNumber?: string;
  date?: string;
};

export const DEFAULT_FORM_VALUES = {
  cvv: '',
  cardNumber: '',
  date: '',
};

const schema: yup.Schema<Form> = yup.object({
  cvv: yup.string().required(),
  cardNumber: yup.string(),
  date: yup.string(),
});

export const resolver = yupResolver(schema);
