import { Store } from 'effector';
import { decode } from 'js-base64';

import { $additionalUserData } from '@/shared/configs';

import { HEADERS } from './constants';

function readFromHeader(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

export function setAdditionalUserData(headers: NodeJS.Dict<string | string[]>, state: Map<Store<any>, any>) {
  const phone = readFromHeader(headers[HEADERS.additionalUserData.phone]);
  const name = readFromHeader(headers[HEADERS.additionalUserData.name]);

  state.set($additionalUserData, {
    name: decode(name),
    phone,
  });

  return state;
}
