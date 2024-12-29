import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type Form = {
  name: string;
  phone: string;
};

export const DEFAULT_FORM_VALUES = {
  name: '',
  phone: '',
};

/**
 * Removes all chars after '+' except digits
 * @param {string} phone ex. +7 888 888-88-88, +7 (888) 888 88 88, etc...
 * @returns {string} +78888888888
 */
const removeNonDigitsAfterPlusSymbol = (phone: string) => phone.replace(/^(\+)|\D/g, '$1');
const PHONE_WITH_PLUS_N_CODE_LENGTH = 12; // '+' + '7' + '9999999999'

const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup
      .string()
      .transform(value => {
        if (value === '') {
          return undefined;
        }

        const valueWithPlus7 = value.startsWith('+7') ? value : `+7${value}`;

        return removeNonDigitsAfterPlusSymbol(valueWithPlus7);
      })
      .required('Пожалуйста, укажите номер телефона')
      .length(PHONE_WITH_PLUS_N_CODE_LENGTH, 'Неправильный номер телефона'),
  })
  .required();

export const resolver = yupResolver(schema);