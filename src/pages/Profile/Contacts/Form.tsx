import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type Form = {
  name?: string;
  lastname?: string;
  phone?: string;
  mail?: string;
};

export const DEFAULT_FORM_VALUES = {
  name: '',
  lastname: '',
  phone: '',
  mail: '',
};

const schema: yup.Schema<Form> = yup.object({
  name: yup.string(),
  lastname: yup.string(),
  phone: yup.string(),
  mail: yup.string().email(),
});

export const resolver = yupResolver(schema);
