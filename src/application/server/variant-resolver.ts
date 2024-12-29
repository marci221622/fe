import { AppVariant } from '@/shared/configs';

import { HEDERS_APP_VARIANT } from './constants';

export function resolveAppVariant(headers: NodeJS.Dict<string | string[]>) {
  for (let i = 0; i < HEDERS_APP_VARIANT.length; i++) {
    const { key, value } = HEDERS_APP_VARIANT[i];

    if (value && !!AppVariant[headers[key] as AppVariant]) {
      return AppVariant[headers[key] as AppVariant];
    }

    if (!value && headers[key]) {
      return AppVariant.short;
    }
  }

  return AppVariant.full;
}
